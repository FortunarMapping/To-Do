import { useState } from 'react'
import { Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { PRIORITIES, FILTERS } from './constants'

let nextId = 4

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high' },
    { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium' },
    { id: 3, text: 'โทรหาคุณยาย', done: true, priority: 'low' },
  ])
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')

  const add = () => {
    const t = input.trim()
    if (!t) return
    setTodos((l) => [{ id: nextId++, text: t, done: false, priority }, ...l])
    setInput('')
  }
  const toggle = (id) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const del = (id) => setTodos((l) => l.filter((t) => t.id !== id))
  const edit = (id, text) => setTodos((l) => l.map((t) => (t.id === id ? { ...t, text } : t)))
  const clearDone = () => setTodos((l) => l.filter((t) => !t.done))

  const remaining = todos.filter((t) => !t.done).length
  const doneCount = todos.length - remaining
  const shown = todos.filter((t) => (filter === 'all' ? true : filter === 'active' ? !t.done : t.done))
  const emptyText = {
    all: 'ยังไม่มีรายการ เพิ่มรายการแรกได้เลย',
    active: 'ไม่มีรายการที่ค้างอยู่',
    done: 'ยังไม่มีรายการที่เสร็จแล้ว',
  }[filter]

  return (
    <main className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">รายการสิ่งที่ต้องทำ</h1>

      <div className="card p-3 sm:p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มรายการใหม่..."
            aria-label="รายการใหม่"
            className="field flex-1 min-w-0"
          />
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="ระดับความสำคัญ"
              className="field flex-1 sm:flex-none"
            >
              {Object.entries(PRIORITIES).map(([k, v]) => (
                <option key={k} value={k}>ความสำคัญ: {v.label}</option>
              ))}
            </select>
            <button
              onClick={add}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-medium text-white"
              style={{ background: 'var(--accent)' }}
            >
              <Plus size={18} /> เพิ่ม
            </button>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex gap-1 p-2" role="tablist">
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
    </main>
  )
}
