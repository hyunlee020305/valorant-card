'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

function FailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const puuid = searchParams.get('puuid');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          <span className="text-white">VALO</span>
          <span className="text-[#FF4655]">CARD</span>
        </h1>
        <h2 className="text-xl font-bold text-red-400 mt-6 mb-2">Payment Failed</h2>
        <p className="text-sm text-gray-400">
          {message ?? 'Something went wrong during payment processing.'}
        </p>
        {code && (
          <p className="text-xs text-gray-600 mt-1">Error code: {code}</p>
        )}
      </div>
      <div className="flex gap-3">
        {puuid && (
          <Link href={`/payment?puuid=${puuid}`}>
            <Button>Try Again</Button>
          </Link>
        )}
        <Link href={puuid ? `/card/${puuid}` : '/search'}>
          <Button variant="ghost">Go Back</Button>
        </Link>
      </div>
    </main>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><Spinner /></main>}>
      <FailContent />
    </Suspense>
  );
}
