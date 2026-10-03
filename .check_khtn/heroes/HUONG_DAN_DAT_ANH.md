# 🖼️ HƯỚNG DẪN ĐẶT ẢNH TƯỚNG

## Cấu trúc thư mục

```
public/
└── heroes/
    ├── allies/          ← Ảnh tướng phe ta (quân Đại Việt)
    │   ├── h1_1.png     ← Kinh Dương Vương
    │   ├── h1_2.png     ← Thần Long Nữ
    │   └── ...
    ├── enemies/         ← Ảnh tướng phe địch
    │   ├── e1_1.png     ← Ân Vương
    │   ├── e1_2.png     ← Triệu Đà
    │   └── ...
    ├── default_ally.png   ← Ảnh mặc định khi chưa có ảnh riêng (phe ta)
    └── default_enemy.png  ← Ảnh mặc định khi chưa có ảnh riêng (phe địch)
```

## Định dạng ảnh được hỗ trợ
- `.png` (khuyên dùng)
- `.jpg` / `.jpeg`
- `.webp`

> **Lưu ý:** Tên file phải là `.png`. Nếu muốn dùng `.jpg`, hãy đổi phần mở rộng trong `constants.ts`

## Kích thước ảnh khuyên dùng
- **Tỉ lệ:** 2:3 (dọc) — ví dụ 400×600px
- **Tối thiểu:** 200×300px

---

## DANH SÁCH ẢNH CẦN ĐẶT — PHAI TA (allies/)

### Chương 1 — Hồng Bàng & An Dương Vương
| File       | Tên tướng         |
|------------|-------------------|
| h1_1.png   | Kinh Dương Vương  |
| h1_2.png   | Thần Long Nữ      |
| h1_3.png   | Lạc Long Quân     |
| h1_4.png   | Âu Cơ             |
| h1_5.png   | Hùng Vương        |
| h1_6.png   | Sơn Tinh          |
| h1_7.png   | Mị Nương          |
| h1_8.png   | Thánh Gióng       |
| h1_9.png   | Lang Liêu         |
| h1_10.png  | Tiên Dung         |
| h1_11.png  | Chử Đồng Tử       |
| h1_12.png  | Thục Phán         |
| h1_13.png  | Mị Châu           |
| h1_14.png  | Cao Lỗ            |
| h1_15.png  | Mai An Tiêm       |
| h1_16.png  | Hùng Lãng Công    |
| h1_17.png  | Ông Ích Tôn       |
| h1_18.png  | Cung binh         |
| h1_19.png  | Thủy binh         |
| h1_20.png  | Bộ binh           |

### Chương 2 — Hai Bà Trưng & Bà Triệu
| File       | Tên tướng          |
|------------|--------------------|
| h2_1.png   | Trưng Trắc         |
| h2_2.png   | Trưng Nhị          |
| h2_3.png   | Thi Sách           |
| h2_4.png   | Phùng Thị Chính    |
| h2_5.png   | Bát Nàn            |
| h2_6.png   | Triệu Thị Trinh    |
| h2_7.png   | Triệu Quốc Đạt     |
| h2_8.png   | Lý Ông Trọng       |
| h2_9.png   | Lê Chân            |
| h2_10.png  | Thánh Thiên        |
| ...        | (xem constants.ts) |

### Chương 3–10
> Xem file `constants.ts` phần `ALL_HEROES` để biết đầy đủ danh sách ID và tên tướng.

---

## DANH SÁCH ẢNH CẦN ĐẶT — PHE ĐỊCH (enemies/)

### Chương 1
| File       | Tên tướng   |
|------------|-------------|
| e1_1.png   | Ân Vương    |
| e1_2.png   | Triệu Đà    |
| e1_3.png   | Trọng Thủy  |
| e1_4.png   | Thủy Tinh   |
| e1_5.png   | Ngư Tinh    |
| e1_6.png   | Hồ Tinh     |
| e1_7.png   | Mộc Tinh    |

> Xem file `constants.ts` phần `ENEMY_HEROES_LIST` để biết đầy đủ danh sách.

---

## Cách hoạt động
1. Bạn đặt file `h1_1.png` vào `public/heroes/allies/`
2. Game tự động load ảnh đó cho tướng **Kinh Dương Vương**
3. Nếu file chưa có → game hiển thị `default_ally.png` hoặc `default_enemy.png` thay thế
4. **Ảnh được lưu cố định** — không bị mất dù offline hay reload game

## Tip
- Nên dùng ảnh tranh cổ phong (ukiyo-e, thủy mặc) để đúng không khí lịch sử
- Nền ảnh tối (đen/nâu) sẽ đẹp hơn khi hiển thị trong card tướng
