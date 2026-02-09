import type { TemplateProps } from './types';

export function CleanMinimalTemplate({ data }: TemplateProps) {
  const { playerStats, bio, backgroundImage } = data;
  const { account, rank, overall, topAgents, playstyle } = playerStats;
  const fontFamily = data.language === 'ko' ? 'Pretendard' : 'Inter';

  return (
    <div
      style={{
        display: 'flex',
        width: '800px',
        height: '450px',
        background: '#0f0f0f',
        fontFamily,
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* AI background */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          width={800}
          height={450}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '800px',
            height: '450px',
            objectFit: 'cover',
            opacity: 0.3,
          }}
        />
      )}
      {backgroundImage && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15,15,15,0.65)',
          }}
        />
      )}
      {/* Left column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '32px 28px',
          background: '#141414',
          justifyContent: 'space-between',
        }}
      >
        {/* Profile header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {account.card?.small && (
              <img
                src={account.card.small}
                width={48}
                height={48}
                style={{ borderRadius: '8px' }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {account.name}
              </div>
              <div style={{ display: 'flex', fontSize: '13px', color: '#555' }}>
                #{account.tag}
              </div>
            </div>
          </div>

          {/* Rank badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: '#1a1a1a',
              borderRadius: '8px',
            }}
          >
            {rank.tierImage && (
              <img src={rank.tierImage} width={36} height={36} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: '15px', fontWeight: 700 }}>
                {rank.tierName}
              </div>
              <div style={{ display: 'flex', fontSize: '11px', color: '#666' }}>
                {rank.rankInTier} RR
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            color: '#888',
            lineHeight: 1.6,
          }}
        >
          {bio}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              padding: '4px 10px',
              background: '#1f1f1f',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#aaa',
            }}
          >
            {playstyle.playstyleTag}
          </div>
          <div
            style={{
              display: 'flex',
              padding: '4px 10px',
              background: '#1f1f1f',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#aaa',
            }}
          >
            Lv.{account.account_level}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '32px 28px',
          justifyContent: 'space-between',
        }}
      >
        {/* Main stats */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { label: 'K/D Ratio', value: overall.kd.toString() },
            { label: 'Win Rate', value: `${overall.winRate}%` },
            { label: 'Headshot %', value: `${overall.headshotPercent}%` },
            { label: 'ADR', value: overall.avgDamagePerRound.toString() },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </div>
              <div style={{ display: 'flex', fontSize: '28px', fontWeight: 700, color: '#fff' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed stats row */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            padding: '14px 0',
            borderTop: '1px solid #1f1f1f',
            borderBottom: '1px solid #1f1f1f',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', fontSize: '10px', color: '#555' }}>AVG KILLS</div>
            <div style={{ display: 'flex', fontSize: '16px', fontWeight: 700 }}>{overall.avgKills}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', fontSize: '10px', color: '#555' }}>AVG DEATHS</div>
            <div style={{ display: 'flex', fontSize: '16px', fontWeight: 700 }}>{overall.avgDeaths}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', fontSize: '10px', color: '#555' }}>AVG ASSISTS</div>
            <div style={{ display: 'flex', fontSize: '16px', fontWeight: 700 }}>{overall.avgAssists}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', fontSize: '10px', color: '#555' }}>GAMES</div>
            <div style={{ display: 'flex', fontSize: '16px', fontWeight: 700 }}>{overall.totalGames}</div>
          </div>
        </div>

        {/* Top agents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', fontSize: '10px', color: '#555', letterSpacing: '1px' }}>
            MOST PLAYED
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {topAgents.slice(0, 3).map((agent, i) => (
              <div
                key={agent.agent}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  background: i === 0 ? '#1a1a1a' : 'transparent',
                  borderRadius: '8px',
                  flex: 1,
                }}
              >
                {agent.agentImage && (
                  <img
                    src={agent.agentImage}
                    width={28}
                    height={28}
                    style={{ borderRadius: '50%' }}
                  />
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', fontSize: '13px', fontWeight: 700 }}>
                    {agent.agent}
                  </div>
                  <div style={{ display: 'flex', fontSize: '10px', color: '#666' }}>
                    {agent.games}G · {agent.kd} KD
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent form */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', fontSize: '10px', color: '#555', letterSpacing: '1px' }}>
            RECENT
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {playerStats.recentForm.lastFiveResults.map((result, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: result === 'W' ? '#22c55e' : '#ef4444',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                {result}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
