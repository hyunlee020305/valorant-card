'use client';

import { useState } from 'react';
import type { ProcessedPlayerStats } from '@/types';

interface GenerateCardParams {
  playerStats: ProcessedPlayerStats;
  bio: string;
  language: 'ko' | 'en';
}

interface UseCardGenerationReturn {
  generateBio: (stats: ProcessedPlayerStats, language: 'ko' | 'en') => Promise<string | null>;
  generateCard: (params: GenerateCardParams) => Promise<string | null>;
  bio: string | null;
  setBio: (bio: string) => void;
  cardUrl: string | null;
  setCardUrl: (url: string) => void;
  bioLoading: boolean;
  cardLoading: boolean;
  error: string | null;
}

export function useCardGeneration(): UseCardGenerationReturn {
  const [bio, setBio] = useState<string | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [bioLoading, setBioLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBioFn = async (stats: ProcessedPlayerStats, language: 'ko' | 'en') => {
    setBioLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerStats: stats, language }),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? 'Failed to generate bio');

      setBio(json.bio);
      return json.bio as string;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setBioLoading(false);
    }
  };

  const generateCardFn = async (params: GenerateCardParams) => {
    setCardLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? 'Failed to generate card');
      }

      const blob = await res.blob();
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      setCardUrl(dataUrl);
      return dataUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setCardLoading(false);
    }
  };

  return {
    generateBio: generateBioFn,
    generateCard: generateCardFn,
    bio,
    setBio,
    cardUrl,
    setCardUrl,
    bioLoading,
    cardLoading,
    error,
  };
}
