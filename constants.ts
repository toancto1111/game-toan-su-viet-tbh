
import { Rarity, Hero, Artifact, Synergy } from './types';

// ============================================================
// CẤU HÌNH ẢNH TƯỚNG LOCAL
// Đặt ảnh vào thư mục: public/heroes/allies/ hoặc public/heroes/enemies/
// Tên file: <id>.png hoặc <id>.jpg  (ví dụ: h1_1.png, e1_1.jpg)
// Nếu file chưa có → tự động dùng ảnh mặc định (default_ally / default_enemy)
// ============================================================

/** Trả về đường dẫn ảnh local cho hero. Nếu không có → dùng ảnh mặc định. */
const getHeroImage = (id: string, faction: 'ally' | 'enemy'): string => {
  const folder = faction === 'ally' ? 'allies' : 'enemies';
  // Thử các định dạng phổ biến: .png, .jpg, .jpeg, .webp
  // Vite/browser sẽ load file đúng nếu tồn tại
  // Trả về đường dẫn .png trước; nếu muốn dùng .jpg thì đổi tên file tương ứng
  return `./heroes/${folder}/${id}.png`;
};

/** Ảnh mặc định khi ảnh riêng chưa có */
export const DEFAULT_ALLY_IMG  = './heroes/default_ally.png';
export const DEFAULT_ENEMY_IMG = './heroes/default_enemy.png';

/** Danh sách các video kỹ năng tướng có sẵn trong thư mục public/videos/ */
export const AVAILABLE_VIDEOS: string[] = [
  "bui_thi_xuan",
  "chu_dong_tu",
  "chu_van_an",
  "dang_dung",
  "dao_duy_tu",
  "da_tuong",
  "de_lai",
  "de_nghi",
  "dinh_bo_linh",
  "dinh_dien",
  "dinh_le",
  "doan_nhu_hai",
  "ho_han_thuong",
  "ho_nguyen_trung",
  "ho_quy_ly",
  "khuc_thua_du",
  "kinh_duong_vuong",
  "lac_long_quan",
  "le_hoan",
  "le_lai",
  "le_loi",
  "le_phu_tran",
  "le_sat",
  "le_trien",
  "luu_co",
  "ly_bi",
  "ly_cong_uan",
  "ly_nhan_tong",
  "ly_thai_tong",
  "ly_thanh_tong",
  "ly_thuong_kiet",
  "mac_cuu",
  "mac_dang_doanh",
  "mac_dang_dung",
  "mac_kinh_cung",
  "mac_kinh_dien",
  "mai_thuc_loan",
  "ngo_quyen",
  "nguyen_an",
  "nguyen_bac",
  "nguyen_binh_khiem",
  "nguyen_canh_di",
  "nguyen_hoang",
  "nguyen_hue",
  "nguyen_huu_canh",
  "nguyen_huu_tien",
  "nguyen_khoai",
  "nguyen_kim",
  "nguyen_kinh",
  "nguyen_phi_khanh",
  "nguyen_phi_y_lan",
  "nguyen_phuc_chu",
  "nguyen_phuc_nguyen",
  "nguyen_phuc_tan",
  "nguyen_suy",
  "nguyen_trai",
  "nguyen_xi",
  "pham_ngu_lao",
  "phung_hung",
  "thanh_giong",
  "than_long_nu",
  "than_nhan_trung",
  "thien_su_van_hanh",
  "thuc_phan",
  "to_hien_thanh",
  "tran_binh_trong",
  "tran_hung_dao",
  "tran_khanh_du",
  "tran_khat_chan",
  "tran_ngoi",
  "tran_nguyen_dan",
  "tran_nguyen_han",
  "tran_nhan_tong",
  "tran_nhat_duat",
  "tran_quang_dieu",
  "tran_quang_khai",
  "tran_quoc_toan",
  "tran_quoc_tuan",
  "tran_quy_khoang",
  "tran_thai_tong",
  "tran_thanh_tong",
  "tran_thi_dung",
  "tran_thu_do",
  "tran_tung",
  "tran_tu_khanh",
  "trieu_quang_phuc",
  "trieu_thi_trinh",
  "trinh_kiem",
  "trinh_tu",
  "trinh_tung",
  "trung_nhi",
  "trung_trac",
  "yet_kieu",
];

const getRarityByStat = (stat: number): Rarity => {
  if (stat >= 90) return Rarity.UR;
  if (stat >= 80) return Rarity.SSR;
  if (stat >= 70) return Rarity.SR;
  if (stat >= 60) return Rarity.R;
  return Rarity.C;
};

const determineRoleAndScope = (title: string, skillDesc: string): { 
  role: 'Tiên phong' | 'Sát thủ' | 'Hỗ trợ' | 'Khống chế' | 'Chiến tướng' | 'Cung thủ' | 'Pháp sư' | 'Đấu sĩ', 
  targetScope: 'single' | 'front_row' | 'back_row' | 'row' | 'column' | 'all' | 'random2' | 'random3' | 'lowest_hp' | 'highest_hp' | 'highest_atk' | 'lowest_morale' | 'dead_ally',
  skillEffect?: any
} => {
  const lowerDesc = skillDesc.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  let role: 'Tiên phong' | 'Sát thủ' | 'Hỗ trợ' | 'Khống chế' | 'Chiến tướng' | 'Cung thủ' | 'Pháp sư' | 'Đấu sĩ' = 'Chiến tướng';
  let targetScope: 'single' | 'front_row' | 'back_row' | 'row' | 'column' | 'all' | 'random2' | 'random3' | 'lowest_hp' | 'highest_hp' | 'highest_atk' | 'lowest_morale' | 'dead_ally' = 'single';
  let skillEffect: any = undefined;

  // 1. Phân tích Role
  if (lowerDesc.includes('hồi máu') || lowerDesc.includes('hồi phục') || lowerDesc.includes('thanh tẩy') || lowerDesc.includes('hồi 20% thanh nộ') || lowerDesc.includes('hồi nộ') || lowerTitle.includes('tiên mẫu') || lowerTitle.includes('quốc mẫu') || lowerTitle.includes('quan âm') || lowerTitle.includes('thiền sư')) {
    role = 'Hỗ trợ';
  } else if (lowerDesc.includes('giáp') || lowerDesc.includes('chịu đòn') || lowerTitle.includes('tiên phong') || lowerDesc.includes('khiêu khích') || lowerDesc.includes('phản lại') || lowerDesc.includes('phản sát thương')) {
    role = 'Tiên phong';
  } else if (lowerDesc.includes('choáng') || lowerDesc.includes('làm chậm') || lowerDesc.includes('giảm tốc') || lowerDesc.includes('đóng băng') || lowerDesc.includes('hóa đá') || lowerDesc.includes('câm lặng')) {
    role = 'Khống chế';
  } else if (lowerDesc.includes('phép') || lowerDesc.includes('sấm sét') || lowerDesc.includes('lửa') || lowerDesc.includes('thiêu')) {
    role = 'Pháp sư';
  } else if (lowerDesc.includes('nỏ') || lowerDesc.includes('cung') || lowerTitle.includes('cung') || lowerDesc.includes('bắn')) {
    role = 'Cung thủ';
  } else if (lowerDesc.includes('bỏ qua') || lowerDesc.includes('máu thấp nhất') || lowerDesc.includes('xuyên giáp') || lowerDesc.includes('chảy máu') || lowerDesc.includes('độc')) {
    role = 'Sát thủ';
  } else if (lowerTitle.includes('đại tướng') || lowerTitle.includes('mãnh tướng') || lowerTitle.includes('đấu sĩ')) {
    role = 'Đấu sĩ';
  }

  // 2. Phân tích Target Scope (Ưu tiên đặc biệt trước hàng/toàn thể)
  if (lowerDesc.includes('máu thấp nhất') || lowerDesc.includes('hp thấp nhất') || lowerDesc.includes('yếu máu nhất')) {
    targetScope = 'lowest_hp';
  } else if (lowerDesc.includes('máu cao nhất') || lowerDesc.includes('hp cao nhất')) {
    targetScope = 'highest_hp';
  } else if (lowerDesc.includes('tấn công cao nhất') || lowerDesc.includes('tấn công mạnh nhất') || lowerDesc.includes('lực chiến cao nhất') || lowerDesc.includes('chỉ số tấn công cơ bản cao nhất')) {
    targetScope = 'highest_atk';
  } else if (lowerDesc.includes('nộ khí thấp nhất') || lowerDesc.includes('nộ thấp nhất')) {
    targetScope = 'lowest_morale';
  } else if (lowerDesc.includes('hồi sinh')) {
    targetScope = 'dead_ally';
  } else if (lowerDesc.includes('hàng dưới') || lowerDesc.includes('hàng sau')) {
    targetScope = 'back_row';
  } else if (lowerDesc.includes('hàng dọc') || lowerDesc.includes('cột') || lowerDesc.includes('xuyên')) {
    targetScope = 'column';
  } else if (lowerDesc.includes('hàng trên') || lowerDesc.includes('hàng trước')) {
    targetScope = 'front_row';
  } else if (lowerDesc.includes('toàn đội') || lowerDesc.includes('toàn bộ') || lowerDesc.includes('tất cả') || lowerDesc.includes('diện rộng')) {
    targetScope = 'all';
  } else if (lowerDesc.includes('ngẫu nhiên 2')) {
    targetScope = 'random2';
  } else if (lowerDesc.includes('ngẫu nhiên 3') || lowerDesc.includes('ngẫu nhiên')) {
    targetScope = 'random3';
  }

  // 3. Phân tích Skill Effect
  if (lowerDesc.includes('hút 20% nộ') || lowerDesc.includes('hút nộ')) {
    skillEffect = 'rage_drain';
  } else if (lowerDesc.includes('hồi') && (lowerDesc.includes('nộ') || lowerDesc.includes('chí khí'))) {
    skillEffect = 'energy_regen';
  } else if (lowerDesc.includes('hồi sinh')) {
    skillEffect = 'revive';
  } else if (lowerDesc.includes('hồi máu') || lowerDesc.includes('hồi phục')) {
    skillEffect = 'heal';
  } else if (lowerDesc.includes('choáng')) {
    skillEffect = 'stun';
  } else if (lowerDesc.includes('đóng băng')) {
    skillEffect = 'freeze';
  } else if (lowerDesc.includes('câm lặng')) {
    skillEffect = 'silence';
  } else if (lowerDesc.includes('khiên ảo') || lowerDesc.includes('tạo khiên') || lowerDesc.includes('lớp khiên')) {
    skillEffect = 'shield';
  } else if (lowerDesc.includes('thanh tẩy') || lowerDesc.includes('giải 1 trạng thái')) {
    skillEffect = 'cleanse';
  } else if (lowerDesc.includes('bỏ qua') && lowerDesc.includes('giáp')) {
    skillEffect = 'armor_pen';
  } else if (lowerDesc.includes('phá giáp') || lowerDesc.includes('kháng phép')) {
    skillEffect = 'armor_break';
  } else if (lowerDesc.includes('giảm') && lowerDesc.includes('tấn công')) {
    skillEffect = 'atk_down';
  } else if (lowerDesc.includes('tăng') && lowerDesc.includes('tấn công')) {
    skillEffect = 'atk_up';
  } else if (lowerDesc.includes('tăng') && lowerDesc.includes('phòng thủ')) {
    skillEffect = 'def_up';
  } else if (lowerDesc.includes('giảm tốc') || lowerDesc.includes('làm chậm')) {
    skillEffect = 'slow';
  } else if (lowerDesc.includes('chảy máu')) {
    skillEffect = 'bleed';
  } else if (lowerDesc.includes('thiêu đốt')) {
    skillEffect = 'burn';
  } else if (lowerDesc.includes('độc')) {
    skillEffect = 'poison';
  } else if (lowerDesc.includes('phản lại') || lowerDesc.includes('phản sát thương')) {
    skillEffect = 'reflect';
  } else if (lowerDesc.includes('miễn khống')) {
    skillEffect = 'immune_cc';
  } else if (lowerDesc.includes('bất tử')) {
    skillEffect = 'undying';
  } else if (lowerDesc.includes('hút máu')) {
    skillEffect = 'lifesteal';
  }

  return { role, targetScope, skillEffect };
};


const toSlug = (str: string): string => {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '_');
};

const createHero = (id: string, name: string, stat: number, chapter: number, faction: 'ally' | 'enemy', title: string = 'Hào kiệt'): Hero => {
  const inferredTitle = stat >= 90 ? 'Chủ tướng' : (stat >= 80 ? 'Danh tướng' : title);
  const skillDesc = 'Gây sát thương dựa trên chỉ số cơ bản.';
  const autoScopeAndRole = determineRoleAndScope(inferredTitle, skillDesc);
  return {
    id, name, title: inferredTitle, rarity: getRarityByStat(stat),
    overall: stat, atk: stat, def: stat - 5, spd: 100 + (stat % 20),
    hp: stat * 60, maxHp: stat * 60,
    morale: 0, initialMorale: stat >= 90 ? 50 : 25,
    star: 1, fragments: 0, description: `Nhân vật lịch sử thuộc chương ${chapter}.`,
    skillName: 'Chiến thuật quân sự', skillDesc,
    role: autoScopeAndRole.role,
    targetScope: autoScopeAndRole.targetScope,
    skillEffect: autoScopeAndRole.skillEffect,
    skillVideoUrl: `/videos/${toSlug(name)}.mp4`,
    image: getHeroImage(id, faction), faction, chapter
  };
};

const createHero3 = (
  id: string, name: string, stat: number, chapter: number, faction: 'ally' | 'enemy',
  title = 'Hào kiệt', description = '', skillName = '', skillDesc = '',
  extraConfig: {
    role?: 'Tiên phong' | 'Sát thủ' | 'Hỗ trợ' | 'Khống chế' | 'Chiến tướng' | 'Cung thủ' | 'Pháp sư' | 'Đấu sĩ' | 'Đỡ đòn';
    targetScope?: 'single' | 'front_row' | 'back_row' | 'row' | 'column' | 'all' | 'random2' | 'random3' | 'lowest_hp' | 'highest_hp' | 'highest_atk' | 'lowest_morale' | 'dead_ally';
    skillEffect?: any;
    skillEffectChance?: number;
    skillDmgMult?: number;
  } = {}
): Hero => {
  const inferredTitle = stat >= 90 ? 'Chủ tướng' : (stat >= 80 ? 'Danh tướng' : title);
  const finalSkillDesc = skillDesc || 'Gây sát thương dựa trên chỉ số cơ bản.';
  const autoScopeAndRole = determineRoleAndScope(inferredTitle, finalSkillDesc);
  
  return {
    id, name, title: inferredTitle, rarity: getRarityByStat(stat),
    overall: stat, atk: stat, def: stat - 5, spd: 100 + (stat % 20),
    hp: stat * 60, maxHp: stat * 60,
    morale: 0, initialMorale: stat >= 90 ? 50 : 25,
    star: 1, fragments: 0, description: description || `Nhân vật lịch sử thuộc chương ${chapter}.`,
    skillName: skillName || 'Chiến thuật quân sự', skillDesc: finalSkillDesc,
    role: extraConfig.role || autoScopeAndRole.role,
    targetScope: extraConfig.targetScope || autoScopeAndRole.targetScope,
    skillEffect: extraConfig.skillEffect || autoScopeAndRole.skillEffect,
    skillEffectChance: extraConfig.skillEffectChance,
    skillDmgMult: extraConfig.skillDmgMult,
    skillVideoUrl: `/videos/${toSlug(name)}.mp4`,
    image: getHeroImage(id, faction), faction, chapter
  };
};


// --- DỮ LIỆU TỪ PDF ---

// Hàm tạo hero với mô tả chi tiết
const createHero2 = (
  id: string, name: string, stat: number, chapter: number, faction: 'ally' | 'enemy',
  title = 'Hào kiệt', description = '', skillName = '', skillDesc = '', basicAttackDesc?: string,
  subFaction?: 'mac' | 'le_trinh' | 'nguyen' | 'neutral'
): Hero => {
  const inferredTitle = stat >= 90 ? 'Chủ tướng' : (stat >= 80 ? 'Danh tướng' : title);
  const finalSkillDesc = skillDesc || 'Gây sát thương dựa trên chỉ số cơ bản.';
  const autoScopeAndRole = determineRoleAndScope(inferredTitle, finalSkillDesc);
  return {
    id, name, title: inferredTitle, rarity: getRarityByStat(stat),
    overall: stat, atk: stat, def: stat - 5, spd: 100 + (stat % 20),
    hp: stat * 60, maxHp: stat * 60,
    morale: 0, initialMorale: stat >= 90 ? 50 : 25,
    star: 1, fragments: 0, description: description || `Nhân vật lịch sử thuộc chương ${chapter}.`,
    skillName: skillName || 'Chiến thuật quân sự', skillDesc: finalSkillDesc,
    role: autoScopeAndRole.role,
    targetScope: autoScopeAndRole.targetScope,
    skillEffect: autoScopeAndRole.skillEffect,
    skillVideoUrl: `/videos/${toSlug(name)}.mp4`,
    image: getHeroImage(id, faction), faction, chapter,
    ...(subFaction ? { subFaction } : {})
  };
};

const ALL_HEROES: Hero[] = [
  // ═══════════════════════════════════════ CHƯƠNG 1 ═══════════════════════════════════════
  createHero3('h1_1','Kinh Dương Vương',100,1,'ally','Thủy tổ',
    'Thời kỳ tiền Hồng Bàng (khoảng thế kỷ XXIX TCN) | Con thứ của Đế Minh (hậu duệ Viêm Đế Thần Nông) | Vị vua thủy tổ mở cõi cội nguồn dân tộc Việt trong truyền thuyết, lập nên nước Xích Quỷ. Kết duyên cùng Long Nữ, sinh ra Sùng Lãm (Lạc Long Quân).',
    'Xích Quỷ Khai Thiên','Tụ linh khí nguồn cội, hồi 20% thanh nộ khí và tạo Khiên ảo bằng 15% máu tối đa cho toàn bộ đội hình phe ta trong 2 hiệp.',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'shield', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h1_2','Lạc Long Quân',99,1,'ally','Long Vương',
    'Huyền sử thời Hồng Bàng | Con trai Kinh Dương Vương và Long Nữ | Diệt trừ ba đại yêu quái bảo vệ bách tính (Ngư Tinh, Hồ Tinh, Mộc Tinh). Hướng dẫn dân chúng cày cấy, ăn mặc. Cùng Âu Cơ sinh bọc trăm trứng nở trăm người con.',
    'Thủy Phủ Long Uy','Gây 100% sát thương phép lên toàn đội hình địch. Có 25% tỷ lệ khiến toàn bộ kẻ địch bị Choáng trong 1 hiệp.',
    { role:'Pháp sư', targetScope:'all', skillEffect:'stun', skillEffectChance:25, skillDmgMult:10 }),

  createHero3('h1_3','Đế Lai',78,1,'ally','Danh Tướng',
    'Thời kỳ thần thoại cổ đại | Con của Đế Nghi, cháu nội Đế Minh | Đưa quân tuần du phương Nam, chiếm đóng vùng biên viễn một thời gian. Là cha của nàng Âu Cơ, nhân vật xúc tác gián tiếp cho cuộc hội ngộ giữa Lạc Long Quân và Âu Cơ.',
    'Đế Vương Tuần Du','Gây 135% sát thương vật lý lên 3 tướng địch hàng trên. Có 20% tỷ lệ làm giảm 10% Tấn công của địch trong 1 hiệp.',
    { role:'Chiến tướng', targetScope:'front_row', skillEffect:'atk_down', skillEffectChance:20, skillDmgMult:13.5 }),
  createHero3('h1_4','Đế Nghi',77,1,'ally','Danh Tướng',
    'Thời kỳ thần thoại Tam Hoàng Ngũ Đế | Dòng dõi Viêm Đế | Đế vương phương Bắc thần thoại, người anh trai cùng cha khác mẹ của Lộc Tục. Thừa kế ngôi vị quản lý phương Bắc từ cha. Mốc phân chia quản lý hai phương Nam - Bắc trong huyền sử.',
    'Phân Định Thiên Hạ','Gây 85% sát thương phép lên toàn đội hình địch. Có 20% tỷ lệ làm giảm 15% Kháng phép của địch trong 2 hiệp.',
    { role:'Pháp sư', targetScope:'all', skillEffect:'armor_break', skillEffectChance:20, skillDmgMult:8.5 }),
  createHero3('h1_5','Thánh Gióng',89,1,'ally','Thiên Vương',
    'Thời Hùng Vương thứ 6 | Làng Gióng (xã Phù Đổng, Gia Lâm, Hà Nội) | Lớn nhanh như thổi nhờ cơm cà dân làng nuôi nấng. Mặc áo giáp sắt, cưỡi ngựa sắt, cầm roi sắt quét sạch quân giặc Ân. Đánh tan quân giặc xong bay thẳng về trời từ đỉnh núi Sóc Sơn.',
    'Xung Thiên Thiết Kỵ','Gây 220% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh cộng sẵn 20% tỷ lệ bạo kích.',
    { role:'Tiên phong', targetScope:'single', skillEffect:'crit_up', skillEffectChance:100, skillDmgMult:22 }),
  createHero3('h1_6','Chử Đồng Tử',79,1,'ally','Thánh nhân',
    'Thời Hùng Vương thứ 18 | Làng Chử Xá (Văn Giang, Hưng Yên) | Kỳ ngộ và kết duyên cùng công chúa Tiên Dung tại bãi Tự Nhiên. Cùng vợ tiếp thu gậy thần và nón lá để cứu nhân độ thế. Phát triển giao thương, mở mang mạng lưới buôn bán đường sông hưng thịnh.',
    'Tiên Cảnh Độ Thế','Hồi máu đơn bằng 18% máu tối đa cho đồng minh yếu máu nhất, đồng thời tạo một lớp Khiên ảo tương đương 15% máu tối đa, duy trì 2 hiệp.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'shield', skillEffectChance:100, skillDmgMult:0 }),

  createHero3('h1_7','Thần Long Nữ',69,1,'ally','Tiên nữ',
    'Thời kỳ thần thoại Hồng Bàng | Động Đình hồ, con gái Động Đình Quân | Kết duyên cùng Kinh Dương Vương, hòa hợp hai dòng dõi Sơn - Thủy. Sinh ra Lạc Long Quân, duy trì huyết mạch rồng phương Nam. Biểu tượng cội rễ khởi nguồn cho danh xưng Con Rồng.',
    'Động Đình Mẫu Nghi','Hồi máu bằng 12% máu tối đa cho đồng minh có HP thấp nhất, đồng thời cấp hiệu ứng Miễn khống cho đồng minh đó trong 1 hiệp (tỷ lệ 25%).',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'immune_cc', skillEffectChance:25, skillDmgMult:0 }),
  createHero3('h1_8','Âu Cơ',98,1,'ally','Tiên mẫu',
    'Huyền sử thời Hồng Bàng | Dòng dõi Thần Nông (con gái Đế Lai) | Cùng Lạc Long Quân sinh ra bọc trăm trứng. Dẫn 50 người con lên vùng trung du và non cao (Phong Châu), khai hoang trồng trọt, lập ấp dựng làng. Vị Quốc mẫu tối thượng biểu trưng cho đức hy sinh.',
    'Bọc Trăm Trứng Thiêng','Hồi máu diện rộng cho toàn đội bằng 8% máu tối đa của bà. Có 20% tỷ lệ Thanh tẩy 1 trạng thái bất lợi cho toàn đội.',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'cleanse', skillEffectChance:20, skillDmgMult:0 }),
  createHero3('h1_9','Sơn Tinh',88,1,'ally','Thần núi',
    'Thời Hùng Vương thứ 18 | Động Lăng Sương (Thanh Thủy, Phú Thọ) | Đem lễ vật quý hiếm hỏi cưới công chúa Mỵ Nương. Đánh bại Thủy Tinh trong trận chiến trị thủy dâng nước ngập lụt. Biểu tượng vĩ đại cho ý chí chế ngự thiên tai lũ lụt của cư dân lúa nước.',
    'Uy Trấn Tản Viên','Gây 120% sát thương vật lý lên 3 tướng địch hàng trên. Bản thân nhận lớp Khiên ảo bằng 15% máu tối đa trong 2 hiệp.',
    { role:'Khống chế', targetScope:'front_row', skillEffect:'shield', skillEffectChance:100, skillDmgMult:12 }),
  createHero3('h1_10','An Dương Vương',87,1,'ally','Vua nước Âu Lạc',
    'Thế kỷ III TCN - 179 TCN | Thủ lĩnh bộ tộc Âu Việt | Hợp nhất người Âu Việt và Lạc Việt thành nhà nước Âu Lạc. Chỉ huy nhân dân đánh bại 50 vạn quân Tần. Xây dựng công trình phòng thủ Cổ Loa. Biểu tượng anh hùng dân tộc nhưng cũng là bài học mất cảnh giác.',
    'Linh Quang Kim Trảo','Gây 145% sát thương vật lý lên 1 hàng dọc. Đòn đánh bỏ qua 15% giáp của mục tiêu.',
    { role:'Cung thủ', targetScope:'column', skillEffect:'armor_pen', skillEffectChance:100, skillDmgMult:14.5 }),
  createHero3('h1_11','Lang Liêu',66,1,'ally','Hoàng tử',
    'Thời Hùng Vương thứ 6 - thứ 7 | Phong Châu, con trai thứ 18 của Hùng Huy Vương | Được thần nhân báo mộng, sáng tạo ra bánh Chưng (vuông - Đất) và bánh Giầy (tròn - Trời). Khai sinh ra phong tục ẩm thực Tết cổ truyền và triết lý sống hòa hợp với nông nghiệp lúa nước.',
    'Bánh Chưng Đất Trời','Hồi 15% Nộ khí cho tướng đồng minh có Nộ khí thấp nhất. Tăng 12% Tấn công cho tướng đó trong 2 hiệp.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h1_12','Tiên Dung',65,1,'ally','Công chúa',
    'Thời Hùng Vương thứ 18 | Đô thành Phong Châu, con gái Hùng Duệ Vương | Bỏ qua cung son điện ngọc, kiên quyết thành hôn cùng chàng trai nghèo Chử Đồng Tử. Cùng chồng mở chợ, mở rộng giao thương hàng hải. Biểu tượng sớm nhất của nữ quyền tự do yêu đương.',
    'Phá Lệ Vương Triều','Gây 115% sát thương phép lên 3 tướng địch hàng trước. Có 15% tỷ lệ làm giảm 12% Tốc độ của địch trong 2 hiệp.',
    { role:'Pháp sư', targetScope:'front_row', skillEffect:'slow', skillEffectChance:15, skillDmgMult:11.5 }),

  createHero3('h1_13','Cao Lỗ',68,1,'ally','Thần cung',
    'Thế kỷ III TCN - khoảng 179 TCN | Xã Cao Đức, Gia Bình, Bắc Ninh | Thiết kế và giám sát xây dựng đại công trình phòng thủ Cổ Loa. Sáng chế ra "Linh quang Kim Quy thần cơ nỏ" (Nỏ Liên Châu). Nhà phát minh kỹ thuật quân sự thiên tài đầu tiên trong lịch sử.',
    'Nỏ Thần Liên Châu','Gây 95% sát thương vật lý lên 3 tướng địch hàng trên. Có 10% tỷ lệ gây Chảy máu trong 1 hiệp.',
    { role:'Cung thủ', targetScope:'front_row', skillEffect:'bleed', skillEffectChance:10, skillDmgMult:9.5 }),
  createHero3('h1_14','Lý Ông Trọng',67,1,'ally','Đại tướng',
    'Thế kỷ III TCN | Làng Chèm (xã Thụy Phương, Hà Nội) | Có vóc dáng khổng lồ. Được cử sang giúp Tần Thủy Hoàng; trấn thủ ải, khiến quân Hung Nô khiếp đảm. Võ tướng người Việt đầu tiên được ghi nhận công lao vang dội phương Bắc.',
    'Tráng Sĩ Khổng Lồ','Gây 135% sát thương vật lý lên 1 mục tiêu hàng trên. Tăng 10% Phòng thủ bản thân trong 1 hiệp.',
    { role:'Đấu sĩ', targetScope:'single', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:13.5 }),
  createHero3('h1_15','Lữ Gia',64,1,'ally','Tướng quân',
    'Thế kỷ II TCN - 111 TCN | Người gốc Lạc Việt (quê tại Lôi Dương - Thanh Hóa) | Làm Thừa tướng ba đời vua Nam Việt. Quyết liệt chống lại âm mưu sáp nhập Nam Việt vào nhà Tây Hán. Phát động chính biến tiêu diệt phe chủ hàng, dốc toàn lực lãnh đạo quân dân kháng cự đại quân nhà Hán.',
    'Sứ Mệnh Trấn Biên','Gây 110% sát thương vật lý lên 1 hàng dọc. Tăng 8% Tấn công bản thân trong 1 hiệp.',
    { role:'Chiến tướng', targetScope:'column', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:11 }),
  createHero3('h1_16','Hùng Duệ Vương',59,1,'ally','Quốc Vương',
    'Khoảng thế kỷ III TCN | Phong Châu (Phú Thọ) | Tổ chức kén rể cho công chúa Mỵ Nương (Sơn Tinh - Thủy Tinh). Nhận thấy vận nước đã suy, theo lời khuyên của Tản Viên Sơn Thánh đã nhường lại giang sơn cho Thục Phán để tránh binh đao.',
    'Thoái Vị Nhường Hiền','Tăng 8% Phòng thủ cho toàn bộ đồng minh hàng trước trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'front_row', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h1_17','Mai An Tiêm',58,1,'ally','Hoàng thân',
    'Thời Hùng Vương | Nghĩa tử vua Hùng | Bị đi đày ra đảo hoang (Nga Sơn) vì câu nói trung thực. Tự lực cánh sinh, thuần dưỡng giống dưa hấu. Khắc tên lên quả dưa thả trôi đại dương giao thương, biến đảo hoang thành vùng đất trù phú.',
    'Dưa Đỏ Hoang Đảo','Gây 110% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân tự hồi phục lượng máu bằng 5% máu tối đa.',
    { role:'Tiên phong', targetScope:'single', skillEffect:'heal', skillEffectChance:100, skillDmgMult:11 }),
  createHero3('h1_18','Mỵ Nương',57,1,'ally','Công chúa',
    'Thời Hùng Vương thứ 18 | Đô thành Phong Châu, con gái Hùng Duệ Vương | Nhân vật trung tâm của sự kiện kén rể lẫy lừng giữa Sơn Tinh và Thủy Tinh. Theo Sơn Tinh về núi Tản Viên sinh sống, cùng chồng chăm lo ấm no cho muôn dân xứ Đoài.',
    'Hồng Nhan Sắc Nước','Gây 40% sát thương phép lên toàn địch. Có 8% tỷ lệ giảm 8% Công của địch.',
    { role:'Khống chế', targetScope:'all', skillEffect:'atk_down', skillEffectChance:8, skillDmgMult:4 }),
  createHero3('h1_19','Mỵ Châu',56,1,'ally','Công chúa',
    'Thế kỷ III TCN - 179 TCN | Con gái độc nhất của An Dương Vương Thục Phán | Cuộc hôn nhân chính trị vô tình để lộ bí mật quân sự Nỏ Thần. Rải lông ngỗng dọc đường tháo chạy làm dấu cho chồng, khiến quân giặc đuổi kịp. Bi kịch đau xót về bài học "đặt tình riêng lên trên quốc gia".',
    'Dấu Lông Ngỗng','Gây 80% sát thương vật lý lên 1 mục tiêu. Có 8% tỷ lệ làm giảm 8% Né tránh của mục tiêu.',
    { role:'Khống chế', targetScope:'single', skillEffect:'none', skillEffectChance:8, skillDmgMult:8 }),
  createHero3('h1_20','Nồi Hầu',55,1,'ally','Hào kiệt',
    'Thế kỷ III TCN | Vùng Cổ Loa (Đông Anh, Hà Nội) | Giúp vua Thục dẹp yên các thế lực chống đối, chiêu mộ binh sĩ xây đắp thành Cổ Loa. Thống lĩnh một cánh quân hộ vệ chống Triệu Đà. Cùng Cao Lỗ kiên trung bảo vệ kinh đô Cổ Loa đến phút cuối.',
    'Lạc Tướng Cố Thủ','Gây 90% sát thương vật lý lên 1 hàng dọc.',
    { role:'Tiên phong', targetScope:'column', skillEffect:'none', skillEffectChance:0, skillDmgMult:9 }),
// ═══════════════════════════════════════ CHƯƠNG 2 ═══════════════════════════════════════
  createHero3('h2_1','Trưng Trắc',85,2,'ally','Nữ Vương',
    'Thế kỷ I (khoảng 14 – 43) | Mê Linh (Hà Nội ngày nay), con gái Lạc tướng Mê Linh, vợ Thi Sách | Lãnh đạo nhân dân cùng các Lạc tướng nổi dậy khởi nghĩa năm 40 chống lại ách đô hộ tàn bạo của Thái thú Tô Định. Đánh chiếm 65 thành trì ở Giao Chỉ, Cửu Chân, Nhật Nam, Hợp Phố, xưng vương đóng đô tại Mê Linh. Lời thề xuất quân tại cửa sông Hát: "Một xin rửa sạch nước thù / Hai xin dựng lại nghiệp xưa họ Hùng...".',
    'Hát Môn Thề Sông Núi','Gây 80% sát thương phép lên toàn đội hình địch, đồng thời tăng 15% Tấn công cho toàn bộ đội hình phe ta trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:8 }),
  createHero3('h2_2','Trưng Nhị',84,2,'ally','Nữ tướng',
    'Thế kỷ I (khoảng 16 – 43) | Mê Linh (Hà Nội), em gái ruột của Trưng Trắc | Cùng chị gái Trưng Trắc tập hợp lực lượng, huấn luyện binh sĩ. Chỉ huy cánh quân chủ lực công phá trị sở Luy Lâu, đánh đuổi quan lại nhà Đông Hán về phương Bắc.',
    'Bình Khôi Phá Trận','Gây 135% sát thương vật lý lên 3 tướng địch hàng trước. Có 20% tỷ lệ khiến mục tiêu bị Choáng trong 1 hiệp.',
    { role:'Tiên phong', targetScope:'front_row', skillEffect:'stun', skillEffectChance:20, skillDmgMult:13.5 }),
  createHero3('h2_3','Triệu Thị Trinh',88,2,'ally','Nữ tướng',
    '225 – 248 (Thế kỷ III) | Miền núi Quan Yên (huyện Yên Định, tỉnh Thanh Hóa) | Cùng anh dấy binh ở núi Nưa, đánh chiếm quận Cửu Chân và lan rộng khắp Giao Châu, làm rung chuyển nhà Đông Ngô. Câu nói khẳng khái: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông..."',
    'Lệ Hải Vồ Phong','Gây 220% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh được cộng sẵn 20% tỷ lệ bạo kích và bỏ qua 15% giáp của địch.',
    { role:'Sát thủ', targetScope:'single', skillEffect:'armor_pen', skillEffectChance:100, skillDmgMult:22 }),

  createHero3('h2_4','Lê Chân',76,2,'ally','Nữ tướng',
    'Khoảng 20 – 43 | Làng An Biên (Đông Triều, Quảng Ninh ngày nay) | Di dân khai phá vùng đất ven biển, lập nên trang An Biên (tiền thân của thành phố Hải Phòng ngày nay). Luyện tập thủy binh, tích trữ binh lương, đóng vai trò tướng tiên phong trong cuộc khởi nghĩa Hai Bà Trưng.',
    'Thánh Chân Thủy Trận','Gây 120% sát thương vật lý lên 3 tướng địch hàng trên. Có 15% tỷ lệ làm giảm 10% Tốc độ của địch trong 1 hiệp.',
    { role:'Pháp sư', targetScope:'front_row', skillEffect:'slow', skillEffectChance:15, skillDmgMult:12 }),
  createHero3('h2_5','Man Thiện',75,2,'ally','Thánh Mẫu',
    'Cuối thế kỷ I TCN – Thế kỷ I SCN | Làng Nam Nguyễn (Ba Vì, Hà Nội), dòng dõi Lạc tướng | Nuôi dạy hai con gái Trưng Trắc, Trưng Nhị tinh thông võ nghệ, binh thư. Trực tiếp chiêu mộ nghĩa sĩ vùng Ba Vì, quy tụ các hào trưởng Lạc Việt ủng hộ cuộc khởi nghĩa.',
    'Hậu Phương Vững Chắc','Hồi phục máu bằng 12% máu tối đa cho toàn đội, đồng thời cấp hiệu ứng Miễn khống cho 1 tướng đồng minh có máu thấp nhất trong 1 hiệp (tỷ lệ 25%).',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'immune_cc', skillEffectChance:25, skillDmgMult:0 }),
  createHero3('h2_6','Thục Nương',78,2,'ally','Nữ tướng',
    'Thế kỷ I (khoảng 17 – 43) | Làng Phượng Lâu (Kim Bảng, Hà Nam) | Dấy binh khởi nghĩa tại Tiên La báo thù cha và chồng bị viên quan Tô Định hãm hại. Dẫn đại quân về hội sư cùng Hai Bà Trưng, tiến đánh Luy Lâu và giải phóng miền hạ lưu châu thổ sông Hồng.',
    'Song Kiếm Phá Vây','Gây 145% sát thương vật lý lên 1 hàng dọc. Có 15% tỷ lệ gây Chảy máu trong 2 hiệp.',
    { role:'Sát thủ', targetScope:'column', skillEffect:'bleed', skillEffectChance:15, skillDmgMult:14.5 }),
  createHero3('h2_7','Thánh Thiên',77,2,'ally','Nữ tướng',
    'Thế kỷ I (khoảng 10 – 43) | Làng Bích Uyển (Kinh Bắc, nay thuộc Gia Bình, Bắc Ninh) | Nổi dậy khởi nghĩa độc lập ở vùng Kinh Bắc trước khi hợp binh với Hai Bà Trưng tại Mê Linh. Lập phòng tuyến Hợp La - Nam Xang, nhiều lần đánh bại quân Đông Hán do Mã Viện chỉ huy, khiến giặc khiếp sợ.',
    'Hợp Phố Trấn Thủ','Gây 120% sát thương vật lý lên 3 tướng địch hàng trên. Bản thân nhận lớp Khiên ảo bằng 15% máu tối đa trong 2 hiệp.',
    { role:'Chiến tướng', targetScope:'front_row', skillEffect:'shield', skillEffectChance:100, skillDmgMult:12 }),
  createHero3('h2_8','Phùng Thị Chính',79,2,'ally','Nữ tướng',
    'Thế kỷ I (mất khoảng năm 43) | Vùng Vĩnh Tường (Vĩnh Phúc) | Chiêu mộ quân sĩ tham gia hội thề Hát Môn. Thống lĩnh đạo trung quân bảo vệ an toàn cho bộ chỉ huy của Trưng Vương trong suốt chiến dịch. Quyết chiến chặn giặc tại mặt trận Cấm Khê khi đang mang thai.',
    'Tử Chiến Sinh Môn','Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân tự hiến tế 8% máu hiện tại để nhận trạng thái Phản sát thương (phản lại 15% sát thương nhận vào) trong 2 hiệp.',
    { role:'Tiên phong', targetScope:'single', skillEffect:'reflect', skillEffectChance:100, skillDmgMult:18 }),

  createHero3('h2_9','Triệu Quốc Đạt',68,2,'ally','Tướng quân',
    'Thế kỷ III (mất khoảng năm 248) | Miền Quan Yên (Yên Định, Thanh Hóa), anh trai ruột của Triệu Thị Trinh | Dùng uy tín và gia sản của một hào trưởng lớn quy tụ thanh niên, nghĩa sĩ yêu nước chống lại sự cai trị hà khắc của nhà Ngô. Cùng em gái Triệu Thị Trinh tổ chức căn cứ khởi nghĩa vững chắc.',
    'Cửu Chân Khởi Nghĩa','Gây 95% sát thương vật lý lên 3 tướng địch hàng trên. Tăng 8% Phòng thủ cho toàn đội hàng trước trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'front_row', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:9.5 }),
  createHero3('h2_10','Lương Long',67,2,'ally','Thủ lĩnh',
    'Thế kỷ II (mất năm 181) | Giao Chỉ (vùng đồng bằng Bắc Bộ) | Lãnh đạo nhân dân Giao Chỉ nổi dậy chống lại sự cai trị bạo ngược của Thứ sử Chu Nhuận năm 178. Liên kết thành công các bộ tộc bản địa và nghĩa quân khắp 4 quận tạo thành thế trận khổng lồ.',
    'Liên Kết Bộ Tộc','Hồi 10% Nộ khí cho tướng đồng minh có Nộ khí thấp nhất, đồng thời tăng 8% Tấn công cho tướng đó trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h2_11','Thiều Hoa',65,2,'ally','Nữ tướng',
    'Thế kỷ I | Thôn Song Quan (Tam Nông, Phú Thọ) | Giỏi võ nghệ, huấn luyện đội nữ binh tinh nhuệ bảo vệ phòng tuyến Tây Bắc Mê Linh. Dạy dân nghề ươm tơ, dệt lụa, mở mang kinh tế tự túc cho xóm làng trong thời bình.',
    'Hầu Quân Nghi Binh','Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới. Có 10% tỷ lệ làm giảm 8% Né tránh của địch.',
    { role:'Cung thủ', targetScope:'back_row', skillEffect:'none', skillEffectChance:10, skillDmgMult:9.5 }),
  createHero3('h2_12','Xuân Nương',66,2,'ally','Nữ tướng',
    'Thế kỷ I | Làng Hương Nha (Tam Nông, Phú Thọ) | Vận động dân làng Hương Nha mở kho tiếp tế, lập đồn điền tiếp tế lương thảo quy mô lớn cho quân Mê Linh. Phụ trách việc chế tạo vũ khí, gom góp thuyền bè phục vụ quân đội của Trưng Trắc.',
    'Tử Thủ Quân Lương','Gây 110% sát thương vật lý lên 1 hàng dọc. Tăng 8% Tấn công bản thân trong 1 hiệp.',
    { role:'Chiến tướng', targetScope:'column', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:11 }),
  createHero3('h2_13','Phật Nguyệt',64,2,'ally','Nữ tướng',
    'Thế kỷ I | Miền Tây Bắc Lạc Việt | Thống lĩnh hạm đội thuyền chiến thiện chiến của Hai Bà Trưng kiểm soát các cửa sông lớn. Trấn thủ địa bàn hiểm yếu hồ Động Đình - Trường Sa (theo dã sử), chặn đứng các đợt hành quân đường thủy của quân Hán.',
    'Thủy Trận Uy Chấn','Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới. Có 10% tỷ lệ làm giảm 8% Tốc độ của địch trong 1 hiệp.',
    { role:'Pháp sư', targetScope:'back_row', skillEffect:'slow', skillEffectChance:10, skillDmgMult:9.5 }),
  createHero3('h2_14','Lê Thị Hoa',63,2,'ally','Nữ tướng',
    'Thế kỷ I | Vùng Nga Sơn (Thanh Hóa) | Dấy binh tại Thanh Hóa hưởng ứng lời kêu gọi của Hai Bà Trưng, giải phóng toàn bộ quận Cửu Chân. Lập căn cứ phòng thủ hiểm trở tại Nga Sơn chống lại cuộc phản công của quân Mã Viện.',
    'Sơn Lũy Kiên Cố','Tạo khiên ảo bằng 10% HP tối đa cho 1 tướng đồng minh hàng trên yếu máu nhất.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'shield', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h2_15','Quách A',62,2,'ally','Nữ tướng',
    'Thế kỷ I | Vùng Bạch Hạc - Phú Xuyên (Hà Tây cũ, nay thuộc Hà Nội) | Cùng anh/em trai lập đồn lũy rèn đúc vũ khí, tuyển mộ nghĩa binh gia nhập quân đội Trưng Vương. Kiên cường giữ vững phòng tuyến chặn hậu cho đại quân rút lui an toàn trong trận chiến cuối cùng.',
    'Thần Tiễn Bách Phát','Gây 135% sát thương vật lý lên 1 mục tiêu hàng trên. Có 8% tỷ lệ bạo kích cộng thêm.',
    { role:'Cung thủ', targetScope:'single', skillEffect:'crit_up', skillEffectChance:8, skillDmgMult:13.5 }),
  createHero3('h2_16','Chu Đạt',58,2,'ally','Hào kiệt',
    'Thế kỷ II (hoạt động đỉnh điểm năm 157 – 160) | Huyện Cư Phong, quận Cửu Chân (Thanh Hóa ngày nay) | Bất bình trước sự bóc lột của quan viên Hán, tập hợp hơn 4.000 nghĩa binh nổi dậy bao vây trị sở. Giết chết Huyện lệnh Cư Phong và tập kích tiêu diệt Thái thú Cửu Chân.',
    'Cư Phong Phản Kháng','Gây 90% sát thương vật lý lên 1 hàng dọc. Tự hồi phục 5% máu tối đa.',
    { role:'Đấu sĩ', targetScope:'column', skillEffect:'heal', skillEffectChance:100, skillDmgMult:9 }),
  createHero3('h2_17','Lý Tiến',55,2,'ally','Hào kiệt',
    'Thế kỷ I – Thế kỷ II (thời Hán Hoàn Đế / Hán Linh Đế) | Quận Giao Chỉ | Nổi tiếng học vấn uyên thâm, đỗ đạt kỳ thi Mậu tài. Đấu tranh đòi bãi bỏ chính sách phân biệt đối xử, cho người bản địa Giao Châu được giữ các chức vụ cao. Được bổ nhiệm làm Thứ sử Giao Châu.',
    'Ngoại Giao Thuyết Phục','Gây 40% sát thương phép lên toàn đội hình địch. Có 8% tỷ lệ xóa 1 hiệu ứng có lợi của địch.',
    { role:'Khống chế', targetScope:'all', skillEffect:'none', skillEffectChance:8, skillDmgMult:4 }),
  createHero3('h2_18','Lý Trường Nhân',54,2,'ally','Tướng quân',
    'Thế kỷ V (hoạt động nổi bật 468 – 485) | Hào tộc quận Giao Chỉ | Tiêu diệt thuộc hạ đô hộ phương Bắc. Tự xưng là Hành châu sự, nắm toàn quyền hành chính, quân sự và duy trì nền tự trị cho Giao Châu. Đánh bại cánh quân chinh phạt của triều đình Lưu Tống.',
    'Giao Châu Tự Chủ','Gây 80% sát thương vật lý ngẫu nhiên 2 mục tiêu. Tăng 5% Phòng thủ bản thân trong 1 hiệp.',
    { role:'Đấu sĩ', targetScope:'front_row', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:8 }),
  createHero3('h2_19','Lý Thúc Hiến',52,2,'ally','Hào kiệt',
    'Thế kỷ V (hoạt động từ khoảng 485) | Giao Chỉ, em họ/cháu kế nghiệp Lý Trường Nhân | Kế tục sự nghiệp của Lý Trường Nhân, củng cố phòng thủ thành lũy và từ chối nộp cống phẩm vô lý cho triều Nam Tề. Lãnh đạo nhân dân kháng cự quyết liệt khi nhà Nam Tề điều đại quân đàn áp.',
    'Phục Kích Biên Thùy','Gây 90% sát thương vật lý lên 1 hàng dọc.',
    { role:'Tiên phong', targetScope:'column', skillEffect:'none', skillEffectChance:0, skillDmgMult:9 }),
// ═══════════════════════════════════════ CHƯƠNG 3 ═══════════════════════════════════════
  createHero2('h3_1', 'Lý Bí', 80,3,'ally','Lý Nam Đế',
    '503 – 548 (Thế kỷ VI) | Thôn Cổ Pháp, huyện Tiên Du (Bắc Ninh) hoặc Thái Bình (Sơn Tây) | Lãnh đạo cuộc khởi nghĩa năm 541, đánh đuổi Tiêu Tư, làm chủ toàn bộ Giao Châu. Năm 544, lên ngôi Hoàng đế, đặt quốc hiệu Vạn Xuân. Vị vua đầu tiên của người Việt xưng "Đế" công khai, ngang hàng với các Hoàng đế phương Bắc.',
    'Vạn Xuân Khai Quốc','Tuyên bố độc lập cho toàn đội (+10% Tấn công, +20 Nhuệ khí).'),
  createHero2('h3_2','Triệu Quang Phục',82,3,'ally','Triệu Việt Vương',
    '? – 571 (Thế kỷ VI) | Huyện Chu Diên, con trai Thái phó Triệu Túc | Rút quân về đầm Dạ Trạch lập căn cứ kháng chiến trường kỳ. Sáng tạo lối đánh du kích. Nhân lúc nhà Lương có biến loạn, mở cuộc tổng phản công tái chiếm kinh đô Long Biên (550).',
    'Dạ Trạch Tàng Hình','Ẩn mình trong đầm lầy, gây sát thương (164% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h3_3', 'Mai Thúc Loan', 80,3,'ally','Mai Hắc Đế',
    'Khoảng cuối thế kỷ VII – 722 | Thôn Mai Phụ (Lộc Hà, Hà Tĩnh), dời về Ngọc Trừng | Liên kết thành công với nhân dân Lâm Ấp và Chân Lạp tạo thành liên minh quân sự 40 vạn quân. Đánh chiếm thành Tống Bình, xưng Đế, xây thành Vạn An.',
    'Hắc Đế Xuất Thế','Khí thế hắc long cho toàn đội (+10% Tấn công, +20 Nhuệ khí).'),
  createHero2('h3_4','Phùng Hưng',81,3,'ally','Bố Cái Đại Vương',
    '761 – 802 (hoặc 791) | Làng Đường Lâm (Sơn Tây, Hà Nội) | Dấy binh khởi nghĩa từ căn cứ Đường Lâm. Đánh chiếm đô hộ phủ Tống Bình sau trận vây hãm sấm sét khiến Cao Chính Bình lo sợ phát bệnh mà chết. Nhân dân tôn xưng là Bố Cái Đại Vương.',
    'Bố Cái Uy Linh','Tỏa uy lực người cha dân tộc cho 1 đồng minh (Hồi 16% Máu tối đa). Đồng thời: +25% Phòng thủ.'),
  createHero2('h3_5', 'Khúc Thừa Dụ', 80,3,'ally','Tiết Độ Sứ',
    '830 – 907 (Thế kỷ IX – X) | Hồng Châu (nay thuộc huyện Ninh Giang, tỉnh Hải Dương) | Nhân lúc nhà Đường sụp đổ, đem quân tiến vào chiếm đóng thành Đại La, tự xưng Tiết độ sứ (905). Khéo léo dùng danh nghĩa nhà Đường để hợp thức hóa chính quyền tự chủ. Mở ra kỷ nguyên độc lập tự chủ lâu dài.',
    'Tự Chủ Khai Đạo','Mở đường độc lập, gây sát thương (154% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h3_6','Phạm Tu',72,3,'ally','Tướng quân',
    '476 – 545 | Làng Quang Liệt (nay là Thanh Liệt, huyện Thanh Trì, Hà Nội) | Thống lĩnh quân đội đánh tan cuộc xâm lược của quân Lâm Ấp tại vùng Cửu Đức (Hà Tĩnh). Đứng đầu ngạch võ ban khi Lý Nam Đế xưng đế lập quốc. Hy sinh oanh liệt tại cửa sông Tô Lịch chặn giặc Trần Bá Tiên.',
    'Nam Chinh Phá Địch','Chủ động tấn công, gây sát thương (144% Tấn công) lớn cho quân xâm lược. (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('h3_7','Khúc Hạo',61,3,'ally','Tiết Độ Sứ',
    '860 – 917 | Hồng Châu (Hải Dương), con trai nối nghiệp Khúc Thừa Dụ | Tiến hành cuộc cải cách hành chính quy mô toàn diện đầu tiên trong lịch sử. Chia đặt các đơn vị hành chính; bình định lại mức thuế má công bằng, lập sổ hộ tịch. Xây dựng bộ máy hành chính nhà nước độc lập thực chất.',
    'Khoan Dân Chính Sách','Nâng cao lòng dân cho 1 đồng minh (Hồi 12% Máu tối đa). Đồng thời: +15% Phòng thủ.'),
  createHero2('h3_8','Dương Đình Nghệ',74,3,'ally','Tiết Độ Sứ',
    '874 – 937 | Làng Giàng (Thanh Hóa), hào trưởng Ái Châu | Nuôi dạy 3.000 con nuôi và bộ hạ mưu đồ phục quốc. Từ Thanh Hóa tiến quân thần tốc ra Bắc đánh tan Trần Bảo, vây hạ thành Đại La. Đánh bại quân tiếp viện Trình Bảo, giải phóng bờ cõi, tự xưng Tiết độ sứ.',
    'Phục Quốc Chinh Đông','Tập hợp nghĩa sĩ, phá tan phòng tuyến của quân xâm lược. (+15% Phòng thủ).'),
  createHero2('h3_9','Triệu Túc',70,3,'ally','Lão Tướng',
    'Thế kỷ VI | Huyện Chu Diên, tù trưởng/hào trưởng địa phương có thế lực lớn | Hào trưởng đầu tiên dẫn dắt toàn bộ gia binh hưởng ứng cuộc khởi nghĩa của Lý Bí. Dốc toàn bộ gia tài, binh lực để chiêu mộ nhân tài, liên kết các thủ lĩnh. Được vua Lý phong giữ chức Thái phó.',
    'Dũng Tướng Phá Thành','Phá tường thành bằng sức mạnh thuần túy. (+10% Tấn công).'),
  createHero2('h3_10','Lý Phật Tử',68,3,'ally','Hậu Lý Nam Đế',
    '? – 602 | Người cùng họ và là tướng dưới trướng Lý Nam Đế | Dùng kế liên minh thông gia cầu hòa (gả con trai Nhã Lang cho con gái Cảo Nương của vua Triệu), lập mưu đánh úp cướp ngôi Triệu Việt Vương năm 571. Trị vì hơn 30 năm trước khi bị Tùy dẹp.',
    'Lưỡng Diện Sĩ Kỳ','Đưa ra kế sách vẹn toàn cho toàn đội (+10% Tấn công, +15% Phòng thủ).'),
  createHero2('h3_11','Tinh Thiều',70,3,'ally','Mưu sĩ',
    'Thế kỷ VI (mất khoảng năm 545) | Giao Chỉ, danh sĩ bản địa học rộng tài cao | Lặn lội sang kinh đô Lương tìm công danh nhưng bị khinh bỉ. Trở về kết giao với Lý Bí mưu việc dựng cờ đại nghĩa. Là kiến trúc sư trưởng hoạch định điển chế, luật pháp, văn thư và quan chế triều Tiền Lý.',
    'Thần Cơ Diệu Toán','Tính toán thần sầu, hạ thấp phòng thủ (+15%) của địch.'),
  createHero2('h3_12','Lý Thiên Bảo',61,3,'ally','Đào Lang Vương',
    'Thế kỷ VI (mất năm 555) | Thái Bình/Cổ Pháp, anh trai ruột của Tiền Lý Nam Đế Lý Bí | Rút lui vào vùng đất Ai Lao (thượng lưu sông Mã) khi quân Lương vây hãm. Khai phá đất Đào Long, lập nước Dã Năng, tự xưng là Đào Lang Vương nhằm bảo tồn hạt giống lực lượng Tiền Lý.',
    'Địa Lôi','Đặt bẫy mìn, gây sát thương (122% Tấn công) bất ngờ lên 1 mục tiêu địch.'),
  createHero2('h3_13','Trương Hống',60,3,'ally','Thần Tướng',
    'Thế kỷ VI | Vùng Yên Phong (Bắc Ninh) | Cánh tay mặt của Triệu Quang Phục, lập nhiều kỳ tích trong chiến lược phục kích đường thủy. Kiên quyết không theo Lý Phật Tử, uống thuốc độc tuẫn tiết. Hiển linh giúp đánh tan giặc phương Bắc trên sông Bạch Đằng.',
    'Hải Phong Đao','Tấn công nhanh như gió biển, gây sát thương (108% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h3_14','Trương Hát',60,3,'ally','Thần Tướng',
    'Thế kỷ VI | Vùng Yên Phong (Bắc Ninh) | Cánh tay mặt của Triệu Quang Phục, lập nhiều kỳ tích trong chiến lược phục kích đường thủy. Kiên quyết không theo Lý Phật Tử, uống thuốc độc tuẫn tiết. Hiển linh giúp đánh tan giặc phương Bắc trên sông Bạch Đằng.',
    'Tốc Binh','Chiến đấu bên cạnh người thân cho toàn đội (+10% Tấn công).'),
  createHero2('h3_15','Mai Thiếu Đế',58,3,'ally','Hoàng tử',
    'Thế kỷ VIII | Vạn An (Nam Đàn, Nghệ An), con trai thứ của Mai Hắc Đế | Kế vị ngôi vương giữa thời điểm thành Vạn An bị quân Đường vây hãm. Lãnh đạo tàn quân rút lui vào rừng sâu núi non hiểm trở tiếp tục cuộc chiến tranh tiêu hao giặc. Hy sinh giữa chiến địa quyết không hàng.',
    'Bạch Y Thần Binh','Tinh thần bất khuất của người lính áo trắng cho toàn đội (+15% Phòng thủ, +20 Nhuệ khí).'),
  createHero2('h3_16','Phùng An',60,3,'ally','Tướng quân',
    'Thế kỷ VIII – IX | Làng Đường Lâm, con trai kế vị của Phùng Hưng | Nối ngôi cha cai quản chính quyền tự chủ phủ Tống Bình, dâng tôn hiệu cho cha là Bố Cái Đại Vương. Củng cố việc quản lý các quận huyện lân cận trước khi bị tướng nhà Đường Triệu Xương đem quân đàn áp.',
    'Phụ Tử Nghĩa Tình','Chiến đấu vì di nguyện cha cho toàn đội (+20 Nhuệ khí).'),
  createHero2('h3_17','Lý Phục Man',55,3,'ally','Tướng quân',
    'Thế kỷ VI | Làng Yên Sở (Hoài Đức, Hà Nội) | Có công lớn giúp Lý Nam Đế chiêu hàng các bộ tộc Man di miền thượng du, giữ yên bờ cõi phía Tây. Chỉ huy chốt chặn đường tiến thoái hiểm trở bảo vệ căn cứ Mê Linh và đầm Dạ Trạch.',
    'Bảo Quốc Công','Đích thân cầm quân xông pha trận mạc cho toàn đội (+10% Tấn công, +20 Nhuệ khí).'),
  createHero2('h3_18','Lý Tự Tiên',52,3,'ally','Hào kiệt',
    'Thế kỷ VII (mất năm 687) | Giao Châu, hào trưởng bản địa uy tín | Dẫn đầu dân chúng nổi dậy phản kháng lệnh tăng thuế đánh đập thậm tệ của Quan đô hộ nhà Đường. Kế hoạch bị lộ, bị tập kích bất ngờ và anh dũng hy sinh, châm ngòi cho ngọn lửa khởi nghĩa Tống Bình.',
    'Kiêu Binh','Dùng tinh nhuệ binh sĩ, tăng sát thương tập trung. (Gây 100% sát thương Tấn công).'),
  createHero2('h3_19','Khúc Thừa Mỹ',54,3,'ally','Tiết Độ Sứ',
    '? – ? (mất sau năm 930) | Hồng Châu (Hải Dương), con trai Khúc Hạo | Coi Nam Hán là "ngụy triều", từ chối giao hảo. Năm 930, Nam Hán xâm lược; ông chỉ huy quân dân chống cự quyết liệt nhưng thất bại và bị bắt giải về Quảng Châu. Khép lại thời kỳ trị vì của họ Khúc.',
    'Dân Binh Chống Giặc','Lãnh đạo dân binh, gây sát thương (100% Tấn công) lên 1 mục tiêu địch.'),
  createHero2('h3_20','Đinh Kiến',53,3,'ally','Thủ lĩnh',
    'Thế kỷ VII (mất năm 687) | Vùng Giao Chỉ, bộ tướng thân cận của Lý Tự Tiên | Nối quyền chỉ huy sau khi Lý Tự Tiên hy sinh. Vây hãm thành lũy, phá tan quân tiếp viện và chém chết Đô hộ Lưu Diên Hựu ngay tại đại bản doanh. Chiếm giữ trị sở đô hộ suốt nhiều tháng.',
    'Khởi Nghĩa Dân Binh','Phát động dân chúng nổi dậy chống quân thù. (+10% Tấn công).'),

  createHero2('h3_21','Đinh Công Trứ',65,3,'ally','Thứ Sử',
    'Thế kỷ X | Thôn Đại Hữu (Gia Viễn, Ninh Bình), phụ thân Đinh Bộ Lĩnh | Một trong 3.000 nghĩa tử/nha tướng trụ cột dưới trướng Dương Đình Nghệ, lập nhiều chiến công giải phóng thành Đại La (931). Giữ trọng trách Thứ sử Hoan Châu. Trung thành phò tá Ngô Quyền.',
    'Phụ Thân Đinh Vương','Khai mở dòng họ Đinh, gây sát thương (130% Tấn công) lên 1 mục tiêu địch.'),

  // ═══════════════════════════════════════ CHƯƠNG 4 ═══════════════════════════════════════

  createHero2('h4_2','Đinh Bộ Lĩnh',95,4,'ally','Vạn Thắng Vương',
    '924 – 979 | Thôn Đại Hữu (Gia Viễn, Ninh Bình), con Thứ sử Đinh Công Trứ | Dấy binh từ Hoa Lư, đánh bại và thu phục 12 sứ quân. Năm 968 xưng Hoàng đế (Đinh Tiên Hoàng), đặt quốc hiệu Đại Cồ Việt, dời đô về Hoa Lư. Vị Hoàng đế phục hưng độc lập đích thực.',
    'Vạn Thắng Cờ Sậy','Hiệu triệu toàn bộ nghĩa quân Hoa Lư, gây sát thương (124% Tấn công) lên toàn bộ địch. Gây choáng (tỷ lệ 50%).'),
  createHero2('h4_1','Ngô Quyền',90,4,'ally','Ngô Vương',
    '897 – 944 | Đường Lâm (Sơn Tây, Hà Nội), con quan mục Ngô Mân, con rể Dương Đình Nghệ | Đem quân từ Ái Châu ra Bắc trừng trị Kiều Công Tiễn. Lãnh đạo đại thắng Bạch Đằng năm 938 bằng cọc ngầm, tiêu diệt Hoằng Thao. Xưng Vương năm 939, định đô tại Cổ Loa, mở ra kỷ nguyên độc lập tự chủ.',
    'Bạch Đằng Cọc Sắt','Đặt bẫy địa hình, gây sát thương (180% Tấn công) cực lớn khi địch lọt vào.'),
  createHero2('h4_3','Lê Hoàn',91,4,'ally','Lê Đại Hành',
    '941 – 1005 | Thọ Xuân (Thanh Hóa) hoặc Thanh Liêm (Hà Nam) | Thập đạo tướng quân nhà Đinh, lên ngôi xưng Đế (980) kháng Tống. Thắng lớn trên sông Bạch Đằng (981) chém Hầu Nhân Bảo. Nam phạt Chiêm Thành (982). Khởi xướng lễ Tịch điền, đào kênh mở đường giao thông.',
    'Thiên Tử Chinh Phạt','Thân chinh dẫn đầu quân đội, gây sát thương (182% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_5','Nguyễn Bặc',81,4,'ally','Khai quốc công thần',
    '924 – 979 | Làng Gia Miêu (Hà Trung, Thanh Hóa), bạn nối khố Đinh Bộ Lĩnh | Khai quốc công thần bậc nhất, giữ chức Định Quốc Công (Tể tướng) nhà Đinh. Khởi binh chống Lê Hoàn thao túng binh quyền bảo vệ ngôi báu họ Đinh nhưng thất bại. Tấm gương trung thần nghĩa khí.',
    'Đinh Quốc Tâm','Trung thành tuyệt đối với chủ tướng cho toàn đội (+25% Phòng thủ).'),
  createHero2('h4_4','Đinh Điền',80,4,'ally','Khai quốc công thần',
    '924 – 979 | Thôn Đại Hữu (Gia Viễn, Ninh Bình) | Dũng tướng tiên phong đánh bại nhiều sứ quân sừng sỏ. Giữ chức Ngoại giáp bảo vệ kinh thành Hoa Lư. Cùng Nguyễn Bặc dấy binh chống Lê Hoàn bảo vệ ấu chúa Đinh Toàn và anh dũng tuẫn tiết.',
    'Thập Nhị Sứ Quân Phá','Kinh nghiệm dẹp giặc loạn, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_6', 'Lưu Cơ', 80,4,'ally','Tướng quân',
    '940 – 1007 | Gia Viễn (Ninh Bình), một trong "Tứ trụ triều Đinh" | Đô hộ phủ Sĩ sư coi hình luật, trấn thủ thành Đại La giữ yên miền Bắc. Sửa sang thành Đại La, củng cố kinh tế tạo điều kiện thuận lợi cho việc dời đô của vua Lý Thái Tổ sau này. Sống thọ qua 3 triều.',
    'Hoa Lư Thủ Vệ','Bảo vệ kinh thành tuyệt đối, tăng mạnh phòng thủ (+25%) khu vực.'),
  createHero2('h4_16','Dương Vân Nga',55,4,'ally','Thái hậu',
    '952 – 1000 | Vùng Nho Quan (Ninh Bình) | Hoàng hậu nhà Đinh, nắm quyền nhiếp chính. Đặt vận mệnh quốc gia lên trên, trao áo long bào của họ Đinh cho Lê Hoàn thống nhất lòng quân kháng Tống. Đồng hành cùng nhà Tiền Lê xây dựng cơ nghiệp.',
    'Nhường Triều','Hy sinh bản thân vì đại nghĩa cho toàn đội (+10% Tấn công).'),
createHero2('h4_18','Đinh Toàn',51,4,'ally','Thiếu đế','974 – 1001 | Hoa Lư (Ninh Bình), con trai thứ hai của Đinh Tiên Hoàng | Lên ngôi lúc 6 tuổi khi cha anh bị sát hại. Mẹ là Thái hậu Dương Vân Nga nhường ngôi cho Lê Hoàn. Xuống làm Vệ Vương, tận tụy phò tá Lê Đại Hành, hy sinh khi đi dẹp loạn ở Cẩm Thủy năm 1001.','Ấu Chúa','Cần sự bảo hộ cho toàn đội (+15% Phòng thủ).'),
createHero2('h4_13','Ngô Xương Xí',51,4,'ally','Sứ quân','Thế kỷ X (thời Loạn 12 sứ quân) | Con trai Thiên Sách Vương Ngô Xương Ngập, cháu nội Tiền Ngô Vương | Rút lực lượng về chiếm giữ Bình Kiều làm một trong 12 sứ quân. Chủ động quy phục Đinh Bộ Lĩnh, đại diện chính thống của dòng họ Ngô quy thuận chính quyền trung ương.','Cát Cứ','phòng thủ (+15%) lãnh thổ cho toàn đội (+10% Tấn công, +15% Phòng thủ).'),
createHero2('h4_19','Nguyễn Siêu',60,4,'ally','Sứ quân','924 – 967 | Thanh Trì, con tướng quân Nguyễn Hãng triều Ngô | Cát cứ Tây Phù Liệt, đội thiết kỵ tinh nhuệ. Kháng cự quyết liệt liên quân Hoa Lư, sau trúng mưu hỏa công, hy sinh khi cố vượt sông. Đối thủ cứng rắn khó khuất phục thời loạn lạc.','Phù Liệt Trận','Chiến thuật phòng ngự linh hoạt, gây sát thương (120% Tấn công) lên 1 mục tiêu địch..'),
createHero2('h4_15','Trần Lãm',61,4,'ally','Sứ quân','? – 967 | Vùng duyên hải Bố Hải Khẩu, hào trưởng ven biển giàu có | Xây dựng căn cứ Bố Hải Khẩu hùng hậu. Nhận Đinh Bộ Lĩnh làm con nuôi, trao lại toàn bộ lực lượng, tiền tài, thành lũy làm bàn đạp giúp Đinh Tiên Hoàng vươn lên dẹp loạn.','Bố Hải Thủy Binh','Chỉ huy thủy binh vùng cửa sông, gây sát thương (122% Tấn công) lên 1 mục tiêu địch..'),
createHero2('h4_12','Nguyễn Thủ Tiệp',54,4,'ally','Sứ quân','926 – 967 | Em trai sứ quân Nguyễn Siêu, hào tộc vùng Kinh Bắc | Cát cứ Tiên Du (Vũ Ninh), đắp lũy núi Phật Tích, xưng Vũ Ninh Vương. Liên minh cùng anh trai chống Hoa Lư, sức khỏe phi thường được gọi là "Sấm Động tướng quân". Bị tướng Đinh Điền đánh bại.','Quy Phụ','Sau khi thần phục, gây sát thương (108% Tấn công) lên 1 mục tiêu địch..'),
createHero2('h4_14','Kiều Công Hãn',73,4,'ally','Sứ quân','? – 967 | Đất Phong Châu, cháu nội Kiều Công Tiễn | Từng là tướng Hậu Ngô Vương. Xây dựng thành lũy Phù Lập cát cứ. Giao tranh ác liệt với quân Đinh Bộ Lĩnh vùng Hạc Trì, thành vỡ, tháo chạy bị phục binh chém chết. Tương truyền tướng không đầu vẫn phi ngựa.','Phong Châu Kỵ Binh','Chỉ huy kỵ binh vùng trung du, tốc độ và sức mạnh vượt trội. (+10% Tấn công). (+10% Tốc độ).'),
createHero2('h4_9','Ngô Xương Văn',51,4,'ally','Thiên Sách Vương','934 – 965 | Đường Lâm, con thứ của Ngô Quyền | Lật đổ cậu Dương Tam Kha nhưng không giết, đón anh trai về cùng cầm quyền xưng là Nam Tấn Vương. Thân chinh đi đánh dẹp các thế lực nổi dậy và trúng tên nỏ tử trận năm 965, dẫn đến Loạn 12 sứ quân.','Huynh Đệ Chi Tranh','Chiến đấu trong nội chiến, gây sát thương (102% Tấn công) lên 1 mục tiêu địch..'),
createHero2('h4_11','Phạm Bạch Hổ',62,4,'ally','Sứ quân','910 – 972 | Đằng Châu (Kim Động, Hưng Yên) | Tướng của Dương Đình Nghệ và Ngô Quyền, sau chiếm Đằng Châu cát cứ. Nhận thấy Đinh Bộ Lĩnh có chí lớn nên quy phụng, giúp dẹp yên các sứ quân, được phong Thân vệ Đại tướng quân nhà Đinh.','Bạch Hổ Xuất Sơn','Sức mạnh hổ trắng, tấn công bất ngờ từ ẩn náu. (+10% Tấn công).'),
createHero2('h4_8','Phạm Cự Lạng',71,4,'ally','Đại tướng','944 – 984 | Nam Sách (Hải Dương) | Giữ chức Vệ úy nhà Đinh, khởi xướng việc đưa Lê Hoàn lên ngôi cứu nước chống Tống. Được phong Thái úy, phụ tá đắc lực vạch kế hoạch tác chiến thắng quân Tống (981) và bảo vệ huyết mạch giao thông.','Trận Địa Quyết Sách','Đưa ra quyết định chiến lược, gây sát thương (142% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_17','Đinh Liễn',66,4,'ally','Hoàng tử',
    '? – 979 | Hoa Lư (Ninh Bình), con trưởng của Đinh Tiên Hoàng | Cùng cha lập nhiều chiến công dẹp loạn. Làm đại sứ bang giao nhà Tống. Vì tranh đoạt ngai vị đã sai người ám hại em trai Hạng Lang. Khắc kinh Phật 100 cột đá cầu siêu giải nghiệp.',
    'Hoàng Tử Phục Thù','Chiến đấu vì danh dự gia tộc, tăng sát thương khi bị dồn vào góc tường. (Gây 132% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('h4_7','Trịnh Tú',74,4,'ally','Khai quốc công thần',
    '924 – 979 | Gia Viễn (Ninh Bình), một trong "Tứ trụ triều Đinh" | Quân sư hoạch định nhiều kế sách chiêu hàng sứ quân cho Đinh Bộ Lĩnh. Đi sứ phương Bắc bang giao thương lượng. Cùng Nguyễn Bặc, Đinh Điền giữ trọn nghĩa khí trung thần bảo vệ nhà Đinh.',
    'Tứ Trụ Triều Đinh','Phối hợp cùng các trụ cột khác tạo thế phòng thủ (+15%) vững chắc, gây sát thương (126% Tấn công) lên 1 hàng dọc địch.'),
  createHero2('h4_22','Lê Long Việt',61,4,'ally','Hoàng đế',
    '983 – 1005 | Hoa Lư (Ninh Bình), con vua Lê Đại Hành | Đánh bại phe phái tranh ngôi, đăng cơ hiệu Lê Trung Tông. Trị vì đúng 3 ngày bị em trai là Lê Long Đĩnh ám hại để cướp ngôi. Vị vua tại vị ngắn nhất lịch sử, để lại niềm tiếc thương cho bề tôi Lý Công Uẩn.',
    'Đế Vương Tam Nhật','Bùng cháy rực rỡ trong thời gian ngắn, tăng mạnh sát thương và tốc độ cho toàn đội trong 3 lượt đầu tiên. (Gây 122% sát thương Tấn công). (+10% Tốc độ). (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('h4_23','Đinh Triều Quốc Mẫu',49,4,'ally','Quốc mẫu',
    'Thế kỷ X | Làng Đàm Xá (Gia Viễn, Ninh Bình) | Một mình nuôi dạy Đinh Bộ Lĩnh giữa cảnh loạn lạc. Chỗ dựa tinh thần kiên cường cổ vũ con trai tập hợp trai làng dấy nghiệp. Được triều Đinh và nhân dân tôn kính lập đền thờ.',
    'Dưỡng Dục Đế Vương','Công lao dưỡng dục bậc đế vương, gây sát thương (98% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_24','Ngô Xương Ngập',49,4,'ally','Thiên Sách Vương',
    '? – 954 | Đường Lâm, con trưởng của Ngô Quyền | Trốn Dương Tam Kha đoạt ngôi về nương tựa Phạm Lệnh Công. Sau khi em trai phế truất Tam Kha, được đón về cùng cai trị xưng là Thiên Sách Vương. Nắm thực quyền lấn át em trai gây chia rẽ trước khi mất sớm.',
    'Hậu Ngô Đồng Trị','Kinh nghiệm cùng nhiếp chính, tăng cường sức mạnh và phòng thủ (+15%) khi có anh em hoặc đồng minh hoàng tộc cùng ra trận. (+10% Tấn công).'),

  // ═══════════════════════════════════════ CHƯƠNG 5 ═══════════════════════════════════════
createHero3('h5_1', 'Lý Công Uẩn', 95, 5, 'ally', 'Lý Thái Tổ', '974 – 1028 | Châu Cổ Pháp (Từ Sơn, Bắc Ninh), xuất thân cửa Phật chùa Cổ Pháp | Lên ngôi hoàng đế năm 1009 lập ra nhà Lý. Ban chiếu dời đô từ Hoa Lư ra Thăng Long năm 1010. Chia đặt lại 24 lộ, khoan dung thuế khóa, lấy Phật giáo làm quốc đạo. Bậc minh quân kiến thiết vĩ đại.', 'Chiếu Dời Đô', 'Gây 100% sát thương phép toàn đội hình địch, đồng thời hồi 20% Nộ khí và tạo lớp Khiên ảo bằng 15% máu tối đa cho toàn đội phe ta trong 2 hiệp.', { role: 'Hỗ trợ', targetScope: 'all', skillEffect: 'shield', skillEffectChance: 100, skillDmgMult: 10 }),
createHero3('h5_2', 'Lý Thường Kiệt', 95, 5, 'ally', 'Thái Úy', '1019 – 1105 | Phường Thái Hòa, Thăng Long (Hà Nội) | Đánh tiên phát chế nhân phá hủy Ung Châu (1075). Xây phòng tuyến sông Như Nguyệt đánh tan 30 vạn quân Tống (1077). Hai lần nam chinh Chiêm Thành. Tác giả "Nam quốc sơn hà", vị danh tướng kiệt xuất.', 'Nam Quốc Sơn Hà', 'Gây 250% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh có 25% tỷ lệ gây Choáng trong 1 hiệp, đồng thời bản thân nhận 25% Tấn công trong 2 hiệp.', { role: 'Tiên phong', targetScope: 'single', skillEffect: 'stun', skillEffectChance: 25, skillDmgMult: 25 }),
createHero3('h5_3', 'Tô Hiến Thành', 85, 5, 'ally', 'Tể Tướng', '1102 – 1179 | Làng Hạ Mỗ (Đan Phượng, Hà Nội) | Đánh dẹp phản loạn, giữ yên xã hội. Phụng di chiếu phò tá ấu chúa Lý Cao Tông, từ chối vàng bạc đút lót bảo vệ ngai vàng chính thống. Lúc lâm chung tiến cử người hiền tài chức không tiến cử người nịnh bợ hầu hạ.', 'Trung Liêm Định Quốc', 'Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân nhận 20% Phòng thủ và tăng 10% Tấn công cho toàn đội trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
createHero3('h5_4', 'Nguyên phi Ỷ Lan', 85, 5, 'ally', 'Quan Âm Nữ Phật', '1044 – 1117 | Làng Thổ Lỗi (Gia Lâm, Hà Nội), xuất thân hái dâu nuôi tằm | Hai lần buông rèm nhiếp chính thay vua. Giữ vững hậu phương phục vụ kháng chiến chống Tống. Chuộc cung nữ nghèo gả chồng, cấm giết mổ trâu bò bảo vệ nông nghiệp. Nữ chính trị gia kiệt xuất tài đức vẹn toàn.', 'Quan Âm Nữ Phật', 'Hồi phục máu bằng 18% máu tối đa cho toàn đội, đồng thời giải 1 trạng thái bất lợi (Thanh tẩy) và cấp Miễn khống cho toàn đội trong 1 hiệp.', { role: 'Hỗ trợ', targetScope: 'all', skillEffect: 'cleanse', skillEffectChance: 100, skillDmgMult: 0 }),
createHero3('h5_5', 'Lý Thái Tông', 85, 5, 'ally', 'Lý Phật Mã', '1000 – 1054 | Chùa Cổ Pháp (Bắc Ninh), con trưởng của Lý Thái Tổ | Bình định "Loạn Tam Vương" (1028). Ban hành bộ luật Hình thư (1042). Thân chinh dẹp loạn biên cương và phạt Chiêm Thành (1044). Khởi dựng chùa Một Cột (1049). Bậc quân vương văn trị võ công toàn tài.', 'Hình Thư Định Quốc', 'Gây 140% sát thương vật lý lên 3 tướng địch hàng trước. Có 20% tỷ lệ làm giảm 15% Tấn công của địch trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'front_row', skillEffect: 'atk_down', skillEffectChance: 20, skillDmgMult: 14 }),
createHero3('h5_6', 'Lý Nhân Tông', 85, 5, 'ally', 'Hoàng Đế', '1066 – 1127 | Thăng Long, con trai của Lý Thánh Tông và Nguyên phi Ỷ Lan | Lên ngôi lúc 7 tuổi, đưa Đại Việt vượt qua kháng chiến chống Tống (1075–1077). Mở khoa thi Nho học đầu tiên (1075) và lập Quốc Tử Giám (1076). Vị vua trị vì lâu nhất (55 năm) tạo thời kỳ hoàng kim hưng thịnh.', 'Trị Quốc An Dân', 'Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 13.5 }),
createHero3('h5_7', 'Thiền sư Vạn Hạnh', 80, 5, 'ally', 'Thiền Sư', '938 – 1018 (Thế kỷ X – XI) | Châu Cổ Pháp (Bắc Ninh), Quốc sư nhà Lý | Cố vấn quân sự phá Tống bình Chiêm. Nuôi dạy Lý Công Uẩn. Vận động chuyển giao quyền lực êm thấm lập ra nhà Lý (1009) và định hướng dời đô về Thăng Long (1010). Kiến trúc sư tâm linh vĩ đại.', 'Thiên Định Kỳ Sấm', 'Gây 90% sát thương phép toàn đội địch, đồng thời giúp toàn đội tăng 12% Tấn công và 12% Tốc độ trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'all', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 9 }),
createHero3('h5_8', 'Lý Thánh Tông', 80, 5, 'ally', 'Hoàng Đế', '1023 – 1072 | Thăng Long, con trưởng của Lý Thái Tông | Đổi quốc hiệu thành Đại Việt (1054). Xây dựng Văn Miếu Thăng Long (1070). Thân chinh nam phạt Chiêm Thành (1069) mở rộng cương thổ. Vị vua nhân từ nổi tiếng với câu nói "yêu dân như con".', 'Nhân Từ Đại Việt', 'Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tạo lớp Khiên ảo bằng 20% máu tối đa cho bản thân và đồng minh thấp máu nhất.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'shield', skillEffectChance: 100, skillDmgMult: 13.5 }),
createHero3('h5_9', 'Trần Tự Khánh', 80, 5, 'ally', 'Hào Trưởng', '? – 1223 | Tức Mặc (Nam Định) - Lưu Xá (Thái Bình) | Đem quân dẹp loạn cát cứ, giải cứu triều đình Lý Huệ Tông. Giữ chức Thái úy nắm toàn quyền chỉ huy quân đội cuối triều Lý. Đặt nền móng quân sự dọn đường cho sự ra đời của nhà Trần.', 'Bình Định Hào Kiệt', 'Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời bản thân nhận 15% Phòng thủ và hồi phục 5% máu tối đa trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
createHero3('h5_10', 'Lý Phụng Hiểu', 75, 5, 'ally', 'Mãnh Tướng', '982 – 1059 | Làng Băng Sơn (Hoằng Hóa, Thanh Hóa) | Lập công lớn dẹp yên Loạn Tam vương phò tá Lý Thái Tông lên ngôi (1028). Dẹp loạn biên giới Ái Châu, đánh tan quân Chiêm Thành. Nổi tiếng với điển tích ném long đao xin ruộng cày báo hiếu tổ tiên.', 'Phụng Hiểu Thề Đao', 'Gây 180% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'armor_pen', skillEffectChance: 15, skillDmgMult: 18 }),
createHero3('h5_11', 'Tông Đản', 75, 5, 'ally', 'Danh Tướng', 'Thế kỷ XI | Châu Quảng Nguyên (Cao Bằng ngày nay) | Hào trưởng Tày/Nùng, chỉ huy cánh quân bộ binh sơn chiến đánh sang đất Tống (1075). Phối hợp với Lý Thường Kiệt bao vây và hạ thành Ung Châu. Đại diện đại đoàn kết dân tộc thiểu số bảo vệ non sông.', 'Tập Khánh Phá Ung Châu', 'Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân tự nhận trạng thái Phản sát thương (phản 15% sát thương nhận vào) trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'reflect', skillEffectChance: 100, skillDmgMult: 18 }),
createHero3('h5_12', 'Lê Văn Thịnh', 75, 5, 'ally', 'Trạng Nguyên', '1050 – 1096 | Làng Đông Cứu (Gia Bình, Bắc Ninh) | Trạng nguyên khai khoa Nho học đầu tiên (1075). Chánh sứ đàm phán (1084) đòi lại 6 huyện từ tay nhà Tống mà không tốn mũi tên. Sau bị vướng vào kỳ án "Hóa hổ hồ Dâm Đàm" bị kết tội đày ải đầy bi kịch.', 'Trạng Nguyên Đối Chất', 'Gây 145% sát thương phép lên 1 hàng dọc. Có 15% tỷ lệ làm giảm 10% Phòng thủ của mục tiêu trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'def_down', skillEffectChance: 15, skillDmgMult: 14.5 }),
createHero3('h5_13', 'Thiền sư Nguyễn Minh Không', 75, 5, 'ally', 'Thiền Sư', '1065 – 1141 | Làng Đàm Xá (Gia Viễn, Ninh Bình) | Chữa khỏi căn bệnh "hóa hổ mọc lông" kỳ lạ cho vua Lý Thần Tông. Đúc thành công "An Nam tứ đại khí" khổng lồ bằng đồng. Được tôn xưng là Đức Thánh Nguyễn, thần y và thánh bảo trợ nghề đúc đồng.', 'Hóa Hổ Trừ Tật', 'Hồi phục lượng máu bằng 15% máu tối đa cho đồng minh có HP thấp nhất, đồng thời giải hiệu ứng xấu (Thanh tẩy).', { role: 'Hỗ trợ', targetScope: 'single', skillEffect: 'cleanse', skillEffectChance: 100, skillDmgMult: 0 }),
createHero3('h5_14', 'Lý Đạo Thành', 75, 5, 'ally', 'Tể Tướng', '? – 1081 | Thăng Long, hoàng tộc nhà Lý | Thái sư đứng đầu triều đình, trụ cột văn trị thời kháng chiến chống Tống. Bỏ qua tư thù để hợp tác cùng Lý Thường Kiệt chèo chống đất nước, lo nội chính vững chắc. Chăm lo thi cử, định ra lễ nhạc quan chế.', 'Cương Trực Trị Triều', 'Hồi phục máu bằng 15% máu tối đa cho đồng minh yếu máu nhất, đồng thời tăng 18% Phòng thủ cho đồng minh đó trong 2 hiệp.', { role: 'Hỗ trợ', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 0 }),
createHero3('h5_15', 'Đỗ Anh Vũ', 75, 5, 'ally', 'Phụ Chính', '1113 – 1159 | Thăng Long, quyền thần thời Lý Anh Tông | Được Lê Thái hậu sủng ái trao toàn quyền bính. Bị giam nhưng được phục chức rồi thanh trừng phe đối lập. Cầm quân tiễu trừ phản loạn, đẩy lùi cướp biên. Lộng quyền gây tranh cãi lịch sử, khởi đầu suy thoái kỷ cương.', 'Phụ Chính Quyền Thần', 'Gây 145% sát thương vật lý lên 1 hàng dọc, đồng thời tăng 15% Phòng thủ cho bản thân trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'column', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 14.5 }),
createHero3('h5_16', 'Lưu Khánh Đàm', 65, 5, 'ally', 'Thái Sư', 'Thế kỷ XI – XII | Xã Yên Lãng (Mê Linh, Hà Nội) | Giữ chức Thái úy phò tá vua nhỏ Lý Thần Tông. Cùng em trai Lưu Ba củng cố kỷ cương triều chính, bảo đảm chuyển giao ngôi báu bình yên. Xây dựng chùa chiền, khôi phục nông nghiệp. Đại thần trung kiên nhà Lý.', 'Phụ Chính Thái Sư', 'Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp.', { role: 'Chiến tướng', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 9.5 }),
createHero3('h5_17', 'Nùng Trí Cao', 65, 5, 'ally', 'Thủ Lĩnh', '1025 – 1055 | Châu Quảng Nguyên (Cao Bằng), tù trưởng tộc Tày-Nùng | Dấy binh tự xưng hoàng đế (Đại Lịch, Nam Thiên). Được Lý Thái Tông phong tước, sau lại khởi binh đánh Tống chiếm giữ nhiều châu huyện làm rung chuyển Hoa Nam. Biểu tượng khát vọng tự chủ vùng sơn cước.', 'Quảng Nguyên Xưng Hùng', 'Gây 110% sát thương vật lý lên 1 hàng dọc. Đòn đánh bỏ qua 10% Giáp mục tiêu.', { role: 'Sát thủ', targetScope: 'column', skillEffect: 'armor_pen', skillEffectChance: 100, skillDmgMult: 11 }),
createHero3('h5_18', 'Thân Cảnh Phúc', 55, 5, 'ally', 'Phò Mã', 'Thế kỷ XI | Châu Quang Lang (Lạng Sơn), phò mã nhà Lý | Chỉ huy đội quân sơn cước phục kích tại hẻm Chi Lăng (1077), đánh tan đạo quân tiếp tế của Quách Quỳ. Biệt danh "Áo đen" reo rắc kinh hoàng cho giặc, tấm gương trung quân ái quốc của vùng Đông Bắc.', 'Phò Mã Lạng Sơn', 'Gây 110% sát thương vật lý lên 1 hàng dọc. Có 10% tỷ lệ gây Chảy máu (mất 3% HP mỗi lượt) trong 1 hiệp.', { role: 'Sát thủ', targetScope: 'column', skillEffect: 'bleed', skillEffectChance: 10, skillDmgMult: 11 }),
createHero3('h5_19', 'Thiền sư Không Lô', 55, 5, 'ally', 'Thiền Sư', '1016 – 1094 | Làng Hải Thanh (Giao Thủy, Nam Định) | Bỏ nghề chài lưới tu hành đắc đạo. Chữa bệnh cho hoàng gia, lập đàn cầu mưa giải trừ hạn hán. Gắn liền với các điển tích bay trên không, cưỡi mây đạp gió thỉnh kinh. Thiền sư dân gian nổi tiếng.', 'Thần Thông Quảng Đại', 'Gây 95% sát thương phép lên 3 tướng địch hàng trước. Có 10% tỷ lệ gây Câm lặng trong 1 hiệp.', { role: 'Pháp sư', targetScope: 'front_row', skillEffect: 'silence', skillEffectChance: 10, skillDmgMult: 9.5 }),
createHero3('h5_20', 'Lý Nhật Quang', 55, 5, 'ally', 'Hoàng Tử', '995 – 1057 (Thế kỷ XI) | Thăng Long, hoàng tử thứ 8 của Lý Thái Tổ | Trấn nhậm Hoan Châu (Nghệ An), khai hoang làm thủy lợi, mở rộng buôn bán. Giữ yên mặt nam, dẹp loạn biên giới, biến Nghệ An thành bàn đạp kinh tế - quân sự hùng hậu. Được nhân dân lập đền thờ tôn kính.', 'Uy Trấn Hoan Châu', 'Gây 95% sát thương vật lý lên 3 tướng địch hàng trước. Có 10% tỷ lệ làm giảm 8% Tốc độ của địch trong 1 hiệp.', { role: 'Khống chế', targetScope: 'front_row', skillEffect: 'slow', skillEffectChance: 10, skillDmgMult: 9.5 }),
createHero3('h5_21', 'Công chúa Phất Kim', 55, 5, 'ally', 'Công Chúa', 'Thế kỷ XI | Hoàng tộc Thăng Long, gả cho hào trưởng Lê Đền (Lê Hoàn) | Góp phần liên minh hôn nhân mềm dẻo ràng buộc biên ải. Đem văn hóa, kỹ thuật của người Kinh truyền cho đồng bào miền núi. Giữ vững sự trung thành của tù trưởng biên thùy che chở Thăng Long.', 'Hướng Phật Quy Tâm', 'Hồi phục máu bằng 8% máu tối đa cho đồng minh yếu máu nhất, đồng thời tăng 5% Né tránh trong 1 hiệp.', { role: 'Hỗ trợ', targetScope: 'single', skillEffect: 'dodge_up', skillEffectChance: 100, skillDmgMult: 0 }),
createHero3('h5_22', 'Thiền sư Giác Hải', 55, 5, 'ally', 'Thiền Sư', 'Thế kỷ XI – XII | Vùng Hải Thanh (Nam Định), bạn đồng đạo Không Lộ | Tinh thông pháp thuật, thường được vua mời vào cung giảng đạo thi giải trừ tai ách. Dù được ban lộc hậu vẫn giữ nếp sống thanh bần am cỏ. Thiền gia huyền thoại tiêu biểu thời văn hóa Thăng Long.', 'Thiền Định Hộ Quốc', 'Gây 80% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 5% Phòng thủ bản thân trong 1 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 8 }),
createHero3('h5_23', 'Lý Kế Nguyên', 55, 5, 'ally', 'Danh Tướng', 'Thế kỷ XI | Vùng duyên hải Đông Bắc Đại Việt | Thủy quân Đô đốc trấn giữ vùng biển Đông Bắc (Vân Đồn). Đánh chặn mười đợt vượt biển của hạm đội tiếp viện nhà Tống (1077), bẻ gãy kế hoạch phối hợp thủy-bộ của giặc Tống.', 'Đông Kênh Thủy Trận', 'Gây 110% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời tăng 5% Phòng thủ bản thân trong 1 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 11 }),
// ═══════════════════════════════════════ CHƯƠNG 6 ═══════════════════════════════════════
createHero2('h6_1', 'Trần Quốc Tuấn', 95, 6, 'ally', 'Nhà Trần', '1228 – 1300 | Hương Tức Mặc (Nam Định), con trai An Sinh Vương Trần Liễu | Quốc công Tiết chế, chỉ huy tối cao đánh tan quân Nguyên Mông lần 2 (1285) và lần 3 (1288) trên sông Bạch Đằng. Tác giả Hịch Tướng Sĩ và Binh Thư Yếu Lược. Gạt tư thù vì việc nước, được tôn xưng "Đức Thánh Trần".', 'Hào Khí Đông A', 'Hồi 25% thanh nộ khí và tăng 20% chỉ số Tấn công (duy trì 2 hiệp) cho 2 tướng đồng minh có chỉ số Tấn công cơ bản cao nhất.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_2', 'Trần Thủ Độ', 95, 6, 'ally', 'Nhà Trần', '1194 – 1264 | Làng Lưu Xá (Hưng Hà, Thái Bình) | Đạo diễn cuộc chuyển giao ngôi báu nhà Lý sang Trần (1226). Lãnh đạo cuộc kháng chiến chống Mông Cổ lần 1 (1258). Nổi tiếng với câu nói "Đầu thần chưa rơi xuống đất, bệ hạ đừng lo!". Trụ cột khai sáng nhà Trần.', 'Quyền Bính Thiên Hạ', 'Gây **100%** sát thương phép lên toàn đội hình địch. Có 25% tỷ lệ khiến địch bị Mê hoặc (đánh nhầm đồng đội) trong 1 hiệp.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_3', 'Trần Nhân Tông', 95, 6, 'ally', 'Nhà Trần', '1258 – 1308 | Thăng Long, con trưởng của Trần Thánh Tông | Lãnh đạo toàn thắng hai cuộc kháng chiến chống Nguyên Mông (1285, 1288). Chủ trương hòa giải nội bộ. Gả công chúa Huyền Trân mở mang bờ cõi. Lên núi Yên Tử tu hành lập Thiền phái Trúc Lâm. Vị Phật Hoàng vĩ đại.', 'Thiền Tâm Phổ Độ', 'Hồi máu bằng 15% máu tối đa của bản thân cho 1 đồng minh thấp máu nhất. Tạo Khiên ảo tương đương 10% máu tối đa cho 3 tướng phe ta ở hàng trên.', 'Gây sát thương phép lên 1 địch và hồi lượng nhỏ HP cho bản thân.'),
createHero2('h6_4', 'Trần Thánh Tông', 95, 6, 'ally', 'Nhà Trần', '1240 – 1290 | Thăng Long, con trưởng của Trần Thái Tông | Đồng lãnh đạo cùng Thượng hoàng và Trần Nhân Tông đánh thắng quân Nguyên Mông lần hai (1285) và ba (1288). Triệu tập Hội nghị Diên Hồng và Bình Than thống nhất ý chí toàn dân đánh giặc.', 'Hoàng Ân Hạo Đãng', 'Gây **150%** sát thương phép lên 3 tướng địch hàng trên. Nhận chia sẻ 15% sát thương thay cho 1 tướng đồng minh yếu máu nhất trong 2 hiệp.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_5', 'Trần Thái Tông', 95, 6, 'ally', 'Nhà Trần', '1218 – 1277 | Hương Tức Mặc (Phủ Thiên Trường, Nam Định), con thứ của Trần Thừa | Lên ngôi năm 8 tuổi qua sự dàn xếp của Trần Thủ Độ, mở ra nhà Trần. Lãnh đạo đánh tan quân Mông Cổ lần thứ nhất (1258). Định ra chế độ Thái thượng hoàng, thi Tam khôi, trước tác tác phẩm Thiền học sâu sắc.', 'Chân Mệnh Đế Vương', 'Gây **150%** sát thương vật lý lên 3 tướng địch hàng dưới. Bản thân nhận hiệu ứng Phản lại 20% sát thương nhận vào trong 2 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_6', 'Phạm Ngũ Lão', 85, 6, 'ally', 'Nhà Trần', '1255 – 1320 | Làng Phù Ủng (Ân Thi, Hưng Yên) | Đan sọt ven đường mải nghĩ việc quân, bị giáo đâm xuyên đùi không hay. Được Hưng Đạo Vương phát hiện tài năng. Chỉ huy phục kích đánh Thoát Hoan, đánh dẹp Ai Lao, Chiêm Thành. Tác giả bài thơ "Thuật hoài".', 'Hoành Thương Trấn Nhạc', 'Gây **85%** sát thương vật lý lên toàn đội hình địch. Có 25% tỷ lệ đòn đánh bỏ qua 15% phòng thủ địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_7', 'Trần Quang Khải', 85, 6, 'ally', 'Nhà Trần', '1241 – 1294 | Thăng Long, con thứ của vua Trần Thái Tông | Tể tướng suốt ba đời vua Trần. Trực tiếp chỉ huy mặt trận phía Nam chặn đạo quân Toa Đô. Tổng chỉ huy trận đại thắng bến Chương Dương (1285) giải phóng Thăng Long. Trụ cột văn trị võ công sừng sững.', 'Đoạt Giáo Chương Dương', 'Quét ngang gây **135%** sát thương vật lý lên 3 tướng địch hàng trên. Có 30% tỷ lệ xóa bỏ 1 hiệu ứng Buff có lợi của mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_8', 'Trần Nhật Duật', 85, 6, 'ally', 'Nhà Trần', '1255 – 1330 | Thăng Long, con thứ 6 của vua Trần Thái Tông | Thông thạo ngoại ngữ, một mình vào trại dụ hàng tù trưởng Trịnh Giác Mật không tốn giọt máu. Chỉ huy trận Hàm Tử (1285) tiêu diệt Toa Đô. Bậc danh nhân toàn bích quân sự, ngoại giao và ngôn ngữ.', 'Mạn Thiên Tinh Môn', 'Gây **80%** sát thương phép lên toàn địch. Có 20% tỷ lệ khiến kẻ địch bị giảm 15% kháng phép trong 2 hiệp.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_9', 'Trần Khánh Dư', 85, 6, 'ally', 'Nhà Trần', '? – 1340 | Chí Linh (Hải Dương) | Từng mắc trọng tội bán than ở Chí Linh, sau phục chức dẹp giặc. Chỉ huy trận Vân Đồn (1288) thiêu rụi toàn bộ hạm đội tải lương của Trương Văn Hổ, chặt đứt huyết mạch nuôi quân của đạo quân Nguyên Mông.', 'Đoạt Lương Vân Đồn', 'Gây **135%** sát thương vật lý lên 3 tướng địch hàng dưới. Có 25% tỷ lệ Hút 20% Nộ khí của địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_10', 'Trần Thị Dung', 85, 6, 'ally', 'Nhà Trần', '? – 1259 | Hương Tức Mặc (Nam Định), con gái Trần Lý, em họ Trần Thủ Độ | Phối hợp Trần Thủ Độ dàn xếp hôn nhân Lý Chiêu Hoàng và Trần Cảnh. Đảm trách sơ tán tôn thất, thu xếp vũ khí lương thảo trong kháng chiến (1258). Quốc mẫu hậu phương lớn thời mở nước và kháng chiến.', 'Quốc Mẫu Nghi Thiên', 'Hồi máu cho toàn bộ đội hình bằng 12% máu tối đa của bà. Có 25% tỷ lệ Thanh tẩy 1 trạng thái bất lợi cho 3 tướng hàng trên.', 'Gây sát thương phép lên 1 địch và hồi lượng nhỏ HP cho bản thân.'),
createHero2('h6_11', 'Trần Quốc Toản', 75, 6, 'ally', 'Nhà Trần', '1267 – 1285 | Hoàng tộc nhà Trần | Nhỏ tuổi bị gạt khỏi hội nghị Bình Than, ôm hận bóp nát quả cam. Chiêu mộ nghĩa binh, dương cờ "Phá cường địch báo hoàng ân". Lập công lớn tại Tây Kết, Hàm Tử. Hy sinh anh dũng vùng sông Như Nguyệt.', 'Toái Thạch Phá Tâm', 'Gây **200%** sát thương vật lý lên 1 mục tiêu có máu thấp nhất. Đòn đánh được cộng sẵn 15% tỷ lệ bạo kích.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_12', 'Yết Kiêu', 75, 6, 'ally', 'Nhà Trần', '1242 – 1303 | Làng Hạ Bì (Gia Lộc, Hải Dương), con nhà chài lưới | Tài bơi lặn siêu phàm, chỉ huy đội cảm tử lặn ngầm đục đáy đắm hàng chục chiến thuyền quân Nguyên. Trung thành cắm thuyền ở Bãi Tân cứu Hưng Đạo Vương thoát vây. Ông tổ của nghệ thuật đặc công nước Việt Nam.', 'Giao Long Đột Kích', 'Gây **150%** sát thương vật lý lên 1 hàng dọc. Buff cho bản thân 15% tỷ lệ Né tránh. Mỗi lần né có 20% tỷ lệ hồi 15 nộ khí.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_13', 'Dã Tượng', 75, 6, 'ally', 'Nhà Trần', 'Thế kỷ XIII | Miền đồi núi Tây Bắc / Đông Bắc Đại Việt | Tài huấn luyện voi chiến bậc thầy, gia thần tâm phúc của Trần Hưng Đạo. Cùng Yết Kiêu khuyên can Hưng Đạo Vương không tranh ngôi báu, giữ trọn đạo thần tử. Cánh tay phải trên bộ không thể thay thế của Quốc Công Tiết Chế.', 'Thiết Tượng Càn Quét', 'Gây **120%** sát thương vật lý lên 3 tướng địch hàng trên. Có 15% tỷ lệ gây Choáng trong 1 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_14', 'Trần Bình Trọng', 75, 6, 'ally', 'Nhà Trần', '1259 – 1285 | Xã Bảo Thái (Thanh Liêm, Hà Nam) | Thống lĩnh đạo quân chặn hậu tại Thiên Mạc để triều đình rút lui. Sa vào tay giặc, cự tuyệt phong vương và hiên ngang hy sinh với câu nói bất hủ "Ta thà làm quỷ nước Nam chứ không thèm làm vương đất Bắc".', 'Nam Quỷ Bất Khuất', 'Gây **200%** sát thương vật lý lên 1 mục tiêu hàng trên. Có 25% tỷ lệ Khiêu khích toàn địch đánh mình và tăng 15% phòng thủ bản thân trong 1 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_15', 'Trần Tung', 75, 6, 'ally', 'Nhà Trần', '1230 – 1291 | Tức Mặc (Nam Định), anh ruột của Hưng Đạo Vương | Tuệ Trung Thượng Sĩ, hai lần cầm quân đánh giặc Nguyên Mông. Khai mở tư tưởng Phật học phóng khoáng vượt mọi chấp niệm, người thầy tâm linh của Phật Hoàng Trần Nhân Tông. Đỉnh cao dòng thiền cư sĩ Việt Nam.', 'Phóng Dật Thiền Giao', 'Không gây sát thương. Gắn hiệu ứng Miễn khống cho 2 tướng đồng minh có lực chiến cao nhất trong 1 hiệp (tỷ lệ thành công 35%).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_16', 'Lê Phụ Trần', 75, 6, 'ally', 'Nhà Trần', 'Thế kỷ XIII | Thanh Hóa | Lấy ván thuyền che tên cho vua Trần Thái Tông tại Bình Lệ Nguyên (1258). Được ban quốc tính và gả công chúa Chiêu Thánh. Làm sứ giả sang thương thuyết cứng rắn với Hốt Tất Liệt. Đại thần có công cứu mạng vua.', 'Xuyên Tường Phá Địch', 'Gây **150%** sát thương vật lý lên 1 hàng dọc. Kẻ địch đứng sau nhận thêm 10% sát thương.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_19', 'Nguyễn Khoái', 75, 6, 'ally', 'Nhà Trần', 'Thế kỷ XIII | Vùng sông nước Khoái Châu (Hưng Yên) | Đại tướng chỉ huy đội cấm binh Tiệp Bảo. Đóng góp then chốt trong trận tái chiếm Thăng Long tại Tây Kết, Chương Dương (1285) và trận thủy chiến Bạch Đằng (1288). Xung kích tuyến đầu phá vỡ phòng tuyến giặc.', 'Thiết Kỵ Xung Phong', 'Gây **120%** sát thương vật lý lên 3 tướng địch hàng trên. Có 15% tỷ lệ gây Câm lặng trong 1 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_20', 'Nguyễn Chế Nghĩa', 75, 6, 'ally', 'Nhà Trần', '1265 – 1341 | Làng Cu Cương (Gia Lộc, Hải Dương) | Tài bắn cung bách phát bách trúng. Trấn giữ ải Nội Bàng chặn đứng các đợt tiến công của Thoát Hoan. Một mình bắn hạ hàng chục kỵ binh địch, được gọi là "Thần tiễn Đại Việt". Gương mặt trẻ tuổi kiệt xuất thời Trần.', 'Ngự Tiền Đột Trận', 'Cầm cây giáo dài xé toạc đội hình, gây **145%** sát thương vật lý lên 1 hàng dọc. Kẻ địch trúng đòn bị Giảm 10% Phòng thủ trong 2 hiệp. Nếu kẻ địch có lượng máu dưới 50%, sát thương của kỹ năng tự động tăng thêm 15%.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_21', 'Đoàn Nhữ Hài', 75, 6, 'ally', 'Nhà Trần', '1280 – 1335 | Làng Hội Xuyên (Gia Lộc, Hải Dương) | Soạn biểu tạ tội cứu vua Anh Tông thoát nguy cơ phế truất năm 20 tuổi. Làm khâm sai kinh lý hai châu Ô, Lý. Chỉ huy đánh Ai Lao và hy sinh trên chiến trường. Nhà ngoại giao tài hoa đại diện việc trọng dụng nhân tài thời Trần.', 'Biểu Khấu Đầu', 'Gây **110%** sát thương phép lên 3 tướng địch hàng trước. Tỉ lệ 15% Giảm 10% công địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_22', 'An Tư Công Chúa', 65, 6, 'ally', 'Nhà Trần', 'Thế kỷ XIII (hoạt động năm 1285) | Thăng Long, hoàng tộc họ Trần | Công chúa út Trần Thái Tông. Chấp nhận gả sang trại giặc cho Trấn Nam Vương Thoát Hoan làm kế hoãn binh năm 1285. Âm thầm gửi tình báo quân sự về cho Hưng Đạo Vương. Tấm gương liệt nữ hy sinh vì xã tắc.', 'Dâng Mình Vì Nước', 'Mất 10% máu hiện tại để tạo Khiên (bằng 80% máu vừa mất) cho 1 tướng chủ lực. Tăng 10% Tỷ lệ bạo kích cho tướng đó.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h6_23', 'Đỗ Khắc Chung', 65, 6, 'ally', 'Nhà Trần', '1247 – 1330 | Xã Giáp Sơn (Kinh Môn, Hải Dương) | Một mình vào trại Ô Mã Nhi thương thuyết cứng rắn (1285) được ban tên Trần Khắc Chung. Năm 1307 mưu cứu công chúa Huyền Trân khỏi tục hỏa thiêu ở Chiêm Thành. Sứ giả can trường có tài hùng biện bậc nhất.', 'Biện Thuyết Giải Vây', 'Giảm 15% sức tấn công của 3 tướng địch hàng trên trong 2 hiệp (tỷ lệ thành công 25%).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),


  // ═══════════════════════════════════════ CHƯƠNG 7 ═══════════════════════════════════════
  createHero2('h7_1', 'Chu Văn An', 75, 7, 'ally', 'Danh Sĩ', 'Đại danh sĩ, nhà giáo dục lỗi lạc thời Trần, từng dâng Thất trảm sớ xin chém 7 gian thần nhưng không được chấp thuận.', 'Thất Trảm Sớ', 'Dâng sớ trừ gian, gây sát thương (150% Tấn công) lên 1 mục tiêu địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero3('h7_2', 'Hồ Quý Ly', 80, 7, 'ally', 'Hoàng Đế', '1336 – 1407 | Làng Đại Lại (Vĩnh Lộc, Thanh Hóa) | Thái sư quyền thần, truất ngôi nhà Trần lập ra triều Hồ (Đại Ngu). Phát hành tiền giấy, hạn điền, hạn nô, xây Thành Nhà Hồ bằng đá. Thất bại chống Minh do mất lòng dân. Nhà cải cách tư duy vượt thời đại.', 'Tân Chính Đổi Mới', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, bản thân nhận 20% Thủ và tăng 10% Công toàn đội trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
createHero3('h7_3', 'Hồ Nguyên Trừng', 80, 7, 'ally', 'Tướng Quân', '1374 – 1446 | Thanh Hóa, con trưởng Hồ Quý Ly | Sáng chế Thần cơ sang pháo và thuyền Cổ lâu hai tầng. Sau khi bị nhà Minh bắt, nhờ tài chế súng pháo nên được tha và phong làm Công bộ Thượng thư. Tác giả "Nam Ông mộng lục". Ông tổ pháo binh Việt Nam.', 'Súng Thần Cơ Phá Giặc', 'Gây 220% sát thương vật lý 1 mục tiêu hàng trên, đòn đánh bỏ qua 20% Giáp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'armor_pen', skillEffectChance: 100, skillDmgMult: 22 }),
createHero3('h7_4', 'Trần Nguyên Đán', 85, 7, 'ally', 'Tôn Thất', '1325 – 1390 | Tức Mặc (Nam Định), tôn thất hoàng gia họ Trần | Đại tư đồ phò tá Trần Nghệ Tông. Soạn sách Bách thế thông thư. Nhận rõ dã tâm của Hồ Quý Ly bèn lui về ẩn cư tại Côn Sơn. Ông ngoại và là người ươm mầm tư tưởng yêu nước cho Nguyễn Trãi.', 'Thiên Văn Thấu Triệt', 'Gây 140% sát thương phép 3 mục tiêu hàng dưới, tăng 12% Tốc độ toàn đội trong 2 hiệp.', { role: 'Hỗ trợ', targetScope: 'back_row', skillEffect: 'spd_up', skillEffectChance: 100, skillDmgMult: 14 }),
createHero3('h7_5', 'Đặng Tất', 85, 7, 'ally', 'Quốc Công', '1357 – 1409 | Can Lộc (Hà Tĩnh) | Tổng chỉ huy đại thắng Bô Cô (1408) chém đầu tướng giặc. Trụ cột quân sự kiệt xuất của nhà Hậu Trần, nhưng bị Giản Định Đế nghi ngờ mưu phản và sát hại oan khuất, là tổn thất chí mạng cho nghĩa quân.', 'Bô Cô Đại Phá', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, bản thân nhận 20% Thủ và tăng 10% Công trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
createHero3('h7_6', 'Nguyễn Cảnh Chân', 85, 7, 'ally', 'Đại Thần', '1355 – 1409 | Làng Ngọc Sơn (Thanh Chương, Nghệ An) | Thái bảo phò tá Giản Định Đế. Chỉ huy thủy quân phối hợp cùng Đặng Tất làm nên chiến thắng vang dội Bô Cô. Bị hãm hại oan cùng Đặng Tất tạo nên nỗi tiếc thương vô hạn.', 'Trung Nghĩa Phò Triều', 'Gây 140% sát thương phép 3 mục tiêu hàng dưới, tăng 12% Phòng thủ toàn đội trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 14 }),
createHero3('h7_7', 'Nguyễn Phi Khanh', 65, 7, 'ally', 'Danh Sĩ', '1355 – 1428 | Nhị Khê (Thường Tín, Hà Nội) | Thượng thư nhà Hồ, thân phụ Nguyễn Trãi. Bị bắt giải về Trung Quốc. Tác giả "Nhị Khê thi tập". Dặn dò Nguyễn Trãi quay về rửa nhục cứu nước tại ải Nam Quan. Người truyền lửa yêu nước mãnh liệt.', 'Ức Trai Phụ Thân', 'Gây 145% sát thương phép 1 hàng dọc, tăng 10% Tấn công bản thân và đồng minh cùng hàng trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 14.5 }),
createHero3('h7_8', 'Nguyễn An', 75, 7, 'ally', 'Kỳ Tài', '1381 – 1453 | Vùng Hà Đông (Hà Nội ngày nay) | Bị quân Minh bắt làm hoạn quan. Tổng công trình sư quy hoạch và xây dựng Cố Cung (Tử Cấm Thành Bắc Kinh). Trị thủy sông Hoàng Hà. Bậc đại công thần thanh liêm, kiến trúc sư thiên tài tầm cỡ thế giới.', 'Kỳ Tài Kiến Trúc', 'Gây 145% sát thương phép 1 hàng dọc, tăng 15% Phòng thủ bản thân trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 14.5 }),
createHero3('h7_9', 'Đặng Dung', 75, 7, 'ally', 'Danh Tướng', '1373 – 1414 | Can Lộc (Hà Tĩnh), con trai Đặng Tất | Tôn Trùng Quang Đế mưu đồ cứu nước. Nửa đêm nhảy lên thuyền định chém đầu Trương Phụ. Nhảy xuống biển tuẫn tiết cùng vua. Tác giả bài thơ bi tráng "Cảm hoài". Biểu tượng chí khí anh hùng ngút trời.', 'Thuật Hoài Hào Khí', 'Gây 140% sát thương vật lý 3 mục tiêu hàng trước, nhận 20% Thủ và phản 15% sát thương trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'front_row', skillEffect: 'reflect', skillEffectChance: 100, skillDmgMult: 14 }),
createHero3('h7_10', 'Nguyễn Cảnh Dị', 75, 7, 'ally', 'Danh Tướng', '? – 1414 | Thanh Chương (Nghệ An), con trai Nguyễn Cảnh Chân | Cùng Đặng Dung tôn Trùng Quang Đế. Bị thương rơi vào tay giặc, mắng chửi Trương Phụ bạo tàn và bị mổ bụng moi gan dã man nhưng không nao núng. Tượng đài dũng tướng kiên cường xứ Nghệ.', 'Trung Liệt Tuẫn Tiết', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, miễn khống chế và tăng 15% Công trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 18 }),
createHero3('h7_11', 'Hồ Hán Thương', 75, 7, 'ally', 'Hoàng Đế', '? – 1407 | Thanh Hóa, con thứ Hồ Quý Ly | Vị vua thứ hai nhà Hồ, mang nửa dòng máu họ Trần. Đúc súng thần cơ, đóng thuyền Cổ lâu, nam chinh bình định Chiêm Thành. Dốc toàn lực kháng Minh nhưng vỡ trận phòng tuyến Đa Bang, bị bắt giải về Kim Lăng.', 'Nhà Hồ Mạt Vận', 'Gây 135% sát thương phép 3 mục tiêu hàng dưới, tạo Khiên ảo bằng 15% máu tối đa trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'shield', skillEffectChance: 100, skillDmgMult: 13.5 }),
createHero3('h7_12', 'Hồ Tông Thốc', 75, 7, 'ally', 'Đại Thần', 'Thế kỷ XIV | Làng Thổ Đôi (Quỳnh Lưu, Nghệ An) | Sử gia tiên phong, trước tác "Việt Nam thế chí" và "Việt sử cương mục". Nổi tiếng văn chương ứng đối kỳ tài làm xong bài phú trong một nén hương khiến sứ phương Bắc bái phục.', 'Cải Cách Xã Thắc', 'Gây 145% sát thương phép 1 hàng dọc, giảm 10% Phòng thủ mục tiêu trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'def_down', skillEffectChance: 100, skillDmgMult: 14.5 }),
createHero3('h7_13', 'Trần Ngỗi', 75, 7, 'ally', 'Hoàng Đế', '? – 1410 | Con thứ vua Trần Nghệ Tông | Dấy binh xưng là Giản Định Đế khôi phục nhà Trần. Chỉ huy trận đại thắng Bô Cô (1408) đánh tan quân Minh. Nhưng do nghe lời dèm pha đã sát hại hai tướng giỏi, dẫn đến thất bại bi thảm.', 'Hậu Trần Phất Cờ', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, nhận 15% Công và hồi 5% máu tối đa trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 18 }),
createHero2('h7_14', 'Nguyễn Biểu', 65, 7, 'ally', 'Danh Sĩ', '? – 1413 | Làng Bình Hồ (Đức Thọ, Hà Tĩnh) | Sứ giả cầu hòa hoãn binh. Ung dung ăn cỗ đầu người mắng chửi Trương Phụ. Bị trói dưới gầm cầu dìm chết nhưng trước khi mất vẫn dùng chân khắc thơ tuyệt mệnh. Khí tiết kẻ sĩ khiến giặc cũng rùng mình kính sợ.', 'Khí Phách Ngang Tàng', 'Khí phách lấn át kẻ thù, gây sát thương (130% Tấn công) lên 1 mục tiêu địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero2('h7_15', 'Hoàng Hối Khanh', 68, 7, 'ally', 'Đại Thần', '1362 – 1407 | Làng Bái Cầu (Quảng Trạch, Quảng Bình) | Thượng thư trấn thủ Thăng Long và biên cương. Đốc công xây dựng phòng tuyến Đa Bang chống quân Minh. Khi đất nước thất thủ đã tuẫn tiết chứ không chịu đầu hàng phương Bắc.', 'Trấn Thủ Phương Nam', 'Tăng cường phòng thủ cho đồng minh, (+15% Phòng thủ toàn đội).', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero2('h7_16', 'Nguyễn Suý', 67, 7, 'ally', 'Tướng quân', '? – 1414 | Vùng đồng bằng sông Hồng | Thái phó chỉ huy quân cơ triều Trùng Quang Đế. Đóng vai trò tiếp tế hậu cần và chỉ huy thủy quân. Bị bắt và đã lập mưu ôm chặt tướng giặc Minh nhảy xuống biển sâu quyên sinh vì nước.', 'Kỳ Binh Kỳ Trận', 'Dùng chiến thuật bất ngờ, gây sát thương (134% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h7_17', 'Trần Thuận Tông', 60, 7, 'ally', 'Hoàng Đế', '1378 – 1399 | Thăng Long, con út Trần Nghệ Tông, con rể Hồ Quý Ly | Hoàng đế bù nhìn lên ngôi năm 10 tuổi. Bị ép dời đô về Tây Đô, ép nhường ngôi cho con rồi đi tu, cuối cùng bị bức tử. Chứng nhân cho sự sụp đổ bất khả kháng của triều Trần.', 'Vương Quyền Suy Vi', 'Hoàng ân cuối cùng, hồi phục (100% Tấn công) HP cho đồng minh yếu nhất.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero2('h7_18', 'Phạm Sư Mạnh', 72, 7, 'ally', 'Danh Sĩ', 'Thế kỷ XIV (1300 – 1384) | Làng Hiệp Thạch (Kinh Môn, Hải Dương) | Học trò xuất sắc của Chu Văn An. Đỗ đệ nhị giáp, giữ chức Nhập nội Hành khiển. Đi kinh lý tuần thú biên ải Tây Bắc, để lại nhiều bài thơ khắc trên vách đá. Nho thần mẫu mực tôn sư trọng đạo.', 'Hàn Lâm Văn Tập', 'Dùng tài văn chương cổ vũ tinh thần, (+20 Nhuệ khí toàn đội).', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
createHero3('h7_19', 'Lê Cảnh Kỳ', 55, 7, 'ally', 'Tướng Lĩnh', 'Thế kỷ XIV – XV | Vùng đất Thanh Hóa | Thị độc học sĩ triều Hồ. Hiến kế phòng ngự bảo vệ biên ải. Kiên quyết bất hợp tác với chính quyền đô hộ, giữ trọn khí tiết thà chịu đày đọa chứ không làm tay sai ngoại bang.', 'Cận Thần Tuẫn Quốc', 'Gây 80% sát thương vật lý 3 mục tiêu hàng trước, tăng 5% Phòng thủ bản thân trong 1 hiệp.', { role: 'Chiến tướng', targetScope: 'front_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 8 }),
createHero2('h7_20', 'Phạm Lực Tài', 51, 7, 'ally', 'Hào kiệt', 'Thế kỷ XIV | Vùng đồng bằng sông Hồng | Mãnh tướng chỉ huy thủy bộ cấm binh cuối triều Trần. Huấn luyện quân tinh nhuệ, dẹp loạn thổ phỉ. Sở hữu kỹ năng cận chiến giáp lá cà điêu luyện, chèo chống bảo vệ cung cấm thời kỳ suy vong.', 'Tự Do Chiến Đấu', 'Đánh vì tự do, tinh thần không bị bó buộc. (+20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero3('h7_21', 'Trần Quý Khoáng', 75, 7, 'ally', 'Hoàng Đế', '? – 1414 | Cháu nội vua Trần Nghệ Tông | Được Đặng Dung suy tôn làm Trùng Quang Đế. Lãnh đạo kháng chiến chống Minh suốt 5 năm ở miền Trung. Bị bắt và đã nhảy xuống biển tự vẫn trên đường bị giải về phương Bắc để giữ trọn khí tiết.', 'Trùng Quang Kháng Minh', 'Gây 135% sát thương phép 3 mục tiêu hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 13.5 }),
  createHero2('h7_22', 'Trần Khát Chân', 78, 7, 'ally', 'Tướng quân', 'Trần Khát Chân là dũng tướng tài ba cuối nhà Trần, người đã đánh bại và giết chết vua Chế Bồng Nga của Chiêm Thành năm 1390.', 'Bãi Trúc Phục Kích', 'Phục kích trong bụi rậm, đòn tấn công bất ngờ gây sát thương (156% Tấn công) cao. (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h7_23', 'Trần Thiếu Đế', 55, 7, 'ally', 'Hoàng Đế', '1396 – ? (mất sau năm 1400) | Thăng Long, cháu ngoại ruột Hồ Quý Ly | Lên ngôi năm 2 tuổi, hoàng đế cuối cùng nhà Trần. Bị phế truất năm 1400 để lập ra nhà Hồ nhưng được tha mạng do là cháu ngoại ruột của Hồ Quý Ly.', 'Ấu Chúa Vô Quyền', 'Suy giảm ý chí chiến đấu của kẻ địch, giảm 10% Tấn công của 1 mục tiêu địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),

  // ═══════════════════════════════════════ CHƯƠNG 8 ═══════════════════════════════════════
createHero2('h8_1', 'Lê Lợi', 90, 8, 'ally', 'Bình Định Vương', '1385 – 1433 | Đất Lam Sơn (Thọ Xuân, Thanh Hóa) | Bình Định Vương, thủ lĩnh tối cao khởi nghĩa Lam Sơn. Sau 10 năm gian khổ đánh đuổi quân Minh, lên ngôi vua Lê Thái Tổ lập ra triều Lê Sơ thịnh trị. Gắn với truyền thuyết trả gươm thần cho Rùa vàng.', 'Lam Sơn Khởi Nghĩa', 'Hiệu triệu nghĩa sĩ bốn phương cho toàn đội (+20% Tấn công, +30 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_2', 'Nguyễn Trãi', 88, 8, 'ally', 'Anh hùng dân tộc', '1380 – 1442 | Nhị Khê (Thường Tín, Hà Nội), con Nguyễn Phi Khanh | Danh nhân văn hóa thế giới, quân sư tối cao của Lê Lợi. Dâng "Bình Ngô sách", tác giả "Bình Ngô đại cáo" và những thư từ dụ hàng quân Minh. Chịu án oan Lệ Chi Viên bi thảm, sau được Lê Thánh Tông minh oan.', 'Bình Ngô Đại Cáo', 'Dùng văn chương như gươm, gây sát thương (176% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_3', 'Lê Lai', 75, 8, 'ally', 'Trung thần', '? – 1418 | Thôn Dựng Tú (Ngọc Lặc, Thanh Hóa) | Biểu tượng trung liệt xả thân cứu chúa. Khi nghĩa quân bị vây hãm tuyệt lương tại núi Chí Linh, đã mặc áo bào đóng giả Lê Lợi xông ra thu hút hỏa lực giặc và anh dũng hy sinh.', 'Thế Thân Cứu Chúa', 'Hy sinh bản thân bảo vệ chủ tướng, gây sát thương (150% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_4', 'Trần Nguyên Hãn', 80, 8, 'ally', 'Tướng quân', '1390 – 1429 | Xã Sơn Đông (Lập Thạch, Vĩnh Phúc) | Tả tướng quốc, tổng chỉ huy hạ thành Xương Giang chặn viện binh. Thiên tài quân sự Lam Sơn. Sau hòa bình xin từ quan nhưng bị vu oan mưu phản, trầm mình xuống sông Lô tự vẫn chứng minh trong sạch.', 'Chi Lăng Hùng Phong', 'Chiến thuật địa hình sắc bén, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_5', 'Lê Sát', 76, 8, 'ally', 'Khai quốc công thần', '? – 1437 | Thôn Biện Thượng (Vĩnh Lộc, Thanh Hóa) | Mãnh tướng chém chết Liễu Thăng tại núi Mã Yên (Chi Lăng). Trở thành quyền thần nhiếp chính chuyên quyền thời Lê Thái Tông, sát hại trung lương nên bị vua trị tội ép thắt cổ tự vẫn.', 'Chiến Trận Lão Tướng', 'Kinh nghiệm trận mạc dày dạn, gây sát thương (152% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_6', 'Lê Ngân', 75, 8, 'ally', 'Khai quốc công thần', '? – 1437 | Vùng Lam Sơn (Thanh Hóa) | Dũng tướng thủy quân Lam Sơn. Đánh chiếm thành Thị Cầu và vây hãm Đông Quan. Làm đại thần thời bình nhưng bị kết tội mê tín lập đền thờ trong nhà cầu duyên cho con gái và bị ép tự vẫn.', 'Lam Sơn Tiên Phong', 'Đi đầu trong mọi trận đánh, gây sát thương (120% Tấn công) lên hàng trước địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_7', 'Phạm Văn Xảo', 71, 8, 'ally', 'Tướng quân', '? – 1429 | Vùng Kinh Bắc (Bắc Ninh) | Tướng lĩnh xuất sắc đánh bại hoàn toàn đạo quân Vân Nam của Mộc Thạnh tại ải Lê Hoa. Năm 1429 bị gian thần dèm pha cùng phe Trần Nguyên Hãn và bị xử tử oan.', 'Linh Đông', 'Linh hoạt trong mọi tình huống, gây sát thương (142% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_8', 'Đinh Lễ', 81, 8, 'ally', 'Đại tướng', '? – 1427 | Làng Thủy Chú (Thọ Xuân, Thanh Hóa) | Khai quốc công thần, đại tướng chủ lực. Kiến trúc sư chiến thắng Tốt Động - Chúc Động. Hy sinh oanh liệt trong trận My Động khi cưỡi voi chiến xung phong giải vây nhưng voi sa lầy.', 'Tốt Động Đại Phá', 'Đòn tổng lực từ nhiều hướng, gây sát thương (162% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_9', 'Nguyễn Xí', 80, 8, 'ally', 'Khai quốc công thần', '1397 – 1465 | Làng Thượng Xá (Nghi Lộc, Nghệ An) | "Người hai lần dựng nước", huấn luyện đàn chó săn chiến đấu. Bắt sống chủ tướng giặc Thôi Tụ. Năm 1460 chủ trì binh biến lật đổ Lê Nghi Dân, phò tá Lê Thánh Tông lên ngôi.', 'Phế Lập Đại Sự', 'Quyết định chiến lược tối cao, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_10', 'Lưu Nhân Chú', 66, 8, 'ally', 'Tướng quân', '? – 1433 | Làng Thuận Mẫu (Đại Từ, Thái Nguyên) | Thủ lĩnh người Tày, cùng Lê Sát chém Liễu Thăng. Từng vào Đông Quan làm con tin đàm phán. Giữ chức Tể tướng thời Lê Thái Tổ nhưng bị quyền thần Lê Sát ngầm đầu độc chết.', 'Bắc Thổ Chiến Binh', 'Chiến đấu quen thuộc với địa hình phía bắc cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_11', 'Lê Thánh Tông', 71, 8, 'ally', 'Hoàng đế', '1442 – 1497 | Thăng Long, con Lê Thái Tông và Ngô Thị Ngọc Dao | Bậc minh quân kiệt xuất nhất lịch sử. Đưa Đại Việt vào thời hoàng kim (Quang Thuận - Hồng Đức). Ban hành Luật Hồng Đức, mở rộng bờ cõi, lập Hội Tao Đàn. Minh oan cho Nguyễn Trãi.', 'Hồng Đức Đại Trị', 'Hệ thống pháp luật hoàn hảo cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_12', 'Ngô Sĩ Liên', 55, 8, 'ally', 'Sử quan', '1400 – 1498 | Làng Chúc Lý (Chương Mỹ, Hà Nội) | Đại sử gia kiệt xuất biên soạn vĩ thư Đại Việt sử ký toàn thư. Đưa kỷ Hồng Bàng vào chính sử, xác lập cội nguồn 4.000 năm văn hiến. Lời bình "Sử thần bàn rằng" là chuẩn mực đạo đức lịch sử.', 'Sử Ký Toàn Thư', 'Ghi chép chiến trận đầy đủ, học hỏi kinh nghiệm tăng dần sức mạnh. (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_13', 'Lương Thế Vinh', 62, 8, 'ally', 'Trạng nguyên toán học', '1441 – 1496 | Làng Cao Hương (Vụ Bản, Nam Định) | Trạng Lường, nhà toán học tiên phong vĩ đại biên soạn Đại thành toán pháp. Giai thoại đọ tài cân voi, đo bề dày giấy trắng chấn động phương Bắc. Đặt nền móng nghệ thuật múa rối và chèo truyền thống.', 'Toán Thuật Thần Kỳ', 'Tính toán chính xác từng đòn đánh, tăng sát thương chuẩn xác. (Gây 124% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_14', 'Nguyễn Thị Lộ', 65, 8, 'ally', 'Danh tướng', '1400 – 1442 | Làng Hải Triều (Hưng Hà, Thái Bình) | Nữ trí thức xuất chúng, Lễ nghi học sĩ triều đình, phu nhân Nguyễn Trãi. Bị hàm oan dìm chết xuống sông Hồng trong thảm án Lệ Chi Viên. Nạn nhân bi kịch của mưu đồ cung đình tàn khốc.', 'Dũng Mãnh', 'Gây 100% sát thương lên 1 mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_15', 'Thân Nhân Trung', 70, 8, 'ally', 'Văn thần', '1419 – 1499 | Làng Yên Ninh (Việt Yên, Bắc Giang) | Đại Nho sĩ, Phó Đô nguyên soái Tao Đàn nhị thập bát tú. Soạn văn bia tiến sĩ đầu tiên với câu nói muôn đời: "Hiền tài là nguyên khí quốc gia". Nhà tư tưởng giáo dục vĩ đại thời Hồng Đức.', 'Hiền Tài Nguyên Khí', 'Tụ hội nhân tài cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_16', 'Nguyễn Chích', 76, 8, 'ally', 'Đệ nhất mưu sĩ', '1382 – 1448 | Làng Đông Bột (Quảng Xương, Thanh Hóa) | Bậc thầy mưu lược, hiến kế tiến đánh Nghệ An làm đất đứng chân, mở đường thắng lợi. Sáng tạo biệt đội bồ câu quân báo liên lạc xuyên phòng tuyến địch.', 'Tuyệt Thế Mưu Lược', 'Đưa ra mưu kế đột phá, gây sát thương (152% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_17', 'Vũ Hữu', 57, 8, 'ally', 'Văn thần', '1437 – 1530 | Làng Mộ Trạch (Bình Giang, Hải Dương) | Trạng toán, cha đẻ ngành toán học ứng dụng Đại Việt. Tính toán vật liệu xây trùng tu Đoan Môn của Hoàng thành Thăng Long chính xác đến mức không thừa thiếu một viên gạch.', 'Văn Thần Trị Quốc', 'Quản lý chiến trường bằng quy tắc, gây sát thương (114% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_18', 'Nguyễn Trực', 55, 8, 'ally', 'Trạng nguyên', '1417 – 1474 | Làng Bối Khê (Thanh Oai, Hà Nội) | Lưỡng quốc Trạng nguyên đầu tiên triều Lê Sơ, Hiệu trưởng Quốc Tử Giám. Cùng Lê Thánh Tông đàm đạo thi ca, đào tạo nhiều thế hệ nhân tài rường cột, tấm gương đức hạnh của kẻ sĩ.', 'Ngoại Giao Học Vấn', 'Vũ khí tri thức, gây sát thương (110% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_20', 'Lê Triện', 65, 8, 'ally', 'Danh tướng', '? – 1427 | Làng Thủy Chú (Thọ Xuân, Thanh Hóa) | Tiên phong đạo quân Bắc tiến, mệnh danh "Phi tướng quân" với lối đánh thần tốc. Đánh tan quân Vương Thông tại Cổ Sở, Tốt Động. Hy sinh anh dũng trận cứu viện cầu Từ Liêm năm 1427.', 'Dũng Mãnh', 'Gây 100% sát thương lên 1 mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_21', 'Bùi Quốc Hưng', 67, 8, 'ally', 'Tướng quân', '? – 1444 | Vùng Đan Phượng (Hà Nội) | Trọng thần cơ mật, dự Hội thề Lũng Nhai. Xây dựng đồn điền dự trữ lương thực vùng thượng du Thanh Hóa. Đóng góp lớn ổn định bộ máy hành chính sau chiến tranh.', 'Quốc Thổ Giải Phóng', 'Chiến đấu vì độc lập cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_22', 'Lê Thụ', 51, 8, 'ally', 'Tướng quân', '? – 1460 | Vùng Lam Sơn (Thanh Hóa) | Chỉ huy ngự lâm quân bảo vệ cung thành qua nhiều đời vua. Gắn liền với các biến loạn cung đình trung kỳ Lê Sơ, bị Nguyễn Xí, Đinh Liệt xử tử vì phe Lê Nghi Dân trong binh biến năm 1460.', 'Căn Cứ Địa Vững Chắc', 'Bảo vệ căn cứ, gây sát thương (102% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_23', 'Trịnh Khả', 57, 8, 'ally', 'Tướng quân', '1399 – 1451 | Làng Kim Bôi (Vĩnh Lộc, Thanh Hóa) | Thái úy kiệt xuất văn võ toàn tài. Chỉ huy nam phạt Chiêm Thành. Phụ chính giữ kỷ cương thời Lê Nhân Tông nhưng bị dèm pha xử tử oan, sau được minh oan.', 'Chiêu Mộ Nghĩa Sĩ', 'Mở rộng hàng ngũ, tăng số lượng và sức mạnh đội quân. (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_24', 'Đinh Liệt', 65, 8, 'ally', 'Khai quốc công thần', '? – 1471 | Làng Thủy Chú (Thanh Hóa) | Khai quốc công thần thọ nhất. Phụng sự 5 đời vua Lê. Cùng Nguyễn Xí lật đổ Lê Nghi Dân. Năm 1471 theo Lê Thánh Tông nam chinh Chiêm Thành bắt sống chúa Trà Toàn.', 'Cận Vệ Tiên Phong', 'Xung phong đi đầu bảo vệ chủ tướng, gây sát thương (104% Tấn công) lên hàng trước địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_25', 'Lê Khôi', 73, 8, 'ally', 'Tướng quân', '? – 1446 | Thôn Lam Sơn, cháu ruột Lê Lợi | Võ tướng tài đức, lập công lớn trận diệt viện binh Liễu Thăng. Trấn thủ Hóa Châu, Nghệ An thương dân. Năm 1446 tiên phong nam chinh Chiêm Thành, khải hoàn về bị bệnh mất, được dân lập đền thờ.', 'Kì Lân Hổ Vệ', 'phòng thủ (+15%) vững vàng như kỳ lân hổ vệ, bảo vệ toàn đội khỏi sát thương chí mạng. (Gây 146% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_26', 'Lê Thái Tông', 74, 8, 'ally', 'Hoàng đế', '1423 – 1442 | Thăng Long, con thứ của Lê Thái Tổ | Lên ngôi năm 11 tuổi, minh quân dẹp nạn quyền thần. Dẹp loạn biên ải, khôi phục khoa cử. Băng hà đột ngột tại Lệ Chi Viên năm 20 tuổi gây ra thảm án chấn động. Đặt nền tảng cho sự rực rỡ thời Hồng Đức.', 'Thịnh Trị Khai Khoa', 'Chấn hưng kỷ cương cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_27', 'Phạm Vấn', 77, 8, 'ally', 'Khai quốc công thần', 'Phạm Vấn (?-1436) là công thần khai quốc nhà Lê sơ quê ở Thọ Xuân, Thanh Hóa. Là người tham gia khởi nghĩa Lam Sơn từ buổi ban đầu, ông luôn kề vai sát cánh và hết sức giúp rập Bình Định Vương Lê Lợi vượt qua những thời kỳ gian khổ nhất.', 'Tận Trung Giúp Rập', 'Luôn kề vai sát cánh bên chủ tướng, gánh vác sát thương và tăng cường sinh lực cho toàn đội trong gian khó. (Gây 154% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_28', 'Đỗ Bí', 64, 8, 'ally', 'Tướng quân', '? – ? | Làng Nông Cống (Thanh Hóa) | Đại dũng tướng kiên cường của bộ binh Lam Sơn. Chỉ huy kỵ binh phục kích địa hình đồi núi Ninh Bình và Ba Vì. Lập công vây hãm thành Đông Quan cản viện binh giặc.', 'Chí Linh Tuyệt Lương', 'phòng thủ (+15%) kiên cường trong nghịch cảnh cho toàn đội (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_29', 'Lê Văn Linh', 63, 8, 'ally', 'Khai quốc công thần', '1377 – 1448 | Huyện Nông Cống (Thanh Hóa) | Khai quốc văn thần, phụ trách văn thư và lương thảo. Cố vấn cơ mật tối cao của Lê Lợi. Trụ cột mẫu mực xây dựng nền hành chính, luôn can ngăn hình phạt hà khắc, cổ vũ chính sách khoan dung.', 'Tam Triều Lão Thần', 'Kinh nghiệm phục vụ qua nhiều triều đại cho toàn đội (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_30', 'Vũ Như Tô', 48, 8, 'ally', 'Kiến trúc sư', '? – 1516 | Làng Hà Vỹ (Cẩm Giàng, Hải Dương) | Thiên tài kiến trúc bị bạo chúa Lê Tương Dực ép xây dựng đại điện Cửu Trùng Đài nguy nga khiến dân chúng lầm than. Trong binh biến 1516, công trình bị đốt rụi và ông bị đem chém đầu.', 'Cửu Trùng Đài', 'Xây dựng hệ thống công sự đồ sộ cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_31', 'Lê Tư Tề', 48, 8, 'ally', 'Hoàng tử', '? – 1438 | Lam Sơn (Thanh Hóa) | Con trưởng Lê Lợi, Quốc vương tạm trị nhiếp chính đầu triều Lê. Gương mặt bi tráng mắc bệnh điên loạn giết tỳ thiếp, bị truất ngôi phế làm thứ dân rồi chết thảm năm 1438.', 'Đại Cục Nhẫn Nhục', 'Chấp nhận hiểm nguy vì đại cục, thu hút hỏa lực của 1 mục tiêu địch về phía bản thân và nhận ít sát thương hơn khi sinh lực thấp. (Gây 96% sát thương Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h8_32', 'Nguyễn Thị Bành', 49, 8, 'ally', 'Nữ tướng giả trai', 'Thế kỷ XV | Miền đồi núi Thanh Hóa | Nữ kiệt nghĩa quân Lam Sơn, vợ danh tướng Nguyễn Chích. Cải trang giả trai lãnh đạo nữ binh may quân trang, tiếp tế lương thảo và tổ chức tình báo cứu nguy bộ chỉ huy qua nhiều vòng phong tỏa.', 'Giả Trai Xuất Trận', 'Cải trang xông pha trận mạc, gây sát thương (98% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),

  // ═══════════════════════════════════════ CHƯƠNG 9 ═══════════════════════════════════════
createHero2('h9_1','Nguyễn Bỉnh Khiêm',95,9,'ally','Trạng Trình','1491 – 1585 | Làng Trung Am (Vĩnh Bảo, Hải Phòng) | Trạng Trình, bậc đại hiền triết tiên tri số một lịch sử Việt Nam. Sáng tác Sấm Trạng Trình. "Quân sư vô hình" với ba lời sấm huyền diệu định hình thế chân vạc Mạc - Trịnh - Nguyễn, nhân cách đứng trên mọi phe phái.','Bạch Vân Cơ Mưu (Thi triển trận đồ sấm ký toàn sân, gây 150% sát thương phép toàn đội hình địch, đồng thời hóa giải mọi trạng thái bất lợi, tăng 15% Tốc độ và tạo Khiên ảo bằng 20% máu tối đa cho toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương toàn đội, Thanh tẩy hoàn toàn, Tăng tốc & Tạo khiên siêu lớn.)','','neutral'),
createHero2('h9_2','Mạc Đăng Dung',85,9,'ally','Hào kiệt','1483 – 1541 | Làng Cổ Trai (Kiến Thụy, Hải Phòng) | Mạc Thái Tổ, sức mạnh phi thường thủ khoa võ. Dẹp loạn cát cứ cuối thời Lê Sơ lập nên nhà Mạc. Năm 1540 tự trói mình chịu nhục nhượng bộ nhà Minh để cứu đất nước khỏi thảm họa chiến tranh tàn phá.','Bắc Triều Khai Cơ (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân nhận 20% Phòng thủ và tăng 10% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn, Tăng thủ & Tăng công toàn đội.)','','mac'),
createHero2('h9_3','Mạc Kính Điển',85,9,'ally','Hào kiệt','? – 1580 | Con thứ Mạc Thái Tông | Khiêm Vương, đại tướng quân rường cột giữ vững ngai vàng nhà Mạc hơn 30 năm trước sức ép của Trịnh Tùng. Liêm chính tận tụy, khi ông còn sống quân Nam triều không dám tiến ra Bắc.','Trấn Thủ Bắc Đồ (Gây 140% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời bản thân nhận 20% Phòng thủ và phản 15% sát thương trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng thủ & Phản sát thương.)','','mac'),
createHero2('h9_4','Nguyễn Kính',85,9,'ally','Hào kiệt','Thế kỷ XVI | Xã Đoài Sơn (Quốc Oai, Hà Nội) | Tây Quốc Công, mãnh tướng thân tín bảo vệ Mạc Đăng Dung thuở dẹp loạn. Dũng mãnh thiện chiến cầm búa lớn tung hoành trận tiền. Khai quốc công thần võ nghiệp số một lập ra nhà Mạc.','Dũng Tướng Bắc Triều (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Thuần sát thương đơn & Xuyên giáp mạnh.)','','mac'),
createHero2('h9_5','Mạc Đăng Doanh',75,9,'ally','Hào kiệt','? – 1540 | Cổ Trai (Hải Phòng), con trưởng Mạc Thái Tổ | Mạc Thái Tông, bậc minh quân tạo nên thời kỳ Đại Chính thái bình thịnh trị nhất của nhà Mạc. Chấn hưng khoa cử (mở khoa thi lấy đỗ Trạng Trình). Xã hội ổn định trộm cắp biến mất, đêm ngủ không đóng cửa.','Minh Trị Đăng Doanh (Gây 140% sát thương phép lên 3 tướng địch hàng trước, đồng thời tăng 12% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Tăng công toàn đội.)','','mac'),
createHero2('h9_6','Nguyễn Giản Thanh',75,9,'ally','Hào kiệt','1482 – ? | Làng Hương Mạc (Từ Sơn, Bắc Ninh) | Trạng Me, Trạng nguyên khoa Đoan Khánh (1508) thời Lê Uy Mục. Tác giả bài phú Nôm kiệt xuất "Kính tâm tảng phú". Làm Thượng thư Bộ Lễ phụ trách bang giao triều Mạc. Đại diện xuất chúng hiếu học Kinh Bắc.','Khôi Nguyên Trí Tuệ (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','mac'),
createHero2('h9_7','Nguyễn Quyện',75,9,'ally','Hào kiệt','1511 – 1593 | Làng Đoài Sơn (Hà Nội), con Nguyễn Kính | Thường Quốc Công, tổng chỉ huy quân đội triều Mạc. Kỳ tài cầm quân nhiều lần đe dọa trực tiếp bản doanh chúa Trịnh. Năm 1592 bị bắt nhưng giữ trọn khí tiết kiên quyết không hàng Nam triều.','Thủy Trận Mai Phục (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời làm giảm 10% Phòng thủ của mục tiêu trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Giảm thủ.)','','mac'),
createHero2('h9_8','Nguyễn Dữ',75,9,'ally','Hào kiệt','Thế kỷ XVI | Xã Đỗ Tùng (Gia Lộc, Hải Dương) | Học trò xuất sắc của Trạng Trình. Bất mãn thời thế nên từ quan về quê ở ẩn viết sách. Tác giả "Truyền kỳ mạn lục" - thiên cổ kỳ bút, đỉnh cao văn học truyền kỳ Việt Nam giàu tinh thần nhân đạo.','Truyền Kỳ Mạn Lục (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời giải 1 trạng thái bất lợi cho toàn đội).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Thanh tẩy diện rộng.)','','mac'),
createHero2('h9_9','Mạc Kính Cung',75,9,'ally','Hào kiệt','? – 1625 | Con trai Khiêm Vương Mạc Kính Điển | Tôn làm Mạc Cung Đế, đưa tàn quân rút lên vùng núi Cao Bằng cát cứ theo lời dặn của Trạng Trình. Duy trì độc lập chính quyền họ Mạc hơn 30 năm ở vùng biên ải phía Bắc.','Cao Bằng Trấn Thủ (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Phòng thủ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ bản thân.)','','mac'),
createHero2('h9_10','Mạc Phúc Hải',65,9,'ally','Hào kiệt','? – 1546 | Con trưởng Mạc Thái Tông | Mạc Hiến Tông, giữ vững kinh đô Thăng Long trước sức ép tái chiếm của Nam triều (Lê - Trịnh). Đẩy mạnh thương mại gốm sứ Chu Đậu vươn tầm quốc tế. Duy trì thế cân bằng Bắc - Nam.','Vực Sâu Giữ Nước (Gây 110% sát thương phép lên 1 hàng dọc, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ bản thân.)','','mac'),
createHero2('h9_11','Bùi Văn Khuê',65,9,'ally','Hào kiệt','? – 1600 | Vùng Gia Viễn (Ninh Bình) | Mỹ Quận Công, Đô đốc thủy quân. Năm 1592 vì phẫn uất vua Mạc hoang dâm định đoạt vợ mình nên đem quân về hàng Trịnh Tùng, mở toang phòng tuyến sông Nhị Hà giúp Nam triều giải phóng Thăng Long.','Biến Động Thời Cục (Gây 110% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời tăng 5% Né tránh trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn & Tăng né tránh.)','','mac'),
createHero2('h9_12','Trịnh Kiểm',85,9,'ally','Hào kiệt','1503 – 1570 | Làng Sóc Sơn (Vĩnh Lộc, Thanh Hóa) | Minh Khang Thái Vương, con rể Nguyễn Kim. Tiếp quản binh quyền Nam triều, xây dựng căn cứ Vạn Lại vững chắc. Đặt nền móng thể chế "Vua Lê - Chúa Trịnh" và quyền lực cai trị Đàng Ngoài.','Trịnh Chủ Uy Phong (Gây 140% sát thương vật lý lên 3 tướng địch hàng trước. Có 20% tỷ lệ làm giảm 15% Tấn công của địch trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Giảm công địch.)','','le_trinh'),
createHero2('h9_13','Trịnh Tùng',85,9,'ally','Hào kiệt','1550 – 1623 | Thanh Hóa, con thứ Trịnh Kiểm | Bình An Vương, kiến trúc sư trưởng thể chế Lưỡng đầu chế. Năm 1592 thần tốc đánh bại nhà Mạc giải phóng Thăng Long. Hỏi mưu Trạng Trình và làm theo "Giữ chùa thờ Phật thì ăn oản", tôn lập vua Lê.','Tổng Phản Công (Gây 140% sát thương phép lên 3 tướng địch hàng trước, đồng thời tăng 12% Tấn công và 10% Tốc độ toàn đội trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng công & Tăng tốc toàn đội.)','','le_trinh'),
createHero2('h9_14','Trịnh Cương',85,9,'ally','Hào kiệt','1686 – 1729 | Thăng Long, chắt nội Trịnh Căn | An Đô Vương, bậc chúa cải cách kinh tế - tài chính kiệt xuất. Xóa bỏ sưu thuế hà khắc, đem lại thái bình cực thịnh thế kỷ 18. Đòi lại thành công mỏ đồng Tụ Long từ tay nhà Thanh.','Trịnh Triều Cải Cách (Gây 140% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Tấn công và 10% Phòng thủ toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới, Tăng công & Tăng thủ toàn đội.)','','le_trinh'),
createHero2('h9_15','Nguyễn Kim',75,9,'ally','Hào kiệt','1468 – 1545 | Làng Gia Miêu (Hà Trung, Thanh Hóa) | Thái sư Tổng chỉ huy Nam triều, tôn lập Lê Trang Tông khởi đầu phong trào Lê Trung Hưng "Phù Lê diệt Mạc". Nguồn cội phát tích sinh ra hai thế lực chúa Trịnh và chúa Nguyễn. Bị hàng tướng đánh thuốc độc chết.','Phò Lê Hưng Quốc (Gây 145% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời tăng 15% Phòng thủ trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn & Tăng thủ bản thân.)','','le_trinh'),
createHero2('h9_16','Trịnh Tráng',75,9,'ally','Hào kiệt','1577 – 1657 | Thăng Long, con thứ Trịnh Tùng | Thanh Đô Vương, vị chúa phát động cuộc nội chiến Trịnh - Nguyễn phân tranh quy mô lớn. 4 lần thân chinh đánh phòng tuyến Lũy Thầy nhưng không vượt được sông Gianh. Dẹp tan tàn dư nhà Mạc ở Cao Bằng.','Bắc Trực Nam Chinh (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời giảm 10% Phòng thủ mục tiêu trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Giảm thủ mục tiêu.)','','le_trinh'),
createHero2('h9_17','Trịnh Doanh',75,9,'ally','Hào kiệt','1720 – 1767 | Thăng Long, con thứ Trịnh Cương | Minh Đô Vương, bậc kiêu hùng quân sự. Lên ngôi lúc khủng hoảng bùng nổ, thân chinh dẹp tan các cuộc khởi nghĩa nông dân cứu nguy ngai vàng. Khuyến nông chia ruộng, tái lập ổn định Đàng Ngoài.','Bình Định Nội Loạn (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ toàn đội.)','','le_trinh'),
createHero2('h9_18','Phùng Khắc Khoan',75,9,'ally','Hào kiệt','1528 – 1613 | Làng Phùng Xá (Thạch Thất, Hà Nội) | Trạng Bùng, học trò Trạng Trình. Chánh sứ sang nhà Minh ứng đối thi ca khiến phương Bắc chấn động kính phục. Đem giống ngô, hạt vừng và nghề dệt về truyền dạy dân xứ Đoài.','Ngoại Giao Sứ Trình (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời giải 1 trạng thái bất lợi cho toàn đội).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Thanh tẩy diện rộng.)','','le_trinh'),
createHero2('h9_19','Nguyễn Hữu Liêu',75,9,'ally','Hào kiệt','1532 – 1597 | Huyện Hoằng Hóa (Thanh Hóa) | Đại danh tướng tiên phong của Trịnh Tùng. Chỉ huy đạo thiết kỵ thần tốc vượt cầu Triều Đông đánh nát đại doanh Mạc Mậu Hợp năm 1592, lập công quyết định giải phóng Thăng Long.','Trịnh Triều Mãnh Tướng (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Thuần sát thương đơn & Xuyên giáp.)','','le_trinh'),
createHero2('h9_20','Vũ Văn Mật',75,9,'ally','Hào kiệt','Thế kỷ XVI | Gốc làng Ba Động (Gia Lộc, Hải Dương) | Chúa Bầu, thủ lĩnh cát cứ vùng non cao Tuyên Quang hiểm trở. Đồng minh của Nam triều, thường xuyên kìm hãm mặt Tây Bắc của nhà Mạc và giữ vững đường biên ải chống quân phương Bắc xâm lấn.','Trấn Ải Tây Bắc (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Phòng thủ bản thân và đồng minh cùng hàng trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ đồng minh.)','','le_trinh'),
createHero2('h9_21','Đặng Nguyên Cẩn',75,9,'ally','Hào kiệt','Thế kỷ XVII – XVIII | Làng Lương Xá (Chương Mỹ, Hà Nội) | Trọng thần xuất thân từ thế gia võ tướng họ Đặng. Quản lý kho tàng, kiểm tra hộ tịch và bảo vệ cung phủ. Đại diện cho nền tảng quan trường thế gia bền vững phò tá chúa Trịnh.','Thanh Liêm Sĩ Phong (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ toàn đội.)','','le_trinh'),
createHero2('h9_22','Lê Thế Tông',65,9,'ally','Hào kiệt','1567 – 1599 | Thanh Hóa | Được Trịnh Tùng đưa lên ngôi năm 6 tuổi. Vị hoàng đế phục hưng kinh đô, rước ngự giá từ Thanh Hóa về Thăng Long năm 1593 sau đại thắng chống Mạc. Đánh dấu cột mốc kết thúc thời Nam - Bắc Triều.','Lê Triều Khôi Phục (Gây 110% sát thương phép lên 1 hàng dọc, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ bản thân.)','','le_trinh'),
createHero2('h9_23','Lê Dụ Tông',65,9,'ally','Hào kiệt','1679 – 1731 | Thăng Long | Trị vì 24 năm thời thái bình cực thịnh của Đàng Ngoài. Khuyến nông, đúc tiền Cảnh Hưng, biên giới giữ vững. Thi hài được ướp nguyên vẹn trong quan tài hợp chất độc đáo được khai quật năm 1958.','Trung Hưng Suy Bi (Gây 95% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 8% Né tránh bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng né tránh.)','','le_trinh'),
createHero2('h9_24','Đặng Chi',65,9,'ally','Hào kiệt','Thế kỷ XVII – XVIII | Dòng họ Đặng danh tướng Lương Xá | Võ tướng cấm binh chỉ huy huấn luyện quân thị vệ và đội kỵ binh tinh nhuệ túc trực bảo vệ Phủ Chúa. Tấm khiên thép dẹp yên bạo loạn cung cấm và giữ gìn an ninh kinh kỳ.','Trung Nghĩa Song Toàn (Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ bản thân.)','','le_trinh'),
createHero2('h9_25','Ngô Trí Hòa',55,9,'ally','Hào kiệt','1564 – 1626 | Làng Lý Trai (Diễn Châu, Nghệ An) | Cùng cha thi đỗ đại khoa (Phụ tử đồng khoa). Bậc danh thần liêm trực cương thẳng, dũng cảm can ngăn Trịnh Tùng chuyên quyền ép vua Lê. Nhiều lần dâng sớ xin bãi binh giảm thuế cứu dân nghèo.','Sứ Thần Bình Định (Gây 80% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời làm giảm 5% Tốc độ địch trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Giảm tốc độ địch.)','','le_trinh'),
createHero2('h9_26','Nguyễn Hoàng',85,9,'ally','Hào kiệt','1525 – 1613 | Làng Gia Miêu (Thanh Hóa) | Chúa Tiên, vị chúa lập quốc mở cõi Đàng Trong vĩ đại. Năm 1558 theo lời sấm Trạng Trình xin vào trấn thủ Thuận Hóa hiểm nghèo. Thu phục lòng dân, khuyến khích di dân lập ấp, khởi dựng chùa Thiên Mụ.','Khai Hoang Nam Quốc (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân nhận 20% Phòng thủ và tự hồi 10% máu tối đa trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn, Tăng thủ & Tự hồi máu.)','','nguyen'),
createHero2('h9_27','Nguyễn Phúc Nguyên',85,9,'ally','Hào kiệt','1563 – 1635 | Con trai thứ sáu của Chúa Tiên Nguyễn Hoàng | Chúa Sãi, đổi sang họ Nguyễn Phúc, cự tuyệt nộp thuế cho Đàng Ngoài xác lập độc lập Đàng Trong. Trọng dụng Đào Duy Từ xây Lũy Thầy, đánh bại hai đợt tấn công lớn của chúa Trịnh Tráng.','Xây Lũy Lập Quốc (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tạo lớp Khiên ảo bằng 20% máu tối đa cho bản thân và đồng minh thấp máu nhất).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tạo khiên kép.)','','nguyen'),
createHero2('h9_28','Nguyễn Phúc Tần',85,9,'ally','Hào kiệt','1620 – 1687 | Con thứ hai của chúa Nguyễn Phúc Lan | Chúa Hiền, võ công hiển hách bậc nhất. Phản công vượt sông Gianh chiếm 7 huyện Nghệ An, buộc quân Trịnh ký hòa ước lấy sông Gianh làm ranh giới đình chiến. Mở rộng bờ cõi lập Diên Khánh, Thái Khang.','Sông Gianh Trấn Thủ (Gây 140% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời tăng 12% Phòng thủ và phản 15% sát thương trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng thủ & Phản sát thương.)','','nguyen'),
createHero2('h9_29','Đào Duy Từ',85,9,'ally','Hào kiệt','1572 – 1634 | Làng Hoa Trai (Tĩnh Gia, Thanh Hóa) | Khổng Minh xứ Đàng Trong, quân sư tối cao của Chúa Sãi. Kiến trúc sư xây dựng Lũy Thầy vững như bàn thạch cản bước quân Trịnh. Tác giả binh thư Hổ trướng khu cơ và ông tổ nghề tuồng Đàng Trong.','Lũy Thầy Bất Khả (Gây 140% sát thương phép lên 3 tướng địch hàng trước, đồng thời tăng 12% Phòng thủ và 10% Công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng thủ & Tăng công toàn đội.)','','nguyen'),
createHero2('h9_30','Nguyễn Phúc Chu',75,9,'ally','Hào kiệt','1675 – 1725 | Phú Xuân, con trưởng chúa Nguyễn Phúc Thái | Chúa Minh, bậc đại quân vương hoàn thiện bản đồ Nam Bộ. Cử Nguyễn Hữu Cảnh vào thành lập phủ Gia Định năm 1698. Sáp nhập Bình Thuận, tiếp nhận Hà Tiên từ Mạc Cửu. Đúc đại hồng chung chùa Thiên Mụ.','Minh Chủ Mở Cõi (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 12% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng công toàn đội.)','','nguyen'),
createHero2('h9_31','Nguyễn Hữu Cảnh',75,9,'ally','Hào kiệt','1650 – 1700 | Xã Vạn Xuân (Quảng Ninh, Quảng Bình) | Lễ Thành Hầu, thống suất kinh lược lập ra phủ Gia Định năm 1698. Đặt nền móng hành chính, chiêu mộ dân khai hoang lập ấp toàn cõi Nam Bộ. Bậc phúc thần bảo hộ được nhân dân tôn kính lập đền thờ.','Kinh Lược Gia Định (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','nguyen'),
createHero2('h9_32','Mạc Cửu',75,9,'ally','Hào kiệt','1655 – 1735 | Bán đảo Lôi Châu (Trung Quốc), di dân phương Nam | Tổng Binh Hà Tiên, khai phá thương cảng sầm uất ven biển Tây. Năm 1708 dâng nộp toàn bộ đất đai quy phục chúa Nguyễn. Có công mở rộng lãnh thổ đưa vịnh Thái Lan vào chủ quyền Việt Nam.','Khai Trấn Hà Tiên (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','nguyen'),
createHero2('h9_33','Nguyễn Hữu Dật',75,9,'ally','Hào kiệt','1603 – 1681 | Làng Gia Miêu (Thanh Hóa) | Tham mưu tối cao, cây đại thụ quân sự triều chúa Nguyễn. Chỉ huy 7 lần giao tranh Trịnh - Nguyễn. Dùng ly gián khiến tướng Trịnh Toàn bị bắt. Nhân đức phát gạo cứu đói không phân biệt Nam Bắc.','Gianh Tuyến Thiết Giáp (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Thuần sát thương đơn & Xuyên giáp.)','','nguyen'),
createHero2('h9_34','Nguyễn Hữu Tiến',75,9,'ally','Hào kiệt','1602 – 1666 | Làng Phúc Quy (Thạch Hà, Hà Tĩnh) | Tiết chế quân sự Đàng Trong, cùng Nguyễn Hữu Dật tạo cặp danh tướng Hổ - Phượng. Tổng chỉ huy chiến dịch chiếm 7 huyện Nghệ An. Kỷ luật nghiêm minh, thương binh như con khiến quân Trịnh khiếp sợ.','Nam Hà Trấn Thủ (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và 10% Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','nguyen'),
createHero2('h9_35','Nguyễn Phúc Thái',75,9,'ally','Hào kiệt','1650 – 1691 | Con thứ hai của Chúa Hiền Nguyễn Phúc Tần | Chúa Nghĩa, dời phủ chúa về Phú Xuân định đô lâu dài. Thực thi chính sách khoan dung nhân từ, giảm thuế khóa, mở kho lương cứu đói. Dẹp yên sự quấy nhiễu biên viễn, giữ bình yên Đàng Trong.','Hội An Phồn Thịnh (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời giải 1 trạng thái bất lợi cho toàn đội).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Thanh tẩy diện rộng.)','','nguyen'),
createHero2('h9_36','Tống Phước Trị',65,9,'ally','Hào kiệt','Thế kỷ XVI – XVII | Huyện Tống Sơn (Thanh Hóa) | Khai quốc nguyên lão, theo chân Chúa Tiên vào đất Ái Tử mở cõi năm 1558. Trấn thủ Thuận Hóa, xây dựng căn cứ tiền tiêu bảo vệ phủ chúa. Dòng họ Tống Phước kết thân cung cấp nhiều tướng tài ba.','An Biên Dũng Tướng (Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ bản thân.)','','nguyen'),
createHero2('h9_37','Nguyễn Cửu Vân',65,9,'ally','Hào kiệt','Thế kỷ 18 | Dòng họ Nguyễn Cửu danh gia vọng tộc | Đánh bại liên quân phản loạn ở Chân Lạp (năm 1705), ổn định vững chắc biên giới Tây Nam. Tổ chức đào kênh Vũng Gù nối liền sông Vàm Cỏ Tây và sông Tiền. Tướng tài kiệt xuất kiêm nhà doanh điền xuất sắc.','Mở Cõi Phương Nam (Gây 110% sát thương vật lý lên 1 hàng dọc, đồng thời tăng 8% Tấn công bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng công bản thân.)','','nguyen'),
createHero2('h9_38','Nguyễn Phúc Lan',75,9,'ally','Hào kiệt','1601 – 1648 | Con thứ hai của Chúa Sãi Nguyễn Phúc Nguyên | Chúa Thượng, đánh bại cuộc tấn công lần thứ tư và năm của quân Trịnh. Dời phủ chúa về Kim Long, xây dựng cảnh quan ven sông Hương. Đánh tan hạm đội tàu chiến Hà Lan tại cửa biển Tam Tòa năm 1644.','Thuận Hóa Trấn Định (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Phòng thủ và 10% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng thủ toàn đội.)','','nguyen'),
createHero2('h9_39','Dương Văn An',55,9,'ally','Hào kiệt','1514 – ? | Làng Tuy Lộc, châu Lệ Thủy, Quảng Bình | Đỗ Tiến sĩ năm 1547, làm quan đến hàm Thượng thư. Tác giả bộ sách "Ô châu cận lục", ghi chép chi tiết về núi sông, phong tục, nhân vật vùng đất Thuận Hóa thời kỳ đầu mở cõi, cung cấp nguồn sử liệu vô giá.','Ô Châu Biên Khảo (Gây 80% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời tăng 5% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Tăng thủ bản thân.)','','nguyen'),

  // ═══════════════════════════════════════ CHƯƠNG 10 ═══════════════════════════════════════
createHero2('h10_1', 'Nguyễn Huệ', 92, 10, 'ally', 'Quang Trung Hoàng Đế', '1753 – 1792 | Ấp Tây Sơn (Tây Sơn, Bình Định) | Quang Trung Hoàng Đế, thiên tài quân sự kiệt xuất nhất lịch sử, bách chiến bách thắng. Lập kỳ tích đánh tan 5 vạn quân Xiêm La và 29 vạn quân Mãn Thanh thần tốc. Xóa bỏ phân tranh Trịnh - Nguyễn gần 200 năm, ban Chiếu khuyến nông, chữ Nôm.', 'Đống Đa Đại Phá', 'Xuất kỳ bất ý tấn công toàn lực, gây sát thương (184% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_2', 'Nguyễn Nhạc', 75, 10, 'ally', 'Tây Sơn Vương', '? – 1793 | Ấp Tây Sơn (Bình Định) | Thái Đức Hoàng Đế, anh cả Tây Sơn Tam Kiệt, sáng lập phong trào khởi nghĩa Tây Sơn. Xóa bỏ ách thống trị chúa Nguyễn, xưng Hoàng đế năm 1778 tại thành Đồ Bàn. Thi hành chiến lược ngoại giao sắc sảo, lui về trấn thủ Quy Nhơn.', 'Tây Sơn Khởi Nghĩa', 'Khởi đầu cuộc nổi dậy vĩ đại cho toàn đội (+20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_3', 'Nguyễn Lữ', 73, 10, 'ally', 'Đông Định Vương', '? – 1787 | Ấp Tây Sơn (Bình Định) | Đông Định Vương, em út Tây Sơn Tam Kiệt, phụ trách hậu cần và tôn giáo. Đánh chiếm Gia Định năm 1776, trấn thủ Gia Định 1786. Sáng tạo bài Hùng kê quyền trứ danh. Mộ đạo hiền hòa, yếu nhân sáng lập võ thuật cổ truyền Bình Định.', 'Tây Sơn Ngũ Phụng', 'Chiến đấu trong hàng ngũ gia đình cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_4', 'Ngô Thì Nhậm', 78, 10, 'ally', 'Quân sư', '1746 – 1803 | Làng Tả Thanh Oai (Thanh Trì, Hà Nội) | Binh bộ Thượng thư, kiến trúc sư trưởng ngoại giao thời Quang Trung. Đưa ra kế "rút lui bảo toàn lực lượng" về Tam Điệp - Biện Sơn chờ viện binh. Soạn thảo chiếu chỉ bang giao nhà Thanh. Bậc đại trí thức hàng đầu Bắc Hà.', 'Vừa Đánh Vừa Đàm', 'Kết hợp sức mạnh và ngoại giao, kiểm soát cục diện toàn trận. (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_5', 'Trần Quang Diệu', 80, 10, 'ally', 'Đại tướng', '1760 – 1802 | Làng Ân Tín (Hoài Nhơn, Bình Định) | Thái phó, tổng chỉ huy quân sự tối cao thời hậu kỳ Tây Sơn, phu nhân là Bùi Thị Xuân. Công phá quân Thanh 1789, hạ thành Quy Nhơn 1801. Cảm kích Võ Tánh nên mai táng tử tế và tha hàng binh. Khẳng khái từ chối chiêu hàng, giữ trọn lòng trung.', 'Tam Niên Bao Vây', 'Kiên nhẫn vây hãm địch, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_6', 'Bùi Thị Xuân', 80, 10, 'ally', 'Nữ đại tướng', '? – 1802 | Làng Xuân Hòa (Tây Sơn, Bình Định) | Đệ nhất danh tướng kiệt xuất trong Tây Sơn ngũ phụng thư. Huấn luyện đội tượng binh bách chiến bách thắng. Chỉ huy đánh tan Khương Thượng - Đống Đa. Khí phách hiên ngang, chịu án voi giày không biến sắc, tượng đài bất tử của phụ nữ Việt Nam.', 'Tượng Binh Nữ Tướng', 'Cưỡi voi xung phong dẫn đầu, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_7', 'Vũ Văn Dũng', 68, 10, 'ally', 'Thủy tướng', '1750 – 1802 | Thôn Phú Mỹ (Tuy Viễn, Bình Định) | Đại tư đồ, đô đốc thủy quân tối cao. Đánh tan hải quân chúa Nguyễn, Xiêm La và Thanh. Thủy chiến xuất quỷ nhập thần, từng làm Chánh sứ đi Thanh. Trụ cột quân sự bảo vệ vương triều suốt hơn hai thập kỷ.', 'Rạch Gầm Hỏa Công', 'Hỏa công trên sông, gây sát thương (136% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_8', 'Phan Văn Lân', 68, 10, 'ally', 'Đại tướng', '? – ? | Vùng đất võ Bình Định | Đại đô đốc tiên phong, cánh tay phải của Ngô Văn Sở. Dũng cảm đem quân chặn đánh mũi tiến công của Tôn Sĩ Nghị bên sông Nguyệt Đức. Cùng Ngô Văn Sở chỉ huy trung quân phá vỡ Ngọc Hồi sáng mùng 5 Tết 1789.', 'Thần Tốc Tiến Quân', 'Tiến quân thần tốc không kịp phòng bị, gây sát thương (136% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_9', 'Ngô Văn Sở', 69, 10, 'ally', 'Đại tướng', '? – 1795 | Huyện Tuy Viễn (Bình Định) | Đại tư mã, Tiết chế quân sự quản lý Bắc Hà. Lập phòng tuyến Tam Điệp - Biện Sơn bảo toàn lực lượng đón vua Quang Trung. Cùng Phan Văn Lân làm tiên phong đập tan đồn Ngọc Hồi. Bị Bùi Đắc Tuyên hãm hại dìm chết oan dưới sông Hương.', 'Chiến Lược Lui Quân', 'Lui quân có chiến lược, gây sát thương (138% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_10', 'Nguyễn Thiếp', 81, 10, 'ally', 'La Sơn Phu Tử', '1723 – 1804 | Làng Nguyệt Ao (Can Lộc, Hà Tĩnh) | La Sơn Phu Tử, bậc đại hiền triết được vua Quang Trung ba lần kính cẩn mời ra giúp nước. Viện trưởng Sùng Chính thư viện phụ trách dịch kinh sách sang chữ Nôm. Đặt nền móng chấn hưng giáo dục và quốc ngữ của triều Tây Sơn.', 'Thiên Cơ Đoán Định', 'Phân tích thiên cơ chính xác, gây sát thương (162% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_11', 'Lê Văn Hưng', 55, 10, 'ally', 'Tướng quân', '? – 1795 | Đất võ Bình Định | Thái úy, đại đô đốc kỵ binh và tượng binh. Dũng mãnh phá tan các đồn lũy tiền tiêu quân Thanh 1789. Dũng khí như cọp gầm. Bị Bùi Đắc Tuyên hãm hại xử tử oan năm 1795, mở đầu cho bi kịch suy tàn nội bộ Tây Sơn.', 'Nam Thổ Bảo Vệ', 'Bảo vệ vùng đất phía nam cho toàn đội (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_12', 'Lê Văn Bưu', 65, 10, 'ally', 'Danh tướng', 'Thế kỷ XVIII | Vùng duyên hải miền Trung | Đô đốc chỉ huy hạm đội chiến thuyền Tây Sơn. Huấn luyện hải đoàn "Định Quốc" trang bị đại pháo hạng nặng. Chặn đánh nhiều đợt đổ bộ của hải quân chúa Nguyễn. Đảm trách vận tải lương thảo đường biển an toàn.', 'Dũng Mãnh', 'Gây 100% sát thương lên 1 mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_13', 'Nguyễn Văn Tuyết', 53, 10, 'ally', 'Tướng quân', '? – 1802 | Huyện Tuy Viễn (Bình Định) | Đại đô đốc, chồng nữ tướng Trần Thị Lan. Phi ngựa ngày đêm báo tin quân Thanh xâm lược cho Nguyễn Huệ. Chỉ huy đạo quân vượt biển đánh Hải Dương 1789. Trấn thủ cửa biển miền Trung, chiến đấu anh dũng tử trận trên chiến thuyền.', 'Thần Tốc Hành Quân', 'Hành quân cực nhanh, gây sát thương (106% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_14', 'Nguyễn Văn Lộc', 52, 10, 'ally', 'Tướng quân', '? – 1802 | Huyện Phù Cát (Bình Định) | Đại đô đốc tiên phong, Tây Sơn thất hổ tướng. Chỉ huy đạo quân thứ ba Kỷ Dậu 1789, thần tốc đánh úp đồn lũy quân Thanh tả ngạn sông Nhị Hà. Dũng tướng chuyên đánh úp ban đêm, ra đòn sấm sét phá vỡ thế trận địch.', 'Xáp Lá Cà', 'Chiến đấu cận chiến dữ dội, gây sát thương (104% Tấn công) cao nhưng nhận sát thương tăng. (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_15', 'Hồ Văn Huệ', 54, 10, 'ally', 'Tướng quân', 'Thế kỷ XVIII | Huyện Tây Sơn (Bình Định) | Đại đô đốc kỵ binh và tượng binh, dòng dõi họ Hồ Tây Sơn. Lập công lớn trận Rạch Gầm - Xoài Mút 1785. Chỉ huy các mũi đột kích thần tốc phá tan đồn lũy quân Thanh Kỷ Dậu 1789. Tướng lĩnh tin cẩn của hoàng tộc.', 'Tây Sơn Hổ Tướng', 'Sức mạnh và tinh thần của hổ Tây Sơn cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_16', 'Phan Huy Ích', 70, 10, 'ally', 'Văn thần', '1751 – 1822 | Làng Thu Hoạch (Thạch Hà, Hà Tĩnh) | Thượng thư Bộ Lễ, đại Nho thần. Chánh sứ ngoại giao sang Mãn Thanh năm 1790 mừng thọ vua Càn Long, nâng cao vị thế Đại Việt. Biên soạn pháp luật điển lễ và để lại nhiều trước tác lớn. Trụ cột ngoại giao văn hóa.', 'Ngoại Giao Hòa Bình', 'Đàm phán sau chiến thắng, gây sát thương (140% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_17', 'Bùi Dương Lịch', 52, 10, 'ally', 'Văn thần', '1757 – 1828 | Làng Yên Đồng (Đức Thọ, Hà Tĩnh) | Đốc học Nghệ An thời Tây Sơn, Hiệu phó Sùng Chính viện. Biên dịch sách Nôm. Tác giả Nghệ An ký, Lê quý dật sử. Đào tạo nhiều học trò đỗ đạt, lưu giữ di sản văn hiến sâu sắc thời kỳ giao thời.', 'Văn Hóa Khai Sáng', 'Nâng cao trí tuệ toàn đội cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_18', 'Lê Duy Kỳ', 53, 10, 'ally', 'Hoàng đế Lê triều', '1765 – 1793 | Thăng Long, cháu đích tôn vua Lê Hiển Tông | Vua Lê Chiêu Thống, vị vua cuối cùng nhà Hậu Lê. Năng lực yếu kém, bất lực trước phe phái. Cõng 29 vạn quân Mãn Thanh sang xâm lược. Sau thảm bại Đống Đa, tháo chạy sang Bắc Kinh sống lưu vong và chết tủi nhục.', 'Sự Tuyệt Vọng', 'Chiến đấu trong tuyệt vọng cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_19', 'Trương Văn Đa', 51, 10, 'ally', 'Tướng quân', 'Thế kỷ XVIII | Huyện Tuy Viễn (Bình Định) | Đại tư đồ, Phụ chính quân vụ Gia Định, con rể vua Nguyễn Nhạc. Trấn thủ Gia Định, nhiều lần đánh bại Nguyễn Ánh. Nhân tố hòa giải kiệt xuất trong hoàng gia, khuyên can giữ hòa khí anh em tránh cốt nhục tương tàn.', 'Đống Đa Chi Chiến', 'Tinh thần chiến đấu từ chiến thắng Đống Đa cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_20', 'Ngô Thì Chí', 54, 10, 'ally', 'Văn thần', '1753 – 1788 | Làng Tả Thanh Oai (Thanh Trì, Hà Nội) | Đại thần trung kiên nhà Lê, em ruột Ngô Thì Nhậm. Khác anh trai, ông giữ trọn đạo trung với Lê Chiêu Thống. Khởi thảo 7 hồi đầu bộ tiểu thuyết lịch sử bất hủ Hoàng Lê nhất thống chí khắc họa chân thực thời đại.', 'Huynh Đệ Văn Tài', 'Cùng huynh đệ tài năng chiến đấu cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_21', 'Huỳnh Thị Cúc', 48, 10, 'ally', 'Nữ tướng', '? – 1802 | Bình Định, dòng dõi nghĩa binh sơn cước | Đô đốc nữ tướng Tây Sơn ngũ phụng thư. Giỏi thiết côn và kiếm thuật, chỉ huy kỵ binh bảo vệ tuyến vận tải quân nhu. Chiến đấu đến giọt máu cuối cùng bảo vệ kinh đô Phú Xuân năm 1801. Ngọn roi sắt tung hoành trận tiền khiến giặc bạt vía.', 'Nhu Cốt Kiếm Thuật', 'Kiếm thuật sắc bén, gây sát thương (96% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_22', 'Bùi Thị Nhạn', 62, 10, 'ally', 'Hoàng hậu / Nữ tướng', '? – 1802 | Làng Xuân Hòa (Bình Định), cô nữ tướng Bùi Thị Xuân | Hoàng hậu vua Quang Thái, nữ tướng Tây Sơn ngũ phụng thư. Huấn luyện đội nữ binh hộ vệ, dẹp yên tập kích đường biển. Nữ kiệt giỏi đao pháp bảo vệ đoàn hoàng gia chạy ra Bắc năm 1802 và tuẫn tiết oanh liệt không hàng giặc.', 'Hậu Phương Vững Chắc', 'Chăm lo hậu phương cho toàn đội (Hồi 12% Máu tối đa). Đồng thời: +20 Nhuệ khí.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_23', 'Nguyễn Thị Dung', 47, 10, 'ally', 'Nữ tướng', '? – 1802 | Đất võ Bình Định | Nữ tướng Tây Sơn ngũ phụng thư, giỏi thủy chiến. Thống lĩnh hạm đội thuyền chiến Tây Sơn đánh úp Gia Định, bẻ gãy tuyến vận tải quân Nguyễn. Sau khi vương triều sụp đổ đã giữ trọn khí tiết kẻ sĩ, tự vẫn bảo toàn danh tiết.', 'Song Kiếm Phụng Thư', 'Phối hợp tác chiến tuyệt hảo, gia tăng sát thương và sự dẻo dai khi chiến đấu cùng các nữ tướng Tây Sơn khác. (Gây 94% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_24', 'Trần Thị Lan', 49, 10, 'ally', 'Nữ tướng', '? – 1802 | Vùng Tây Sơn (Bình Định) | Đô đốc Tiêu Tượng Nữ Kiệt, Tây Sơn ngũ phụng thư. Tài bắn cung bách phát bách trúng, huấn luyện nữ binh xạ thủ tinh nhuệ. Cùng chồng Nguyễn Văn Tuyết đánh chiếm Hải Dương 1789. Kiên cường chặn hậu tàn quân và tuẫn tiết oanh liệt.', 'Phụng Thư Hậu Thuẫn', 'Cung cấp tài lực và yểm trợ chiến thuật cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_25', 'Lê Ngọc Hân', 49, 10, 'ally', 'Bắc cung Hoàng hậu', '1770 – 1799 | Thăng Long, con gái vua Lê Hiển Tông | Công Chúa Ngọc Hân, Bắc Cung Hoàng Hậu triều Tây Sơn. Nữ thi sĩ kiệt xuất, khuyên can Quang Trung trọng dụng danh nho Bắc Hà. Sáng tác khúc ngâm trác tuyệt "Ai tư vãn" khóc chồng. Biểu tượng lương duyên hòa hợp Nam - Bắc lịch sử.', 'Ai Tư Vãn', 'Lời thơ bi ai nhưng khơi dậy tinh thần chiến đấu mãnh liệt cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_26', 'Phạm Thị Liên', 49, 10, 'ally', 'Chính cung Hoàng hậu', '1758 – 1791 | Phủ Quy Nhơn (Bình Định) | Chánh Cung Hoàng Hậu đầu tiên của vua Quang Trung, thân mẫu vua Cảnh Thịnh. Quản lý tài chính, chăm lo quân lương hậu phương. Đồng cam cộng khổ từ thuở gian khó khởi nghĩa, để lại nỗi tiếc thương vô hạn khi mất sớm.', 'Tào Khang Trọng Tình', 'Tình phu thê sâu nặng cho toàn đội (Hồi 10% Máu tối đa). Đồng thời: +20 Nhuệ khí.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_27', 'Nguyễn Quang Toản', 49, 10, 'ally', 'Hoàng đế Cảnh Thịnh', '1783 – 1802 | Phú Xuân (Huế), con trưởng vua Quang Trung | Cảnh Thịnh Hoàng Đế, vị vua cuối cùng triều Tây Sơn. Lên ngôi năm 10 tuổi, để cậu là Bùi Đắc Tuyên lộng quyền gây chia rẽ nội bộ đẫm máu. Vị ấu chúa bất hạnh chứng kiến sự sụp đổ bi tráng của vương triều Tây Sơn hào hùng.', 'Cảnh Thịnh Suy Vong', 'Triều chính rối loạn làm giảm sức tấn công, nhưng nhận được lớp khiên bảo vệ kiên cố khi sinh lực xuống thấp nhất. (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_28', 'Nguyễn Hữu Chỉnh', 65, 10, 'ally', 'Đại tư đồ', '1741 – 1787 | Làng Hoa Đường (Mỹ Hào, Hưng Yên) | Hàng tướng chúa Trịnh theo Tây Sơn. Hiến kế "phù Lê diệt Trịnh" giúp Nguyễn Huệ giải phóng Thăng Long 1786. Sau nắm quyền lấn át vua Lê, mưu đồ cát cứ riêng, bị Vũ Văn Nhậm đem quân đánh bại và xử tử.', 'Bắc Hà Quyền Lực', 'Kiến tạo mưu lược, tăng mạnh sát thương chiến thuật nhưng có nguy cơ làm giảm sút sĩ khí của quân ta. (Gây 130% sát thương Tấn công). (+20 Nhuệ khí). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_29', 'Trần Văn Kỷ', 80, 10, 'ally', 'Trung Thư Lệnh', '? – 1801 | Làng Vân Trình (Thừa Thiên Huế) | Trung thư lệnh (tương đương Tể tướng), Quân sư tâm phúc số một của vua Quang Trung. Phát hiện, tiến cử hàng loạt hiền tài Bắc Hà như Ngô Thì Nhậm, Phan Huy Ích, Nguyễn Thiếp. Tuẫn tiết trên sông Hương năm 1801.', 'Kỷ Xuyên Hầu', 'Gây sát thương (160% Tấn công) lên 1 mục tiêu địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_30', 'Vũ Văn Nhậm', 75, 10, 'ally', 'Đại Tư Mã', '? – 1788 | Bình Định, con rể vua Thái Đức | Tả Quân Đô Đốc, Đại tư mã. Tổng chỉ huy cánh quân Tây Sơn bình định Bắc Hà. Đánh tan thế lực Nguyễn Hữu Chỉnh, tái chiếm Thăng Long 1787. Bị Nguyễn Huệ xử tử vì tội kiêu ngạo mưu phản.', 'Tả Quân Đô Đốc', 'Gây sát thương (150% Tấn công) lên 1 mục tiêu địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
createHero2('h10_31', 'Đặng Tiến Đông', 65, 10, 'ally', 'Đại Đô Đốc', '1738 – ? | Làng Lương Xá (Chương Mỹ, Hà Nội) | Đại đô đốc tổng chỉ huy trận tập kích chấn động gò Đống Đa. Bỏ hàng ngũ Lê - Trịnh theo Quang Trung. Rạng sáng mùng 5 Tết Kỷ Dậu chỉ huy tập kích Khương Thượng, bức tướng Sầm Nghi Đống thắt cổ tự vẫn.', 'Đông Lĩnh Hầu', 'Gây sát thương (120% Tấn công) lên 1 mục tiêu địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),

];

const ENEMY_HEROES_LIST: Hero[] = [
  // ═══════════════════════════════════════ CHƯƠNG 1 (địch) ═══════════════════════════════════════
  createHero2('e1_1','Ân Vương',90,1,'enemy','Thiên tử',
    'Ân Vương là vua của nhà Ân (Thương) ở Trung Hoa, người sai sứ sang xâm lấn nước Văn Lang thời Hùng Vương. Cuộc xâm lược của ông đã thúc đẩy sự ra đời của truyền thuyết Thánh Gióng.',
    'Thiên Tử Uy Quyền','Uy quyền của thiên tử, gây sát thương (180% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e1_2','Triệu Đà',92,1,'enemy','Nam Việt Vương',
    'Triệu Đà là tướng nhà Tần, sau lập nước Nam Việt độc lập. Ông dùng kế sách cho con trai Trọng Thủy lấy Mị Châu, đánh lừa lấy bí mật nỏ thần và chiếm nước Âu Lạc năm 179 TCN.',
    'Gián Điệp Chiến','Cài gián điệp vào toàn bộ địch, gây sát thương (120% Tấn công) lên toàn bộ địch..'),
  createHero2('e1_3','Trọng Thủy',81,1,'enemy','Gián điệp',
    'Trọng Thủy là con trai Triệu Đà, được cử sang làm rể An Dương Vương để tình báo. Ông đánh cắp nỏ thần và tiết lộ bí mật, trực tiếp gây ra sự sụp đổ của nước Âu Lạc.',
    'Phản Gián','Lợi dụng lòng tin, gây sát thương (105% Tấn công) lên toàn bộ địch..'),
  createHero2('e1_4','Thủy Tinh',76,1,'enemy','Thủy thần',
    'Thủy Tinh là thủy thần hung ác trong truyền thuyết Việt Nam, thua cuộc tranh giành Mị Nương với Sơn Tinh. Hàng năm ông dâng nước lũ tấn công Sơn Tinh để trả thù — giải thích hiện tượng lũ lụt.',
    'Lũ Lụt','Dâng nước ngập chiến trường, gây sát thương (99% Tấn công) lên toàn bộ địch..'),
  createHero2('e1_5','Ngư Tinh',75,1,'enemy','Yêu tinh biển',
    'Ngư Tinh là con cá tinh hàng nghìn năm tuổi, tác oai tác quái ở vùng biển Đông, nuốt người và thuyền. Lạc Long Quân đã diệt trừ Ngư Tinh, giải phóng dân lành.',
    'Vực Sâu Nuốt Chửng','Nuốt chửng 1 mục tiêu địch, gây sát thương (150% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e1_6','Hồ Tinh',80,1,'enemy','Yêu tinh núi',
    'Hồ Tinh là con cáo trắng chín đuôi tu luyện nghìn năm, biến thành người gây hại. Lạc Long Quân đã giết Hồ Tinh, chỗ hang của nó sau trở thành Hồ Tây (Hà Nội).',
    'Cửu Vĩ Mê Hoặc','Sử dụng phép mê hoặc (tỷ lệ 50%), gây sát thương (160% Tấn công) và khống chế (tỷ lệ 50%) lên 1 mục tiêu địch.'),
  createHero2('e1_7','Mộc Tinh',71,1,'enemy','Yêu tinh rừng',
    'Mộc Tinh là con cây chiên đàn nghìn năm thành tinh, ở vùng rừng núi gây tai họa cho dân lành. Lạc Long Quân diệt Mộc Tinh, giải phóng vùng đất.',
    'Rừng Xanh Bẫy Độc','Đặt bẫy trong rừng, gây độc và sát thương theo thời gian. (Gây 142% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).'),

  // ═══════════════════════════════════════ CHƯƠNG 2 (địch) ═══════════════════════════════════════
  createHero2('e2_1','Tô Định',80,2,'enemy','Thái thú tàn ác',
    'Tô Định là Thái thú Giao Chỉ hung tàn của nhà Hán, người giết chồng Trưng Trắc là Thi Sách, gây ra cuộc khởi nghĩa Hai Bà Trưng. Ông nổi tiếng tham lam và bạo ngược. Sau khi bị Hai Bà Trưng đánh, phải cắt tóc giả dạng trốn thoát.',
    'Hán Quyền Bóc Lột','Bóc lột tối đa nguồn lực địch, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e2_2','Mã Viện',81,2,'enemy','Phục Ba Tướng Quân',
    'Mã Viện là đại tướng nhà Hán, người dẹp được khởi nghĩa Hai Bà Trưng năm 43 CN. Ông nổi tiếng với câu: "Đại trượng phu nên chết ở chiến trường." Ông cho đúc đồng trụ "Đồng trụ chiết, Giao Chỉ diệt" để cắm ở biên giới.',
    'Phục Ba Đại Trận','Dàn trận tiêu diệt hoàn toàn, gây sát thương (162% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e2_3','Chu Phù',73,2,'enemy','Thứ sử','Chu Phù là Thứ sử Giao Châu tàn bạo cuối thế kỷ II, ép dân nộp thuế cực kỳ nặng nề. Sự hà khắc của ông khiến nhân dân nổi dậy, dẫn đến cái chết của ông và sự trỗi dậy của Sĩ Nhiếp.','Áp Bức Hà Khắc','Bóp nghẹt tinh thần kẻ yếu, gây sát thương (146% Tấn công) và khống chế (tỷ lệ 30%) lên 1 mục tiêu địch.'),
  createHero2('e2_4','Lục Dận',83,2,'enemy','Đô đốc',
    'Lục Dận là tướng nhà Ngô, đô đốc cai quản Giao Chỉ, người đối phó với cuộc khởi nghĩa của Bà Triệu năm 248.',
    'Ngô Binh Tinh Nhuệ','Quân tinh nhuệ nhà Ngô, tấn công nhanh và phòng thủ (+25%) vững.'),
  createHero2('e2_5','Lưu Long',65,2,'enemy','Trung lang tướng','Lưu Long là Trung lang tướng nhà Đông Hán, phó tướng đắc lực của Mã Viện. Chính cánh quân của ông đã giao chiến dữ dội với nghĩa quân Hai Bà Trưng tại vùng Cấm Khê.','Quan Quân Truy Đuổi','Truy đuổi không ngừng, gây sát thương (130% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e2_6','Đoàn Chí',59,2,'enemy','Lâu thuyền tướng quân',
    'Đoàn Chí là Lâu thuyền tướng quân chỉ huy đạo quân thủy tiến sang phối hợp với Mã Viện đàn áp Hai Bà Trưng. Tuy nhiên, ông bệnh chết tại Hợp Phố, để lại binh quyền cho Mã Viện.',
    'Hán Hóa Mưu Kế','Dần dần làm suy yếu ý chí kháng cự bằng văn hóa và tư tưởng, gây sát thương (118% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e2_7','Hiến Trung',68,2,'enemy','Bình Lạc Hầu',
    'Đô úy tiền phương của nhà Đông Hán, tướng tiên phong dưới quyền Mã Viện xâm lược Đại Việt, đối thủ mưu mô, thâm độc của Hai Bà Trưng.',
    'Mưu Đồ Thâm Độc','Dùng mưu kế thâm độc gây rối loạn, gây sát thương (136% Tấn công) lên 1 mục tiêu địch.'),
  createHero2('e2_8','Hán Quang Vũ Đế',85,2,'enemy','Hoàng đế nhà Hán',
    'Hoàng đế nhà Đông Hán, người hạ chiếu điều động binh lực sai Mã Viện sang đàn áp Hai Bà Trưng.',
    'Hoàng Đế Hạ Chiếu','Tăng cường sức mạnh cho toàn quân Hán, gây sát thương (170% Tấn công) lên toàn bộ địch.'),

  // ═══════════════════════════════════════ CHƯƠNG 3 (địch) ═══════════════════════════════════════
  createHero2('e3_1','Tiêu Tư',78,3,'enemy','Thứ sử',
    'Tiêu Tư là thứ sử Giao Châu nhà Lương, người tàn bạo và tham nhũng, khiến dân tình khổ sở. Hành động của ông trực tiếp dẫn đến cuộc khởi nghĩa của Lý Bí năm 542.',
    'Tham Quan Ô Lại','Bóc lột không giới hạn, gây sát thương (156% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e3_2','Trần Bá Tiên',82,3,'enemy','Đại tướng Lương',
    'Trần Bá Tiên là đại tướng nhà Lương, người chinh phạt và đánh bại nước Vạn Xuân của Lý Bí. Ông sau đó lập ra nhà Trần ở Trung Quốc. Được xem là một trong những tướng tài nhất thời Lưỡng Triều.',
    'Tiên Phát Chế Nhân','Tấn công trước khi địch kịp phòng thủ (+25%), gây thiệt hại tối đa.'),
  createHero2('e3_3','Dương Phiêu',72,3,'enemy','Quan Tùy','Quan cai trị nhà Tùy ở Giao Châu, đại diện cho chính sách đồng hóa và khai thác tài nguyên của phương Bắc.','Tùy Quân Tiến Công','Tiến công có tổ chức, khó phòng thủ (+15%).'),
  createHero2('e3_4','Tiêu Bột',74,3,'enemy','Tiếm vị vương',
    'Lý Phật Tử là người cháu Lý Bí, người chiếm ngôi của Triệu Quang Phục bằng kế hôn nhân và sau đó xưng vương. Ông bị quân Tùy đánh bại và bị bắt đưa về Trung Quốc.',
    'Phản Bội Liên Hoàn','Sử dụng phản bội và lừa đảo, gây sát thương (96% Tấn công) lên toàn bộ địch..'),
  createHero2('e3_5','Trần Văn Giới',71,3,'enemy','Thứ sử Đường','Thứ sử nhà Đường cai trị Giao Châu, đại diện cho ách đô hộ khắc nghiệt của phong kiến Đường ở nước ta.','Thuế Nặng Nhân Công','Suy yếu sức chiến đấu của đối thủ bằng áp lực kinh tế, gây sát thương (142% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e3_6','Dương Sào',60,3,'enemy','Quan Đường','Quan cai trị người Việt gốc Hoa thời Đường, đại diện cho tầng lớp thống trị đồng hóa.','Đồng Hóa Sách Lược','Làm yếu ý chí dân tộc cho toàn đội (+20 Nhuệ khí).'),
  createHero2('e3_7','Dương Sàn',78,3,'enemy','Tì tướng',
    'Tì tướng của Trần Bá Tiên, được giao quyền trấn giữ đồn lũy quân Lương. Khi Triệu Việt Vương tổng phản công vào năm 550, Dương Sàn bị chém chết tại trận, quân Lương tan rã.',
    'Chỉ Huy Đồn Lũy','Phòng thủ cực đoan, giảm sát thương nhận vào. Gây sát thương (156% Tấn công) lên 1 mục tiêu địch.'),
  createHero2('e3_8','Nguyễn Cảnh Trọng',74,3,'enemy','Thứ sử Quảng Châu',
    'Tỳ tướng hỗ trợ hậu cần, đảm bảo tuyến đường tiếp tế khí giới cho quân Lương ở Vạn Xuân.',
    'Cắt Đứt Hậu Cần','Gây sát thương (96% Tấn công) và giảm nhuệ khí toàn bộ địch.'),
  createHero2('e3_9','Hầu Cảnh',82,3,'enemy','Tướng phản loạn',
    'Tướng phản loạn làm chao đảo kinh thành nhà Lương ở chính quốc, khiến nội bộ giặc suy yếu, buộc Trần Bá Tiên phải rút quân.',
    'Bạo Loạn Nội Bộ','Kích hoạt hiệu ứng rối loạn, gây sát thương (142% Tấn công) lên 1 mục tiêu địch.'),
  createHero2('e3_10','Lương Vũ Đế',85,3,'enemy','Hoàng đế nhà Lương',
    'Kẻ phát động toàn bộ cuộc chiến tiêu diệt Vạn Xuân, đóng vai trò buff sức mạnh toàn cục cho quân Lương từ xa.',
    'Vũ Đế Uy Quyền','Buff sức mạnh toàn cục từ xa, tăng 15% Tấn công toàn đội.'),

  // ═══════════════════════════════════════ CHƯƠNG 4 (địch) ═══════════════════════════════════════
  createHero2('e4_1','Dương Tam Kha',73,4,'enemy','Phản thần',
    'Dương Tam Kha là cậu của Ngô Xương Ngập, chiếm ngôi nhà Ngô sau khi Ngô Quyền mất, làm loạn cơ đồ họ Ngô. Ông là một trong những nhân tố gây ra thời loạn 12 sứ quân.',
    'Cướp Ngôi','Chiếm lấy vị trí chủ đạo của đối thủ, gây sát thương (146% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e4_2','Kiều Công Tiễn',77,4,'enemy','Phản thần',
    'Kiều Công Tiễn là kẻ giết Dương Đình Nghệ để đoạt chức Tiết Độ Sứ. Hành động phản bội của ông chính là nguyên nhân trực tiếp dẫn đến trận Bạch Đằng lịch sử năm 938.',
    'Phản Thần Đoạt Vị','Đâm sau lưng, gây sát thương (154% Tấn công) cực lớn cho mục tiêu không đề phòng.'),
  createHero2('e4_3','Lưu Hoằng Thao',80,4,'enemy','Đại tướng Nam Hán',
    'Lưu Hoằng Thao là con trai vua Nam Hán, chỉ huy đạo quân thủy xâm lược nước ta năm 938. Ông bị Ngô Quyền bày trận cọc sắt trên sông Bạch Đằng, thất bại hoàn toàn và tử trận.',
    'Thủy Quân Nam Hán','Chỉ huy thủy chiến, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e4_4','Lưu Cung',78,4,'enemy','Vua Nam Hán','Lưu Cung là vua Nam Hán, kẻ sai con trai Lưu Hoằng Thao sang xâm lược nước ta và phải chứng kiến con tử trận trong trận Bạch Đằng.','Thiên Triều Uy Quyền','Sức mạnh của vương quốc phương nam, tăng chỉ số toàn bộ quân Nam Hán. (+10% Tấn công).'),
  createHero2('e4_5','Hầu Nhân Bảo',81,4,'enemy','Tướng Tống',
    'Hầu Nhân Bảo là tướng nhà Tống trong cuộc xâm lược Đại Việt năm 981, bị Lê Hoàn đánh bại. Ông tử trận tại sông Bạch Đằng, thất bại hoàn toàn.',
    'Lưỡng Lộ Tiến Công','Tấn công từ hai hướng, khiến địch không kịp phòng thủ (+25%).'),
  createHero2('e4_6','Tôn Toàn Hưng',73,4,'enemy','Tướng Tống','Tôn Toàn Hưng là tướng Tống cùng Hầu Nhân Bảo xâm lược Đại Việt năm 981, bị đánh bại bởi Lê Đại Hành.','Thủy Lộ Tấn Công','Kết hợp tấn công đường sông và đường bộ, gây sát thương (146% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e4_7','Lê Long Đĩnh',72,4,'enemy','Ngọa Triều',
    'Lê Long Đĩnh (Ngọa Triều) là vị vua cuối cùng nhà Tiền Lê, nổi tiếng tàn bạo và sa đọa. Ông giết anh em để lên ngôi, tra tấn tù nhân để giải trí. Sau khi ông mất, Lý Công Uẩn được triều thần tôn lên thay.',
    'Bạo Quân Ngọa Triều','Sức mạnh bạo ngược, gây sát thương (144% Tấn công) cao nhưng suy yếu dần theo thời gian. (+10% Tấn công). (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('e4_8','Đỗ Thích',72,4,'enemy','Phản thần',
    'Đỗ Thích là một quan viên thời nhà Đinh. Lịch sử ghi nhận ông là kẻ đã ám sát vua Đinh Tiên Hoàng và Nam Việt vương Đinh Liễn năm 979, dẫn đến sự sụp đổ của nhà Đinh và mượn cớ cho quân Tống định xâm lược.',
    'Ám Sát Quân Vương','Tung đòn bất ngờ chí mạng, gây sát thương (144% Tấn công) lên 1 mục tiêu địch..'),

  // ═══════════════════════════════════════ CHƯƠNG 5 (địch) ═══════════════════════════════════════
  createHero2('e5_1','Quách Quỳ',80,5,'enemy','Đại tướng Tống',
    'Quách Quỳ là đại tướng nhà Tống chỉ huy cuộc xâm lược Đại Việt năm 1076–1077. Ông bị Lý Thường Kiệt chặn đứng ở sông Cầu (sông Như Nguyệt) suốt nhiều tháng và buộc phải rút quân.',
    'Thập Vạn Tống Quân','Huy động đại quân áp đảo, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e5_2','Triệu Tiết',77,5,'enemy','Phó tướng Tống',
    'Triệu Tiết là phó tướng của Quách Quỳ trong cuộc xâm lược Đại Việt năm 1076, bị đánh bại ở sông Như Nguyệt.',
    'Tống Quân Phó Soái','Phối hợp chặt chẽ với chủ soái cho toàn đội (+10% Tấn công).'),
  createHero2('e5_3','Tô Giám',72,5,'enemy','Kinh lược sứ Tống',
    'Tô Giám là Kinh lược sứ nhà Tống cai trị vùng biên giới, kẻ bị Lý Thường Kiệt tiến công phủ đầu năm 1075 để phá tan kế hoạch xâm lược. Ông bị đánh bại và bỏ chạy khi quân Đại Việt tấn công vào đất Tống.',
    'Biên Cương Trấn Thủ','Án ngữ vùng biên giới cho toàn đội (+15% Phòng thủ).'),
  createHero2('e5_4','Trần Vĩnh Lộc',65,5,'enemy','Tướng Tống',
    'Trần Vĩnh Lộc là tướng nhà Tống bị Lý Thường Kiệt đánh bại trong cuộc tiến công phủ đầu năm 1075, tham gia bảo vệ châu Khâm và châu Liêm.',
    'Tống Quân Biên Giới','Chiến đấu bảo vệ biên giới, gây sát thương (130% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e5_5','Hòa Mâu',63,5,'enemy','Tướng Tống',
    'Hòa Mâu là tướng nhà Tống tham gia phòng thủ vùng biên giới khi Lý Thường Kiệt đánh sang đất Tống năm 1075, bị quân Đại Việt đánh bại.',
    'Phòng Thủ Châu Ung','Cố thủ tại Châu Ung, gây sát thương (126% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e5_6','Dương Tùng Tiên',66,5,'enemy','Tướng Tống',
    'Dương Tùng Tiên là tướng nhà Tống trấn giữ vùng biên giới, bị Lý Thường Kiệt đánh bại trong cuộc tiến công phủ đầu vào đất Tống.',
    'Biên Cương Thủ Vệ','Kiên trì phòng thủ biên ải, gây sát thương (132% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e5_7','Lý Kế Nguyên',60,5,'enemy','Tướng Tống','Lý Kế Nguyên là tướng nhà Tống cai quản vùng biên giới, thường xuyên quấy nhiễu Đại Việt trước khi bị phản công.','Biên Cương Quấy Phá','Quấy phá liên tục, gây sát thương (120% Tấn công) lên 1 mục tiêu địch..'),

  // ═══════════════════════════════════════ CHƯƠNG 6 (địch) ═══════════════════════════════════════
  createHero2('e6_1','Trần Ích Tắc',70,6,'enemy','Phản thần',
    'Trần Ích Tắc là em trai vua Trần, người duy nhất trong hoàng tộc đầu hàng quân Mông-Nguyên. Ông được Hốt Tất Liệt phong làm "An Nam quốc vương" nhưng không bao giờ về được nước, bị sử sách Việt Nam ghi nhớ mãi là kẻ phản quốc.',
    'Hàng Giặc Thần','Tiết lộ bí mật toàn đội cho toàn đội (+15% Phòng thủ).'),
  createHero2('e6_2','Hốt Tất Liệt',78,6,'enemy','Đại hãn Mông Cổ',
    'Hốt Tất Liệt là Đại hãn của Đế quốc Mông Cổ, ba lần sai quân xâm lược Đại Việt (1257, 1285, 1288) nhưng đều thất bại. Ông xây dựng đế quốc Nguyên rộng lớn nhất lịch sử nhân loại.',
    'Đại Hãn Thiết Kỵ','Kỵ binh Mông Cổ bách chiến bách thắng, gây sát thương (156% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e6_3','Ngột Lương Hợp Thai',84,6,'enemy','Đại tướng Mông Cổ',
    'Ngột Lương Hợp Thai là đại tướng Mông Cổ chỉ huy cuộc xâm lược Đại Việt lần thứ nhất năm 1257. Ông là danh tướng bách chiến bách thắng nhưng phải rút quân khỏi Đại Việt vì chiến thuật "vườn không nhà trống".',
    'Tiêu Thổ Chiến Thuật','Tận dụng lợi thế quân đông, gây sát thương (168% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e6_4','Toa Đô',81,6,'enemy','Đại tướng Mông Cổ',
    'Toa Đô là đại tướng Mông Cổ tham gia cuộc xâm lược Đại Việt lần hai và ba. Ông bị Trần Quốc Tuấn và Trần Quang Khải đánh bại và tử trận tại Tây Kết năm 1285.',
    'Nam Bắc Giáp Công','Kẹp địch từ hai phía bắc-nam, gây sát thương (162% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e6_5','Thoát Hoan',80,6,'enemy','Thái tử Mông Cổ',
    'Thoát Hoan là con trai Hốt Tất Liệt, chỉ huy cuộc xâm lược lần hai năm 1285. Ông phải trốn trong ống đồng thoát chạy về Trung Quốc — hình ảnh nhục nhã được ghi vào sử sách Việt Nam.',
    'Thiết Quản Bại Tẩu','Dù mạnh vẫn có thể bị đánh bại, tăng sát thương khi bị dồn vào góc. (Gây 160% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('e6_6','Ô Mã Nhi',80,6,'enemy','Đô đốc Mông Cổ',
    'Ô Mã Nhi là đô đốc thủy quân Mông Cổ, chỉ huy nhiều trận thủy chiến trong cuộc xâm lược Đại Việt. Ông bị Trần Quốc Tuấn dụ vào bẫy cọc sắt trên sông Bạch Đằng năm 1288 và bị bắt sống.',
    'Mông Cổ Thủy Quân','Thủy quân Mông Cổ thiện chiến, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e6_7','Phàn Tiếp',66,6,'enemy','Tướng Mông Cổ','Phàn Tiếp là tướng Mông Cổ tham gia xâm lược Đại Việt, bị tiêu diệt trong các trận đánh phản công của quân Trần.','Thiết Kỵ Đột Kích','Kỵ binh Mông Cổ đột kích, phá vỡ hàng phòng thủ (+15%).'),
  createHero2('e6_8','Chế Bồng Nga',72,6,'enemy','Vua Chiêm Thành',
    'Chế Bồng Nga là vị vua hùng mạnh nhất của Chiêm Thành, nhiều lần đánh phá kinh đô Thăng Long của Đại Việt trong thế kỷ 14. Ông bị tướng Trần Khát Chân giết chết năm 1390.',
    'Chiêm Thành Đột Kích','Tấn công bất ngờ từ phương nam, gây sát thương (144% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e6_9','Trần Kiện',55,6,'enemy','Phản thần','Trần Kiện là hoàng thân nhà Trần đầu hàng Mông-Nguyên trong cuộc xâm lược lần hai, bị lịch sử ghi nhớ là kẻ phản bội.','Phản Bội Gia Tộc','Tiết lộ điểm yếu của đội mình, gây sát thương (110% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e6_10','Trần Lộng',59,6,'enemy','Phản thần','Trần Lộng là hoàng thân nhà Trần đầu hàng Mông-Nguyên, cùng Trần Kiện là những kẻ phản quốc trong cuộc kháng chiến chống Mông-Nguyên.','Nội Gián Phá Thành','Từ bên trong phá hoại phòng thủ (+15%), làm suy yếu cả đội.'),

  // ═══════════════════════════════════════ CHƯƠNG 7 (địch) ═══════════════════════════════════════
  createHero2('e7_1','Trương Phụ',80,7,'enemy','Đại tướng Minh',
    'Trương Phụ là đại tướng nhà Minh, người chỉ huy cuộc xâm lược Đại Việt năm 1406–1407. Ông nổi tiếng tàn bạo, thực hiện các chính sách đồng hóa và khủng bố khắc nghiệt trong thời kỳ Minh thuộc.',
    'Minh Quân Thiết Quyền','Quân Minh thiện chiến, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e7_2','Mộc Thạnh',80,7,'enemy','Đại tướng Minh',
    'Mộc Thạnh là đại tướng nhà Minh, cùng Trương Phụ xâm lược Đại Việt. Ông cũng tham gia chiến tranh chống lại khởi nghĩa Lam Sơn trong giai đoạn sau.',
    'Thiết Giáp Bộ Binh','Bộ binh bọc thép thiện chiến, phòng thủ (+25%) cực cao.'),
  createHero2('e7_3','Hoàng Phúc',75,7,'enemy','Thái giám Minh',
    'Hoàng Phúc là quan thái giám nhà Minh cai trị Giao Chỉ trong thời Minh thuộc, thực thi các chính sách đồng hóa văn hóa tàn khốc.',
    'Văn Hóa Đồng Hóa','Suy yếu tinh thần dân tộc của đối phương từ bên trong cho toàn đội (+20 Nhuệ khí).'),
  createHero2('e7_4','Trần Húc',66,7,'enemy','Phản thần','Trần Húc là quan lại người Việt phục vụ nhà Minh, giúp đỡ công cuộc cai trị và đồng hóa của phương Bắc.','Nội Gián Đồng Hóa','Hoạt động từ bên trong, gây sát thương (132% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e7_5','Lý Bân',67,7,'enemy','Tướng Minh','Lý Bân là tướng nhà Minh tham gia cai trị Giao Chỉ, thi hành các chính sách cứng rắn.','Minh Triều Pháp Lệnh','Kỷ luật nghiêm khắc, tăng hiệu quả phòng thủ (+15%) tập thể.'),
  createHero2('e7_6','Minh Thành Tổ',75,7,'enemy','Hoàng đế Minh',
    'Minh Thành Tổ (Chu Đệ) là hoàng đế nhà Minh ra lệnh xâm lược Đại Việt năm 1406. Ông là kẻ chịu trách nhiệm cho 20 năm Minh thuộc tàn khốc.',
    'Thiên Tử Hạ Chiếu','Sức mạnh của thiên tử ban xuống, tăng mạnh toàn bộ quân Minh. (+10% Tấn công).'),
  createHero2('e7_7','Mã Kỳ',60,7,'enemy','Tướng Minh','Mã Kỳ là tướng nhà Minh tham gia xâm lược và cai trị Giao Chỉ.','Đàn Áp Khởi Nghĩa','Dập tắt mọi phản kháng cho toàn đội (+20 Nhuệ khí).'),
  createHero2('e7_8','Trần Sĩ Kỳ',58,7,'enemy','Phản thần','Trần Sĩ Kỳ là người Việt phục vụ cho nhà Minh, giúp đỡ công cuộc đô hộ.','Chỉ Điểm','Chỉ điểm điểm yếu của đồng loại, gây sát thương (116% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e7_9','Trần Thiêm Bình',62,7,'enemy','Giả mạo hoàng thân',
    'Trần Thiêm Bình là kẻ mạo xưng hoàng thân nhà Trần, dựa vào nhà Minh đòi phục lập nhà Trần, là cái cớ để nhà Minh xâm lược Đại Việt năm 1406–1407.',
    'Giả Mạo Chính Danh','Dùng danh phận giả tạo để lừa dối, giảm tinh thần đối phương (+20 Nhuệ khí).'),

  // ═══════════════════════════════════════ CHƯƠNG 8 (địch) ═══════════════════════════════════════
  createHero2('e8_1','Trương Phụ',86,8,'enemy','Lão tướng Minh',
    'Trương Phụ trở lại trong cuộc kháng chiến Lam Sơn ở giai đoạn sau, kinh nghiệm hơn nhưng cuối cùng vẫn không thể đè bẹp được khởi nghĩa Lam Sơn.',
    'Lão Tướng Kinh Nghiệm','Kinh nghiệm phong phú, gây sát thương (172% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e8_2','Vương Thông',85,8,'enemy','Đại tướng Minh',
    'Vương Thông là tổng chỉ huy quân Minh ở Đại Việt giai đoạn cuối. Ông bị vây hãm trong thành Đông Quan (Hà Nội), buộc phải ký hòa ước đầu hàng Lê Lợi năm 1427.',
    'Đông Quan Thủ Vệ','Cố thủ trong thành kiên cố, sức phòng thủ (+25%) cực cao.'),
  createHero2('e8_3','Trần Trí',69,8,'enemy','Tướng Minh','Trần Trí là tướng nhà Minh tham gia đàn áp khởi nghĩa Lam Sơn trong giai đoạn đầu.','Truy Quét Nghĩa Quân','Truy đuổi và tiêu diệt từng nhóm nghĩa quân nhỏ, gây sát thương (90% Tấn công) lên toàn bộ địch..'),
  createHero2('e8_4','Lý An',68,8,'enemy','Tướng Minh','Lý An là tướng Minh có kinh nghiệm chiến đấu ở Giao Chỉ, từng tham gia nhiều chiến dịch đàn áp.','Địa Hình Kinh Nghiệm','Am hiểu địa hình Đại Việt, gây sát thương (136% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e8_5','Phương Chính',72,8,'enemy','Tướng Minh','Phương Chính là tướng nhà Minh có vai trò quan trọng trong cuộc chiến chống Lam Sơn.','Quân Minh Kiên Trì','Kiên trì đàn áp, gây sát thương (144% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e8_6','Liễu Thăng',80,8,'enemy','Đại tướng Minh',
    'Liễu Thăng là đại tướng nhà Minh dẫn quân tiếp viện 10 vạn quân từ phương bắc trong kháng chiến Lam Sơn giai đoạn cuối. Ông bị Trần Nguyên Hãn phục kích và giết chết ở Chi Lăng năm 1427.',
    'Chi Lăng Địa Ngục','Đánh thẳng vào điểm yếu nhưng dễ bị phản phục kích, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e8_7','Mộc Thạnh',79,8,'enemy','Lão tướng Minh','Mộc Thạnh tái xuất trong kháng chiến Lam Sơn giai đoạn cuối, cùng Liễu Thăng tiếp viện nhưng cũng thất bại.','Lưỡng Lộ Hội Sư','Hợp quân từ hai hướng cho toàn đội (+10% Tấn công).'),
  createHero2('e8_8','Thôi Tụ',70,8,'enemy','Tướng Minh','Thôi Tụ là tướng Minh bị bắt trong kháng chiến Lam Sơn, đại diện cho sự thất bại của quân Minh trước tinh thần yêu nước của nghĩa quân Lam Sơn.','Đầu Hàng Chiến Thuật','Giả vờ đầu hàng để tấn công bất ngờ, gây sát thương (140% Tấn công) lên 1 mục tiêu địch..'),

  // ═══════════════════════════════════════ CHƯƠNG 9 (địch) ═══════════════════════════════════════
  createHero2('e9_1','Trịnh Kiểm',77,9,'enemy','Chúa Trịnh',
    'Trịnh Kiểm là người sáng lập quyền lực chúa Trịnh, rể của Nguyễn Kim. Ông lấy danh nghĩa phò Lê để nắm thực quyền, hại chết anh em Nguyễn Kim và bắt đầu cục diện vua Lê - chúa Trịnh kéo dài hàng thế kỷ.',
    'Lê-Trịnh Phân Quyền','Dùng danh chính ngôn thuận để che giấu tham vọng thực sự, gây sát thương (154% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e9_2','Trịnh Tùng',81,9,'enemy','Chúa Trịnh',
    'Trịnh Tùng là chúa Trịnh hùng mạnh nhất, đánh bại nhà Mạc và khôi phục kinh đô Thăng Long. Ông nắm hoàn toàn quyền lực, biến vua Lê thành bù nhìn.',
    'Trịnh Quyền Độc Đoán','Nắm toàn quyền kiểm soát chiến trường, gây sát thương (162% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e9_3','Lê Uy Mục',71,9,'enemy','Quỷ Vương',
    'Lê Uy Mục (1488-1509) là vị vua thứ 8 của nhà Hậu Lê, nổi danh là "Quỷ Vương" vì sự tàn bạo, thích giết chóc và đam mê tửu sắc, đẩy triều đại vào con đường suy vong.',
    'Quỷ Vương Thịnh Nộ','Gây khiếp sợ cho đối phương, làm giảm tinh thần và phòng thủ (+15%) của 1 mục tiêu địch. (+20 Nhuệ khí).'),
  createHero2('e9_4','Lê Tương Dực',72,9,'enemy','Trư Vương',
    'Lê Tương Dực (1495-1516) là vị vua thứ 9 của nhà Hậu Lê. Dù có công dẹp loạn Lê Uy Mục, nhưng sau lại sa đọa, xây dựng Cửu Trùng Đài tốn kém, bị sứ thần gọi là "Trư Vương".',
    'Trư Vương Xa Hoa','Bòn rút tài nguyên chiến trường cho 1 đồng minh (Hồi 14% Máu tối đa).'),
  createHero2('e9_5','Mạc Phúc Hải',70,9,'enemy','Vua Mạc','Mạc Phúc Hải là vua thứ hai nhà Mạc, tiếp tục cuộc chiến chống lại liên minh Lê-Trịnh.','Bắc Triều Thủ Vệ','Bảo vệ triều đình phía bắc cho toàn đội (+15% Phòng thủ).'),
  createHero2('e9_6','Mạc Đăng Doanh',72,9,'enemy','Vua Mạc','Mạc Đăng Doanh là vua thứ hai nhà Mạc, con của Mạc Đăng Dung, được lịch sử ghi nhận trị vì khá hiền lành so với cha.','Mạc Triều Ổn Định','Duy trì phòng thủ (+15%) kiên cố, khó bị phá vỡ.'),
  createHero2('e9_7','Mạc Kính Điển',79,9,'enemy','Đại tướng Mạc','Mạc Kính Điển là đại tướng nhà Mạc, nhiều lần tấn công liên minh Lê-Trịnh nhưng đều thất bại cuối cùng.','Mạc Quân Dũng Mãnh','Chiến đấu dũng cảm dù ở thế yếu hơn, gây sát thương (158% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e9_8','Trịnh Tráng',60,9,'enemy','Chúa Trịnh','Trịnh Tráng là chúa Trịnh tiếp theo, tiếp tục cuộc chiến với chúa Nguyễn ở phía nam.','Trịnh-Nguyễn Phân Tranh','Kinh nghiệm chiến tranh kéo dài, gây sát thương (120% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e9_9','Trịnh Tạc',59,9,'enemy','Chúa Trịnh','Trịnh Tạc là một trong các chúa Trịnh duy trì cuộc chiến Trịnh-Nguyễn.','Trịnh Binh Cố Thủ','phòng thủ (+15%) kiên trì theo thời gian.'),
  createHero2('e9_10','Mạc Mậu Hợp',74,9,'enemy','Vua Mạc',
    'Mạc Mậu Hợp (1560-1592) là vị vua thứ năm nhà Mạc. Dù ở ngôi lâu nhất (30 năm), nhưng vì đam mê tửu sắc, sa đọa và tin dùng nịnh thần, ông đã đánh mất lòng dân, dẫn đến việc kinh thành Thăng Long thất thủ vào tay Trịnh Tùng và cơ nghiệp nhà Mạc sụp đổ.',
    'Tửu Sắc Hôn Quân','Gây nhiễu loạn chiến trường, gây sát thương (148% Tấn công) lên 1 mục tiêu địch..'),

  // ═══════════════════════════════════════ CHƯƠNG 10 (địch) ═══════════════════════════════════════
  createHero2('e10_1','Lê Chiêu Thống',70,10,'enemy','Phản quốc vương',
    'Lê Chiêu Thống là vua cuối cùng nhà Hậu Lê, kẻ cầu viện 29 vạn quân Thanh sang xâm lược đất nước. Ông bị Quang Trung đánh đuổi, phải bỏ chạy sang Trung Quốc và chết ở đó trong tủi nhục.',
    'Cầu Viện Ngoại Bang','Dựa vào sức mạnh ngoại bang, tăng nhưng mất tính chính danh. (+10% Tấn công).'),
  createHero2('e10_2','Tôn Sĩ Nghị',84,10,'enemy','Đại tướng Thanh',
    'Tôn Sĩ Nghị là tổng đốc Lưỡng Quảng nhà Thanh, chỉ huy 29 vạn quân xâm lược Đại Việt năm 1788. Ông bị Quang Trung đánh cho tan tác trong 5 ngày Tết, vứt cả ấn tín tháo chạy qua sông Nhị Hà.',
    'Hai Mươi Chín Vạn Quân','Số lượng áp đảo, gây sát thương (168% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e10_3','Sầm Nghi Đống',80,10,'enemy','Tướng Thanh',
    'Sầm Nghi Đống là tướng Thanh trấn thủ đồn Đống Đa, bị Quang Trung tấn công bất ngờ trong đêm Tết và tự sát. Cái chết của ông là biểu tượng cho sự thất bại hoàn toàn của quân Thanh.',
    'Đống Đa Thủ Trận','phòng thủ (+25%) kiên cố nhưng không thể chống lại đòn tấn công Tết bất ngờ.'),
  createHero2('e10_4','Chiêu Thùy',77,10,'enemy','Tướng Xiêm','Chiêu Thùy là tướng Xiêm La (Thái Lan) tham gia cuộc xâm lược Đại Việt năm 1785, bị Nguyễn Huệ đánh tan trong trận Rạch Gầm - Xoài Mút.','Xiêm La Thủy Quân','Thủy quân Xiêm La, gây sát thương (154% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e10_5','Chiêu Tăng',69,10,'enemy','Tướng Xiêm','Chiêu Tăng là đại tướng quân đội Xiêm La trong cuộc xâm lược Đại Việt, bị Nguyễn Huệ tiêu diệt trong trận Rạch Gầm.','Xiêm Binh Tiến Công','Quân Xiêm hung hãn, gây sát thương (138% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e10_6','Chiêu Sương',59,10,'enemy','Tướng Xiêm','Chiêu Sương là một trong các tướng Xiêm La thất bại trong trận Rạch Gầm-Xoài Mút năm 1785.','Mekong Thủy Chiến','Chiến đấu trên dòng sông Mekong, gây sát thương (118% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('e10_7','Lục Côn',58,10,'enemy','Tướng Thanh','Lục Côn là tướng Thanh tham gia cuộc xâm lược Đại Việt năm 1788-1789, bị Quang Trung đánh bại.','Thanh Quân Hành Quân','Hành quân có kỷ luật nhưng chậm chạp, gây sát thương (116% Tấn công) lên 1 mục tiêu địch..'),
];

export const INITIAL_HEROES: Hero[] = ALL_HEROES;
export const ENEMY_HEROES: Hero[] = ENEMY_HEROES_LIST;

export const ENEMY_POOL_BY_CHAPTER: Record<number, string[]> = {};
for (let c = 1; c <= 10; c++) {
  ENEMY_POOL_BY_CHAPTER[c] = ENEMY_HEROES_LIST.filter(h => h.chapter === c).map(h => h.id);
}

// Added missing price property to Artifact objects
export const ARTIFACTS: Artifact[] = [
  { id: 'art_ngoc_an', name: 'Long Đồ Ngọc Ấn', description: 'Tăng 25% HP. Ấn ngọc giao long biểu trưng quyền uy.', price: 50000, bonusHpPc: 25, exclusiveTo: ['h1_1'], image: './items/artifacts/art_ngoc_an.png', effectDesc: 'Miễn sát thương (25% tỷ lệ chặn đứng đòn đánh)', specialEffect: 'immune', effectChance: 25 },
  { id: 'art_thiet_truong', name: 'Thiết Trượng Đằng Ngà', description: 'Tăng 20% Tấn công, +20 Tốc độ. Bảo bối của Phù Đổng Thiên Vương.', price: 50000, bonusAtkPc: 20, bonusSpd: 20, exclusiveTo: ['h1_5'], image: './items/artifacts/art_thiet_truong.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_no_lien_chau', name: 'Nỏ Thần Kim Quy', description: 'Tăng 20% Tấn công (giảm 10% Phòng thủ). Báu vật trấn quốc.', price: 50000, bonusAtkPc: 20, bonusDefPc: -10, exclusiveTo: ['h1_10'], image: './items/artifacts/art_no_lien_chau.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_kiem_tran_hai', name: 'Kiếm Trấn Hải', description: 'Tăng 25% Tấn công. Thanh gươm diệt thủy quái của Lạc Long Quân.', price: 50000, bonusAtkPc: 25, exclusiveTo: ['h1_2'], image: './items/artifacts/art_kiem_tran_hai.png', effectDesc: 'Miễn sát thương (25% tỷ lệ)', specialEffect: 'immune', effectChance: 25 },
  { id: 'art_gay_sinh_tu', name: 'Gậy Sinh Tử', description: 'Tăng 20% HP. Gậy thần cải tử hoàn sinh của Sơn Tinh.', price: 50000, bonusHpPc: 20, exclusiveTo: ['h1_9'], image: './items/artifacts/art_gay_sinh_tu.png', effectDesc: 'Hồi sinh với 50% HP (Kích hoạt 1 lần khi HP về 0)', specialEffect: 'revive', effectChance: 100 },
  { id: 'art_song_kiem', name: 'Song Kiếm Mê Linh', description: 'Tăng 20% Tấn công, +10 Tốc độ. Cặp kiếm uy dũng của Hai Bà Trưng.', price: 50000, bonusAtkPc: 20, bonusSpd: 10, exclusiveTo: ['h2_1', 'h2_2'], image: './items/artifacts/art_song_kiem.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_tram_nga', name: 'Trâm Ngà Chỉ Nguyệt', description: 'Tăng 20% HP, +100 Phòng thủ. Khí phách hiên ngang.', price: 50000, bonusHpPc: 20, bonusDef: 100, exclusiveTo: ['h2_3'], image: './items/artifacts/art_tram_nga.png', effectDesc: 'Miễn sát thương (20% tỷ lệ)', specialEffect: 'immune', effectChance: 20 },
  { id: 'art_long_kiem_van_xuan', name: 'Long Kiếm Vạn Xuân', description: 'Tăng 20% Tấn công. Gắn liền việc lập nước Vạn Xuân.', price: 50000, bonusAtkPc: 20, exclusiveTo: ['h3_1'], image: './items/artifacts/art_long_kiem_van_xuan.png', effectDesc: 'Hồi máu (Hồi 20% max HP sau khi đánh, 20% tỷ lệ)', specialEffect: 'heal', effectChance: 20 },
  { id: 'art_cu_moc', name: 'Cự Mộc Sát Hổ', description: 'Tăng 20% Tấn công. Sức mạnh bạt sơn của Phùng Hưng.', price: 50000, bonusAtkPc: 20, exclusiveTo: ['h3_4'], image: './items/artifacts/art_cu_moc.png', effectDesc: 'Gây choáng (20% tỷ lệ khiến địch mất lượt sau)', specialEffect: 'stun', effectChance: 20 },
  { id: 'art_an_tiet_do_su', name: 'Ấn Tiết Độ Sứ', description: 'Tăng 10% Phòng thủ. Quyền uy ngoại giao đoạt tự chủ.', price: 50000, bonusDefPc: 10, exclusiveTo: ['h3_7'], image: './items/artifacts/art_an_tiet_do_su.png', effectDesc: 'Gây choáng (10% tỷ lệ tước vũ khí địch)', specialEffect: 'stun', effectChance: 10 },
  { id: 'art_mu_dau_mau', name: 'Mũ Đâu Mâu Vuốt Rồng', description: 'Tăng 20% Tốc độ, +15% Tránh né. Lối đánh du kích Dạ Trạch.', price: 50000, bonusSpdPc: 20, exclusiveTo: ['h3_2'], image: './items/artifacts/art_mu_dau_mau.png', effectDesc: 'Miễn sát thương (20% tỷ lệ né tránh hoàn toàn)', specialEffect: 'immune', effectChance: 20 },
  { id: 'art_hich_tam_thien', name: 'Hịch Lệnh Tam Thiên', description: 'Tăng 20% HP. Sức mạnh thu phục nhân tâm.', price: 50000, bonusHpPc: 20, exclusiveTo: ['h3_5'], image: './items/artifacts/art_hich_tam_thien.png', effectDesc: 'Hồi máu (Hồi 25% max HP sau khi đánh, 20% tỷ lệ)', specialEffect: 'heal', effectChance: 20 },
  { id: 'art_coc_bach_dang', name: 'Hải Trấn Mộc Cọc', description: 'Tăng 25% Phòng thủ, +1000 HP. Kế sách đánh giặc lẫy lừng.', price: 50000, bonusDefPc: 25, bonusHp: 1000, exclusiveTo: ['h4_1'], image: './items/artifacts/art_coc_bach_dang.png', effectDesc: 'Gây choáng (25% tỷ lệ khiến địch mắc kẹt)', specialEffect: 'stun', effectChance: 25 },
  { id: 'art_co_lau', name: 'Cờ Lau Vạn Thắng', description: 'Tăng 15% tất cả chỉ số. Lá cờ dẹp loạn 12 sứ quân.', price: 50000, bonusAtkPc: 15, bonusDefPc: 15, bonusHpPc: 15, bonusSpdPc: 15, exclusiveTo: ['h4_2'], image: './items/artifacts/art_co_lau.png', effectDesc: 'Thêm lượt đánh (25% tỷ lệ bách chiến bách thắng)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_ao_bao', name: 'Long Bào Thập Đạo', description: 'Tăng 25% HP, +200 Phòng thủ. Áo bào quyền lực của Lê Hoàn.', price: 50000, bonusHpPc: 25, bonusDef: 200, exclusiveTo: ['h4_3'], image: './items/artifacts/art_ao_bao.png', effectDesc: 'Miễn sát thương (25% tỷ lệ chân mệnh thiên tử)', specialEffect: 'immune', effectChance: 25 },
  { id: 'art_thieu_doi_do', name: 'Thăng Long Thiên Chiếu', description: 'Tăng 25% HP. Hào quang chiến lược ngàn năm.', price: 50000, bonusHpPc: 25, exclusiveTo: ['h5_1'], image: './items/artifacts/art_thieu_doi_do.png', effectDesc: 'Hồi máu (Hồi 30% max HP, 25% tỷ lệ)', specialEffect: 'heal', effectChance: 25 },
  { id: 'art_nam_quoc', name: 'Thiên Thư Trấn Quốc', description: 'Tăng 25% Tấn công, +500 Phòng thủ. Uy lực vô song từ Thần thơ.', price: 50000, bonusAtkPc: 25, bonusDef: 500, exclusiveTo: ['h5_2'], image: './items/artifacts/art_nam_quoc.png', effectDesc: 'Gây choáng (Bẻ gãy tâm lý, 25% tỷ lệ)', specialEffect: 'stun', effectChance: 25 },
  { id: 'art_tich_truong', name: 'Tích Trượng Thiền Môn', description: 'Tăng 20% Phòng thủ. Đứng sau quyền lực ôn hòa.', price: 50000, bonusDefPc: 20, exclusiveTo: ['h5_7'], image: './items/artifacts/art_tich_truong.png', effectDesc: 'Miễn sát thương (20% tỷ lệ hóa giải đòn đánh)', specialEffect: 'immune', effectChance: 20 },
  { id: 'art_guom_thai_su', name: 'Gươm Thái Sư', description: 'Tăng 25% Tấn công. Sự quyết đoán lạnh lùng.', price: 50000, bonusAtkPc: 25, exclusiveTo: ['h6_2'], image: './items/artifacts/art_guom_thai_su.png', effectDesc: 'Thêm lượt đánh (25% tỷ lệ chém không nương tay)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_binh_thu', name: 'Binh Thư Yếu Lược', description: 'Tăng 15% tất cả chỉ số. Binh thư trứ danh của Hưng Đạo Đại Vương.', price: 50000, bonusAtkPc: 15, bonusDefPc: 15, bonusHpPc: 15, bonusSpdPc: 10, exclusiveTo: ['h6_1'], image: './items/artifacts/art_binh_thu.png', effectDesc: 'Thêm lượt đánh (25% tỷ lệ nghệ thuật chiến tranh)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_thuan_thien', name: 'Thuận Thiên Kiếm', description: 'Tăng 25% HP, +500 Tấn công. Thanh bảo kiếm của Lê Lợi hội tụ tinh hoa.', price: 50000, bonusHpPc: 25, bonusAtk: 500, exclusiveTo: ['h8_1'], image: './items/artifacts/art_thuan_thien.png', effectDesc: 'Thêm lượt đánh (25% tỷ lệ thuận ý trời)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_ngu_but', name: 'Ngự Bút Côn Sơn', description: 'Tăng 20% Tấn công. Ngọn bút có sức mạnh vạn quân.', price: 50000, bonusAtkPc: 20, exclusiveTo: ['h8_2'], image: './items/artifacts/art_ngu_but.png', effectDesc: 'Gây choáng (Tâm công, 20% tỷ lệ)', specialEffect: 'stun', effectChance: 20 },
  { id: 'art_o_long_dao', name: 'Ô Long Đại Đao & Áo Bào', description: 'Tăng 25% Tấn công, +15 Tốc độ. Biểu tượng bách chiến bách thắng.', price: 50000, bonusAtkPc: 25, bonusSpd: 15, exclusiveTo: ['h10_1'], image: './items/artifacts/art_o_long_dao.png', effectDesc: 'Thêm lượt đánh (25% tỷ lệ hành quân thần tốc)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_linh_tuong_ki', name: 'Linh Tượng Kì', description: 'Tăng 20% Tấn công, +500 HP. Cờ lệnh gọi voi chiến.', price: 50000, bonusAtkPc: 20, bonusHp: 500, exclusiveTo: ['h10_6'], image: './items/artifacts/art_linh_tuong_ki.png', effectDesc: 'Gây choáng (20% tỷ lệ voi chà đạp địch)', specialEffect: 'stun', effectChance: 20 },
  // ── Thần Khí Chương 9 (Thời Nam - Bắc Triều & Trịnh - Nguyễn) ──
  { id: 'art_sam_trang_trinh', name: 'Thái Ất Thần Kinh', description: 'Tăng 25% HP, +20 Tốc độ. Sấm truyền vạch lối sinh tồn và định đoạt thế cuộc ba tập đoàn Mạc - Trịnh - Nguyễn.', price: 50000, bonusHpPc: 25, bonusSpd: 20, exclusiveTo: ['h9_1'], image: './items/artifacts/art_sam_trang_trinh.png', effectDesc: 'Thiên cơ bảo hộ (25% tỷ lệ miễn sát thương)', specialEffect: 'immune', effectChance: 25 },
  { id: 'art_dinh_nam_dao', name: 'Định Nam Đao', description: 'Tăng 20% Tấn công, +200 Phòng thủ. Đại đao truyền quốc huyền thoại nặng hơn 30kg của Mạc Thái Tổ Mạc Đăng Dung.', price: 50000, bonusAtkPc: 20, bonusDef: 200, exclusiveTo: ['h9_2'], image: './items/artifacts/art_dinh_nam_dao.png', effectDesc: 'Trảm tướng đoạt soái (20% tỷ lệ thêm lượt đánh)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_ho_phu_trinh_vuong', name: 'Trịnh Vương Tiết Chế Phù', description: 'Tăng 20% Tấn công, +15% Phòng thủ. Binh phù nắm quyền Nam Triều phò Lê diệt Mạc, hiệu lệnh ba quân.', price: 50000, bonusAtkPc: 20, bonusDefPc: 20, exclusiveTo: ['h9_13', 'h9_14'], image: './items/artifacts/art_ho_phu_trinh_vuong.png', effectDesc: 'Hiệu triệu tam quân (Hồi 25% max HP sau khi đánh, 20% tỷ lệ)', specialEffect: 'heal', effectChance: 20 },
  { id: 'art_luy_thay', name: 'Lũy Thầy Thiết Đồ', description: 'Tăng 20% Phòng thủ, +1500 HP. Kỳ quan chiến lũy bất khả xâm phạm của Đào Duy Từ dựng nên bờ cõi Đàng Trong.', price: 50000, bonusDefPc: 20, bonusHp: 1500, exclusiveTo: ['h9_29'], image: './items/artifacts/art_luy_thay.png', effectDesc: 'Thiết bích phòng ngự (20% tỷ lệ gây choáng địch)', specialEffect: 'stun', effectChance: 20 },
  { id: 'art_tui_bach_coc', name: 'Túi Bách Cốc', description: 'Tăng 15% HP. Túi hạt giống chứa mầm sống của vị thần nông nghiệp, rải mầm sống phục hồi sinh lực.', price: 50000, bonusHpPc: 15, exclusiveTo: ['h1_3'], image: './items/artifacts/art_tui_bach_coc.png', effectDesc: 'Hồi máu (Hồi 20% max HP, 15% tỷ lệ)', specialEffect: 'heal', effectChance: 15 },
  { id: 'art_thai_cuc_cuon', name: 'Thái Cực Cuốn Thư', description: 'Tăng 15% Phòng thủ. Cuốn thư chứa binh pháp và triết lý đất trời, dùng mưu trí khống chế kẻ địch.', price: 50000, bonusDefPc: 15, exclusiveTo: ['h1_4'], image: './items/artifacts/art_thai_cuc_cuon.png', effectDesc: 'Gây choáng (Giảm nhuệ khí địch, 15% tỷ lệ)', specialEffect: 'stun', effectChance: 15 },
  { id: 'art_gay_non_than', name: 'Gậy Phép - Nón Thần', description: 'Tăng 15% Phòng thủ, +1000 HP. Cắm gậy úp nón hóa thành quách phòng thủ kiên cố bảo vệ toàn quân.', price: 50000, bonusDefPc: 15, bonusHp: 1000, exclusiveTo: ['h1_6'], image: './items/artifacts/art_gay_non_than.png', effectDesc: 'Miễn sát thương (15% tỷ lệ tạo thành trì phòng thủ)', specialEffect: 'immune', effectChance: 15 },
  { id: 'art_dong_dinh_thuy_chau', name: 'Động Đình Thủy Châu', description: 'Tăng 10% Tấn công, +20 Tốc độ. Viên ngọc có khả năng thao túng nước, tạo ra băng giá diện rộng.', price: 50000, bonusAtkPc: 10, bonusSpd: 20, exclusiveTo: ['h1_7'], image: './items/artifacts/art_dong_dinh_thuy_chau.png', effectDesc: 'Gây choáng (Đóng băng kẻ địch, 10% tỷ lệ)', specialEffect: 'stun', effectChance: 10 },
  { id: 'art_boc_tram_trung', name: 'Bọc Trăm Trứng', description: 'Tăng 25% HP. Nguồn gốc nòi giống Tiên Rồng, triệu hồi tinh binh bảo vệ chủ tướng.', price: 50000, bonusHpPc: 25, exclusiveTo: ['h1_8'], image: './items/artifacts/art_boc_tram_trung.png', effectDesc: 'Hồi sinh với 30% HP (Kích hoạt 1 lần khi HP về 0)', specialEffect: 'revive', effectChance: 100 },
];


export const JADE_BY_RARITY = {
  [Rarity.UR]: 10,
  [Rarity.SSR]: 6,
  [Rarity.SR]: 4,
  [Rarity.R]: 2,
  [Rarity.C]: 1
};

export const SYNERGIES: Synergy[] = [
  {
    id: 'tram_trung_tram_con',
    name: 'Trăm Trứng Trăm Con',
    heroIds: ['h1_3', 'h1_4'],
    description: 'Lạc Long Quân và Âu Cơ cùng xuất trận. Lạc Long Quân +5 Tấn Công, Âu Cơ +5 Phòng Ngự.',
    applyEffect: (activeUnits, addLog) => {
      const llq = activeUnits.find(u => u.id.startsWith('h1_3_'));
      const auco = activeUnits.find(u => u.id.startsWith('h1_4_'));
      if (llq && auco) {
        llq.atk += 5;
        auco.def += 5;
        addLog('【Duyên Phận】 Trăm Trứng Trăm Con: Lạc Long Quân +5 ATK, Âu Cơ +5 DEF!');
      }
    }
  },
  {
    id: 'tinh_si',
    name: 'Tình Si',
    heroIds: ['e1_3', 'h1_13'],
    description: 'Nếu Trọng Thủy và Mị Châu cùng trên sân (bất kể phe), Mị Châu bị Mê Hoặc (đánh đồng đội). Trọng Thủy +3 ATK, +2 DEF.',
    applyEffect: (activeUnits, addLog) => {
      const tt = activeUnits.find(u => u.id.startsWith('e1_3_'));
      const mc = activeUnits.find(u => u.id.startsWith('h1_13_'));
      if (tt && mc) {
        mc.isCharmed = true;
        tt.atk += 3;
        tt.def += 2;
        addLog('【Duyên Phận】 Tình Si: Mị Châu bị mê hoặc! Trọng Thủy +3 ATK, +2 DEF!');
      }
    }
  },
  {
    id: 'hai_ba_trung',
    name: 'Chị Em Bất Khuất',
    heroIds: ['h2_1', 'h2_2'],
    description: 'Trưng Trắc và Trưng Nhị cùng xuất trận. Cả hai +5 ATK, +5 Tốc Độ.',
    applyEffect: (activeUnits, addLog) => {
      const tt = activeUnits.find(u => u.id.startsWith('h2_1_'));
      const tn = activeUnits.find(u => u.id.startsWith('h2_2_'));
      if (tt && tn) {
        tt.atk += 5; tt.spd += 5;
        tn.atk += 5; tn.spd += 5;
        addLog('【Duyên Phận】 Chị Em Bất Khuất: Hai Bà Trưng +5 ATK, +5 SPD!');
      }
    }
  },
  {
    id: 'hoi_nghi_binh_than',
    name: 'Hội Nghị Bình Than',
    heroIds: ['h6_2', 'h6_3'],
    description: 'Trần Thánh Tông và Trần Nhân Tông cùng xuất trận. Cả hai +10 Phòng Ngự.',
    applyEffect: (activeUnits, addLog) => {
      const tt = activeUnits.find(u => u.id.startsWith('h6_2_'));
      const tn = activeUnits.find(u => u.id.startsWith('h6_3_'));
      if (tt && tn) {
        tt.def += 10;
        tn.def += 10;
        addLog('【Duyên Phận】 Hội Nghị Bình Than: Thánh Tông & Nhân Tông +10 DEF!');
      }
    }
  },
  {
    id: 'dai_pha_quan_thanh',
    name: 'Đại Phá Quân Thanh',
    heroIds: ['h10_1', 'h10_2'],
    description: 'Quang Trung và Ngọc Hân cùng xuất trận. Quang Trung +10 ATK, Ngọc Hân +10 DEF & SPD.',
    applyEffect: (activeUnits, addLog) => {
      const qt = activeUnits.find(u => u.id.startsWith('h10_1_'));
      const nh = activeUnits.find(u => u.id.startsWith('h10_2_'));
      if (qt && nh) {
        qt.atk += 10;
        nh.def += 10; nh.spd += 10;
        addLog('【Duyên Phận】 Đại Phá Quân Thanh: Quang Trung +10 ATK, Ngọc Hân +10 DEF & SPD!');
      }
    }
  },
  {
    id: 'bach_dang_lich_su',
    name: 'Bạch Đằng Lịch Sử',
    heroIds: ['h4_1', 'h6_5'],
    description: 'Ngô Quyền và Trần Hưng Đạo cùng xuất trận. Cả hai +15 ATK.',
    applyEffect: (activeUnits, addLog) => {
      const nq = activeUnits.find(u => u.id.startsWith('h4_1_'));
      const thd = activeUnits.find(u => u.id.startsWith('h6_5_'));
      if (nq && thd) {
        nq.atk += 15;
        thd.atk += 15;
        addLog('【Duyên Phận】 Bạch Đằng Lịch Sử: Ngô Quyền & Trần Hưng Đạo +15 ATK!');
      }
    }
  },
  {
    id: 'khai_quoc_nha_ly',
    name: 'Khai Quốc Nhà Lý',
    heroIds: ['h5_1', 'h5_10'],
    description: 'Lý Công Uẩn và Sư Vạn Hạnh cùng xuất trận. Cả hai +5 ATK, +5 DEF.',
    applyEffect: (activeUnits, addLog) => {
      const lcu = activeUnits.find(u => u.id.startsWith('h5_1_'));
      const svh = activeUnits.find(u => u.id.startsWith('h5_10_'));
      if (lcu && svh) {
        lcu.atk += 5; lcu.def += 5;
        svh.atk += 5; svh.def += 5;
        addLog('【Duyên Phận】 Khai Quốc Nhà Lý: Lý Công Uẩn & Sư Vạn Hạnh +5 ATK/DEF!');
      }
    }
  },
  {
    id: 'thong_nhat_son_ha',
    name: 'Thống Nhất Sơn Hà',
    heroIds: ['h4_2', 'h4_5'],
    description: 'Đinh Bộ Lĩnh và Nguyễn Bặc cùng xuất trận. Đinh Bộ Lĩnh +15 ATK, Nguyễn Bặc +15 DEF.',
    applyEffect: (activeUnits, addLog) => {
      const dbl = activeUnits.find(u => u.id.startsWith('h4_2_'));
      const nb = activeUnits.find(u => u.id.startsWith('h4_5_'));
      if (dbl && nb) {
        dbl.atk += 15;
        nb.def += 15;
        addLog('【Duyên Phận】 Thống Nhất Sơn Hà: Đinh Bộ Lĩnh +15 ATK, Nguyễn Bặc +15 DEF!');
      }
    }
  },
  {
    id: 'bac_trieu_tru_cot',
    name: 'Bắc Triều Trụ Cột',
    heroIds: ['h9_2', 'h9_3'],
    description: 'Mạc Đăng Dung và Mạc Kính Điển cùng xuất trận. Cả hai +15 Tấn Công, +15 Phòng Thủ.',
    applyEffect: (activeUnits, addLog) => {
      const mdd = activeUnits.find(u => u.id.startsWith('h9_2_'));
      const mkd = activeUnits.find(u => u.id.startsWith('h9_3_'));
      if (mdd && mkd) {
        mdd.atk += 15; mdd.def += 15;
        mkd.atk += 15; mkd.def += 15;
        addLog('【Duyên Phận】 Bắc Triều Trụ Cột: Mạc Đăng Dung & Mạc Kính Điển +15 ATK/DEF!');
      }
    }
  },
  {
    id: 'le_trinh_trung_hung',
    name: 'Lê Trịnh Trung Hưng',
    heroIds: ['h9_12', 'h9_13'],
    description: 'Trịnh Kiểm và Trịnh Tùng cùng xuất trận. Cả hai +20 Tấn Công, +10 Tốc Độ.',
    applyEffect: (activeUnits, addLog) => {
      const tk = activeUnits.find(u => u.id.startsWith('h9_12_'));
      const tt = activeUnits.find(u => u.id.startsWith('h9_13_'));
      if (tk && tt) {
        tk.atk += 20; tk.spd += 10;
        tt.atk += 20; tt.spd += 10;
        addLog('【Duyên Phận】 Lê Trịnh Trung Hưng: Trịnh Kiểm & Trịnh Tùng +20 ATK, +10 SPD!');
      }
    }
  },
  {
    id: 'tu_tru_trieu_dinh',
    name: 'Tứ Trụ Triều Đinh',
    heroIds: ['h4_2', 'h4_4', 'h4_5'],
    description: 'Đinh Bộ Lĩnh, Đinh Điền, Nguyễn Bặc cùng xuất trận. Toàn đội được truyền lửa, +10% Tấn Công và +10% Phòng Thủ.',
    applyEffect: (activeUnits, addLog) => {
      const dbl = activeUnits.find(u => u.id.startsWith('h4_2_'));
      const dd = activeUnits.find(u => u.id.startsWith('h4_4_'));
      const nb = activeUnits.find(u => u.id.startsWith('h4_5_'));
      if (dbl && dd && nb) {
        activeUnits.forEach(u => {
          if (u.faction === dbl.faction) {
            u.atk = Math.floor(u.atk * 1.1);
            u.def = Math.floor(u.def * 1.1);
          }
        });
        addLog('【Duyên Phận】 Tứ Trụ Triều Đinh: Sức mạnh quân Đinh bùng nổ, toàn đội +10% ATK & DEF!');
      }
    }
  },
  {
    id: 'long_bao_khoac_vai',
    name: 'Long Bào Khoác Vai',
    heroIds: ['h4_16', 'h4_3'],
    description: 'Dương Vân Nga và Lê Hoàn cùng xuất trận. Lê Hoàn được bảo hộ, miễn nhiễm mọi hiệu ứng Xấu và +20 Tốc Độ.',
    applyEffect: (activeUnits, addLog) => {
      const dvn = activeUnits.find(u => u.id.startsWith('h4_16_'));
      const lh = activeUnits.find(u => u.id.startsWith('h4_3_'));
      if (dvn && lh) {
        lh.spd += 20;
        lh.isImmuneCC = true; lh.immuneCCTurns = 99;
        addLog('【Duyên Phận】 Long Bào Khoác Vai: Lê Hoàn nhận mệnh trời, +20 Tốc Độ và Miễn Khống Chế!');
      }
    }
  },
  {
    id: 'no_than_lien_chau',
    name: 'Nỏ Thần Liên Châu',
    heroIds: ['h1_10', 'h1_13'],
    description: 'An Dương Vương và Cao Lỗ cùng xuất trận. Xạ tiễn vô địch, An Dương Vương +20% Tấn Công, Cao Lỗ +20% Tấn Công.',
    applyEffect: (activeUnits, addLog) => {
      const adv = activeUnits.find(u => u.id.startsWith('h1_10_'));
      const cl = activeUnits.find(u => u.id.startsWith('h1_13_'));
      if (adv && cl) {
        adv.atk = Math.floor(adv.atk * 1.2);
        cl.atk = Math.floor(cl.atk * 1.2);
        addLog('【Duyên Phận】 Nỏ Thần Liên Châu: An Dương Vương & Cao Lỗ bạo kích, +20% ATK!');
      }
    }
  },
  {
    id: 'nu_tuong_tien_phong',
    name: 'Nữ Kiệt Tiên Phong',
    heroIds: ['h2_4', 'h2_5'],
    description: 'Lê Chân và Bát Nàn cùng xuất trận. Khí thế nữ kiệt, Lê Chân và Bát Nàn +15 Tốc Độ, +15 Tấn Công.',
    applyEffect: (activeUnits, addLog) => {
      const lc = activeUnits.find(u => u.id.startsWith('h2_4_'));
      const bn = activeUnits.find(u => u.id.startsWith('h2_5_'));
      if (lc && bn) {
        lc.spd += 15; lc.atk += 15;
        bn.spd += 15; bn.atk += 15;
        addLog('【Duyên Phận】 Nữ Kiệt Tiên Phong: Lê Chân & Bát Nàn xung phong, +15 SPD & ATK!');
      }
    }
  },
  {
    id: 'binh_chiem_phat_tong',
    name: 'Bình Chiêm Phạt Tống',
    heroIds: ['h5_2', 'h5_3'],
    description: 'Lý Thường Kiệt và Tôn Đản cùng xuất trận. Thế công như chẻ tre, Lý Thường Kiệt +20 ATK, Tôn Đản +20 DEF.',
    applyEffect: (activeUnits, addLog) => {
      const ltk = activeUnits.find(u => u.id.startsWith('h5_2_'));
      const td = activeUnits.find(u => u.id.startsWith('h5_3_'));
      if (ltk && td) {
        ltk.atk += 20;
        td.def += 20;
        addLog('【Duyên Phận】 Bình Chiêm Phạt Tống: Lý Thường Kiệt +20 ATK, Tôn Đản +20 DEF!');
      }
    }
  },
  {
    id: 'nhiem_chinh_y_lan',
    name: 'Ỷ Lan Nhiếp Chính',
    heroIds: ['h5_4', 'h5_5'],
    description: 'Ỷ Lan và Lý Nhân Tông cùng xuất trận. Ỷ Lan buff cho toàn đội +15% HP tối đa.',
    applyEffect: (activeUnits, addLog) => {
      const yl = activeUnits.find(u => u.id.startsWith('h5_4_'));
      const lnt = activeUnits.find(u => u.id.startsWith('h5_5_'));
      if (yl && lnt) {
        activeUnits.forEach(u => {
          if (u.faction === yl.faction) {
            u.maxHp = Math.floor(u.maxHp * 1.15);
            u.hp = Math.floor(u.hp * 1.15);
          }
        });
        addLog('【Duyên Phận】 Ỷ Lan Nhiếp Chính: Hậu phương vững chắc, toàn đội +15% HP tối đa!');
      }
    }
  },
  {
    id: 'hao_khi_dong_a',
    name: 'Hào Khí Đông A',
    heroIds: ['h6_5', 'h6_4', 'h6_6'],
    description: 'Trần Hưng Đạo, Trần Quang Khải, Trần Nhật Duật cùng xuất trận. Hào khí nhà Trần bừng sáng, toàn đội +15% mọi chỉ số.',
    applyEffect: (activeUnits, addLog) => {
      const thd = activeUnits.find(u => u.id.startsWith('h6_5_'));
      const tqk = activeUnits.find(u => u.id.startsWith('h6_4_'));
      const tnd = activeUnits.find(u => u.id.startsWith('h6_6_'));
      if (thd && tqk && tnd) {
        activeUnits.forEach(u => {
          if (u.faction === thd.faction) {
            u.atk = Math.floor(u.atk * 1.15);
            u.def = Math.floor(u.def * 1.15);
            u.spd = Math.floor(u.spd * 1.15);
            u.maxHp = Math.floor(u.maxHp * 1.15);
            u.hp = Math.floor(u.hp * 1.15);
          }
        });
        addLog('【Duyên Phận】 Hào Khí Đông A: Ba vị đại tướng hội tụ, toàn đội +15% mọi chỉ số!');
      }
    }
  },
  {
    id: 'yet_kieu_da_tuong',
    name: 'Yết Kiêu Dã Tượng',
    heroIds: ['h6_8', 'h6_9'],
    description: 'Yết Kiêu và Dã Tượng cùng xuất trận. Bộ đôi tùy tướng trung thành: Yết Kiêu +20 Tốc Độ, Dã Tượng +20 Phòng Thủ.',
    applyEffect: (activeUnits, addLog) => {
      const yk = activeUnits.find(u => u.id.startsWith('h6_8_'));
      const dt = activeUnits.find(u => u.id.startsWith('h6_9_'));
      if (yk && dt) {
        yk.spd += 20;
        dt.def += 20;
        addLog('【Duyên Phận】 Yết Kiêu Dã Tượng: Yết Kiêu +20 SPD, Dã Tượng +20 DEF!');
      }
    }
  },
  {
    id: 'sat_that',
    name: 'Sát Thát',
    heroIds: ['h6_10', 'h6_7'],
    description: 'Trần Bình Trọng và Phạm Ngũ Lão cùng xuất trận. Ý chí diệt giặc: Cả hai +20% Tấn Công và +10 Tốc Độ.',
    applyEffect: (activeUnits, addLog) => {
      const tbt = activeUnits.find(u => u.id.startsWith('h6_10_'));
      const pnl = activeUnits.find(u => u.id.startsWith('h6_7_'));
      if (tbt && pnl) {
        tbt.atk = Math.floor(tbt.atk * 1.2); tbt.spd += 10;
        pnl.atk = Math.floor(pnl.atk * 1.2); pnl.spd += 10;
        addLog('【Duyên Phận】 Sát Thát: Trần Bình Trọng & Phạm Ngũ Lão dâng cao ý chí, +20% ATK, +10 SPD!');
      }
    }
  },
  {
    id: 'pha_cuong_dich',
    name: 'Phá Cường Địch Báo Hoàng Ân',
    heroIds: ['h6_11', 'h6_5'],
    description: 'Trần Quốc Toản và Trần Hưng Đạo cùng xuất trận. Hoài Văn Hầu xông pha: +30% Tấn Công.',
    applyEffect: (activeUnits, addLog) => {
      const tqt = activeUnits.find(u => u.id.startsWith('h6_11_'));
      const thd = activeUnits.find(u => u.id.startsWith('h6_5_'));
      if (tqt && thd) {
        tqt.atk = Math.floor(tqt.atk * 1.3);
        addLog('【Duyên Phận】 Báo Hoàng Ân: Trần Quốc Toản xông pha chiến trận, +30% ATK!');
      }
    }
  },
  {
    id: 'khai_quoc_nha_tran',
    name: 'Khai Quốc Nhà Trần',
    heroIds: ['h6_1', 'h6_12'],
    description: 'Trần Thái Tông và Trần Thủ Độ cùng xuất trận. Vua tôi đồng lòng: Cả hai +15 ATK, +15 DEF.',
    applyEffect: (activeUnits, addLog) => {
      const ttt = activeUnits.find(u => u.id.startsWith('h6_1_'));
      const ttd = activeUnits.find(u => u.id.startsWith('h6_12_'));
      if (ttt && ttd) {
        ttt.atk += 15; ttt.def += 15;
        ttd.atk += 15; ttd.def += 15;
        addLog('【Duyên Phận】 Khai Quốc Nhà Trần: Thái Tông & Thủ Độ +15 ATK & DEF!');
      }
    }
  },
  {
    id: 'binh_ngo_dai_cao',
    name: 'Bình Ngô Đại Cáo',
    heroIds: ['h8_1', 'h8_2'],
    description: 'Lê Lợi và Nguyễn Trãi cùng xuất trận. Văn võ song toàn: Lê Lợi +20 ATK, Nguyễn Trãi +20 Tốc Độ.',
    applyEffect: (activeUnits, addLog) => {
      const ll = activeUnits.find(u => u.id.startsWith('h8_1_'));
      const nt = activeUnits.find(u => u.id.startsWith('h8_2_'));
      if (ll && nt) {
        ll.atk += 20;
        nt.spd += 20;
        addLog('【Duyên Phận】 Bình Ngô Đại Cáo: Lê Lợi +20 ATK, Nguyễn Trãi +20 Tốc Độ!');
      }
    }
  },
  {
    id: 'lieu_minh_cuu_chua',
    name: 'Liều Mình Cứu Chúa',
    heroIds: ['h8_1', 'h8_3'],
    description: 'Lê Lợi và Lê Lai cùng xuất trận. Lê Lai đỡ đòn thay Lê Lợi (Lê Lai +30% HP tối đa), Lê Lợi +15% Tấn Công.',
    applyEffect: (activeUnits, addLog) => {
      const ll = activeUnits.find(u => u.id.startsWith('h8_1_'));
      const llai = activeUnits.find(u => u.id.startsWith('h8_3_'));
      if (ll && llai) {
        ll.atk = Math.floor(ll.atk * 1.15);
        llai.maxHp = Math.floor(llai.maxHp * 1.3);
        llai.hp = Math.floor(llai.hp * 1.3);
        addLog('【Duyên Phận】 Liều Mình Cứu Chúa: Lê Lai +30% HP bảo vệ Lê Lợi, Lê Lợi +15% ATK!');
      }
    }
  },
  {
    id: 'lam_son_tu_nghia',
    name: 'Lam Sơn Tụ Nghĩa',
    heroIds: ['h8_4', 'h8_8'],
    description: 'Trần Nguyên Hãn và Nguyễn Chích cùng xuất trận. Hai danh tướng kiệt xuất: Cả hai +15% Tấn Công.',
    applyEffect: (activeUnits, addLog) => {
      const tnh = activeUnits.find(u => u.id.startsWith('h8_4_'));
      const nc = activeUnits.find(u => u.id.startsWith('h8_8_'));
      if (tnh && nc) {
        tnh.atk = Math.floor(tnh.atk * 1.15);
        nc.atk = Math.floor(nc.atk * 1.15);
        addLog('【Duyên Phận】 Lam Sơn Tụ Nghĩa: Trần Nguyên Hãn & Nguyễn Chích +15% ATK!');
      }
    }
  },
  {
    id: 'tay_son_tam_kiet',
    name: 'Tây Sơn Tam Kiệt',
    heroIds: ['h10_1', 'h10_4', 'h10_5'],
    description: 'Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ cùng xuất trận. Uy chấn thiên hạ, toàn đội +20% Tấn Công.',
    applyEffect: (activeUnits, addLog) => {
      const qt = activeUnits.find(u => u.id.startsWith('h10_1_'));
      const nn = activeUnits.find(u => u.id.startsWith('h10_4_'));
      const nl = activeUnits.find(u => u.id.startsWith('h10_5_'));
      if (qt && nn && nl) {
        activeUnits.forEach(u => {
          if (u.faction === qt.faction) {
            u.atk = Math.floor(u.atk * 1.2);
          }
        });
        addLog('【Duyên Phận】 Tây Sơn Tam Kiệt: Ba anh em xuất trận, toàn đội +20% ATK!');
      }
    }
  },
  {
    id: 'tay_son_nu_tuong',
    name: 'Tây Sơn Nữ Kiệt',
    heroIds: ['h10_3', 'h10_2'],
    description: 'Bùi Thị Xuân và Ngọc Hân cùng xuất trận. Bùi Thị Xuân +20% Tấn Công, Ngọc Hân +20% HP.',
    applyEffect: (activeUnits, addLog) => {
      const btx = activeUnits.find(u => u.id.startsWith('h10_3_'));
      const nh = activeUnits.find(u => u.id.startsWith('h10_2_'));
      if (btx && nh) {
        btx.atk = Math.floor(btx.atk * 1.2);
        nh.maxHp = Math.floor(nh.maxHp * 1.2);
        nh.hp = Math.floor(nh.hp * 1.2);
        addLog('【Duyên Phận】 Tây Sơn Nữ Kiệt: Bùi Thị Xuân +20% ATK, Ngọc Hân +20% HP!');
      }
    }
  },
  {
    id: 'tay_son_song_tuan',
    name: 'Tây Sơn Song Tuấn',
    heroIds: ['h10_6', 'h10_7'],
    description: 'Trần Quang Diệu và Vũ Văn Dũng cùng xuất trận. Đôi bạn sinh tử: Cả hai +15% Tấn Công, +15% Phòng Thủ.',
    applyEffect: (activeUnits, addLog) => {
      const tqd = activeUnits.find(u => u.id.startsWith('h10_6_'));
      const vvd = activeUnits.find(u => u.id.startsWith('h10_7_'));
      if (tqd && vvd) {
        tqd.atk = Math.floor(tqd.atk * 1.15); tqd.def = Math.floor(tqd.def * 1.15);
        vvd.atk = Math.floor(vvd.atk * 1.15); vvd.def = Math.floor(vvd.def * 1.15);
        addLog('【Duyên Phận】 Tây Sơn Song Tuấn: Trần Quang Diệu & Vũ Văn Dũng +15% ATK & DEF!');
      }
    }
  },
  {
    id: 'chu_dong_tu_tien_dung',
    name: 'Chữ Đồng Tử - Tiên Dung',
    heroIds: ['h1_6', 'h1_12'],
    description: 'Chử Đồng Tử và Tiên Dung cùng xuất trận. Mối tình bất tử, +20% HP tối đa cho toàn đội.',
    applyEffect: (activeUnits, addLog) => {
      const cdt = activeUnits.find(u => u.id.startsWith('h1_6_'));
      const td = activeUnits.find(u => u.id.startsWith('h1_12_'));
      if (cdt && td) {
        activeUnits.forEach(u => {
          if (u.faction === cdt.faction) {
            u.maxHp = Math.floor(u.maxHp * 1.2); u.hp = Math.floor(u.hp * 1.2);
          }
        });
        addLog('【Duyên Phận】 Chử Đồng Tử - Tiên Dung: Lan tỏa phúc lành, toàn đội +20% HP tối đa!');
      }
    }
  }
];

