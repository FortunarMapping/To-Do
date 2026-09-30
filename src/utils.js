const pad = (n) => String(n).padStart(2, '0')

const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const todayStr = () => toStr(new Date())

export const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toStr(d)
}

export const formatDate = (s) =>
  new Date(`${s}T00:00:00`).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })

// 'overdue' | 'today' | 'upcoming' | null
export const dueStatus = (todo) => {
  if (!todo.dueDate) return null
  const today = todayStr()
  if (todo.dueDate === today) return 'today'
  if (todo.dueDate < today) return 'overdue'
  return 'upcoming'
}
