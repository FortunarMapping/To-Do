import { useState, useRef, useEffect } from 'react'
import { Trash2, Check } from 'lucide-react'
import { PRIORITIES } from '../constants'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const [removing, setRemoving] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const save = () => {
    const t = text.trim()
    if (t) onEdit(todo.id, t)
    else setText(todo.text)
    setEditing(false)
  }

  const remove = () => {
    setRemoving(true)
    setTimeout(() => onDelete(todo.id), 250)
  }

  const p = PRIORITIES[todo.priority]

  return (
    <li className={`todo-item ${removing ? 'out' : ''}`}>
      <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: 'var(--line)' }}>
        <span className={`w-1 self-stretch rounded-full ${p.bar}`} />

        <button
          onClick={() => onToggle(todo.id)}
          aria-label={todo.done ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
          aria-pressed={todo.done}
          className="shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors"
          style={{
            borderColor: todo.done ? 'var(--accent)' : 'var(--muted)',
            background: todo.done ? 'var(--accent)' : 'transparent',
            color: '#fff',
          }}
        >
          {todo.done && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') {
                  setText(todo.text)
                  setEditing(false)
                }
              }}
              className="w-full rounded-md border px-2 py-1 text-base"
              style={{ background: 'var(--card)', borderColor: 'var(--accent)', color: 'var(--text)' }}
            />
          ) : (
            <span
              onDoubleClick={() => setEditing(true)}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className="block break-words cursor-text select-none"
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? 'var(--muted)' : 'var(--text)',
              }}
            >
              {todo.text}
            </span>
          )}
        </div>

        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${p.badge}`}>{p.label}</span>

        <button
          onClick={remove}
          aria-label="ลบรายการ"
          className="shrink-0 p-2 rounded-lg transition-colors hover:text-red-500"
          style={{ color: 'var(--muted)' }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  )
}
