import type { TemplateProps } from './types';

export function NeonCyberTemplate({ data }: TemplateProps) {
  const { playerStats, bio, backgroundImage } = data;
  const { account, rank, overall, topAgents, playstyle } = playerStats;
  const fontFamily = data.language === 'ko' ? 'Pretendard' : 'Inter';

  return (
    <div
      style={{
        display: 'flex',
        width: '800px',
        height: '450px',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #0a1628 100%)',
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
            opacity: 0.4,
          }}
        />
      )}
      {/* Dark overlay for readability */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: backgroundImage
            ? 'linear-gradient(135deg, rgba(10,10,26,0.7) 0%, rgba(26,10,46,0.6) 40%, rgba(10,22,40,0.7) 100%)'
            : 'transparent',
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
        }}
      />

      {/* Left section - Player info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '320px',
          padding: '28px 24px',
          justifyContent: 'space-between',
        }}
      >
        {/* Player name and rank */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '13px',
              color: '#00ffff',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            VALORANT PROFILE
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            {account.name}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '14px',
              color: '#888',
            }}
          >
            #{account.tag}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            {rank.tierImage && (
              <img
                src={rank.tierImage}
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
              />
            )}
            <div
              style={{
                display: 'flex',
                fontSize: '16px',
                fontWeight: 700,
                color: '#ff00ff',
              }}
            >
              {rank.tierName}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            color: '#aaa',
            lineHeight: 1.5,
            borderLeft: '2px solid #00ffff',
            paddingLeft: '10px',
          }}
        >
          {bio}
        </div>

        {/* Playstyle tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '4px 12px',
              background: 'rgba(0,255,255,0.15)',
              border: '1px solid rgba(0,255,255,0.3)',
              borderRadius: '4px',
              fontSize: '11px',
              color: '#00ffff',
              fontWeight: 700,
            }}
          >
            {playstyle.playstyleTag}
          </div>
          <div
            style={{
              display: 'flex',
              padding: '4px 12px',
              background: 'rgba(255,0,255,0.15)',
              border: '1px solid rgba(255,0,255,0.3)',
              borderRadius: '4px',
              fontSize: '11px',
              color: '#ff00ff',
              fontWeight: 700,
            }}
          >
            {playstyle.rolePreference}
          </div>
        </div>
      </div>

      {/* Right section - Stats */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '28px 24px',
          justifyContent: 'space-between',
          borderLeft: '1px solid rgba(0,255,255,0.15)',
        }}
      >
        {/* Stats grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {[
            { label: 'K/D', value: overall.kd.toString(), color: '#00ffff' },
            { label: 'WIN%', value: `${overall.winRate}%`, color: '#00ff88' },
            { label: 'HS%', value: `${overall.headshotPercent}%`, color: '#ff00ff' },
            { label: 'ADR', value: overall.avgDamagePerRound.toString(), color: '#ffaa00' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100px',
                padding: '10px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
              }}
            >
              <div style={{ display: 'flex', fontSize: '10px', color: '#666', letterSpacing: '1px' }}>
                {stat.label}
              </div>
              <div style={{ display: 'flex', fontSize: '24px', fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Top agents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', fontSize: '10px', color: '#666', letterSpacing: '2px' }}>
            TOP AGENTS
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {topAgents.slice(0, 3).map((agent) => (
              <div
                key={agent.agent}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px',
                }}
              >
                {agent.agentImage && (
                  <img
                    src={agent.agentImage}
                    width={24}
                    height={24}
                    style={{ borderRadius: '50%' }}
                  />
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                    {agent.agent}
                  </div>
                  <div style={{ display: 'flex', fontSize: '10px', color: '#888' }}>
                    {agent.kd} KD · {agent.winRate}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playstyle bars */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { label: 'AGG', value: playstyle.aggression, color: '#ff4444' },
            { label: 'ACC', value: playstyle.accuracy, color: '#00ffff' },
            { label: 'CON', value: playstyle.consistency, color: '#00ff88' },
            { label: 'TMP', value: playstyle.teamplay, color: '#ff00ff' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#666' }}>
                <span>{stat.label}</span>
                <span>{stat.value}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  height: '4px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: `${stat.value}%`,
                    height: '100%',
                    background: stat.color,
                    borderRadius: '2px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
        }}
      />
    </div>
  );
}
