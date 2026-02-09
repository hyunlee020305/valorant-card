'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { REGIONS } from '@/lib/constants';

interface RiotIdInputProps {
  onSearch: (name: string, tag: string, region: string) => void;
  loading?: boolean;
  initialValue?: string;
}

export function RiotIdInput({ onSearch, loading, initialValue }: RiotIdInputProps) {
  const [riotId, setRiotId] = useState(initialValue ?? '');
  const [region, setRegion] = useState('na');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parts = riotId.split('#');
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      setError('Please enter in GameName#Tag format (e.g. Player#NA1)');
      return;
    }

    const [name, tag] = parts;
    onSearch(name.trim(), tag.replace(/\s/g, ''), region);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
      <div className="flex gap-3">
        <Input
          value={riotId}
          onChange={(e) => setRiotId(e.target.value)}
          placeholder="GameName#Tag"
          error={error}
          className="flex-1"
          disabled={loading}
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-[#FF4655] transition-colors"
          disabled={loading}
        >
          {REGIONS.map((r) => (
            <option key={r.value} value={r.value} className="bg-gray-900">
              {r.short}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" loading={loading} className="w-full" size="lg">
        {loading ? 'Searching...' : 'Search Stats'}
      </Button>
    </form>
  );
}
