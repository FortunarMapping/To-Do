export const PRIORITIES = {
  low: { label: 'ต่ำ', badge: 'p-low', bar: 'bar-low' },
  medium: { label: 'ปานกลาง', badge: 'p-mid', bar: 'bar-mid' },
  high: { label: 'สูง', badge: 'p-high', bar: 'bar-high' },
}

export const CATEGORIES = {
  work: { label: 'งาน', tag: 't-work', dot: '#4c6ef5' },
  personal: { label: 'ส่วนตัว', tag: 't-personal', dot: '#9c5de4' },
  shopping: { label: 'ช้อปปิ้ง', tag: 't-shopping', dot: '#e64980' },
  health: { label: 'สุขภาพ', tag: 't-health', dot: '#12b0a0' },
}

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]
