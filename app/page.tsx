'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LoginButton } from '@/components/auth/login-button';
import { RiotIdInput } from '@/components/search/riot-id-input';
import { usePlayerSearch } from '@/hooks/use-player-search';

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { search, loading, error } = usePlayerSearch();

  const handleSearch = async (name: string, tag: string, region: string) => {
    const result = await search(name, tag, region);
    if (result) {
      sessionStorage.setItem('playerStats', JSON.stringify(result));
      sessionStorage.setItem('searchParams', JSON.stringify({ name, tag, region }));
      router.push(`/card/${result.account.puuid}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="absolute top-0 right-0 p-4 z-20">
        <LoginButton />
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4655]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 mb-6">
            <span className="w-2 h-2 bg-[#FF4655] rounded-full animate-glow-pulse" />
            AI-Powered Valorant Profile Cards
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-white">VALO</span>
            <span className="text-[#FF4655]">CARD</span>
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-md">
            Enter your Riot ID and let AI create
            <br />
            your unique Valorant profile card
          </p>

          {session?.user && (
            <div className="w-full max-w-lg">
              <RiotIdInput onSearch={handleSearch} loading={loading} />
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Stats Analysis',
              desc: 'K/D, win rate, agent stats, and key metrics at a glance',
            },
            {
              icon: '🤖',
              title: 'AI Profile Bio',
              desc: 'Claude AI writes your profile in esports caster style',
            },
            {
              icon: '💳',
              title: '$1 Per Card',
              desc: 'Instant AI-generated profile card for just $1',
            },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-white/5 text-center text-xs text-gray-600">
        VALOCARD is not affiliated with Riot Games. Valorant is a trademark of Riot Games.
      </footer>
    </main>
  );
}
