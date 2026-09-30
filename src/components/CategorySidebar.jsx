import { CATEGORIES } from '../constants'

export default function CategorySidebar({ todos, value, onChange }) {
  const items = [
    ['all', 'ทุกหมวด', '#8a90a0', todos.length],
    ...Object.entries(CATEGORIES).map(([k, c]) => [k, c.label, c.dot, todos.filter((t) => t.category === k).length]),
  ]

  return (
    <nav aria-label="หมวดหมู่" className="card p-2 md:p-3">
      <p className="hidden md:block text-sm font-semibold px-2 pb-2">หมวดหมู่</p>
      <div className="flex md:flex-col gap-1 overflow-x-auto">
        {items.map(([key, label, dot, count]) => {
          const active = value === key
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-pressed={active}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors"
              style={{
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? '#fff' : 'var(--text)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: dot }} />
              <span className="flex-1 text-left">{label}</span>
              <span className="text-xs tabular-nums" style={{ opacity: active ? 0.9 : 0.6 }}>{count}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
