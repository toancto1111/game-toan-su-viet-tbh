// ========================================================
// KHUNG CHƯƠNG TRÌNH VÀ KIẾN THỨC TOÁN LỚP 8
// BỘ SÁCH: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (CHƯƠNG TRÌNH GDPT 2018)
// ========================================================

const commonSummaryPrefix = "### Kiến thức cần nắm\nToán học là nền tảng của tư duy binh pháp và chiến lược. Chúa công cần nắm vững các định nghĩa và quy tắc sau đây:\n\n";

export const TOAN_8_DATA = [
  // ─── TẬP 1 ─────────────────────────────────────────────────────────────
  {
    title: "Chương I: Đa thức",
    lessons: [
      {
        title: "Bài 1. Đơn thức",
        summary: commonSummaryPrefix + `### 1. Kiến thức trọng tâm
- **Đơn thức:** Là biểu thức đại số chỉ gồm một số, một biến hoặc một tích giữa các số và các biến. Đơn thức thu gọn gồm phần hệ số và phần biến.
- **Bậc của đơn thức:** Là tổng số mũ của tất cả các biến có trong đơn thức đó (với hệ số khác 0). Số thực khác 0 là đơn thức bậc 0, số 0 là đơn thức không có bậc.
- **Đơn thức đồng dạng:** Là hai đơn thức có hệ số khác 0 và có cùng phần biến.
- **Đa thức:** Là tổng của những đơn thức. Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó.
- **Tính giá trị biểu thức:** Thay trực tiếp giá trị của các biến vào đa thức (ưu tiên thu gọn đa thức trước khi thay số để tính toán nhanh hơn).

### 2. Lỗi sai thường gặp
- **Xác định sai phần biến và hệ số:** Ví dụ trong đơn thức $100abx^2yz$ (với $a, b$ là hằng số), học sinh hay nhầm phần biến bao gồm cả $a, b$ thay vì chỉ có $x^2yz$.
- **Quên thu gọn trước khi xác định bậc hoặc hệ số:** Ví dụ tính bậc của đa thức mà chưa triệt tiêu các đơn thức đồng dạng trái dấu, dẫn đến xác định sai bậc.
- **Cộng trừ sai đơn thức đồng dạng:** Quên giữ nguyên phần biến, hoặc cộng sai các hệ số âm dương.

### 3. Ví dụ minh họa tiêu biểu
**Ví dụ 1 (Đơn thức đồng dạng):** Xác định hằng số $a$ để các đơn thức $axy^3, -4xy^3, 7xy^3$ có tổng bằng $6xy^3$.
*Giải:* $(a-4+7)xy^3 = 6xy^3 \\Rightarrow a+3=6 \\Rightarrow a=3$.

**Ví dụ 2 (Tính giá trị đa thức):** Tính giá trị của $3x^4+5x^2y^2+2y^4+2y^2$ tại $x^2+y^2=2$.
*Giải:* Thu gọn bằng cách nhóm hạng tử để xuất hiện nhân tử chung $(x^2+y^2)$, kết quả ra 12.`
      },
      {
        title: "Bài 2. Đa thức",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 3. Phép cộng và phép trừ đa thức",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 4. Phép nhân đa thức",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 5. Phép chia đa thức cho đơn thức",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương I",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương II: Hằng đẳng thức đáng nhớ và ứng dụng",
    lessons: [
      {
        title: "Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 7. Lập phương của một tổng. Lập phương của một hiệu",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 8. Tổng và hiệu hai lập phương",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 9. Phân tích đa thức thành nhân tử",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương II",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương III: Tứ giác",
    lessons: [
      {
        title: "Bài 10. Tứ giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 11. Hình thang cân",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 12. Hình bình hành",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 13. Hình chữ nhật",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 14. Hình thoi và hình vuông",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương III",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương IV: Định lí Thalès",
    lessons: [
      {
        title: "Bài 15. Định lí Thalès trong tam giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 16. Đường trung bình của tam giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 17. Tính chất đường phân giác của tam giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương IV",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương V: Dữ liệu và biểu đồ",
    lessons: [
      {
        title: "Bài 18. Thu thập và phân loại dữ liệu",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 19. Biểu diễn dữ liệu bằng bảng, biểu đồ",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 20. Phân tích số liệu thống kê dựa vào biểu đồ",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương V",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  // ─── TẬP 2 ─────────────────────────────────────────────────────────────
  {
    title: "Chương VI: Phân thức đại số",
    lessons: [
      {
        title: "Bài 21. Phân thức đại số",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 22. Tính chất cơ bản của phân thức đại số",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 23. Phép cộng và phép trừ phân thức đại số",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 24. Phép nhân và phép chia phân thức đại số",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương VI",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương VII: Phương trình bậc nhất và hàm số bậc nhất",
    lessons: [
      {
        title: "Bài 25. Phương trình bậc nhất một ẩn",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 26. Giải bài toán bằng cách lập phương trình",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 27. Khái niệm hàm số và đồ thị của hàm số",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 28. Hàm số bậc nhất và đồ thị của hàm số bậc nhất",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 29. Hệ số góc của đường thẳng",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương VII",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương VIII: Mở đầu về tính xác suất của biến cố",
    lessons: [
      {
        title: "Bài 30. Kết quả có thể và kết quả thuận lợi",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 31. Cách tính xác suất của biến cố bằng tỉ số",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 32. Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương VIII",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương IX: Tam giác đồng dạng",
    lessons: [
      {
        title: "Bài 33. Hai tam giác đồng dạng",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 34. Ba trường hợp đồng dạng của hai tam giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 35. Định lí Pythagore và ứng dụng",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 36. Các trường hợp đồng dạng của hai tam giác vuông",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 37. Hình đồng dạng",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương IX",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương X: Một số hình khối trong thực tiễn",
    lessons: [
      {
        title: "Bài 38. Hình chóp tam giác đều",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 39. Hình chóp tứ giác đều",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương X",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  }
];
