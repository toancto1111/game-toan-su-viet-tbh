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
        title: "Bài 2. Các phép toán với đa thức nhiều biến",
        summary: commonSummaryPrefix + `### 1. Kiến thức trọng tâm
- **Nhân đơn thức với đa thức, đa thức với đa thức:** Áp dụng tính chất phân phối của phép nhân đối với phép cộng: $A(B+C) = AB + AC$ và $(A+B)(C+D) = AC + AD + BC + BD$.
- **Chia đa thức cho đơn thức:** Muốn chia một đa thức cho một đơn thức (trường hợp chia hết), ta chia từng hạng tử của đa thức cho đơn thức đó rồi cộng các kết quả lại với nhau.
- **Cộng, trừ đa thức nhiều biến:** Bỏ dấu ngoặc (chú ý quy tắc dấu) và thu gọn các hạng tử đồng dạng.
- **Ứng dụng thực tế và hình học:** Sử dụng các phép toán đa thức để biểu diễn chu vi, diện tích, thể tích của các hình (tam giác, chữ nhật, hình hộp, hình thang) hoặc giải các bài toán thực tế (bán hàng, tính tiền lãi, chia lô đất).

### 2. Các lỗi sai thường gặp
- **Sai lầm về dấu:** Khi trừ hai đa thức hoặc nhân/chia với đơn thức có hệ số âm, học sinh thường quên đổi dấu toàn bộ các hạng tử bên trong.
- **Sai lầm về số mũ:** Khi nhân hoặc chia các lũy thừa cùng cơ số, hay nhầm lẫn giữa phép cộng và phép nhân số mũ (ví dụ $x^2 \\cdot x^3$ tính nhầm thành $x^6$ thay vì $x^5$).
- **Không thu gọn trước khi tính giá trị:** Thay số trực tiếp vào biểu thức dài và phức tạp dẫn đến sai sót tính toán thay vì thu gọn biểu thức trước.
- **Thiết lập sai biểu thức hình học:** Không trừ đi các phần bị khoét lõm (như cửa sổ, góc hộp) khi tính diện tích, thể tích phần còn lại.

### 3. Ví dụ minh họa
**Phép chia:** $(-2x^5y^3 + 3x^2y^2 - 4x^3y) : (-2x^2y) = x^3y^2 - \\dfrac{3}{2}xy + 2$.

**Tính giá trị biểu thức:** Rút gọn $E = \\dfrac{2}{3}x^2y^3 : \\left(-\\dfrac{1}{3}xy\\right) + 2x(y-1)(y+1)$ ta được $E = -2xy^2 + 2x(y^2-1) = -2x$. Giá trị này chỉ phụ thuộc vào $x$, không phụ thuộc vào $y$.`
      },
      {
        title: "Bài 3. Phép cộng và phép trừ đa thức",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 4. Phép nhân đa thức",
        summary: commonSummaryPrefix + `### 1. Kiến thức trọng tâm
- **Nhân đơn thức với đơn thức, đa thức với đa thức:** Đây là trọng tâm chính của bài. Áp dụng quy tắc nhân hệ số với hệ số, phần biến với phần biến (cộng số mũ các biến giống nhau). Khi nhân hai đa thức, ta nhân từng hạng tử của đa thức này với từng hạng tử của đa thức kia rồi cộng kết quả lại.
- **Bậc của đa thức thu gọn:** Bậc của một đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó. Lưu ý: Phải thu gọn đa thức trước khi xác định bậc.
- **Giải toán bằng cách lập phương trình:** Ứng dụng các phép toán đa thức vào bài toán thực tế (tính diện tích, chu vi, thể tích, bài toán số học). Cần cẩn thận trong việc lập biểu thức đại số từ lời văn.

### 2. Các lỗi sai thường gặp
- **Sai dấu khi nhân:** Đặc biệt khi nhân các hạng tử mang dấu âm. VD: $(-x^2) \\cdot (-2x) = 2x^3$ nhưng học sinh hay nhầm thành $-2x^3$.
- **Xác định bậc sai do chưa thu gọn:** Học sinh thường nhìn vào hạng tử có số mũ cao nhất ban đầu để kết luận bậc mà không nhận ra hạng tử đó có thể bị triệt tiêu sau khi thu gọn.
- **Nhầm lẫn giữa nhân và cộng số mũ:** $x^2 \\cdot x^3 = x^5$ (cộng số mũ), nhưng học sinh dễ nhầm thành $x^6$ (nhân số mũ).

### 3. Ví dụ minh họa tiêu biểu
- **Nhân đa thức:** $(x-y)(x^2+xy+y^2) = x^3+x^2y+xy^2 - x^2y-xy^2-y^3 = x^3-y^3$.
- **Tìm x:** $(3x+2)(x-1) - 3(x+1)(x-2) = 4 \\Rightarrow (3x^2-x-2) - 3(x^2-x-2) = 4 \\Rightarrow 3x^2-x-2-3x^2+3x+6 = 4 \\Rightarrow 2x+4=4 \\Rightarrow x=0$.`
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
