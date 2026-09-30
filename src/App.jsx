import { useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import TodoItem from './components/TodoItem'
import CategorySidebar from './components/CategorySidebar'
import StatsCard from './components/StatsCard'
import { PRIORITIES, CATEGORIES, FILTERS } from './constants'
import { addDays, dueStatus } from './utils'

let nextId = 6

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high', category: 'work', dueDate: addDays(-2) },
    { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium', category: 'shopping', dueDate: addDays(0) },
    { id: 3, text: 'โทรหาคุณยาย', done: true, priority: 'low', category: 'personal', dueDate: addDays(-1) },
    { id: 4, text: 'นัดตรวจสุขภาพประจำปี', done: false, priority: 'medium', category: 'health', dueDate: addDays(5) },
    { id: 5, text: 'เตรียมสไลด์ประชุมทีม', done: false, priority: 'high', category: 'work', dueDate: addDays(1) },
  ])
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('personal')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState('all')
  const [catFilter, setCatFilter] = useState('all')
  const [query, setQuery] = useState('')

  const add = () => {
    const t = input.trim()
    if (!t) return
    setTodos((l) => [{ id: nextId++, text: t, done: false, priority, category, dueDate }, ...l])
    setInput('')
    setDueDate('')
  }
  const toggle = (id) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const del = (id) => setTodos((l) => l.filter((t) => t.id !== id))
  const edit = (id, text) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, text } : t)))
  const clearDone = () => setTodos((l) => l.filter((t) => !t.done))

  const doneCount = todos.filter((t) => t.done).length
  const overdueCount = todos.filter((t) => !t.done && dueStatus(t) === 'overdue').length
  const remaining = todos.length - doneCount
  const activeCount = remaining - overdueCount

  const q = query.trim().toLowerCase()
  const shown = todos.filter(
    (t) =>
      (filter === 'all' ? true : filter === 'active' ? !t.done : t.done) &&
      (catFilter === 'all' || t.category === catFilter) &&
      (!q || t.text.toLowerCase().includes(q))
  )
  const emptyText = q
    ? `ไม่พบรายการที่ตรงกับ "${query.trim()}"`
    : { all: 'ยังไม่มีรายการ เพิ่มรายการแรกได้เลย', active: 'ไม่มีรายการที่ค้างอยู่', done: 'ยังไม่มีรายการที่เสร็จแล้ว' }[filter]

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">รายการสิ่งที่ต้องทำ</h1>

      <StatsCard total={todos.length} done={doneCount} active={activeCount} overdue={overdueCount} />

      <div className="grid md:grid-cols-[200px_1fr] gap-4 items-start">
        <CategorySidebar todos={todos} value={catFilter} onChange={setCatFilter} />

        <div className="min-w-0">
          <div className="card p-3 sm:p-4 mb-4">
            <div className="flex flex-col gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && add()}
                placeholder="เพิ่มรายการใหม่..."
                aria-label="รายการใหม่"
                className="field w-full"
              />
              <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2">
                <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="หมวดหมู่" className="field">
                  {Object.entries(CATEGORIES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="ระดับความสำคัญ" className="field">
                  {Object.entries(PRIORITIES).map(([k, v]) => (
                    <option key={k} value={k}>สำคัญ: {v.label}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  aria-label="วันครบกำหนด"
                  className="field col-span-2 sm:col-span-1"
                />
                <button
                  onClick={add}
                  className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 font-medium text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  <Plus size={18} /> เพิ่ม
                </button>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="relative p-2">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหารายการ..."
                aria-label="ค้นหารายการ"
                className="field w-full !py-2 !pl-9 !pr-9"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="ล้างการค้นหา"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md"
                  style={{ color: 'var(--muted)' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex gap-1 px-2 pb-2" role="tablist">
              {FILTERS.map(([k, label]) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={filter === k}
                  onClick={() => setFilter(k)}
                  className="flex-1 rounded-lg py-2 text-sm font-medium transition-colors"
                  style={{
                    background: filter === k ? 'var(--accent)' : 'transparent',
                    color: filter === k ? '#fff' : 'var(--muted)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <ul>
              {shown.map((t) => (
                <TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={del} onEdit={edit} />
              ))}
            </ul>

            {shown.length === 0 && (
              <p className="text-center py-10 border-t text-sm" style={{ color: 'var(--muted)', borderColor: 'var(--line)' }}>
                {emptyText}
              </p>
            )}

            <div
              className="flex items-center justify-between gap-2 px-4 py-3 border-t text-sm"
              style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
            >
              <span>เหลืออีก {remaining} งาน</span>
              <button
                onClick={clearDone}
                disabled={doneCount === 0}
                className="rounded-lg px-3 py-1.5 font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ color: 'var(--accent)' }}
              >
                ล้างรายการที่เสร็จแล้ว ({doneCount})
              </button>
            </div>
          </div>

          <p className="text-center text-xs mt-4" style={{ color: 'var(--muted)' }}>
            ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · กด Enter เพื่อบันทึก
          </p>
        </div>
      </div>
    </main>
  )
}
