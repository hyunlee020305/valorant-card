'use client';

import { Button } from '@/components/ui/button';
import { showToast } from '@/components/ui/toast';

interface SharePanelProps {
  cardUrl: string | null;
  playerName: string;
  puuid: string;
}

export function SharePanel({ cardUrl, playerName, puuid }: SharePanelProps) {
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/card/${puuid}`
    : '';

  const handleDownload = () => {
    if (!cardUrl) return;
    const a = document.createElement('a');
    a.href = cardUrl;
    a.download = `${playerName}-valorant-card.png`;
    a.click();
    showToast('Card downloaded!', 'success');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Link copied!', 'success');
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Check out ${playerName}'s Valorant profile card! 🎮`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={handleDownload} disabled={!cardUrl} size="md">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Download
      </Button>
      <Button variant="secondary" onClick={handleCopyLink} size="md">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
        Copy Link
      </Button>
      <Button variant="secondary" onClick={handleShareTwitter} size="md">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Twitter
      </Button>
    </div>
  );
}
