# รายการสิ่งที่ต้องทำ (Todo App)

React + Vite + Tailwind CSS + lucide-react. ข้อมูลเก็บใน React state เท่านั้น (ไม่ใช้ localStorage)

## เริ่มใช้งาน

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # สร้างไฟล์ใน dist/
npm run preview  # ดูผลลัพธ์จาก build
```

## โครงสร้าง

- `src/App.jsx` – หน้าหลัก, state, ฟอร์มเพิ่มรายการ, ค้นหา, แท็บกรอง
- `src/components/CategorySidebar.jsx` – ตัวกรองหมวดหมู่พร้อมจำนวน
- `src/components/StatsCard.jsx` – สถิติและโดนัทชาร์ต
- `src/utils.js` – ฟังก์ชันวันที่และสถานะวันครบกำหนด
- `src/components/TodoItem.jsx` – แต่ละรายการ (ติ๊ก, แก้ไขด้วยดับเบิลคลิก, ลบพร้อมอนิเมชัน)
- `src/constants.js` – ระดับความสำคัญและตัวกรอง
- `src/index.css` – Tailwind และธีมสี (รองรับโหมดมืดตามอุปกรณ์)
