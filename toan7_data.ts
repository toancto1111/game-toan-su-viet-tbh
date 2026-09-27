// ========================================================
// KHUNG CHƯƠNG TRÌNH VÀ KIẾN THỨC TOÁN LỚP 7
// BỘ SÁCH: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (CHƯƠNG TRÌNH GDPT 2018)
// ========================================================

const commonSummaryPrefix = "### Kiến thức cần nắm\nToán học là nền tảng của tư duy binh pháp và chiến lược. Chúa công cần nắm vững các định nghĩa và quy tắc sau đây:\n\n";

export const TOAN_7_DATA = [
  // ─── TẬP 1 ─────────────────────────────────────────────────────────────
  {
    title: "Chương I: Số hữu tỉ",
    lessons: [
      {
        title: "Bài 1. Tập hợp các số hữu tỉ",
        summary: commonSummaryPrefix + `### 1. Số hữu tỉ
- Số hữu tỉ là số có thể viết dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.
- Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.
- Mỗi số hữu tỉ đều được biểu diễn bởi một điểm trên trục số. Các điểm biểu diễn số hữu tỉ được sắp xếp theo thứ tự từ nhỏ đến lớn.

### 2. So sánh hai số hữu tỉ
- Để so sánh hai số hữu tỉ, ta viết chúng dưới dạng phân số có cùng mẫu dương rồi so sánh hai tử số.
- Số hữu tỉ lớn hơn $0$ gọi là số hữu tỉ dương. Số hữu tỉ nhỏ hơn $0$ gọi là số hữu tỉ âm. Số $0$ không là số hữu tỉ dương cũng không là số hữu tỉ âm.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - Nghĩ rằng số thập phân không phải là số hữu tỉ. (Thực tế: Số thập phân hữu hạn và vô hạn tuần hoàn đều là số hữu tỉ vì viết được dưới dạng phân số).`
      },
      {
        title: "Bài 2. Cộng, trừ, nhân, chia số hữu tỉ",
        summary: commonSummaryPrefix + `### 1. Cộng và trừ hai số hữu tỉ
- Ta có thể cộng, trừ hai số hữu tỉ $x, y$ bằng cách viết chúng dưới dạng phân số có cùng mẫu dương rồi áp dụng quy tắc cộng, trừ phân số.
- Tính chất: Phép cộng số hữu tỉ cũng có các tính chất giao hoán, kết hợp, cộng với số 0, cộng với số đối.

### 2. Nhân và chia hai số hữu tỉ
- Phép nhân: Ta nhân tử với tử, mẫu với mẫu. $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$.
- Phép chia: Ta nhân số bị chia với nghịch đảo của số chia. $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}$ (với $c \\neq 0$).

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - Khi chia hai phân số, quên nghịch đảo phân số thứ hai mà nhân trực tiếp.`
      },
      {
        title: "Bài 3. Luỹ thừa với số mũ tự nhiên của một số hữu tỉ",
        summary: commonSummaryPrefix + `### 1. Khái niệm luỹ thừa
- Luỹ thừa bậc $n$ của một số hữu tỉ $x$ là tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $x$.
- Kí hiệu: $x^n = x \\cdot x \\dots x$ ($n$ thừa số, $n \\in \\mathbb{N}, n > 1$).
- Nếu $x = \\frac{a}{b}$ thì $x^n = (\\frac{a}{b})^n = \\frac{a^n}{b^n}$.

### 2. Các phép toán với luỹ thừa
- Nhân hai luỹ thừa cùng cơ số: $x^m \\cdot x^n = x^{m+n}$
- Chia hai luỹ thừa cùng cơ số: $x^m : x^n = x^{m-n}$ ($x \\neq 0, m \\ge n$)
- Luỹ thừa của luỹ thừa: $(x^m)^n = x^{m \\cdot n}$

> [!WARNING]
> Cần cẩn thận khi tính luỹ thừa của số âm:
> - Số âm mũ chẵn sẽ ra số dương. Ví dụ: $(-2)^2 = 4$.
> - Số âm mũ lẻ sẽ ra số âm. Ví dụ: $(-2)^3 = -8$.`
      },
      {
        title: "Bài 4. Thứ tự thực hiện các phép tính. Quy tắc chuyển vế",
        summary: commonSummaryPrefix + `### 1. Thứ tự thực hiện các phép tính
- Trong một biểu thức số, ta thực hiện các phép tính theo thứ tự:
  - Nếu không có dấu ngoặc: Luỹ thừa $\\rightarrow$ Nhân và chia $\\rightarrow$ Cộng và trừ.
  - Nếu có dấu ngoặc: Ngoặc tròn $() \\rightarrow$ Ngoặc vuông $[] \\rightarrow$ Ngoặc nhọn $\\{\\}$.

### 2. Quy tắc chuyển vế
- Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải **đổi dấu** số hạng đó.
- Nếu $A + B = C$ thì $A = C - B$.

> [!IMPORTANT]
> Đây là quy tắc nền tảng để giải bài toán "Tìm $x$". Tuyệt đối không được quên đổi dấu khi chuyển vế!`
      },
      {
        title: "Bài tập cuối chương I",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương II: Số thực",
    lessons: [
      {
        title: "Bài 5. Làm quen với số thập phân vô hạn tuần hoàn",
        summary: commonSummaryPrefix + `### 1. Số thập phân vô hạn tuần hoàn
- Có những phân số khi thực hiện phép chia tử cho mẫu sẽ không bao giờ chấm dứt và có một phần được lặp lại mãi mãi. Ta gọi đó là số thập phân vô hạn tuần hoàn.
- Phần lặp lại đó được gọi là **chu kỳ**, thường được viết trong dấu ngoặc đơn. Ví dụ: $0.333... = 0.(3)$.
- Mọi số hữu tỉ đều có thể viết dưới dạng số thập phân hữu hạn hoặc vô hạn tuần hoàn.

> [!NOTE]
> Mẹo nhận biết: Một phân số tối giản với mẫu số dương, nếu mẫu số chỉ có ước nguyên tố là 2 và 5 thì phân số đó viết được dưới dạng số thập phân hữu hạn. Nếu mẫu số có ước nguyên tố khác 2 và 5 thì phân số đó viết được dưới dạng vô hạn tuần hoàn.`
      },
      {
        title: "Bài 6. Số vô tỉ. Căn bậc hai số học",
        summary: commonSummaryPrefix + `### 1. Số vô tỉ
- Số vô tỉ là số thập phân vô hạn **không** tuần hoàn.
- Tập hợp các số vô tỉ được kí hiệu là $\\mathbb{I}$. (Ví dụ: số $\\pi = 3.14159...$)

### 2. Căn bậc hai số học
- Căn bậc hai số học của một số không âm $a$ (kí hiệu là $\\sqrt{a}$) là số $x$ không âm sao cho $x^2 = a$.
- Ví dụ: $\\sqrt{25} = 5$ (vì $5 > 0$ và $5^2 = 25$).

> [!WARNING]
> Tuyệt đối không nhầm lẫn: $\\sqrt{25}$ chỉ bằng 5 (số dương). Dù $(-5)^2 = 25$ nhưng $-5$ không phải là căn bậc hai số học.`
      },
      {
        title: "Bài 7. Tập hợp các số thực",
        summary: commonSummaryPrefix + `### 1. Số thực
- Số hữu tỉ và số vô tỉ được gọi chung là số thực. Tập hợp các số thực được kí hiệu là $\\mathbb{R}$.
- Ta có mối quan hệ: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ và $\\mathbb{I} \\subset \\mathbb{R}$.

### 2. Trục số thực và giá trị tuyệt đối
- Mỗi số thực đều được biểu diễn bởi một điểm trên trục số. Ngược lại, mỗi điểm trên trục số đều biểu diễn một số thực (trục số thực là "đặc" - không có lỗ hổng).
- Khoảng cách từ điểm biểu diễn số thực $x$ đến điểm gốc $0$ gọi là **giá trị tuyệt đối** của $x$, kí hiệu là $|x|$.
  - Nếu $x > 0$ thì $|x| = x$.
  - Nếu $x < 0$ thì $|x| = -x$.
  - $|0| = 0$.`
      },
      {
        title: "Bài tập cuối chương II",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương III: Góc và đường thẳng song song",
    lessons: [
      {
        title: "Bài 8. Góc ở vị trí đặc biệt. Tia phân giác của một góc",
        summary: commonSummaryPrefix + `### 1. Hai góc kề bù
- Hai góc có một cạnh chung, hai cạnh còn lại là hai tia đối nhau được gọi là hai góc kề bù.
- Tính chất: Tổng số đo của hai góc kề bù bằng $180^\\circ$.

### 2. Hai góc đối đỉnh
- Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia.
- Tính chất: Hai góc đối đỉnh thì bằng nhau.

### 3. Tia phân giác của một góc
- Tia phân giác của một góc là tia nằm trong góc và tạo với hai cạnh của góc đó hai góc bằng nhau.
- Nếu $Oz$ là tia phân giác của $\\widehat{xOy}$ thì: $\\widehat{xOz} = \\widehat{zOy} = \\frac{\\widehat{xOy}}{2}$.

> [!NOTE]
> Để vẽ tia phân giác của một góc, ta có thể dùng thước thẳng và compa, hoặc dùng thước đo góc.`
      },
      {
        title: "Bài 9. Hai đường thẳng song song và dấu hiệu nhận biết",
        summary: commonSummaryPrefix + `### 1. Góc tạo bởi một đường thẳng cắt hai đường thẳng
- Khi đường thẳng $c$ cắt hai đường thẳng $a$ và $b$, nó tạo ra các cặp góc đặc biệt:
  - Cặp góc so le trong.
  - Cặp góc đồng vị.
  - Cặp góc trong cùng phía.

### 2. Dấu hiệu nhận biết hai đường thẳng song song
- Nếu đường thẳng $c$ cắt hai đường thẳng $a, b$ và trong các góc tạo thành có:
  - Một cặp góc so le trong bằng nhau, hoặc
  - Một cặp góc đồng vị bằng nhau, hoặc
  - Một cặp góc trong cùng phía bù nhau (tổng bằng $180^\\circ$)
  ... thì $a$ và $b$ song song với nhau (kí hiệu: $a \\parallel b$).`
      },
      {
        title: "Bài 10. Tiên đề Euclid. Tính chất của hai đường thẳng song song",
        summary: commonSummaryPrefix + `### 1. Tiên đề Euclid về đường thẳng song song
- Qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.

### 2. Tính chất của hai đường thẳng song song
- Nếu một đường thẳng cắt hai đường thẳng song song thì:
  - Hai góc so le trong bằng nhau.
  - Hai góc đồng vị bằng nhau.
  - Hai góc trong cùng phía bù nhau.

> [!IMPORTANT]
> - Tiên đề Euclid là định lý duy nhất được công nhận mà không cần chứng minh.
> - Tính chất hai đường thẳng song song là mệnh đề đảo của dấu hiệu nhận biết hai đường thẳng song song.`
      },
      {
        title: "Bài 11. Định lí và chứng minh định lí",
        summary: commonSummaryPrefix + `### 1. Định lí là gì?
- Định lí là một khẳng định được suy ra từ những khẳng định được coi là đúng.
- Mỗi định lí thường gồm hai phần:
  - Giả thiết (GT): Những điều cho biết trước.
  - Kết luận (KL): Những điều cần suy ra.

### 2. Chứng minh định lí
- Chứng minh định lí là dùng lập luận để từ giả thiết suy ra kết luận là đúng.
- Các bước chứng minh:
  1. Vẽ hình minh họa.
  2. Viết giả thiết và kết luận bằng kí hiệu toán học.
  3. Sử dụng các định lí, tính chất đã biết để lập luận từ giả thiết ra kết luận.`
      },
      {
        title: "Bài tập cuối chương III",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương IV: Tam giác bằng nhau",
    lessons: [
      {
        title: "Bài 12. Tổng các góc trong một tam giác",
        summary: commonSummaryPrefix + `### 1. Tổng ba góc trong một tam giác
- Tổng số đo ba góc trong một tam giác bằng $180^\\circ$.
- Kí hiệu: Trong $\\Delta ABC$, ta luôn có: $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.

### 2. Góc ngoài của tam giác
- Góc kề bù với một góc của tam giác được gọi là góc ngoài của tam giác.
- Mỗi góc ngoài của một tam giác bằng tổng của hai góc trong không kề với nó.
- Chú ý: Góc ngoài của tam giác luôn lớn hơn mỗi góc trong không kề với nó.`
      },
      {
        title: "Bài 13. Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất của tam giác",
        summary: commonSummaryPrefix + `### 1. Hai tam giác bằng nhau
- Hai tam giác bằng nhau là hai tam giác có các cạnh tương ứng bằng nhau, các góc tương ứng bằng nhau.
- Nếu $\\Delta ABC = \\Delta A'B'C'$ thì:
  - $AB = A'B', BC = B'C', AC = A'C'$
  - $\\widehat{A} = \\widehat{A'}, \\widehat{B} = \\widehat{B'}, \\widehat{C} = \\widehat{C'}$

### 2. Trường hợp bằng nhau thứ nhất: Cạnh - cạnh - cạnh (c.c.c)
- Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác đó bằng nhau.
- Sơ đồ: Nếu $\\Delta ABC$ và $\\Delta A'B'C'$ có $AB=A'B', BC=B'C', CA=C'A'$ thì $\\Delta ABC = \\Delta A'B'C' (c.c.c)$.`
      },
      {
        title: "Bài 14. Trường hợp bằng nhau thứ hai và thứ ba của tam giác",
        summary: commonSummaryPrefix + `### 1. Trường hợp bằng nhau thứ hai: Cạnh - góc - cạnh (c.g.c)
- Nếu hai cạnh và **góc xen giữa** của tam giác này bằng hai cạnh và **góc xen giữa** của tam giác kia thì hai tam giác đó bằng nhau.

### 2. Trường hợp bằng nhau thứ ba: Góc - cạnh - góc (g.c.g)
- Nếu một cạnh và **hai góc kề** cạnh đó của tam giác này bằng một cạnh và **hai góc kề** cạnh đó của tam giác kia thì hai tam giác đó bằng nhau.

> [!WARNING]
> Lưu ý cực kỳ quan trọng:
> - Đối với (c.g.c): Góc phải nằm **xen giữa** hai cạnh.
> - Đối với (g.c.g): Hai góc phải **kề** với cạnh đó.`
      },
      {
        title: "Bài 15. Các trường hợp bằng nhau của tam giác vuông",
        summary: commonSummaryPrefix + `### 1. Áp dụng các trường hợp bằng nhau thông thường
- Hai cạnh góc vuông bằng nhau (c.g.c).
- Một cạnh góc vuông và một góc nhọn kề bằng nhau (g.c.g).

### 2. Các trường hợp đặc biệt của tam giác vuông
- **Trường hợp cạnh huyền - góc nhọn:** Nếu cạnh huyền và một góc nhọn của tam giác vuông này bằng cạnh huyền và một góc nhọn của tam giác vuông kia thì hai tam giác vuông đó bằng nhau.
- **Trường hợp cạnh huyền - cạnh góc vuông:** Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này bằng cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó bằng nhau.`
      },
      {
        title: "Bài 16. Tam giác cân. Đường trung trực của đoạn thẳng",
        summary: commonSummaryPrefix + `### 1. Tam giác cân
- Định nghĩa: Tam giác cân là tam giác có hai cạnh bằng nhau.
- Tính chất: Trong một tam giác cân, hai góc ở đáy bằng nhau.
- Dấu hiệu nhận biết:
  - Nếu một tam giác có hai cạnh bằng nhau thì tam giác đó là tam giác cân.
  - Nếu một tam giác có hai góc bằng nhau thì tam giác đó là tam giác cân.
- **Tam giác đều:** Là tam giác có 3 cạnh bằng nhau. Tam giác đều có 3 góc bằng nhau và bằng $60^\\circ$.

### 2. Đường trung trực của đoạn thẳng
- Định nghĩa: Đường thẳng vuông góc với một đoạn thẳng tại trung điểm của nó được gọi là đường trung trực của đoạn thẳng đó.
- Nếu $d$ là trung trực của đoạn $AB$ thì $d \\perp AB$ tại trung điểm $I$ của $AB$.`
      },
      {
        title: "Bài tập cuối chương IV",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương V: Thu thập và biểu diễn dữ liệu",
    lessons: [
      {
        title: "Bài 17. Thu thập và phân loại dữ liệu",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 18. Biểu đồ hình quạt tròn",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 19. Biểu đồ đoạn thẳng",
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
    title: "Chương VI: Tỉ lệ thức và đại lượng tỉ lệ",
    lessons: [
      {
        title: "Bài 20. Tỉ lệ thức",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 21. Tính chất của dãy tỉ số bằng nhau",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 22. Đại lượng tỉ lệ thuận",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 23. Đại lượng tỉ lệ nghịch",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương VI",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương VII: Biểu thức đại số và đa thức một biến",
    lessons: [
      {
        title: "Bài 24. Biểu thức đại số",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 25. Đa thức một biến",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 26. Phép cộng và phép trừ đa thức một biến",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 27. Phép nhân đa thức một biến",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 28. Phép chia đa thức một biến",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương VII",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương VIII: Làm quen với biến cố và xác suất của biến cố",
    lessons: [
      {
        title: "Bài 29. Làm quen với biến cố",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 30. Làm quen với xác suất của biến cố",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương VIII",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  },
  {
    title: "Chương IX: Quan hệ giữa các yếu tố trong một tam giác",
    lessons: [
      {
        title: "Bài 31. Quan hệ giữa góc và cạnh đối diện trong một tam giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 32. Quan hệ giữa đường vuông góc và đường xiên",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 33. Quan hệ giữa ba cạnh của một tam giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 34. Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong một tam giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 35. Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác",
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
        title: "Bài 36. Hình hộp chữ nhật và hình lập phương",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài 37. Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      },
      {
        title: "Bài tập cuối chương X",
        summary: commonSummaryPrefix + `Nội dung đang được cập nhật...`
      }
    ]
  }
];
