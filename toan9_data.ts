// ========================================================
// KHUNG CHƯƠNG TRÌNH VÀ KIẾN THỨC TOÁN LỚP 9
// BỘ SÁCH: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (CHƯƠNG TRÌNH GDPT 2018)
// ========================================================

const commonSummaryPrefix = "### Kiến thức cần nắm\nToán học là nền tảng của tư duy binh pháp và chiến lược. Chúa công cần nắm vững các định nghĩa và quy tắc sau đây:\n\n";

export const TOAN_9_DATA = [
  // ─── CHƯƠNG I ─────────────────────────────────────────────────────────────
  {
    title: "Chương I: Phương trình và hệ hai phương trình bậc nhất hai ẩn",
    lessons: [
      {
        title: "Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Phương trình bậc nhất hai ẩn
- Phương trình bậc nhất hai ẩn $x$ và $y$ là hệ thức có dạng:
  $$ax + by = c$$
  trong đó $a, b, c$ là các số đã biết và $a \\neq 0$ hoặc $b \\neq 0$.
- Nếu tại $x = x_0$ và $y = y_0$ ta có $a x_0 + b y_0 = c$ là một khẳng định đúng thì cặp số $(x_0; y_0)$ được gọi là một **nghiệm** của phương trình.
- **Tập nghiệm:** Mỗi phương trình bậc nhất hai ẩn đều có **vô số nghiệm**. Trong mặt phẳng tọa độ $Oxy$, tập hợp các điểm có tọa độ $(x; y)$ thỏa mãn phương trình là một **đường thẳng**, gọi là đường thẳng $ax + by = c$.

#### 2. Hệ hai phương trình bậc nhất hai ẩn
- Một cặp gồm hai phương trình bậc nhất hai ẩn được gọi là một hệ hai phương trình bậc nhất hai ẩn, dạng tổng quát:
  $$\\begin{cases} ax + by = c \\\\ a'x + b'y = c' \\end{cases}$$
- **Nghiệm của hệ:** Cặp số $(x_0; y_0)$ là nghiệm của hệ nếu nó đồng thời là nghiệm của cả hai phương trình trong hệ.
- **Biểu diễn hình học:** Gọi $d$ và $d'$ lần lượt là đường thẳng biểu diễn hai phương trình. Số nghiệm của hệ chính là số giao điểm của $d$ và $d'$:
  - Hệ có **nghiệm duy nhất** $\\Leftrightarrow d$ cắt $d'$.
  - Hệ **vô nghiệm** $\\Leftrightarrow d \\parallel d'$.
  - Hệ có **vô số nghiệm** $\\Leftrightarrow d \\equiv d'$.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Kiểm tra nghiệm của phương trình và hệ phương trình
- **Đặc điểm nhận dạng:** Đề bài cho một phương trình hoặc hệ phương trình và một cặp số $(x_0; y_0)$. Yêu cầu kiểm tra xem cặp số đó có phải là nghiệm hay không.
- **Ví dụ 1:** Cặp số $(1; -1)$ có phải là nghiệm của hệ phương trình $\\begin{cases} 3x + 2y = 4 \\\\ x - y = -7 \\end{cases}$ không?
  - **Bước 1:** Thay $x = 1, y = -1$ vào phương trình thứ nhất: $3(1) + 2(-1) = 3 - 2 = 1 \\neq 4$.
  - **Bước 2:** Kết luận: Vì không thỏa mãn phương trình thứ nhất, cặp số $(1; -1)$ **không là nghiệm** của hệ phương trình (không cần kiểm tra tiếp phương trình thứ hai).

#### Dạng 2: Biểu diễn tập nghiệm của phương trình bậc nhất hai ẩn
- **Đặc điểm nhận dạng:** Yêu cầu viết công thức nghiệm tổng quát và vẽ đường thẳng biểu diễn tập nghiệm.
- **Ví dụ 2:** Viết nghiệm tổng quát và biểu diễn tập nghiệm của phương trình $0x + 2y = -3$.
  - **Bước 1:** Biểu diễn $y$ theo $x$: Từ $0x + 2y = -3 \\Rightarrow 2y = -3 \\Rightarrow y = -\\frac{3}{2}$.
  - **Bước 2:** Viết nghiệm tổng quát: Phương trình có vô số nghiệm với dạng $(x; -\\frac{3}{2})$ với $x \\in \\mathbb{R}$ tùy ý.
  - **Bước 3:** Biểu diễn hình học: Tập nghiệm là đường thẳng $y = -\\frac{3}{2}$, đây là đường thẳng song song với trục hoành (trục $Ox$) và cắt trục tung tại điểm $(0; -1{,}5)$.

#### Dạng 3: Lập phương trình bậc nhất hai ẩn từ bài toán thực tế
- **Đặc điểm nhận dạng:** Bài toán có lời văn, chứa hai đại lượng chưa biết và một mối liên hệ dạng tổng, hiệu hoặc tổ hợp tuyến tính.
- **Ví dụ 3:** Một buổi chiếu phim có vé người lớn giá 50 nghìn đồng và vé trẻ em giá 20 nghìn đồng. Tổng số tiền bán vé là 2 triệu đồng. Gọi $x$ là số người lớn, $y$ là số trẻ em ($x, y \\in \\mathbb{N}$). Hãy lập phương trình.
  - **Bước 1:** Đổi đơn vị cho đồng nhất: 2 triệu đồng = 2000 nghìn đồng.
  - **Bước 2:** Biểu diễn số tiền thu được từ vé người lớn là $50x$ (nghìn đồng), từ vé trẻ em là $20y$ (nghìn đồng).
  - **Bước 3:** Lập phương trình tổng số tiền: $50x + 20y = 2000$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Lỗi khi kiểm tra nghiệm của hệ phương trình:** 
>   - Sai: Thử cặp số vào một phương trình thấy đúng, vội kết luận đó là nghiệm của hệ.
>   - Đúng: Phải thử cặp số vào **cả hai** phương trình. Chỉ khi thỏa mãn đồng thời cả hai thì mới là nghiệm của hệ.
> - **Nhầm lẫn điều kiện của hệ số $a, b$:**
>   - Sai: Cho rằng phương trình $0x + 0y = 3$ là phương trình bậc nhất hai ẩn.
>   - Đúng: Điều kiện bắt buộc là $a \\neq 0$ **hoặc** $b \\neq 0$. Nếu cả $a$ và $b$ đều bằng $0$ thì không phải là phương trình bậc nhất hai ẩn.
> - **Biểu diễn hình học sai phương trình dạng đặc biệt:**
>   - Sai: Phương trình $x = 3$ vẽ thành đường thẳng nằm ngang.
>   - Đúng: $x = c$ là đường thẳng **đứng** (song song trục tung). $y = c$ là đường thẳng **ngang** (song song trục hoành).`
      },
      {
        title: "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Giải hệ phương trình bằng phương pháp thế
- **Bước 1:** Từ một phương trình của hệ, biểu diễn một ẩn (ví dụ $y$) theo ẩn kia (ví dụ $x$) rồi thế vào phương trình còn lại để được phương trình chỉ chứa một ẩn (ẩn $x$).
- **Bước 2:** Giải phương trình một ẩn vừa nhận được, tìm giá trị của ẩn đó. Sau đó, thế giá trị vừa tìm được vào biểu thức ở Bước 1 để tìm giá trị của ẩn còn lại. Kết luận nghiệm của hệ.

#### 2. Giải hệ phương trình bằng phương pháp cộng đại số
- **Bước 1 (Chuẩn bị):** Đưa hệ phương trình đã cho về hệ phương trình có hệ số của cùng một ẩn trong hai phương trình **bằng nhau** hoặc **đối nhau** bằng cách nhân hai vế của mỗi phương trình với một số thích hợp (khác 0). (Nếu hệ số đã bằng hoặc đối nhau thì bỏ qua bước này).
- **Bước 2 (Cộng/Trừ):** Cộng hay trừ từng vế của hai phương trình trong hệ để được phương trình chỉ còn chứa một ẩn:
  - Cộng từng vế nếu các hệ số **đối nhau**.
  - Trừ từng vế nếu các hệ số **bằng nhau**.
- **Bước 3:** Giải phương trình một ẩn vừa nhận được, tìm giá trị của ẩn đó. Thế giá trị vừa tìm được vào một trong hai phương trình ban đầu để tìm giá trị của ẩn còn lại. Kết luận nghiệm.

#### 3. Số nghiệm của hệ phương trình bậc nhất hai ẩn
Khi giải hệ phương trình, phương trình một ẩn thu được có dạng $0x = c$ hoặc $0y = c$:
- Nếu $c \\neq 0$: Phương trình một ẩn vô nghiệm, suy ra hệ **vô nghiệm**.
- Nếu $c = 0$: Phương trình một ẩn có vô số nghiệm, suy ra hệ có **vô số nghiệm**.

#### 4. Ý nghĩa hình học
Nghiệm của hệ tương ứng với tọa độ giao điểm của hai đường thẳng $d_1$ và $d_2$:
- Hệ có nghiệm duy nhất $\\Leftrightarrow d_1$ cắt $d_2$.
- Hệ vô nghiệm $\\Leftrightarrow d_1 \\parallel d_2$.
- Hệ vô số nghiệm $\\Leftrightarrow d_1 \\equiv d_2$.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Giải hệ phương trình bằng phương pháp thế
- **Đặc điểm nhận dạng:** Hệ phương trình có một phương trình mà hệ số của $x$ hoặc $y$ bằng $1$ hoặc $-1$.
- **Ví dụ 1:** Giải hệ phương trình $\\begin{cases} x - 3y = 2 \\quad (1) \\\\ -2x + 5y = 1 \\quad (2) \\end{cases}$
  - **Bước 1:** Từ phương trình $(1)$, biểu diễn $x$ theo $y$: $x = 3y + 2 \\quad (3)$.
  - **Bước 2:** Thế $(3)$ vào $(2)$:
    $$-2(3y + 2) + 5y = 1 \\Rightarrow -6y - 4 + 5y = 1 \\Rightarrow -y = 5 \\Rightarrow y = -5$$
  - **Bước 3:** Thế $y = -5$ vào $(3)$: $x = 3(-5) + 2 = -13$.
  - **Kết luận:** Hệ phương trình có nghiệm duy nhất là $(-13; -5)$.

#### Dạng 2: Giải hệ phương trình bằng phương pháp cộng đại số
- **Đặc điểm nhận dạng:** Hệ số của cùng một ẩn trong hai phương trình không có dạng $1$ hoặc $-1$, nên dùng phương pháp cộng để tránh phân số.
- **Ví dụ 2:** Giải hệ phương trình $\\begin{cases} 3x + 2y = 7 \\quad (1) \\\\ 2x - 3y = -4 \\quad (2) \\end{cases}$
  - **Bước 1:** Khử ẩn $y$. Nhân $(1)$ với $3$ và $(2)$ với $2$, ta được: $\\begin{cases} 9x + 6y = 21 \\\\ 4x - 6y = -8 \\end{cases}$.
  - **Bước 2:** Cộng từng vế hai phương trình: $(9x + 4x) = 21 - 8 \\Rightarrow 13x = 13 \\Rightarrow x = 1$.
  - **Bước 3:** Thế $x = 1$ vào $(1)$: $3(1) + 2y = 7 \\Rightarrow 2y = 4 \\Rightarrow y = 2$.
  - **Kết luận:** Hệ phương trình có nghiệm duy nhất là $(1; 2)$.

#### Dạng 3: Bài toán tìm tham số hoặc bài toán thực tế
- **Ví dụ 3:** Tìm hai số $a$ và $b$ để đường thẳng $y = ax + b$ đi qua hai điểm $A(-2; -1)$ và $B(2; 3)$.
  - **Bước 1:** Thay $A(-2; -1)$ vào: $-2a + b = -1 \\quad (1)$.
  - **Bước 2:** Thay $B(2; 3)$ vào: $2a + b = 3 \\quad (2)$.
  - **Bước 3:** Giải hệ bằng cộng đại số: $(-2a + 2a) + 2b = -1 + 3 \\Rightarrow 2b = 2 \\Rightarrow b = 1$.
  - **Bước 4:** Thế $b = 1$ vào $(2)$: $2a + 1 = 3 \\Rightarrow a = 1$.
  - **Kết luận:** $a = 1, b = 1$. Đường thẳng là $y = x + 1$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Lỗi dấu khi thế biểu thức:** Phải luôn đặt biểu thức thế vào trong **dấu ngoặc**: $-2(3y + 2) + 5y = 1 \\Rightarrow -6y - 4 + 5y = 1$.
> - **Lỗi nhân không đều cả hai vế:** Khi nhân với một số, phải nhân **cả hai vế** (bao gồm cả hằng số $c$). Ví dụ nhân $3x + 2y = 7$ với $3$ phải được $9x + 6y = 21$.
> - **Lỗi dấu khi trừ hai phương trình:** Khi trừ $(-7y) - (-3y)$ phải đổi dấu thành $-7y + 3y = -4y$. Nên nhân một phương trình với $-1$ rồi cộng hai vế để tránh nhầm dấu.`
      },
      {
        title: "Bài 3: Giải bài toán bằng cách lập hệ phương trình",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### Các bước giải bài toán bằng cách lập hệ phương trình
- **Bước 1. Lập hệ phương trình:**
  - Chọn ẩn số (thường chọn hai ẩn số) và đặt điều kiện thích hợp cho các ẩn số (con người, đồ vật phải là $x, y \\in \\mathbb{N}^*$; vận tốc, quãng đường, thời gian phải là $x, y > 0$...).
  - Biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết.
  - Dựa vào mối quan hệ giữa các đại lượng (theo giả thiết bài toán) để lập hai phương trình, từ đó có một hệ hai phương trình bậc nhất hai ẩn.
- **Bước 2. Giải hệ phương trình:**
  - Giải hệ phương trình vừa lập được bằng phương pháp thế hoặc phương pháp cộng đại số.
- **Bước 3. Trả lời:**
  - Kiểm tra xem trong các nghiệm tìm được của hệ phương trình, nghiệm nào thoả mãn, nghiệm nào không thoả mãn điều kiện của ẩn đã đặt ban đầu, rồi đưa ra kết luận cho bài toán.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Bài toán chuyển động
- **Đặc điểm nhận dạng:** Liên quan đến quãng đường ($S$), vận tốc ($V$), thời gian ($t$) với công thức $S = V \\cdot t$. Lưu ý bài toán chuyển động trên dòng nước:
  $$V_{\\text{xuôi}} = V_{\\text{thực}} + V_{\\text{nước}}, \\quad V_{\\text{ngược}} = V_{\\text{thực}} - V_{\\text{nước}}$$
- **Ví dụ 1:** Một ca nô đi ngược dòng sông một quãng đường $6 \\text{ km}$ thì hết $\\frac{3}{2}$ giờ. Mặt khác, ca nô đó chỉ mất $45$ phút để đi xuôi dòng sông một quãng đường tương tự. Tính vận tốc thực của ca nô và vận tốc của dòng nước.
  - **Bước 1:** Đổi $45 \\text{ phút} = \\frac{3}{4} \\text{ giờ}$. Gọi vận tốc thực của ca nô là $x \\text{ (km/h)}$, vận tốc dòng nước là $y \\text{ (km/h)}$. Điều kiện $x > y > 0$.
  - **Bước 2:** Vận tốc ngược dòng là $x - y$, vận tốc xuôi dòng là $x + y$:
    - Đi ngược dòng $6 \\text{ km}$ mất $\\frac{3}{2}$ giờ: $\\frac{3}{2}(x - y) = 6 \\Rightarrow x - y = 4 \\quad (1)$.
    - Đi xuôi dòng $6 \\text{ km}$ mất $\\frac{3}{4}$ giờ: $\\frac{3}{4}(x + y) = 6 \\Rightarrow x + y = 8 \\quad (2)$.
  - **Bước 3:** Cộng (1) và (2): $2x = 12 \\Rightarrow x = 6$. Thế vào (2): $6 + y = 8 \\Rightarrow y = 2$.
  - **Bước 4:** Thỏa mãn điều kiện. Vận tốc thực của ca nô là $6 \\text{ km/h}$, vận tốc dòng nước là $2 \\text{ km/h}$.

#### Dạng 2: Bài toán năng suất, làm chung làm riêng
- **Đặc điểm nhận dạng:** Liên quan đến công việc hoàn thành trong bao nhiêu ngày/giờ. Nếu làm xong việc trong $x$ ngày thì mỗi ngày làm được $\\frac{1}{x}$ công việc.
- **Ví dụ 2:** Hai đội công nhân cùng làm một đoạn đường trong $24$ ngày thì xong. Mỗi ngày, đội I làm được nhiều gấp rưỡi đội II. Hỏi nếu làm một mình thì mỗi đội làm xong trong bao lâu?
  - **Bước 1:** Gọi thời gian đội I làm một mình xong là $x$ (ngày), đội II là $y$ (ngày). ĐK: $x, y > 24$.
  - **Bước 2:** Mỗi ngày đội I làm $\\frac{1}{x}$ việc, đội II làm $\\frac{1}{y}$ việc:
    - Hai đội cùng làm trong 24 ngày xong: $\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{24}$.
    - Đội I làm gấp rưỡi đội II: $\\frac{1}{x} = \\frac{3}{2} \\cdot \\frac{1}{y}$.
  - **Bước 3:** Đặt $u = \\frac{1}{x}, v = \\frac{1}{y}$. Giải hệ $\\begin{cases} u + v = \\frac{1}{24} \\\\ u = \\frac{3}{2}v \\end{cases} \\Rightarrow v = \\frac{1}{60} \\Rightarrow y = 60;\\ u = \\frac{1}{40} \\Rightarrow x = 40$.
  - **Bước 4:** Đội I làm một mình mất $40$ ngày, đội II mất $60$ ngày.

#### Dạng 3: Bài toán tỉ lệ phần trăm, pha chế dung dịch
- **Công thức:** $m_{\\text{chất tan}} = m_{\\text{dung dịch}} \\times C\\%$.
- **Ví dụ 3:** Để pha chế $1000$ lít cồn nồng độ $16\\%$, người ta trộn lẫn dung dịch cồn nồng độ $10\\%$ và dung dịch cồn nồng độ $70\\%$. Tính lượng cồn mỗi loại cần dùng.
  - **Bước 1:** Gọi lượng cồn $10\\%$ là $x$ (lít), cồn $70\\%$ là $y$ (lít). ĐK: $x, y > 0$.
  - **Bước 2:** Tổng thể tích: $x + y = 1000$. Tổng lượng cồn nguyên chất: $0{,}1x + 0{,}7y = 16\\% \\times 1000 = 160$.
  - **Bước 3:** Giải hệ: $0{,}6y = 60 \\Rightarrow y = 100 \\Rightarrow x = 900$.
  - **Bước 4:** Cần $900$ lít cồn $10\\%$ và $100$ lít cồn $70\\%$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Quên đặt điều kiện hoặc đặt sai điều kiện cho ẩn:** Số người, con vật, đồ vật phải là số tự nhiên ($x \\in \\mathbb{N}^*$). Quãng đường, vận tốc, thời gian thường là $x > 0$.
> - **Lỗi không đồng nhất đơn vị:** Đề bài cho thời gian là $45 \\text{ phút}$, không được giữ nguyên số $45$ tính cùng vận tốc $\\text{km/h}$ mà phải đổi thành $\\frac{45}{60} = \\frac{3}{4} \\text{ giờ}$.
> - **Sai lầm khi biểu diễn mối quan hệ "lớn hơn", "nhiều hơn":** "Số lần $y$ nhiều hơn 1 lần so với hai lần số $x$" phải viết là $y = 2x + 1$ (chứ không phải $x = 2y + 1$).`
      },
      {
        title: "Bài tập cuối chương I",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Phương trình bậc nhất hai ẩn
- Phương trình bậc nhất hai ẩn $x, y$ có dạng tổng quát: $ax + by = c$, trong đó $a, b, c$ là các số thực đã biết với điều kiện $a \\neq 0$ hoặc $b \\neq 0$.
- Mỗi cặp số $(x_0; y_0)$ thoả mãn $ax_0 + by_0 = c$ được gọi là một **nghiệm** của phương trình.
- Phương trình bậc nhất hai ẩn luôn có **vô số nghiệm**. Tập nghiệm của nó được biểu diễn bởi một đường thẳng trên mặt phẳng toạ độ $Oxy$.

#### 2. Hệ hai phương trình bậc nhất hai ẩn
- Dạng tổng quát: $\\begin{cases} ax + by = c \\\\ a'x + b'y = c' \\end{cases}$
- Nghiệm của hệ là cặp số $(x_0; y_0)$ đồng thời là nghiệm của cả hai phương trình trong hệ.
- **Cách giải:** Giải bằng **phương pháp thế**, **phương pháp cộng đại số**, hoặc dùng **máy tính cầm tay (MTCT)**.
- **Số nghiệm của hệ theo vị trí tương đối của hai đường thẳng biểu diễn:**
  - Hai đường thẳng cắt nhau: Hệ có **nghiệm duy nhất**.
  - Hai đường thẳng song song: Hệ **vô nghiệm**.
  - Hai đường thẳng trùng nhau: Hệ có **vô số nghiệm**.

#### 3. Giải bài toán bằng cách lập hệ phương trình
- **Bước 1. Lập hệ phương trình:**
  - Chọn ẩn số và đặt điều kiện thích hợp.
  - Biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết.
  - Lập hệ hai phương trình biểu thị mối quan hệ giữa các đại lượng.
- **Bước 2. Giải hệ phương trình.**
- **Bước 3. Trả lời:** Đối chiếu nghiệm với điều kiện và kết luận.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Nhận biết hệ phương trình, kiểm tra nghiệm
- **Ví dụ 1:** Cho hệ $\\begin{cases} 4x + 3y = -1 \\\\ 2x - y = 7 \\end{cases}$. Cặp số $(2; -3)$ có phải là nghiệm của hệ không?
  - Thay $x = 2, y = -3$ vào PT(1): $4(2) + 3(-3) = 8 - 9 = -1$ (Đúng).
  - Thay vào PT(2): $2(2) - (-3) = 4 + 3 = 7$ (Đúng).
  - Kết luận: Cặp số $(2; -3)$ thỏa mãn cả hai phương trình nên là nghiệm của hệ.

#### Dạng 2: Giải hệ phương trình (Thế / Cộng đại số)
- **Ví dụ 2:** Giải hệ $\\begin{cases} 2x + 5y = 10 \\\\ \\frac{2}{5}x + y = 1 \\end{cases}$
  - Từ PT(2), nhân cả hai vế với $5$: $2x + 5y = 5$.
  - Ta được hệ: $\\begin{cases} 2x + 5y = 10 \\\\ 2x + 5y = 5 \\end{cases}$.
  - Trừ vế theo vế: $0x + 0y = 5 \\Rightarrow 0 = 5$ (vô lý).
  - Kết luận: Hệ phương trình **vô nghiệm**.

#### Dạng 3: Bài toán thực tế (Cấu tạo số, Chuyển động, Kinh tế...)
- **Ví dụ 3:** Tìm số tự nhiên có hai chữ số, biết tổng hai chữ số bằng $12$, và nếu viết hai chữ số theo thứ tự ngược lại thì được số mới lớn hơn số ban đầu $36$ đơn vị.
  - Gọi chữ số hàng chục là $x$, chữ số hàng đơn vị là $y$ ($x, y \\in \\mathbb{N}, 1 \\le x \\le 9, 0 \\le y \\le 9$). Số ban đầu là $\\overline{xy} = 10x + y$, số viết ngược lại là $\\overline{yx} = 10y + x$.
  - Tổng hai chữ số bằng $12$: $x + y = 12$.
  - Số mới lớn hơn số cũ $36$ đơn vị: $(10y + x) - (10x + y) = 36 \\Leftrightarrow 9y - 9x = 36 \\Leftrightarrow -x + y = 4$.
  - Giải hệ $\\begin{cases} x + y = 12 \\\\ -x + y = 4 \\end{cases} \\Rightarrow 2y = 16 \\Rightarrow y = 8 \\Rightarrow x = 4$ (thỏa mãn). Số cần tìm là $48$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Lỗi đặt điều kiện ẩn số:** Đồ vật, con người, sách vở đếm được phải thuộc $\\mathbb{N}^*$. Nếu là chữ số thì $0 \\le \\text{chữ số} \\le 9$ (chữ số hàng chục phải từ $1$ đến $9$).
> - **Lỗi thiết lập số tự nhiên có 2 chữ số:** Nhầm $\\overline{xy}$ thành phép nhân $x \\cdot y$. Phải viết đúng là $10x + y$.
> - **Lỗi nhầm lẫn giữa giá trị tăng/giảm và giá trị sau khi thay đổi:** "Vượt mức $15\\%$ so với năm ngoái ($x$)" thì sản lượng năm nay là $x + 0,15x = 1,15x$, không phải chỉ là $0,15x$.`
      }
    ]
  },

  // ─── CHƯƠNG II ────────────────────────────────────────────────────────────
  {
    title: "Chương II: Phương trình và bất phương trình bậc nhất một ẩn",
    lessons: [
      {
        title: "Bài 4: Phương trình quy về phương trình bậc nhất một ẩn",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Phương trình tích
- Phương trình tích có dạng:
  $$(ax + b)(cx + d) = 0$$
- **Quy tắc giải:** Để giải phương trình tích, ta cho từng nhân tử bằng $0$ rồi lấy tất cả các nghiệm:
  $$ax + b = 0 \\quad \\text{hoặc} \\quad cx + d = 0$$

#### 2. Phương trình chứa ẩn ở mẫu
- **Các bước giải:**
  - **Bước 1 (Tìm ĐKXĐ):** Tìm điều kiện xác định của phương trình (cho tất cả các mẫu thức khác $0$).
  - **Bước 2 (Quy đồng và khử mẫu):** Quy đồng mẫu hai vế của phương trình rồi khử mẫu.
  - **Bước 3 (Giải phương trình):** Giải phương trình vừa nhận được.
  - **Bước 4 (Kết luận):** Đối chiếu các nghiệm tìm được ở Bước 3 với ĐKXĐ. Nghiệm nào thỏa mãn ĐKXĐ thì đó là nghiệm của phương trình đã cho (loại nghiệm ngoại lai).

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Giải phương trình đưa về phương trình tích
- **Phương pháp:** Sử dụng các phương pháp phân tích đa thức thành nhân tử (đặt nhân tử chung, hằng đẳng thức, nhóm hạng tử) để đưa phương trình về dạng $A(x)B(x) = 0$.
- **Ví dụ 1:** Giải phương trình $(2x-1)^2 - 9x^2 = 0$.
  - Phương trình tương đương: $(2x-1)^2 - (3x)^2 = 0$.
  - Áp dụng hằng đẳng thức: $(2x-1-3x)(2x-1+3x) = 0$.
  - Thu gọn: $(-x-1)(5x-1) = 0$.
  - Giải các phương trình con:
    - $-x-1 = 0 \\Rightarrow x = -1$.
    - $5x-1 = 0 \\Rightarrow x = \\frac{1}{5}$.
  - Kết luận: Tập nghiệm của phương trình là $S = \\{-1; \\frac{1}{5}\\}$.

#### Dạng 2: Giải phương trình chứa ẩn ở mẫu
- **Ví dụ 2:** Giải phương trình $\\frac{3x}{2x+3} - \\frac{6x}{4x-1} = 0$.
  - ĐKXĐ: $2x+3 \\neq 0$ và $4x-1 \\neq 0 \\Leftrightarrow x \\neq -\\frac{3}{2}$ và $x \\neq \\frac{1}{4}$.
  - Quy đồng và khử mẫu: $3x(4x-1) - 6x(2x+3) = 0$.
  - Giải phương trình: $12x^2 - 3x - 12x^2 - 18x = 0 \\Leftrightarrow -21x = 0 \\Leftrightarrow x = 0$.
  - Kết luận: $x = 0$ thỏa mãn ĐKXĐ. Vậy phương trình có nghiệm $x = 0$.

#### Dạng 3: Bài toán thực tế (Chuyển động, Rơi tự do...)
- **Ví dụ 3:** Thầy Toàn thiết kế bài toán cho học sinh tại Trung tâm Toán Khôi Nguyên: Một vật rơi tự do từ độ cao 120 mét. Bỏ qua sức cản không khí, quãng đường chuyển động $s$ (mét) của vật rơi tự do sau thời gian $t$ (giây) được biểu diễn gần đúng bởi công thức $s = 4{,}9t^2$. Sau bao nhiêu giây kể từ khi bắt đầu rơi thì vật này chạm mặt đất (làm tròn kết quả đến chữ số hàng đơn vị)?
  - Khi vật chạm đất, quãng đường rơi là $s = 120$ m.
  - Ta có phương trình: $4{,}9t^2 = 120 \\Leftrightarrow t^2 = \\frac{120}{4{,}9} \\approx 24{,}49$.
  - Vì $t > 0$ nên $t \\approx 5$ giây.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Quên đặt điều kiện xác định (ĐKXĐ):**
>   - Sai: Giải phương trình chứa ẩn ở mẫu nhưng quên không tìm ĐKXĐ, dẫn đến nhận cả nghiệm ngoại lai.
>   - Đúng: Luôn đặt ĐKXĐ trước khi quy đồng và khử mẫu. Cuối bài bắt buộc phải có bước đối chiếu ĐKXĐ.
> - **Khử mẫu tùy tiện làm mất nghiệm hoặc sinh nghiệm ngoại lai:**
>   - Sai: Gạch bỏ mẫu số mà không xét điều kiện bằng $0$, hoặc triệt tiêu hai vế cho đa thức chứa ẩn mà không xét đa thức đó bằng $0$ (làm mất nghiệm).
>   - Đúng: Chuyển vế, phân tích thành nhân tử để đưa về phương trình tích. Ví dụ: $x^2 = 2x \\Leftrightarrow x(x-2) = 0$.`
      },
      {
        title: "Bài 5: Bất đẳng thức và tính chất",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Khái niệm bất đẳng thức
- Hệ thức dạng $a > b$ (hoặc $a < b$, $a \\ge b$, $a \\le b$) được gọi là một **bất đẳng thức**.
- Trong đó, $a$ là **vế trái**, $b$ là **vế phải** của bất đẳng thức.
- **Cùng chiều và ngược chiều:** Hai bất đẳng thức $a < b$ và $c < d$ gọi là cùng chiều. Hai bất đẳng thức $a < b$ và $c > d$ gọi là ngược chiều.

#### 2. Tính chất của bất đẳng thức
- **Tính chất bắc cầu:** Nếu $a < b$ và $b < c$ thì $a < c$. (Tương tự cho $>, \\le, \\ge$).
- **Liên hệ giữa thứ tự và phép cộng:**
  - Khi cộng cùng một số vào hai vế của một bất đẳng thức, ta được bất đẳng thức mới **cùng chiều** với bất đẳng thức đã cho:
    $$a < b \\Rightarrow a + c < b + c$$
- **Liên hệ giữa thứ tự và phép nhân:**
  - Khi nhân cả hai vế với cùng một **số dương** ($c > 0$), bất đẳng thức **cùng chiều**:
    $$a < b \\Rightarrow ac < bc$$
  - Khi nhân cả hai vế với cùng một **số âm** ($c < 0$), bất đẳng thức **đổi chiều** (ngược chiều):
    $$a < b \\Rightarrow ac > bc$$

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: So sánh hai biểu thức số không qua tính toán
- **Phương pháp:** Sử dụng các tính chất của bất đẳng thức (cộng/nhân hai vế với cùng một số).
- **Ví dụ 1:** Không thực hiện phép tính, hãy so sánh $A = 2024 \\times (-5) + 10$ và $B = 2025 \\times (-5) + 10$.
  - Ta có bất đẳng thức hiển nhiên: $2024 < 2025$.
  - Nhân hai vế với số âm ($-5$), bất đẳng thức **đổi chiều**: $2024 \\times (-5) > 2025 \\times (-5)$.
  - Cộng $10$ vào hai vế, bất đẳng thức **giữ nguyên chiều**: $2024 \\times (-5) + 10 > 2025 \\times (-5) + 10$.
  - Kết luận: $A > B$.

#### Dạng 2: Chứng minh bất đẳng thức
- **Phương pháp:** Biến đổi tương đương đưa về bất đẳng thức luôn đúng (như bình phương của một biểu thức luôn không âm).
- **Ví dụ 2:** Chứng minh rằng với mọi số thực $a, b$, ta luôn có: $\\frac{a^2+b^2}{2} \\ge ab$.
  - Xét hiệu: $\\frac{a^2+b^2}{2} - ab = \\frac{a^2+b^2-2ab}{2} = \\frac{(a-b)^2}{2}$.
  - Vì $(a-b)^2 \\ge 0$ với mọi $a, b$ nên $\\frac{(a-b)^2}{2} \\ge 0$.
  - Do đó hiệu không âm $\\Rightarrow \\frac{a^2+b^2}{2} \\ge ab$ (đpcm).

#### Dạng 3: Bài toán thực tế
- **Ví dụ 3:** Trên đường cao tốc, biển báo giao thông quy định làn đường ô tô con có tốc độ tối đa cho phép là $60 \\text{ km/h}$. Bất đẳng thức mô tả vận tốc $v$ (km/h) hợp lệ của xe là: $0 < v \\le 60$.

![Biển báo quy định tốc độ đa làn đường](/images/toan9/b5_bien_bao_toc_do.svg?v=1)

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Quên đổi chiều khi nhân/chia với số âm:**
>   - Sai: $-2a < -2b \\Rightarrow a < b$.
>   - Đúng: Khi chia cho $-2$, phải đổi chiều: $-2a < -2b \\Rightarrow a > b$.
> - **Trừ vế theo vế hai bất đẳng thức cùng chiều:**
>   - Sai: $a < b$ và $c < d \\Rightarrow a - c < b - d$.
>   - Đúng: Chỉ được phép cộng vế theo vế hai bất đẳng thức cùng chiều ($a + c < b + d$). Không được tùy tiện trừ vế theo vế.`
      },
      {
        title: "Bài 6: Bất phương trình bậc nhất một ẩn",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Khái niệm bất phương trình bậc nhất một ẩn
- Bất phương trình bậc nhất một ẩn là bất phương trình có dạng:
  $$ax + b < 0 \\quad (\\text{hoặc } ax + b > 0,\\ ax + b \\le 0,\\ ax + b \\ge 0)$$
  trong đó $a, b$ là hai số đã cho và $a \\neq 0$.
- **Nghiệm của bất phương trình:** Số $x_0$ được gọi là một nghiệm của bất phương trình $A(x) < B(x)$ nếu thay $x = x_0$ vào ta được một khẳng định đúng ($A(x_0) < B(x_0)$).
- **Tập nghiệm:** Giải một bất phương trình là tìm tất cả các nghiệm (tập nghiệm) của bất phương trình đó.

#### 2. Cách giải bất phương trình bậc nhất một ẩn
Để giải bất phương trình $ax + b < 0$ ($a \\neq 0$), ta áp dụng hai quy tắc biến đổi:
- **Quy tắc chuyển vế:** Khi chuyển một hạng tử từ vế này sang vế kia của một bất phương trình, ta phải **đổi dấu** hạng tử đó.
- **Quy tắc nhân (hoặc chia):**
  - Khi nhân (hoặc chia) cả hai vế của một bất phương trình với một **số dương**, ta **giữ nguyên chiều** bất phương trình.
  - Khi nhân (hoặc chia) cả hai vế với một **số âm**, ta phải **đổi chiều** bất phương trình.
- **Tổng quát giải $ax + b < 0$:**
  - Chuyển vế: $ax < -b$.
  - Nếu $a > 0$ thì $x < -\\frac{b}{a}$.
  - Nếu $a < 0$ thì $x > -\\frac{b}{a}$.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Giải bất phương trình và biểu diễn tập nghiệm trên trục số
- **Ví dụ 1:** Giải bất phương trình $-2x + 4 \\ge 0$ và biểu diễn tập nghiệm trên trục số.
  - Chuyển vế: $-2x \\ge -4$.
  - Chia hai vế cho số âm ($-2$) và **đổi chiều**: $x \\le \\frac{-4}{-2} \\Leftrightarrow x \\le 2$.
  - Tập nghiệm của bất phương trình là $\\{x \\in \\mathbb{R} \\mid x \\le 2\\}$.
  - **Biểu diễn trên trục số:** Điểm 2 dùng dấu ngoặc vuông $[$ hoặc $]$ (ở đây dùng $]$ quay về bên trái phần nhỏ hơn hoặc bằng 2), gạch bỏ phần bên phải điểm 2 (phần $x > 2$).

![Biểu diễn tập nghiệm trên trục số](/images/toan9/b6_truc_so_x_le_2.svg?v=1)

#### Dạng 2: Bài toán thực tế
- **Ví dụ 2:** Để tổ chức đi dã ngoại, lớp 9A thuê một chiếc xe du lịch loại 16 chỗ. Hãng xe thông báo giá mở cửa là 15 nghìn đồng và giá mỗi kilômét tiếp theo là 12 nghìn đồng. Lớp 9A thu quỹ được 200 nghìn đồng cho việc di chuyển. Hỏi chiếc xe có thể chở các bạn đi được quãng đường tối đa bao nhiêu kilômét (tính tròn phần nguyên)?
  - Gọi quãng đường xe di chuyển là $x$ (km), điều kiện $x > 0$.
  - Số tiền phải trả cho hãng xe (tính bằng nghìn đồng) là: $15 + 12x$.
  - Vì quỹ lớp chỉ có 200 nghìn đồng nên ta có bất phương trình:
    $$15 + 12x \\le 200 \\Leftrightarrow 12x \\le 185 \\Leftrightarrow x \\le \\frac{185}{12} \\approx 15{,}41$$

![Mô phỏng bài toán thuê xe dã ngoại](/images/toan9/b6_thue_xe_taxi.svg?v=1)
  - Do đó, quãng đường tối đa lớp 9A có thể đi là khoảng 15 km.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Quên đổi chiều bất phương trình khi nhân hoặc chia với số âm:**
>   - Sai: $-3x > 6 \\Rightarrow x > \\frac{6}{-3} \\Rightarrow x > -2$.
>   - Đúng: Khi chia hai vế cho số âm ($-3$), bắt buộc phải **đổi chiều**: $-3x > 6 \\Leftrightarrow x < -2$.
> - **Nhầm lẫn giữa ngoặc tròn và ngoặc vuông trên trục số:**
>   - Dấu $<$ hoặc $>$ phải dùng ngoặc tròn $($, $)$.
>   - Dấu $\\le$ hoặc $\\ge$ mới dùng ngoặc vuông $[$, $]$.
>   - Ngoặc luôn hướng về phía phần chứa nghiệm (phần không bị gạch bỏ).`
      },
      {
        title: "Bài tập cuối chương II",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Phương trình quy về phương trình bậc nhất một ẩn
- **Phương trình tích:** Dạng $(ax+b)(cx+d) = 0$.
  - Cách giải: $ax+b=0$ hoặc $cx+d=0$.
- **Phương trình chứa ẩn ở mẫu:**
  - Bước 1: Tìm điều kiện xác định (ĐKXĐ).
  - Bước 2: Quy đồng mẫu hai vế và khử mẫu.
  - Bước 3: Giải phương trình nhận được.
  - Bước 4: Đối chiếu nghiệm với ĐKXĐ và kết luận.

#### 2. Bất đẳng thức và Bất phương trình bậc nhất một ẩn
- **Tính chất bất đẳng thức:**
  - Cộng hai vế với cùng một số: $a < b \\Rightarrow a + c < b + c$.
  - Nhân hai vế với số **dương** ($c > 0$): $a < b \\Rightarrow ac < bc$.
  - Nhân hai vế với số **âm** ($c < 0$): $a < b \\Rightarrow ac > bc$ (*đổi chiều*).
- **Bất phương trình bậc nhất một ẩn:** Có dạng $ax + b < 0$ (hoặc $> 0, \\le 0, \\ge 0$) với $a \\ne 0$.
  - Cách giải: Dùng quy tắc chuyển vế (đổi dấu) và quy tắc nhân/chia (đổi chiều nếu nhân/chia cho số âm).

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Giải phương trình chứa ẩn ở mẫu
- **Ví dụ 1:** Giải phương trình $\\frac{x}{x-5} - \\frac{2}{x+5} = \\frac{x^2}{x^2-25}$.
  - ĐKXĐ: $x \\neq \\pm 5$.
  - Quy đồng và khử mẫu: $x(x+5) - 2(x-5) = x^2 \\Leftrightarrow x^2 + 3x + 10 = x^2 \\Leftrightarrow 3x = -10 \\Leftrightarrow x = -\\frac{10}{3}$ (thỏa mãn ĐKXĐ).
  - Kết luận: Nghiệm của phương trình là $x = -\\frac{10}{3}$.

#### Dạng 2: Giải bất phương trình bậc nhất một ẩn
- **Ví dụ 2:** Giải bất phương trình $2x + 3(x+1) > 5x - (2x-4)$.
  - Rút gọn hai vế: $5x + 3 > 3x + 4$.
  - Chuyển vế: $5x - 3x > 4 - 3 \\Leftrightarrow 2x > 1 \\Leftrightarrow x > \\frac{1}{2}$.
  - Biểu diễn trên trục số: Dùng ngoặc tròn $($ tại điểm $\\frac{1}{2}$ quay về bên phải, gạch bỏ phần bên trái.

![Biểu diễn tập nghiệm trên trục số](/images/toan9/c2_truc_so_x_gt_half.svg?v=1)

#### Dạng 3: Bài toán thực tế
- **Ví dụ 3:** Để loại bỏ $x\\%$ một loại tảo độc khỏi một hồ nước sinh thái, chi phí cần bỏ ra (triệu đồng) tuân theo mô hình $C(x) = \\frac{50x}{100-x}$ ($0 \\le x < 100$). Với ngân sách $450$ triệu đồng, có thể loại bỏ được bao nhiêu phần trăm tảo độc?
  - Ta có phương trình: $\\frac{50x}{100-x} = 450 \\Rightarrow 50x = 450(100-x) \\Leftrightarrow 500x = 45000 \\Leftrightarrow x = 90\\%$.

![Xử lý tảo độc hồ sinh thái](/images/toan9/c2_ho_nuoc_tao_doc.svg?v=1)

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Trừ vế theo vế hai bất đẳng thức cùng chiều:** Chỉ được phép cộng vế theo vế ($a < b, c < d \\Rightarrow a + c < b + d$). Không được tự ý trừ vế theo vế.
> - **Nhầm dấu khi khử mẫu phương trình:** Ở bước khử mẫu phương trình chứa ẩn ở mẫu, phải dùng dấu suy ra $\\Rightarrow$ vì có thể sinh nghiệm ngoại lai, không được tùy tiện dùng dấu tương đương $\\Leftrightarrow$.`
      }
    ]
  },

  // ─── CHƯƠNG III ───────────────────────────────────────────────────────────
  {
    title: "Chương III: Căn bậc hai và căn bậc ba",
    lessons: [
      {
        title: "Bài 7: Căn bậc hai và căn thức bậc hai",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Căn bậc hai của một số thực
- **Định nghĩa:** Căn bậc hai của số thực không âm $a$ là số thực $x$ sao cho $x^2 = a$.
- **Nhận xét quan trọng:**
  - Số âm **không có** căn bậc hai trên tập số thực $\\mathbb{R}$.
  - Số $0$ có một căn bậc hai duy nhất là $0$.
  - Số dương $a$ có đúng **hai căn bậc hai đối nhau** là $\\sqrt{a}$ (gọi là căn bậc hai số học của $a$) và $-\\sqrt{a}$.
- **Căn bậc hai số học:** Với số thực $a \\ge 0$, $\\sqrt{a}$ là số thực $x \\ge 0$ sao cho $x^2 = a$:
  $$x = \\sqrt{a} \\Leftrightarrow \\begin{cases} x \\ge 0 \\\\ x^2 = a \\end{cases}$$
- **Tính chất cốt lõi:** $\\sqrt{a^2} = |a|$ với mọi số thực $a$.

#### 2. Căn thức bậc hai
- **Định nghĩa:** Căn thức bậc hai là biểu thức có dạng $\\sqrt{A}$, trong đó $A$ là một biểu thức đại số. $A$ được gọi là biểu thức lấy căn (hoặc biểu thức dưới dấu căn).
- **Điều kiện xác định (ĐKXĐ):** $\\sqrt{A}$ xác định (hay có nghĩa) khi $A$ lấy giá trị không âm:
  $$A \\ge 0$$
- **Hằng đẳng thức $\\sqrt{A^2} = |A|$:**
  $$\\sqrt{A^2} = |A| = \\begin{cases} A & \\text{nếu } A \\ge 0 \\\\ -A & \\text{nếu } A < 0 \\end{cases}$$

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Tìm điều kiện xác định và tính giá trị của căn thức
- **Ví dụ 1:** Cho biểu thức $P = \\sqrt{2x - 4}$.
  1. Tìm điều kiện xác định của căn thức.
  2. Tính giá trị của căn thức tại $x = 10$.
- **Lời giải:**
  1. Căn thức $\\sqrt{2x - 4}$ xác định khi biểu thức dưới dấu căn không âm:
     $$2x - 4 \\ge 0 \\Leftrightarrow 2x \\ge 4 \\Leftrightarrow x \\ge 2$$
     Vậy điều kiện xác định là $x \\ge 2$.
  2. Tại $x = 10$ (thỏa mãn ĐKXĐ $x \\ge 2$), thay vào biểu thức:
     $$P = \\sqrt{2 \\cdot 10 - 4} = \\sqrt{20 - 4} = \\sqrt{16} = 4$$

#### Dạng 2: Rút gọn biểu thức chứa căn dùng hằng đẳng thức $\\sqrt{A^2} = |A|$
- **Ví dụ 2:** Rút gọn biểu thức $A = \\sqrt{(\\sqrt{3} - 2)^2} + \\sqrt{(1 - \\sqrt{3})^2}$.
- **Lời giải:**
  1. Áp dụng hằng đẳng thức $\\sqrt{A^2} = |A|$:
     $$A = |\\sqrt{3} - 2| + |1 - \\sqrt{3}|$$
  2. Xét dấu biểu thức trong dấu giá trị tuyệt đối:
     - Vì $3 < 4 \\Rightarrow \\sqrt{3} < \\sqrt{4} = 2 \\Rightarrow \\sqrt{3} - 2 < 0 \\Rightarrow |\\sqrt{3} - 2| = 2 - \\sqrt{3}$.
     - Vì $1 < 3 \\Rightarrow 1 < \\sqrt{3} \\Rightarrow 1 - \\sqrt{3} < 0 \\Rightarrow |1 - \\sqrt{3}| = \\sqrt{3} - 1$.
  3. Thực hiện phép tính:
     $$A = (2 - \\sqrt{3}) + (\\sqrt{3} - 1) = 2 - \\sqrt{3} + \\sqrt{3} - 1 = 1$$

#### Dạng 3: Bài toán thực tế liên hệ diện tích và kích thước
- **Ví dụ 3:** Để chuẩn bị trồng cây trên vỉa hè, người ta để lại những ô đất hình tròn có diện tích $S = 2\\text{ m}^2$. Hỏi đường kính của các ô đất đó khoảng bao nhiêu mét (làm tròn kết quả đến chữ số thập phân thứ hai)? Biết diện tích hình tròn $S = \\pi R^2$.
- **Lời giải:**
  - Từ công thức diện tích $S = \\pi R^2$, suy ra bán kính $R = \\sqrt{\\frac{S}{\\pi}}$.
  - Đường kính ô đất là $d = 2R = 2 \\sqrt{\\frac{S}{\\pi}}$.
  - Thay $S = 2\\text{ m}^2$, ta có:
    $$d = 2 \\sqrt{\\frac{2}{\\pi}} \\approx 1{,}59576... \\approx 1{,}60\\text{ (m)}$$
  - Vậy đường kính ô đất khoảng $1{,}60\\text{ m}$.

![Mô phỏng ô đất hình tròn trên vỉa hè](/images/toan9/b7_o_dat_hinh_tron.svg?v=1)

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn giữa "căn bậc hai" và "căn bậc hai số học":**
>   - Sai: Viết $\\sqrt{16} = \\pm 4$.
>   - Đúng: Ký hiệu $\\sqrt{16}$ chỉ căn bậc hai số học (giá trị không âm), nên $\\sqrt{16} = 4$. Nếu nói bằng lời "căn bậc hai của 16" thì mới gồm hai giá trị là $4$ và $-4$.
> - **Khai căn bỏ qua giá trị tuyệt đối:**
>   - Sai: Rút gọn $\\sqrt{(x-5)^2} = x-5$ mà không xét điều kiện của $x$.
>   - Đúng: Phải viết $\\sqrt{(x-5)^2} = |x-5|$. Nếu $x \\ge 5$ thì bằng $x-5$; nếu $x < 5$ thì bằng $5-x$.
> - **Quên đổi chiều bất đẳng thức khi giải ĐKXĐ chứa hệ số âm:**
>   - Sai: $\\sqrt{-3x}$ có nghĩa khi $-3x \\ge 0 \\Rightarrow x \\ge 0$.
>   - Đúng: Khi chia hai vế cho số âm ($-3$), bất đẳng thức đổi chiều: $-3x \\ge 0 \\Leftrightarrow x \\le 0$.`
      },
      {
        title: "Bài 8: Khai căn bậc hai với phép nhân và phép chia",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Căn bậc hai và phép nhân
- **Quy tắc khai phương một tích:** Với hai biểu thức không âm $A$ và $B$ ($A \\ge 0, B \\ge 0$), ta có:
  $$\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$$
  *Phát biểu:* Muốn khai phương một tích của các số không âm, ta có thể khai phương từng thừa số rồi nhân các kết quả với nhau.
- **Quy tắc nhân các căn thức bậc hai:** Với $A \\ge 0$ và $B \\ge 0$, ta có:
  $$\\sqrt{A} \\cdot \\sqrt{B} = \\sqrt{A \\cdot B}$$
  *Phát biểu:* Muốn nhân các căn bậc hai của các số không âm, ta có thể nhân các số dưới dấu căn với nhau rồi khai phương kết quả đó.

#### 2. Căn bậc hai và phép chia
- **Quy tắc khai phương một thương:** Với biểu thức $A$ không âm và biểu thức $B$ dương ($A \\ge 0, B > 0$), ta có:
  $$\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}}$$
  *Phát biểu:* Muốn khai phương một thương $\\frac{a}{b}$ (với $a \\ge 0, b > 0$), ta có thể lần lượt khai phương số $a$ và số $b$, rồi lấy kết quả thứ nhất chia cho kết quả thứ hai.
- **Quy tắc chia hai căn thức bậc hai:** Với $A \\ge 0$ và $B > 0$, ta có:
  $$\\frac{\\sqrt{A}}{\\sqrt{B}} = \\sqrt{\\frac{A}{B}}$$
  *Phát biểu:* Muốn chia căn bậc hai của số $a$ không âm cho căn bậc hai của số $b$ dương, ta có thể chia số $a$ cho số $b$ rồi khai phương kết quả đó.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Khai phương một tích, một thương để tính nhẩm nhanh
- **Phương pháp:** Tách các số dưới dấu căn thành tích (hoặc thương) của các số chính phương để khai căn thuận tiện.
- **Ví dụ 1:** Tính giá trị của biểu thức: $A = \\sqrt{0{,}16 \\cdot 225}$ và $B = \\sqrt{\\frac{81}{196}}$.
  - Lời giải $A$: $A = \\sqrt{0{,}16} \\cdot \\sqrt{225} = 0{,}4 \\cdot 15 = 6$.
  - Lời giải $B$: $B = \\frac{\\sqrt{81}}{\\sqrt{196}} = \\frac{9}{14}$.

#### Dạng 2: Nhân, chia các căn thức bậc hai để rút gọn biểu thức
- **Phương pháp:** Gộp các căn bậc hai lại thành một căn bậc hai của tích hoặc thương, sau đó rút gọn biểu thức dưới dấu căn.
- **Ví dụ 2:** Tính giá trị của biểu thức: $C = \\sqrt{3} \\cdot \\sqrt{75}$ và $D = \\frac{\\sqrt{162}}{\\sqrt{2}}$.
  - Lời giải $C$: $C = \\sqrt{3 \\cdot 75} = \\sqrt{225} = 15$.
  - Lời giải $D$: $D = \\sqrt{\\frac{162}{2}} = \\sqrt{81} = 9$.

#### Dạng 3: Bài toán thực tế — Tính diện tích và chi phí vật liệu
- **Ví dụ 3:** Để chuẩn bị cho kỳ tuyển sinh mùa hè tại Trung tâm Toán Khôi Nguyên, thầy Toàn đã đặt làm một tấm biển quảng cáo ngoài trời bằng đèn LED. Tấm biển có hình chữ nhật với chiều dài $\\sqrt{18}\\text{ m}$ và chiều rộng $\\sqrt{2}\\text{ m}$. Tính diện tích tấm biển và chi phí vật liệu (biết đơn giá là $120$ nghìn đồng/$\\text{m}^2$).
- **Lời giải:**
  - Diện tích tấm biển quảng cáo hình chữ nhật là:
    $$S = \\sqrt{18} \\cdot \\sqrt{2} = \\sqrt{18 \\cdot 2} = \\sqrt{36} = 6\\text{ (m}^2\\text{)}$$
  - Chi phí vật liệu cần thiết là:
    $$6 \\times 120 = 720\\text{ (nghìn đồng)}$$

![Biển quảng cáo Trung tâm Toán Khôi Nguyên](/images/toan9/b8_bien_quang_cao_khoi_nguyen.svg?v=1)

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Ngộ nhận quy tắc khai phương áp dụng cho phép cộng / trừ:**
>   - Sai: Áp dụng $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$. Ví dụ: $\\sqrt{16 + 9} = \\sqrt{16} + \\sqrt{9} = 4 + 3 = 7$ (Sai lầm nghiêm trọng!).
>   - Đúng: Khai căn KHÔNG phân phối đối với phép cộng/trừ. Phải tính trong căn trước: $\\sqrt{16 + 9} = \\sqrt{25} = 5$.
> - **Quên điều kiện không âm của từng thừa số:**
>   - Sai: Khai phương $\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$ khi chưa rõ dấu của $A, B$. Nếu $A < 0, B < 0$ thì $\\sqrt{A \\cdot B}$ có nghĩa nhưng $\\sqrt{A}, \\sqrt{B}$ không có nghĩa.
>   - Đúng: Khi $x < 0, y < 0$ thì $\\sqrt{xy} = \\sqrt{(-x)(-y)} = \\sqrt{-x} \\cdot \\sqrt{-y}$.`
      },
      {
        title: "Bài 9: Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Đưa thừa số ra ngoài và vào trong dấu căn
- **Đưa thừa số ra ngoài dấu căn:** Với hai biểu thức $A, B$ mà $B \\ge 0$, ta có:
  $$\\sqrt{A^2 B} = |A|\\sqrt{B}$$
  - Nếu $A \\ge 0$ và $B \\ge 0$ thì $\\sqrt{A^2 B} = A\\sqrt{B}$.
  - Nếu $A < 0$ và $B \\ge 0$ thì $\\sqrt{A^2 B} = -A\\sqrt{B}$.
- **Đưa thừa số vào trong dấu căn:**
  - Với $A \\ge 0$ và $B \\ge 0$, ta có: $A\\sqrt{B} = \\sqrt{A^2 B}$.
  - Với $A < 0$ và $B \\ge 0$, ta có: $A\\sqrt{B} = -\\sqrt{A^2 B}$ (giữ dấu âm ở ngoài căn).

#### 2. Khử mẫu của biểu thức lấy căn và Trục căn thức ở mẫu
- **Khử mẫu của biểu thức lấy căn:** Với các biểu thức $A, B$ mà $A \\cdot B \\ge 0$ và $B \\neq 0$:
  $$\\sqrt{\\frac{A}{B}} = \\sqrt{\\frac{AB}{B^2}} = \\frac{\\sqrt{AB}}{|B|}$$
- **Trục căn thức ở mẫu:**
  - Dạng đơn giản: Với $B > 0$, ta có $\\frac{A}{\\sqrt{B}} = \\frac{A\\sqrt{B}}{B}$.
  - Dạng liên hợp với số: Với $A \\ge 0, A \\neq B^2$, ta có:
    $$\\frac{C}{\\sqrt{A} \\pm B} = \\frac{C(\\sqrt{A} \\mp B)}{A - B^2}$$
  - Dạng liên hợp với căn: Với $A \\ge 0, B \\ge 0, A \\neq B$, ta có:
    $$\\frac{C}{\\sqrt{A} \\pm \\sqrt{B}} = \\frac{C(\\sqrt{A} \\mp \\sqrt{B})}{A - B}$$

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Đưa thừa số ra ngoài / vào trong dấu căn và rút gọn
- **Ví dụ 1:** Rút gọn biểu thức $A = \\sqrt{75} - \\sqrt{48} + \\sqrt{300}$.
  - Đưa thừa số ra ngoài căn:
    $$A = \\sqrt{25 \\cdot 3} - \\sqrt{16 \\cdot 3} + \\sqrt{100 \\cdot 3} = 5\\sqrt{3} - 4\\sqrt{3} + 10\\sqrt{3}$$
  - Thu gọn các căn thức đồng dạng:
    $$A = (5 - 4 + 10)\\sqrt{3} = 11\\sqrt{3}$$
- **Ví dụ 2:** Đưa thừa số vào trong dấu căn: $-3\\sqrt{5}$.
  - Vì $-3 < 0$, ta giữ lại dấu âm ở bên ngoài:
    $$-3\\sqrt{5} = -\\sqrt{3^2 \\cdot 5} = -\\sqrt{45}$$

#### Dạng 2: Trục căn thức ở mẫu
- **Ví dụ 3:** Trục căn thức ở mẫu biểu thức $B = \\frac{4}{\\sqrt{7} - \\sqrt{3}}$.
  - Nhân cả tử và mẫu với biểu thức liên hợp $(\\sqrt{7} + \\sqrt{3})$:
    $$B = \\frac{4(\\sqrt{7} + \\sqrt{3})}{(\\sqrt{7} - \\sqrt{3})(\\sqrt{7} + \\sqrt{3})} = \\frac{4(\\sqrt{7} + \\sqrt{3})}{7 - 3} = \\frac{4(\\sqrt{7} + \\sqrt{3})}{4} = \\sqrt{7} + \\sqrt{3}$$

#### Dạng 3: Bài toán thực tế — Tính lượng vật liệu rào mảnh vườn
- **Ví dụ 4:** Một mảnh vườn hình chữ nhật có chiều dài $\\sqrt{48}\\text{ m}$ và chiều rộng $\\sqrt{27}\\text{ m}$. Người ta muốn rào lưới thép xung quanh mảnh vườn, để lại cổng rộng $2\\text{ m}$. Tính chiều dài lưới thép cần mua (dưới dạng căn thức thu gọn).
  - Rút gọn kích thước:
    - Chiều dài: $\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}\\text{ (m)}$.
    - Chiều rộng: $\\sqrt{27} = \\sqrt{9 \\cdot 3} = 3\\sqrt{3}\\text{ (m)}$.
  - Chu vi mảnh vườn:
    $$P = 2 \\cdot (4\\sqrt{3} + 3\\sqrt{3}) = 2 \\cdot 7\\sqrt{3} = 14\\sqrt{3}\\text{ (m)}$$
  - Chiều dài lưới thép cần mua:
    $$L = 14\\sqrt{3} - 2\\text{ (m)}$$

![Mảnh vườn rào lưới thép](/images/toan9/b9_vuon_hoa_luoi_thep.svg?v=1)

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Đưa thừa số âm vào trong căn:**
>   - Sai: $-2\\sqrt{3} = \\sqrt{(-2)^2 \\cdot 3} = \\sqrt{12}$.
>   - Đúng: Dấu âm bắt buộc phải để ngoài căn: $-2\\sqrt{3} = -\\sqrt{2^2 \\cdot 3} = -\\sqrt{12}$.
> - **Nhân sai biểu thức liên hợp:**
>   - Sai: Trục căn thức $\\frac{1}{\\sqrt{5}-\\sqrt{2}} = \\frac{\\sqrt{5}-\\sqrt{2}}{3}$.
>   - Đúng: Mẫu là hiệu thì phải nhân liên hợp tổng: $\\frac{1 \\cdot (\\sqrt{5}+\\sqrt{2})}{(\\sqrt{5}-\\sqrt{2})(\\sqrt{5}+\\sqrt{2})} = \\frac{\\sqrt{5}+\\sqrt{2}}{3}$.
> - **Bỏ quên dấu giá trị tuyệt đối:**
>   - Sai: Viết $\\sqrt{x^2 y} = x\\sqrt{y}$ khi chưa biết dấu của $x$.
>   - Đúng: $\\sqrt{x^2 y} = |x|\\sqrt{y}$. Chỉ bỏ giá trị tuyệt đối sau khi đã xác định rõ dấu của $x$.`
      },
      {
        title: "Bài 10: Căn bậc ba và căn thức bậc ba",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Căn bậc ba của một số thực
- **Định nghĩa:** Căn bậc ba của một số thực $a$ là số $x$ sao cho $x^3 = a$. Kí hiệu là $\\sqrt[3]{a}$.
- **Tính chất đặc trưng:**
  - Mọi số thực $a$ đều có **duy nhất một** căn bậc ba.
  - Căn bậc ba của số dương là số dương.
  - Căn bậc ba của số âm là số âm.
  - Căn bậc ba của số $0$ là $0$.
- **Hằng đẳng thức cơ bản:** Với mọi số thực $a$, ta luôn có:
  $$(\\sqrt[3]{a})^3 = \\sqrt[3]{a^3} = a$$

#### 2. Căn thức bậc ba và các tính chất
- **Định nghĩa:** Căn thức bậc ba là biểu thức có dạng $\\sqrt[3]{A}$, trong đó $A$ là một biểu thức đại số.
- **Điều kiện xác định:** Căn thức bậc ba $\\sqrt[3]{A}$ xác định với mọi giá trị của biến làm cho biểu thức $A$ xác định (không đòi hỏi $A \\ge 0$).
- **Các phép toán:**
  - $\\sqrt[3]{A \\cdot B} = \\sqrt[3]{A} \\cdot \\sqrt[3]{B}$.
  - $\\sqrt[3]{\\frac{A}{B}} = \\frac{\\sqrt[3]{A}}{\\sqrt[3]{B}}$ (với điều kiện $B \\neq 0$).
  - Nếu $A < B$ thì $\\sqrt[3]{A} < \\sqrt[3]{B}$.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Tính giá trị của biểu thức chứa căn bậc ba
- **Phương pháp:** Đưa các số dưới dấu căn về dạng lập phương của một số, sau đó áp dụng $\\sqrt[3]{a^3} = a$.
- **Ví dụ 1:** Tính giá trị biểu thức $A = \\sqrt[3]{64} - \\sqrt[3]{-27} + \\sqrt[3]{-125}$.
  - Đưa về dạng lập phương: $64 = 4^3$, $-27 = (-3)^3$, $-125 = (-5)^3$.
  - Thay vào biểu thức:
    $$A = \\sqrt[3]{4^3} - \\sqrt[3]{(-3)^3} + \\sqrt[3]{(-5)^3} = 4 - (-3) + (-5) = 4 + 3 - 5 = 2$$

#### Dạng 2: Giải phương trình chứa căn bậc ba
- **Phương pháp:** Lập phương hai vế của phương trình: $\\sqrt[3]{f(x)} = g(x) \\Leftrightarrow f(x) = [g(x)]^3$.
- **Ví dụ 2:** Giải phương trình $\\sqrt[3]{2x - 1} = 3$.
  - Lập phương hai vế:
    $$(\\sqrt[3]{2x - 1})^3 = 3^3 \\Leftrightarrow 2x - 1 = 27 \\Leftrightarrow 2x = 28 \\Leftrightarrow x = 14$$
  - Kết luận: Phương trình có nghiệm $x = 14$.

#### Dạng 3: Bài toán thực tế — Thể tích hình lập phương
- **Ví dụ 3:** Thầy Toàn tại Trung tâm Toán Khôi Nguyên thiết kế một khối Rubik khổng lồ hình lập phương có thể tích là $3{,}375\\text{ m}^3$. Hãy tính độ dài cạnh của khối Rubik này.
  - Gọi độ dài cạnh của khối Rubik là $a$ ($a > 0$, đơn vị mét).
  - Thể tích hình lập phương là $V = a^3 \\Rightarrow a^3 = 3{,}375$.
  - Khai căn bậc ba hai vế:
    $$a = \\sqrt[3]{3{,}375} = \\sqrt[3]{(1{,}5)^3} = 1{,}5\\text{ (m)}$$
  - Vậy độ dài cạnh của khối Rubik là $1{,}5\\text{ m}$.

![Mô phỏng khối Rubik khổng lồ](/images/toan9/b10_rubik_khong_lo.svg?v=1)

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Nghĩ rằng số âm không có căn bậc ba:**
>   - Sai: Cho rằng $\\sqrt[3]{-8}$ không xác định giống căn bậc hai.
>   - Đúng: Số âm **luôn có** căn bậc ba và kết quả là số âm: $\\sqrt[3]{-8} = -2$ (vì $(-2)^3 = -8$).
> - **Tự ý thêm dấu giá trị tuyệt đối:**
>   - Sai: Rút gọn $\\sqrt[3]{x^3} = |x|$.
>   - Đúng: Với căn bậc ba, $\\sqrt[3]{x^3} = x$ với mọi số thực $x$, không cần trị tuyệt đối.
> - **Đặt điều kiện không âm cho căn bậc ba:**
>   - Sai: Tìm ĐKXĐ của $\\sqrt[3]{x-2}$ là $x-2 \\ge 0 \\Rightarrow x \\ge 2$.
>   - Đúng: Căn thức bậc ba xác định với mọi giá trị làm cho biểu thức dưới căn có nghĩa (ở đây $x \\in \\mathbb{R}$).`
      },
      {
        title: "Bài tập cuối chương III",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm toàn chương III

#### 1. Căn bậc hai và Căn thức bậc hai
- **Căn bậc hai số học:** Với $a \\ge 0$, số $x \\ge 0$ thỏa mãn $x^2 = a$ gọi là căn bậc hai số học của $a$, kí hiệu là $\\sqrt{a}$.
- **Căn thức bậc hai:** $\\sqrt{A}$ xác định khi và chỉ khi $A \\ge 0$.
- **Hằng đẳng thức:** $\\sqrt{A^2} = |A| = \\begin{cases} A & \\text{nếu } A \\ge 0 \\\\ -A & \\text{nếu } A < 0 \\end{cases}$
- **Phép nhân và chia căn bậc hai:**
  - $\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$ (với $A \\ge 0, B \\ge 0$).
  - $\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}}$ (với $A \\ge 0, B > 0$).

#### 2. Biến đổi đơn giản biểu thức chứa căn
- **Đưa thừa số ra ngoài dấu căn:** $\\sqrt{A^2 B} = |A|\\sqrt{B}$ (với $B \\ge 0$).
- **Đưa thừa số vào trong dấu căn:**
  - $A\\sqrt{B} = \\sqrt{A^2 B}$ (với $A \\ge 0, B \\ge 0$).
  - $A\\sqrt{B} = -\\sqrt{A^2 B}$ (với $A < 0, B \\ge 0$).
- **Khử mẫu của biểu thức lấy căn:** $\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{AB}}{|B|}$ ($AB \\ge 0, B \\neq 0$).
- **Trục căn thức ở mẫu:** Nhân cả tử và mẫu với biểu thức liên hợp để làm triệt tiêu dấu căn ở mẫu.

#### 3. Căn bậc ba và Căn thức bậc ba
- Căn bậc ba của số $a$ là số $x$ sao cho $x^3 = a$, kí hiệu $\\sqrt[3]{a}$.
- Mọi số thực $a$ đều có **duy nhất một** căn bậc ba:
  - Căn bậc ba của số dương là số dương, của số âm là số âm, của $0$ là $0$.
- Hằng đẳng thức: $(\\sqrt[3]{A})^3 = \\sqrt[3]{A^3} = A$. Căn thức bậc ba $\\sqrt[3]{A}$ xác định với mọi giá trị của biến làm cho $A$ xác định (không cần $A \\ge 0$).

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Rút gọn biểu thức chứa căn thức tổng hợp
- **Ví dụ 1:** Rút gọn biểu thức $A = \\left( \\frac{1}{\\sqrt{x}-1} - \\frac{1}{\\sqrt{x}+1} \\right) \\cdot \\frac{x-1}{\\sqrt{x}}$ với $x > 0, x \\neq 1$.
  - Quy đồng mẫu số trong ngoặc (mẫu chung $x-1$):
    $$A = \\left( \\frac{\\sqrt{x}+1 - (\\sqrt{x}-1)}{(\\sqrt{x}-1)(\\sqrt{x}+1)} \\right) \\cdot \\frac{x-1}{\\sqrt{x}} = \\frac{2}{x-1} \\cdot \\frac{x-1}{\\sqrt{x}}$$
  - Rút gọn $(x-1)$ ở tử và mẫu:
    $$A = \\frac{2}{\\sqrt{x}}$$

#### Dạng 2: Giải phương trình chứa căn bậc hai và căn bậc ba
- **Ví dụ 2:** Giải phương trình $\\sqrt{4x-8} + \\sqrt[3]{x-2} = \\sqrt{x-2} + 2$.
  - ĐKXĐ: $x - 2 \\ge 0 \\Leftrightarrow x \\ge 2$.
  - Đưa thừa số ra ngoài căn:
    $$2\\sqrt{x-2} - \\sqrt{x-2} + \\sqrt[3]{x-2} - 2 = 0 \\Leftrightarrow \\sqrt{x-2} + \\sqrt[3]{x-2} - 2 = 0$$
  - Nhận xét tính đơn điệu: Vế trái là hàm đồng biến với $x \\ge 2$. Thử $x = 3$: $\\sqrt{1} + \\sqrt[3]{1} - 2 = 0$ (thỏa mãn).
  - Vậy phương trình có nghiệm duy nhất $x = 3$.

#### Dạng 3: Bài toán thực tế — Kích thước biển quảng cáo
- **Ví dụ 3:** Trung tâm Toán Khôi Nguyên thiết kế một tấm biển quảng cáo hình chữ nhật với chiều dài $\\sqrt{75}\\text{ m}$ và chiều rộng $\\sqrt{12}\\text{ m}$. Hãy tính diện tích và chu vi tấm biển.
  - Rút gọn kích thước:
    - Chiều dài: $a = \\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}\\text{ (m)}$.
    - Chiều rộng: $b = \\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}\\text{ (m)}$.
  - Diện tích tấm biển:
    $$S = a \\cdot b = (5\\sqrt{3}) \\cdot (2\\sqrt{3}) = 10 \\cdot 3 = 30\\text{ (m}^2\\text{)}$$
  - Chu vi tấm biển:
    $$P = 2(a + b) = 2(5\\sqrt{3} + 2\\sqrt{3}) = 2 \\cdot 7\\sqrt{3} = 14\\sqrt{3}\\text{ (m)}$$

![Biển quảng cáo Trung tâm Toán Khôi Nguyên](/images/toan9/c3_bien_quang_cao_thay_toan.svg?v=1)

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Cộng trừ các căn thức không đồng dạng:**
>   - Sai: $\\sqrt{2} + \\sqrt{3} = \\sqrt{5}$.
>   - Đúng: Chỉ cộng trừ các căn thức đồng dạng (cùng phần dưới căn): $2\\sqrt{3} + 4\\sqrt{3} = 6\\sqrt{3}$. Còn $\\sqrt{2} + \\sqrt{3}$ phải giữ nguyên.
> - **Khai căn bỏ qua giá trị tuyệt đối:**
>   - Sai: $\\sqrt{(x-1)^2} = x-1$ với mọi $x$.
>   - Đúng: $\\sqrt{(x-1)^2} = |x-1|$. Cần xét dấu của $x-1$ để mở trị tuyệt đối.
> - **Bình phương hai vế phương trình vô tỉ khi chưa đặt điều kiện:**
>   - Sai: $\\sqrt{A} = B \\Leftrightarrow A = B^2$ (quên điều kiện của $B$).
>   - Đúng: Phải có điều kiện $B \\ge 0$, khi đó mới tương đương $A = B^2$.`
      },
    ]
  },

  // ─── CHƯƠNG IV ────────────────────────────────────────────────────────────
  {
    title: "Chương IV: Hệ thức lượng trong tam giác vuông",
    lessons: [
      {
        title: "Bài 11: Tỉ số lượng giác của góc nhọn",
        summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

#### 1. Định nghĩa Tỉ số lượng giác của góc nhọn
![Tam giác vuông tỉ số lượng giác](/images/toan9/b11_tam_giac_vuong_alpha.svg?v=1)

Cho tam giác $ABC$ vuông tại $A$, xét góc nhọn $B = \\alpha$:
- Cạnh $AC$ đối diện với góc $B$ gọi là **cạnh đối**.
- Cạnh $AB$ kề với góc $B$ gọi là **cạnh kề**.
- Cạnh $BC$ luôn là **cạnh huyền**.

Ta định nghĩa các tỉ số lượng giác của góc $\\alpha$ như sau:
$$\\sin \\alpha = \\frac{\\text{Cạnh đối}}{\\text{Cạnh huyền}} = \\frac{AC}{BC}, \\quad \\cos \\alpha = \\frac{\\text{Cạnh kề}}{\\text{Cạnh huyền}} = \\frac{AB}{BC}$$
$$\\tan \\alpha = \\frac{\\text{Cạnh đối}}{\\text{Cạnh kề}} = \\frac{AC}{AB}, \\quad \\cot \\alpha = \\frac{\\text{Cạnh kề}}{\\text{Cạnh đối}} = \\frac{AB}{AC}$$

*Mẹo ghi nhớ kinh điển:*
> **"Sin đi học — Cứ khóc hoài — Thôi đừng khóc — Có kẹo đây"**  
> *(Đối/Huyền — Kề/Huyền — Đối/Kề — Kề/Đối)*

#### 2. Tỉ số lượng giác của hai góc phụ nhau
Nếu hai góc nhọn $\\alpha$ và $\\beta$ phụ nhau ($\\alpha + \\beta = 90^\\circ$), thì:
$$\\sin \\alpha = \\cos \\beta, \\quad \\cos \\alpha = \\sin \\beta$$
$$\\tan \\alpha = \\cot \\beta, \\quad \\cot \\alpha = \\tan \\beta$$
*Ví dụ:* $\\sin 30^\\circ = \\cos 60^\\circ$, $\\tan 40^\\circ = \\cot 50^\\circ$.

#### 3. Bảng tỉ số lượng giác của các góc đặc biệt ($30^\\circ, 45^\\circ, 60^\\circ$)

| Tỉ số \\ Góc $\\alpha$ | $30^\\circ$ | $45^\\circ$ | $60^\\circ$ |
| :---: | :---: | :---: | :---: |
| **$\\sin \\alpha$** | $\\frac{1}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ |
| **$\\cos \\alpha$** | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{1}{2}$ |
| **$\\tan \\alpha$** | $\\frac{\\sqrt{3}}{3}$ | $1$ | $\\sqrt{3}$ |
| **$\\cot \\alpha$** | $\\sqrt{3}$ | $1$ | $\\frac{\\sqrt{3}}{3}$ |

#### 4. Một số hệ thức lượng giác cơ bản
- $0 < \\sin \\alpha < 1$ và $0 < \\cos \\alpha < 1$ (với mọi góc nhọn $\\alpha$).
- $\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}, \\quad \\cot \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}, \\quad \\tan \\alpha \\cdot \\cot \\alpha = 1$.
- $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.
- $1 + \\tan^2 \\alpha = \\frac{1}{\\cos^2 \\alpha}, \\quad 1 + \\cot^2 \\alpha = \\frac{1}{\\sin^2 \\alpha}$.

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Tính tỉ số lượng giác khi biết độ dài các cạnh
![Tam giác vuông 5-12-13](/images/toan9/b11_tam_giac_5_12_13.svg?v=1)

- **Ví dụ 1:** Cho tam giác $ABC$ vuông tại $A$, có $AB = 3\\text{ cm}$, $AC = 4\\text{ cm}$. Hãy tính các tỉ số lượng giác của góc $B$.
  - **Lời giải:**
    1. Áp dụng định lý Pythagore tìm cạnh huyền $BC$:
       $$BC = \\sqrt{AB^2 + AC^2} = \\sqrt{3^2 + 4^2} = 5\\text{ (cm)}$$
    2. Xác định các tỉ số lượng giác:
       $$\\sin B = \\frac{AC}{BC} = \\frac{4}{5} = 0{,}8, \\quad \\cos B = \\frac{AB}{BC} = \\frac{3}{5} = 0{,}6$$
       $$\\tan B = \\frac{AC}{AB} = \\frac{4}{3}, \\quad \\cot B = \\frac{AB}{AC} = \\frac{3}{4} = 0{,}75$$

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Thang cứu hỏa tựa tường an toàn
![Mô phỏng chiếc thang cứu hỏa tựa vào tường](/images/toan9/b11_thang_cuu_hoa_an_toan.svg?v=1)

- **Đề bài:** Một chiếc thang cứu hỏa dài $3{,}2\\text{ m}$ đặt tựa vào một bức tường. Đầu thang chạm tường ở độ cao $3\\text{ m}$ so với mặt đất. Để đảm bảo an toàn, góc tạo bởi thang và mặt đất (góc $\\alpha$) phải nằm trong khoảng từ $65^\\circ$ đến $75^\\circ$. Hỏi cách đặt thang này có an toàn không?
- **Lời giải:**
  1. Cạnh đối diện góc $\\alpha$ là chiều cao chạm tường ($3\\text{ m}$), cạnh huyền là chiều dài thang ($3{,}2\\text{ m}$).
  2. Áp dụng tỉ số sin:
     $$\\sin \\alpha = \\frac{\\text{đối}}{\\text{huyền}} = \\frac{3}{3{,}2} = 0{,}9375$$
  3. Bấm máy tính (\`SHIFT sin 0.9375\`):
     $$\\alpha \\approx 69^\\circ 38'$$
  4. **Kết luận:** Vì $65^\\circ < 69^\\circ 38' < 75^\\circ$, cách đặt thang này **đạt tiêu chuẩn an toàn lao động**.
- **Liên hệ thực tế:** Trong kỹ thuật xây dựng và cứu hỏa, quy tắc "1/4" thường được áp dụng: Đặt chân thang cách tường một khoảng bằng 1/4 chiều dài thang sẽ tạo ra góc xấp xỉ $75^\\circ$, tối ưu cho độ bám và cân bằng trọng lực.

#### 🌍 Bài toán 2: Chiều cao chiếc diều
![Mô phỏng Nam đang thả diều](/images/toan9/b11_chiec_dieu_nam.svg?v=1)

- **Đề bài:** Bạn Nam đang thả diều. Biết rằng dây diều dài $8\\text{ m}$ và đang được kéo căng. Dây diều tạo với phương ngang mặt đất một góc $\\alpha = 49^\\circ$. Tính độ cao của chiếc diều so với tay bạn Nam (làm tròn đến mét).
- **Lời giải:**
  1. Gọi $h$ là độ cao của diều tính từ tay Nam. Cạnh huyền là chiều dài dây diều ($8\\text{ m}$), cạnh đối là $h$.
  2. Áp dụng tỉ số sin:
     $$\\sin 49^\\circ = \\frac{h}{8} \\Rightarrow h = 8 \\cdot \\sin 49^\\circ \\approx 8 \\cdot 0{,}7547 \\approx 6{,}0\\text{ (m)}$$
  3. **Kết luận:** Chiếc diều đang bay ở độ cao khoảng $6\\text{ m}$ so với tay bạn Nam (khoảng $7\\text{ m}$ so với mặt đất).
- **Liên hệ thực tế:** Trong hàng hải và hàng không, hệ thức lượng được sử dụng liên tục để tính cao độ của máy bay hoặc khoảng cách giữa các tàu thông qua các góc quét trên hệ thống radar.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Áp dụng tỉ số lượng giác cho tam giác KHÔNG vuông:**
>   - Sai: Dùng tỉ số đối/huyền cho tam giác thường.
>   - Đúng: Chỉ áp dụng trong tam giác vuông. Nếu tam giác chưa vuông, bắt buộc phải kẻ thêm đường cao.
> - **Tính ra giá trị sin hoặc cos lớn hơn 1:**
>   - Sai: $\\sin \\alpha = 1{,}25$.
>   - Đúng: Vì cạnh góc vuông luôn nhỏ hơn cạnh huyền nên $0 < \\sin \\alpha < 1$ và $0 < \\cos \\alpha < 1$. Nếu tính ra $> 1$ chắc chắn đã nhầm lẫn công thức!
> - **Ngộ nhận khi tăng/giảm góc:**
>   - Khi góc $\\alpha$ tăng từ $0^\\circ$ đến $90^\\circ$: $\\sin \\alpha, \\tan \\alpha$ **tăng dần**, nhưng $\\cos \\alpha, \\cot \\alpha$ **giảm dần**.`
      },
      {
        title: "Bài 12: Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng",
        summary: commonSummaryPrefix + `### 1.1 — Kiến thức trọng tâm

Trong một tam giác vuông, nếu biết trước **hai yếu tố** (trong đó có ít nhất một yếu tố về độ dài cạnh), ta hoàn toàn có thể tính được tất cả các cạnh và các góc còn lại. Quá trình này được gọi là **Giải tam giác vuông**.

#### 1. Hệ thức giữa cạnh huyền và cạnh góc vuông (Định lý 1)
Trong tam giác vuông, mỗi cạnh góc vuông bằng **cạnh huyền** nhân với **$\\sin$ góc đối** hoặc nhân với **côsin góc kề**.

Cho $\\triangle ABC$ vuông tại $A$, cạnh huyền $a = BC$, hai cạnh góc vuông $b = AC, c = AB$:
$$b = a \\cdot \\sin B = a \\cdot \\cos C$$
$$c = a \\cdot \\sin C = a \\cdot \\cos B$$

#### 2. Hệ thức giữa hai cạnh góc vuông (Định lý 2)
Trong tam giác vuông, mỗi cạnh góc vuông bằng **cạnh góc vuông kia** nhân với **tang góc đối** hoặc nhân với **côtang góc kề**.

Vẫn với $\\triangle ABC$ vuông tại $A$:
$$b = c \\cdot \\tan B = c \\cdot \\cot C$$
$$c = b \\cdot \\tan C = b \\cdot \\cot B$$

![Mô hình các hệ thức lượng trong tam giác vuông](/images/toan9/b12_he_thuc_tam_giac_vuong.svg?v=1)

---

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Giải tam giác vuông (Cơ bản)
- **Đặc điểm nhận dạng:** Bài toán cho sẵn một tam giác vuông, biết độ dài 1 cạnh và 1 góc nhọn (hoặc 2 cạnh). Yêu cầu tìm các cạnh và góc còn lại.
- **Ví dụ 1:** Giải tam giác vuông $MNP$ vuông tại $M$, biết $MN = 5\\text{ cm}$ và $\\widehat{N} = 35^\\circ$ (làm tròn độ dài đến chữ số thập phân thứ hai).

![Giải tam giác vuông MNP](/images/toan9/b12_giai_tam_giac_mnp.svg?v=1)

- **Hướng dẫn giải:**
  1. **Tìm góc $\\widehat{P}$:** Vì $\\triangle MNP$ vuông tại $M$ nên:
     $$\\widehat{P} = 90^\\circ - \\widehat{N} = 90^\\circ - 35^\\circ = 55^\\circ$$
  2. **Tìm cạnh $MP$ (áp dụng Định lý 2):** Cạnh góc vuông = Cạnh góc vuông kia $\\times \\tan(\\text{góc đối})$:
     $$MP = MN \\cdot \\tan N = 5 \\cdot \\tan 35^\\circ \\approx 5 \\cdot 0{,}7002 \\approx 3{,}50\\text{ (cm)}$$
  3. **Tìm cạnh huyền $NP$ (áp dụng Định lý 1):** Cạnh góc vuông = Cạnh huyền $\\times \\cos(\\text{góc kề})$:
     $$NP = \\frac{MN}{\\cos N} = \\frac{5}{\\cos 35^\\circ} \\approx \\frac{5}{0{,}8192} \\approx 6{,}10\\text{ (cm)}$$
     *(Hoặc kiểm tra lại bằng Pythagore: $NP = \\sqrt{5^2 + 3{,}50^2} \\approx 6{,}10\\text{ cm}$)*.

#### Dạng 2: Ứng dụng thực tế — Bài toán phương tiện di chuyển
- **Đặc điểm nhận dạng:** Bài toán về máy bay cất cánh, tàu ngầm lặn, xe lên dốc. Cần xác định độ cao đạt được dựa vào vận tốc, thời gian và góc nghiêng.
- **Ví dụ 2:** Một chiếc máy bay cất cánh với vận tốc $500\\text{ km/h}$. Đường bay tạo với phương ngang một góc $30^\\circ$. Hỏi sau $1{,}2\\text{ phút}$, máy bay ở độ cao bao nhiêu mét so với mặt đất?

![Máy bay cất cánh](/images/toan9/b12_may_bay_cat_canh.svg?v=1)

- **Hướng dẫn giải:**
  1. **Đổi thời gian ra giờ:** $t = 1{,}2\\text{ phút} = \\frac{1{,}2}{60}\\text{ h} = 0{,}02\\text{ giờ}$.
  2. **Quãng đường máy bay bay được (cạnh huyền $AB$):**
     $$AB = v \\cdot t = 500 \\cdot 0{,}02 = 10\\text{ (km)} = 10\\,000\\text{ (m)}$$
  3. **Độ cao của máy bay chính là cạnh góc vuông $BH$ đối diện góc $30^\\circ$:**
     $$BH = AB \\cdot \\sin 30^\\circ = 10\\,000 \\cdot \\frac{1}{2} = 5\\,000\\text{ (m)}$$
  4. **Kết luận:** Máy bay đang ở độ cao $5\\,000\\text{ m}$ so với mặt đất.

---

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Chiều cao của tháp hải đăng
- **Đề bài:** Một người đang đứng trên chiếc thuyền trên biển, quan sát một tháp hải đăng xây trên vách đá. Người đó dùng giác kế đo được góc nâng từ mắt mình đến đỉnh tháp là $42^\\circ$. Biết khoảng cách theo phương ngang từ thuyền đến chân tháp là $120\\text{ m}$ và mắt người quan sát cách mặt nước $2\\text{ m}$. Hỏi đỉnh tháp hải đăng cao bao nhiêu mét so với mặt nước biển (làm tròn đến hàng đơn vị)?

![Mô phỏng tháp hải đăng](/images/toan9/b12_hai_dang_thuyen_42.svg?v=1)

- **Hướng dẫn giải:**
  1. Gọi $M$ là vị trí mắt người, $D$ là đỉnh tháp, $C$ là hình chiếu của $M$ lên trục dọc tháp. Tam giác $MCD$ vuông tại $C$.
  2. Cạnh kề góc $42^\\circ$ là $MC = 120\\text{ m}$. Cạnh đối $CD = h_1$ (phần tháp cao hơn mắt người):
     $$CD = MC \\cdot \\tan 42^\\circ = 120 \\cdot \\tan 42^\\circ \\approx 120 \\cdot 0{,}9004 \\approx 108\\text{ (m)}$$
  3. Chiều cao toàn bộ của đỉnh tháp so với mặt nước biển:
     $$H = CD + CH = 108 + 2 = 110\\text{ (m)}$$
  4. **Kết luận:** Đỉnh tháp hải đăng cao khoảng $110\\text{ m}$ so với mực nước biển.
- **Liên hệ thực tế:** Đây là nguyên lý cơ bản của trắc địa công trình và định vị hàng hải. Bằng cách đo góc ngắm và khoảng cách ngang, ta tính được cao độ mà không cần tiếp cận trực tiếp vị trí nguy hiểm.

#### 🌍 Bài toán 2: Đánh giá độ võng của dây văng cầu
- **Đề bài:** Một kỹ sư cầu đường kiểm tra cầu dây văng. Trụ cầu thẳng đứng cao $45\\text{ m}$ so với mặt cầu. Dây văng ngoài cùng tạo với mặt cầu một góc $32^\\circ$. Tính chiều dài của sợi dây văng này và khoảng cách từ chân trụ cầu đến điểm neo dây văng trên mặt cầu (làm tròn đến 1 chữ số thập phân).

![Sơ đồ cầu dây văng](/images/toan9/b12_cau_day_vang_45m.svg?v=1)

- **Hướng dẫn giải:**
  1. Xét $\\triangle TCN$ vuông tại $C$, với $TC = 45\\text{ m}$ là trụ cầu, góc $\\widehat{N} = 32^\\circ$, dây văng là cạnh huyền $TN$, khoảng cách neo là cạnh kề $CN$.
  2. **Tính chiều dài dây văng $TN$:**
     $$TN = \\frac{TC}{\\sin 32^\\circ} = \\frac{45}{\\sin 32^\\circ} \\approx \\frac{45}{0{,}5299} \\approx 84{,}9\\text{ (m)}$$
  3. **Tính khoảng cách từ chân trụ đến điểm neo $CN$:**
     $$CN = \\frac{TC}{\\tan 32^\\circ} = \\frac{45}{\\tan 32^\\circ} \\approx \\frac{45}{0{,}6248} \\approx 72{,}0\\text{ (m)}$$
  4. **Kết luận:** Chiều dài sợi dây văng ngoài cùng khoảng $84{,}9\\text{ m}$ và điểm neo cách chân trụ $72{,}0\\text{ m}$.
- **Liên hệ thực tế:** Trong kỹ thuật cầu đường, góc tạo bởi dây văng và dầm cầu được thiết kế tối ưu để cân bằng giữa lực căng cáp và sức chịu nén của tháp, triệt tiêu nguy cơ cộng hưởng gió bão.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Nhầm lẫn giữa TANG và SIN khi tính đường cao:**
>   - Sai: Cho tam giác vuông, biết cạnh kề và muốn tính cạnh đối lại viết $b = c \\cdot \\sin B$.
>   - Đúng: Nhớ quy tắc: Liên quan đến **cạnh huyền** $\\Rightarrow$ dùng $\\sin, \\cos$. Liên quan **chỉ hai cạnh góc vuông** $\\Rightarrow$ dùng $\\tan, \\cot$. Sửa thành $b = c \\cdot \\tan B$.
> - **Sai lầm 2: Bấm máy tính sai đơn vị góc (Radian thay vì Degree):**
>   - Bấm $\\sin 30$ ra $-0{,}988$ thay vì $0{,}5$. Luôn kiểm tra màn hình máy tính có ký hiệu **D** (hoặc Deg). Nếu hiện chữ **R**, đổi ngay sang chế độ Degree.`
      },
      {
        title: "Bài tập cuối chương IV",
        summary: commonSummaryPrefix + `### 1.1 Tóm tắt kiến thức trọng tâm toàn chương IV

#### 1. Tỉ số lượng giác của góc nhọn
Trong tam giác vuông có góc nhọn $\\alpha$:
- $\\sin \\alpha = \\frac{\\text{cạnh đối}}{\\text{cạnh huyền}}, \\quad \\cos \\alpha = \\frac{\\text{cạnh kề}}{\\text{cạnh huyền}}$
- $\\tan \\alpha = \\frac{\\text{cạnh đối}}{\\text{cạnh kề}}, \\quad \\cot \\alpha = \\frac{\\text{cạnh kề}}{\\text{cạnh đối}}$

**Tính chất quan trọng:**
- $0 < \\sin \\alpha < 1, \\quad 0 < \\cos \\alpha < 1$.
- **Hai góc phụ nhau:** Nếu $\\alpha + \\beta = 90^\\circ$ thì:
  $$\\sin \\alpha = \\cos \\beta, \\quad \\cos \\alpha = \\sin \\beta, \\quad \\tan \\alpha = \\cot \\beta, \\quad \\cot \\alpha = \\tan \\beta$$
- **Các hệ thức cơ bản:**
  $$\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}, \\quad \\cot \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}, \\quad \\tan \\alpha \\cdot \\cot \\alpha = 1$$
  $$\\sin^2 \\alpha + \\cos^2 \\alpha = 1, \\quad 1 + \\tan^2 \\alpha = \\frac{1}{\\cos^2 \\alpha}$$

#### 2. Các hệ thức giữa cạnh và góc trong tam giác vuông
Trong tam giác vuông, mỗi cạnh góc vuông bằng:
- Cạnh huyền nhân với $\\sin$ góc đối hoặc nhân với $\\cos$ góc kề:
  $$b = a \\cdot \\sin B = a \\cdot \\cos C, \\quad c = a \\cdot \\sin C = a \\cdot \\cos B$$
- Cạnh góc vuông kia nhân với $\\tan$ góc đối hoặc nhân với $\\cot$ góc kề:
  $$b = c \\cdot \\tan B = c \\cdot \\cot C, \\quad c = b \\cdot \\tan C = b \\cdot \\cot B$$

### 1.2 Phân loại dạng bài & Ví dụ mẫu (Luyện tập chung)

#### Dạng 1: Tính chiều cao vật thể thông qua bóng nắng
![Cây bàng bóng nắng](/images/toan9/c4_cay_bang_bong_nang.svg?v=1)

- **Ví dụ 1:** Tại sân Trung tâm Toán Khôi Nguyên, một cây bàng đổ bóng xuống mặt đất dài $15\\text{ m}$. Biết tia nắng mặt trời tạo với mặt đất một góc là $40^\\circ$. Tính chiều cao của cây bàng (làm tròn đến hàng phần mười).
  - **Giải:**
    - Chiều cao cây $h$ là cạnh đối, bóng cây trên mặt đất $15\\text{ m}$ là cạnh kề với góc $40^\\circ$.
    - Áp dụng hệ thức: Cạnh đối = Cạnh kề $\\times \\tan(\\text{góc đối})$:
      $$h = 15 \\cdot \\tan 40^\\circ \\approx 15 \\cdot 0{,}8391 \\approx 12{,}6\\text{ (m)}$$
    - Vậy cây bàng cao khoảng $12{,}6\\text{ mét}$.

#### Dạng 2: Bài toán có 2 điểm quan sát (Luyện tập chung)
![Ngọn hải đăng hai thuyền](/images/toan9/c4_hai_dang_hai_thuyen.svg?v=1)

- **Ví dụ 2:** Một người quan sát đứng trên đỉnh ngọn hải đăng cao $60\\text{ m}$ so với mực nước biển ($AH = 60\\text{ m}$). Người đó nhìn thấy một chiếc thuyền cứu hộ ($C$) và một chiếc thuyền cá ($D$) đang thẳng hàng với ngọn hải đăng. Góc hạ nhìn thuyền cứu hộ là $45^\\circ$ và góc hạ nhìn thuyền cá là $30^\\circ$. Hỏi hai chiếc thuyền cách nhau bao nhiêu mét? (Làm tròn đến chữ số thập phân thứ nhất).
  - **Giải:**
    - Do so le trong với góc hạ theo phương ngang, ta có $\\widehat{ACH} = 45^\\circ$ và $\\widehat{ADH} = 30^\\circ$.
    - Trong $\\Delta AHC$ vuông tại $H$:
      $$HC = \\frac{AH}{\\tan 45^\\circ} = \\frac{60}{1} = 60\\text{ (m)}$$
    - Trong $\\Delta AHD$ vuông tại $H$:
      $$HD = \\frac{AH}{\\tan 30^\\circ} = \\frac{60}{\\frac{\\sqrt{3}}{3}} = 60\\sqrt{3}\\text{ (m)}$$
    - Khoảng cách giữa hai thuyền là:
      $$CD = HD - HC = 60\\sqrt{3} - 60 \\approx 60(1{,}732 - 1) \\approx 43{,}9\\text{ (m)}$$
    - Vậy hai thuyền cách nhau khoảng $43{,}9\\text{ mét}$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Rút nhầm đại lượng ở mẫu số:**
>   - Sai: Khi tính cạnh huyền $BC$ khi biết cạnh đối $AC$ và góc nhọn $\\widehat{B}$, viết $BC = AC \\cdot \\sin B$.
>   - Đúng: $\\sin B = \\frac{AC}{BC} \\Rightarrow BC = \\frac{AC}{\\sin B}$. Cần lưu ý khi ẩn số nằm ở mẫu.
> - **Chế độ đơn vị góc trên máy tính:**
>   - Luôn kiểm tra máy tính ở chế độ **Degree** (kí hiệu **D** hoặc **DEG** trên màn hình), không để chế độ Radian (**R**) để tránh tính sai kết quả các tỉ số lượng giác.`
      }
    ]
  },

  // ─── CHƯƠNG V ─────────────────────────────────────────────────────────────
  {
    title: "Chương V: Đường tròn",
    lessons: [
      {
        title: "Bài 13: Mở đầu về đường tròn",
        summary: commonSummaryPrefix + `### 1.1 — Kiến thức trọng tâm

#### 1. Đường tròn và vị trí tương đối của một điểm đối với đường tròn
- **Định nghĩa:** Đường tròn tâm $O$, bán kính $R$ ($R > 0$), kí hiệu là $(O; R)$, là hình gồm **tất cả các điểm** cách điểm $O$ một khoảng đúng bằng $R$.
- **Vị trí tương đối của điểm $M$ đối với $(O; R)$:**
  - Điểm $M$ nằm **trên** (thuộc) đường tròn $(O; R) \\Leftrightarrow OM = R$. Kí hiệu: $M \\in (O; R)$.
  - Điểm $M$ nằm **trong** đường tròn $(O; R) \\Leftrightarrow OM < R$.
  - Điểm $M$ nằm **ngoài** đường tròn $(O; R) \\Leftrightarrow OM > R$.
- **Lưu ý:** **Hình tròn** tâm $O$, bán kính $R$ là hình gồm các điểm nằm trên và nằm trong đường tròn đó (tức là tập hợp các điểm $M$ sao cho $OM \\le R$).

![Vị trí tương đối của các điểm đối với đường tròn](/images/toan9/b13_vi_tri_diem_duong_tron.svg?v=1)

#### 2. Tính đối xứng của đường tròn
Đường tròn là một hình có sự cân đối hoàn hảo:
- **Tâm đối xứng:** Đường tròn có **duy nhất một tâm đối xứng**, chính là tâm $O$ của đường tròn. (Nếu $M \\in (O)$ thì điểm $M'$ đối xứng với $M$ qua $O$ cũng thuộc $(O)$).
- **Trục đối xứng:** Đường tròn có **vô số trục đối xứng**. Bất kỳ đường thẳng nào đi qua tâm $O$ (chứa đường kính) đều là trục đối xứng của đường tròn.

![Tính đối xứng tâm và trục của đường tròn](/images/toan9/b13_tinh_doi_xung_duong_tron.svg?v=1)

---

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Chứng minh nhiều điểm cùng nằm trên một đường tròn
- **Đặc điểm nhận dạng:** Đề bài yêu cầu chứng minh các điểm cùng cách đều một điểm $O$ cố định.
- **Phương pháp:** Tìm điểm $O$ sao cho $OA = OB = OC = \\dots$ Khi đó các điểm $A, B, C$ cùng thuộc đường tròn tâm $O$. Thường dùng tính chất đường trung tuyến ứng với cạnh huyền của tam giác vuông.
- **Ví dụ 1:** Cho tam giác $ABC$ vuông tại $A$. Gọi $O$ là trung điểm của $BC$. Chứng minh rằng ba điểm $A, B, C$ cùng thuộc một đường tròn tâm $O$.

![Tam giác vuông nội tiếp đường tròn](/images/toan9/b13_tam_giac_vuong_trung_tuyen.svg?v=1)

- **Hướng dẫn giải:**
  1. Vì $\\triangle ABC$ vuông tại $A$ và $AO$ là đường trung tuyến ứng với cạnh huyền $BC$ (do $O$ là trung điểm $BC$).
  2. Theo tính chất tam giác vuông: $AO = \\frac{1}{2}BC$.
  3. Lại có $OB = OC = \\frac{1}{2}BC$.
  4. Suy ra $OA = OB = OC$.
  5. **Kết luận:** Vậy ba điểm $A, B, C$ cùng cách đều điểm $O$ nên chúng cùng nằm trên đường tròn tâm $O$, đường kính $BC$.

---

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Vùng phủ sóng Trạm phát Wi-Fi
- **Đề bài:** Một trạm phát Wi-Fi ngoài trời được đặt tại tâm $O$ của một khu công viên. Phạm vi phủ sóng lý tưởng của trạm này là một hình tròn có bán kính $R = 50\\text{ m}$. Có ba vị trí ghế đá trong công viên:
  - Ghế A cách trạm phát $40\\text{ m}$.
  - Ghế B cách trạm phát đúng $50\\text{ m}$.
  - Ghế C cách trạm phát $65\\text{ m}$.
  Dựa vào định nghĩa vị trí tương đối của điểm và đường tròn, hãy cho biết người ngồi ở ghế nào có thể kết nối được Wi-Fi?

![Mô phỏng vùng phủ sóng Wi-Fi](/images/toan9/b13_thucte_vung_phu_song_wifi.svg?v=1)

- **Hướng dẫn giải:**
  1. Gọi trạm phát là tâm $O$, bán kính vùng phủ sóng là $R = 50\\text{ m}$. Vùng có mạng là **hình tròn** $(O; 50\\text{m})$ bao gồm đường tròn và phần bên trong.
  2. Khoảng cách $OA = 40\\text{ m} < R \\Rightarrow$ Điểm A nằm **trong** đường tròn $\\Rightarrow$ Ghế A kết nối được Wi-Fi cực mạnh.
  3. Khoảng cách $OB = 50\\text{ m} = R \\Rightarrow$ Điểm B nằm **trên** đường tròn $\\Rightarrow$ Ghế B ở ngay rìa, vẫn kết nối được Wi-Fi.
  4. Khoảng cách $OC = 65\\text{ m} > R \\Rightarrow$ Điểm C nằm **ngoài** đường tròn $\\Rightarrow$ Ghế C mất kết nối Wi-Fi.
- **Liên hệ thực tế:** Trong viễn thông, khái niệm "Hình tròn" được dùng để quy hoạch vùng phủ sóng vô tuyến (Coverage Area) cho các trạm BTS di động hoặc bộ định tuyến.

#### 🌍 Bài toán 2: Khôi phục mảnh gốm cổ đại (Khảo cổ học)
- **Đề bài:** Các nhà khảo cổ tìm được một mảnh vỡ của một chiếc đĩa gốm sứ có từ triều Nguyễn. Viền của mảnh gốm là một cung tròn hoàn hảo. Bằng kiến thức hình học về tính đối xứng, hãy hướng dẫn các nhà khảo cổ cách xác định chính xác tâm $O$ của chiếc đĩa gốc để có thể phục dựng lại toàn bộ kích thước của nó.

![Phương pháp tìm tâm đĩa cổ bằng hai đường trung trực](/images/toan9/b13_thucte_phuc_dung_gom_co.svg?v=1)

- **Hướng dẫn giải (Thao tác thực tế):**
  1. **Bước 1:** Chọn tùy ý 3 điểm phân biệt $A, B, C$ nằm trên viền cong của mảnh gốm.
  2. **Bước 2:** Dùng thước thẳng kẻ hai đoạn thẳng $AB$ và $BC$ (đây là hai dây cung của đường tròn).
  3. **Bước 3:** Đường tròn có tính **đối xứng trục** qua bất kỳ đường thẳng nào đi qua tâm. Do đó, đường trung trực của đoạn $AB$ chính là một trục đối xứng và bắt buộc phải đi qua tâm $O$. Tương tự, đường trung trực của $BC$ cũng đi qua tâm $O$.
  4. **Bước 4:** Dùng compa và thước kẻ hai đường trung trực của $AB$ và $BC$. Giao điểm của hai đường trung trực này chính là tâm $O$ của chiếc đĩa. Khoảng cách $OA$ chính là bán kính đĩa.
- **Liên hệ thực tế:** Đây là một ứng dụng kinh điển của tính đối xứng đường tròn, được sử dụng rộng rãi trong khảo cổ học, cơ khí chính xác và đồ họa máy tính (thuật toán 3-point circle).

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Đồng nhất "Đường tròn" và "Hình tròn":**
>   - **Đường tròn** (Circle) chỉ là *đường viền* (chu vi). **Hình tròn** (Disk) bao gồm cả đường viền và toàn bộ phần không gian *bên trong*. Điểm nằm TRONG đường tròn thì không thuộc đường tròn.
> - **Sai lầm 2: Nghĩ rằng đường tròn chỉ có 2 hoặc 4 trục đối xứng:**
>   - Đường tròn có **VÔ SỐ** trục đối xứng. Cứ vẽ một đường thẳng đi qua tâm là ta được một trục đối xứng.`
      },
      {
        title: "Bài 14: Cung và dây của một đường tròn",
        summary: commonSummaryPrefix + `### 1.1 — Kiến thức trọng tâm

#### 1. Dây và Đường kính của đường tròn
- **Dây (dây cung):** Đoạn thẳng nối hai điểm tuỳ ý trên một đường tròn gọi là một dây của đường tròn đó.
- **Đường kính:** Dây đi qua tâm được gọi là đường kính. Đường kính có độ dài bằng $2R$.
- **Định lý quan trọng:** Trong các dây của một đường tròn, **đường kính là dây lớn nhất**.
  Với mọi dây $AB$ của đường tròn $(O; R)$, ta luôn có:
  $$AB \\le 2R$$
  Dấu "$=$" xảy ra khi và chỉ khi $AB$ đi qua tâm $O$ (tức $AB$ là đường kính).

![Dây cung và Đường kính trong đường tròn](/images/toan9/b14_day_va_duong_kinh.svg?v=1)

#### 2. Góc ở tâm, Cung tròn và Số đo cung
- **Góc ở tâm:** Là góc có đỉnh trùng với tâm của đường tròn (ví dụ $\\widehat{AOB}$).
- **Cung tròn:** Hai điểm $A$ và $B$ trên đường tròn chia đường tròn thành hai phần, mỗi phần gọi là một cung tròn.
  - Khi $\\widehat{AOB} < 180^\\circ$: Cung nằm bên trong góc gọi là **cung nhỏ** (kí hiệu $\\overset{\\frown}{AB}$), cung nằm bên ngoài góc gọi là **cung lớn** (kí hiệu $\\overset{\\frown}{AmB}$).
  - Ta nói góc $\\widehat{AOB}$ **chắn** cung nhỏ $AB$.
- **Số đo cung (sđ):**
  - Số đo của **cung nhỏ** bằng số đo của **góc ở tâm** chắn cung đó:
    $$\\text{sđ}\\overset{\\frown}{AB} = \\widehat{AOB}$$
  - Số đo của **cung lớn** bằng $360^\\circ$ trừ đi số đo cung nhỏ:
    $$\\text{sđ}\\overset{\\frown}{AmB} = 360^\\circ - \\text{sđ}\\overset{\\frown}{AB}$$
  - Số đo của **nửa đường tròn** bằng $180^\\circ$. Cả đường tròn có số đo là $360^\\circ$.
- **Cộng số đo cung:** Nếu điểm $C$ nằm trên cung $AB$, ta có: $\\text{sđ}\\overset{\\frown}{AB} = \\text{sđ}\\overset{\\frown}{AC} + \\text{sđ}\\overset{\\frown}{CB}$.

![Góc ở tâm và Số đo cung](/images/toan9/b14_goc_o_tam_cung_tron.svg?v=1)

---

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: So sánh độ dài dây và đường kính
- **Phương pháp:** Áp dụng bất đẳng thức tam giác hoặc so sánh với đường kính $2R$.
- **Ví dụ 1:** Cho đường tròn $(O; R)$. Lấy hai điểm $A, B$ bất kỳ trên đường tròn. Bằng bất đẳng thức tam giác, hãy giải thích tại sao ta luôn có $AB \\le 2R$.

![So sánh dây bằng BĐT tam giác](/images/toan9/b14_so_sanh_day_bdt_tam_giac.svg?v=1)

- **Hướng dẫn giải:**
  1. Xét tam giác $AOB$. Khi $A, O, B$ không thẳng hàng, theo bất đẳng thức tam giác:
     $$AB < OA + OB$$
  2. Vì $A, B \\in (O; R)$ nên $OA = R, OB = R \\Rightarrow AB < R + R = 2R$.
  3. Khi $A, O, B$ thẳng hàng ($AB$ đi qua tâm $O$), đoạn $AB$ chính là đường kính: $AB = OA + OB = 2R$.
  4. **Kết luận:** Trong mọi trường hợp, ta luôn có $AB \\le 2R$.

#### Dạng 2: Tính số đo góc ở tâm và số đo cung
- **Ví dụ 2:** Cho tam giác $ABC$ vuông cân tại $A$ nội tiếp trong đường tròn $(O)$. Tính số đo cung nhỏ $AB$, cung nhỏ $AC$ và cung lớn $BC$.

![Tam giác vuông cân nội tiếp](/images/toan9/b14_tam_giac_vuong_can_cung.svg?v=1)

- **Hướng dẫn giải:**
  1. Vì $\\triangle ABC$ vuông tại $A$ nên tâm $O$ của đường tròn ngoại tiếp là trung điểm cạnh huyền $BC$.
  2. Do $\\triangle ABC$ vuông cân tại $A$ nên trung tuyến $AO$ cũng là đường cao $\\Rightarrow AO \\bot BC$.
  3. Tại tâm $O$: $\\widehat{AOB} = 90^\\circ$ và $\\widehat{AOC} = 90^\\circ$.
  4. Suy ra: $\\text{sđ}\\overset{\\frown}{AB} = 90^\\circ$ và $\\text{sđ}\\overset{\\frown}{AC} = 90^\\circ$.
  5. Cung $BC$ đi qua tâm là nửa đường tròn $\\Rightarrow \\text{sđ}\\overset{\\frown}{BC} = 180^\\circ$. Cung lớn $BC$ có số đo $360^\\circ - 180^\\circ = 180^\\circ$.

---

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Khẩu độ của cầu vòm đá
- **Đề bài:** Một cây cầu cổ bằng đá bắc qua một con kênh. Phần vòm cầu là một cung tròn. Kỹ sư đo được khoảng cách giữa hai chân vòm cầu (dây cung $AB$ nằm ngang tại mặt nước) là $12\\text{ m}$. Bán kính của đường tròn chứa vòm cầu này là $R = 10\\text{ m}$. Hỏi chiều cao của vòm cầu (khoảng cách lớn nhất từ mặt nước đến đỉnh vòm) là bao nhiêu?

![Mô phỏng cầu vòm đá](/images/toan9/b14_thucte_cau_vom_da.svg?v=1)

- **Hướng dẫn giải:**
  1. Mặt nước tạo thành dây cung $AB = 12\\text{ m}$ của đường tròn tâm $O$, bán kính $R = 10\\text{ m}$.
  2. Gọi $H$ là trung điểm của dây $AB \\Rightarrow HA = HB = \\frac{12}{2} = 6\\text{ m}$ và $OH \\bot AB$.
  3. Xét $\\triangle OHA$ vuông tại $H$, theo định lý Pythagore:
     $$OH = \\sqrt{OA^2 - HA^2} = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8\\text{ (m)}$$
  4. Chiều cao vòm cầu so với mặt nước là đoạn $HC$ (với $C$ là đỉnh vòm trên đường tròn, $OC = R = 10\\text{ m}$):
     $$h = HC = OC - OH = 10 - 8 = 2\\text{ (m)}$$
  5. **Kết luận:** Chiều cao lớn nhất của vòm cầu so với mặt nước là $2\\text{ m}$.
- **Liên hệ thực tế:** Trong kiến trúc vòm La Mã (Roman Arch), việc tính toán chính xác giữa khẩu độ (dây cung) và độ vồng (chiều cao) giúp phân tán đều lực nén của trọng lực xuống hai trụ mố cầu.

#### 🌍 Bài toán 2: Vùng quét của trạm Radar Không lưu
- **Đề bài:** Trạm radar của đài kiểm soát không lưu sân bay quay ăng-ten để quét vùng trời. Tại một thời điểm, radar phát hiện máy bay trên đường tròn quét bán kính $40\\text{ km}$. Góc ở tâm tạo bởi hướng Bắc ($0^\\circ$) và vị trí máy bay là $150^\\circ$. Tính số đo cung nhỏ quét được và nêu ý nghĩa hiển thị.

![Màn hình Radar không lưu](/images/toan9/b14_thucte_radar_khong_luu.svg?v=1)

- **Hướng dẫn giải:**
  1. Hướng quét bắt đầu từ hướng Bắc (tia $ON$) đến vị trí máy bay (tia $OM$), tạo góc ở tâm $\\widehat{NOM} = 150^\\circ$.
  2. Do góc ở tâm nhỏ hơn $180^\\circ$, cung quét được là một **cung nhỏ** $NM$.
  3. Theo định lý số đo cung:
     $$\\text{sđ}\\overset{\\frown}{NM} = \\widehat{NOM} = 150^\\circ$$
  4. **Kết luận:** Số đo cung quét là $150^\\circ$. Ý nghĩa: Radar đã quét được $\\frac{150}{360} = \\frac{5}{12}$ vùng trời xung quanh sân bay trước khi phát hiện tín hiệu máy bay.
- **Liên hệ thực tế:** Trên màn hình ATC (Air Traffic Control), khái niệm góc phương vị (Azimuth) hoàn toàn dựa trên góc ở tâm và số đo cung tròn để kiểm soát độ an toàn bay.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Nhầm lẫn giữa "Độ dài cung" và "Số đo cung":**
>   - **Số đo cung** (tính bằng *độ*) cho biết độ mở góc ở tâm chắn cung đó. **Độ dài cung** (tính bằng *cm, m*) là chiều dài thực tế nếu ta duỗi thẳng cung ấy ra.
> - **Sai lầm 2: Ký hiệu cung không phân biệt cung lớn / cung nhỏ:**
>   - Ký hiệu $\\overset{\\frown}{AB}$ mặc định là **cung nhỏ**. Khi muốn chỉ định cung lớn, bắt buộc phải viết $\\overset{\\frown}{AmB}$ hoặc ghi rõ chữ "cung lớn $AB$".`
      },
      {
        title: "Bài 15: Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên",
        summary: commonSummaryPrefix + `### 1.1 — Kiến thức trọng tâm

#### 1. Chu vi đường tròn và Độ dài cung tròn
- **Chu vi đường tròn:** Chu vi $C$ của đường tròn bán kính $R$ (đường kính $d = 2R$) được tính bằng:
  $$C = \\pi d = 2\\pi R$$
  (Trong đó $\\pi \\approx 3{,}1416$ là hằng số Pi).
- **Độ dài cung tròn:** Độ dài $l$ của một cung tròn có số đo $n^\\circ$ trên đường tròn bán kính $R$ tỉ lệ thuận với số đo cung đó:
  $$l = \\frac{n}{180} \\pi R$$
  *Mẹo nhớ:* Cả đường tròn ($360^\\circ$) có chu vi $2\\pi R$. Vậy cung $1^\\circ$ có độ dài $\\frac{2\\pi R}{360} = \\frac{\\pi R}{180}$. Nhân với $n^\\circ$ ta được độ dài cung $l$.

![Độ dài cung tròn](/images/toan9/b15_do_dai_cung_tron.svg?v=1)

#### 2. Hình quạt tròn và Hình vành khuyên
- **Hình quạt tròn:** Là phần hình tròn giới hạn bởi một cung tròn và hai bán kính đi qua hai mút của cung đó.
  Diện tích hình quạt tròn bán kính $R$, ứng với cung $n^\\circ$ là:
  $$S_q = \\frac{n}{360} \\pi R^2 = \\frac{l \\cdot R}{2}$$
  (Trong đó $l$ là độ dài cung của hình quạt đó).

![Hình quạt tròn](/images/toan9/b15_hinh_quat_tron.svg?v=1)

- **Hình vành khuyên (vành khăn):** Là phần mặt phẳng nằm giữa hai đường tròn đồng tâm có bán kính khác nhau.
  Diện tích hình vành khuyên tạo bởi hai đường tròn đồng tâm bán kính $R$ và $r$ ($R > r$) là:
  $$S_v = \\pi(R^2 - r^2)$$

![Hình vành khuyên](/images/toan9/b15_hinh_vanh_khuyen.svg?v=1)

---

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Tính độ dài cung và diện tích hình quạt tròn
- **Nhận dạng:** Đề bài cho bán kính $R$ và góc ở tâm $n^\\circ$. Áp dụng trực tiếp công thức.
- **Ví dụ 1:** Cho đường tròn tâm $O$ bán kính $R = 6\\text{ cm}$. Góc ở tâm $\\widehat{AOB} = 120^\\circ$. Tính độ dài cung nhỏ $AB$ và diện tích hình quạt tròn $OAB$ tạo bởi cung nhỏ đó.
- **Hướng dẫn giải:**
  1. **Tính độ dài cung nhỏ $AB$:**
     Áp dụng công thức $l = \\frac{n}{180}\\pi R$ với $n = 120, R = 6$:
     $$l = \\frac{120}{180} \\cdot \\pi \\cdot 6 = \\frac{2}{3} \\cdot 6\\pi = 4\\pi \\approx 12{,}57\\text{ (cm)}.$$
  2. **Tính diện tích hình quạt tròn $OAB$:**
     Áp dụng công thức $S_q = \\frac{n}{360}\\pi R^2$:
     $$S_q = \\frac{120}{360} \\cdot \\pi \\cdot 6^2 = \\frac{1}{3} \\cdot 36\\pi = 12\\pi \\approx 37{,}70\\text{ (cm}^2\\text{)}.$$
     *(Cách khác: $S_q = \\frac{l \\cdot R}{2} = \\frac{4\\pi \\cdot 6}{2} = 12\\pi\\text{ cm}^2$).*

#### Dạng 2: Tính diện tích hình vành khuyên
- **Nhận dạng:** Bài toán có 2 vòng tròn lồng nhau, yêu cầu tính diện tích phần khe giữa.
- **Ví dụ 2:** Một bia phi tiêu gồm nhiều vòng tròn đồng tâm. Khoảng cách từ tâm đến viền của vòng thứ 8 là $r = 10\\text{ cm}$, và khoảng cách từ tâm đến viền của vòng thứ 7 là $R = 15\\text{ cm}$. Tính diện tích dải băng màu (hình vành khuyên) nằm giữa vòng thứ 7 và vòng thứ 8.
- **Hướng dẫn giải:**
  1. Diện tích hình tròn lớn (viền vòng 7): $S_{\\text{lớn}} = \\pi R^2 = \\pi \\cdot 15^2 = 225\\pi\\text{ (cm}^2\\text{)}$.
  2. Diện tích hình tròn nhỏ (viền vòng 8): $S_{\\text{nhỏ}} = \\pi r^2 = \\pi \\cdot 10^2 = 100\\pi\\text{ (cm}^2\\text{)}$.
  3. Diện tích hình vành khuyên:
     $$S_v = S_{\\text{lớn}} - S_{\\text{nhỏ}} = 225\\pi - 100\\pi = 125\\pi \\approx 392{,}7\\text{ (cm}^2\\text{)}.$$

---

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Quãng đường chiếc xe lăn bánh
- **Đề bài:** Bánh xe đạp của bạn An có đường kính $d = 650\\text{ mm}$. Khi An đạp xe đi học, bánh xe quay được tròn $500$ vòng. Hỏi quãng đường từ nhà An đến trường dài khoảng bao nhiêu mét (làm tròn đến hàng đơn vị)?

![Mô phỏng bánh xe lăn trên mặt phẳng](/images/toan9/b15_thucte_banh_xe_lan.svg?v=1)

- **Hướng dẫn giải:**
  1. Đổi đơn vị: $d = 650\\text{ mm} = 0{,}65\\text{ m}$.
  2. Mỗi vòng quay của bánh xe lăn không trượt, xe tiến về phía trước một đoạn đúng bằng **chu vi bánh xe**.
  3. Chu vi bánh xe:
     $$C = \\pi \\cdot d = 0{,}65\\pi \\approx 0{,}65 \\cdot 3{,}1416 \\approx 2{,}042\\text{ (m)}.$$
  4. Quãng đường sau 500 vòng quay:
     $$S = 500 \\cdot C \\approx 500 \\cdot 2{,}042 \\approx 1021\\text{ (m)}.$$
  5. **Kết luận:** Quãng đường từ nhà An đến trường dài khoảng $1021\\text{ mét}$.
- **Liên hệ thực tế:** Trong vật lý động học, nếu lốp xe lăn không trượt thì vận tốc tịnh tiến $v = \\omega R$. Đồng hồ công-tơ-mét xe đạp đo tốc độ và cự ly chính bằng cách gắn nam châm đếm số vòng quay của bánh xe.

#### 🌍 Bài toán 2: Chia phần chiếc bánh Pizza
- **Đề bài:** Một tiệm bánh bán hai loại Pizza:
  - Loại 1: Đường kính $16\\text{ cm}$, cắt thành $6$ miếng đều nhau.
  - Loại 2: Đường kính $18\\text{ cm}$, cắt thành $8$ miếng đều nhau.
  Giả sử bạn chỉ được chọn ăn 1 miếng. Hãy tính diện tích bề mặt của 1 miếng bánh ở mỗi loại và cho biết chọn miếng bánh loại nào sẽ được phần lớn hơn?

![Chia phần chiếc bánh Pizza](/images/toan9/b15_thucte_banh_pizza.svg?v=1)

- **Hướng dẫn giải:**
  1. **Với Pizza loại 1:**
     - Đường kính $d_1 = 16\\text{ cm} \\Rightarrow R_1 = 8\\text{ cm}$.
     - Bánh cắt $6$ miếng đều nhau $\\Rightarrow$ Góc ở tâm mỗi miếng là $n_1 = \\frac{360^\\circ}{6} = 60^\\circ$.
     - Diện tích 1 miếng bánh:
       $$S_1 = \\frac{60}{360} \\cdot \\pi \\cdot 8^2 = \\frac{1}{6} \\cdot 64\\pi = \\frac{32\\pi}{3} \\approx 33{,}51\\text{ (cm}^2\\text{)}.$$
  2. **Với Pizza loại 2:**
     - Đường kính $d_2 = 18\\text{ cm} \\Rightarrow R_2 = 9\\text{ cm}$.
     - Bánh cắt $8$ miếng đều nhau $\\Rightarrow$ Góc ở tâm mỗi miếng là $n_2 = \\frac{360^\\circ}{8} = 45^\\circ$.
     - Diện tích 1 miếng bánh:
       $$S_2 = \\frac{45}{360} \\cdot \\pi \\cdot 9^2 = \\frac{1}{8} \\cdot 81\\pi = \\frac{81\\pi}{8} \\approx 31{,}81\\text{ (cm}^2\\text{)}.$$
  3. **Kết luận:** Vì $S_1 \\approx 33{,}51 > S_2 \\approx 31{,}81$, nên chọn miếng bánh Loại 1 (16cm chia 6) sẽ to hơn miếng của Pizza Loại 2 (18cm chia 8).

#### 🌍 Bài toán 3: Tính diện tích phần giấy của chiếc quạt
- **Đề bài:** Một chiếc quạt giấy khi xòe hết cỡ có dạng một phần của hình tròn (quạt góc $150^\\circ$). Biết bán kính từ tâm nan quạt đến viền ngoài là $R = 25\\text{ cm}$, bán kính từ tâm đến viền trong của phần dán giấy là $r = 10\\text{ cm}$. Tính diện tích phần giấy dán trên chiếc quạt (giả sử chỉ dán 1 mặt, làm tròn đến hàng đơn vị).

![Mô phỏng chiếc quạt giấy xòe 150 độ](/images/toan9/b15_thucte_chiec_quat_giay.svg?v=1)

- **Hướng dẫn giải:**
  1. Phần giấy dán có dạng một **hình quạt của vành khuyên** (ứng với góc $n^\\circ = 150^\\circ$).
  2. Diện tích phần giấy dán bằng diện tích hình quạt tròn lớn (bán kính $R$) trừ đi diện tích hình quạt tròn nhỏ (bán kính $r$ trần nan):
     $$S_{\\text{giấy}} = \\frac{150}{360}\\pi R^2 - \\frac{150}{360}\\pi r^2 = \\frac{150}{360}\\pi(R^2 - r^2)$$
     $$S_{\\text{giấy}} = \\frac{5}{12}\\pi(25^2 - 10^2) = \\frac{5}{12}\\pi(625 - 100) = \\frac{5}{12}\\pi \\cdot 525 = 218{,}75\\pi\\text{ (cm}^2\\text{)}.$$
  3. Thay $\\pi \\approx 3{,}1416 \\Rightarrow S_{\\text{giấy}} \\approx 218{,}75 \\cdot 3{,}1416 \\approx 687\\text{ (cm}^2\\text{)}$.
  4. **Kết luận:** Diện tích phần giấy dán trên 1 mặt quạt là khoảng $687\\text{ cm}^2$.
- **Liên hệ thực tế:** Công thức $S = \\frac{n}{360}\\pi(R^2 - r^2)$ được ứng dụng rộng rãi khi may váy xòe chữ A, cắt tấm tôn làm chóa đèn đường hình nón cụt, hoặc thiết kế mái che vòm quạt.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Lẫn lộn giữa Số đo cung ($n^\\circ$) và Độ dài cung ($l$):**
>   - Số đo cung đo bằng *độ* (độ mở góc ở tâm). Độ dài cung đo bằng *đơn vị chiều dài* (cm, m). Cùng số đo $60^\\circ$ nhưng trên đường tròn lớn hơn thì độ dài cung dài hơn!
> - **Sai lầm 2: Quên hằng số $\\pi$ hoặc nhầm công thức:**
>   - Độ dài cung là đại lượng 1 chiều (chứa $R$): $l = \\frac{n}{180}\\pi R$.
>   - Diện tích quạt là đại lượng 2 chiều (chứa $R^2$): $S_q = \\frac{n}{360}\\pi R^2$.
>   - Không được bỏ quên hằng số $\\pi$ trong quá trình biến đổi trước khi làm tròn số.`
      },
      {
        title: "Bài 16: Vị trí tương đối của đường thẳng và đường tròn",
        summary: commonSummaryPrefix + `### 1.1 — Kiến thức trọng tâm

Cho đường tròn $(O; R)$ và đường thẳng $a$. Gọi $H$ là hình chiếu vuông góc của $O$ trên $a$. Khoảng cách từ tâm $O$ đến đường thẳng $a$ là $d = OH$.

#### 1. Ba vị trí tương đối giữa đường thẳng và đường tròn
- **Đường thẳng cắt đường tròn (2 điểm chung):**
  - Điều kiện: Khoảng cách từ tâm đến đường thẳng nhỏ hơn bán kính:
    $$d < R$$
  - Khi đó đường thẳng $a$ được gọi là **cát tuyến** của đường tròn.
- **Đường thẳng tiếp xúc với đường tròn (1 điểm chung duy nhất):**
  - Điều kiện: Khoảng cách từ tâm đến đường thẳng bằng bán kính:
    $$d = R$$
  - Khi đó đường thẳng $a$ được gọi là **tiếp tuyến**, điểm chung duy nhất $H$ gọi là **tiếp điểm**.
- **Đường thẳng không giao với đường tròn (0 điểm chung):**
  - Điều kiện: Khoảng cách từ tâm đến đường thẳng lớn hơn bán kính:
    $$d > R$$

![Ba vị trí tương đối giữa đường thẳng và đường tròn](/images/toan9/b16_ba_vi_tri_tuong_doi.svg?v=1)

#### 2. Tính chất và Dấu hiệu nhận biết tiếp tuyến
- **Tính chất tiếp tuyến:**
  Nếu một đường thẳng là tiếp tuyến của một đường tròn thì nó **vuông góc với bán kính đi qua tiếp điểm**:
  $$a \\text{ là tiếp tuyến tại } H \\Longrightarrow a \\bot OH \\text{ tại } H \\in (O)$$
- **Dấu hiệu nhận biết tiếp tuyến:**
  Nếu một đường thẳng đi qua một điểm của đường tròn và vuông góc với bán kính đi qua điểm đó thì đường thẳng ấy là một tiếp tuyến của đường tròn:
  $$\\begin{cases} H \\in (O) \\\\ a \\bot OH \\text{ tại } H \\end{cases} \\Longrightarrow a \\text{ là tiếp tuyến của } (O) \\text{ tại } H$$

---

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Xác định vị trí tương đối dựa vào $d$ và $R$
- **Nhận dạng:** Bài toán cho bán kính $R$ và các yếu tố hình học để tính khoảng cách $d$ từ tâm đến đường thẳng. So sánh $d$ với $R$ để kết luận.
- **Ví dụ 1:** Cho đường tròn $(O; 5\\text{ cm})$ và điểm $A$ cách $O$ một khoảng là $13\\text{ cm}$. Kẻ đường thẳng $d$ đi qua $A$ sao cho $d \\bot OA$. Xác định vị trí tương đối của đường thẳng $d$ và đường tròn $(O)$.

![Ví dụ 1: So sánh khoảng cách d và bán kính R](/images/toan9/b16_vi_du_1_d_va_r.svg?v=1)

- **Hướng dẫn giải:**
  1. Vì $d \\bot OA$ tại $A$ nên khoảng cách từ tâm $O$ đến đường thẳng $d$ chính là độ dài đoạn $OA$: $d = OA = 13\\text{ cm}$.
  2. Bán kính của đường tròn là $R = 5\\text{ cm}$.
  3. Nhận thấy $d > R$ ($13\\text{ cm} > 5\\text{ cm}$).
  4. **Kết luận:** Đường thẳng $d$ và đường tròn $(O)$ **không giao nhau**.

#### Dạng 2: Chứng minh đường thẳng là tiếp tuyến
- **Nhận dạng:** Để chứng minh đường thẳng $a$ là tiếp tuyến của $(O)$, ta cần chỉ ra đủ 2 điều kiện:
  1. Tiếp điểm $H$ thuộc đường tròn: $OH = R$.
  2. Đường thẳng $a$ vuông góc với bán kính tại tiếp điểm: $a \\bot OH$ tại $H$.
- **Ví dụ 2:** Cho tam giác $ABC$ có $AB=3\\text{ cm}, AC=4\\text{ cm}, BC=5\\text{ cm}$. Kẻ đường cao $AH$. Chứng minh rằng đường thẳng $BC$ là tiếp tuyến của đường tròn tâm $A$, bán kính $AH$.

![Ví dụ 2: Chứng minh tiếp tuyến tam giác vuông](/images/toan9/b16_vi_du_2_tiep_tuyen_tam_giac_vuong.svg?v=1)

- **Hướng dẫn giải:**
  1. Ta có $AB^2 + AC^2 = 3^2 + 4^2 = 25 = 5^2 = BC^2$. Theo định lý Pythagore đảo, $\\triangle ABC$ vuông tại $A$.
  2. Đường tròn có tâm là $A$, bán kính $R = AH$. Khoảng cách từ tâm $A$ đến điểm $H$ đúng bằng bán kính $AH \\Rightarrow H \\in (A; AH)$.
  3. Vì $AH$ là đường cao của $\\triangle ABC$ nên $BC \\bot AH$ tại $H$.
  4. **Kết luận:** Đường thẳng $BC$ đi qua điểm $H$ của đường tròn $(A; AH)$ và vuông góc với bán kính $AH$ tại $H$. Vậy $BC$ là tiếp tuyến của đường tròn $(A; AH)$.

---

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Đường chân trời và Tầm nhìn của đài quan sát
- **Đề bài:** Một đài quan sát hải đăng được xây dựng trên một hòn đảo. Mắt của người quan sát ở vị trí $M$ cách mặt nước biển một độ cao $h = 50\\text{ m}$. Coi Trái Đất là một hình cầu có bán kính $R \\approx 6400\\text{ km}$. "Đường chân trời" mà mắt người nhìn thấy thực chất là điểm tiếp xúc $H$ của tiếp tuyến kẻ từ mắt nhìn xuống bề mặt Trái Đất. Tính khoảng cách từ mắt người quan sát đến đường chân trời (đoạn $MH$) (làm tròn đến km).

![Mô phỏng tầm nhìn đường chân trời](/images/toan9/b16_thucte_chan_troi_hai_dang.svg?v=1)

- **Hướng dẫn giải:**
  1. Tia nhìn $MH$ tiếp xúc với mặt cầu Trái Đất tại $H$, suy ra $MH \\bot OH$ tại $H$. Tam giác $OHM$ vuông tại $H$.
  2. Đổi đơn vị: $h = 50\\text{ m} = 0{,}05\\text{ km}$.
  3. Khoảng cách từ tâm Trái Đất đến mắt là cạnh huyền:
     $$OM = R + h = 6400 + 0{,}05 = 6400{,}05\\text{ (km)}$$
  4. Bán kính Trái Đất: $OH = R = 6400\\text{ km}$.
  5. Áp dụng định lý Pythagore trong $\\triangle OHM$ vuông tại $H$:
     $$MH = \\sqrt{OM^2 - OH^2} = \\sqrt{(6400{,}05)^2 - 6400^2} \\approx \\sqrt{640{,}0025} \\approx 25{,}3\\text{ (km)}$$
  6. **Kết luận:** Người quan sát ở độ cao $50\\text{ m}$ có thể nhìn thấy các vật thể trên mặt biển xa tối đa khoảng $25\\text{ km}$.
- **Liên hệ thực tế:** Định lý tiếp tuyến giải thích vì sao tàu thuyền khi đi xa bờ sẽ khuất dần từ phần thân dưới lên đỉnh cột buồm. Đây là minh chứng tự nhiên rõ ràng nhất cho việc Trái Đất có dạng hình cầu.

#### 🌍 Bài toán 2: Bánh xe lăn trên mặt đường
- **Đề bài:** Một chiếc lốp xe có dạng hình tròn bán kính $R = 30\\text{ cm}$ đang đặt trên mặt đường phẳng. Khoảng cách từ trục bánh xe (tâm $O$) xuống mặt đường là $30\\text{ cm}$. Xác định vị trí tương đối của mặt đường và bánh xe. Trọng lượng của xe truyền qua trục $O$ xuống mặt đường theo phương nào?

![Mô phỏng bánh xe tiếp xúc mặt đường](/images/toan9/b16_thucte_banh_xe_mat_duong.svg?v=1)

- **Hướng dẫn giải:**
  1. Mặt đường phẳng đóng vai trò là một đường thẳng $d$. Bánh xe là đường tròn $(O; R = 30\\text{ cm})$.
  2. Khoảng cách từ tâm $O$ đến mặt đường: $d = 30\\text{ cm} = R$.
  3. Vì khoảng cách từ tâm bằng đúng bán kính nên mặt đường **tiếp xúc** với bánh xe (mặt đường là **tiếp tuyến** của lốp xe).
  4. Theo tính chất tiếp tuyến, mặt đường vuông góc với bán kính $OH$ tại tiếp điểm $H$. Trọng lượng của xe có phương thẳng đứng (trùng với $OH$), do đó truyền toàn bộ lực nén trực tiếp và vuông góc xuống mặt đường tại điểm tiếp xúc $H$.
- **Liên hệ thực tế:** Trong cơ khí chính xác, sự tiếp xúc giữa bánh xe lửa và đường ray, hoặc giữa các bánh răng trong hộp số đều dựa trên tính chất tiếp tuyến để triệt tiêu lực cản trượt và tối ưu hóa hiệu suất truyền động.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm phổ biến: Bỏ quên điều kiện "điểm phải thuộc đường tròn":**
>   - Để chứng minh đường thẳng $a$ là tiếp tuyến của $(O)$, nếu chỉ chứng minh $OM \\bot a$ mà chưa chỉ ra $OM = R$ (tức điểm $M$ thuộc đường tròn) là chưa đủ. Vì nếu $OM < R$ thì $a$ vẫn là cát tuyến!
>   - Bắt buộc phải chứng minh đồng thời cả 2 điều kiện: **$M \\in (O)$** và **$a \\bot OM$ tại $M$**.`
      },
      {
        title: "Bài 17: Vị trí tương đối của hai đường tròn",
        summary: commonSummaryPrefix + `### 1.1 — Kiến thức trọng tâm

Xét hai đường tròn $(O; R)$ và $(O'; r)$ phân biệt với $R \\ge r$. Khoảng cách giữa hai tâm là đoạn nối tâm $d = OO'$.

#### 1. Các vị trí tương đối của hai đường tròn
Giữa hai đường tròn có 3 vị trí tương đối chính, phân thành 5 trường hợp cụ thể:
- **1. Hai đường tròn cắt nhau (2 điểm chung):**
  - Điều kiện: Hiệu hai bán kính nhỏ hơn khoảng cách tâm và nhỏ hơn tổng hai bán kính:
    $$R - r < d < R + r$$
  - Đoạn thẳng nối 2 giao điểm gọi là **dây chung**.
- **2. Hai đường tròn tiếp xúc nhau (1 điểm chung duy nhất — tiếp điểm):**
  - **Tiếp xúc ngoài:** Hai đường tròn nằm về hai phía của tiếp tuyến chung tại tiếp điểm:
    $$d = R + r$$
  - **Tiếp xúc trong:** Đường tròn nhỏ nằm bên trong đường tròn lớn:
    $$d = R - r > 0$$
- **3. Hai đường tròn không giao nhau (0 điểm chung):**
  - **Ở ngoài nhau:** Hai đường tròn nằm hoàn toàn tách rời nhau:
    $$d > R + r$$
  - **Đựng nhau:** Đường tròn nhỏ nằm lọt hoàn toàn trong đường tròn lớn:
    $$0 < d < R - r$$
  - **Đồng tâm (trường hợp đặc biệt):** Hai tâm trùng nhau:
    $$d = 0$$

![Tổng hợp các vị trí tương đối giữa hai đường tròn](/images/toan9/b17_tong_hop_vi_tri_hai_duong_tron.svg?v=1)

#### 2. Tính chất đường nối tâm
Đường thẳng nối tâm $OO'$ là **trục đối xứng** của hình gồm cả hai đường tròn:
- Nếu hai đường tròn **cắt nhau** tại $A$ và $B$, thì đường nối tâm $OO'$ là **đường trung trực** của dây chung $AB$:
  $$OO' \\bot AB \\text{ tại trung điểm } H \\text{ của } AB$$
- Nếu hai đường tròn **tiếp xúc nhau**, thì tiếp điểm $A$ nằm **trên đường nối tâm** $OO'$.

---

### 1.2 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Xác định vị trí tương đối của hai đường tròn
- **Nhận dạng:** Bài toán cho $R, r$ và khoảng cách tâm $d = OO'$. So sánh $d$ với $R+r$ và $R-r$ để kết luận.
- **Ví dụ 1:** Cho đoạn thẳng $OO' = 8\\text{ cm}$. Vẽ hai đường tròn $(O; 5\\text{ cm})$ và $(O'; 3\\text{ cm})$. Hai đường tròn có vị trí tương đối như thế nào? Nếu tăng bán kính $(O'; 4\\text{ cm})$ thì vị trí thay đổi ra sao?
- **Hướng dẫn giải:**
  1. **Trường hợp 1:** $R = 5, r = 3, d = 8$. Ta có $R + r = 5 + 3 = 8\\text{ cm} = d$.
     **Kết luận:** Hai đường tròn **tiếp xúc ngoài**.
  2. **Trường hợp 2:** $R = 5, r = 4, d = 8$. Ta có $R - r = 1\\text{ cm}$ và $R + r = 9\\text{ cm}$.
     Vì $1 < 8 < 9$ ($R - r < d < R + r$), nên hai đường tròn **cắt nhau** tại 2 điểm.

#### Dạng 2: Ứng dụng tính chất đường nối tâm tính dây chung hoặc khoảng cách tâm
- **Ví dụ 2:** Cho hai đường tròn $(O; 13\\text{ cm})$ và $(O'; 15\\text{ cm})$ cắt nhau tại $A$ và $B$. Dây chung $AB = 24\\text{ cm}$. Tính độ dài đoạn nối tâm $OO'$.

![Dây chung hai đường tròn cắt nhau](/images/toan9/b17_vi_du_2_day_chung_hai_duong_tron.svg?v=1)

- **Hướng dẫn giải:**
  1. Gọi $H$ là giao điểm của $AB$ và $OO'$. Theo tính chất đường nối tâm, $OO' \\bot AB$ tại trung điểm $H$ của $AB$.
  2. Suy ra $AH = \\frac{AB}{2} = \\frac{24}{2} = 12\\text{ cm}$.
  3. Xét $\\triangle OAH$ vuông tại $H$:
     $$OH = \\sqrt{OA^2 - AH^2} = \\sqrt{13^2 - 12^2} = \\sqrt{25} = 5\\text{ (cm)}$$
  4. Xét $\\triangle O'AH$ vuông tại $H$:
     $$O'H = \\sqrt{O'A^2 - AH^2} = \\sqrt{15^2 - 12^2} = \\sqrt{81} = 9\\text{ (cm)}$$
  5. Vì $O$ và $O'$ nằm về hai phía của dây chung $AB$, đoạn nối tâm:
     $$OO' = OH + O'H = 5 + 9 = 14\\text{ (cm)}$$

---

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Hệ thống bánh răng truyền động
- **Đề bài:** Bánh răng chủ động $A$ có bán kính $R_1 = 15\\text{ cm}$ truyền động cho bánh răng bị động $B$ có bán kính $R_2 = 10\\text{ cm}$. Để hai bánh răng ăn khớp vừa khít với nhau, vòng lăn của chúng phải tiếp xúc ngoài. Hỏi khoảng cách giữa hai tâm trục khoan trên vỏ máy là bao nhiêu?

![Bánh răng truyền động tiếp xúc ngoài](/images/toan9/b17_thucte_banh_rang_truyen_dong.svg?v=1)

- **Hướng dẫn giải:**
  1. Hai bánh răng ăn khớp tương ứng hai đường tròn $(A; 15\\text{ cm})$ và $(B; 10\\text{ cm})$ ở vị trí **tiếp xúc ngoài**.
  2. Điều kiện tiếp xúc ngoài: Khoảng cách tâm $d = AB$ đúng bằng tổng hai bán kính:
     $$d = R_1 + R_2 = 15 + 10 = 25\\text{ (cm)}$$
  3. **Kết luận:** Khoảng cách hai tâm trục khoan trên vỏ máy phải chính xác bằng $25\\text{ cm}$. Nếu xa hơn sẽ trượt răng, gần hơn sẽ kẹt máy.
- **Liên hệ thực tế:** Trong kỹ thuật cơ khí ô tô và robot, việc định vị khoảng cách tâm trục (Center Distance) là tham số quyết định tỷ số truyền và độ bền của hộp giảm tốc.

#### 🌍 Bài toán 2: Băng chuyền tự động STEM của Thầy Toàn
- **Đề bài:** Trong dự án STEM tại Trung tâm Khôi Nguyên, Thầy Toàn hướng dẫn học sinh lắp băng chuyền gồm dây curoa bao qua hai puli. Puli lớn có bán kính $R = 8\\text{ cm}$, puli nhỏ có bán kính $r = 3\\text{ cm}$. Khoảng cách giữa hai tâm puli là $d = 13\\text{ cm}$. Hỏi đoạn dây curoa tự do (phần dây thẳng tiếp xúc chung với 2 puli) dài bao nhiêu cm?

![Băng chuyền puli tiếp tuyến chung](/images/toan9/b17_thucte_bang_chuyen_puli.svg?v=1)

- **Hướng dẫn giải:**
  1. Đoạn dây curoa thẳng $AB$ chính là **tiếp tuyến chung ngoài** của hai puli tròn $(O_1)$ và $(O_2)$.
  2. Theo tính chất tiếp tuyến: $O_1A \\bot AB$ và $O_2B \\bot AB \\Rightarrow O_1A \\parallel O_2B$.
  3. Kẻ $O_2H \\bot O_1A$ tại $H$. Tứ giác $ABO_2H$ là hình chữ nhật $\\Rightarrow AB = O_2H$ và $AH = O_2B = r = 3\\text{ cm}$.
  4. Đoạn $O_1H = O_1A - AH = R - r = 8 - 3 = 5\\text{ cm}$.
  5. Xét tam giác vuông $O_1HO_2$ vuông tại $H$, theo định lý Pythagore:
     $$O_2H = \\sqrt{O_1O_2^2 - O_1H^2} = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\text{ (cm)}$$
  6. **Kết luận:** Chiều dài đoạn dây curoa tự do là $AB = 12\\text{ cm}$.
- **Liên hệ thực tế:** Công thức $l = \\sqrt{d^2 - (R-r)^2}$ là công thức tiêu chuẩn quốc tế trong ngành kỹ thuật băng tải và dây curoa truyền động công nghiệp.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Luôn mặc định $OO' = OH + O'H$:**
>   - Nếu hai tâm $O$ và $O'$ nằm cùng phía đối với dây chung $AB$, thì $OO' = |OH - O'H|$.
> - **Sai lầm 2: Nhầm lẫn "Đựng nhau" và "Đồng tâm":**
>   - Đồng tâm ($d=0$) là trường hợp đặc biệt của đựng nhau ($d < R-r$).`
      },
      {
        title: "Bài tập cuối chương V",
        summary: commonSummaryPrefix + `### 1.1 — Hệ thống hóa kiến thức trọng tâm Chương V

Chương V tập trung vào các tính chất hình học đối xứng và đo lường của đường tròn, gồm 4 mảng kiến thức cốt lõi:

#### 1. Cung và Dây cung
- **Đường kính và Dây:** Đường kính là dây lớn nhất của đường tròn ($d = 2R$, mọi dây cung $AB \\le 2R$).
- **Quan hệ vuông góc:** Trong một đường tròn, đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy. Ngược lại, đường kính đi qua trung điểm của một dây **không đi qua tâm** thì vuông góc với dây ấy.
- **Liên hệ cung và góc ở tâm:** Số đo của cung nhỏ bằng số đo của góc ở tâm chắn cung đó:
  $$sđ\\,\\wideparen{AB} = \\widehat{AOB}$$

#### 2. Vị trí tương đối của Đường thẳng và Đường tròn
Xét khoảng cách $d$ từ tâm $O$ đến đường thẳng $a$ và bán kính $R$:
- **Cắt nhau (2 điểm chung):** $d < R$. Đường thẳng gọi là cát tuyến.
- **Tiếp xúc nhau (1 điểm chung):** $d = R$. Đường thẳng gọi là **tiếp tuyến**, điểm chung là **tiếp điểm**.
  - **Tính chất tiếp tuyến:** Tiếp tuyến luôn vuông góc với bán kính đi qua tiếp điểm ($a \\bot OH$ tại $H \\in (O)$).
  - **Tính chất hai tiếp tuyến cắt nhau:** Nếu $AB, AC$ là hai tiếp tuyến của $(O)$ cắt nhau tại $A$ ($B, C$ là tiếp điểm) thì:
    $$AB = AC; \\quad \\widehat{OAB} = \\widehat{OAC}; \\quad \\widehat{AOB} = \\widehat{AOC}; \\quad OA \\text{ là trung trực của } BC$$
- **Không giao nhau (0 điểm chung):** $d > R$.

#### 3. Vị trí tương đối của Hai đường tròn
Xét hai đường tròn $(O; R)$ và $(O'; r)$ với $R \\ge r$, khoảng cách tâm $d = OO'$:
- **Cắt nhau (2 điểm chung):** $R - r < d < R + r$. Đường nối tâm $OO'$ là đường trung trực của dây chung.
- **Tiếp xúc nhau (1 điểm chung):**
  - Tiếp xúc ngoài: $d = R + r$.
  - Tiếp xúc trong: $d = R - r > 0$.
- **Không giao nhau (0 điểm chung):**
  - Ở ngoài nhau: $d > R + r$.
  - Đựng nhau: $d < R - r$ (khi $d = 0$ gọi là hai đường tròn đồng tâm).

#### 4. Chu vi và Diện tích hình tròn, hình quạt, hình vành khuyên
- **Chu vi đường tròn:** $C = 2\\pi R = \\pi d$
- **Độ dài cung tròn $n^\\circ$:** $l = \\dfrac{n}{180}\\pi R$
- **Diện tích hình tròn:** $S = \\pi R^2$
- **Diện tích hình quạt tròn bán kính $R$, cung $n^\\circ$:**
  $$S_q = \\dfrac{n}{360}\\pi R^2 = \\dfrac{l \\cdot R}{2}$$
- **Diện tích hình vành khuyên giới hạn bởi $(O; R)$ và $(O; r)$ ($R > r$):**
  $$S_v = \\pi(R^2 - r^2)$$

---

### 1.2 — Bài toán Luyện tập chung tiêu biểu

#### 📌 Bài toán: Tổng hợp Cát tuyến, Tiếp tuyến và Dây cung
- **Đề bài:** Cho đường tròn $(O; R)$. Điểm $A$ nằm ngoài đường tròn sao cho $OA = 2R$. Kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Kẻ dây cung $BC$ vuông góc với $OA$ tại $H$.
  1. Chứng minh $AC$ là tiếp tuyến của $(O)$.
  2. Tính số đo góc ở tâm $\\widehat{BOC}$ và diện tích hình quạt tròn $OBC$ theo $R$.

![Tổng hợp tiếp tuyến cát tuyến dây cung](/images/toan9/c5_tong_hop_tiep_tuyen_day_cung.svg?v=1)

- **Hướng dẫn giải:**
  1. **Chứng minh $AC$ là tiếp tuyến:**
     - Vì $OA \\bot BC$ tại $H$ (với $OA$ chứa đường kính), theo định lý đường kính vuông góc với dây, $H$ là trung điểm của dây $BC$.
     - Suy ra $OA$ là đường trung trực của đoạn $BC \\Rightarrow AB = AC$.
     - Xét $\\triangle OAB$ và $\\triangle OAC$ có: $OA$ chung, $OB = OC = R$, $AB = AC$.
     - Do đó $\\triangle OAB = \\triangle OAC$ (c.c.c) $\\Rightarrow \\widehat{OCA} = \\widehat{OBA} = 90^\\circ$ (vì $AB$ là tiếp tuyến).
     - Vì $AC \\bot OC$ tại điểm $C \\in (O)$, nên $AC$ là tiếp tuyến của đường tròn $(O)$.
  2. **Tính số đo góc và diện tích hình quạt:**
     - Trong $\\triangle OAB$ vuông tại $B$: $\\cos \\widehat{AOB} = \\dfrac{OB}{OA} = \\dfrac{R}{2R} = \\dfrac{1}{2} \\Rightarrow \\widehat{AOB} = 60^\\circ$.
     - Do tính chất đối xứng: $\\widehat{BOC} = 2 \\cdot \\widehat{AOB} = 120^\\circ$.
     - Diện tích hình quạt tròn $OBC$ chắn cung $120^\\circ$ là:
       $$S_q = \\dfrac{120}{360}\\pi R^2 = \\dfrac{\\pi R^2}{3}$$

---

### 1.3 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Thiết kế Bảng hiệu đèn LED Khôi Nguyên
- **Đề bài:** Thầy Toàn thiết kế bảng hiệu đèn LED hình tròn treo trước Trung tâm Toán Khôi Nguyên. Bảng hiệu gồm hình tròn trung tâm bán kính $r = 30\\text{ cm}$ in tên "Thầy Toàn", bao quanh bởi hình vành khuyên bề rộng $20\\text{ cm}$ để bố trí dàn đèn LED.
  1. Tính diện tích phần hình vành khuyên dùng để gắn đèn LED.
  2. Thợ thi công chia vành khuyên thành 4 mảnh quạt bằng nhau để lắp ráp. Tính diện tích mỗi mảnh cắt.

![Bảng hiệu đèn LED Khôi Nguyên](/images/toan9/c5_thucte_bang_hieu_led.svg?v=1)

- **Hướng dẫn giải:**
  1. Bán kính hình tròn trong là $r = 30\\text{ cm}$. Bề rộng vành khuyên là $20\\text{ cm} \\Rightarrow$ Bán kính ngoài là $R = 30 + 20 = 50\\text{ cm}$.
  2. Diện tích hình vành khuyên gắn LED là:
     $$S_v = \\pi(R^2 - r^2) = \\pi(50^2 - 30^2) = \\pi(2500 - 900) = 1600\\pi \\approx 5024\\text{ (cm}^2\\text{)}$$
  3. Diện tích mỗi mảnh quạt (1/4 vành khuyên góc $90^\\circ$) là:
     $$S_{\\text{mảnh}} = \\dfrac{1600\\pi}{4} = 400\\pi \\approx 1256\\text{ (cm}^2\\text{)}$$
- **Liên hệ thực tế:** Trong gia công CNC và quảng cáo, việc phân rã hình vành khuyên lớn thành 4 góc phần tư giúp tối ưu phôi nhôm/mica và dễ dàng bảo dưỡng đèn LED.

#### 🌍 Bài toán 2: Bánh xe cút kít vượt qua bậc thềm
- **Đề bài:** Một chiếc xe cút kít có bánh xe hình tròn bán kính $R = 25\\text{ cm}$ va vào một bậc thềm vuông góc với mặt đất cao $h = 10\\text{ cm}$. Gọi $A$ là tiếp điểm của lốp với mặt đất, $B$ là mép góc bậc thềm chạm lốp xe. Hỏi khoảng cách $AC$ từ chân bậc thềm đến điểm tiếp xúc $A$ là bao nhiêu cm?

![Bánh xe cút kít qua bậc thềm](/images/toan9/c5_thucte_banh_xe_bac_them.svg?v=1)

- **Hướng dẫn giải:**
  1. Tâm bánh xe là $O$, khoảng cách từ $O$ xuống đất là $OA = R = 25\\text{ cm}$. Do $B$ nằm trên lốp xe nên $OB = R = 25\\text{ cm}$.
  1. Tâm bánh xe là $O$, khoảng cách từ $O$ xuống đất là $OA = R = 25\text{ cm}$. Do $B$ nằm trên lốp xe nên $OB = R = 25\text{ cm}$.
  2. Kẻ $BH \bot OA$ tại $H$. Tứ giác $AHBC$ là hình chữ nhật (có 3 góc vuông tại $A, C, H$) $\Rightarrow AH = BC = h = 10\text{ cm}$ và $AC = HB$.
  3. Đoạn $OH = OA - AH = 25 - 10 = 15\text{ cm}$.
  4. Xét $\triangle OHB$ vuông tại $H$, áp dụng định lý Pythagore:
     $$HB = \sqrt{OB^2 - OH^2} = \sqrt{25^2 - 15^2} = \sqrt{625 - 225} = \sqrt{400} = 20\text{ (cm)}$$
  5. **Kết luận:** Khoảng cách từ chân bậc thềm đến điểm tiếp xúc bánh xe là $AC = HB = 20\text{ cm}$.
- **Liên hệ thực tế:** Đây là bài toán cơ sở trong thiết kế robot và phương tiện tự hành vượt chướng ngại vật: góc nghiêng lực tì tại $B$ quyết định mô-men xoắn cần thiết để đưa bánh xe leo lên bậc.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp khi Ôn tập Chương V:**
> - **Sai lầm 1: Nhầm lẫn điều kiện vuông góc của đường kính:**
>   - Sai: Mọi đường kính qua trung điểm của dây đều vuông góc với dây.
>   - Đúng: Định lý chỉ đúng với **dây không đi qua tâm**. Nếu dây là đường kính thì trung điểm trùng tâm, hai đường kính có thể cắt nhau ở góc bất kỳ!
> - **Sai lầm 2: Nhầm lẫn tâm đối xứng và trục đối xứng của hình vành khuyên:**
>   - Sai: Hình vành khuyên có vô số tâm đối xứng.
>   - Đúng: Hình vành khuyên chỉ có **1 tâm đối xứng duy nhất** (tâm chung $O$), nhưng có **vô số trục đối xứng** (bất kỳ đường thẳng nào đi qua tâm $O$).`
      }
    ]
  },

  // ─── CHƯƠNG VI ────────────────────────────────────────────────────────────
  {
    title: "Chương VI: Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn",
    lessons: [
      {
        title: "Bài 18: Hàm số y = ax² (a ≠ 0)",
        summary: commonSummaryPrefix + `### 1.1 — Khái niệm & Tập xác định

Trong thực tế, có rất nhiều đại lượng vật lý, hình học biến thiên theo quy luật bình phương như:
- Quãng đường rơi tự do: $s = 4{,}9t^2$
- Diện tích hình tròn theo bán kính: $S = \\pi R^2$
- Diện tích hình vuông theo cạnh: $S = x^2$

#### 1. Định nghĩa
- Hàm số có dạng $y = ax^2$, trong đó $a$ là một hằng số khác $0$ ($a \\neq 0$), được gọi là **hàm số bậc hai khuyết** (hay hàm số $y = ax^2$).
- **Tập xác định:** Hàm số $y = ax^2$ luôn xác định với mọi giá trị $x \\in \\mathbb{R}$.

---

### 1.2 — Đồ thị của hàm số $y = ax^2$ (Đường Parabol)

Đồ thị của hàm số $y = ax^2 \\, (a \\neq 0)$ là một đường cong mượt mà, gọi là **đường parabol**.

![Đồ thị hàm số Parabol hai trường hợp](/images/toan9/b18_do_thi_parabol_hai_truong_hop.svg?v=1)

#### 1. Tính chất đặc trưng của Parabol $y = ax^2$:
- **Đỉnh của Parabol:** Luôn đi qua gốc tọa độ $O(0; 0)$. Điểm $O$ là đỉnh của parabol.
- **Trục đối xứng:** Nhận trục tung $Oy$ làm trục đối xứng.
  - Nếu điểm $M(x_0; y_0)$ thuộc parabol thì điểm $M'(-x_0; y_0)$ đối xứng qua $Oy$ cũng thuộc parabol.
- **Vị trí và bề lõm:**
  - Khi $\\mathbf{a > 0}$: Đồ thị nằm hoàn toàn **phía trên** trục hoành (trừ gốc $O$), bề lõm quay lên trên. Điểm $O(0; 0)$ là điểm **thấp nhất** của đồ thị (giá trị nhỏ nhất $y_{\\min} = 0$).
  - Khi $\\mathbf{a < 0}$: Đồ thị nằm hoàn toàn **phía dưới** trục hoành (trừ gốc $O$), bề lõm quay xuống dưới. Điểm $O(0; 0)$ là điểm **cao nhất** của đồ thị (giá trị lớn nhất $y_{\\max} = 0$).

---

### 1.3 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Lập bảng giá trị và vẽ đồ thị Parabol
- **Phương pháp thực hiện:**
  1. **Bước 1 (Lập bảng giá trị):** Chọn ít nhất 5 điểm (thường là 7 điểm đối xứng qua $x = 0$): $x \\in \\{-3; -2; -1; 0; 1; 2; 3\\}$.
  2. **Bước 2 (Xác định điểm):** Biểu diễn các cặp điểm $(x; y)$ lên mặt phẳng tọa độ $Oxy$.
  3. **Bước 3 (Vẽ đường cong):** Nối các điểm bằng đường cong trơn mượt đối xứng qua $Oy$, tại đỉnh $O$ lượn cong mềm mại (không vẽ nhọn thành chữ V).

- **Ví dụ 1:** Vẽ đồ thị hàm số $y = \\dfrac{1}{2}x^2$.

![Ví dụ 1 vẽ đồ thị hàm số](/images/toan9/b18_vi_du_1_ve_parabol.svg?v=1)

- **Hướng dẫn giải:**
  - Bảng giá trị:
    $$\\begin{array}{|c|c|c|c|c|c|c|c|}
    \\hline
    x & -3 & -2 & -1 & 0 & 1 & 2 & 3 \\\\ \\hline
    y = \\frac{1}{2}x^2 & 4{,}5 & 2 & 0{,}5 & 0 & 0{,}5 & 2 & 4{,}5 \\\\ \\hline
    \\end{array}$$
  - Đồ thị là một parabol có đỉnh $O(0; 0)$, đi qua các điểm $(-2; 2), (-1; 0{,}5), (1; 0{,}5), (2; 2)$, nằm phía trên trục hoành và nhận trục $Oy$ làm trục đối xứng.

#### Dạng 2: Tìm tọa độ điểm thuộc đồ thị Parabol
- **Ví dụ 2:** Cho hàm số $y = -2x^2$. Tìm các điểm thuộc đồ thị có tung độ bằng $-8$.
- **Hướng dẫn giải:**
  1. Thay $y = -8$ vào phương trình hàm số:
     $$-2x^2 = -8 \\Leftrightarrow x^2 = 4 \\Leftrightarrow x = 2 \\text{ hoặc } x = -2$$
  2. **Kết luận:** Có hai điểm thuộc parabol thỏa mãn là $M(2; -8)$ và $M'(-2; -8)$.

---

### 1.4 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán 1: Xe tải chui qua cổng vòm Parabol
- **Đề bài:** Một cổng vòm parabol có chân cổng trên mặt đất rộng $AB = 6\\text{ m}$, chiều cao từ đỉnh cổng xuống đất là $OH = 4{,}5\\text{ m}$. Một chiếc xe tải thùng hộp chữ nhật có chiều rộng $2\\text{ m}$ và chiều cao $3\\text{ m}$ muốn đi qua cổng này (chạy giữa cổng). Hỏi xe tải có thể đi qua an toàn không?

![Cổng vòm Parabol và xe tải](/images/toan9/b18_thucte_cong_vom_parabol.svg?v=1)

- **Hướng dẫn giải:**
  1. Chọn hệ trục $Oxy$ có gốc $O$ tại đỉnh cổng, trục $Oy$ hướng thẳng đứng xuống đất. Phương trình vòm có dạng $y = ax^2$.
  2. Chân cổng $B$ có tọa độ $(3; -4{,}5)$. Thay vào phương trình:
     $$-4{,}5 = a \\cdot 3^2 \\Rightarrow 9a = -4{,}5 \\Rightarrow a = -0{,}5 \\Rightarrow y = -0{,}5x^2$$
  3. Xe tải rộng $2\\text{ m}$ chạy chính giữa nên mép ngoài thùng xe nằm tại vị trí $x = 1\\text{ m}$.
  4. Tại $x = 1\\text{ m}$, khoảng hạ từ đỉnh vòm là:
     $$y = -0{,}5 \\cdot (1)^2 = -0{,}5\\text{ (m)}$$
  5. Chiều cao thông thủy tại mép xe là:
     $$h = 4{,}5 - 0{,}5 = 4\\text{ (m)}$$
  6. **Kết luận:** Vì $h = 4\\text{ m} > 3\\text{ m}$ (chiều cao xe tải), nên xe tải **hoàn toàn có thể đi qua cổng một cách an toàn**.

#### 🌍 Bài toán 2: Tính độ võng cáp treo của Cầu dây võng
- **Đề bài:** Cầu treo dây võng có khoảng cách giữa hai trụ tháp là $400\\text{ m}$, hai trụ tháp cao $75\\text{ m}$ so với mặt sàn cầu. Cáp treo chính có hình parabol chạm mặt cầu tại tâm $O$. Tìm chiều cao dây cáp tại vị trí cách tâm cầu $100\\text{ m}$.

![Độ võng cáp treo cầu parabol](/images/toan9/b18_thucte_cau_day_vong.svg?v=1)

- **Hướng dẫn giải:**
  1. Gốc tọa độ $O$ đặt tại điểm chính giữa mặt sàn cầu. Phương trình dây cáp: $y = ax^2$.
  2. Tọa độ đỉnh trụ tháp là $(200; 75)$. Thay vào ta được:
     $$75 = a \\cdot 200^2 \\Rightarrow a = \\dfrac{75}{40000} = \\dfrac{3}{1600} \\Rightarrow y = \\dfrac{3}{1600}x^2$$
  3. Tại vị trí cách tâm cầu $100\\text{ m}$ ($x = 100$):
     $$y = \\dfrac{3}{1600} \\cdot 100^2 = \\dfrac{30000}{1600} = 18{,}75\\text{ (m)}$$
  4. **Kết luận:** Tại vị trí cách tâm $100\\text{ m}$, dây cáp có chiều cao $18{,}75\\text{ m}$ so với mặt cầu.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Vẽ đỉnh Parabol bị nhọn thành hình chữ V:**
>   - Sai: Dùng thước kẻ nối thẳng các điểm quanh đỉnh $O$.
>   - Đúng: Đáy parabol quanh $O(0; 0)$ phải là một đường lượn tròn cong mềm mại.
> - **Sai lầm 2: Nhầm lẫn dấu khi bình phương số âm:**
>   - Sai: Thay $x = -2$ vào $y = 3x^2$ tính ra $3 \\cdot (-4) = -12$.
>   - Đúng: $(-2)^2 = 4 \\Rightarrow y = 3 \\cdot 4 = 12$.`
      },
      {
        title: "Bài 19: Phương trình bậc hai một ẩn",
        summary: commonSummaryPrefix + `### 1.1 — Định nghĩa & Dạng tổng quát

Phương trình bậc hai một ẩn có dạng: $$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$
trong đó $a \\neq 0$; $a$: hệ số bậc hai; $b$: hệ số bậc nhất; $c$: hạng tử tự do.

---

### 1.2 — Công thức nghiệm tổng quát và thu gọn

![Sơ đồ biện luận số nghiệm theo Δ](/images/toan9/b19_so_do_bien_luan_nghiem.svg?v=1)

#### Công thức nghiệm tổng quát (Δ = b² − 4ac):
- **Δ > 0:** 2 nghiệm phân biệt: $x_1 = \\dfrac{-b+\\sqrt{\\Delta}}{2a};\\; x_2 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$
- **Δ = 0:** Nghiệm kép: $x_1=x_2=-\\dfrac{b}{2a}$
- **Δ < 0:** Vô nghiệm trên $\\mathbb{R}$

#### Công thức nghiệm thu gọn (khi b = 2b’, Δ’ = b’² − ac):
- Δ’ > 0: $x_{1,2}=\\dfrac{-b’\\pm\\sqrt{\\Delta’}}{a}$; Δ’=0: nghiệm kép $x=-\\dfrac{b’}{a}$; Δ’<0: vô nghiệm

**Đặc biệt:** $a \\cdot c < 0 \\Rightarrow \\Delta > 0 \\Rightarrow$ PT luôn có **2 nghiệm phân biệt trái dấu**.

---

### 1.3 — Phân loại dạng bài & Ví dụ mẫu

#### Dạng 1: Giải phương trình bậc hai dạng khuết
- **Khuết b (b=0):** $ax^2+c=0 \\Leftrightarrow x^2=-\\dfrac{c}{a}$; khi $-c/a\\geq 0$: $x=\\pm\\sqrt{-c/a}$
- **Khuết c (c=0):** $ax^2+bx=0 \\Leftrightarrow x(ax+b)=0$

**Ví dụ 1:** (a) $3x^2-12=0 \\Rightarrow S=\\{-2;2\\}$; (b) $2x^2+5x=0 \\Rightarrow S=\\{-5/2;0\\}$; (c) $(2x-3)^2=7 \\Rightarrow x=(3\\pm\\sqrt{7})/2$

#### Dạng 2: Giải phương trình đầy đủ bằng công thức nghiệm

![Hình học bù bình phương — Al-Khwarizmi](/images/toan9/b19_bu_binh_phuong.svg?v=1)

**Ví dụ 2:** Giải $x^2-6x+5=0$. $b’=-3 \\Rightarrow \\Delta’=4 \\Rightarrow x_1=5, x_2=1$. $S=\\{1;5\\}$.

#### Dạng 3: Biện luận số nghiệm theo tham số m
**Ví dụ 3:** PT $x^2-2(m-1)x+m^2-3=0$. $\\Delta’=4-2m$.
- $m<2$: 2 nghiệm phân biệt; $m=2$: nghiệm kép $x=1$; $m>2$: vô nghiệm.

---

### 1.4 — Bài toán thực tế mở rộng (STEM)

#### 🌍 Bài toán 1: Quy hoạch bể bơi trường học và lối đi an toàn
Khu đất $28\\text{ m}\\times 16\\text{ m}$. Lối đi rộng $x$ (m). Diện tích bể bơi $288\\text{ m}^2$.

![Bể bơi trường học](/images/toan9/b19_be_boi_truong_hoc.svg?v=1)

$(28-2x)(16-2x)=288 \\Rightarrow x^2-22x+40=0 \\Rightarrow x=2\\text{ m}$ (nhận); $x=20$ (loại). **Lối đi rộng 2 m.**

#### 🌍 Bài toán 2: Quỹ đạo bóng rổ — Tầm bay xa
$y=-0{,}098x^2+x+1{,}5$. Bóng ném từ độ cao $1{,}5\\text{ m}$, chạm đất tại $x\\approx 11{,}53\\text{ m}$.

![Quỹ đạo bóng rổ parabol](/images/toan9/b19_quy_dao_bong_ro.svg?v=1)

$0{,}098x^2-x-1{,}5=0$, $\\Delta=1{,}588 \\Rightarrow x\\approx 11{,}53\\text{ m}$.

#### 🌍 Bài toán 3: Hộp quà từ tấm tôn hình vuông
Cắt 4 góc $8\\text{ cm}$, thể tích hộp $200\\text{ cm}^3$.

![Khai triển tấm tôn thành hộp](/images/toan9/b19_hop_qua_tam_ton.svg?v=1)

$8(a-16)^2=200 \\Rightarrow (a-16)^2=25 \\Rightarrow a=21\\text{ cm}$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Quên điều kiện $a \\neq 0$:** Khi PT chứa tham số ở bậc hai như $mx^2+bx+c=0$, với $m=0$ là PT bậc nhất.
> - **Sai dấu khi tính $-b$:** Nếu $b=-5$ thì $-b=+5$, hay nhầm thành $-5$.
> - **Nhầm $\\Delta$ và $\\Delta’$:** Tính $\\Delta’$ lại trừ $4ac$; tìm nghiệm theo $\\Delta’$ lại chia mẫu $2a$ thay vì $a$.
> - **Không nhận ra vô nghiệm:** Khi máy tính hiện $x=a+bi$, ký tự $i$ là đơn vị ảo — PT này vô nghiệm thực.`
            },
      {
        title: "Bài 20: Định lí Viète và ứng dụng",
        summary: commonSummaryPrefix + `### 1.1 — Định lí Viète

Nếu phương trình bậc hai $ax^2+bx+c=0$ ($a\\neq 0$) có hai nghiệm $x_1, x_2$ thì:
$$\\begin{cases} S = x_1 + x_2 = -\\dfrac{b}{a} \\\\ P = x_1 \\cdot x_2 = \\dfrac{c}{a} \\end{cases}$$

**Điều kiện áp dụng:** Phương trình phải có nghiệm ($\\Delta \\ge 0$). Phương trình vô nghiệm — không tồn tại $x_1, x_2$ — định lí Viète không có ý nghĩa.

![Sơ đồ tư duy Định lí Viète](/images/toan9/b20_viete_so_do.svg?v=1)

---

### 1.2 — Ứng dụng nhẩm nghiệm

![Kỹ thuật nhẩm nghiệm nhanh](/images/toan9/b20_nham_nghiem.svg?v=1)

- **Trường hợp 1:** Nếu $a+b+c=0$ ⇒ nghiệm $x_1=1$; $x_2=\\dfrac{c}{a}$.
- **Trường hợp 2:** Nếu $a-b+c=0$ ⇒ nghiệm $x_1=-1$; $x_2=-\\dfrac{c}{a}$.

---

### 1.3 — Tìm hai số biết tổng và tích (Viète đảo)

Nếu hai số có tổng $S$ và tích $P$, chúng là hai nghiệm của:
$$X^2 - SX + P = 0 \\quad (\\text{Điều kiện: } \\Delta = S^2-4P \\ge 0)$$

---

### 1.4 — Tính biểu thức đối xứng của hai nghiệm

![Bảng công thức biểu thức đối xứng](/images/toan9/b20_bieu_thuc_doi_xung.svg?v=1)

- $x_1^2+x_2^2 = S^2-2P$
- $(x_1-x_2)^2 = S^2-4P$
- $\\dfrac{1}{x_1}+\\dfrac{1}{x_2} = \\dfrac{S}{P}$ (khi $P\\neq 0$)
- $x_1^3+x_2^3 = S^3-3PS$

**Ví dụ:** PT $x^2-5x+3=0$: $S=5, P=3$. $A=x_1^2+x_2^2=25-6=19$; $B=\\tfrac{1}{x_1}+\\tfrac{1}{x_2}=\\tfrac{5}{3}$.

---

### 1.5 — Bài toán thực tế mở rộng (STEM)

#### 🌍 Bài toán 1: Thiết kế vườn rào hàng rào thép
Bác Hùng có $40\\text{ m}$ lưới, muốn rào khu vườn HCN có diện tích $96\\text{ m}^2$.

![Vườn rào hàng rào](/images/toan9/b20_vuon_hang_rao.svg?v=1)

Nửa chu vi $S=20$, $P=96$. PT $X^2-20X+96=0$, $\\Delta’=4 \\Rightarrow X=10\\pm 2$. Chiều dài $12\\text{ m}$, chiều rộng $8\\text{ m}$.

#### 🌍 Bài toán 2: Mạch điện song song và nối tiếp
Hai điện trở: nối tiếp $R_{nt}=12\\,\\Omega$; song song $R_{ss}=2{,}75\\,\\Omega$.

![Sơ đồ mạch điện](/images/toan9/b20_mach_dien.svg?v=1)

$S=12$, $P=12\\times 2{,}75=33$. PT $X^2-12X+33=0$, $\\Delta’=3 \\Rightarrow R_{1,2}=6\\pm\\sqrt{3}\\,\\Omega$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Áp dụng Viète khi phương trình vô nghiệm:** Sai lầm ngược chiều phổ biến nhất — hãy luôn tính $\\Delta$ trước!
> - **Viết sai phương trình Viète đảo:** $X^2 + SX + P$ (dấu +) thay vì $X^2 - SX + P$ (dấu −).
> - **Quên điều kiện $\\Delta = S^2 - 4P \\ge 0$** khi tìm hai số biết tổng và tích.
> - **Biến đổi biểu thức sai:** $x_1^2+x_2^2 = (x_1+x_2)^2$ (quên $-2P$).`
            },
      {
        title: "Bài 21: Giải bài toán bằng cách lập phương trình",
        summary: commonSummaryPrefix + `### 1.1 — Các bước giải bài toán bằng cách lập phương trình bậc hai

Phương pháp giải bài toán bằng cách lập phương trình đã được làm quen ở lớp 8 (với phương trình bậc nhất). Lên lớp 9, khi đã biết giải phương trình bậc hai, ta có thể giải quyết được nhiều lớp bài toán phức tạp hơn trong thực tiễn.

**Quy trình 3 bước giải toán:**
1. **Bước 1: Lập phương trình**
   - Chọn ẩn số và đặt điều kiện thích hợp cho ẩn (dựa vào ý nghĩa thực tế như độ dài $>0$, số nguyên dương...).
   - Biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết.
   - Lập phương trình biểu thị mối quan hệ giữa các đại lượng.
2. **Bước 2: Giải phương trình** (Sử dụng công thức nghiệm tổng quát hoặc thu gọn).
3. **Bước 3: Trả lời**
   - Kiểm tra xem các nghiệm của phương trình có thỏa mãn điều kiện của ẩn hay không.
   - Đối chiếu ngữ cảnh thực tế để loại nghiệm không phù hợp và kết luận.

---

### 1.2 — Các dạng bài & Ví dụ mẫu

#### Dạng 1: Bài toán liên quan đến diện tích hình học
**Nhận dạng:** Cho biết diện tích hình chữ nhật (hoặc tam giác) và mối quan hệ giữa các cạnh. Yêu cầu tìm chiều dài, chiều rộng.
**Ví dụ 1:** Một mảnh vườn hình chữ nhật có diện tích $280\\text{ m}^2$. Biết chiều rộng nhỏ hơn chiều dài $6\\text{ m}$. Tính chiều dài và chiều rộng của mảnh vườn đó.
**Hướng dẫn giải:**
1. Lập phương trình: Gọi chiều rộng là $x$ ($x>0$). Chiều dài là $x+6$. Diện tích $x(x+6) = 280 \\Leftrightarrow x^2+6x-280=0$.
2. Giải phương trình: $\\Delta' = 289 \\Rightarrow \\sqrt{\\Delta'} = 17 \\Rightarrow x=14$ (nhận) hoặc $x=-20$ (loại).
3. Kết luận: Chiều rộng $14\\text{ m}$, chiều dài $20\\text{ m}$.

#### Dạng 2: Bài toán chuyển động (Vận tốc — Quãng đường — Thời gian)
**Nhận dạng:** Bài toán có sự tham gia của hai phương tiện di chuyển với vận tốc chênh lệch nhau trên một quãng đường cố định.
**Ví dụ 2:** Khoảng cách hai bến A và B là $36\\text{ km}$. Tàu đi từ A đến B, nghỉ $0{,}5$ giờ rồi về A. Tổng thời gian là $5{,}5$ giờ. Vận tốc nước $3\\text{ km/h}$. Tính vận tốc thực.
**Hướng dẫn giải:**
1. Gọi vận tốc thực là $x$ ($x>3$). Vận tốc xuôi $x+3$, ngược $x-3$.
2. Phương trình: $\\frac{36}{x+3} + \\frac{36}{x-3} + 0{,}5 = 5{,}5 \\Leftrightarrow \\frac{36}{x+3} + \\frac{36}{x-3} = 5$.
3. Khử mẫu: $36(x-3) + 36(x+3) = 5(x^2-9) \\Leftrightarrow 5x^2 - 72x - 45 = 0$.
4. $\\Delta' = 1521 \\Rightarrow \\sqrt{\\Delta'} = 39 \\Rightarrow x=15$ (nhận) hoặc $x=-0{,}6$ (loại). Vận tốc thực $15\\text{ km/h}$.

---

### 1.3 — Sai lầm thường gặp

> [!NOTE]
> **⚠ Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Quên đặt điều kiện hoặc đặt điều kiện không chặt cho ẩn.**
>   *Tình huống:* Bài toán tìm số lượng học sinh hoặc số xe mà học sinh đặt $x$ là số thực thay vì số nguyên dương ($x \\in \\mathbb{N}^*$).
>   *Sửa lại:* Luôn phân tích ý nghĩa thực tế của đại lượng để đặt điều kiện chính xác: Chiều dài $>0$, mẫu số khác $0$, số lượng phải là số nguyên dương.
> - **Sai lầm 2: Nhận loại nghiệm âm một cách máy móc mà không kiểm tra tình huống ngược chiều/ngược dòng.**
>   *Tình huống:* Khi giải bài toán vận tốc có ẩn phụ, nghiệm âm bị loại ngay, nhưng đôi khi ẩn số đặt là độ thay đổi vận tốc thì có thể nhận giá trị âm.

---

### 1.4 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán thực tế 1: Tính lãi suất tiết kiệm ngân hàng (Lãi kép)
**Đề bài:** Bác An gửi tiết kiệm $100\\,000\\,000$ đồng theo lãi kép kỳ hạn 12 tháng. Sau 2 năm, tổng số tiền nhận được là $112\\,360\\,000$ đồng. Tính lãi suất năm (giả định lãi suất không đổi).
**Hướng dẫn giải:**
1. Gọi $r$ là lãi suất năm ($r > 0$).
2. Sau 2 năm, tổng tiền là: $100\\,000\\,000(1+r)^2 = 112\\,360\\,000$.
3. Giải phương trình: $(1+r)^2 = 1{,}1236 \\Rightarrow 1+r = 1{,}06 \\Rightarrow r = 0{,}06 = 6\\%$.
**Thực tế:** Công thức lãi kép $A = P(1+r)^n$ là nền tảng trong tài chính cá nhân và kinh doanh ngân hàng hiện đại.

#### 🌍 Bài toán thực tế 2: Bài toán năng suất công việc (Làm chung và làm riêng)
**Đề bài:** Hai người thợ cùng sơn một ngôi nhà hoàn thành trong $6$ giờ. Nếu làm riêng, người thứ nhất nhanh hơn người thứ hai $5$ giờ. Hỏi mỗi người làm một mình mất bao lâu?
**Hướng dẫn giải:**
1. Gọi thời gian người thứ nhất làm một mình là $x$ ($x>6$), người thứ hai là $x+5$.
2. Phương trình 1 giờ: $\\frac{1}{x} + \\frac{1}{x+5} = \\frac{1}{6}$.
3. Giải phương trình: $6(x+5) + 6x = x(x+5) \\Leftrightarrow x^2-7x-30 = 0$.
4. $\\Delta = 169 \\Rightarrow x=10$ (nhận) hoặc $x=-3$ (loại). Người thứ nhất 10 giờ, người thứ hai 15 giờ.
**Thực tế:** Phương pháp quy đổi công việc về "phần việc làm được trong 1 đơn vị thời gian" là chìa khóa vàng cho mọi bài toán năng suất.`
      },
      {
        title: "Ôn tập Chương VI & Luyện tập chung",
        summary: commonSummaryPrefix + `### 1.1 — Hệ thống hóa kiến thức trọng tâm

Chương VI bao gồm hai nội dung chủ đạo: Hàm số bậc hai khuyết $y = ax^2$ và Phương trình bậc hai một ẩn. Học sinh cần nắm chắc các điểm cốt lõi sau để giải quyết các bài toán ôn tập và luyện tập chung:

**Sơ đồ hệ thống kiến thức Chương VI:**
1. **Hàm số $y = ax^2 \\ (a \\neq 0)$:**
   - Đồ thị là đường Parabol đi qua gốc tọa độ $O(0;0)$, nhận trục $Oy$ làm trục đối xứng.
   - Nếu $a > 0$: Đồ thị nằm phía trên trục hoành ($O$ là điểm thấp nhất).
   - Nếu $a < 0$: Đồ thị nằm phía dưới trục hoành ($O$ là điểm cao nhất).
2. **Phương trình bậc hai một ẩn $ax^2 + bx + c = 0 \\ (a \\neq 0)$:**
   - Biệt thức $\\Delta = b^2 - 4ac$ (hoặc $\\Delta' = b'^2 - ac$ với $b = 2b'$).
   - Nếu $\\Delta > 0$: Phương trình có hai nghiệm phân biệt $x_{1, 2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$.
   - Nếu $\\Delta = 0$: Phương trình có nghiệm kép $x_1 = x_2 = -\\frac{b}{2a}$.
   - Nếu $\\Delta < 0$: Phương trình vô nghiệm.
3. **Định lý Viète và ứng dụng:**
   - Nếu phương trình có nghiệm thì $x_1 + x_2 = -\\frac{b}{a}$ và $x_1 x_2 = \\frac{c}{a}$.
   - Tìm hai số khi biết tổng $S$ và tích $P$: Hai số là nghiệm của phương trình $X^2 - SX + P = 0$ (điều kiện $S^2 - 4P \\ge 0$).

---

### 1.2 — Các dạng bài Luyện tập chung & Ôn tập

#### Dạng 1: Tương giao giữa Parabol và Đường thẳng
**Nhận dạng:** Cho đồ thị hàm số $y = ax^2$ và đường thẳng $y = mx + n$. Yêu cầu tìm tọa độ giao điểm hoặc tìm tham số để cắt tại điểm thỏa mãn điều kiện.
**Ví dụ 1:** Cho parabol $(P): y = \\frac{3}{2}x^2$ và đường thẳng $(d): y = x + 4$. Tìm tọa độ các giao điểm của $(P)$ và $(d)$ bằng phép tính.
**Hướng dẫn giải:**
- Phương trình hoành độ giao điểm: $\\frac{3}{2}x^2 = x + 4 \\Leftrightarrow 3x^2 - 2x - 8 = 0$.
- $\\Delta' = 25 \\Rightarrow \\sqrt{\\Delta'} = 5$.
- Phương trình có hai nghiệm: $x_1 = 2 \\Rightarrow y_1 = 6$; $x_2 = -\\frac{4}{3} \\Rightarrow y_2 = \\frac{8}{3}$.
- Giao điểm: $M(2; 6)$ và $N\\left(-\\frac{4}{3}; \\frac{8}{3}\\right)$.

#### Dạng 2: Vận dụng định lý Viète và Biểu thức đối xứng
**Nhận dạng:** Cho phương trình bậc hai có nghiệm, yêu cầu tính giá trị biểu thức chứa các nghiệm $x_1, x_2$ mà không cần giải phương trình.
**Ví dụ 2:** Cho phương trình bậc hai $x^2 - 7x + 5 = 0$. Không giải phương trình, hãy tính $A = x_1^2 + x_2^2$ và $B = x_1^3 + x_2^3$.
**Hướng dẫn giải:**
- $\\Delta = 29 > 0$. $x_1 + x_2 = 7, x_1 x_2 = 5$.
- $A = (x_1 + x_2)^2 - 2x_1 x_2 = 7^2 - 10 = 39$.
- $B = (x_1 + x_2)[(x_1 + x_2)^2 - 3x_1 x_2] = 7 \\cdot (49 - 15) = 238$.

---

### 1.3 — Sai lầm thường gặp

> [!NOTE]
> **⚠ Lưu ý — Sai lầm thường gặp:**
> - **Sai lầm 1: Quên kiểm tra điều kiện $\\Delta \\ge 0$ trước khi áp dụng định lý Viète.**
>   *Tình huống:* Phương trình vô nghiệm nhưng học sinh vẫn áp dụng $x_1 + x_2 = -\\frac{b}{a}$ để tính toán tiếp.
>   *Sửa lại:* Định lý Viète chỉ áp dụng khi phương trình có nghiệm ($\\Delta \\ge 0$). Phải luôn tính $\\Delta$ kiểm tra đầu tiên.
> - **Sai lầm 2: Biến đổi sai hằng đẳng thức tổng/tích các nghiệm bậc cao.**
>   *Tình huống:* Viết nhầm $x_1^2 + x_2^2 = (x_1 + x_2)^2 + 2x_1x_2$ (dấu cộng ở tích).
>   *Sửa lại:* Nhớ đúng hằng đẳng thức mở rộng: $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2$.

---

### 1.4 — Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán thực tế 1: Mô hình tăng trưởng sinh học trong hồ nước
**Đề bài:** Số lượng cá thể của một loài cá trong một hồ nước được mô hình hóa bởi $P(t) = 50(100 + 15t - t^2) \\ (0 \\le t \\le 15)$ với $t=0$ là ngày 01/01/2020. 
a) Khi nào cá đạt $7\\,500$ con? 
b) Khi nào cá trở lại mức ban đầu?
**Hướng dẫn giải:**
- a) $50(100 + 15t - t^2) = 7500 \\Leftrightarrow t^2 - 15t + 50 = 0$. Giải ra $t=5$ (năm 2025) và $t=10$ (năm 2030).
- b) Số lượng cá ban đầu ($t = 0$): $P(0) = 5000$. Giải $50(100 + 15t - t^2) = 5000 \\Leftrightarrow t^2 - 15t = 0 \\Leftrightarrow t=0$ hoặc $t=15$. (Năm 2035).
**Thực tế:** Các hàm số bậc hai với hệ số $a < 0$ thường dùng trong sinh học và kinh tế để mô hình hóa quy luật bùng phát rồi suy giảm (đồ thị hình chuông lệch).

#### 🌍 Bài toán thực tế 2: Bài toán doanh thu và định giá sản phẩm
**Đề bài:** Doanh thu (nghìn đồng) của một cửa hàng theo giá bán bát phở $x$ (nghìn đồng) là $R(x) = x(220 - 4x)$ với $30 \\le x \\le 50$. Hỏi cần bán giá bao nhiêu để doanh thu đạt $3$ triệu đồng?
**Hướng dẫn giải:**
- Đổi đơn vị: $3$ triệu đồng = $3\\,000$ nghìn đồng.
- Phương trình: $x(220 - 4x) = 3000 \\Leftrightarrow 4x^2 - 220x + 3000 = 0$.
- $\\Delta = 25 \\Rightarrow \\sqrt{\\Delta} = 5$. Nghiệm $x_1 = 30$ (nhận), $x_2 = 25$ (loại).
- Giá bán $30\\,000$ đồng/bát.`
      }
    ]
  },

  // ─── CHƯƠNG VII ───────────────────────────────────────────────────────────
  {
    title: "Chương VII: Tần số và tần số tương đối",
    lessons: [
      {
        title: "Bài 22: Bảng tần số và biểu đồ tần số",
        summary: commonSummaryPrefix + `### 1. Lý thuyết trọng tâm

**1. Tần số và Bảng tần số**
- **Mẫu dữ liệu:** Dãy dữ liệu thu được sau khi khảo sát.
- **Cỡ mẫu ($n$):** Tổng số các giá trị trong mẫu dữ liệu.
- **Giá trị ($x_i$):** Các số liệu/đối tượng khác nhau xuất hiện.
- **Tần số ($m_i$):** Số lần xuất hiện của giá trị $x_i$ trong mẫu.
- **Bảng tần số:** Bảng thống kê tóm tắt, cho biết mỗi giá trị $x_i$ xuất hiện với tần số $m_i$. Tổng các tần số luôn bằng cỡ mẫu: $m_1 + m_2 + \dots + m_k = n$.

**2. Biểu đồ tần số**
- **Biểu đồ cột:** Trục ngang biểu diễn các giá trị, trục dọc biểu diễn tần số. Chiều cao của mỗi cột tương ứng với tần số của giá trị đó.
- **Biểu đồ đoạn thẳng (Đa giác tần số):** Biểu diễn bằng các điểm có tọa độ $(x_i; m_i)$, sau đó nối các điểm liên tiếp lại với nhau bằng các đoạn thẳng.

---

### 2. Các dạng bài & Ví dụ mẫu

#### Dạng 1: Lập bảng tần số từ dữ liệu thô
**Ví dụ 1:** Điểm kiểm tra Toán của 20 học sinh: 6, 8, 7, 9, 6, 8, 10, 8, 7, 8, 9, 7, 8, 6, 9, 10, 8, 7, 8, 9. Lập bảng tần số.
**Hướng dẫn giải:**
- Xác định các giá trị khác nhau: 6, 7, 8, 9, 10.
- Đếm số lần xuất hiện (tần số): Điểm 6 (3 lần), điểm 7 (4 lần), điểm 8 (7 lần), điểm 9 (4 lần), điểm 10 (2 lần).
- Tổng tần số = $3+4+7+4+2 = 20$. Giá trị có tần số cao nhất là điểm 8.

#### Dạng 2: Vẽ và đọc biểu đồ tần số
- Tương ứng vẽ trục $Ox$ cho Điểm số, trục $Oy$ cho Tần số. Vẽ các cột hoặc chấm điểm tương ứng với chiều cao tần số.

---

### 3. Sai lầm thường gặp

> [!NOTE]
> **⚠ Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn giữa Giá trị ($x$) và Tần số ($m$):** Giá trị lớn nhất không phải là giá trị có tần số cao nhất.
> - **Đếm sót dữ liệu:** Dẫn đến tổng các tần số không bằng cỡ mẫu $n$.
> - **Vẽ sai trục trên biểu đồ:** Vẽ trục ngang là tần số, trục dọc là giá trị là sai (Quy ước: Trục ngang biểu diễn giá trị, dọc biểu diễn tần số).

---

### 4. Bài toán thực tế mở rộng (STEM & Thực tiễn)

#### 🌍 Bài toán thực tế 1: Phân tích cỡ áo đồng phục
**Tình huống:** Lớp 40 học sinh. Size S (8 HS), M (15 HS), XL (5 HS). Số liệu L bị mờ. Tính số áo size L.
**Hướng dẫn giải:** Tổng học sinh $n=40$. Tần số size L là $40 - (8+15+5) = 12$. Cần đặt may 12 áo size L. (Trong chuỗi cung ứng, bảng tần số giúp tối ưu hàng tồn kho).

#### 🌍 Bài toán thực tế 2: Giám sát chất lượng không khí (AQI)
**Tình huống:** AQI tháng 11 (30 ngày): Tốt (5 ngày), Khá (14 ngày), Trung bình (8 ngày), Kém (3 ngày).
**Nhận xét:** Mức độ Khá (B) cao nhất (14 ngày). Tốt và khá chiếm đa số (19 ngày). Biểu đồ đoạn thẳng thể hiện rõ ràng xu hướng theo cấp độ.`
      },
      {
        title: "Bài 23: Bảng tần số tương đối và biểu đồ tần số tương đối",
        summary: commonSummaryPrefix + `### 1. Lý thuyết trọng tâm

**1. Tần số tương đối (Relative Frequency)**
- Cho mẫu dữ liệu kích thước $n$. Giả sử giá trị $x_i$ xuất hiện với tần số $m_i$. Khi đó, **tần số tương đối** $f_i$ được tính bằng:
  $$f_i = \\frac{m_i}{n} \\cdot 100\\%$$
- **Bảng tần số tương đối:** Liệt kê các giá trị $x_i$ và tần số tương đối $f_i$ tương ứng.
- **Tính chất:** Tổng các tần số tương đối luôn bằng $100\\%$ (hoặc xấp xỉ): $f_1 + f_2 + \\dots + f_k = 100\\%$.

**2. Biểu đồ tần số tương đối**
- **Biểu đồ cột:** Trục ngang biểu diễn giá trị, trục đứng biểu diễn tần số tương đối (%).
- **Biểu đồ hình quạt tròn:** Số đo góc ở tâm của hình quạt tương ứng với $f_i$ là: $\\alpha_i = f_i \\cdot 360^\\circ = \\frac{m_i}{n} \\cdot 360^\\circ$.

---

### 2. Các dạng bài & Ví dụ mẫu

#### Dạng 1: Tính tần số tương đối và lập bảng
**Ví dụ:** Lớp có $40$ học sinh, $12$ Tốt, $18$ Khá, $8$ Đạt, còn lại Chưa đạt.
**Hướng dẫn giải:**
- $n = 40$. Số học sinh Chưa đạt: $m_4 = 40 - (12+18+8) = 2$.
- $f_{Tốt} = \\frac{12}{40} \\cdot 100\\% = 30\\%$.
- $f_{Khá} = \\frac{18}{40} \\cdot 100\\% = 45\\%$.
- $f_{Đạt} = \\frac{8}{40} \\cdot 100\\% = 20\\%$.
- $f_{Chưa đạt} = \\frac{2}{40} \\cdot 100\\% = 5\\%$.

#### Dạng 2: Vẽ biểu đồ hình quạt tròn
**Hướng dẫn giải:** Tính góc ở tâm:
- Tốt ($30\\%$): $\\alpha_1 = 30\\% \\cdot 360^\\circ = 108^\\circ$.
- Khá ($45\\%$): $\\alpha_2 = 45\\% \\cdot 360^\\circ = 162^\\circ$.
- Đạt ($20\\%$): $\\alpha_3 = 20\\% \\cdot 360^\\circ = 72^\\circ$.
- Chưa đạt ($5\\%$): $\\alpha_4 = 5\\% \\cdot 360^\\circ = 18^\\circ$.

---

### 3. Sai lầm thường gặp

> [!NOTE]
> **⚠ Lưu ý:**
> - **Quên kí hiệu %:** Tần số tương đối phải có đơn vị %.
> - **Làm tròn sai:** Nếu tổng là $99,99\\%$, cần ghi chú "Do làm tròn nên tổng xấp xỉ $100\\%$".
> - **Nhầm lẫn:** Trục tung của biểu đồ cột tần số tương đối phải ghi phần trăm, không phải số lượng đếm.

---

### 4. Bài toán thực tế mở rộng (STEM)

#### 🌍 Thực tế: Phân bổ ngân sách chi tiêu
**Tình huống:** Thu nhập $20$ triệu. Ăn uống $8$ tr, Học phí $5$ tr, Sinh hoạt $3$ tr, Tiết kiệm $4$ tr.
**Giải quyết:**
- Ăn uống: $f_1 = \\frac{8}{20}\\cdot 100\\% = 40\\% \\implies 144^\\circ$.
- Học phí: $f_2 = \\frac{5}{20}\\cdot 100\\% = 25\\% \\implies 90^\\circ$.
- Sinh hoạt: $f_3 = \\frac{3}{20}\\cdot 100\\% = 15\\% \\implies 54^\\circ$.
- Tiết kiệm: $f_4 = \\frac{4}{20}\\cdot 100\\% = 20\\% \\implies 72^\\circ$.`
      },
      {
        title: "Bài 24: Bảng tần số, tần số tương đối ghép nhóm và biểu đồ",
        summary: commonSummaryPrefix + `### Mẫu số liệu ghép nhóm
- Ghép các dữ liệu thành các nửa khoảng $[a; b)$ để thuận tiện xử lý dữ liệu lớn.
- Lập bảng tần số ghép nhóm và vẽ biểu đồ cột liền kề (histogram).`
      },
      {
        title: "Bài tập cuối chương VII",
        summary: commonSummaryPrefix + `### 1. Lý thuyết trọng tâm

**1. Tần số và tần số tương đối**
- **Tần số ($m_i$):** Là số lần xuất hiện của một giá trị $x_i$ trong mẫu dữ liệu. Tổng các tần số bằng cỡ mẫu $n$: $m_1 + m_2 + \\dots + m_k = n$.
- **Tần số tương đối ($f_i$):** Là tỉ số phần trăm giữa tần số của một giá trị và cỡ mẫu $n$:
  $$f_i = \\frac{m_i}{n} \\cdot 100\\%$$
  Tổng các tần số tương đối của tất cả các giá trị luôn bằng $100\\%$.

**2. Dữ liệu ghép nhóm**
- Khi dữ liệu liên tục hoặc có khoảng biến thiên lớn, ta chia dữ liệu thành các nhóm có dạng nửa khoảng $[a_i; a_{i+1})$ (nghĩa là lấy các giá trị $\\ge a_i$ và $< a_{i+1}$).
- **Giá trị đại diện** của nhóm ghép số liệu $[a_i; a_{i+1})$ được tính bằng trung bình cộng hai đầu mút:
  $$x_i = \\frac{a_i + a_{i+1}}{2}$$

**3. Các loại biểu đồ thống kê**
- **Biểu đồ cột (Bar chart):** Dùng cho dữ liệu rời rạc, các cột được vẽ cách rời nhau.
- **Tổ chức đồ (Histogram):** Dùng biểu diễn tần số / tần số tương đối cho dữ liệu ghép nhóm, các cột được vẽ **kề sát nhau** để thể hiện tính liên tục. Chiều cao cột thể hiện tần số hoặc tần số tương đối.
- **Biểu đồ đoạn thẳng (Đa giác tần số):** Nối các điểm có tọa độ $(x_i; m_i)$ hoặc $(x_i; f_i)$ bằng các đoạn thẳng, trong đó $x_i$ là giá trị hoặc giá trị đại diện.
- **Biểu đồ hình quạt tròn (Pie chart):** Biểu diễn tỉ lệ phần trăm, số đo góc ở tâm bằng $\\alpha = 360^\\circ \\cdot f_i$.

---

### 2. Sai lầm thường gặp

> [!NOTE]
> **⚠ Lưu ý — Sai lầm thường gặp:**
> - **Vẽ sai Histogram (Tổ chức đồ):** Biểu đồ cột thông thường các cột cách rời nhau; Histogram cho dữ liệu ghép nhóm các cột bắt buộc phải **nằm sát nhau**.
> - **Đếm sai dữ liệu ở mút của nhóm $[a; b)$:** Ký hiệu $[a; b)$ nghĩa là lấy giá trị $a$ nhưng **không lấy giá trị $b$**. (Ví dụ: giá trị 20 sẽ được xếp vào nhóm $[20; 30)$, không xếp vào $[10; 20)$).
> - **Nhầm lẫn tỉ lệ phần trăm (%) và số đo góc ($^\\circ$):** Góc ở tâm $= f_i \\times 360^\\circ$. Ví dụ: $25\\%$ ứng với góc $0,25 \\times 360^\\circ = 90^\\circ$, không phải $25^\\circ$.`
      }
    ]
  },

  // ─── CHƯƠNG VIII ──────────────────────────────────────────────────────────
  {
    title: "Chương VIII: Xác suất của biến cố trong một số mô hình xác suất đơn giản",
    lessons: [
      {
        title: "Bài 25: Phép thử ngẫu nhiên và không gian mẫu",
        summary: commonSummaryPrefix + `### 1. Lý thuyết trọng tâm

**1. Định nghĩa Phép thử ngẫu nhiên và Không gian mẫu**
- **Phép thử ngẫu nhiên (gọi tắt là phép thử):** Là một hoặc một số hành động, thực nghiệm được tiến hành liên tiếp hay đồng thời mà kết quả của chúng **không thể biết trước** khi thực hiện, nhưng có thể **liệt kê được tất cả các kết quả có thể xảy ra**.
- **Không gian mẫu:** Là tập hợp tất cả các kết quả có thể xảy ra của một phép thử ngẫu nhiên.
- **Kí hiệu:** Không gian mẫu thường được kí hiệu là $\\Omega$. Số lượng phần tử của không gian mẫu được kí hiệu là $n(\\Omega)$.

![Mô hình hóa phép thử ngẫu nhiên hai giai đoạn bằng sơ đồ trực quan](/images/toan9/b25_phep_thu_kep.svg?v=1)

**2. Phương pháp xác định và biểu diễn không gian mẫu**
- **Phương pháp lập bảng hai chiều (Table Method):** Sử dụng khi phép thử gồm hai hành động liên tiếp hoặc đồng thời (ví dụ: gieo 1 xúc xắc và 1 đồng xu; lấy lần lượt 2 viên bi).
- **Phương pháp sơ đồ hình cây (Tree Diagram):** Liệt kê nhánh rẽ cho từng bước thực nghiệm độc lập.

---

### 2. Các dạng bài & Ví dụ mẫu

#### Dạng 1: Xác định không gian mẫu bằng phương pháp lập bảng hai chiều
**Ví dụ 1:** Bạn Lan gieo một con xúc xắc 6 mặt và bạn Hoà gieo một đồng xu. Quan sát số chấm xuất hiện trên con xúc xắc và mặt xuất hiện của đồng xu.
- **Phép thử:** Gieo đồng thời một con xúc xắc 6 mặt và một đồng xu cân đối. Kết quả phép thử là cặp $(s; m)$, trong đó $s \\in \\{1; 2; 3; 4; 5; 6\\}$ là số chấm trên xúc xắc, $m \\in \\{S; N\\}$ là mặt của đồng xu ($S$: sấp, $N$: ngửa).
- **Bảng liệt kê kết quả hai chiều:**
  - Hàng $S$: $(1, S), (2, S), (3, S), (4, S), (5, S), (6, S)$
  - Hàng $N$: $(1, N), (2, N), (3, N), (4, N), (5, N), (6, N)$
- Không gian mẫu gồm 12 phần tử: $n(\\Omega) = 12$.

#### Dạng 2: Phép thử lấy lần lượt không hoàn lại
**Ví dụ 2:** Một hộp chứa 4 tấm thẻ được đánh số $1; 2; 3; 4$. Rút ngẫu nhiên lần lượt 2 tấm thẻ, thẻ rút lần đầu không trả lại vào hộp.
- Vì không hoàn lại nên cặp số rút ra $(a, b)$ có $a, b \\in \\{1; 2; 3; 4\\}$ và $a \\neq b$.
- Tập hợp không gian mẫu: $\\Omega = \\{(1, 2); (1, 3); (1, 4); (2, 1); (2, 3); (2, 4); (3, 1); (3, 2); (3, 4); (4, 1); (4, 2); (4, 3)\\}$.
- Số phần tử không gian mẫu: $n(\\Omega) = 4 \\times 3 = 12$ phần tử (loại bỏ các kết quả $(1, 1), (2, 2), (3, 3), (4, 4)$).

---

### 3. Sai lầm thường gặp

> [!NOTE]
> **⚠ Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn giữa lấy có hoàn lại và không hoàn lại:** Lấy không hoàn lại thì hai kết quả bắt buộc phải khác nhau ($a \\neq b$), không có dạng $(1, 1), (2, 2)$.
> - **Bỏ sót thứ tự khi bài toán phân biệt lần 1 và lần 2:** Cặp $(1, 2)$ khác hoàn toàn với $(2, 1)$ khi tiến hành theo thứ tự thời gian.

---

### 4. Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán thực tế 1: Rút thăm may mắn tri ân khách hàng
- Rút ngẫu nhiên lần lượt 2 lá phiếu từ 4 khách hàng An, Bình, Cúc, Dương ($A, B, C, D$) không hoàn lại để trao giải Nhất và giải Nhì.
- Không gian mẫu gồm $n(\\Omega) = 4 \\times 3 = 12$ kết quả có thứ tự. Số kết quả bạn An đạt giải là 6 kết quả.

![Mô hình phép thử bốc thăm phân định 2 giải thưởng từ 4 khách hàng](/images/toan9/b25_boc_tham_giai_thuong.svg?v=1)

#### 🌍 Bài toán thực tế 2: Quy luật di truyền học Mendel ở đậu Hà Lan
- Cây bố kiểu gene $(AA, Bb)$, cây mẹ kiểu gene $(Aa, Bb)$. Cây con nhận ngẫu nhiên một gene từ bố và một gene từ mẹ cho mỗi tính trạng màu sắc và hình dạng hạt.
- Không gian mẫu kiểu gene cây con có $n(\\Omega) = 2 \\times 4 = 8$ phần tử đồng khả năng.

#### 🌍 Bài toán thực tế 3: Hệ thống mật khẩu khóa số vali du lịch
- Vali dùng ổ khóa 2 vòng quay: vòng 1 gồm 3 chữ số lẻ $\\{1; 3; 5\\}$, vòng 2 gồm 4 chữ số chẵn $\\{2; 4; 6; 8\\}$.
- Mã khóa là cặp $(u, v)$, số phần tử không gian mẫu là $n(\\Omega) = 3 \\times 4 = 12$ phần tử.

![Mô phỏng ổ khóa vali số gồm hai vòng quay số độc lập](/images/toan9/b25_khoa_vali_so.svg?v=1)`
      },
      {
        title: "Bài 26: Xác suất của biến cố liên quan tới phép thử",
        summary: commonSummaryPrefix + `### 1. Lý thuyết trọng tâm

**1. Kết quả thuận lợi cho một biến cố**
- Cho phép thử $T$ có không gian mẫu $\\Omega$. Xét biến cố $E$ liên quan đến phép thử $T$.
- Một kết quả có thể của phép thử $T$ làm cho biến cố $E$ xảy ra được gọi là **kết quả thuận lợi** cho biến cố $E$.
- Tập hợp tất cả các kết quả thuận lợi cho $E$ là một tập con của không gian mẫu $\\Omega$, kí hiệu số lượng là $n(E)$.

**2. Công thức tính xác suất cổ điển (Đồng khả năng)**
- Giả sử các kết quả có thể của phép thử $T$ là **đồng khả năng**. Khi đó xác suất của biến cố $E$, kí hiệu là $P(E)$, bằng:
  $$P(E) = \\frac{n(E)}{n(\\Omega)}$$
  Trong đó:
  - $n(E)$ là số kết quả thuận lợi cho biến cố $E$.
  - $n(\\Omega)$ là số phần tử của không gian mẫu $\\Omega$ (tổng số kết quả có thể xảy ra).
- Luôn có $0 \\le P(E) \\le 1$.
  - Biến cố không thể: $P(E) = 0$.
  - Biến cố chắc chắn: $P(E) = 1$.
- Xác suất của biến cố đối: $P(\\overline{E}) = 1 - P(E)$.

![Mô phỏng phép thử quay đồng thời hai vòng quay số độc lập](/images/toan9/b26_vong_quay_so.svg?v=1)

**3. Quy trình 4 bước tính xác suất**
- **Bước 1:** Xác định phép thử, mô tả không gian mẫu $\\Omega$ và tính $n(\\Omega)$ (lập bảng 2 chiều hoặc sơ đồ cây).
- **Bước 2:** Khẳng định các kết quả có thể xảy ra là đồng khả năng.
- **Bước 3:** Liệt kê các kết quả thuận lợi cho biến cố $E$ và xác định số lượng $n(E)$.
- **Bước 4:** Lập tỉ số và tính $P(E) = \\frac{n(E)}{n(\\Omega)}$.

---

### 2. Các dạng bài & Ví dụ mẫu

#### Dạng 1: Tính xác suất bằng phương pháp lập bảng hai chiều
**Ví dụ 1:** An gieo một đồng xu cân đối, Bình gieo một con xúc xắc 6 mặt cân đối.
- **Không gian mẫu:** Bảng 2 chiều gồm $2 \\times 6 = 12$ kết quả đồng khả năng.
- **Biến cố $E$ ("Đồng xu sấp VÀ xúc xắc lớn hơn 4"):** Thuận lợi gồm $(S, 5), (S, 6) \\implies n(E) = 2 \\implies P(E) = \\frac{2}{12} = \\frac{1}{6}$.
- **Biến cố $F$ ("Đồng xu ngửa HOẶC xúc xắc là số nguyên tố"):** Mặt ngửa có 6 kết quả; mặt sấp đi kèm số nguyên tố $\\{2; 3; 5\\}$ có 3 kết quả $\\implies n(F) = 6 + 3 = 9 \\implies P(F) = \\frac{9}{12} = \\frac{3}{4}$.

#### Dạng 2: Phép thử lấy ngẫu nhiên không hoàn lại
**Ví dụ 2:** Hộp chứa 4 quả cầu ghi số $1; 2; 3; 4$. Rút lần lượt 2 quả cầu không hoàn lại ($a \\neq b$).
- Không gian mẫu có $n(\\Omega) = 4 \\times 3 = 12$ kết quả đồng khả năng.
- **Biến cố $A$ ("Tổng hai số bằng 5"):** Thuận lợi gồm $(1, 4), (2, 3), (3, 2), (4, 1) \\implies n(A) = 4 \\implies P(A) = \\frac{4}{12} = \\frac{1}{3}$.
- **Biến cố $B$ ("Số rút lần 1 lớn hơn số rút lần 2"):** Thuận lợi gồm 6 cặp $\\implies P(B) = \\frac{6}{12} = \\frac{1}{2}$.

---

### 3. Sai lầm thường gặp

> [!NOTE]
> **⚠ Lưu ý — Sai lầm thường gặp:**
> - **Bỏ sót điều kiện thứ tự hoặc trùng lặp khi lấy không hoàn lại:** Lấy không hoàn lại từ 4 thẻ thì số phần tử là $4 \\times 3 = 12$, không phải $4 \\times 4 = 16$ (vì các cặp $(1, 1), (2, 2)$ không thể xảy ra).
> - **Nhầm lẫn phép toán "VÀ" với "HOẶC" trong biến cố:** "HOẶC" là phép hợp (chỉ cần thỏa mãn ít nhất một trong hai điều kiện). "VÀ" đòi hỏi phải thỏa mãn đồng thời cả hai.
> - **Ngụy biện con bạc (Gambler's Fallacy):** Các lần gieo xúc xắc/đồng xu là độc lập nhau. Dù 4 lần trước đều ra Sấp thì lần thứ 5 xác suất ra Ngửa vẫn luôn là $50\\%$.

---

### 4. Bài toán thực tế mở rộng (Elite Standard)

#### 🌍 Bài toán thực tế 1: Vòng quay may mắn tại hội chợ xuân
- Đĩa 1 chia 4 màu: Trắng, Đỏ, Xanh, Vàng. Đĩa 2 chia 3 màu: Đỏ, Xanh, Vàng. Quay đồng thời 2 đĩa: $n(\\Omega) = 4 \\times 3 = 12$.
- **Giải Nhất (Cả hai cùng Đỏ):** Chỉ có $(Đ, Đ) \\implies P = \\frac{1}{12}$.
- **Giải Nhì (Cùng màu):** Gồm $(Đ, Đ), (X, X), (V, V) \\implies P = \\frac{3}{12} = \\frac{1}{4}$.
- **Giải Ba (Đúng một mũi tên màu Đỏ):** Có $2 + 3 = 5$ kết quả $\\implies P = \\frac{5}{12}$.

![Mô phỏng trò chơi quay hai đĩa màu tại hội chợ xuân](/images/toan9/b26_dia_quay_mau.svg?v=1)

#### 🌍 Bài toán thực tế 2: Gửi thư nhầm phong bì (Bài toán Derangement cổ điển)
- Tuấn viết 3 bức thư cho 3 bạn $A, B, C$ và bỏ ngẫu nhiên vào 3 phong bì có sẵn địa chỉ $\\implies n(\\Omega) = 3! = 6$.
- Xác suất cả 3 bức thư đúng người: Chỉ có 1 cách $\\implies P = \\frac{1}{6}$.
- Xác suất không có bức thư nào đến đúng người (xáo trộn hoàn toàn): Có 2 cách $(B, C, A)$ và $(C, A, B) \\implies P = \\frac{2}{6} = \\frac{1}{3}$.

#### 🌍 Bài toán thực tế 3: Xác suất phân li độc lập trong di truyền học Mendel
- Cho lai hai cây đậu Hà Lan dị hợp tử cả hai cặp gen $(AaBb) \\times (AaBb)$. Mỗi bên tạo 4 loại giao tử $\\implies n(\\Omega) = 4 \\times 4 = 16$.
- Cây con thân thấp, hoa trắng (đồng hợp lặn $aabb$) chỉ hình thành từ tổ hợp $(ab, ab) \\implies P = \\frac{1}{16} = 6{,}25\\%$. Giải thích tỉ lệ kiểu hình $9:3:3:1$ trong di truyền học.`
      },
      {
        title: "Bài tập cuối chương VIII",
        summary: commonSummaryPrefix + `### Tổng kết kiến thức Chương VIII
- Kỹ năng liệt kê chính xác các phần tử của không gian mẫu bằng sơ đồ hình cây hoặc bảng kép và tính xác suất biến cố.`
      }
    ]
  },

  // ─── CHƯƠNG IX ────────────────────────────────────────────────────────────
  {
    title: "Chương IX: Đường tròn ngoại tiếp và đường tròn nội tiếp",
    lessons: [
      {
        title: "Bài 27: Góc nội tiếp",
        summary: commonSummaryPrefix + `### 1. Định nghĩa góc nội tiếp
- Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó.

### 2. Định lí về góc nội tiếp
- Số đo của góc nội tiếp bằng **nửa số đo của cung bị chắn**:
  $$\\widehat{BAC} = \\frac{1}{2} \\text{sđ}\\overparen{BC}$$
- **Hệ quả quan trọng:**
  - Các góc nội tiếp cùng chắn một cung hoặc chắn các cung bằng nhau thì bằng nhau.
  - Góc nội tiếp chắn nửa đường tròn là **góc vuông** ($90^\\circ$).`
      },
      {
        title: "Bài 28: Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác",
        summary: commonSummaryPrefix + `### 1. Đường tròn ngoại tiếp tam giác
- Đi qua cả 3 đỉnh của tam giác. Tâm là giao điểm của 3 đường **trung trực**.

### 2. Đường tròn nội tiếp tam giác
- Tiếp xúc với cả 3 cạnh của tam giác. Tâm là giao điểm của 3 đường **phân giác trong**.
- Bán kính đường tròn nội tiếp: $r = \\frac{S}{p}$ (với $p$ là nửa chu vi).`
      },
      {
        title: "Bài 29: Tứ giác nội tiếp",
        summary: commonSummaryPrefix + `### 1. Định nghĩa tứ giác nội tiếp
- Tứ giác có 4 đỉnh cùng nằm trên một đường tròn gọi là tứ giác nội tiếp.

### 2. Định lí và Dấu hiệu nhận biết
- **Định lí:** Trong một tứ giác nội tiếp, tổng số đo hai góc đối diện bằng $180^\\circ$:
  $$\\widehat{A} + \\widehat{C} = 180^\\circ, \\quad \\widehat{B} + \\widehat{D} = 180^\\circ$$
- **Dấu hiệu nhận biết thường dùng trong bài thi:**
  - Tứ giác có tổng hai góc đối bằng $180^\\circ$.
  - Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.
  - Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc bằng nhau (cùng chắn một cung).
  - Tứ giác có 4 đỉnh cách đều một điểm cố định.`
      },
      {
        title: "Bài 30: Đa giác đều",
        summary: commonSummaryPrefix + `### Đa giác đều
- Đa giác đều là đa giác có tất cả các cạnh bằng nhau và tất cả các góc bằng nhau.
- Bất kì đa giác đều nào cũng có một đường tròn ngoại tiếp và một đường tròn nội tiếp cùng tâm (gọi là tâm của đa giác đều).`
      },
      {
        title: "Bài tập cuối chương IX",
        summary: commonSummaryPrefix + `### Tổng kết kiến thức Chương IX
- Nắm vững các dấu hiệu chứng minh tứ giác nội tiếp (câu hỏi kinh điển trong đề thi vào 10).
- Rèn luyện kỹ năng vận dụng góc nội tiếp, góc tạo bởi tia tiếp tuyến và dây cung.`
      }
    ]
  },

  // ─── CHƯƠNG X ─────────────────────────────────────────────────────────────
  {
    title: "Chương X: Một số hình khối trong thực tiễn",
    lessons: [
      {
        title: "Bài 31: Hình trụ và hình nón",
        summary: commonSummaryPrefix + `### 1. Hình trụ
- Bán kính đáy $r$, chiều cao $h$:
  - Diện tích xung quanh: $S_{xq} = 2\\pi r h$
  - Diện tích toàn phần: $S_{tp} = 2\\pi r h + 2\\pi r^2$
  - Thể tích: $V = S_{\\text{đáy}} \\cdot h = \\pi r^2 h$

### 2. Hình nón
- Bán kính đáy $r$, chiều cao $h$, đường sinh $l$ ($l = \\sqrt{r^2 + h^2}$):
  - Diện tích xung quanh: $S_{xq} = \\pi r l$
  - Diện tích toàn phần: $S_{tp} = \\pi r l + \\pi r^2$
  - Thể tích: $V = \\frac{1}{3} \\pi r^2 h$`
      },
      {
        title: "Bài 32: Hình cầu",
        summary: commonSummaryPrefix + `### Hình cầu
- Bán kính $R$:
  - Diện tích mặt cầu:
    $$S = 4\\pi R^2 = \\pi d^2$$
  - Thể tích hình cầu:
    $$V = \\frac{4}{3}\\pi R^3$$`
      },
      {
        title: "Bài tập cuối chương X",
        summary: commonSummaryPrefix + `### Tổng kết kiến thức Chương X
- Ghi nhớ hệ thống công thức diện tích xung quanh, toàn phần và thể tích các hình khối tròn xoay (Hình trụ, Hình nón, Hình cầu) để áp dụng vào các bài toán thực tế trong đề thi.`
      }
    ]
  }
];
