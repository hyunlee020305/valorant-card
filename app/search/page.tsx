'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiotIdInput } from '@/components/search/riot-id-input';
import { usePlayerSearch } from '@/hooks/use-player-search';

export default function SearchPage() {
  const router = useRouter();
  const { search, loading, error } = usePlayerSearch();
  const [inputKey, setInputKey] = useState(0);
  const [initialValue, setInitialValue] = useState('');

  const handleSearch = async (name: string, tag: string, region: string) => {
    const result = await search(name, tag, region);
    if (result) {
      sessionStorage.setItem('playerStats', JSON.stringify(result));
      sessionStorage.setItem('searchParams', JSON.stringify({ name, tag, region }));
      router.push(`/card/${result.account.puuid}`);
    }
  };

  const handleExampleClick = (example: string) => {
    setInitialValue(example);
    setInputKey((k) => k + 1);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4655]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        <Link href="/" className="mb-12 text-3xl font-bold tracking-tight">
          <span className="text-white">VALO</span>
          <span className="text-[#FF4655]">CARD</span>
        </Link>

        <h2 className="text-xl font-semibold text-white mb-2">Player Search</h2>
        <p className="text-sm text-gray-500 mb-8">Enter a Riot ID to look up stats</p>

        <RiotIdInput
          key={inputKey}
          onSearch={handleSearch}
          loading={loading}
          initialValue={initialValue}
        />

        {error && (
          <div className="mt-4 w-full max-w-lg p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-600 mb-2">Example searches</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {['Player#KR1', 'TenZ#0505', 'Aspas#tiltt'].map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
