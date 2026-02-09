'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useCardGeneration } from '@/hooks/use-card-generation';
import { CardPreview } from '@/components/card/card-preview';
import { SharePanel } from '@/components/card/share-panel';
import { LoginButton } from '@/components/auth/login-button';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import type { ProcessedPlayerStats } from '@/types';

export default function CardPage({ params }: { params: Promise<{ puuid: string }> }) {
  const { puuid } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [playerStats, setPlayerStats] = useState<ProcessedPlayerStats | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    generateBio,
    generateCard,
    bio,
    setBio,
    cardUrl,
    setCardUrl,
    bioLoading,
    cardLoading,
    error,
  } = useCardGeneration();

  // Load player stats and saved card from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('playerStats');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ProcessedPlayerStats;
        if (parsed.account.puuid === puuid) {
          setPlayerStats(parsed);
        }
      } catch { /* ignore */ }
    }

    // Restore saved card data
    const savedCard = sessionStorage.getItem(`cardData:${puuid}`);
    if (savedCard) {
      try {
        const { bio: savedBio, cardUrl: savedUrl } = JSON.parse(savedCard);
        if (savedBio) setBio(savedBio);
        if (savedUrl) setCardUrl(savedUrl);
      } catch { /* ignore */ }
    }

    setLoading(false);
  }, [puuid]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle paid=true redirect (after payment success) — generate the card
  useEffect(() => {
    if (searchParams.get('paid') === 'true' && playerStats && !bioLoading && !cardLoading) {
      const doGenerate = async () => {
        const newBio = await generateBio(playerStats, 'en');
        if (newBio) {
          const newCardUrl = await generateCard({ playerStats, bio: newBio, language: 'en' });
          if (newCardUrl) {
            sessionStorage.setItem(`cardData:${puuid}`, JSON.stringify({ bio: newBio, cardUrl: newCardUrl }));
          }
        }
      };
      doGenerate();
      router.replace(`/card/${puuid}`);
    }
  }, [searchParams, playerStats]); // eslint-disable-line react-hooks/exhaustive-deps

  // Save card data to sessionStorage when generated
  useEffect(() => {
    if (bio && cardUrl) {
      sessionStorage.setItem(`cardData:${puuid}`, JSON.stringify({ bio, cardUrl }));
    }
  }, [bio, cardUrl, puuid]);

  const isAdmin = session?.user?.email === 'hyunlee020305@gmail.com';

  const handleGenerateCard = async () => {
    if (!playerStats) return;

    if (!session?.user) {
      signIn('google');
      return;
    }

    if (isAdmin) {
      const newBio = await generateBio(playerStats, 'en');
      if (newBio) {
        const newCardUrl = await generateCard({ playerStats, bio: newBio, language: 'en' });
        if (newCardUrl) {
          sessionStorage.setItem(`cardData:${puuid}`, JSON.stringify({ bio: newBio, cardUrl: newCardUrl }));
        }
      }
      return;
    }

    router.push(`/payment?puuid=${puuid}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner />
      </main>
    );
  }

  if (!playerStats) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-gray-400">Player data not found.</p>
        <Link href="/search">
          <Button>Search Again</Button>
        </Link>
      </main>
    );
  }

  const hasCard = !!cardUrl;

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/search" className="text-2xl font-bold tracking-tight">
            <span className="text-white">VALO</span>
            <span className="text-[#FF4655]">CARD</span>
          </Link>
          <div className="flex items-center gap-3">
            <LoginButton />
            <Link href="/search">
              <Button variant="ghost" size="sm">New Search</Button>
            </Link>
          </div>
        </div>

        {/* Player info bar */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                {playerStats.account.name}
              </h2>
              <span className="text-sm text-gray-500">#{playerStats.account.tag}</span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
              <span>{playerStats.rank.tierName}</span>
              <span>·</span>
              <span>K/D {playerStats.overall.kd}</span>
              <span>·</span>
              <span>WR {playerStats.overall.winRate}%</span>
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleGenerateCard}
            loading={bioLoading || cardLoading}
          >
            {hasCard ? (isAdmin ? 'Regenerate' : 'Regenerate ($1)') : (isAdmin ? 'Generate Card' : 'Generate Card ($1)')}
          </Button>
        </div>

        {/* Card preview or generate prompt */}
        {(bioLoading || cardLoading) ? (
          <div className="mb-6 flex justify-center">
            <CardPreview cardUrl={null} loading={true} />
          </div>
        ) : hasCard ? (
          <>
            <div className="mb-6 flex justify-center">
              <CardPreview cardUrl={cardUrl} loading={false} />
            </div>

            {bio && (
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-xs font-medium text-gray-500 mb-2">AI Profile Bio</h3>
                <p className="text-sm text-gray-300">{bio}</p>
              </div>
            )}

            <SharePanel
              cardUrl={cardUrl}
              playerName={playerStats.account.name}
              puuid={puuid}
            />
          </>
        ) : (
          <div className="mb-6 p-8 bg-white/5 rounded-lg border border-white/10 text-center">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-lg font-semibold text-white mb-2">Ready to create your card</h3>
            <p className="text-sm text-gray-400 mb-6">
              AI will analyze your stats and generate a unique profile card.
            </p>
            <Button onClick={handleGenerateCard}>
              {isAdmin ? 'Generate Card' : 'Generate Card — $1.00'}
            </Button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
