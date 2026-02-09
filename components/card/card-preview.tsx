'use client';

import { SkeletonCard } from '@/components/ui/spinner';

interface CardPreviewProps {
  cardUrl: string | null;
  loading: boolean;
}

export function CardPreview({ cardUrl, loading }: CardPreviewProps) {
  if (loading) {
    return <SkeletonCard />;
  }

  if (!cardUrl) {
    return (
      <div className="w-full max-w-[800px] aspect-video rounded-xl border border-dashed border-white/10 flex items-center justify-center">
        <p className="text-sm text-gray-500">Your card will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px]">
      <img
        src={cardUrl}
        alt="Valorant Profile Card"
        className="w-full rounded-xl shadow-2xl shadow-black/50"
      />
    </div>
  );
}
