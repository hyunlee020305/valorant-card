'use client';

import { useState } from 'react';
import type { ProcessedPlayerStats } from '@/types';

interface UsePlayerSearchReturn {
  search: (name: string, tag: string, region: string) => Promise<ProcessedPlayerStats | null>;
  data: ProcessedPlayerStats | null;
  loading: boolean;
  error: string | null;
}

export function usePlayerSearch(): UsePlayerSearchReturn {
  const [data, setData] = useState<ProcessedPlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (name: string, tag: string, region: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const params = new URLSearchParams({ name, tag, region });
      const res = await fetch(`/api/player?${params}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? 'Failed to fetch player data');
      }

      setData(json.data);
      return json.data as ProcessedPlayerStats;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { search, data, loading, error };
}
