const R = 34
const C = 2 * Math.PI * R

export default function StatsCard({ total, done, active, overdue }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  const segments = [
    { label: 'เสร็จแล้ว', value: done, color: '#2fb872' },
    { label: 'กำลังทำ', value: active, color: 'var(--accent)' },
    { label: 'เกินกำหนด', value: overdue, color: '#e5484d' },
  ]

  let offset = 0
  const arcs = segments.map((s) => {
    const len = total ? (s.value / total) * C : 0
    const arc = { ...s, len, offset }
    offset += len
    return arc
  })

  return (
    <section className="card p-4 sm:p-5 mb-4 flex items-center gap-4 sm:gap-8" aria-label="สถิติ">
      <div className="flex gap-6 sm:gap-10 flex-1">
        <div>
          <p className="text-3xl font-semibold tabular-nums">{total}</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>รายการทั้งหมด</p>
        </div>
        <div>
          <p className="text-3xl font-semibold tabular-nums">{pct}%</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>เสร็จแล้ว</p>
        </div>
      </div>

      <ul className="hidden sm:block text-sm space-y-1">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            <span style={{ color: 'var(--muted)' }}>{s.label}</span>
            <span className="tabular-nums font-medium ml-auto pl-3">{s.value}</span>
          </li>
        ))}
      </ul>

      <svg width="88" height="88" viewBox="0 0 88 88" role="img" aria-label={`เสร็จแล้ว ${pct}%`} className="shrink-0">
        <g transform="rotate(-90 44 44)" fill="none" strokeWidth="12">
          <circle cx="44" cy="44" r={R} stroke="var(--line)" />
          {arcs.map((a) =>
            a.len > 0 ? (
              <circle
                key={a.label}
                cx="44"
                cy="44"
                r={R}
                stroke={a.color}
                strokeDasharray={`${a.len} ${C - a.len}`}
                strokeDashoffset={-a.offset}
              />
            ) : null
          )}
        </g>
        <text x="44" y="49" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--text)">{pct}%</text>
      </svg>
    </section>
  )
}
