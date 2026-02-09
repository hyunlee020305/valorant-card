'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const puuid = searchParams.get('puuid');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Payment Successful</h1>
        <p className="text-sm text-gray-400">Your card is being generated.</p>
      </div>
      <Link href={puuid ? `/card/${puuid}?paid=true` : '/search'}>
        <Button>View Card</Button>
      </Link>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
