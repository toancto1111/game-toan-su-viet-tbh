import { Question } from './types';

export const toan9Chuong8Questions: Question[] = [
  {
    "id": "TOAN9_B25_001",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Phép thử ngẫu nhiên là hành động hoặc thực nghiệm mà:",
    "options": [
      "A. Luôn biết chắc chắn kết quả trước khi làm.",
      "B. Không thể liệt kê được các kết quả có thể.",
      "C. Không biết trước kết quả nhưng liệt kê được tất cả kết quả có thể xảy ra.",
      "D. Chỉ có đúng 1 kết quả duy nhất có thể xảy ra."
    ],
    "correctAnswer": 2,
    "explanation": "Theo định nghĩa SGK, phép thử ngẫu nhiên là thực nghiệm không thể biết trước kết quả nhưng có thể liệt kê được tất cả các kết quả có thể xảy ra."
  },
  {
    "id": "TOAN9_B25_002",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Tập hợp tất cả các kết quả có thể xảy ra của một phép thử ngẫu nhiên được gọi là:",
    "options": [
      "A. Biến cố ngẫu nhiên.",
      "B. Không gian mẫu.",
      "C. Mẫu dữ liệu.",
      "D. Tần số mẫu."
    ],
    "correctAnswer": 1,
    "explanation": "Tập hợp tất cả các kết quả có thể xảy ra của phép thử được gọi là không gian mẫu, kí hiệu là $\\Omega$."
  },
  {
    "id": "TOAN9_B25_003",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Kí hiệu quy ước quốc tế của không gian mẫu là:",
    "options": [
      "A. $\\Sigma$.",
      "B. $\\Omega$.",
      "C. $\\Delta$.",
      "D. $\\Phi$."
    ],
    "correctAnswer": 1,
    "explanation": "Không gian mẫu được kí hiệu bằng chữ cái Hy Lạp $\\Omega$ (Omega)."
  },
  {
    "id": "TOAN9_B25_004",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Gieo một đồng xu cân đối một lần. Không gian mẫu $\\Omega$ là:",
    "options": [
      "A. $\\Omega = \\{S\\}$.",
      "B. $\\Omega = \\{N\\}$.",
      "C. $\\Omega = \\{S; N\\}$.",
      "D. $\\Omega = \\{SS; NN\\}$."
    ],
    "correctAnswer": 2,
    "explanation": "Đồng xu có 2 mặt là mặt sấp ($S$) và mặt ngửa ($N$), nên $\\Omega = \\{S; N\\}$."
  },
  {
    "id": "TOAN9_B25_005",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Gieo một con xúc xắc 6 mặt cân đối một lần. Số phần tử của không gian mẫu $n(\\Omega)$ là:",
    "options": [
      "A. $4$.",
      "B. $6$.",
      "C. $12$.",
      "D. $36$."
    ],
    "correctAnswer": 1,
    "explanation": "Con xúc xắc có 6 mặt từ 1 đến 6 chấm nên $n(\\Omega) = 6$."
  },
  {
    "id": "TOAN9_B25_006",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Trong hộp có 3 quả bóng: Xanh ($X$), Đỏ ($Đ$), Vàng ($V$). Rút ngẫu nhiên 1 quả bóng. Không gian mẫu là:",
    "options": [
      "A. $\\Omega = \\{X; Đ\\}$.",
      "B. $\\Omega = \\{X; Đ; V\\}$.",
      "C. $\\Omega = \\{(X, Đ); (Đ, V)\\}$.",
      "D. $\\Omega = \\{1; 2; 3\\}$."
    ],
    "correctAnswer": 1,
    "explanation": "Kết quả có thể là rút được bóng Xanh, bóng Đỏ hoặc bóng Vàng."
  },
  {
    "id": "TOAN9_B25_007",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Hành động nào sau đây \\textbf{không phải} là phép thử ngẫu nhiên?",
    "options": [
      "A. Bốc thăm trúng thưởng.",
      "B. Gieo một con xúc xắc xem số chấm.",
      "C. Đun nước nguyên chất ở áp suất 1 atm xem sôi ở nhiệt độ nào.",
      "D. Chọn ngẫu nhiên 1 bạn trong lớp làm lớp trưởng."
    ],
    "correctAnswer": 2,
    "explanation": "Nước nguyên chất ở 1 atm luôn sôi ở đúng 100°C (kết quả tất định biết trước), không có tính ngẫu nhiên."
  },
  {
    "id": "TOAN9_B25_008",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Gieo đồng thời hai đồng xu cân đối và đồng chất. Số phần tử của không gian mẫu là:",
    "options": [
      "A. $2$.",
      "B. $3$.",
      "C. $4$.",
      "D. $6$."
    ],
    "correctAnswer": 2,
    "explanation": "Không gian mẫu $\\Omega = \\{SS; SN; NS; NN\\}$, có $n(\\Omega) = 4$."
  },
  {
    "id": "TOAN9_B25_009",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Quay một tấm bìa hình tròn chia thành 6 hình quạt bằng nhau đánh số từ 1 đến 6. Kết quả của phép thử là:",
    "options": [
      "A. Thời gian tấm bìa quay.",
      "B. Số ghi trên hình quạt mà mũi tên chỉ vào khi dừng.",
      "C. Màu sắc của tấm bìa.",
      "D. Bán kính tấm bìa."
    ],
    "correctAnswer": 1,
    "explanation": "Kết quả quan sát của phép thử là số ghi trên hình quạt mà mũi tên chỉ vào khi tấm bìa dừng lại."
  },
  {
    "id": "TOAN9_B25_010",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Gieo một con xúc xắc cân đối liên tiếp 2 lần. Số phần tử của không gian mẫu là:",
    "options": [
      "A. $12$.",
      "B. $18$.",
      "C. $24$.",
      "D. $36$."
    ],
    "correctAnswer": 3,
    "explanation": "Lần 1 có 6 kết quả, lần 2 có 6 kết quả. Số phần tử là $6 \\times 6 = 36$."
  },
  {
    "id": "TOAN9_B25_011",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một hộp chứa 3 thẻ đánh số $1; 2; 3$. Rút ngẫu nhiên lần lượt 2 thẻ không hoàn lại. Số phần tử của không gian mẫu là:",
    "options": [
      "A. $9$.",
      "B. $6$.",
      "C. $3$.",
      "D. $8$."
    ],
    "correctAnswer": 1,
    "explanation": "Lần 1 có 3 cách, lần 2 có 2 cách (không rút lại thẻ cũ). Số phần tử là $3 \\times 2 = 6$."
  },
  {
    "id": "TOAN9_B25_012",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Chọn ngẫu nhiên một gia đình có 2 con và quan sát giới tính ($T$: trai, $G$: gái) theo thứ tự sinh. Không gian mẫu là:",
    "options": [
      "A. $\\{T; G\\}$.",
      "B. $\\{TT; TG; GG\\}$.",
      "C. $\\{TT; TG; GT; GG\\}$.",
      "D. $\\{T; TG; G\\}$."
    ],
    "correctAnswer": 2,
    "explanation": "Có tính thứ tự sinh nên có 4 kết quả: $TT, TG, GT, GG$."
  },
  {
    "id": "TOAN9_B25_013",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Ba bạn An, Bình, Cúc xếp thành một hàng dọc ngẫu nhiên. Số phần tử của không gian mẫu là:",
    "options": [
      "A. $3$.",
      "B. $6$.",
      "C. $9$.",
      "D. $4$."
    ],
    "correctAnswer": 1,
    "explanation": "Số cách hoán vị 3 bạn là $3 \\times 2 \\times 1 = 6$."
  },
  {
    "id": "TOAN9_B25_014",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Bạn Nam tung 1 đồng xu cân đối và gieo 1 con xúc xắc 4 mặt (đánh số 1 đến 4). Cặp kết quả nào sau đây thuộc không gian mẫu?",
    "options": [
      "A. $(S, 5)$.",
      "B. $(N, 0)$.",
      "C. $(S, 3)$.",
      "D. $(SS, 4)$."
    ],
    "correctAnswer": 2,
    "explanation": "Đồng xu có mặt $S, N$ và xúc xắc có số $1, 2, 3, 4$. Cặp $(S, 3)$ thỏa mãn."
  },
  {
    "id": "TOAN9_B25_015",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Gieo một con xúc xắc 6 mặt 2 lần liên tiếp. Có bao nhiêu kết quả có thể mà tổng số chấm ở 2 lần gieo bằng 4?",
    "options": [
      "A. $2$.",
      "B. $3$.",
      "C. $4$.",
      "D. $5$."
    ],
    "correctAnswer": 1,
    "explanation": "Các cặp có tổng bằng 4 là: $(1, 3); (2, 2); (3, 1)$ (gồm 3 kết quả)."
  },
  {
    "id": "TOAN9_B25_016",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Cho tập hợp $A = \\{1; 3; 5\\}$ và $B = \\{2; 4\\}$. Chọn ngẫu nhiên 1 phần tử từ $A$ và 1 phần tử từ $B$. Số kết quả có thể là:",
    "options": [
      "A. $5$.",
      "B. $6$.",
      "C. $8$.",
      "D. $9$."
    ],
    "correctAnswer": 1,
    "explanation": "Số kết quả là $3 \\times 2 = 6$."
  },
  {
    "id": "TOAN9_B25_017",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một túi chứa 2 bi đỏ ($Đ_1, Đ_2$) và 1 bi xanh ($X$). Rút đồng thời 2 viên bi. Không gian mẫu gồm các cặp:",
    "options": [
      "A. $\\{Đ_1Đ_2; Đ_1X; Đ_2X\\}$.",
      "B. $\\{ĐX; XĐ\\}$.",
      "C. $\\{Đ_1; Đ_2; X\\}$.",
      "D. $\\{Đ_1Đ_1; Đ_2Đ_2; XX\\}$."
    ],
    "correctAnswer": 0,
    "explanation": "Lấy đồng thời 2 viên bi từ 3 viên phân biệt cho 3 tổ hợp: $\\{Đ_1Đ_2; Đ_1X; Đ_2X\\}$."
  },
  {
    "id": "TOAN9_B25_018",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một hộp có 5 chiếc kẹo với các vị: Dâu ($D$), Cam ($C$), Nho ($N$), Bạc hà ($B$), Táo ($T$). Bạn Lan lấy ngẫu nhiên 1 chiếc kẹo cho em, sau đó lấy tiếp 1 chiếc cho mình. Không gian mẫu có bao nhiêu phần tử?",
    "options": [
      "A. $10$.",
      "B. $20$.",
      "C. $25$.",
      "D. $15$."
    ],
    "correctAnswer": 1,
    "explanation": "Lấy lần lượt không hoàn lại: $5 \\times 4 = 20$ phần tử."
  },
  {
    "id": "TOAN9_B25_019",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một bài thi trắc nghiệm gồm 2 câu hỏi, mỗi câu có 4 phương án lựa chọn $A, B, C, D$. Học sinh khoanh ngẫu nhiên cả 2 câu. Không gian mẫu có bao nhiêu phần tử?",
    "options": [
      "A. $8$.",
      "B. $16$.",
      "C. $6$.",
      "D. $4$."
    ],
    "correctAnswer": 1,
    "explanation": "Số cách khoanh là $4 \\times 4 = 16$ phần tử."
  },
  {
    "id": "TOAN9_B25_020",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Bốn đội bóng $A, B, C, D$ thi đấu vòng tròn 1 lượt (mỗi đội gặp nhau đúng 1 trận). Số trận đấu diễn ra là:",
    "options": [
      "A. $6$.",
      "B. $12$.",
      "C. $8$.",
      "D. $4$."
    ],
    "correctAnswer": 0,
    "explanation": "Các trận đấu là các cặp không phân biệt thứ tự: $AB, AC, AD, BC, BD, CD$ (gồm 6 trận)."
  },
  {
    "id": "TOAN9_B25_021",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Kết quả của một phép thử ngẫu nhiên là không thể dự đoán chính xác trước khi thực hiện.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đây là đặc tính cơ bản của phép thử ngẫu nhiên."
  },
  {
    "id": "TOAN9_B25_022",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Không gian mẫu là tập hợp con của tập các kết quả có thể xảy ra.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Không gian mẫu là tập hợp chứa tất cả các kết quả có thể, không phải tập con."
  },
  {
    "id": "TOAN9_B25_023",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Gieo đồng thời hai con xúc xắc 6 mặt cân đối thì cặp kết quả $(1, 2)$ và $(2, 1)$ được tính là cùng một phần tử trong không gian mẫu.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Hai con xúc xắc phân biệt nên $(1, 2)$ và $(2, 1)$ là 2 kết quả khác nhau."
  },
  {
    "id": "TOAN9_B25_024",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Phép thử gieo một đồng xu cân đối 3 lần liên tiếp có không gian mẫu gồm 8 phần tử.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Số phần tử là $2^3 = 8$."
  },
  {
    "id": "TOAN9_B25_025",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Rút ngẫu nhiên một lá bài từ bộ bài 52 lá thì không gian mẫu chỉ gồm 4 phần tử là cơ, rô, bích, tép.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Chất bài chỉ là đặc tính, không gian mẫu đầy đủ phải gồm 52 lá bài riêng biệt."
  },
  {
    "id": "TOAN9_B25_026",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Trong phép thử rút lần lượt 2 thẻ từ hộp $\\{1; 2; 3; 4\\}$ có hoàn lại, cặp kết quả $(2, 2)$ có thể xuất hiện.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Vì rút có hoàn lại nên thẻ số 2 sau khi rút lần 1 được bỏ lại vào hộp và có thể rút tiếp ở lần 2."
  },
  {
    "id": "TOAN9_B25_027",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Phép thử chọn ngẫu nhiên một số tự nhiên có một chữ số có không gian mẫu gồm 9 phần tử.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Các số tự nhiên có một chữ số từ 0 đến 9 gồm 10 số, nên không gian mẫu có 10 phần tử."
  },
  {
    "id": "TOAN9_B25_028",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Hành động bấm máy tính để tính kết quả của phép tính $25 \\times 4$ là một phép thử ngẫu nhiên.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Kết quả của phép tính này là tất định (luôn bằng 100), không phải hiện tượng ngẫu nhiên."
  },
  {
    "id": "TOAN9_B25_029",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Sơ đồ hình cây có thể dùng để biểu diễn không gian mẫu của các phép thử gồm nhiều bước liên tiếp.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Sơ đồ hình cây biểu diễn trực quan các nhánh rẽ cho từng bước thực nghiệm liên tiếp."
  },
  {
    "id": "TOAN9_B25_030",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Không gian mẫu của phép thử ngẫu nhiên không bao giờ là tập hợp rỗng.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Phép thử luôn có ít nhất một kết quả có thể xảy ra khi thực hiện, nên $\\Omega \\neq \\emptyset$."
  },
  {
    "id": "TOAN9_B25_031",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Khi gieo một con xúc xắc 6 mặt cân đối 2 lần liên tiếp, có đúng 6 kết quả mà hai lần gieo xuất hiện số chấm giống nhau.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Các kết quả là $(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6)$ (đúng 6 kết quả)."
  },
  {
    "id": "TOAN9_B25_032",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Gieo một con xúc xắc 6 mặt 2 lần liên tiếp, có thể xuất hiện kết quả mà tổng số chấm bằng 13.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Số chấm lớn nhất mỗi lần là 6 nên tổng lớn nhất là $6 + 6 = 12 < 13$."
  },
  {
    "id": "TOAN9_B25_033",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Từ 3 chữ số $1; 2; 3$, lập các số tự nhiên có 2 chữ số khác nhau thì không gian mẫu có 6 phần tử.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Số các số lập được là $3 \\times 2 = 6$ số: $\\{12; 13; 21; 23; 31; 32\\}$."
  },
  {
    "id": "TOAN9_B25_034",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Chọn ngẫu nhiên 2 bạn từ nhóm gồm 3 nam và 2 nữ thì có tất cả 10 cách chọn khác nhau.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Số cách chọn 2 bạn từ 5 bạn là $\\frac{5 \\times 4}{2} = 10$ cách."
  },
  {
    "id": "TOAN9_B25_035",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Một hộp có 4 viên bi được đánh số $1; 2; 3; 4$. Rút lần lượt 2 viên bi không hoàn lại thì có 4 kết quả mà hai số rút được bằng nhau.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Rút không hoàn lại thì hai số rút ra bắt buộc phải khác nhau, không có kết quả nào hai số bằng nhau."
  },
  {
    "id": "TOAN9_B25_036",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Gieo một đồng xu và một con xúc xắc 6 mặt, có đúng 3 kết quả mà đồng xu xuất hiện mặt ngửa và số chấm là số nguyên tố.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Số nguyên tố là $\\{2; 3; 5\\}$ (3 số), kết hợp với mặt ngửa có 3 cặp: $(N, 2), (N, 3), (N, 5)$."
  },
  {
    "id": "TOAN9_B25_037",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Gieo đồng thời hai con xúc xắc 6 mặt, số kết quả có thể để tích số chấm là số lẻ là 9.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tích lẻ khi cả hai lần đều ra số lẻ $\\{1; 3; 5\\}$, số kết quả là $3 \\times 3 = 9$."
  },
  {
    "id": "TOAN9_B25_038",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Phép thử tung một đồng xu cho đến khi xuất hiện mặt sấp thì dừng lại (tối đa tung 3 lần) có không gian mẫu gồm 4 phần tử.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Không gian mẫu là $\\{S; NS; NNS; NNN\\}$ (đúng 4 phần tử)."
  },
  {
    "id": "TOAN9_B25_039",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Xếp ngẫu nhiên 4 bạn $A, B, C, D$ vào một bàn dài 4 chỗ thì số cách sắp xếp là 16.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Số cách xếp là hoán vị của 4 bạn: $4! = 4 \\times 3 \\times 2 \\times 1 = 24$, không phải 16."
  },
  {
    "id": "TOAN9_B25_040",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Một hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy lần lượt 2 quả bóng không hoàn lại thì số phần tử của không gian mẫu (phân biệt theo màu và thứ tự) là 4.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Các kết quả theo màu là: (Đỏ, Đỏ), (Đỏ, Xanh), (Xanh, Đỏ), (Xanh, Xanh) (gồm 4 kết quả)."
  },
  {
    "id": "TOAN9_B25_041",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc 6 mặt cân đối một lần. Số phần tử của không gian mẫu là bao nhiêu?",
    "options": [],
    "correctAnswer": "6",
    "explanation": "Không gian mẫu $\\Omega = \\{1; 2; 3; 4; 5; 6\\}$ gồm 6 phần tử."
  },
  {
    "id": "TOAN9_B25_042",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tung một đồng xu cân đối hai lần liên tiếp. Không gian mẫu có bao nhiêu phần tử?",
    "options": [],
    "correctAnswer": "4",
    "explanation": "Số phần tử là $2 \\times 2 = 4$."
  },
  {
    "id": "TOAN9_B25_043",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Hộp có 4 tấm thẻ được đánh số $1; 2; 3; 4$. Rút ngẫu nhiên 1 tấm thẻ. Số kết quả có thể là bao nhiêu?",
    "options": [],
    "correctAnswer": "4",
    "explanation": "Có 4 tấm thẻ nên có 4 kết quả có thể."
  },
  {
    "id": "TOAN9_B25_044",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tung đồng thời 3 đồng xu cân đối. Không gian mẫu có bao nhiêu phần tử?",
    "options": [],
    "correctAnswer": "8",
    "explanation": "Số phần tử là $2^3 = 8$."
  },
  {
    "id": "TOAN9_B25_045",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Một lớp có 18 bạn nam và 16 bạn nữ. Giáo viên chọn ngẫu nhiên 1 bạn làm cán sự. Không gian mẫu có bao nhiêu phần tử?",
    "options": [],
    "correctAnswer": "34",
    "explanation": "Tổng số học sinh là $18 + 16 = 34$ bạn."
  },
  {
    "id": "TOAN9_B25_046",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Quay một đĩa quay chia thành 8 hình quạt đều nhau đánh số từ 1 đến 8 một lần. Số phần tử của không gian mẫu là bao nhiêu?",
    "options": [],
    "correctAnswer": "8",
    "explanation": "Mũi tên có thể dừng ở 1 trong 8 ô nên có 8 phần tử."
  },
  {
    "id": "TOAN9_B25_047",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc 6 mặt một lần. Có bao nhiêu kết quả có thể mà số chấm xuất hiện là số lẻ?",
    "options": [],
    "correctAnswer": "3",
    "explanation": "Các mặt lẻ là $\\{1; 3; 5\\}$ gồm 3 kết quả."
  },
  {
    "id": "TOAN9_B25_048",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tung một đồng xu một lần. Có bao nhiêu kết quả có thể xuất hiện mặt sấp?",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Chỉ có 1 kết quả là mặt sấp ($S$)."
  },
  {
    "id": "TOAN9_B25_049",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Hộp có 5 viên bi màu khác nhau. Rút ngẫu nhiên đồng thời 1 viên bi. Số phần tử của không gian mẫu là bao nhiêu?",
    "options": [],
    "correctAnswer": "5",
    "explanation": "Có 5 viên bi nên có 5 kết quả có thể."
  },
  {
    "id": "TOAN9_B25_050",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc 6 mặt một lần. Có bao nhiêu kết quả có thể mà số chấm là số nguyên tố?",
    "options": [],
    "correctAnswer": "3",
    "explanation": "Các số nguyên tố là $\\{2; 3; 5\\}$, gồm 3 kết quả."
  },
  {
    "id": "TOAN9_B25_051",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc 6 mặt và tung 1 đồng xu. Số phần tử của không gian mẫu là bao nhiêu?",
    "options": [],
    "correctAnswer": "12",
    "explanation": "Số phần tử là $6 \\times 2 = 12$."
  },
  {
    "id": "TOAN9_B25_052",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Một hộp có 4 chiếc bút bi khác nhau. Bạn An lấy lần lượt 2 chiếc bút không hoàn lại. Không gian mẫu có bao nhiêu phần tử?",
    "options": [],
    "correctAnswer": "12",
    "explanation": "Lần 1 có 4 cách, lần 2 có 3 cách $\\implies 4 \\times 3 = 12$."
  },
  {
    "id": "TOAN9_B25_053",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Có 3 bạn $A, B, C$ xếp thành một hàng ngang để chụp ảnh. Có bao nhiêu cách sắp xếp khác nhau?",
    "options": [],
    "correctAnswer": "6",
    "explanation": "Số hoán vị của 3 bạn là $3 \\times 2 \\times 1 = 6$."
  },
  {
    "id": "TOAN9_B25_054",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Từ 3 chữ số $1; 2; 3$, lập được bao nhiêu số tự nhiên có 2 chữ số (các chữ số có thể giống nhau)?",
    "options": [],
    "correctAnswer": "9",
    "explanation": "Chữ số hàng chục có 3 cách, hàng đơn vị có 3 cách $\\implies 3 \\times 3 = 9$."
  },
  {
    "id": "TOAN9_B25_055",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Rút ngẫu nhiên một số trong các số tự nhiên từ 1 đến 25. Có bao nhiêu kết quả rút được số chia hết cho 4?",
    "options": [],
    "correctAnswer": "6",
    "explanation": "Các số chia hết cho 4 là $\\{4; 8; 12; 16; 20; 24\\}$, gồm 6 kết quả."
  },
  {
    "id": "TOAN9_B25_056",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Gieo đồng thời hai con xúc xắc 6 mặt cân đối. Có bao nhiêu kết quả có thể mà tổng số chấm trên hai con xúc xắc bằng 7?",
    "options": [],
    "correctAnswer": "6",
    "explanation": "Các cặp tổng bằng 7 là: $(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)$ (gồm 6 kết quả)."
  },
  {
    "id": "TOAN9_B25_057",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một nhóm học sinh gồm 2 nam và 3 nữ. Chọn ngẫu nhiên đồng thời 2 học sinh đi trực ban. Không gian mẫu có bao nhiêu phần tử?",
    "options": [],
    "correctAnswer": "10",
    "explanation": "Số cách chọn 2 bạn từ 5 bạn là $\\frac{5 \\times 4}{2} = 10$ phần tử."
  },
  {
    "id": "TOAN9_B25_058",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một thực đơn có 3 món khai vị, 4 món chính và 2 món tráng miệng. Chọn một bữa ăn gồm 1 khai vị, 1 món chính, 1 tráng miệng. Không gian mẫu có bao nhiêu phần tử?",
    "options": [],
    "correctAnswer": "24",
    "explanation": "Số cách kết hợp là $3 \\times 4 \\times 2 = 24$ phần tử."
  },
  {
    "id": "TOAN9_B25_059",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Có 4 đội bóng thi đấu vòng tròn 1 lượt (tổng cộng 6 trận). Mỗi trận chỉ có thắng hoặc thua (không hòa). Có bao nhiêu kết quả dự đoán có thể cho toàn bộ 6 trận đấu?",
    "options": [],
    "correctAnswer": "64",
    "explanation": "Mỗi trận có 2 kết quả. 6 trận có $2^6 = 64$ kết quả."
  },
  {
    "id": "TOAN9_B25_060",
    "grade": 9,
    "chapter": 8,
    "lesson": 25,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Hộp có 5 quả cầu đánh số từ 1 đến 5. Rút lần lượt 2 quả cầu có hoàn lại. Có bao nhiêu kết quả có thể mà tích hai số ghi trên hai quả cầu là số lẻ?",
    "options": [],
    "correctAnswer": "9",
    "explanation": "Tích lẻ khi cả hai lần rút đều ra số lẻ $\\{1; 3; 5\\}$. Số kết quả là $3 \\times 3 = 9$."
  },
  {
    "id": "TOAN9_B26_001",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho phép thử có không gian mẫu $\\Omega$ gồm các kết quả đồng khả năng và biến cố $E$. Công thức tính xác suất của biến cố $E$ là:",
    "options": [
      "A. $P(E) = \\frac{n(\\Omega)}{n(E)}$.",
      "B. $P(E) = \\frac{n(E)}{n(\\Omega)}$.",
      "C. $P(E) = n(E) \\cdot n(\\Omega)$.",
      "D. $P(E) = n(\\Omega) - n(E)$."
    ],
    "correctAnswer": 1,
    "explanation": "Theo định nghĩa cổ điển, xác suất bằng số kết quả thuận lợi chia cho tổng số kết quả của không gian mẫu."
  },
  {
    "id": "TOAN9_B26_002",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Gieo một con xúc xắc 6 mặt cân đối một lần. Xác suất để xuất hiện mặt 5 chấm là:",
    "options": [
      "A. $\\frac{5}{6}$.",
      "B. $\\frac{1}{6}$.",
      "C. $\\frac{1}{5}$.",
      "D. $\\frac{1}{2}$."
    ],
    "correctAnswer": 1,
    "explanation": "Không gian mẫu có 6 phần tử, chỉ có 1 mặt 5 chấm nên xác suất là $\\frac{1}{6}$."
  },
  {
    "id": "TOAN9_B26_003",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Gieo một đồng xu cân đối một lần. Xác suất để đồng xu xuất hiện mặt sấp là:",
    "options": [
      "A. $1$.",
      "B. $\\frac{1}{4}$.",
      "C. $\\frac{1}{2}$.",
      "D. $0$."
    ],
    "correctAnswer": 2,
    "explanation": "Đồng xu có 2 mặt đồng khả năng $\\{S; N\\}$, xác suất mặt sấp là $\\frac{1}{2}$."
  },
  {
    "id": "TOAN9_B26_004",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Rút ngẫu nhiên 1 lá bài từ bộ bài tú lơ khơ 52 lá. Số kết quả thuận lợi cho biến cố \"Rút được lá Át (A)\" là:",
    "options": [
      "A. 1.",
      "B. 2.",
      "C. 4.",
      "D. 13."
    ],
    "correctAnswer": 2,
    "explanation": "Bộ bài chuẩn có đúng 4 lá bài Át (cơ, rô, tép, bích)."
  },
  {
    "id": "TOAN9_B26_005",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Một túi chứa 10 quả cầu giống hệt nhau đánh số từ 1 đến 10. Rút ngẫu nhiên một quả. Xác suất rút được quả cầu ghi số lẻ là:",
    "options": [
      "A. $\\frac{1}{2}$.",
      "B. $\\frac{1}{10}$.",
      "C. $\\frac{3}{10}$.",
      "D. $\\frac{2}{5}$."
    ],
    "correctAnswer": 0,
    "explanation": "Các số lẻ là $\\{1; 3; 5; 7; 9\\}$ (5 số). Xác suất là $\\frac{5}{10} = \\frac{1}{2}$."
  },
  {
    "id": "TOAN9_B26_006",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Nếu biến cố $E$ là biến cố chắc chắn xảy ra trong phép thử thì xác suất $P(E)$ bằng:",
    "options": [
      "A. $0$.",
      "B. $0{,}5$.",
      "C. $1$.",
      "D. $100$."
    ],
    "correctAnswer": 2,
    "explanation": "Biến cố chắc chắn có xác suất bằng 1."
  },
  {
    "id": "TOAN9_B26_007",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Nếu biến cố $F$ là biến cố không thể xảy ra thì xác suất $P(F)$ bằng:",
    "options": [
      "A. $0$.",
      "B. $1$.",
      "C. $-1$.",
      "D. Không xác định."
    ],
    "correctAnswer": 0,
    "explanation": "Biến cố không thể có xác suất bằng 0."
  },
  {
    "id": "TOAN9_B26_008",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Gieo một con xúc xắc 6 mặt cân đối. Biến cố nào sau đây có xác suất bằng 1?",
    "options": [
      "A. \"Xuất hiện mặt có số chấm là số chẵn\".",
      "B. \"Xuất hiện mặt có số chấm lớn hơn 6\".",
      "C. \"Xuất hiện mặt có số chấm nhỏ hơn 7\".",
      "D. \"Xuất hiện mặt có số chấm chia hết cho 3\"."
    ],
    "correctAnswer": 2,
    "explanation": "Các mặt của xúc xắc là $\\{1; 2; 3; 4; 5; 6\\}$, tất cả đều nhỏ hơn 7 nên đây là biến cố chắc chắn, xác suất bằng 1."
  },
  {
    "id": "TOAN9_B26_009",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Quay một đĩa quay chia thành 8 hình quạt đều nhau đánh số $1; 2; \\dots; 8$. Xác suất để mũi tên dừng ở ô số 3 là:",
    "options": [
      "A. $\\frac{3}{8}$.",
      "B. $\\frac{1}{8}$.",
      "C. $\\frac{1}{3}$.",
      "D. $\\frac{1}{2}$."
    ],
    "correctAnswer": 1,
    "explanation": "Có 8 ô đều nhau, ô số 3 là 1 ô thuận lợi $\\implies P = \\frac{1}{8}$."
  },
  {
    "id": "TOAN9_B26_010",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Một hộp có 5 viên bi xanh và 5 viên bi đỏ. Rút ngẫu nhiên 1 viên bi. Xác suất rút được bi màu xanh là:",
    "options": [
      "A. $\\frac{1}{5}$.",
      "B. $\\frac{1}{10}$.",
      "C. $\\frac{1}{2}$.",
      "D. $\\frac{2}{3}$."
    ],
    "correctAnswer": 2,
    "explanation": "Tổng số bi là 10. Xác suất bi xanh là $\\frac{5}{10} = \\frac{1}{2}$."
  },
  {
    "id": "TOAN9_B26_011",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Gieo đồng thời hai con xúc xắc 6 mặt cân đối. Xác suất để tổng số chấm trên hai con xúc xắc bằng 11 là:",
    "options": [
      "A. $\\frac{1}{18}$.",
      "B. $\\frac{1}{36}$.",
      "C. $\\frac{1}{12}$.",
      "D. $\\frac{1}{6}$."
    ],
    "correctAnswer": 0,
    "explanation": "Tổng bằng 11 có 2 kết quả: $(5, 6)$ và $(6, 5)$. Không gian mẫu có 36 kết quả $\\implies P = \\frac{2}{36} = \\frac{1}{18}$."
  },
  {
    "id": "TOAN9_B26_012",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Gieo một con xúc xắc cân đối hai lần liên tiếp. Xác suất để số chấm xuất hiện ở hai lần gieo như nhau là:",
    "options": [
      "A. $\\frac{1}{36}$.",
      "B. $\\frac{1}{12}$.",
      "C. $\\frac{1}{6}$.",
      "D. $\\frac{5}{36}$."
    ],
    "correctAnswer": 2,
    "explanation": "Hai lần giống nhau có 6 kết quả: $(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6) \\implies P = \\frac{6}{36} = \\frac{1}{6}$."
  },
  {
    "id": "TOAN9_B26_013",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Tung đồng thời 2 đồng xu cân đối. Xác suất để có ít nhất một đồng xu xuất hiện mặt sấp là:",
    "options": [
      "A. $\\frac{1}{4}$.",
      "B. $\\frac{1}{2}$.",
      "C. $\\frac{3}{4}$.",
      "D. $1$."
    ],
    "correctAnswer": 2,
    "explanation": "Không gian mẫu có 4 phần tử $\\{SS, SN, NS, NN\\}$. Có 3 kết quả có ít nhất 1 mặt sấp $\\{SS, SN, NS\\} \\implies P = \\frac{3}{4}$."
  },
  {
    "id": "TOAN9_B26_014",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một hộp chứa 3 tấm thẻ mang số $1; 2; 3$. Rút ngẫu nhiên lần lượt 2 thẻ không hoàn lại. Xác suất để tích hai số ghi trên 2 thẻ là một số chẵn bằng:",
    "options": [
      "A. $\\frac{1}{3}$.",
      "B. $\\frac{1}{2}$.",
      "C. $\\frac{2}{3}$.",
      "D. $\\frac{5}{6}$."
    ],
    "correctAnswer": 2,
    "explanation": "Không gian mẫu có $3 \\times 2 = 6$ kết quả. Chỉ có cặp $(1, 3)$ và $(3, 1)$ có tích lẻ. Vậy có $6 - 2 = 4$ kết quả có tích chẵn $\\implies P = \\frac{4}{6} = \\frac{2}{3}$."
  },
  {
    "id": "TOAN9_B26_015",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Hai bạn An và Bình mỗi người chọn ngẫu nhiên một số từ tập $\\{1; 2; 3; 4\\}$. Xác suất để hai bạn chọn cùng một số là:",
    "options": [
      "A. $\\frac{1}{16}$.",
      "B. $\\frac{1}{4}$.",
      "C. $\\frac{1}{8}$.",
      "D. $\\frac{1}{2}$."
    ],
    "correctAnswer": 1,
    "explanation": "Tổng số cách chọn là $4 \\times 4 = 16$. Cùng số có 4 cách: $(1, 1), (2, 2), (3, 3), (4, 4) \\implies P = \\frac{4}{16} = \\frac{1}{4}$."
  },
  {
    "id": "TOAN9_B26_016",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Gieo một con xúc xắc 6 mặt cân đối. Xác suất để xuất hiện mặt có số chấm là hợp số bằng:",
    "options": [
      "A. $\\frac{1}{3}$.",
      "B. $\\frac{1}{2}$.",
      "C. $\\frac{2}{3}$.",
      "D. $\\frac{1}{6}$."
    ],
    "correctAnswer": 0,
    "explanation": "Trong các số từ 1 đến 6, hợp số gồm $\\{4; 6\\}$ (2 số). Xác suất là $\\frac{2}{6} = \\frac{1}{3}$."
  },
  {
    "id": "TOAN9_B26_017",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một hộp có 2 bi xanh, 2 bi đỏ. Lấy đồng thời 2 viên bi. Xác suất để lấy được 2 viên bi cùng màu bằng:",
    "options": [
      "A. $\\frac{1}{6}$.",
      "B. $\\frac{1}{3}$.",
      "C. $\\frac{1}{2}$.",
      "D. $\\frac{2}{3}$."
    ],
    "correctAnswer": 1,
    "explanation": "Số cách chọn 2 từ 4 là $\\frac{4 \\times 3}{2} = 6$. Cùng màu xanh có 1 cách, cùng màu đỏ có 1 cách $\\implies$ có $1 + 1 = 2$ cách $\\implies P = \\frac{2}{6} = \\frac{1}{3}$."
  },
  {
    "id": "TOAN9_B26_018",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một lớp có 20 học sinh nam và 15 học sinh nữ. Chọn ngẫu nhiên 2 học sinh đi dự đại hội. Xác suất để chọn được 1 nam và 1 nữ bằng:",
    "options": [
      "A. $\\frac{20}{119}$.",
      "B. $\\frac{30}{119}$.",
      "C. $\\frac{60}{119}$.",
      "D. $\\frac{50}{119}$."
    ],
    "correctAnswer": 2,
    "explanation": "Tổng số học sinh là 35. Số cách chọn 2 em là $\\frac{35 \\times 34}{2} = 595$. Số cách chọn 1 nam và 1 nữ là $20 \\times 15 = 300 \\implies P = \\frac{300}{595} = \\frac{60}{119}$."
  },
  {
    "id": "TOAN9_B26_019",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Ba bạn Mai, Lan, Cúc xếp ngẫu nhiên thành một hàng ngang. Xác suất để Mai và Lan đứng cạnh nhau là:",
    "options": [
      "A. $\\frac{1}{3}$.",
      "B. $\\frac{1}{2}$.",
      "C. $\\frac{2}{3}$.",
      "D. $\\frac{5}{6}$."
    ],
    "correctAnswer": 2,
    "explanation": "Không gian mẫu có $3! = 6$ cách. Coi Mai và Lan là một khối (có $2! = 2$ cách hoán vị), xếp với Cúc có $2! = 2$ cách $\\implies 2 \\times 2 = 4$ cách $\\implies P = \\frac{4}{6} = \\frac{2}{3}$."
  },
  {
    "id": "TOAN9_B26_020",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một bài thi trắc nghiệm gồm 3 câu hỏi, mỗi câu có 4 đáp án (chỉ 1 đáp án đúng). Học sinh khoanh ngẫu nhiên cả 3 câu. Xác suất để học sinh đó trả lời đúng cả 3 câu là:",
    "options": [
      "A. $\\frac{1}{12}$.",
      "B. $\\frac{1}{64}$.",
      "C. $\\frac{3}{64}$.",
      "D. $\\frac{1}{27}$."
    ],
    "correctAnswer": 1,
    "explanation": "Tổng số phương án khoanh là $4^3 = 64$. Chỉ có 1 phương án đúng cho cả 3 câu $\\implies P = \\frac{1}{64}$."
  },
  {
    "id": "TOAN9_B26_021",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Xác suất của biến cố không thể xảy ra luôn luôn bằng 0.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Theo định lý cơ bản của xác suất, biến cố không thể không chứa kết quả thuận lợi nào nên $P = 0$."
  },
  {
    "id": "TOAN9_B26_022",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Khi gieo một đồng xu cân đối, nếu 4 lần liên tiếp đều xuất hiện mặt sấp thì lần gieo thứ 5 xác suất ra mặt ngửa sẽ lớn hơn $50\\%$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Đây là ngụy biện con bạc (Gambler's Fallacy). Các lần gieo độc lập với nhau, lần thứ 5 xác suất mặt ngửa vẫn luôn đúng bằng $50\\%$."
  },
  {
    "id": "TOAN9_B26_023",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Biến cố có xác suất bằng 1 được gọi là biến cố chắc chắn.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Biến cố chắc chắn luôn xảy ra trong mọi phép thử, do đó có xác suất bằng 1."
  },
  {
    "id": "TOAN9_B26_024",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Khi gieo một con xúc xắc cân đối, biến cố \"Số chấm là số chẵn\" và biến cố \"Số chấm là số lẻ\" có xác suất bằng nhau.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Cả hai biến cố đều có 3 kết quả thuận lợi trong tổng số 6 kết quả, xác suất đều bằng $\\frac{3}{6} = \\frac{1}{2}$."
  },
  {
    "id": "TOAN9_B26_025",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Xác suất của một biến cố bất kì có thể nhận giá trị bằng $1{,}25$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Xác suất của mọi biến cố luôn bị chặn trong đoạn $[0; 1]$, không thể lớn hơn 1."
  },
  {
    "id": "TOAN9_B26_026",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Nếu một phép thử có $n$ kết quả có thể và biến cố $E$ có $m$ kết quả thuận lợi thì xác suất $P(E) = \\frac{m}{n}$ chỉ đúng khi các kết quả là đồng khả năng.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Công thức xác suất cổ điển chỉ áp dụng được với giả định các kết quả của phép thử là đồng khả năng."
  },
  {
    "id": "TOAN9_B26_027",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Khi tung hai đồng xu cân đối, xác suất để cả hai đồng xu đều ngửa bằng $\\frac{1}{3}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Không gian mẫu có 4 kết quả $\\{SS; SN; NS; NN\\}$. Kết quả cả hai ngửa là $NN \\implies P = \\frac{1}{4}$. Nhầm lẫn phổ biến là gom $SN$ và $NS$ làm một dẫn đến mẫu số bằng 3."
  },
  {
    "id": "TOAN9_B26_028",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Cho biến cố $E$, xác suất của biến cố không xảy ra $E$ (biến cố đối) được tính bằng $1 - P(E)$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Theo tính chất biến cố đối, tổng xác suất của biến cố và biến cố đối luôn bằng 1."
  },
  {
    "id": "TOAN9_B26_029",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Trong trò chơi gieo xúc xắc, xác suất xuất hiện mặt có số chấm lớn hơn hoặc bằng 1 bằng 1.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tất cả 6 mặt xúc xắc đều có số chấm từ 1 đến 6 (đều $\\ge 1$), do đó đây là biến cố chắc chắn."
  },
  {
    "id": "TOAN9_B26_030",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Khi gieo một con xúc xắc 6 mặt, xác suất xuất hiện mặt có số chấm chia hết cho 5 là $\\frac{1}{5}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Chỉ có mặt 5 chấm chia hết cho 5 trong 6 mặt $\\implies P = \\frac{1}{6}$, không phải $\\frac{1}{5}$."
  },
  {
    "id": "TOAN9_B26_031",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Rút ngẫu nhiên 1 thẻ từ hộp chứa 10 tấm thẻ đánh số từ 1 đến 10. Xác suất rút được thẻ mang số nguyên tố là $0{,}4$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Các số nguyên tố là $\\{2; 3; 5; 7\\}$ (4 số). Xác suất bằng $\\frac{4}{10} = 0{,}4$."
  },
  {
    "id": "TOAN9_B26_032",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Gieo hai con xúc xắc cân đối. Xác suất để tổng số chấm xuất hiện bằng 7 lớn hơn xác suất để tổng số chấm xuất hiện bằng 8.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tổng bằng 7 có 6 cặp: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$. Tổng bằng 8 có 5 cặp: $(2,6),(3,5),(4,4),(5,3),(6,2)$. Do $6 > 5$ nên xác suất tổng 7 lớn hơn."
  },
  {
    "id": "TOAN9_B26_033",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Một hộp có 3 viên bi xanh và 7 viên bi đỏ. Rút ngẫu nhiên 1 viên bi, xác suất rút được viên bi đỏ gấp đôi xác suất rút được viên bi xanh.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Xác suất bi đỏ là $\\frac{7}{10} = 0{,}7$, xác suất bi xanh là $\\frac{3}{10} = 0{,}3$. Tỉ lệ là $\\frac{7}{3} \\approx 2{,}33$ lần chứ không phải gấp đôi."
  },
  {
    "id": "TOAN9_B26_034",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Trong một nhóm 4 học sinh có 2 nam và 2 nữ. Chọn ngẫu nhiên 2 học sinh thì xác suất chọn được 2 học sinh cùng giới tính bằng $\\frac{1}{3}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tổng số cách chọn 2 từ 4 là 6. Có 1 cách chọn 2 nam và 1 cách chọn 2 nữ $\\implies 1 + 1 = 2$ cách $\\implies P = \\frac{2}{6} = \\frac{1}{3}$."
  },
  {
    "id": "TOAN9_B26_035",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Chọn ngẫu nhiên một ngày trong tuần. Xác suất chọn được ngày cuối tuần (Thứ Bảy hoặc Chủ Nhật) là $\\frac{2}{7}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tuần có 7 ngày, có 2 ngày cuối tuần $\\implies P = \\frac{2}{7}$."
  },
  {
    "id": "TOAN9_B26_036",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Gieo một con xúc xắc 2 lần. Xác suất để lần đầu xuất hiện mặt 6 chấm và lần hai xuất hiện mặt 1 chấm bằng $\\frac{1}{18}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Cặp $(6, 1)$ là 1 kết quả duy nhất trong 36 kết quả có thể $\\implies P = \\frac{1}{36}$."
  },
  {
    "id": "TOAN9_B26_037",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Một túi có 4 viên bi được đánh số $1; 2; 3; 4$. Rút ngẫu nhiên cùng lúc 2 viên bi thì xác suất tổng hai số là số lẻ bằng $\\frac{2}{3}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Số cách chọn 2 từ 4 là 6: $(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)$. Tổng lẻ gồm $(1,2), (1,4), (2,3), (3,4)$ (4 cặp) $\\implies P = \\frac{4}{6} = \\frac{2}{3}$."
  },
  {
    "id": "TOAN9_B26_038",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Một cặp vợ chồng dự định sinh 3 người con. Giả thiết xác suất sinh con trai hay con gái là như nhau ($50\\%$). Xác suất để gia đình đó có đúng 2 con trai là $\\frac{3}{8}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Không gian mẫu có $2^3 = 8$ kết quả. Các trường hợp có 2 trai, 1 gái là: $TTG, TGT, GTT$ (3 kết quả) $\\implies P = \\frac{3}{8}$."
  },
  {
    "id": "TOAN9_B26_039",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Xếp ngẫu nhiên 4 bạn $A, B, C, D$ vào một bàn dài 4 ghế. Xác suất để bạn $A$ luôn ngồi ở vị trí đầu bàn bên trái là $\\frac{1}{2}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Vị trí đầu bàn bên trái có 4 bạn tranh nhau với cơ hội bình đẳng, xác suất để $A$ được xếp vào đó là $\\frac{1}{4}$."
  },
  {
    "id": "TOAN9_B26_040",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Một bài thi trắc nghiệm gồm 2 câu hỏi, mỗi câu có 4 lựa chọn. Một học sinh đoán mò cả 2 câu. Xác suất để học sinh đó đoán sai cả 2 câu là $\\frac{9}{16}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Mỗi câu xác suất đoán sai là $\\frac{3}{4}$. Do 2 câu độc lập nên xác suất sai cả hai là $\\frac{3}{4} \\times \\frac{3}{4} = \\frac{9}{16}$."
  },
  {
    "id": "TOAN9_B26_041",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc 6 mặt cân đối một lần. Tính xác suất xuất hiện mặt có số chấm là số chẵn. (Nhập số thập phân).",
    "options": [],
    "correctAnswer": "0.5",
    "explanation": "Mặt chẵn là $\\{2; 4; 6\\}$ gồm 3 mặt. Xác suất bằng $\\frac{3}{6} = 0{,}5$."
  },
  {
    "id": "TOAN9_B26_042",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tung một đồng xu cân đối một lần. Tính xác suất đồng xu xuất hiện mặt ngửa. (Nhập số thập phân).",
    "options": [],
    "correctAnswer": "0.5",
    "explanation": "Xác suất bằng $\\frac{1}{2} = 0{,}5$."
  },
  {
    "id": "TOAN9_B26_043",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Một hộp chứa 20 tấm thẻ đánh số từ 1 đến 20. Rút ngẫu nhiên một thẻ. Tính xác suất rút được thẻ ghi số 13.",
    "options": [],
    "correctAnswer": "1/20",
    "explanation": "Chỉ có 1 thẻ mang số 13 trong 20 thẻ $\\implies P = \\frac{1}{20}$."
  },
  {
    "id": "TOAN9_B26_044",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Một đĩa quay hình tròn chia thành 5 phần bằng nhau đánh số $1; 2; 3; 4; 5$. Tính xác suất mũi tên chỉ vào số lớn hơn 3. (Nhập số thập phân).",
    "options": [],
    "correctAnswer": "0.4",
    "explanation": "Số lớn hơn 3 là $\\{4; 5\\}$ (2 số). Xác suất là $\\frac{2}{5} = 0{,}4$."
  },
  {
    "id": "TOAN9_B26_045",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Trong hộp có 4 viên bi xanh và 6 viên bi đỏ có kích thước như nhau. Rút ngẫu nhiên 1 viên bi. Tính xác suất rút được viên bi màu đỏ. (Nhập số thập phân).",
    "options": [],
    "correctAnswer": "0.6",
    "explanation": "Tổng số bi là 10. Xác suất bi đỏ là $\\frac{6}{10} = 0{,}6$."
  },
  {
    "id": "TOAN9_B26_046",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc 6 mặt cân đối. Tính xác suất xuất hiện mặt có số chấm chia hết cho 3. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/3",
    "explanation": "Số chia hết cho 3 là $\\{3; 6\\}$ (2 mặt) $\\implies P = \\frac{2}{6} = \\frac{1}{3}$."
  },
  {
    "id": "TOAN9_B26_047",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Chọn ngẫu nhiên một số tự nhiên có 1 chữ số (từ 0 đến 9). Tính xác suất chọn được số chính phương. (Nhập số thập phân).",
    "options": [],
    "correctAnswer": "0.4",
    "explanation": "Các số chính phương là $\\{0; 1; 4; 9\\}$ (4 số). Tổng có 10 số $\\implies P = \\frac{4}{10} = 0{,}4$."
  },
  {
    "id": "TOAN9_B26_048",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc cân đối. Tính xác suất xuất hiện mặt có số chấm nhỏ hơn hoặc bằng 6.",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Tất cả các mặt đều có số chấm $\\le 6$, đây là biến cố chắc chắn nên $P = 1$."
  },
  {
    "id": "TOAN9_B26_049",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Gieo một con xúc xắc cân đối. Tính xác suất xuất hiện mặt 7 chấm.",
    "options": [],
    "correctAnswer": "0",
    "explanation": "Không có mặt 7 chấm, đây là biến cố không thể nên $P = 0$."
  },
  {
    "id": "TOAN9_B26_050",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Rút 1 lá bài từ bộ bài tú lơ khơ 52 lá. Tính xác suất rút được lá bài mang chất Rô. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/4",
    "explanation": "Có 13 lá bài chất Rô trong 52 lá $\\implies P = \\frac{13}{52} = \\frac{1}{4}$."
  },
  {
    "id": "TOAN9_B26_051",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Gieo đồng thời hai con xúc xắc cân đối 6 mặt. Tính xác suất để tổng số chấm xuất hiện trên hai con xúc xắc bằng 2. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/36",
    "explanation": "Chỉ có 1 kết quả thuận lợi là $(1, 1)$ trong tổng số 36 kết quả $\\implies P = \\frac{1}{36}$."
  },
  {
    "id": "TOAN9_B26_052",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Gieo đồng thời hai con xúc xắc cân đối 6 mặt. Tính xác suất để tổng số chấm trên hai con xúc xắc bằng 7. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/6",
    "explanation": "Các kết quả có tổng bằng 7 là $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ (6 cặp) $\\implies P = \\frac{6}{36} = \\frac{1}{6}$."
  },
  {
    "id": "TOAN9_B26_053",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tung một đồng xu cân đối 3 lần liên tiếp. Tính xác suất để cả 3 lần gieo đều xuất hiện mặt sấp. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/8",
    "explanation": "Không gian mẫu có $2^3 = 8$ kết quả. Chỉ có 1 kết quả thuận lợi là $SSS \\implies P = \\frac{1}{8}$."
  },
  {
    "id": "TOAN9_B26_054",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Một hộp chứa 4 quả cầu đánh số $1; 2; 3; 4$. Rút ngẫu nhiên cùng lúc 2 quả cầu. Tính xác suất để tích hai số ghi trên hai quả cầu bằng 6. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/6",
    "explanation": "Số cách chọn 2 quả cầu từ 4 quả là 6. Chỉ có cặp $\\{2; 3\\}$ có tích bằng $6 \\implies P = \\frac{1}{6}$."
  },
  {
    "id": "TOAN9_B26_055",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Một tổ học sinh có 6 bạn gồm 3 nam và 3 nữ. Thầy giáo gọi ngẫu nhiên một nhóm 2 bạn lên bảng. Tính xác suất để 2 bạn được gọi đều là nữ. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/5",
    "explanation": "Số cách chọn 2 bạn từ 6 bạn là $\\frac{6 \\times 5}{2} = 15$. Số cách chọn 2 nữ từ 3 nữ là $\\frac{3 \\times 2}{2} = 3 \\implies P = \\frac{3}{15} = \\frac{1}{5}$."
  },
  {
    "id": "TOAN9_B26_056",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Chọn ngẫu nhiên một số tự nhiên có hai chữ số từ 10 đến 99. Tính xác suất để số chọn được là một số chia hết cho 11. (Nhập số thập phân).",
    "options": [],
    "correctAnswer": "0.1",
    "explanation": "Có tất cả $99 - 10 + 1 = 90$ số. Các số chia hết cho 11 là $\\{11; 22; \\dots; 99\\}$ (9 số). Xác suất là $\\frac{9}{90} = 0{,}1$."
  },
  {
    "id": "TOAN9_B26_057",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một hộp đựng 10 chiếc thẻ cùng loại đánh số từ 1 đến 10. Bạn Hoa rút ngẫu nhiên cùng lúc 2 chiếc thẻ. Tính xác suất để tổng hai số ghi trên hai chiếc thẻ rút ra bằng 10. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "4/45",
    "explanation": "Số cách chọn 2 thẻ từ 10 thẻ là $\\frac{10 \\times 9}{2} = 45$. Các cặp có tổng bằng 10 là $\\{1, 9\\}, \\{2, 8\\}, \\{3, 7\\}, \\{4, 6\\}$ (4 cặp) $\\implies P = \\frac{4}{45}$."
  },
  {
    "id": "TOAN9_B26_058",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Ba người bạn cùng chơi trò \"Oẳn tù tì\" (mỗi người ra một trong 3 biểu tượng: Búa, Kéo, Bao với cơ hội ngang nhau). Tính xác suất để cả ba người cùng ra biểu tượng giống nhau. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "1/9",
    "explanation": "Mỗi người có 3 lựa chọn, không gian mẫu có $3 \\times 3 \\times 3 = 27$ kết quả. Ba người giống nhau có 3 cách (cùng Búa, cùng Kéo, cùng Bao) $\\implies P = \\frac{3}{27} = \\frac{1}{9}$."
  },
  {
    "id": "TOAN9_B26_059",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Khóa số vali gồm 3 chữ số (mỗi vị trí từ 0 đến 9). Tên trộm thử bấm ngẫu nhiên một mã số. Tính xác suất để tên trộm mở trúng mã số đúng ngay lần thử đầu tiên. (Nhập phân số).",
    "options": [],
    "correctAnswer": "1/1000",
    "explanation": "Có $10 \\times 10 \\times 10 = 1000$ mã số khác nhau. Chỉ có 1 mã số đúng $\\implies P = \\frac{1}{1000}$."
  },
  {
    "id": "TOAN9_B26_060",
    "grade": 9,
    "chapter": 8,
    "lesson": 26,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một nhân viên bốc ngẫu nhiên 2 sản phẩm từ một lô hàng gồm 8 sản phẩm loại tốt và 2 sản phẩm bị lỗi. Tính xác suất để nhân viên đó không bốc phải sản phẩm lỗi nào. (Nhập phân số tối giản).",
    "options": [],
    "correctAnswer": "28/45",
    "explanation": "Tổng số sản phẩm là 10. Số cách lấy 2 sản phẩm là $\\frac{10 \\times 9}{2} = 45$. Số cách lấy 2 sản phẩm đều loại tốt (từ 8 sản phẩm tốt) là $\\frac{8 \\times 7}{2} = 28 \\implies P = \\frac{28}{45}$."
  }
];
