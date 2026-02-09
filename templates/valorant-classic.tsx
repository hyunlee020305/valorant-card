import type { TemplateProps } from './types';

export function ValorantClassicTemplate({ data }: TemplateProps) {
  const { playerStats, bio, backgroundImage } = data;
  const { account, rank, overall, topAgents, playstyle } = playerStats;
  const fontFamily = data.language === 'ko' ? 'Pretendard' : 'Inter';

  return (
    <div
      style={{
        display: 'flex',
        width: '800px',
        height: '450px',
        background: 'linear-gradient(160deg, #111111 0%, #1a1a2e 50%, #16213e 100%)',
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
            opacity: 0.35,
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
            background: 'linear-gradient(160deg, rgba(17,17,17,0.7) 0%, rgba(26,26,46,0.6) 50%, rgba(22,33,62,0.7) 100%)',
          }}
        />
      )}
      {/* Red accent top bar */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: '#FF4655',
        }}
      />

      {/* Diagonal red accent */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, rgba(255,70,85,0.2), transparent)',
          borderRadius: '50%',
        }}
      />

      {/* Left panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '340px',
          padding: '30px 24px',
          justifyContent: 'space-between',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '11px',
              fontWeight: 700,
              color: '#FF4655',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            PLAYER CARD
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '30px',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
            }}
          >
            {account.name}
          </div>
          <div style={{ display: 'flex', fontSize: '14px', color: '#666' }}>
            #{account.tag} · Lv.{account.account_level}
          </div>
        </div>

        {/* Rank */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'rgba(255,70,85,0.08)',
            border: '1px solid rgba(255,70,85,0.2)',
            borderRadius: '8px',
          }}
        >
          {rank.tierImage && (
            <img src={rank.tierImage} width={44} height={44} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: '18px', fontWeight: 700, color: '#FF4655' }}>
              {rank.tierName}
            </div>
            <div style={{ display: 'flex', fontSize: '12px', color: '#888' }}>
              {rank.rankInTier} RR · {overall.totalGames} Games
            </div>
          </div>
        </div>

        {/* Bio */}
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            color: '#999',
            lineHeight: 1.6,
            borderLeft: '3px solid #FF4655',
            paddingLeft: '12px',
          }}
        >
          {bio}
        </div>

        {/* Top agents */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {topAgents.slice(0, 3).map((agent) => (
            <div
              key={agent.agent}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '6px',
                flex: 1,
              }}
            >
              {agent.agentImage && (
                <img
                  src={agent.agentImage}
                  width={22}
                  height={22}
                  style={{ borderRadius: '50%' }}
                />
              )}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', fontSize: '11px', fontWeight: 700 }}>{agent.agent}</div>
                <div style={{ display: 'flex', fontSize: '9px', color: '#777' }}>{agent.kd} KD</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Stats */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '30px 28px',
          justifyContent: 'space-between',
          borderLeft: '1px solid rgba(255,70,85,0.15)',
        }}
      >
        {/* Primary stats - large */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: '36px', fontWeight: 700, color: '#FF4655' }}>
              {overall.kd}
            </div>
            <div style={{ display: 'flex', fontSize: '10px', color: '#666', letterSpacing: '2px' }}>
              K/D RATIO
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: '36px', fontWeight: 700, color: '#fff' }}>
              {overall.winRate}%
            </div>
            <div style={{ display: 'flex', fontSize: '10px', color: '#666', letterSpacing: '2px' }}>
              WIN RATE
            </div>
          </div>
        </div>

        {/* Secondary stats */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { label: 'HS%', value: `${overall.headshotPercent}%` },
            { label: 'ADR', value: overall.avgDamagePerRound.toString() },
            { label: 'AVG K', value: overall.avgKills.toString() },
            { label: 'AVG D', value: overall.avgDeaths.toString() },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                padding: '10px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '6px',
              }}
            >
              <div style={{ display: 'flex', fontSize: '20px', fontWeight: 700 }}>{stat.value}</div>
              <div style={{ display: 'flex', fontSize: '9px', color: '#666', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Playstyle radar-like bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Aggression', value: playstyle.aggression },
            { label: 'Accuracy', value: playstyle.accuracy },
            { label: 'Consistency', value: playstyle.consistency },
            { label: 'Teamplay', value: playstyle.teamplay },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', width: '80px', fontSize: '10px', color: '#888' }}>
                {stat.label}
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  height: '6px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: `${stat.value}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, #FF4655, ${stat.value > 70 ? '#ff8888' : '#FF4655'})`,
                    borderRadius: '3px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', width: '28px', fontSize: '10px', color: '#FF4655', fontWeight: 700 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Recent form + playstyle tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {playerStats.recentForm.lastFiveResults.map((result, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  width: '22px',
                  height: '22px',
                  borderRadius: '3px',
                  background: result === 'W' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                  border: `1px solid ${result === 'W' ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: result === 'W' ? '#22c55e' : '#ef4444',
                }}
              >
                {result}
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              padding: '4px 12px',
              background: 'rgba(255,70,85,0.1)',
              border: '1px solid rgba(255,70,85,0.3)',
              borderRadius: '4px',
              fontSize: '10px',
              color: '#FF4655',
              fontWeight: 700,
            }}
          >
            {playstyle.playstyleTag}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FF4655, transparent)',
        }}
      />
    </div>
  );
}
