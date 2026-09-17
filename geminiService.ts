
import { Question } from './types';
import { questionsRaw } from './questions_data';
import { chuong1ThucTeData } from './chuong1_thucte_data';
import { chuong2ThucTeData } from './chuong2_thucte_data';
import { chuong3ThucTeData } from './chuong3_thucte_data';
import { chuong4ThucTeData } from './chuong4_thucte_data';
import { TOAN_9_DATA } from './toan9_data';
import { toan9Chuong1Questions } from './toan9_chuong1_questions';
import { toan9Chuong2Questions } from './toan9_chuong2_questions';
import { toan9Chuong3Questions } from './toan9_chuong3_questions';
import { toan9Chuong4Questions } from './toan9_chuong4_questions';
import { toan9Chuong5Questions } from './toan9_chuong5_questions';
import { toan9Chuong6Questions } from './toan9_chuong6_questions';
import { toan9Chuong7Questions } from './toan9_chuong7_questions';
import { toan9Chuong8Questions } from './toan9_chuong8_questions';

export const CHAPTER_NAMES: Record<number, string> = {
  1: "Huyền thoại Hồng Bàng",
  2: "Nữ tướng anh hùng",
  3: "Nước Vạn Xuân",
  4: "Đại Cồ Việt",
  5: "Bình Chiêm Phá Tống",
  6: "3 lần chiến thắng Mông Nguyên",
  7: "Nhà Hồ và quân Minh",
  8: "Khởi nghĩa Lam Sơn",
  9: "Chiến tranh Nam Bắc Triều",
  10: "Tây Sơn đại phá quân Thanh"
};

const commonSummaryPrefix = "### Kiến thức cần nắm\nToán học là nền tảng của tư duy binh pháp. Chúa công cần nắm vững các định nghĩa và quy tắc sau đây:\n\n";

export const MATH_DATA: Record<number, any> = {
  6: [
    { 
      title: "Chương I: Tập hợp các số tự nhiên", 
      lessons: [
        { title: "Bài 1: Tập hợp", summary: commonSummaryPrefix + "### 1. Tập hợp và Phần tử\n- **Khái niệm:** Một tập hợp (gọi tắt là tập) bao gồm những đối tượng nhất định. Các đối tượng ấy được gọi là những phần tử của tập hợp.\n- **Kí hiệu:**\n  - $x \\in A$: $x$ là một phần tử của tập $A$ ($x$ thuộc $A$).\n  - $y \\notin A$: $y$ không là phần tử của tập $A$ ($y$ không thuộc $A$).\n\n### 2. Các cách mô tả tập hợp\n- **Cách 1: Liệt kê các phần tử**\n  - Viết các phần tử trong dấu ngoặc nhọn $\\{ \\}$.\n  - Các phần tử cách nhau bởi dấu chấm phẩy `;`.\n  - Mỗi phần tử được liệt kê đúng một lần, thứ tự tùy ý.\n- **Cách 2: Nêu dấu hiệu đặc trưng**\n  - Chỉ ra tính chất đặc trưng cho các phần tử của tập hợp đó.\n\n### 3. Tập hợp số tự nhiên\n- $\\mathbb{N} = \\{0; 1; 2; 3; \\dots\\}$ là tập hợp các số tự nhiên.\n- $\\mathbb{N}^* = \\{1; 2; 3; \\dots\\}$ là tập hợp các số tự nhiên khác $0$.\n\n> [!NOTE]\n> **Lưu ý — Sai lầm thường gặp:**\n> - Sử dụng sai dấu ngăn cách các phần tử. Phải dùng dấu chấm phẩy `;` để tránh nhầm lẫn với số thập phân.\n> - Liệt kê lặp lại phần tử. Mỗi phần tử chỉ được liệt kê một lần.\n> - Nhầm lẫn giữa $\\mathbb{N}$ và $\\mathbb{N}^*$. $\\mathbb{N}$ có chứa số $0$, còn $\\mathbb{N}^*$ bắt đầu từ $1$." },
        { title: "Bài 2: Cách ghi số tự nhiên", summary: commonSummaryPrefix + "### 1. Tập hợp các số tự nhiên\n- Tập hợp các số tự nhiên được kí hiệu là $N$.\n  $$N = \\{0; 1; 2; 3; \\dots\\}$$\n- Tập hợp các số tự nhiên khác 0 được kí hiệu là $N^*$.\n  $$N^* = \\{1; 2; 3; \\dots\\}$$\n\n### 2. Hệ thập phân\n- Mỗi số tự nhiên được viết thành một dãy chữ số lấy trong mười chữ số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. (Chữ số đầu tiên bên trái phải khác 0).\n- Cứ 10 đơn vị ở một hàng thì bằng 1 đơn vị ở hàng liền trước nó.\n- Mỗi số tự nhiên bằng tổng giá trị các chữ số của nó. Ví dụ:\n  $$\\overline{ab} = a \\times 10 + b \\quad (a \\neq 0)$$\n  $$\\overline{abc} = a \\times 100 + b \\times 10 + c \\quad (a \\neq 0)$$\n\n### 3. Số La Mã\n- Sử dụng các chữ số: $I = 1$, $V = 5$, $X = 10$.\n- Các cụm chữ số đặc biệt: $IV = 4$, $IX = 9$.\n- Mỗi số La Mã biểu diễn một số tự nhiên bằng tổng giá trị của các thành phần viết nên số đó. Không có số La Mã nào biểu diễn số 0.\n\n### 4. Các dạng bài tập tiêu biểu\n**Dạng 1: Đọc, viết và phân tích số tự nhiên**\n**Ví dụ 1:** Viết số 34 604 thành tổng giá trị các chữ số của nó.\n**Hướng dẫn giải:**\n- Xác định giá trị của từng chữ số dựa vào vị trí hàng. Chữ số 3 ở hàng chục nghìn, chữ số 4 ở hàng nghìn, chữ số 6 ở hàng trăm, chữ số 0 ở hàng chục, chữ số 4 ở hàng đơn vị.\n- Biểu diễn thành tổng:\n  $$34~604 = 3 \\times 10~000 + 4 \\times 1~000 + 6 \\times 100 + 4$$\n\n**Dạng 2: Cấu tạo số tự nhiên theo điều kiện cho trước**\n**Ví dụ 2:** Tìm số tự nhiên $n$ có ba chữ số, biết chữ số hàng chục gấp 2 lần chữ số hàng đơn vị, chữ số hàng trăm gấp 3 lần chữ số hàng chục.\n**Hướng dẫn giải:**\n- Gọi chữ số hàng đơn vị là $a$ ($a \\neq 0$). Chữ số hàng chục là $2 \\times a$. Chữ số hàng trăm là $3 \\times (2 \\times a) = 6 \\times a$.\n- Vì chữ số hàng trăm phải nhỏ hơn 10 nên $6 \\times a < 10 \\Rightarrow a = 1$.\n- Suy ra hàng chục là 2, hàng trăm là 6. Vậy số cần tìm là 621.\n\n> [!NOTE]\n> **Lưu ý — Sai lầm thường gặp:**\n> - **Nhầm lẫn giữa tập hợp $N$ và $N^*$:** Sai: Cho rằng $0 \\in N^*$. Đúng: Số $0$ thuộc $N$ nhưng không thuộc $N^*$.\n> - **Lỗi khi viết số La Mã:** Sai: Viết số 4 là $IIII$, số 9 là $VIIII$. Đúng: Số 4 phải viết là $IV$, số 9 là $IX$. Chữ số $I$ không lặp lại quá 3 lần liên tiếp.\n> - **Quên điều kiện chữ số đầu tiên:** Sai: Viết số tự nhiên có hai chữ số là $05$. Đúng: Chữ số hàng lớn nhất bên trái phải luôn khác $0$ (ví dụ: số 5 chỉ có một chữ số)." },
        { title: "Bài 3: Thứ tự trong tập hợp các số tự nhiên", summary: commonSummaryPrefix + "### 1. Thứ tự của các số tự nhiên và Tia số\n- Mỗi phần tử của tập hợp $\\mathbb{N} = \\{0; 1; 2; 3; \\dots\\}$ được biểu diễn bởi một điểm trên tia số gốc $O$. Điểm biểu diễn số tự nhiên $a$ gọi là điểm $a$.\n- Trong hai số tự nhiên khác nhau, luôn có một số nhỏ hơn số kia.\n- Nếu $a < b$ thì trên tia số nằm ngang, điểm $a$ nằm bên **trái** điểm $b$. Ta nói điểm $a$ nằm trước điểm $b$.\n\n### 2. Số liền trước và Số liền sau\n- Mỗi số tự nhiên $a$ có đúng một số liền sau là $a + 1$. Khi đó $a$ là số liền trước của $a + 1$.\n- Hai số $a$ và $a + 1$ được gọi là hai số tự nhiên liên tiếp.\n- **Đặc biệt:** Số $0$ là số tự nhiên nhỏ nhất và **không có** số tự nhiên liền trước.\n\n### 3. Ký hiệu và Tính chất\n- Ký hiệu $\\le$ (nhỏ hơn hoặc bằng): $a \\le b$ nghĩa là $a < b$ hoặc $a = b$.\n- Ký hiệu $\\ge$ (lớn hơn hoặc bằng): $a \\ge b$ nghĩa là $a > b$ hoặc $a = b$.\n- **Tính chất bắc cầu:**\n  Nếu $a < b$ và $b < c$ $\\Rightarrow a < c$\n  Nếu $a \\le b$ và $b \\le c$ $\\Rightarrow a \\le c$\n\n### 4. Các dạng bài tập tiêu biểu\n**Dạng 1: Viết tập hợp bằng cách liệt kê phần tử dựa vào quan hệ thứ tự**\n- **Ví dụ:** Liệt kê các phần tử của tập hợp $M = \\{x \\in \\mathbb{N} \\mid 10 \\le x < 15\\}$.\n- **Hướng dẫn giải:**\n  - $x$ lớn hơn hoặc bằng 10 và nhỏ hơn 15.\n  - Do có dấu \"=\" ở 10 nên ta lấy cả số 10. Không có dấu \"=\" ở 15 nên ta chỉ lấy đến 14.\n  - Kết luận: $M = \\{10; 11; 12; 13; 14\\}$.\n\n**Dạng 2: Sắp xếp và so sánh số tự nhiên**\n- **Ví dụ:** Cho ba bạn An cao 150 cm, Bắc cao 153 cm, Cường cao 148 cm. Sắp xếp chiều cao tăng dần.\n- **Hướng dẫn giải:**\n  - So sánh: $148 < 150 < 153$.\n  - Chiều cao Cường $<$ chiều cao An $<$ chiều cao Bắc.\n\n> [!NOTE]\n> **Lưu ý — Sai lầm thường gặp:**\n> - **Nhầm lẫn giữa các ký hiệu $<$ và $\\le$:** Sai: Viết $A = \\{x \\in \\mathbb{N} \\mid x < 4\\} = \\{0; 1; 2; 3; 4\\}$. Đúng: Dấu $<$ không lấy số 4. Tập đúng là $A = \\{0; 1; 2; 3\\}$.\n> - **Tìm số liền trước của 0:** Sai: Cho rằng số liền trước của 0 là -1 trong tập số tự nhiên. Đúng: Số 0 là số tự nhiên nhỏ nhất, nó **không có** số tự nhiên liền trước.\n> - **Xác định vị trí trên tia số:** Sai: Nghĩ rằng số lớn hơn nằm bên trái trên tia số. Đúng: Số nhỏ hơn nằm bên **trái**, số lớn hơn nằm bên **phải**." },
        { title: "Bài 4: Phép cộng và phép trừ số tự nhiên", summary: commonSummaryPrefix + "### 1. Phép cộng số tự nhiên\n- Phép cộng hai số tự nhiên $a$ và $b$ cho ta một số tự nhiên gọi là tổng, kí hiệu là $a + b$.\n  $$ a \\text{ (Số hạng)} + b \\text{ (Số hạng)} = c \\text{ (Tổng)} $$\n- **Tính chất của phép cộng:**\n  - Giao hoán: $a + b = b + a$.\n  - Kết hợp: $(a + b) + c = a + (b + c)$.\n  - Cộng với số 0: $a + 0 = 0 + a = a$.\n- Chú ý: Tổng $(a + b) + c$ hay $a + (b + c)$ được gọi là tổng của ba số $a, b, c$ và viết gọn là $a + b + c$.\n\n### 2. Phép trừ số tự nhiên\n- Với hai số tự nhiên $a, b$, nếu có số tự nhiên $c$ sao cho $a = b + c$ thì ta có phép trừ $a - b = c$.\n  $$ a \\text{ (Số bị trừ)} - b \\text{ (Số trừ)} = c \\text{ (Hiệu)} $$\n- **Điều kiện thực hiện phép trừ:** Trong tập hợp các số tự nhiên $\\mathbb{N}$, phép trừ $a - b$ chỉ thực hiện được nếu $a \\ge b$.\n- **Quan hệ giữa phép cộng và phép trừ:**\n  - Số hạng = Tổng $-$ Số hạng kia.\n  - Số bị trừ = Hiệu $+$ Số trừ.\n  - Số trừ = Số bị trừ $-$ Hiệu.\n\n### 3. Các dạng bài tập tiêu biểu\n**Dạng 1: Tính nhanh, tính hợp lí**\n- **Ví dụ:** Tính hợp lí biểu thức sau: $66 + 289 + 134 + 311$.\n- **Hướng dẫn giải:**\n  - Sử dụng tính chất kết hợp để nhóm các số có tổng tròn chục, tròn trăm lại gần nhau:\n    $$ 66 + 289 + 134 + 311 = (66 + 134) + (289 + 311) $$\n  - Thực hiện phép tính trong ngoặc: \n    $$ = 200 + 600 = 800 $$\n\n**Dạng 2: Tìm $x$ (tìm thành phần chưa biết của phép tính)**\n- **Ví dụ:** Tìm số tự nhiên $x$, biết: $x - 56 = 4$.\n- **Hướng dẫn giải:**\n  - $x$ đứng trước dấu trừ nên $x$ là **Số bị trừ**. Số bị trừ = Hiệu + Số trừ.\n    $$ x = 4 + 56 = 60 $$\n\n**Dạng 3: Toán đố thực tế**\n- **Ví dụ:** Dân số Việt Nam năm 2019 là $96\\,462\\,106$ người. Năm 2020, tăng $876\\,473$ người. Tính dân số năm 2020.\n- **Hướng dẫn giải:**\n  - Dân số 2020 = Dân số 2019 + Số người tăng thêm.\n    $$ 96\\,462\\,106 + 876\\,473 = 97\\,338\\,579 \\text{ người}$$\n\n> [!NOTE]\n> **Lưu ý — Sai lầm thường gặp:**\n> - **Đặt tính sai hàng:** Sai: Cộng hàng đơn vị của số này với hàng chục của số kia. Đúng: Đặt tính sao cho đơn vị thẳng đơn vị, chục thẳng chục.\n> - **Tìm thành phần của phép trừ sai quy tắc:** Sai: Tìm \"Số trừ\" bằng cách lấy \"Số bị trừ\" CỘNG \"Hiệu\". Đúng: Số trừ = Số bị trừ $-$ Hiệu.\n> - **Thực hiện phép trừ không thỏa mãn điều kiện:** Sai: Cố gắng lấy số nhỏ trừ số lớn. Đúng: Phép trừ $a - b$ trong $\\mathbb{N}$ chỉ thực hiện được khi $a \\ge b$." },
        { title: "Bài 5: Phép nhân và phép chia số tự nhiên", summary: commonSummaryPrefix + "### 1. Phép nhân số tự nhiên\n- Phép nhân hai số tự nhiên cho ta một số tự nhiên gọi là tích.\n  $$a \\cdot b = c$$\n  (Trong đó: a, b là các thừa số; c là tích)\n- **Các tính chất của phép nhân:**\n  - Tính chất giao hoán: $a \\cdot b = b \\cdot a$\n  - Tính chất kết hợp: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$\n  - Tính chất phân phối của phép nhân đối với phép cộng: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$\n  - Nhân với số 1 và số 0: $a \\cdot 1 = a$; $a \\cdot 0 = 0$\n\n### 2. Phép chia số tự nhiên\n- **Phép chia hết:** $a = b \\cdot q$\n  (a là số bị chia, b là số chia, q là thương. Điều kiện: b khác 0)\n- **Phép chia có dư:** $a = b \\cdot q + r$\n  (r là số dư. Điều kiện: $0 \\le r < b$)\n- **Quan hệ giữa các thành phần:**\n  - Số bị chia = Số chia $\\cdot$ Thương + Số dư\n  - Thương = (Số bị chia - Số dư) : Số chia\n  - Số chia = (Số bị chia - Số dư) : Thương\n\n### 3. Các dạng bài tập tiêu biểu\n**Dạng 1: Tính nhanh, tính nhẩm, tính hợp lí**\n- **Ví dụ:** Tính hợp lí biểu thức: $$45 \\cdot 29 + 45 \\cdot 71$$\n- **Hướng dẫn giải:**\n  - Áp dụng tính chất phân phối:\n    $$45 \\cdot 29 + 45 \\cdot 71 = 45 \\cdot (29 + 71)$$\n  - Thực hiện trong ngoặc: $45 \\cdot 100 = 4500$\n\n**Dạng 2: Bài toán thực tế về phép chia có dư**\n- **Ví dụ:** Dùng ít nhất bao nhiêu xe 45 chỗ để chở 487 người?\n- **Hướng dẫn giải:**\n  - Thực hiện phép chia: $487 : 45 = 10$ (dư $37$)\n  - Cần thêm 1 xe cho 37 người dư.\n  - Số xe ít nhất = $10 + 1 = 11$ xe.\n\n> [!NOTE]\n> **Lưu ý — Sai lầm thường gặp:**\n> - **Tính chất phân phối:** Sai: $a \\cdot (b + c) = a \\cdot b + c$. Đúng: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.\n> - **Điều kiện số dư:** Sai: $36 : 12 = 2 \\text{ (dư 12)}$. Đúng: $36 : 12 = 3 \\text{ (dư 0)}$. Số dư phải luôn nhỏ hơn số chia.\n> - **Bài toán \"ít nhất\" / \"nhiều nhất\":** Chở \"hết\" người (dư người) thì phải **cộng thêm 1** vào thương. Mua \"nhiều nhất\" (dư tiền) thì chỉ lấy phần **thương**." },
        { title: "Bài 6: Luỹ thừa với số mũ tự nhiên", summary: commonSummaryPrefix + "### 1. Định nghĩa luỹ thừa\n- Luỹ thừa bậc $n$ của số tự nhiên $a$ là tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $a$:\n  $$a^n = a \\cdot a \\cdot a \\dots a \\quad (n \\text{ thừa số } a, n \\in \\mathbb{N}^*)$$\n- Trong đó: $a$ là **cơ số**, $n$ là **số mũ**.\n- Phép nhân nhiều thừa số bằng nhau gọi là phép **nâng lên luỹ thừa**.\n- **Quy ước:** \n  $a^1 = a$; $a^0 = 1 \\quad (a \\neq 0)$\n\n### 2. Bình phương và Lập phương. Số chính phương\n- $a^2$ được gọi là $a$ bình phương (hay bình phương của $a$).\n- $a^3$ được gọi là $a$ lập phương (hay lập phương của $a$).\n- **Số chính phương** là các số có dạng bình phương của một số tự nhiên: $n^2 \\quad (n \\in \\mathbb{N})$. Ví dụ: 0, 1, 4, 9, 16, 25,...\n\n### 3. Nhân và chia hai luỹ thừa cùng cơ số\n- **Nhân hai luỹ thừa cùng cơ số:** Giữ nguyên cơ số và cộng các số mũ.\n  $$a^m \\cdot a^n = a^{m+n}$$\n- **Chia hai luỹ thừa cùng cơ số:** Giữ nguyên cơ số và trừ các số mũ.\n  $$a^m : a^n = a^{m-n} \\quad (a \\neq 0, m \\ge n)$$\n\n### 4. Luỹ thừa của 10 và Cấu tạo số\n- $10^n = 100\\dots0$ ($n$ chữ số 0).\n- Mọi số tự nhiên đều viết được thành tổng các luỹ thừa của 10:\n  $$\\overline{ab} = a \\cdot 10^1 + b \\cdot 10^0$$\n  $$\\overline{abc} = a \\cdot 10^2 + b \\cdot 10^1 + c \\cdot 10^0$$\n\n### 5. Các dạng bài tập tiêu biểu\n**Dạng 1: Viết gọn biểu thức dưới dạng luỹ thừa**\n- **Ví dụ 1:** Viết gọn tích sau: $2 \\cdot 3 \\cdot 6 \\cdot 6 \\cdot 6$.\n- **Hướng dẫn giải:**\n  - Gộp: $2 \\cdot 3 = 6$. Biểu thức trở thành: $6 \\cdot 6 \\cdot 6 \\cdot 6 = 6^4$.\n\n**Dạng 2: Nhân, chia hai luỹ thừa cùng cơ số**\n- **Ví dụ 2:** Viết kết quả phép tính dưới dạng một luỹ thừa: $7^3 : 7^2 \\cdot 7^4$.\n- **Hướng dẫn giải:**\n  - Chia trước (từ trái sang phải): $7^3 : 7^2 = 7^1$.\n  - Nhân tiếp: $7^1 \\cdot 7^4 = 7^5$.\n\n> [!NOTE]\n> **Lưu ý — Sai lầm thường gặp:**\n> - **Nhầm lẫn giữa luỹ thừa và phép nhân:** Sai: $2^3 = 2 \\cdot 3 = 6$. Đúng: $2^3 = 2 \\cdot 2 \\cdot 2 = 8$. Luỹ thừa là nhân các thừa số giống nhau, không phải cơ số nhân số mũ.\n> - **Nhân/chia hai luỹ thừa cùng cơ số:** Sai: $5^3 \\cdot 5^2 = 5^{3 \\cdot 2} = 5^6$ hoặc $25^5$. Đúng: $5^3 \\cdot 5^2 = 5^{3+2} = 5^5$. Phải **cộng** số mũ và **giữ nguyên** cơ số.\n> - **Quy ước mũ 0 và mũ 1:** Sai: $a^0 = 0$. Đúng: $a^0 = 1$ (với $a \\neq 0$) và $a^1 = a$." },
        { title: "Bài 7: Thứ tự thực hiện các phép tính", summary: commonSummaryPrefix + `### 1. Thứ tự thực hiện các phép tính trong biểu thức không có dấu ngoặc
- Nếu biểu thức chỉ có phép cộng, trừ (hoặc chỉ có phép nhân, chia): Ta thực hiện các phép tính theo thứ tự từ **trái sang phải**.
- Nếu biểu thức có các phép tính cộng, trừ, nhân, chia, nâng lên luỹ thừa: Ta thực hiện theo thứ tự:
  $$ \\text{Luỹ thừa} \\rightarrow \\text{Nhân và Chia} \\rightarrow \\text{Cộng và Trừ} $$

### 2. Thứ tự thực hiện các phép tính trong biểu thức có dấu ngoặc
- Nếu biểu thức chỉ có một dấu ngoặc: Ta thực hiện phép tính trong dấu ngoặc trước, ngoài dấu ngoặc sau.
- Nếu biểu thức có nhiều loại dấu ngoặc: Ta thực hiện theo thứ tự:
  $$ (\\ ) \\rightarrow [\\ ] \\rightarrow \\{\\ \\} $$
  (Ngoặc tròn $\\rightarrow$ Ngoặc vuông $\\rightarrow$ Ngoặc nhọn).

### 3. Tính giá trị của biểu thức chứa chữ
- Trong một biểu thức có thể chứa chữ. Để tính giá trị của biểu thức đó khi cho giá trị của các chữ, ta **thay thế giá trị đã cho** vào biểu thức rồi tính giá trị của biểu thức nhận được (tuân thủ đúng thứ tự thực hiện phép tính).

### 4. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Thực hiện phép tính không có dấu ngoặc**
- **Đặc điểm nhận dạng:** Biểu thức gồm nhiều phép toán nhưng không có dấu ngoặc.
- **Ví dụ:** Tính giá trị biểu thức: $A = 12 + 3 \\cdot 2^5 : 4 - 3$.
- **Hướng dẫn giải:**
  - Thực hiện phép luỹ thừa trước: $2^5 = 32$. Biểu thức trở thành: $12 + 3 \\cdot 32 : 4 - 3$.
  - Thực hiện phép nhân và chia từ trái sang phải: $3 \\cdot 32 = 96$, sau đó $96 : 4 = 24$. Biểu thức trở thành: $12 + 24 - 3$.
  - Thực hiện phép cộng và trừ từ trái sang phải: $12 + 24 = 36$, sau đó $36 - 3 = 33$.
  - Kết luận: $A = 33$.

**Dạng 2: Thực hiện phép tính có dấu ngoặc**
- **Đặc điểm nhận dạng:** Biểu thức chứa các dấu ngoặc $(\\ ), [\\ ], \\{\\ \\}$.
- **Ví dụ:** Tính giá trị biểu thức: $B = [1 + 2 \\cdot (5 \\cdot 3 - 2^3)] \\cdot 7$.
- **Hướng dẫn giải:**
  - Thực hiện trong ngoặc tròn $(\\ )$ trước (ưu tiên luỹ thừa $\\rightarrow$ nhân $\\rightarrow$ trừ): 
    $$ 5 \\cdot 3 - 2^3 = 15 - 8 = 7 $$
  - Thay vào biểu thức, ta tính tiếp trong ngoặc vuông $[\\ ]$: 
    $$ [1 + 2 \\cdot 7] \\cdot 7 = [1 + 14] \\cdot 7 = 15 \\cdot 7 $$
  - Thực hiện phép tính cuối cùng: $15 \\cdot 7 = 105$.
  - Kết luận: $B = 105$.

**Dạng 3: Toán đố vận dụng thực tế**
- **Ví dụ:** Một cửa hàng bán $1264$ chiếc ti vi trong 8 tháng đầu năm. Trong 4 tháng cuối năm, trung bình mỗi tháng bán được $164$ chiếc. Hỏi trung bình mỗi tháng trong cả năm cửa hàng bán được bao nhiêu chiếc?
- **Hướng dẫn giải:**
  - Viết biểu thức tổng số ti vi bán trong cả năm (12 tháng): $1264 + 164 \\cdot 4$.
  - Viết biểu thức tính trung bình mỗi tháng: $(1264 + 164 \\cdot 4) : 12$.
  - Tính toán: $(1264 + 656) : 12 = 1920 : 12 = 160$.
  - Kết luận: Trung bình mỗi tháng cửa hàng bán được 160 chiếc ti vi.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Tính từ trái sang phải mà bỏ qua thứ tự ưu tiên phép toán:**
>   - Sai: Tính $5 + 3 \\cdot 2 = 8 \\cdot 2 = 16$.
>   - Đúng: Phải thực hiện phép nhân trước: $5 + 3 \\cdot 2 = 5 + 6 = 11$.
> - **Làm sai thứ tự khi có cả nhân và chia:**
>   - Sai: $120 : 3 \\cdot 4$. Học sinh lấy $3 \\cdot 4 = 12$, rồi lấy $120 : 12 = 10$.
>   - Đúng: Nhân, chia cùng cấp phải tính từ trái qua phải. $120 : 3 = 40$, rồi $40 \\cdot 4 = 160$.
> - **Thực hiện phép cộng/trừ trước phép luỹ thừa:**
>   - Sai: $12 + 3 \\cdot 2^5 = 15 \\cdot 2^5$.
>   - Đúng: Phải tính luỹ thừa $2^5$ rồi nhân với 3, cuối cùng mới cộng 12.` },
        { title: "Bài tập cuối chương I", summary: commonSummaryPrefix + `### 1. Tập hợp và Tập hợp các số tự nhiên
- **Tập hợp:** Có hai cách mô tả một tập hợp:
  1. Liệt kê các phần tử của tập hợp.
  2. Nêu dấu hiệu đặc trưng cho các phần tử của tập hợp.
- **Tập hợp các số tự nhiên:**
  - $\\mathbb{N} = \\{0; 1; 2; 3; 4; \\dots\\}$
  - $\\mathbb{N}^* = \\{1; 2; 3; 4; \\dots\\}$
- **Hệ thập phân:** Sử dụng 10 chữ số $0, 1, 2, 3, 4, 5, 6, 7, 8, 9$. Mười đơn vị ở một hàng thì bằng một đơn vị ở hàng liền trước nó.
  Mỗi số tự nhiên đều bằng tổng giá trị các chữ số của nó.

### 2. Các phép toán trong tập hợp số tự nhiên
- **Phép cộng, trừ, nhân:**
  - Giao hoán: $a + b = b + a$; $ab = ba$.
  - Kết hợp: $(a + b) + c = a + (b + c)$; $(ab)c = a(bc)$.
  - Phân phối của phép nhân đối với phép cộng/trừ: $a(b + c) = ab + ac$.
- **Phép chia hết và phép chia có dư:** Cho $a, b \\in \\mathbb{N}$ ($b \\neq 0$), luôn tồn tại $q, r \\in \\mathbb{N}$ sao cho:
  $$a = bq + r \\quad (0 \\le r < b)$$
  - Nếu $r = 0$: Phép chia hết ($a : b = q$).
  - Nếu $r \\neq 0$: Phép chia có dư.

### 3. Lũy thừa với số mũ tự nhiên
- **Định nghĩa:** $a^n = a \\cdot a \\dots a$ ($n$ thừa số $a$, $n \\in \\mathbb{N}^*$).
- **Quy ước:** $a^0 = 1$ ($a \\neq 0$); $a^1 = a$.
- **Nhân hai lũy thừa cùng cơ số:** $a^m \\cdot a^n = a^{m+n}$.
- **Chia hai lũy thừa cùng cơ số:** $a^m : a^n = a^{m-n}$ ($a \\neq 0, m \\ge n$).

### 4. Thứ tự thực hiện các phép tính
- **Biểu thức không có dấu ngoặc:** Lũy thừa $\\rightarrow$ Nhân, chia $\\rightarrow$ Cộng, trừ.
- **Biểu thức có dấu ngoặc:** Thực hiện theo thứ tự $() \\rightarrow [] \\rightarrow \\{\\}$.

### 5. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Viết tập hợp và phân tích cấu tạo số**
- **Đặc điểm:** Yêu cầu biểu diễn tập hợp bằng các cách khác nhau hoặc phân tích một số thành tổng các giá trị chữ số.
- **Ví dụ:** Cho số $n = 280\\,650$.
  1. Viết tập hợp $M$ các chữ số của $n$.
  2. Biểu diễn số $n$ thành tổng giá trị các chữ số của nó.
- **Hướng dẫn giải:**
  1. Các chữ số cấu tạo nên $n$ là $2, 8, 0, 6, 5$. Mỗi phần tử chỉ liệt kê một lần. Vậy $M = \\{2; 8; 0; 6; 5\\}$.
  2. Phân tích theo hàng: $n = 200\\,000 + 80\\,000 + 0 + 600 + 50 + 0$. Viết gọn lại: 
  $$280\\,650 = 2 \\cdot 100\\,000 + 8 \\cdot 10\\,000 + 6 \\cdot 100 + 5 \\cdot 10$$

**Dạng 2: Thực hiện phép tính và tính hợp lý**
- **Đặc điểm:** Bài toán yêu cầu tính toán tuân thủ đúng thứ tự phép tính hoặc áp dụng tính chất giao hoán, kết hợp, phân phối để tính nhanh.
- **Ví dụ:** Tính giá trị của biểu thức $120 + [55 - (11 - 3 \\cdot 2)^2] + 2^3$.
- **Hướng dẫn giải:**
  1. Thực hiện phép tính trong ngoặc tròn $()$ trước, ưu tiên nhân chia trước cộng trừ: $(11 - 6) = 5$.
  2. Biểu thức trở thành: $120 + [55 - 5^2] + 2^3$.
  3. Tính lũy thừa và thực hiện phép tính trong ngoặc vuông $[]$: $5^2 = 25 \\Rightarrow [55 - 25] = 30$.
  4. Biểu thức trở thành: $120 + 30 + 8 = 158$.

**Dạng 3: Toán đố thực tế (Phép chia có dư)**
- **Đặc điểm:** Bài toán yêu cầu sắp xếp, vận chuyển, mua bán mà cần tìm số lượng ít nhất/nhiều nhất dựa vào số dư.
- **Ví dụ:** Khối 6 có 320 học sinh đi tham quan. Cần thuê ít nhất bao nhiêu xe ô tô 45 chỗ để đủ chỗ cho tất cả học sinh?
- **Hướng dẫn giải:**
  1. Thực hiện phép chia: $320 : 45 = 7$ (dư 5).
  2. Giải thích: Xếp đầy 7 xe thì còn dư 5 học sinh. Để tất cả đều được đi, cần thêm 1 xe nữa.
  3. Kết luận: Số xe ít nhất cần thuê là $7 + 1 = 8$ (xe).

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn giữa tập $\\mathbb{N}$ và $\\mathbb{N}^*$:**
>   - Sai: Cho rằng $0 \\in \\mathbb{N}^*$. 
>   - Đúng: $\\mathbb{N}^*$ là tập hợp các số tự nhiên khác $0$. Nên $0 \\notin \\mathbb{N}^*$.
> - **Lỗi thứ tự thực hiện phép tính:**
>   - Sai: Tính $2 + 3 \\cdot 4 = 5 \\cdot 4 = 20$.
>   - Đúng: Phải nhân chia trước, cộng trừ sau: $2 + 3 \\cdot 4 = 2 + 12 = 14$.
> - **Sai lầm khi tính lũy thừa và nhân chia lũy thừa:**
>   - Sai: Tính $2^3 = 2 \\cdot 3 = 6$ hoặc $a^m \\cdot a^n = a^{m \\cdot n}$.
>   - Đúng: $2^3 = 2 \\cdot 2 \\cdot 2 = 8$. Khi nhân hai lũy thừa cùng cơ số phải **cộng** số mũ: $a^m \\cdot a^n = a^{m+n}$.
> - **Lỗi phép chia có dư:**
>   - Sai: Thực hiện phép chia nhưng để số dư lớn hơn số chia.
>   - Đúng: Luôn phải kiểm tra điều kiện $0 \\le \\text{Số dư} < \\text{Số chia}$.` }
      ]
    },
    { 
      title: "Chương II: Tính chia hết trong tập hợp các số tự nhiên", 
      lessons: [
        { title: "Bài 8: Quan hệ chia hết và tính chất", summary: commonSummaryPrefix + `### 1. Quan hệ chia hết
- Cho hai số tự nhiên $a$ và $b$ ($b \\neq 0$). 
- Nếu có số tự nhiên $k$ sao cho $a = k \\cdot b$ thì ta nói $a$ chia hết cho $b$ và kí hiệu là $a \\vdots b$.
- Nếu $a$ không chia hết cho $b$, ta kí hiệu là $a \\not\\vdots b$.

### 2. Ước và Bội
- Nếu $a \\vdots b$, ta nói $b$ là **ước** của $a$ và $a$ là **bội** của $b$.
- Kí hiệu tập hợp các ước của $a$ là Ư$(a)$ và tập hợp các bội của $b$ là B$(b)$.
- **Cách tìm ước của $a$ ($a > 1$):** Lần lượt chia $a$ cho các số tự nhiên từ 1 đến $a$. Số nào mà $a$ chia hết thì số đó là ước của $a$.
- **Cách tìm bội của $b$ ($b \\neq 0$):** Lần lượt nhân $b$ với $0, 1, 2, 3, \\dots$ Các tích nhận được là bội của $b$.

### 3. Tính chất chia hết của một tổng (hoặc hiệu)
- **Tính chất 1 (Trường hợp chia hết):** Nếu tất cả các số hạng của một tổng đều chia hết cho cùng một số thì tổng đó chia hết cho số đó.
  - Nếu $a \\vdots m$ và $b \\vdots m$ thì $(a + b) \\vdots m$ và $(a - b) \\vdots m$ ($a \\ge b$).
  - Nếu $a \\vdots m$, $b \\vdots m$ và $c \\vdots m$ thì $(a + b + c) \\vdots m$.
- **Tính chất 2 (Trường hợp không chia hết):** Nếu có đúng một số hạng của một tổng không chia hết cho một số đã cho, các số hạng còn lại đều chia hết cho số đó thì tổng không chia hết cho số đã cho.
  - Nếu $a \\not\\vdots m$ và $b \\vdots m$ thì $(a + b) \\not\\vdots m$ và $(a - b) \\not\\vdots m$ (với $a \\ge b$).

### 4. Tính chất chia hết của một tích
- Trong một tích, nếu có một thừa số chia hết cho một số thì tích đó chia hết cho số đó.
- Nếu $a \\vdots m$ thì $(a \\cdot b) \\vdots m$ (với mọi số tự nhiên $b$).

### 5. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Tìm Ước và Bội của một số tự nhiên**
- **Đặc điểm nhận dạng:** Đề bài yêu cầu liệt kê các phần tử thuộc tập hợp Ư$(a)$ hoặc B$(b)$ trong một khoảng điều kiện cho trước.
- **Ví dụ 1:** 
  1. Tìm tất cả các ước của 30.
  2. Tìm các bội của 8 nhỏ hơn 50.
- **Hướng dẫn giải:**
  1. **Bước 1:** Lần lượt chia 30 cho các số tự nhiên từ 1 đến 30. Ta thấy 30 chia hết cho 1, 2, 3, 5, 6, 10, 15, 30.
     **Bước 2:** Kết luận tập hợp các ước của 30 là Ư$(30) = \\{1; 2; 3; 5; 6; 10; 15; 30\\}$.
  2. **Bước 1:** Lần lượt nhân 8 với $0, 1, 2, 3, 4, 5, 6, \\dots$ ta được $0, 8, 16, 24, 32, 40, 48, 56, \\dots$
     **Bước 2:** Chọn các số nhỏ hơn 50. Tập hợp các bội của 8 nhỏ hơn 50 là $\\{0; 8; 16; 24; 32; 40; 48\\}$.

**Dạng 2: Áp dụng tính chất chia hết của một tổng/hiệu/tích**
- **Đặc điểm nhận dạng:** Không thực hiện phép tính cộng/trừ, chỉ dùng kí hiệu xét xem tổng/hiệu có chia hết cho một số không, hoặc tìm điều kiện của $x$ để tổng chia hết.
- **Ví dụ 2:** Cho tổng $A = 40 + 48 + 72 + x$ với $x \\in \\mathbb{N}$. Tìm điều kiện của $x$ để $A \\vdots 4$.
- **Hướng dẫn giải:**
  1. **Bước 1:** Xét tính chia hết của các số hạng đã biết cho 4. Ta có $40 \\vdots 4$, $48 \\vdots 4$ và $72 \\vdots 4$.
  2. **Bước 2:** Áp dụng tính chất 1 về chia hết của một tổng. Vì tất cả các số hạng khác đều chia hết cho 4, nên để $A \\vdots 4$ thì số hạng còn lại $x$ cũng phải chia hết cho 4.
  3. **Bước 3:** Kết luận: Điều kiện là $x \\vdots 4$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Lỗi 1: Nhầm lẫn giữa khái niệm Ước và Bội.**
>   - Sai: Cho rằng 15 là ước của 5, hoặc 5 là bội của 15.
>   - Đúng: Vì $15 \\vdots 5$ nên 15 là bội của 5, còn 5 là ước của 15.
> - **Lỗi 2: Bỏ sót số 0 khi tìm tập hợp Bội.**
>   - Sai: Liệt kê B$(4) = \\{4; 8; 12; 16; \\dots\\}$
>   - Đúng: Phải bắt đầu nhân với 0. Tập B$(4) = \\{0; 4; 8; 12; 16; \\dots\\}$
> - **Lỗi 3: Ngộ nhận về tính chất không chia hết của tổng.**
>   - Nhiều học sinh nghĩ rằng: "Hai số không chia hết cho $m$ thì tổng của chúng cũng không chia hết cho $m$."
>   - Sai: $14 \\not\\vdots 4$ và $10 \\not\\vdots 4 \\Rightarrow (14 + 10) \\not\\vdots 4$.
>   - Đúng: $(14 + 10) = 24 \\vdots 4$. Tính chất 2 chỉ đúng khi có **duy nhất** một số hạng không chia hết cho $m$, các số hạng còn lại đều chia hết cho $m$. Khi có từ hai số hạng không chia hết, ta phải cộng lại để xét tổng.` },
        { title: "Bài 9: Dấu hiệu chia hết", summary: commonSummaryPrefix + `### 1. Dấu hiệu chia hết cho 2 và cho 5
- **Dấu hiệu chia hết cho 2:** Các số có chữ số tận cùng là $0, 2, 4, 6, 8$ (tức là số chẵn) thì chia hết cho $2$ và chỉ những số đó mới chia hết cho $2$.
- **Dấu hiệu chia hết cho 5:** Các số có chữ số tận cùng là $0$ hoặc $5$ thì chia hết cho $5$ và chỉ những số đó mới chia hết cho $5$.
- **Đặc biệt:** Số chia hết cho cả $2$ và $5$ là số có chữ số tận cùng là $0$.

### 2. Dấu hiệu chia hết cho 9 và cho 3
- **Dấu hiệu chia hết cho 9:** Các số có tổng các chữ số chia hết cho $9$ thì chia hết cho $9$ và chỉ những số đó mới chia hết cho $9$.
- **Dấu hiệu chia hết cho 3:** Các số có tổng các chữ số chia hết cho $3$ thì chia hết cho $3$ và chỉ những số đó mới chia hết cho $3$.
- **Đặc biệt:** Một số chia hết cho $9$ thì chắc chắn chia hết cho $3$. Tuy nhiên, một số chia hết cho $3$ chưa chắc đã chia hết cho $9$.

### 3. Mở rộng: Phân tích cấu tạo số
Mọi số tự nhiên luôn viết được thành tổng các chữ số của nó cộng với một số chia hết cho 9.
Ví dụ: $234 = 2 \\cdot 100 + 3 \\cdot 10 + 4 = 2 \\cdot (99 + 1) + 3 \\cdot (9 + 1) + 4 = (2 + 3 + 4) + (2 \\cdot 99 + 3 \\cdot 9)$. Trong đó, $2+3+4$ là tổng các chữ số, phần còn lại luôn chia hết cho 9.

### 4. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Nhận biết một số chia hết cho 2, 3, 5, 9**
- **Đặc điểm nhận dạng:** Đề bài cho một hoặc một dãy các số, yêu cầu phân loại hoặc chỉ ra số chia hết cho một số cụ thể.
- **Ví dụ:** Trong các số sau: $1930; 1945; 1954; 2021$, số nào chia hết cho 2? Số nào chia hết cho 5?
- **Hướng dẫn giải:**
  1. Xét chữ số tận cùng của từng số: $1930$ (tận cùng $0$), $1945$ (tận cùng $5$), $1954$ (tận cùng $4$), $2021$ (tận cùng $1$).
  2. Các số chia hết cho $2$ phải có chữ số tận cùng là số chẵn. Vậy các số chia hết cho $2$ là: $1930; 1954$.
  3. Các số chia hết cho $5$ phải có chữ số tận cùng là $0$ hoặc $5$. Vậy các số chia hết cho $5$ là: $1930; 1945$.

**Dạng 2: Tìm chữ số chưa biết để thỏa mãn điều kiện chia hết**
- **Đặc điểm nhận dạng:** Số cho trước có chứa dấu $*$ hoặc chữ cái (như $x, y, a, b$), yêu cầu tìm chữ số đó.
- **Ví dụ:** Thay dấu $*$ bằng một chữ số để số $\\overline{12^*5}$ chia hết cho 3.
- **Hướng dẫn giải:**
  1. Để số $\\overline{12^*5}$ chia hết cho $3$, tổng các chữ số của nó phải chia hết cho $3$.
  2. Tính tổng các chữ số: $S = 1 + 2 + * + 5 = 8 + *$.
  3. Vì $*$ là chữ số nên $0 \\le * \\le 9$. Các giá trị của $8 + *$ chia hết cho $3$ có thể là $9, 12, 15$.
  4. Từ đó suy ra $8 + * = 9 \\Rightarrow * = 1$, $8 + * = 12 \\Rightarrow * = 4$, $8 + * = 15 \\Rightarrow * = 7$.
  5. Kết luận: Chữ số cần tìm là $1; 4; 7$.

**Dạng 3: Bài toán thực tế liên quan đến dấu hiệu chia hết**
- **Ví dụ:** Một bài trắc nghiệm, mỗi câu đúng được $9$ điểm, câu sai bị trừ $3$ điểm. Mai tính được $209$ điểm. Cô giáo nói Mai tính sai. Vì sao?
- **Hướng dẫn giải:**
  1. Nhận xét số điểm mỗi câu đúng ($9$ điểm) và sai ($3$ điểm) đều chia hết cho $3$.
  2. Theo tính chất chia hết của một tổng/hiệu, tổng số điểm của bài thi bắt buộc phải chia hết cho $3$.
  3. Kiểm tra số điểm của Mai: Tổng các chữ số của $209$ là $2 + 0 + 9 = 11$. Vì $11$ không chia hết cho $3$ nên $209$ không chia hết cho $3$.
  4. Kết luận: Do $209$ không chia hết cho $3$ nên Mai chắc chắn tính sai.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Áp dụng sai quy tắc giữa các nhóm số:**
>   - Sai: Kiểm tra tính chia hết cho $3$ hoặc $9$ bằng cách nhìn *chữ số tận cùng*.
>   - Đúng: Phân định rõ: $2$ và $5$ xét CHỮ SỐ TẬN CÙNG. $3$ và $9$ xét TỔNG CÁC CHỮ SỐ.
> - **Suy luận ngược sai:**
>   - Sai: Số chia hết cho $3$ thì chắc chắn chia hết cho $9$.
>   - Đúng: Số chia hết cho $9$ thì mới chắc chắn chia hết cho $3$.
> - **Tìm sót giá trị của chữ số chưa biết:**
>   - Sai: Khi giải bài toán tìm $*$ để $\\overline{12^*5}$ chia hết cho $3$, chỉ tìm được $*$ = $1$ rồi dừng lại.
>   - Đúng: Phải xét tất cả các khả năng của chữ số (từ $0$ đến $9$). Sau khi tìm được $1$ nghiệm, cứ cộng thêm $3$ (hoặc $9$) để tìm các nghiệm tiếp theo.` },
        { title: "Bài 10: Số nguyên tố", summary: commonSummaryPrefix + `### 1. Số nguyên tố và Hợp số
- **Số nguyên tố** là số tự nhiên lớn hơn $1$, chỉ có hai ước là $1$ và chính nó.
  Ví dụ: Các số $2, 3, 5, 7, 11, \\dots$ là các số nguyên tố. Số $2$ là số nguyên tố chẵn duy nhất.
- **Hợp số** là số tự nhiên lớn hơn $1$, có nhiều hơn hai ước.
  Ví dụ: Số $4$ (có ước $1, 2, 4$), số $10$ (có ước $1, 2, 5, 10$) là các hợp số.
- **Lưu ý đặc biệt:** Số $0$ và số $1$ không là số nguyên tố và cũng không là hợp số.

### 2. Phân tích một số ra thừa số nguyên tố
- Phân tích một số tự nhiên lớn hơn $1$ ra thừa số nguyên tố là viết số đó dưới dạng một **tích các thừa số nguyên tố**.
- Mọi hợp số đều có thể phân tích được thành tích của các thừa số nguyên tố. Người quy ước dạng phân tích ra thừa số nguyên tố của một số nguyên tố là chính nó.
- Khi phân tích, ta thường viết các thừa số theo thứ tự từ bé đến lớn và viết tích các thừa số giống nhau dưới dạng **lũy thừa**.
- Có hai phương pháp phổ biến để phân tích: **Sơ đồ cây** và **Sơ đồ cột**.

### 3. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Nhận biết số nguyên tố, hợp số**
- **Đặc điểm nhận dạng:** Sử dụng các dấu hiệu chia hết ($2, 3, 5, 9$) để chỉ ra một số lớn hơn $1$ có ước khác $1$ và chính nó hay không.
- **Ví dụ:** Trong các số $1975$ và $17$, số nào là số nguyên tố, số nào là hợp số? Vì sao?
- **Hướng dẫn giải:**
  1. Xét số $1975$. Chữ số tận cùng là $5$ nên $1975 \\vdots 5$. Do đó, ngoài $1$ và $1975$, số này còn có ước là $5$. Vậy $1975$ là hợp số.
  2. Xét số $17$. Lần lượt kiểm tra, ta thấy $17$ chỉ chia hết cho $1$ và $17$. Vậy $17$ là số nguyên tố.

**Dạng 2: Phân tích một số ra thừa số nguyên tố**
- **Đặc điểm nhận dạng:** Yêu cầu biểu diễn một hợp số thành tích các lũy thừa của các số nguyên tố.
- **Ví dụ 1:** Phân tích số $24$ và $70$ ra thừa số nguyên tố theo sơ đồ cột.
- **Hướng dẫn giải:**
  1. **Số 24:** Lấy $24 \\div 2 = 12$; $12 \\div 2 = 6$; $6 \\div 2 = 3$; $3 \\div 3 = 1$. Dừng phép chia.
     Kết quả: $24 = 2 \\cdot 2 \\cdot 2 \\cdot 3 = 2^3 \\cdot 3$.
  2. **Số 70:** Lấy $70 \\div 2 = 35$; $35 \\div 5 = 7$; $7 \\div 7 = 1$. Dừng phép chia.
     Kết quả: $70 = 2 \\cdot 5 \\cdot 7$.

- **Ví dụ 2:** Phân tích số $40$ ra thừa số nguyên tố bằng sơ đồ cây và sơ đồ cột.
- **Hướng dẫn giải:**
  $$
  \\begin{array}{ccc}
  \\textbf{Sơ đồ cây} & \\quad \\quad \\quad \\quad & \\textbf{Sơ đồ cột} \\\\
  \\begin{array}{ccccccccc}
    &   & 40 &   &    &   &   &   &   \\\\
    & \\swarrow & & \\searrow & & & & & \\\\
  2 &   &    &   & 20 &   &   &   &   \\\\
    &   &    & \\swarrow & & \\searrow & & & \\\\
    &   &  2 &   &    &   & 10 & & \\\\
    &   &    &   &    & \\swarrow & & \\searrow & \\\\
    &   &    &   &  2 &   &    &   & 5
  \\end{array}
  & \\quad \\quad \\quad \\quad & 
  \\begin{array}{r|l}
  40 & 2 \\\\
  20 & 2 \\\\
  10 & 2 \\\\
   5 & 5 \\\\
   1 &
  \\end{array}
  \\end{array}
  $$
  Kết quả: $40 = 2 \\cdot 2 \\cdot 2 \\cdot 5 = 2^3 \\cdot 5$.

**Dạng 3: Toán đố vận dụng số nguyên tố, hợp số, ước**
- **Đặc điểm nhận dạng:** Bài toán thực tế về chia nhóm, chia hàng, xếp hình vuông sao cho các phần tử được chia đều.
- **Ví dụ:** Lớp có $30$ học sinh. Cô giáo muốn chia lớp thành các nhóm sao cho các nhóm có số người bằng nhau và nhiều hơn $1$ người/nhóm. Số nhóm cũng phải lớn hơn $1$. Hỏi mỗi nhóm có thể có bao nhiêu người?
- **Hướng dẫn giải:**
  1. Số người trong một nhóm phải là ước của $30$. Tập hợp các ước của $30$ là: $\\{1; 2; 3; 5; 6; 10; 15; 30\\}$.
  2. Vì mỗi nhóm có nhiều hơn $1$ người và số nhóm lớn hơn $1$ (tức là số người trong nhóm cũng phải nhỏ hơn $30$), nên số người 1 nhóm $\\in \\{2; 3; 5; 6; 10; 15\\}$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn về số 0 và số 1:**
>   - Sai: Cho rằng $1$ là số nguyên tố nhỏ nhất.
>   - Đúng: Số $0$ và $1$ **không** là số nguyên tố, cũng **không** là hợp số. Số nguyên tố nhỏ nhất là $2$.
> - **Nhầm lẫn giữa số lẻ và số nguyên tố:**
>   - Sai: Nghĩ rằng mọi số lẻ đều là số nguyên tố (ví dụ: $9, 15, 21$ là số nguyên tố).
>   - Đúng: Rất nhiều số lẻ là hợp số vì chia hết cho $3, 5,\\dots$ Cần kiểm tra dấu hiệu chia hết.
> - **Phân tích ra thừa số nguyên tố chưa triệt để:**
>   - Sai: $60 = 4 \\cdot 15$ hoặc $102 = 2 \\cdot 51$ và dừng lại.
>   - Đúng: Phải phân tích đến khi tất cả các thừa số đều là số nguyên tố: $60 = 2^2 \\cdot 3 \\cdot 5$ và $102 = 2 \\cdot 3 \\cdot 17$.` },
        { title: "Bài 11: Ước chung. Ước chung lớn nhất", summary: commonSummaryPrefix + `### 1. Ước chung và Ước chung lớn nhất
- **Ước chung (ƯC)** của hai hay nhiều số là ước của tất cả các số đó. 
  Kí hiệu tập hợp các ước chung của $a$ và $b$ là $\\text{ƯC}(a, b)$.
- **Ước chung lớn nhất (ƯCLN)** của hai hay nhiều số là số lớn nhất trong tập hợp các ước chung của các số đó.
  Kí hiệu ước chung lớn nhất của $a$ và $b$ là $\\text{ƯCLN}(a, b)$ hoặc ngắn gọn là $(a, b)$.

### 2. Cách tìm ƯCLN bằng phân tích ra thừa số nguyên tố
Để tìm ƯCLN của hai hay nhiều số lớn hơn 1, ta thực hiện $3$ bước:
1. **Bước 1:** Phân tích mỗi số ra thừa số nguyên tố.
2. **Bước 2:** Chọn ra các thừa số nguyên tố chung.
3. **Bước 3:** Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ nhỏ nhất của nó. Tích đó là ƯCLN cần tìm.

### 3. Cách tìm ƯC thông qua ƯCLN
Để tìm ước chung của hai hay nhiều số, ta có thể:
1. Tìm ƯCLN của các số đó.
2. Tìm các ước của ƯCLN đó.

### 4. Chú ý và Trường hợp đặc biệt
- Nếu $a \\vdots b$ thì $\\text{ƯCLN}(a, b) = b$.
- Số $1$ chỉ có một ước là $1$, nên $\\text{ƯCLN}(a, 1) = 1$ và $\\text{ƯCLN}(a, b, 1) = 1$.
- Nếu $\\text{ƯCLN}(a, b) = 1$, ta gọi $a$ và $b$ là **hai số nguyên tố cùng nhau**.

### 5. Phân số tối giản
- Phân số $\\frac{a}{b}$ được gọi là phân số tối giản nếu $a$ và $b$ không có ước chung nào khác $1$, nghĩa là $\\text{ƯCLN}(a, b) = 1$.
- Để rút gọn một phân số về phân số tối giản, ta chia cả tử và mẫu cho ƯCLN của chúng.

### 6. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Tìm ƯCLN và ƯC của các số cho trước**
- **Đặc điểm nhận dạng:** Bài toán yêu cầu trực tiếp tìm ƯCLN hoặc ƯC của $2$ hay $3$ số tự nhiên.
- **Ví dụ:** Tìm $\\text{ƯCLN}(75, 105, 120)$ rồi tìm $\\text{ƯC}(75, 105, 120)$.
- **Hướng dẫn giải:**
  1. Phân tích ra thừa số nguyên tố:
     $75 = 3 \\cdot 5^2$
     $105 = 3 \\cdot 5 \\cdot 7$
     $120 = 2^3 \\cdot 3 \\cdot 5$
  2. Các thừa số nguyên tố chung là $3$ và $5$. Số mũ nhỏ nhất của $3$ là $1$, của $5$ là $1$.
     Vậy $\\text{ƯCLN}(75, 105, 120) = 3 \\cdot 5 = 15$.
  3. Tập hợp ước chung là tập hợp các ước của ƯCLN. Các ước của $15$ là $1, 3, 5, 15$.
     Vậy $\\text{ƯC}(75, 105, 120) = \\{1; 3; 5; 15\\}$.

**Dạng 2: Rút gọn phân số về phân số tối giản**
- **Ví dụ:** Rút gọn phân số $\\frac{36}{54}$ về phân số tối giản.
- **Hướng dẫn giải:**
  1. Tìm $\\text{ƯCLN}(36, 54)$:
     $36 = 2^2 \\cdot 3^2$; $54 = 2 \\cdot 3^3 \\Rightarrow \\text{ƯCLN}(36, 54) = 2 \\cdot 3^2 = 18$.
  2. Chia cả tử và mẫu cho $18$: $\\frac{36}{54} = \\frac{2}{3}$.

**Dạng 3: Bài toán thực tế liên quan đến ƯCLN**
- **Đặc điểm nhận dạng:** Các bài toán yêu cầu cắt, chia đều các vật (tấm gỗ, số học sinh) thành các phần bằng nhau sao cho kích thước hoặc số phần là "lớn nhất", "nhiều nhất".
- **Ví dụ:** Một đại đội có ba trung đội lần lượt có $24, 28$ và $36$ chiến sĩ. Muốn xếp thành các hàng dọc đều nhau không thừa người nào, có thể xếp nhiều nhất bao nhiêu hàng dọc?
- **Hướng dẫn giải:** Gọi số hàng dọc nhiều nhất có thể xếp được là $x$. Để các trung đội xếp đều mà không thừa, $x$ phải là ước của $24, 28$ và $36$ và lớn nhất, nên $x = \\text{ƯCLN}(24, 28, 36) = 4$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Lỗi lấy sai số mũ khi tìm ƯCLN:**
>   - Sai: Khi lập tích các thừa số chung, lấy số mũ **lớn nhất**.
>   - Đúng: Đối với ƯCLN, phải lấy số mũ **nhỏ nhất** của các thừa số nguyên tố chung.
> - **Nhầm lẫn giữa thừa số chung và riêng:**
>   - Sai: Lấy cả các thừa số chỉ xuất hiện ở một hoặc hai số.
>   - Đúng: Chỉ được lấy các thừa số nguyên tố xuất hiện ở **tất cả** các số đang xét.
> - **Dừng lại ở ƯC thay vì ƯCLN trong toán đố:**
>   - Sai: Tìm một ước chung bất kỳ rồi trả lời.
>   - Đúng: Chú ý các từ khóa "lớn nhất", "nhiều nhất" để xác định phải tìm ƯCLN.` },
        { title: "Bài 12: Bội chung. Bội chung nhỏ nhất", summary: commonSummaryPrefix + `### 1. Bội chung và Bội chung nhỏ nhất
- **Bội chung (BC)** của hai hay nhiều số là bội của tất cả các số đó. 
- **Bội chung nhỏ nhất (BCNN)** của hai hay nhiều số là số nhỏ nhất khác 0 trong tập hợp các bội chung của các số đó.
- Kí hiệu: 
  - Tập hợp các bội chung của $a$ và $b$ là $\\text{BC}(a, b)$.
  - Bội chung nhỏ nhất của $a$ và $b$ là $\\text{BCNN}(a, b)$ hoặc $[a, b]$.

### 2. Cách tìm BCNN bằng phân tích ra thừa số nguyên tố
Để tìm BCNN của hai hay nhiều số lớn hơn 1, ta thực hiện ba bước sau:
1. Phân tích mỗi số ra thừa số nguyên tố.
2. Chọn ra các thừa số nguyên tố **chung và riêng**.
3. Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ **lớn nhất** của nó. Tích đó là BCNN cần tìm.

### 3. Tìm bội chung từ bội chung nhỏ nhất
Để tìm tập hợp các bội chung của nhiều số, ta có thể:
1. Tìm BCNN của các số đó.
2. Tìm các bội của BCNN đó (nhân BCNN lần lượt với $0; 1; 2; 3; \\dots$).

### 4. Tính chất đặc biệt & Kiến thức bổ sung
- Nếu $a \\vdots b$ thì $\\text{BCNN}(a, b) = a$.
- Với mọi số tự nhiên $a$ (khác 0), ta có: $\\text{BCNN}(a, 1) = a$.
- $\\text{ƯCLN}(a, b) \\cdot \\text{BCNN}(a, b) = a \\cdot b$.
- Nếu $a \\vdots m$ và $a \\vdots n$ thì $a \\vdots \\text{BCNN}(m, n)$.

### 5. Vận dụng BCNN để quy đồng mẫu các phân số
Để cộng, trừ các phân số không cùng mẫu, ta thường lấy mẫu chung là **BCNN** của các mẫu số.
1. Tìm $\\text{BCNN}$ của các mẫu số.
2. Quy đồng mẫu số các phân số dựa vào $\\text{BCNN}$ vừa tìm.
3. Thực hiện phép tính cộng, trừ tử số và giữ nguyên mẫu số chung.

### 6. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Tìm BCNN và tập hợp BC**
- **Đặc điểm nhận dạng:** Đề bài yêu cầu tìm $\\text{BCNN}$ hoặc các bội chung trong một khoảng cho trước của các số.
- **Ví dụ:** Tìm $\\text{BCNN}(18, 24, 40)$, từ đó suy ra các bội chung nhỏ hơn 900 của ba số này.
- **Hướng dẫn giải:**
  1. Phân tích ra thừa số nguyên tố:
     $18 = 2 \\cdot 3^2$; $24 = 2^3 \\cdot 3$; $40 = 2^3 \\cdot 5$
  2. Thừa số nguyên tố chung và riêng là 2, 3 và 5. Lấy số mũ lớn nhất: $2^3, 3^2, 5^1$. 
     $\\Rightarrow \\text{BCNN}(18, 24, 40) = 2^3 \\cdot 3^2 \\cdot 5 = 8 \\cdot 9 \\cdot 5 = 360$
  3. $\\text{BC}(18, 24, 40) = \\text{B}(360) = \\{0; 360; 720; 1080; \\dots\\}$. 
     Các bội chung nhỏ hơn 900 là: $0; 360; 720$.

**Dạng 2: Bài toán thực tế liên quan đến BCNN**
- **Đặc điểm nhận dạng:** Các bài toán về chu kỳ lặp lại (xe buýt xuất bến, lịch bảo dưỡng, trực nhật...), chia nhóm mà dư (hoặc thiếu) một số lượng nhất định, tìm số lượng nhỏ nhất thỏa mãn nhiều điều kiện chia hết.
- **Ví dụ:** Học sinh lớp 6A khi xếp thành 3 hàng, 4 hàng hay 9 hàng đều vừa đủ. Biết số học sinh của lớp từ 30 đến 40. Tính số học sinh.
- **Hướng dẫn giải:**
  1. Gọi số học sinh là $x$ ($30 \\le x \\le 40$). Vì xếp 3, 4, 9 hàng vừa đủ nên $x \\vdots 3, x \\vdots 4, x \\vdots 9$. Suy ra $x \\in \\text{BC}(3, 4, 9)$.
  2. $\\text{BCNN}(3, 4, 9) = 2^2 \\cdot 3^2 = 36$.
  3. $\\text{BC}(3, 4, 9) = \\text{B}(36) = \\{0; 36; 72; \\dots\\}$.
  4. Kết hợp điều kiện $30 \\le x \\le 40$, ta có $x = 36$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn giữa BCNN và ƯCLN trong cách lấy thừa số và số mũ:** 
>   - Sai: Khi tìm BCNN, chỉ lấy thừa số chung và lấy số mũ nhỏ nhất.
>   - Đúng: Khi tìm BCNN, phải lấy **cả thừa số chung và riêng**, với **số mũ lớn nhất**.
> - **Quên phần tử 0 khi liệt kê tập hợp BC:**
>   - Sai: $\\text{BC}(4, 6) = \\{12; 24; 36; \\dots\\}$
>   - Đúng: Bội chung luôn bắt đầu từ 0. $\\text{BC}(4, 6) = \\{0; 12; 24; 36; \\dots\\}$. Lưu ý BCNN là số nhỏ nhất **khác 0**.` },
        { title: "Bài tập cuối chương II", summary: commonSummaryPrefix + `### 1. Quan hệ chia hết và Dấu hiệu chia hết
- **Quan hệ chia hết:** Cho $a, b \\in \\mathbb{N}, b \\neq 0$. Nếu $a = k \\cdot b$ ($k \\in \\mathbb{N}$) thì $a$ chia hết cho $b$ (kí hiệu $a \\vdots b$). Khi đó $a$ là bội của $b$, $b$ là ước của $a$.
- **Tính chất chia hết của một tổng/hiệu:** 
  - Nếu $a \\vdots m$ và $b \\vdots m$ thì $(a+b) \\vdots m$ và $(a-b) \\vdots m$.
  - Nếu $a \\not\\vdots m$ và $b \\vdots m$ thì $(a+b) \\not\\vdots m$.
- **Dấu hiệu chia hết:**
  - Chia hết cho $2$: Chữ số tận cùng là $0, 2, 4, 6, 8$.
  - Chia hết cho $5$: Chữ số tận cùng là $0$ hoặc $5$.
  - Chia hết cho $3$: Tổng các chữ số chia hết cho $3$.
  - Chia hết cho $9$: Tổng các chữ số chia hết cho $9$.

### 2. Số nguyên tố, Hợp số và Phân tích ra thừa số nguyên tố
- **Số nguyên tố** là số tự nhiên lớn hơn $1$, chỉ có hai ước là $1$ và chính nó (Ví dụ: $2, 3, 5, 7, 11\\dots$).
- **Hợp số** là số tự nhiên lớn hơn $1$, có nhiều hơn hai ước (Ví dụ: $4, 6, 8, 9, 10\\dots$).
- Số $0$ và số $1$ không là số nguyên tố và cũng không là hợp số.
- **Phân tích một số ra thừa số nguyên tố:** Là viết số đó dưới dạng một tích các thừa số nguyên tố (thường viết gọn bằng luỹ thừa).

### 3. ƯCLN và BCNN
- **Ước chung lớn nhất (ƯCLN):** 
  - Cách tìm: Phân tích các số ra thừa số nguyên tố $\\rightarrow$ Chọn thừa số **chung** $\\rightarrow$ Lấy số mũ **nhỏ nhất**.
  - Ứng dụng: Tìm tập hợp ƯC, đưa phân số về dạng tối giản, bài toán chia đều (chia tổ, chia phần thưởng).
- **Bội chung nhỏ nhất (BCNN):**
  - Cách tìm: Phân tích các số ra thừa số nguyên tố $\\rightarrow$ Chọn thừa số **chung và riêng** $\\rightarrow$ Lấy số mũ **lớn nhất**.
  - Ứng dụng: Tìm tập hợp BC, quy đồng mẫu số, bài toán về chu kỳ lặp lại (xuất bến, trực nhật, xếp hàng dư/thiếu).
- **Tính chất liên hệ:** $\\text{ƯCLN}(a,b) \\cdot \\text{BCNN}(a,b) = a \\cdot b$.

### 4. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Vận dụng dấu hiệu chia hết và phân tích cấu tạo số**
- **Đặc điểm:** Yêu cầu tìm các chữ số chưa biết để một số thoả mãn tính chia hết cho $2, 3, 5, 9$.
- **Ví dụ:** Tìm các chữ số $x, y$ để số $M = \\overline{32x5y}$ chia hết cho cả $2, 5$ và $9$.
- **Hướng dẫn giải:**
  1. Để $M \\vdots 2$ và $M \\vdots 5$, chữ số tận cùng $y$ bắt buộc phải là $0$. Khi đó $M = \\overline{32x50}$.
  2. Để $M \\vdots 9$, tổng các chữ số phải chia hết cho $9$. Ta có: $(3 + 2 + x + 5 + 0) \\vdots 9 \\Rightarrow (10 + x) \\vdots 9$.
  3. Vì $x$ là chữ số ($0 \\le x \\le 9$) nên $x = 8$. Vậy $x = 8$ và $y = 0$, số cần tìm là $32850$.

**Dạng 2: Bài toán thực tế sử dụng ƯCLN và BCNN**
- **Đặc điểm:** 
  - Tìm **ƯCLN** cho các bài toán "chia đều thành các phần lớn nhất".
  - Tìm **BCNN** cho các bài toán "sự kiện lặp lại" hoặc "tìm số lượng nhỏ nhất xếp vừa đủ hàng".
- **Ví dụ (Bài toán BCNN):** Khối 6 có khoảng $200$ đến $300$ học sinh. Xếp hàng $10, 12, 15$ đều thừa $5$ em. Tính số học sinh khối 6.
- **Hướng dẫn giải:**
  1. Gọi số học sinh là $x$ ($200 \\le x \\le 300$). Khi xếp hàng $10, 12, 15$ đều thừa $5$, nghĩa là $(x - 5)$ chia hết cho $10, 12, 15$.
  2. Do đó, $(x - 5) \\in \\text{BC}(10, 12, 15)$.
  3. Phân tích ra thừa số nguyên tố: $10 = 2 \\cdot 5$; $12 = 2^2 \\cdot 3$; $15 = 3 \\cdot 5$. Suy ra $\\text{BCNN}(10, 12, 15) = 2^2 \\cdot 3 \\cdot 5 = 60$.
  4. Tập hợp $\\text{BC}(10, 12, 15) = \\{0; 60; 120; 180; 240; 300; \\dots\\}$.
  5. Vì $200 \\le x \\le 300 \\Rightarrow 195 \\le x - 5 \\le 295$. Chọn $x - 5 = 240 \\Rightarrow x = 245$. Vậy số học sinh là $245$ em.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn giữa ƯCLN và BCNN:** 
>   - Sai: Tìm số lớn nhất chia hết cho các số đã cho bằng ƯCLN.
>   - Đúng: Số chia hết cho các số đã cho là Bội chung (BC). Số bị các số đã cho chia hết là Ước chung (ƯC).
> - **Xác định sai số dư trong bài toán xếp hàng:**
>   - Sai: Bài toán "xếp hàng thiếu $1$ người" $\\Rightarrow x + 1$ là bội chung. Học sinh lại làm $x - 1$ là bội chung.
>   - Đúng: Nếu "thừa" (dư) thì trừ đi phần dư: $x - r \\in \\text{BC}$. Nếu "thiếu" thì cộng thêm: $x + r \\in \\text{BC}$.
> - **Lỗi kết luận về số nguyên tố/hợp số:**
>   - Sai: "Số chẵn thì luôn là hợp số", "số lẻ thì luôn là số nguyên tố".
>   - Đúng: Số $2$ là chẵn nhưng là số nguyên tố. Số $9$ là lẻ nhưng là hợp số. Số $0, 1$ không thuộc nhóm nào.` }
      ]
    },
    { 
      title: "Chương III: Số nguyên", 
      lessons: [
        { title: "Bài 13: Tập hợp các số nguyên", summary: commonSummaryPrefix + `### 1. Số nguyên âm, số nguyên dương và Tập hợp số nguyên
- Các số tự nhiên (khác $0$) $1; 2; 3; 4; \\dots$ còn được gọi là các **số nguyên dương**. Đôi khi ta viết thêm dấu "$+$" phía trước, ví dụ: $+6$.
- Các số $-1; -2; -3; \\dots$ gọi là các **số nguyên âm**.
- Tập hợp $\\mathbb{Z}$ gồm các số nguyên âm, số $0$ và các số nguyên dương gọi là **tập hợp số nguyên**. 
  $$\\mathbb{Z} = \\{\\dots; -4; -3; -2; -1; 0; 1; 2; 3; 4; \\dots\\}$$
- **Lưu ý:** Số $0$ không là số nguyên dương, cũng không là số nguyên âm.

### 2. Ý nghĩa của số âm trong thực tế
Số dương và số âm được dùng để biểu thị các đại lượng đối lập nhau hoặc có hướng ngược nhau:
- **Số dương biểu thị:** Nhiệt độ trên $0^\\circ\\text{C}$, độ cao trên mực nước biển, số tiền hiện có, số tiền lãi, độ viễn thị.
- **Số âm biểu thị:** Nhiệt độ dưới $0^\\circ\\text{C}$, độ cao dưới mực nước biển, số tiền còn nợ, số tiền lỗ, độ cận thị.

### 3. Trục số
- Ta biểu diễn các số nguyên trên một trục có điểm gốc $O$ (biểu diễn số $0$).
- Chiều từ trái sang phải là **chiều dương** (mũi tên hướng sang phải); chiều ngược lại là **chiều âm**.
- Điểm biểu diễn số nguyên $a$ gọi là điểm $a$.
- Điểm biểu diễn số nguyên dương nằm **sau** (hoặc bên phải) gốc $O$. Điểm biểu diễn số nguyên âm nằm **trước** (hoặc bên trái) gốc $O$.

### 4. So sánh hai số nguyên
- Cho hai số nguyên $a$ và $b$. Trên trục số, nếu điểm $a$ nằm trước (bên trái) điểm $b$ thì số $a$ nhỏ hơn số $b$, kí hiệu $a < b$.
- Mọi số nguyên âm đều nhỏ hơn $0$, do đó nhỏ hơn mọi số nguyên dương.
- Nếu $a, b$ là hai số nguyên dương và $a > b$ thì $-a < -b$. (Số âm nào có phần số tự nhiên lớn hơn thì số âm đó nhỏ hơn).
- Kí hiệu $a \\le b$ có nghĩa là "$a < b$ hoặc $a = b$". Kí hiệu $a \\ge b$ có nghĩa là "$a > b$ hoặc $a = b$".

### 5. Phân loại dạng bài & Ví dụ mẫu
**Dạng 1: Đọc, viết và ý nghĩa của số nguyên trong thực tế**
- **Đặc điểm:** Sử dụng số âm hoặc dương để mô tả các tình huống thực tế hoặc ngược lại.
- **Ví dụ:** Hãy dùng số nguyên âm để diễn tả lại thông tin sau: "Kỉ lục thế giới về môn lặn là $318\\text{ m}$ dưới mực nước biển".
- **Hướng dẫn giải:** Nhận biết đại lượng "dưới mực nước biển" là đại lượng được biểu thị bằng số nguyên âm. Viết lại thông tin: Kỉ lục thế giới về môn lặn là $-318\\text{ m}$.

**Dạng 2: Biểu diễn trên trục số và khoảng cách**
- **Đặc điểm:** Xác định vị trí điểm trên trục số hoặc vị trí mới khi di chuyển.
- **Ví dụ:** Con kiến xuất phát từ gốc $O$ và đi $16$ đơn vị theo chiều âm. Hỏi con kiến dừng lại ở điểm nào?
- **Hướng dẫn giải:** Điểm xuất phát là $O$ (số $0$). Chiều âm là chiều ngược với chiều dương (sang trái). Di chuyển $16$ đơn vị theo chiều âm, kiến sẽ ở vị trí biểu diễn số $-16$.

**Dạng 3: So sánh số nguyên và Liệt kê phần tử tập hợp**
- **Đặc điểm:** So sánh số nguyên âm với số nguyên dương, hoặc hai số nguyên âm với nhau. Tìm các số nguyên thỏa mãn bất đẳng thức.
- **Ví dụ:** So sánh $-387$ và $-378$.
- **Hướng dẫn giải:** So sánh hai số nguyên dương tương ứng: $387 > 378$. Áp dụng quy tắc "nếu $a > b$ thì $-a < -b$". Do đó, $-387 < -378$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**
> - **Nhầm lẫn số 0 là số âm hoặc dương:** 
>   - Sai: Số $0$ là số nguyên dương bé nhất.
>   - Đúng: Số $0$ **không là** số nguyên dương, cũng **không là** số nguyên âm. Số nguyên dương bé nhất là $1$.
> - **So sánh hai số nguyên âm:** 
>   - Sai: Nghĩ rằng số lớn hơn thì có giá trị lớn hơn. Ví dụ $-15 > -12$.
>   - Đúng: Số âm nào có phần số tự nhiên **lớn hơn** thì giá trị của số đó **nhỏ hơn**. Ví dụ $15 > 12$ nên $-15 < -12$.
> - **Ý nghĩa quãng đường và tọa độ:**
>   - Sai: Cho rằng "Kiến A bò $-15$ đơn vị" nghĩa là kiến A bò quãng đường ngắn hơn kiến B bò $12$ đơn vị (do $-15 < 12$).
>   - Đúng: Dấu trừ chỉ **hướng** (chiều âm), không phải độ dài. Quãng đường kiến A bò là $15$ đơn vị, dài hơn quãng đường kiến B bò ($12$ đơn vị).` },
        { title: "Bài 14: Phép cộng và phép trừ số nguyên", summary: commonSummaryPrefix + `### 1. Cấu tạo số nguyên và Số đối

- Mỗi số nguyên gồm hai phần: phần dấu và phần số tự nhiên. Ví dụ: số $-3$ có phần dấu là "$-$" và phần số tự nhiên là $3$.
- **Hai số nguyên đối nhau:**

- Hai số đối nhau có phần số tự nhiên giống nhau nhưng khác nhau về dấu. Số đối của số nguyên $x$ kí hiệu là $-x$.
- Số đối của một số nguyên dương là một số nguyên âm, và ngược lại. Số đối của $0$ là chính nó.
- Số đối của số đối của một số là chính số đó: $-(-x) = x$.

### 2. Quy tắc cộng hai số nguyên

- **Cộng hai số nguyên âm:** Cộng phần số tự nhiên của chúng với nhau rồi đặt dấu "$-$" trước kết quả. (Tổng của hai số nguyên âm luôn là một số nguyên âm).
- **Cộng hai số nguyên đối nhau:** Tổng của hai số đối nhau luôn bằng $0$.
- **Cộng hai số nguyên khác dấu (không đối nhau):** Tìm hiệu của hai phần số tự nhiên (số lớn trừ số nhỏ), rồi đặt trước kết quả dấu của số có phần số tự nhiên lớn hơn.
- **Cộng với 0:** $a + 0 = 0 + a = a$.

### 3. Quy tắc trừ hai số nguyên

- Muốn trừ số nguyên $a$ cho số nguyên $b$, ta cộng $a$ với số đối của $b$: 
$$a - b = a + (-b)$$
- Từ phép trừ có thể chuyển đổi thành phép cộng, do đó mọi phép trừ đều có thể thực hiện được trong tập hợp số nguyên $\\mathbb{Z}$.

### 4. Tính chất của phép cộng

- **Giao hoán:** $a + b = b + a$.
- **Kết hợp:** $a + (b + c) = (a + b) + c$.
- **Lưu ý:** Nhờ các tính chất này, trong một biểu thức có nhiều số hạng, ta có thể đổi chỗ hoặc nhóm các số hạng một cách tùy ý để tính toán hợp lí hơn (thường ghép các số đối nhau hoặc các số tạo thành số tròn chục, tròn trăm).

**Dạng 1: Thực hiện phép cộng, trừ số nguyên**
**Đặc điểm nhận dạng:** Biểu thức chứa các phép cộng, trừ giữa các số âm và dương. Yêu cầu tính giá trị hoặc tính giá trị của biểu thức chứa biến khi cho trước giá trị của biến.

**Ví dụ 1:** Tính giá trị của biểu thức $A = x + (-27) - 234$ khi $x = -9$.

**Hướng dẫn giải:**

- **Bước 1 (Thay số):** Thay $x = -9$ vào biểu thức $A$: 
$$A = (-9) + (-27) - 234$$
- **Bước 2 (Thực hiện từ trái qua phải):** Cộng hai số nguyên âm $(-9) + (-27)$. Ta cộng hai phần số tự nhiên là $9 + 27 = 36$ và thêm dấu trừ, được $-36$.
- **Bước 3 (Thực hiện phép trừ):** Biểu thức trở thành $-36 - 234$. Áp dụng quy tắc trừ thành cộng số đối:
$$-36 - 234 = (-36) + (-234)$$
Tiếp tục cộng hai số nguyên âm: $-(36 + 234) = -270$.
- **Kết luận:** $A = -270$.

**Dạng 2: Tính tổng hợp lí (nhóm các số hạng)**
**Đặc điểm nhận dạng:** Biểu thức tổng có nhiều số hạng, yêu cầu tính nhanh.

**Ví dụ 2:** Tính hợp lí tổng sau: $251 + (-144) + (-151) + (-216)$.

**Hướng dẫn giải:**

- **Bước 1 (Đổi chỗ):** Dùng tính chất giao hoán để đưa các số hạng có phần đuôi dễ triệt tiêu hoặc tròn chục lại gần nhau:
$$251 + (-151) + (-144) + (-216)$$
- **Bước 2 (Nhóm):** Dùng tính chất kết hợp:
$$[251 + (-151)] + [(-144) + (-216)]$$
- **Bước 3 (Tính toán từng nhóm):**

- Nhóm 1 (Cộng khác dấu): $251 + (-151) = +(251 - 151) = 100$.
- Nhóm 2 (Cộng cùng dấu âm): $(-144) + (-216) = -(144 + 216) = -360$.

- **Bước 4 (Kết quả cuối):** 
$$100 + (-360) = -(360 - 100) = -260$$

**Dạng 3: Bài toán thực tiễn**
**Đặc điểm nhận dạng:** Đề bài mô tả sự thay đổi của nhiệt độ (tăng, giảm), độ cao, số dư tài khoản ngân hàng, v.v. bằng văn bản.

**Ví dụ 3:** Nhiệt độ ban ngày ở đỉnh Mẫu Sơn là $-3^\\circ\\text{C}$. Nếu ban đêm giảm thêm $5^\\circ\\text{C}$ nữa thì nhiệt độ ở đó sẽ là bao nhiêu?

**Hướng dẫn giải:**

- **Bước 1 (Xác định phép toán):** Nhiệt độ ban đầu là $-3$. "Giảm thêm $5^\\circ\\text{C}$" tương đương với việc thực hiện phép trừ $5$, hoặc cộng với số âm $(-5)$.
- **Bước 2 (Lập biểu thức):** Nhiệt độ ban đêm là: $(-3) - 5$ hoặc $(-3) + (-5)$.
- **Bước 3 (Tính toán):** $(-3) + (-5) = -(3 + 5) = -8$.
- **Kết luận:** Nhiệt độ ban đêm là $-8^\\circ\\text{C}$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**

> - **Sai dấu khi cộng hai số khác dấu:**
> Sai: $(-12) + 9 = 3$ (Học sinh lấy $12 - 9 = 3$ và quên xét dấu). Hoặc $(-12) + 9 = -(12 + 9) = -21$.
> Đúng: Phần số tự nhiên $12 > 9$ nên kết quả mang dấu "$-$" của số $-12$. Tính $-(12 - 9) = -3$.

> - **Lỗi khi trừ số nguyên âm:**
> Sai: $5 - (-3) = 5 - 3 = 2$ hoặc $5 - (-3) = -8$.
> Đúng: Phép trừ cho số âm sẽ trở thành phép cộng số đối (số dương). $5 - (-3) = 5 + 3 = 8$. (Trừ đi nợ nghĩa là được thêm).

> - **Xác định sai số đối:**
> Sai: Số đối của $-(-5)$ là $-5$.
> Đúng: Số $-(-5)$ chính là $5$. Do đó, số đối của nó phải là $-5$. Cần làm gọn dấu trước khi kết luận.` },
        { title: "Bài 15: Quy tắc dấu ngoặc", summary: commonSummaryPrefix + `### 1. Tổng đại số

- Dãy tính chỉ gồm phép cộng và phép trừ cũng gọi là một **tổng** (hay tổng đại số).
- Các số âm (hay dương) trong một dãy tính thường được viết trong dấu ngoặc. Nhờ quy tắc cộng hay trừ số nguyên, ta có thể viết dãy tính dưới dạng không có dấu ngoặc.
- Ví dụ: $2 + (-9) = 2 - 9$; \\quad $(-2) - (-9) = -2 + 9$; \\quad $3 - (+7) + (-4) - (-8) = 3 - 7 - 4 + 8$.

### 2. Quy tắc dấu ngoặc

- **Khi bỏ dấu ngoặc có dấu "+" đằng trước:** Ta **giữ nguyên** dấu của các số hạng trong ngoặc.
$$+(a - b + c) = a - b + c$$
- **Khi bỏ dấu ngoặc có dấu "$-$" đằng trước:** Ta phải **đổi dấu tất cả** các số hạng trong dấu ngoặc: dấu "$+$" đổi thành "$-$" và dấu "$-$" đổi thành "$+$".
$$-(a - b + c) = -a + b - c$$

### 3. Các tính chất khi biến đổi tổng đại số
Áp dụng các tính chất giao hoán, kết hợp và quy tắc dấu ngoặc, trong một biểu thức ta có thể:

- **Thay đổi tùy ý vị trí các số hạng** kèm theo dấu của chúng:
$$a - b - c = -b + a - c = -c - b + a$$
- **Đặt dấu ngoặc để nhóm các số hạng** một cách tùy ý:

- Nếu trước dấu ngoặc là dấu "$+$" thì giữ nguyên dấu các số hạng trong ngoặc.
- Nếu trước dấu ngoặc là dấu "$-$" thì phải đổi dấu tất cả các số hạng trong ngoặc.
$$a - b - c = (a - b) - c = a - (b + c)$$

**Dạng 1: Bỏ dấu ngoặc rồi tính tổng**
**Đặc điểm nhận dạng:** Biểu thức chứa nhiều dấu ngoặc với các phép cộng, trừ đan xen. Yêu cầu tính giá trị hoặc tính hợp lí bằng cách triệt tiêu các số đối nhau.

**Ví dụ 1:** Bỏ dấu ngoặc rồi tính các tổng sau: $A = (72 - 1956) - (-1956 + 28)$.

**Hướng dẫn giải:**

- **Bước 1:** Bỏ dấu ngoặc thứ nhất (trước ngoặc ngầm hiểu là dấu $+$), giữ nguyên dấu các số hạng: $72 - 1956$.
- **Bước 2:** Bỏ dấu ngoặc thứ hai (trước ngoặc là dấu $-$), đổi dấu tất cả các số hạng bên trong: $- (-1956 + 28) = +1956 - 28$.
- **Bước 3:** Ghép biểu thức lại: $A = 72 - 1956 + 1956 - 28$.
- **Bước 4:** Dùng tính chất giao hoán và kết hợp để nhóm: $A = (72 - 28) + (-1956 + 1956)$.
- **Bước 5:** Tính kết quả: $A = 44 + 0 = 44$.

**Dạng 2: Thay giá trị của biến vào biểu thức**
**Đặc điểm nhận dạng:** Bài toán cho biểu thức chứa biến $x, y$ và yêu cầu tính giá trị khi biết $x, y$. Nên rút gọn biểu thức (bỏ ngoặc) trước khi thay số nếu biểu thức phức tạp, hoặc thay trực tiếp rồi tính.

**Ví dụ 2:** Tính giá trị của biểu thức $P = (23 + x) - (56 - x)$ với $x = 7$.

**Hướng dẫn giải:**

- **Cách 1 (Rút gọn trước):**

- Bỏ dấu ngoặc: $P = 23 + x - 56 + x$.
- Thu gọn: $P = (23 - 56) + (x + x) = -33 + 2x$.
- Thay $x = 7$: $P = -33 + 2 \\cdot 7 = -33 + 14 = -19$.

- **Cách 2 (Thay trực tiếp):**

- $P = (23 + 7) - (56 - 7)$.
- $P = 30 - 49 = -19$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**

> - **Đổi dấu không triệt để khi bỏ ngoặc có dấu "$-$" phía trước:**
> Sai: $-(a - b + c) = -a - b + c$. (Học sinh chỉ đổi dấu số hạng đầu tiên).
> Đúng: $-(a - b + c) = -a + b - c$. (Phải đổi dấu TẤT CẢ các số hạng bên trong ngoặc).
> - **Lỗi khi nhóm các số hạng vào trong ngoặc có dấu "$-$" phía trước:**
> Sai: $a - b - c = a - (b - c)$.
> Đúng: $a - b - c = a - (b + c)$. Khi đưa các số hạng vào trong ngoặc có dấu $-$ phía trước, phải đổi dấu chúng.
> - **Lỗi di chuyển số hạng mà không mang theo dấu:**
> Sai: $50 - 90 - 30 = 50 - 30 - 90 = 20 - 90 = -70$. (Trường hợp này vô tình đúng, nhưng nếu $-a + b$ học sinh hay nhầm $a + b$). Ví dụ: $-10 + 20 \\rightarrow 10 + 20$.
> Đúng: Khi đổi vị trí, **phải mang theo dấu** đứng ngay trước số hạng đó: $-10 + 20 = 20 - 10 = 10$.` },
        { title: "Bài 16: Phép nhân số nguyên", summary: commonSummaryPrefix + `### 1. Quy tắc nhân hai số nguyên

- **Nhân hai số nguyên âm (cùng dấu):** Tích của hai số nguyên âm luôn là một số nguyên dương. Ta nhân phần số tự nhiên của hai số đó với nhau.
$$(-m) \\cdot (-n) = m \\cdot n \\quad (\\text{với } m, n \\in \\mathbb{N}^*)$$
- **Nhân hai số nguyên khác dấu:** Tích của hai số nguyên khác dấu luôn là một số nguyên âm. Ta nhân phần số tự nhiên của hai số đó với nhau rồi đặt dấu "$-$" trước kết quả nhận được.
$$m \\cdot (-n) = (-m) \\cdot n = -(m \\cdot n) \\quad (\\text{với } m, n \\in \\mathbb{N}^*)$$
- **Nhân với 0:** Tích của một số nguyên với 0 luôn bằng 0.
$$a \\cdot 0 = 0 \\cdot a = 0 \\quad (\\text{với } a \\in \\mathbb{Z})$$

### 2. Dấu của tích nhiều thừa số
Một tích nhiều thừa số khác 0:

- Sẽ mang **dấu âm ($-$)** nếu trong tích đó có một **số lẻ** các thừa số mang dấu âm.
- Sẽ mang **dấu dương ($+$)** nếu trong tích đó có một **số chẵn** các thừa số mang dấu âm.

### 3. Tính chất của phép nhân số nguyên
Phép nhân các số nguyên cũng có các tính chất tương tự phép nhân số tự nhiên:

- **Giao hoán:** $a \\cdot b = b \\cdot a$.
- **Kết hợp:** $a \\cdot (b \\cdot c) = (a \\cdot b) \\cdot c$.
- **Phân phối đối với phép cộng và phép trừ:** 
$$a \\cdot (b + c) = a \\cdot b + a \\cdot c$$
$$a \\cdot (b - c) = a \\cdot b - a \\cdot c$$

**Dạng 1: Tính hợp lí giá trị của biểu thức**
**Đặc điểm nhận dạng:** Biểu thức chứa nhiều phép nhân, phép cộng, phép trừ các số nguyên. Có các thừa số chung hoặc các cặp số có thể nhóm lại để tạo thành số tròn chục, tròn trăm.

**Ví dụ 1:** Tính một cách hợp lí: $P = (-4) \\cdot (-29) + 9 \\cdot (-4)$.

**Hướng dẫn giải:**

- Nhận xét cả hai tích đều có chứa thừa số chung là $(-4)$.
- Áp dụng tính chất phân phối của phép nhân đối với phép cộng:
$$P = (-4) \\cdot [(-29) + 9]$$
- Thực hiện phép tính trong ngoặc (cộng hai số nguyên khác dấu):
$$P = (-4) \\cdot (-20)$$
- Thực hiện phép nhân hai số nguyên cùng dấu âm (kết quả mang dấu dương):
$$P = 4 \\cdot 20 = 80$$

**Dạng 2: Bài toán tìm x trong tích bằng 0**
**Đặc điểm nhận dạng:** Biểu thức dạng $A \\cdot B = 0$.

**Ví dụ 2:** Tìm số nguyên $x$, nếu $(x - 12) \\cdot (5 + x) = 0$.

**Hướng dẫn giải:**

- Tích hai thừa số bằng $0$ chỉ xảy ra khi một trong hai thừa số bằng $0$.
- Chia làm 2 trường hợp:

- *Trường hợp 1:* $x - 12 = 0 \\Rightarrow x = 12$.
- *Trường hợp 2:* $5 + x = 0 \\Rightarrow x = -5$.

- Kết luận: Các giá trị cần tìm của $x$ là $12$ và $-5$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**

> - **Sai sót khi nhân hai số nguyên âm:**
> Sai: $(-3) \\cdot (-7) = -21$. (Học sinh thường quen với phép cộng số nguyên âm nên nhầm lẫn giữ nguyên dấu âm).
> Đúng: $(-3) \\cdot (-7) = 21$. (Tích hai số nguyên cùng dấu luôn là số dương).
> - **Nhầm lẫn tính chất phân phối:**
> Sai: $a \\cdot (b \\cdot c) = a \\cdot b + a \\cdot c$.
> Đúng: $a \\cdot (b \\cdot c) = (a \\cdot b) \\cdot c$ (Đây là tính chất kết hợp). Tính chất phân phối chỉ dùng khi trong ngoặc là phép **cộng** hoặc **trừ**: $a \\cdot (b \\pm c) = a \\cdot b \\pm a \\cdot c$.
> - **Quên đổi dấu khi nhóm các số hạng mang dấu âm:**
> Sai: $(-157) \\cdot 127 - 157 \\cdot (-316) = (-157) \\cdot (127 - 316)$.
> Đúng: Cần xác định đúng thừa số chung. Ở đây nếu lấy thừa số chung là $-157$, ta có: $(-157) \\cdot 127 + (-157) \\cdot (-316) = (-157) \\cdot [127 + (-316)]$.` },
        { title: "Bài 17: Phép chia hết. Ước và bội của một số nguyên", summary: commonSummaryPrefix + `### 1. Phép chia hết đối với số nguyên

- Cho $a, b \\in \\mathbb{Z}$ với $b \\neq 0$. Nếu có số nguyên $q$ sao cho $a = b \\cdot q$ thì ta có phép chia hết $a : b = q$.
- Khi đó ta nói $a$ chia hết cho $b$, kí hiệu là $a \\vdots b$.
- **Dấu của thương:** 

- $(+) : (+) \\rightarrow (+)$ (Hai số cùng dấu dương cho thương dương)
- $(-) : (-) \\rightarrow (+)$ (Hai số cùng dấu âm cho thương dương)
- $(+) : (-) \\rightarrow (-)$ (Hai số khác dấu cho thương âm)
- $(-) : (+) \\rightarrow (-)$ (Hai số khác dấu cho thương âm)

### 2. Ước và bội của một số nguyên

- Khi $a \\vdots b$ ($a, b \\in \\mathbb{Z}, b \\neq 0$), ta gọi $a$ là một **bội** của $b$ và $b$ là một **ước** của $a$.
- **Nhận xét quan trọng:**

- Nếu $a$ là một bội của $b$ thì $-a$ cũng là một bội của $b$.
- Nếu $b$ là một ước của $a$ thì $-b$ cũng là một ước của $a$.
- Nếu $d$ vừa là ước của $a$, vừa là ước của $b$ thì $d$ gọi là một **ước chung** của $a$ và $b$.

### 3. Cách tìm ước và bội của một số nguyên

- **Tìm ước:** Muốn tìm tất cả các ước của một số nguyên $a$, ta tìm các ước **dương** của $a$ trước, sau đó lấy thêm các **số đối** của chúng.
- **Tìm bội:** Tương tự, tìm các bội không âm rồi bổ sung thêm các số đối của chúng. Tập hợp bội của số nguyên mở rộng ra cả số âm, số 0 và số dương.

**Dạng 1: Thực hiện phép chia hết của số nguyên**
**Đặc điểm nhận dạng:** Thực hiện tính toán $a : b$ với chú ý về dấu của kết quả.

**Ví dụ 1:** Thực hiện các phép chia sau: 
a) $(-63) : 9$ 
b) $(-528) : (-12)$

**Hướng dẫn giải:**

- Xét dấu của phép chia. Phép chia ở câu a) là phép chia hai số **khác dấu** nên thương mang dấu **âm**.
$$ (-63) : 9 = -(63 : 9) = -7 $$
- Phép chia ở câu b) là phép chia hai số **cùng dấu âm** nên thương mang dấu **dương**.
$$ (-528) : (-12) = +(528 : 12) = 44 $$

**Dạng 2: Tìm ước, bội của số nguyên**
**Đặc điểm nhận dạng:** Liệt kê các phần tử thuộc tập hợp ước hoặc tập hợp bội của số nguyên (chú ý lấy cả phần tử âm).

**Ví dụ 2:** Tìm tất cả các ước của $-9$.

**Hướng dẫn giải:**

- Tìm các ước **dương** của giá trị tuyệt đối của $-9$ (tức là 9). Các ước dương của 9 là $1; 3; 9$.
- Bổ sung thêm các **số đối** của các ước vừa tìm được: $-1; -3; -9$.
- Tập hợp tất cả các ước của $-9$ là: $\\text{Ư}(-9) = \\{1; -1; 3; -3; 9; -9\\}$.

**Dạng 3: Áp dụng tính chất chia hết để tìm ẩn**
**Đặc điểm nhận dạng:** Tìm số nguyên $x$ thỏa mãn một đa thức chứa $x$ chia hết cho một đa thức khác chứa $x$.

**Ví dụ 3:** Tìm số nguyên $x$ sao cho $x + 5$ chia hết cho $x$.

**Hướng dẫn giải:**

- Ta có: $(x + 5) \\vdots x$.
- Vì bản thân $x \\vdots x$, nên theo tính chất chia hết của một tổng, phần dư còn lại cũng phải chia hết cho $x$.
- Suy ra: $5 \\vdots x$. Điều này có nghĩa $x$ là một ước của $5$.
- Tìm các ước của 5: $\\text{Ư}(5) = \\{1; -1; 5; -5\\}$.
- Kết luận: Các giá trị nguyên của $x$ cần tìm là $1; -1; 5; -5$.

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**

> - **Thiếu ước âm hoặc bội âm:** 
> Sai: $\\text{Ư}(6) = \\{1; 2; 3; 6\\}$. (Đây là ước tự nhiên, không phải ước nguyên).
> Đúng: Khi đề bài yêu cầu tìm ước/bội của **số nguyên**, phải lấy cả số dương và số âm. $\\text{Ư}(6) = \\{1; -1; 2; -2; 3; -3; 6; -6\\}$.
> - **Nhầm dấu của thương:** 
> Sai: $(-100) : (-5) = -20$.
> Đúng: Hai số cùng dấu thì thương mang dấu dương. $(-100) : (-5) = 20$.
> - **Lỗi chia cho 0:** 
> Sai: Cố gắng tìm giá trị $a : 0$.
> Đúng: Phép chia luôn kèm điều kiện **số chia khác 0**. Số $0$ không thể là ước của bất kì số nào.` },
        { title: "Bài tập cuối chương III", summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

### 1. Tập hợp số nguyên và So sánh

- **Tập hợp số nguyên** $\\mathbb{Z} = \\{\\dots; -3; -2; -1; 0; 1; 2; 3; \\dots\\}$ bao gồm số nguyên âm, số 0 và số nguyên dương.
- Số nguyên âm và số nguyên dương dùng để mô tả hai đại lượng đối lập hay có hướng ngược nhau (ví dụ: nhiệt độ trên/dưới $0^{\\circ}C$, lãi/lỗ, độ cao trên/dưới mực nước biển).
- **So sánh:** 

- Mọi số nguyên âm đều nhỏ hơn $0$ và nhỏ hơn mọi số nguyên dương.
- Với $n, m \\in \\mathbb{N}^*$, nếu $n > m$ thì $-n < -m$.
- Trên trục số, nếu $a < b$ thì điểm $a$ nằm trước (bên trái) điểm $b$.

### 2. Các phép toán trong tập số nguyên

- **Phép cộng:** 

- Hai số nguyên cùng dấu: $(-n) + (-m) = -(n + m)$ với $n, m \\in \\mathbb{N}^*$.
- Hai số nguyên khác dấu: Lấy phần số tự nhiên lớn trừ phần nhỏ, rồi đặt dấu của số có phần tự nhiên lớn hơn trước kết quả.
- Hai số đối nhau có tổng bằng $0$: $a + (-a) = 0$.

- **Phép trừ:** $a - b = a + (-b)$.
- **Phép nhân:** 

- Cùng dấu: $(-n) \\cdot (-m) = n \\cdot m$.
- Khác dấu: $n \\cdot (-m) = -(n \\cdot m)$ với $n, m \\in \\mathbb{N}^*$.
- Nhân với $0$: $a \\cdot 0 = 0 \\cdot a = 0$.

- **Phép chia hết và Ước, Bội:** 
Nếu $a = b \\cdot q$ ($b \\neq 0$) thì $a \\vdots b$. $a$ là bội của $b$, $b$ là ước của $a$.

### 3. Tính chất và Quy tắc dấu ngoặc

- **Tính chất phép cộng, nhân:** Giao hoán ($a+b=b+a$; $ab=ba$), Kết hợp ($a+(b+c)=(a+b)+c$; $a(bc)=(ab)c$), Phân phối ($a(b+c)=ab+ac$).
- **Quy tắc dấu ngoặc:** 

- Trước ngoặc có dấu "$+$": giữ nguyên dấu các số hạng.
- Trước ngoặc có dấu "$-$": đổi dấu tất cả các số hạng bên trong.

### 1.2 — Phân loại dạng bài \\& Ví dụ mẫu

**Dạng 1: Thực hiện phép tính, tính hợp lý**
**Đặc điểm nhận dạng:** Biểu thức chứa nhiều phép toán cộng, trừ, nhân, chia số nguyên. Yêu cầu tính giá trị hoặc tính nhanh bằng cách áp dụng tính chất, bỏ ngoặc.

**Ví dụ 1:** Tính hợp lí biểu thức: $A = 283 - 286 - 83 + 86$.

- **Bước 1:** Đổi chỗ các số hạng có phần đuôi giống nhau (nhớ mang theo dấu).
$$ A = 283 - 83 - 286 + 86 $$
- **Bước 2:** Nhóm các số hạng. Đặt dấu trừ trước ngoặc cho nhóm thứ hai.
$$ A = (283 - 83) - (286 - 86) $$
- **Bước 3:** Tính giá trị trong ngoặc và kết luận.
$$ A = 200 - 200 = 0 $$

**Ví dụ 2:** Tính một cách hợp lí: $B = 15 \\cdot (-236) + 15 \\cdot 235$.

- **Bước 1:** Nhận thấy thừa số $15$ chung, áp dụng tính chất phân phối.
$$ B = 15 \\cdot [(-236) + 235] $$
- **Bước 2:** Thực hiện phép cộng trong ngoặc.
$$ B = 15 \\cdot (-1) $$
- **Bước 3:** Thực hiện phép nhân.
$$ B = -15 $$

**Dạng 2: Bài toán thực tiễn sử dụng số nguyên**
**Đặc điểm nhận dạng:** Các bài toán về doanh thu (lãi/lỗ), nhiệt độ (tăng/giảm), điểm thưởng/phạt.

**Ví dụ 3:** Một công nhân làm một sản phẩm đạt chất lượng được $50\\,000$ đồng, làm một sản phẩm hỏng bị phạt $10\\,000$ đồng. Tháng qua người đó làm được $230$ sản phẩm đạt và $8$ sản phẩm hỏng. Hỏi công nhân đó nhận bao nhiêu tiền lương?

- **Bước 1:** Tính số tiền nhận được từ sản phẩm đạt: $230 \\cdot 50\\,000 = 11\\,500\\,000$ (đồng).
- **Bước 2:** Số tiền bị phạt biểu thị bằng số âm. Tính số tiền bị phạt: $8 \\cdot (-10\\,000) = -80\\,000$ (đồng).
- **Bước 3:** Tổng lương nhận được là tổng của hai khoản trên: 
$$ 11\\,500\\,000 + (-80\\,000) = 11\\,420\\,000 \\text{ (đồng)} $$

### 1.3 — Lỗi sai thường gặp

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**

> - **Sai sót khi bỏ dấu ngoặc có dấu trừ phía trước:**
> Sai: $-(a - b) = -a - b$
> Đúng: $-(a - b) = -a + b$. Phải đổi dấu **tất cả** các số hạng trong ngoặc.
> - **Nhầm lẫn dấu trong phép nhân và phép cộng:**
> Sai: $(-3) + (-5) = 15$ hoặc $(-3) \\cdot (-5) = -15$.
> Đúng: Tổng hai số âm là số âm: $(-3) + (-5) = -8$. Tích hai số âm là số dương: $(-3) \\cdot (-5) = 15$.
> - **Lỗi khi nhóm số hạng mang dấu âm (đặt dấu trừ ra ngoài):**
> Sai: $-15 - 25 = -(15 - 25)$.
> Đúng: Khi đưa các số âm vào trong ngoặc có dấu trừ phía trước, phải đổi dấu chúng: $-15 - 25 = -(15 + 25)$.` }
      ]
    },
    { 
      title: "Chương IV: Một số hình phẳng trong thực tiễn", 
      lessons: [
        { title: "Bài 18: Hình tam giác đều. Hình vuông. Hình lục giác đều", summary: commonSummaryPrefix + "### 1. Hình tam giác đều\n![Tam giác đều](data:image/svg+xml;utf8,%3Csvg%20width='100'%20height='86'%20viewBox='0%200%20100%2086'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon%20points='10,80%2090,80%2050,10'%20fill='none'%20stroke='blue'%20stroke-width='3'/%3E%3C/svg%3E)\n- **Định nghĩa:** Hình tam giác đều là hình có 3 cạnh bằng nhau và 3 góc bằng nhau.\n- **Đặc điểm:** \n  - Ba cạnh bằng nhau: $AB = BC = CA$.\n  - Ba góc bằng nhau, mỗi góc có số đo bằng $60^\\circ$.\n\n### 2. Hình vuông\n![Hình vuông](data:image/svg+xml;utf8,%3Csvg%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3E%3Crect%20x='10'%20y='10'%20width='80'%20height='80'%20fill='none'%20stroke='red'%20stroke-width='3'/%3E%3C/svg%3E)\n- **Định nghĩa:** Hình vuông là tứ giác có 4 cạnh bằng nhau và 4 góc vuông.\n- **Đặc điểm:**\n  - Bốn cạnh bằng nhau: $AB = BC = CD = DA$.\n  - Bốn góc bằng nhau, mỗi góc bằng $90^\\circ$.\n  - Hai đường chéo bằng nhau ($AC = BD$) và vuông góc với nhau tại trung điểm.\n\n### 3. Hình lục giác đều\n![Hình lục giác đều](data:image/svg+xml;utf8,%3Csvg%20width='100'%20height='100'%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon%20points='50,10%2084.6,30%2084.6,70%2050,90%2015.4,70%2015.4,30'%20fill='none'%20stroke='%23006400'%20stroke-width='3'/%3E%3C/svg%3E)\n- **Định nghĩa:** Hình lục giác đều là hình có 6 cạnh bằng nhau và 6 góc bằng nhau.\n- **Đặc điểm:**\n  - Sáu cạnh bằng nhau.\n  - Sáu góc bằng nhau, mỗi góc bằng $120^\\circ$.\n  - Ba đường chéo chính bằng nhau và cắt nhau tại tâm $O$.\n  - Hình lục giác đều được tạo thành từ 6 hình tam giác đều bằng nhau ghép lại quanh tâm $O$.\n\n### Các dạng bài tập tiêu biểu\n**Dạng 1: Nhận biết đặc điểm và các yếu tố của hình phẳng**\n- **Đặc điểm nhận dạng:** Đề bài yêu cầu chỉ ra tên hình, số lượng đỉnh, cạnh, đường chéo chính, đường chéo phụ hoặc số đo các góc.\n- **Ví dụ:** Cho hình lục giác đều $ABCDEF$. Kể tên các đường chéo chính và tính số đo mỗi góc của lục giác đều.\n  - Đường chéo chính của hình lục giác đều là đoạn thẳng nối hai đỉnh đối diện và đi qua tâm: $AD, BE, CF$.\n  - 6 góc của nó đều bằng nhau và mỗi góc có số đo là $120^\\circ$.\n\n**Dạng 2: Cắt ghép hình và tính toán chu vi cơ bản**\n- **Đặc điểm nhận dạng:** Tính chu vi hoặc tìm số lượng hình nhỏ được cắt/ghép từ hình lớn.\n- **Ví dụ:** Ghép 6 hình tam giác đều có độ dài cạnh là $4 \\text{ cm}$ thành một hình lục giác đều. Tính độ dài một đường chéo chính của hình lục giác đều đó.\n  - Một đường chéo chính của lục giác đều được tạo thành từ 2 cạnh của tam giác đều nối tiếp nhau đi qua tâm.\n  - Độ dài đường chéo chính = $2 \\times 4 = 8 \\text{ cm}$.\n\n> [!NOTE]\n> **Lưu ý — Sai lầm thường gặp:**\n> - **Nhầm lẫn giữa các loại đường chéo của lục giác đều:** Sai: Hình lục giác đều có 9 đường chéo và chúng đều bằng nhau. Đúng: Lục giác đều có 3 đường chéo chính (bằng nhau, cắt qua tâm) và 6 đường chéo phụ (ngắn hơn đường chéo chính).\n> - **Chưa phân biệt rõ hình vuông và hình thoi:** Sai: Hình có 4 cạnh bằng nhau chắc chắn là hình vuông. Đúng: Hình có 4 cạnh bằng nhau mới chỉ là hình thoi. Để là hình vuông, phải có thêm **4 góc vuông**.\n> - **Sai lầm về số đo góc:** Sai: Góc của tam giác đều là $90^\\circ$. Đúng: Góc tam giác đều là $60^\\circ$. Góc hình vuông là $90^\\circ$. Góc lục giác đều là $120^\\circ$." },
        { title: "Bài 19: Hình chữ nhật. Hình thoi. Hình bình hành. Hình thang cân", summary: commonSummaryPrefix + `### 1.1 — Tóm tắt kiến thức trọng tâm

### 1. Hình chữ nhật

- **Định nghĩa:** Hình chữ nhật là tứ giác có 4 góc vuông.
- **Đặc điểm:**

- Bốn góc bằng nhau và bằng $90^\\circ$.
- Các cạnh đối bằng nhau và song song với nhau.
- Hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường.

\n![Hình chữ nhật](data:image/svg+xml;utf8,%3Csvg%20width%3D%22150%22%20height%3D%22100%22%20viewBox%3D%22-10%20-10%20160%20110%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22120%22%20height%3D%2280%22%20fill%3D%22none%22%20stroke%3D%22blue%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%22120%22%20y2%3D%2280%22%20stroke%3D%22blue%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%220%22%20y1%3D%2280%22%20x2%3D%22120%22%20y2%3D%220%22%20stroke%3D%22blue%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%22-5%22%20y%3D%22-5%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3ED%3C%2Ftext%3E%3Ctext%20x%3D%22125%22%20y%3D%22-5%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EC%3C%2Ftext%3E%3Ctext%20x%3D%22-5%22%20y%3D%2295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EA%3C%2Ftext%3E%3Ctext%20x%3D%22125%22%20y%3D%2295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EB%3C%2Ftext%3E%3C%2Fsvg%3E)\n

### 2. Hình thoi

- **Định nghĩa:** Hình thoi là tứ giác có 4 cạnh bằng nhau.
- **Đặc điểm:**

- Bốn cạnh bằng nhau. Các cạnh đối song song.
- Các góc đối bằng nhau.
- Hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường.

\n![Hình thoi](data:image/svg+xml;utf8,%3Csvg%20width%3D%22150%22%20height%3D%22150%22%20viewBox%3D%22-10%20-10%20160%20160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%2270%2C0%20140%2C70%2070%2C140%200%2C70%22%20fill%3D%22none%22%20stroke%3D%22red%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2270%22%20y1%3D%220%22%20x2%3D%2270%22%20y2%3D%22140%22%20stroke%3D%22red%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%220%22%20y1%3D%2270%22%20x2%3D%22140%22%20y2%3D%2270%22%20stroke%3D%22red%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%2265%22%20y%3D%22-5%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EB%3C%2Ftext%3E%3Ctext%20x%3D%22145%22%20y%3D%2275%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EC%3C%2Ftext%3E%3Ctext%20x%3D%2265%22%20y%3D%22155%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3ED%3C%2Ftext%3E%3Ctext%20x%3D%22-15%22%20y%3D%2275%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EA%3C%2Ftext%3E%3C%2Fsvg%3E)\n

### 3. Hình bình hành

- **Định nghĩa:** Hình bình hành là tứ giác có các cặp cạnh đối song song.
- **Đặc điểm:**

- Các cạnh đối bằng nhau và song song với nhau.
- Các góc đối bằng nhau.
- Hai đường chéo cắt nhau tại trung điểm của mỗi đường.

\n![Hình bình hành](data:image/svg+xml;utf8,%3Csvg%20width%3D%22180%22%20height%3D%22100%22%20viewBox%3D%22-10%20-10%20190%20110%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%2240%2C0%20160%2C0%20120%2C80%200%2C80%22%20fill%3D%22none%22%20stroke%3D%22green%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2240%22%20y1%3D%220%22%20x2%3D%22120%22%20y2%3D%2280%22%20stroke%3D%22green%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%220%22%20y1%3D%2280%22%20x2%3D%22160%22%20y2%3D%220%22%20stroke%3D%22green%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%2235%22%20y%3D%22-5%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EB%3C%2Ftext%3E%3Ctext%20x%3D%22165%22%20y%3D%22-5%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EC%3C%2Ftext%3E%3Ctext%20x%3D%22125%22%20y%3D%2295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3ED%3C%2Ftext%3E%3Ctext%20x%3D%22-15%22%20y%3D%2295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EA%3C%2Ftext%3E%3C%2Fsvg%3E)\n

### 4. Hình thang cân

- **Định nghĩa:** Hình thang cân là hình thang (có 2 đáy song song) và có hai góc kề một đáy bằng nhau.
- **Đặc điểm:**

- Hai cạnh đáy song song với nhau.
- Hai cạnh bên bằng nhau.
- Hai đường chéo bằng nhau.

\n![Hình thang cân](data:image/svg+xml;utf8,%3Csvg%20width%3D%22180%22%20height%3D%22100%22%20viewBox%3D%22-10%20-10%20190%20110%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%2240%2C0%20120%2C0%20160%2C80%200%2C80%22%20fill%3D%22none%22%20stroke%3D%22orange%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2240%22%20y1%3D%220%22%20x2%3D%22160%22%20y2%3D%2280%22%20stroke%3D%22orange%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%220%22%20y1%3D%2280%22%20x2%3D%22120%22%20y2%3D%220%22%20stroke%3D%22orange%22%20stroke-dasharray%3D%224%22%20stroke-width%3D%221.5%22%2F%3E%3Ctext%20x%3D%2235%22%20y%3D%22-5%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EA%3C%2Ftext%3E%3Ctext%20x%3D%22125%22%20y%3D%22-5%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EB%3C%2Ftext%3E%3Ctext%20x%3D%22165%22%20y%3D%2295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3EC%3C%2Ftext%3E%3Ctext%20x%3D%22-15%22%20y%3D%2295%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212%22%3ED%3C%2Ftext%3E%3C%2Fsvg%3E)\n

### 1.2 — Phân loại dạng bài \\& Ví dụ mẫu

**Dạng 1: Nhận biết hình phẳng dựa vào tính chất**
**Đặc điểm nhận dạng:** Đề bài cho một số tính chất về cạnh, góc, đường chéo và yêu cầu gọi tên hình tương ứng.

**Ví dụ:** Tứ giác có 4 cạnh bằng nhau và có 2 đường chéo bằng nhau là hình gì?

- **Bước 1:** Tứ giác có 4 cạnh bằng nhau, suy ra đây là hình thoi.
- **Bước 2:** Hình thoi có thêm điều kiện 2 đường chéo bằng nhau, suy ra đó là hình vuông (vì hình thoi thông thường có 2 đường chéo khác nhau).
- **Kết luận:** Hình đó là hình vuông.

**Dạng 2: Cắt ghép hình**
**Đặc điểm nhận dạng:** Yêu cầu phân chia một hình lớn thành các hình nhỏ (hình bình hành, hình thoi, hình thang cân) hoặc ghép các hình nhỏ thành hình lớn.

**Ví dụ:** Có 6 hình thang cân giống hệt nhau, làm thế nào để ghép chúng thành một cái mặt bàn có hình lục giác đều bị khoét lỗ ở giữa?

- **Bước 1:** Quan sát đặc điểm hình thang cân (2 góc ở đáy lớn bằng nhau). Nếu ghép các cạnh bên của chúng sát vào nhau tạo thành vòng tròn.
- **Bước 2:** Đặt đáy lớn của 6 hình thang cân ra phía ngoài, ghép các cạnh bên liên tiếp nhau. Đáy nhỏ của chúng sẽ tạo thành một lỗ hổng hình lục giác đều ở giữa.
- **Bước 3:** Mặt ngoài sẽ là một hình lục giác đều lớn hơn. Ta được chiếc mặt bàn đa năng theo yêu cầu.

### 1.3 — Lỗi sai thường gặp

> [!NOTE]
> **Lưu ý — Sai lầm thường gặp:**

> - **Nhầm lẫn tính chất đường chéo của các hình:**
> \\\\ Sai: Nghĩ rằng hai đường chéo của hình bình hành thì bằng nhau.
> \\\\ Đúng: Hai đường chéo của hình bình hành **cắt nhau tại trung điểm**, nhưng **không bằng nhau**. Chỉ có hình chữ nhật, hình thang cân, hình vuông mới có hai đường chéo bằng nhau.

> - **Sự khác biệt giữa hình thoi và hình vuông:**
> \\\\ Sai: Tứ giác có 4 cạnh bằng nhau là hình vuông.
> \\\\ Đúng: Tứ giác có 4 cạnh bằng nhau mới chỉ là **hình thoi**. Cần thêm điều kiện **có 4 góc vuông** (hoặc 2 đường chéo bằng nhau) thì mới là hình vuông.

> - **Định danh thiếu chính xác hình thang cân:**
> \\\\ Sai: Hình thang có 2 cạnh bên bằng nhau luôn là hình thang cân.
> \\\\ Đúng: Phải là hình thang có **hai đường chéo bằng nhau** hoặc **hai góc kề một đáy bằng nhau**. Hình bình hành cũng có 2 cạnh bên bằng nhau nhưng không phải là hình thang cân.` },
        { title: "Bài 20: Chu vi và diện tích của một số tứ giác đã học", summary: commonSummaryPrefix + "Công thức tính chu vi và diện tích của các hình tứ giác thông dụng." },
        { title: "Bài tập cuối chương IV", summary: commonSummaryPrefix + "Hệ thống hóa toàn bộ kiến thức về các hình phẳng trong thực tiễn." }
      ]
    },
    { 
      title: "Chương V: Tính đối xứng của hình phẳng trong tự nhiên", 
      lessons: [
        { title: "Bài 21: Hình có trục đối xứng", summary: commonSummaryPrefix + "Khái niệm trục đối xứng, cách tìm trục đối xứng của một hình." },
        { title: "Bài 22: Hình có tâm đối xứng", summary: commonSummaryPrefix + "Khái niệm tâm đối xứng, cách xác định tâm đối xứng của một hình." },
        { title: "Bài tập cuối chương V", summary: commonSummaryPrefix + "Hệ thống hóa toàn bộ kiến thức về tính đối xứng của hình phẳng trong tự nhiên." }
      ]
    }
  ],
  9: TOAN_9_DATA
};

const ALL_PRACTICAL = [
  ...chuong1ThucTeData,
  ...chuong2ThucTeData,
  ...chuong3ThucTeData,
  ...chuong4ThucTeData,
  ...toan9Chuong1Questions,
  ...toan9Chuong2Questions,
  ...toan9Chuong3Questions,
  ...toan9Chuong4Questions,
  ...toan9Chuong5Questions,
  ...toan9Chuong6Questions,
  ...toan9Chuong7Questions,
  ...toan9Chuong8Questions
] as Question[];

const JSON_QUESTIONS: Question[] = [
  ...ALL_PRACTICAL,
  ...(questionsRaw as any[])
    .filter(q => q.type !== 'multiple_choice_many')
    .map(q => {
      let type = q.type === 'short_answer_number' ? 'short_answer' : q.type;
      let options = q.options || [];
      let correctAnswer: any = q.answer;
      if (type === 'true_false') {
        options = ["Đúng", "Sai"];
        correctAnswer = (q.answer === "Đúng" || q.answer === "đúng") ? 0 : 1;
      } else if (type === 'multiple_choice_1') {
        const letter = q.answer.toString().trim().charAt(0).toUpperCase();
        correctAnswer = ["A", "B", "C", "D"].indexOf(letter);
      } else {
        correctAnswer = q.answer.toString().replace(/[{}]/g, '').trim();
      }
      return { 
        id: q.id, grade: 6, chapter: 1, level: q.level, 
        type: type as any, question: q.question, options, 
        correctAnswer, explanation: q.explanation,
        imageUrl: q.imageUrl, explanationImageUrl: q.explanationImageUrl
      };
    })
];

export const getQuestionsForLesson = (grade: number, chapterIdx: number, lessonIdx: number): Question[] => {
  const chapterLessons = MATH_DATA[grade]?.[chapterIdx]?.lessons || [];
  const title = chapterLessons[lessonIdx]?.title || "";
  let idPrefixes: string[] = [];
  let chapterPrefixes: string[] = [];

  const matchBai = title.match(/Bài (\d+):/);
  if (matchBai) {
    const baiNum = matchBai[1];
    if (grade === 9) {
      idPrefixes.push(`TOAN9_B${baiNum}_`);
      idPrefixes.push(`TOAN9_C${chapterIdx + 1}_B${baiNum}_`);
      // idPrefixes.push(`TOAN9_C${chapterIdx + 1}_`);
    } else {
      idPrefixes.push(`USER_B${baiNum}_`);
      idPrefixes.push(`THUC_TE_B${baiNum}_`);
      idPrefixes.push(`THUC_TE_C${chapterIdx + 1}_B${baiNum}_`);
    }
  } else {
    const matchChuong = title.match(/cuối chương ([IVXLCDM]+)/i);
    if (matchChuong) {
      const roman = matchChuong[1].toUpperCase();
      const romanToNum: Record<string, number> = { "I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7, "VIII": 8, "IX": 9, "X": 10 };
      const chapNum = romanToNum[roman] || (chapterIdx + 1);
      if (grade === 9) {
        idPrefixes.push(`TOAN9_C${chapNum}_`);
      } else {
        idPrefixes.push(`USER_C${chapNum}_`);
        idPrefixes.push(`THUC_TE_C${chapNum}_`);
      }
      
      // Collect all 'Bài X' prefixes from the same chapter as a fallback
      for (const lesson of chapterLessons) {
         const m = lesson.title.match(/Bài (\d+):/);
         if (m) {
           if (grade === 9) {
             chapterPrefixes.push(`TOAN9_B${m[1]}_`);
             chapterPrefixes.push(`TOAN9_C${chapNum}_B${m[1]}_`);
           } else {
             chapterPrefixes.push(`USER_B${m[1]}_`);
             chapterPrefixes.push(`THUC_TE_B${m[1]}_`);
             chapterPrefixes.push(`THUC_TE_C${chapNum}_B${m[1]}_`);
           }
         }
      }
    }
  }

  let pool = idPrefixes.length > 0 ? JSON_QUESTIONS.filter(q => idPrefixes.some(prefix => q.id.startsWith(prefix))) : [];

  if (pool.length === 0 && chapterPrefixes.length > 0) {
      pool = JSON_QUESTIONS.filter(q => chapterPrefixes.some(prefix => q.id.startsWith(prefix)));
  }

  const seen = new Set<string>();
  const uniquePool: Question[] = [];
  for (const q of pool) {
    if (!seen.has(q.id)) {
      seen.add(q.id);
      uniquePool.push(q);
    }
  }
  return uniquePool;
};

export const getMathQuestions = (grade: number, chapterIdx: number, lessonIdx: number, count: number, seenIds: string[]): Question[] => {
  let pool = getQuestionsForLesson(grade, chapterIdx, lessonIdx);

  // If still no questions (e.g. data missing), fallback to all questions
  if (pool.length === 0) {
      pool = [...JSON_QUESTIONS];
  }
  
  let unseenPool = pool.filter(q => !seenIds.includes(q.id));
  
  if (unseenPool.length < count) {
    unseenPool = [...pool];
  }
  
  return unseenPool.sort(() => 0.5 - Math.random()).slice(0, Math.min(count, unseenPool.length));
};

