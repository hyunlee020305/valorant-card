'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { LoginButton } from '@/components/auth/login-button';

const PRICE_DISPLAY = '$1.00';

function PaymentContent() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const puuid = searchParams.get('puuid') ?? '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puuid }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to create checkout session.');
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('An error occurred during payment processing.');
      setLoading(false);
    }
  };

  if (!puuid) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-gray-400">Invalid access.</p>
        <Link href="/search">
          <Button>Back to Search</Button>
        </Link>
      </main>
    );
  }

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Sign In Required</h1>
          <p className="text-gray-400">Please sign in to generate your card.</p>
        </div>
        <LoginButton />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/search" className="text-2xl font-bold tracking-tight">
            <span className="text-white">VALO</span>
            <span className="text-[#FF4655]">CARD</span>
          </Link>
          <Link href={`/card/${puuid}`}>
            <Button variant="ghost" size="sm">Go Back</Button>
          </Link>
        </div>

        {/* Payment info */}
        <div className="mb-6 p-6 bg-white/5 rounded-lg border border-white/10">
          <h2 className="text-lg font-bold text-white mb-1">Generate Card</h2>
          <p className="text-sm text-gray-400 mb-4">
            AI will generate a unique profile card for you.
          </p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-300">Amount</span>
            <span className="text-xl font-bold text-[#FF4655]">{PRICE_DISPLAY}</span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Pay button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handlePayment}
            loading={loading}
          >
            Pay {PRICE_DISPLAY}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Secured by Polar
          </p>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><Spinner /></main>}>
      <PaymentContent />
    </Suspense>
  );
}
