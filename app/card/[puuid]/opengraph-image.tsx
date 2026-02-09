import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'VALOCARD - Valorant Profile Card';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ puuid: string }> }) {
  const { puuid } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)',
          fontFamily: 'Inter, sans-serif',
          color: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#FF4655',
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: '64px',
            fontWeight: 700,
            letterSpacing: '-2px',
          }}
        >
          <span style={{ color: '#ffffff' }}>VALO</span>
          <span style={{ color: '#FF4655' }}>CARD</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            color: '#888',
          }}
        >
          AI-Powered Valorant Profile Card
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '16px',
            padding: '12px 32px',
            background: '#FF4655',
            borderRadius: '8px',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          View Profile Card
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
