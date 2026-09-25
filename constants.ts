
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
  "dao_duy_tu",
  "de_lai",
  "de_nghi",
  "dinh_bo_linh",
  "dinh_dien",
  "dinh_le",
  "ho_nguyen_trung",
  "ho_quy_ly",
  "khuc_thua_du",
  "kinh_duong_vuong",
  "lac_long_quan",
  "le_hoan",
  "le_lai",
  "le_loi",
  "le_sat",
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
  "nguyen_bac",
  "nguyen_binh_khiem",
  "nguyen_hoang",
  "nguyen_hue",
  "nguyen_huu_canh",
  "nguyen_huu_tien",
  "nguyen_kim",
  "nguyen_kinh",
  "nguyen_phi_y_lan",
  "nguyen_phuc_chu",
  "nguyen_phuc_nguyen",
  "nguyen_phuc_tan",
  "nguyen_trai",
  "nguyen_xi",
  "pham_ngu_lao",
  "phung_hung",
  "thien_su_van_hanh",
  "to_hien_thanh",
  "tran_hung_dao",
  "tran_khanh_du",
  "tran_nguyen_han",
  "tran_nhan_tong",
  "tran_nhat_duat",
  "tran_quang_dieu",
  "tran_quang_khai",
  "tran_quoc_tuan",
  "tran_thai_tong",
  "tran_thanh_tong",
  "tran_thi_dung",
  "tran_thu_do",
  "tran_tu_khanh",
  "trieu_quang_phuc",
  "trieu_thi_trinh",
  "trinh_kiem",
  "trinh_tu",
  "trinh_tung",
  "trung_nhi",
  "trung_trac"
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
  createHero3('h1_1','Kinh Dương Vương',94,1,'ally','Thủy tổ',
    'Các vị thủy tổ khai phá và trị vì thiên hạ.',
    'Xích Quỷ Khai Thiên','Tụ linh khí nguồn cội, hồi 20% thanh nộ khí và tạo Khiên ảo bằng 15% máu tối đa cho toàn bộ đội hình phe ta trong 2 hiệp.',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'shield', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h1_2','Lạc Long Quân',92,1,'ally','Long Vương',
    'Các vị thủy tổ khai phá và trị vì thiên hạ.',
    'Thủy Phủ Long Uy','Gây 100% sát thương phép lên toàn đội hình địch. Có 25% tỷ lệ khiến toàn bộ kẻ địch bị Choáng trong 1 hiệp.',
    { role:'Pháp sư', targetScope:'all', skillEffect:'stun', skillEffectChance:25, skillDmgMult:10 }),

  createHero3('h1_3','Đế Lai',85,1,'ally','Danh Tướng',
    'Các bậc thượng thần trong Tứ bất tử, đế vương và nhân vật huyền thoại tối cao.',
    'Đế Vương Tuần Du','Gây 135% sát thương vật lý lên 3 tướng địch hàng trên. Có 20% tỷ lệ làm giảm 10% Tấn công của địch trong 1 hiệp.',
    { role:'Chiến tướng', targetScope:'front_row', skillEffect:'atk_down', skillEffectChance:20, skillDmgMult:13.5 }),
  createHero3('h1_4','Đế Nghi',84,1,'ally','Danh Tướng',
    'Các bậc thượng thần trong Tứ bất tử, đế vương và nhân vật huyền thoại tối cao.',
    'Phân Định Thiên Hạ','Gây 85% sát thương phép lên toàn đội hình địch. Có 20% tỷ lệ làm giảm 15% Kháng phép của địch trong 2 hiệp.',
    { role:'Pháp sư', targetScope:'all', skillEffect:'armor_break', skillEffectChance:20, skillDmgMult:8.5 }),
  createHero3('h1_5','Thánh Gióng',88,1,'ally','Thiên Vương',
    'Các bậc thượng thần trong Tứ bất tử, đế vương và nhân vật huyền thoại tối cao.',
    'Xung Thiên Thiết Kỵ','Gây 220% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh cộng sẵn 20% tỷ lệ bạo kích.',
    { role:'Tiên phong', targetScope:'single', skillEffect:'crit_up', skillEffectChance:100, skillDmgMult:22 }),
  createHero3('h1_6','Chử Đồng Tử',82,1,'ally','Thánh nhân',
    'Các bậc thượng thần trong Tứ bất tử, đế vương và nhân vật huyền thoại tối cao.',
    'Tiên Cảnh Độ Thế','Hồi máu đơn bằng 18% máu tối đa cho đồng minh yếu máu nhất, đồng thời tạo một lớp Khiên ảo tương đương 15% máu tối đa, duy trì 2 hiệp.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'shield', skillEffectChance:100, skillDmgMult:0 }),

  createHero3('h1_7','Thần Long Nữ',76,1,'ally','Tiên nữ',
    'Các vị mẫu nghi, chủ tướng và anh hùng có công dựng nước/giữ nước thực tế.',
    'Động Đình Mẫu Nghi','Hồi máu bằng 12% máu tối đa cho đồng minh có HP thấp nhất, đồng thời cấp hiệu ứng Miễn khống cho đồng minh đó trong 1 hiệp (tỷ lệ 25%).',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'immune_cc', skillEffectChance:25, skillDmgMult:0 }),
  createHero3('h1_8','Âu Cơ',75,1,'ally','Tiên mẫu',
    'Các vị mẫu nghi, chủ tướng và anh hùng có công dựng nước/giữ nước thực tế.',
    'Bọc Trăm Trứng Thiêng','Hồi máu diện rộng cho toàn đội bằng 8% máu tối đa của bà. Có 20% tỷ lệ Thanh tẩy 1 trạng thái bất lợi cho toàn đội.',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'cleanse', skillEffectChance:20, skillDmgMult:0 }),
  createHero3('h1_9','Sơn Tinh',78,1,'ally','Thần núi',
    'Các vị mẫu nghi, chủ tướng và anh hùng có công dựng nước/giữ nước thực tế.',
    'Uy Trấn Tản Viên','Gây 120% sát thương vật lý lên 3 tướng địch hàng trên. Bản thân nhận lớp Khiên ảo bằng 15% máu tối đa trong 2 hiệp.',
    { role:'Khống chế', targetScope:'front_row', skillEffect:'shield', skillEffectChance:100, skillDmgMult:12 }),
  createHero3('h1_10','An Dương Vương',77,1,'ally','Vua nước Âu Lạc',
    'Các vị mẫu nghi, chủ tướng và anh hùng có công dựng nước/giữ nước thực tế.',
    'Linh Quang Kim Trảo','Gây 145% sát thương vật lý lên 1 hàng dọc. Đòn đánh bỏ qua 15% giáp của mục tiêu.',
    { role:'Cung thủ', targetScope:'column', skillEffect:'armor_pen', skillEffectChance:100, skillDmgMult:14.5 }),
  createHero3('h1_11','Lang Liêu',72,1,'ally','Hoàng tử',
    'Các vị mẫu nghi, chủ tướng và anh hùng có công dựng nước/giữ nước thực tế.',
    'Bánh Chưng Đất Trời','Hồi 15% Nộ khí cho tướng đồng minh có Nộ khí thấp nhất. Tăng 12% Tấn công cho tướng đó trong 2 hiệp.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h1_12','Tiên Dung',71,1,'ally','Công chúa',
    'Các vị mẫu nghi, chủ tướng và anh hùng có công dựng nước/giữ nước thực tế.',
    'Phá Lệ Vương Triều','Gây 115% sát thương phép lên 3 tướng địch hàng trước. Có 15% tỷ lệ làm giảm 12% Tốc độ của địch trong 2 hiệp.',
    { role:'Pháp sư', targetScope:'front_row', skillEffect:'slow', skillEffectChance:15, skillDmgMult:11.5 }),

  createHero3('h1_13','Cao Lỗ',68,1,'ally','Thần cung',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Nỏ Thần Liên Châu','Gây 95% sát thương vật lý lên 3 tướng địch hàng trên. Có 10% tỷ lệ gây Chảy máu trong 1 hiệp.',
    { role:'Cung thủ', targetScope:'front_row', skillEffect:'bleed', skillEffectChance:10, skillDmgMult:9.5 }),
  createHero3('h1_14','Lý Ông Trọng',69,1,'ally','Đại tướng',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Tráng Sĩ Khổng Lồ','Gây 135% sát thương vật lý lên 1 mục tiêu hàng trên. Tăng 10% Phòng thủ bản thân trong 1 hiệp.',
    { role:'Đấu sĩ', targetScope:'single', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:13.5 }),
  createHero3('h1_15','Lữ Gia',65,1,'ally','Tướng quân',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Sứ Mệnh Trấn Biên','Gây 110% sát thương vật lý lên 1 hàng dọc. Tăng 8% Tấn công bản thân trong 1 hiệp.',
    { role:'Chiến tướng', targetScope:'column', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:11 }),
  createHero3('h1_16','Hùng Duệ Vương',62,1,'ally','Quốc Vương',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Thoái Vị Nhường Hiền','Tăng 8% Phòng thủ cho toàn bộ đồng minh hàng trước trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'front_row', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h1_17','Mai An Tiêm',59,1,'ally','Hoàng thân',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Dưa Đỏ Hoang Đảo','Gây 110% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân tự hồi phục lượng máu bằng 5% máu tối đa.',
    { role:'Tiên phong', targetScope:'single', skillEffect:'heal', skillEffectChance:100, skillDmgMult:11 }),
  createHero3('h1_18','Mỵ Nương',55,1,'ally','Công chúa',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Hồng Nhan Sắc Nước','Gây 40% sát thương phép lên toàn địch. Có 8% tỷ lệ giảm 8% Công của địch.',
    { role:'Khống chế', targetScope:'all', skillEffect:'atk_down', skillEffectChance:8, skillDmgMult:4 }),
  createHero3('h1_19','Mỵ Châu',52,1,'ally','Công chúa',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Dấu Lông Ngỗng','Gây 80% sát thương vật lý lên 1 mục tiêu. Có 8% tỷ lệ làm giảm 8% Né tránh của mục tiêu.',
    { role:'Khống chế', targetScope:'single', skillEffect:'none', skillEffectChance:8, skillDmgMult:8 }),
  createHero3('h1_20','Nồi Hầu',50,1,'ally','Hào kiệt',
    'Các danh tướng thực tế cấp thấp, hoàng tử/công chúa hoặc nhân vật đời thường.',
    'Lạc Tướng Cố Thủ','Gây 90% sát thương vật lý lên 1 hàng dọc.',
    { role:'Tiên phong', targetScope:'column', skillEffect:'none', skillEffectChance:0, skillDmgMult:9 }),
// ═══════════════════════════════════════ CHƯƠNG 2 ═══════════════════════════════════════
  createHero3('h2_1','Trưng Trắc',85,2,'ally','Nữ Vương',
    'Các nữ vương, danh tướng xuất chúng.',
    'Hát Môn Thề Sông Núi','Gây 80% sát thương phép lên toàn đội hình địch, đồng thời tăng 15% Tấn công cho toàn bộ đội hình phe ta trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:8 }),
  createHero3('h2_2','Trưng Nhị',84,2,'ally','Nữ tướng',
    'Các nữ vương, danh tướng xuất chúng.',
    'Bình Khôi Phá Trận','Gây 135% sát thương vật lý lên 3 tướng địch hàng trước. Có 20% tỷ lệ khiến mục tiêu bị Choáng trong 1 hiệp.',
    { role:'Tiên phong', targetScope:'front_row', skillEffect:'stun', skillEffectChance:20, skillDmgMult:13.5 }),
  createHero3('h2_3','Triệu Thị Trinh',88,2,'ally','Nữ tướng',
    'Các nữ vương, danh tướng xuất chúng.',
    'Lệ Hải Vồ Phong','Gây 220% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh được cộng sẵn 20% tỷ lệ bạo kích và bỏ qua 15% giáp của địch.',
    { role:'Sát thủ', targetScope:'single', skillEffect:'armor_pen', skillEffectChance:100, skillDmgMult:22 }),

  createHero3('h2_4','Lê Chân',76,2,'ally','Nữ tướng',
    'Các nữ tướng tiên phong, thân mẫu và hào trưởng có công lớn.',
    'Thánh Chân Thủy Trận','Gây 120% sát thương vật lý lên 3 tướng địch hàng trên. Có 15% tỷ lệ làm giảm 10% Tốc độ của địch trong 1 hiệp.',
    { role:'Pháp sư', targetScope:'front_row', skillEffect:'slow', skillEffectChance:15, skillDmgMult:12 }),
  createHero3('h2_5','Man Thiện',75,2,'ally','Thánh Mẫu',
    'Các nữ tướng tiên phong, thân mẫu và hào trưởng có công lớn.',
    'Hậu Phương Vững Chắc','Hồi phục máu bằng 12% máu tối đa cho toàn đội, đồng thời cấp hiệu ứng Miễn khống cho 1 tướng đồng minh có máu thấp nhất trong 1 hiệp (tỷ lệ 25%).',
    { role:'Hỗ trợ', targetScope:'all', skillEffect:'immune_cc', skillEffectChance:25, skillDmgMult:0 }),
  createHero3('h2_6','Thục Nương',78,2,'ally','Nữ tướng',
    'Các nữ tướng tiên phong, thân mẫu và hào trưởng có công lớn.',
    'Song Kiếm Phá Vây','Gây 145% sát thương vật lý lên 1 hàng dọc. Có 15% tỷ lệ gây Chảy máu trong 2 hiệp.',
    { role:'Sát thủ', targetScope:'column', skillEffect:'bleed', skillEffectChance:15, skillDmgMult:14.5 }),
  createHero3('h2_7','Thánh Thiên',77,2,'ally','Nữ tướng',
    'Các nữ tướng tiên phong, thân mẫu và hào trưởng có công lớn.',
    'Hợp Phố Trấn Thủ','Gây 120% sát thương vật lý lên 3 tướng địch hàng trên. Bản thân nhận lớp Khiên ảo bằng 15% máu tối đa trong 2 hiệp.',
    { role:'Chiến tướng', targetScope:'front_row', skillEffect:'shield', skillEffectChance:100, skillDmgMult:12 }),
  createHero3('h2_8','Phùng Thị Chính',79,2,'ally','Nữ tướng',
    'Các nữ tướng tiên phong, thân mẫu và hào trưởng có công lớn.',
    'Tử Chiến Sinh Môn','Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân tự hiến tế 8% máu hiện tại để nhận trạng thái Phản sát thương (phản lại 15% sát thương nhận vào) trong 2 hiệp.',
    { role:'Tiên phong', targetScope:'single', skillEffect:'reflect', skillEffectChance:100, skillDmgMult:18 }),

  createHero3('h2_9','Triệu Quốc Đạt',68,2,'ally','Tướng quân',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Cửu Chân Khởi Nghĩa','Gây 95% sát thương vật lý lên 3 tướng địch hàng trên. Tăng 8% Phòng thủ cho toàn đội hàng trước trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'front_row', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:9.5 }),
  createHero3('h2_10','Lương Long',67,2,'ally','Thủ lĩnh',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Liên Kết Bộ Tộc','Hồi 10% Nộ khí cho tướng đồng minh có Nộ khí thấp nhất, đồng thời tăng 8% Tấn công cho tướng đó trong 1 hiệp.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h2_11','Thiều Hoa',65,2,'ally','Nữ tướng',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Hầu Quân Nghi Binh','Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới. Có 10% tỷ lệ làm giảm 8% Né tránh của địch.',
    { role:'Cung thủ', targetScope:'back_row', skillEffect:'none', skillEffectChance:10, skillDmgMult:9.5 }),
  createHero3('h2_12','Xuân Nương',66,2,'ally','Nữ tướng',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Tử Thủ Quân Lương','Gây 110% sát thương vật lý lên 1 hàng dọc. Tăng 8% Tấn công bản thân trong 1 hiệp.',
    { role:'Chiến tướng', targetScope:'column', skillEffect:'atk_up', skillEffectChance:100, skillDmgMult:11 }),
  createHero3('h2_13','Phật Nguyệt',64,2,'ally','Nữ tướng',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Thủy Trận Uy Chấn','Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới. Có 10% tỷ lệ làm giảm 8% Tốc độ của địch trong 1 hiệp.',
    { role:'Pháp sư', targetScope:'back_row', skillEffect:'slow', skillEffectChance:10, skillDmgMult:9.5 }),
  createHero3('h2_14','Lê Thị Hoa',63,2,'ally','Nữ tướng',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Sơn Lũy Kiên Cố','Tạo khiên ảo bằng 10% HP tối đa cho 1 tướng đồng minh hàng trên yếu máu nhất.',
    { role:'Hỗ trợ', targetScope:'single', skillEffect:'shield', skillEffectChance:100, skillDmgMult:0 }),
  createHero3('h2_15','Quách A',62,2,'ally','Nữ tướng',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Thần Tiễn Bách Phát','Gây 135% sát thương vật lý lên 1 mục tiêu hàng trên. Có 8% tỷ lệ bạo kích cộng thêm.',
    { role:'Cung thủ', targetScope:'single', skillEffect:'crit_up', skillEffectChance:8, skillDmgMult:13.5 }),
  createHero3('h2_16','Chu Đạt',58,2,'ally','Hào kiệt',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Cư Phong Phản Kháng','Gây 90% sát thương vật lý lên 1 hàng dọc. Tự hồi phục 5% máu tối đa.',
    { role:'Đấu sĩ', targetScope:'column', skillEffect:'heal', skillEffectChance:100, skillDmgMult:9 }),
  createHero3('h2_17','Lý Tiến',55,2,'ally','Hào kiệt',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Ngoại Giao Thuyết Phục','Gây 40% sát thương phép lên toàn đội hình địch. Có 8% tỷ lệ xóa 1 hiệu ứng có lợi của địch.',
    { role:'Khống chế', targetScope:'all', skillEffect:'none', skillEffectChance:8, skillDmgMult:4 }),
  createHero3('h2_18','Lý Trường Nhân',54,2,'ally','Tướng quân',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Giao Châu Tự Chủ','Gây 80% sát thương vật lý ngẫu nhiên 2 mục tiêu. Tăng 5% Phòng thủ bản thân trong 1 hiệp.',
    { role:'Đấu sĩ', targetScope:'front_row', skillEffect:'def_up', skillEffectChance:100, skillDmgMult:8 }),
  createHero3('h2_19','Lý Thúc Hiến',52,2,'ally','Hào kiệt',
    'Các tướng lĩnh phụ tá, nghĩa quân và hào trưởng địa phương.',
    'Phục Kích Biên Thùy','Gây 90% sát thương vật lý lên 1 hàng dọc.',
    { role:'Tiên phong', targetScope:'column', skillEffect:'none', skillEffectChance:0, skillDmgMult:9 }),
// ═══════════════════════════════════════ CHƯƠNG 3 ═══════════════════════════════════════
  createHero2('h3_1', 'Lý Bí', 80,3,'ally','Lý Nam Đế',
    'Lý Bí (Lý Nam Đế) là người khởi xướng cuộc khởi nghĩa đánh đuổi nhà Lương năm 544, lập ra nhà nước Vạn Xuân - nhà nước độc lập đầu tiên sau hơn 500 năm Bắc thuộc. Ông xưng Đế, đặt niên hiệu Thiên Đức, mở ra thời kỳ lịch sử mới cho dân tộc.',
    'Vạn Xuân Khai Quốc','Tuyên bố độc lập cho toàn đội (+10% Tấn công, +20 Nhuệ khí).'),
  createHero2('h3_2','Triệu Quang Phục',82,3,'ally','Triệu Việt Vương',
    'Triệu Quang Phục là danh tướng tiếp nối sự nghiệp của Lý Bí sau khi ông bị nhà Lương đánh bại. Ông ẩn náu trong đầm Dạ Trạch, dùng chiến thuật du kích chống giặc suốt nhiều năm, cuối cùng đánh đuổi quân Lương, lên ngôi vua, được dân gọi là Triệu Việt Vương.',
    'Dạ Trạch Tàng Hình','Ẩn mình trong đầm lầy, gây sát thương (164% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h3_3', 'Mai Thúc Loan', 80,3,'ally','Mai Hắc Đế',
    'Mai Thúc Loan (Mai Hắc Đế) lãnh đạo cuộc khởi nghĩa chống nhà Đường năm 722, xưng đế ở Hoan Châu (Nghệ An). Ông là một trong những người Việt đầu tiên dám xưng Đế đối chọi với thiên tử phương Bắc. Tuy thất bại nhưng khởi nghĩa của ông để lại dấu ấn sâu đậm trong lịch sử chống Bắc thuộc.',
    'Hắc Đế Xuất Thế','Khí thế hắc long cho toàn đội (+10% Tấn công, +20 Nhuệ khí).'),
  createHero2('h3_4','Phùng Hưng',81,3,'ally','Bố Cái Đại Vương',
    'Phùng Hưng (Bố Cái Đại Vương) lãnh đạo cuộc khởi nghĩa chống nhà Đường (791-802), tự xưng là Đô Quân, sau được dân phong là Bố Cái Đại Vương. Ông được nhân dân kính trọng như cha mẹ - "bố" nghĩa là cha, "cái" nghĩa là mẹ.',
    'Bố Cái Uy Linh','Tỏa uy lực người cha dân tộc cho 1 đồng minh (Hồi 16% Máu tối đa). Đồng thời: +25% Phòng thủ.'),
  createHero2('h3_5', 'Khúc Thừa Dụ', 80,3,'ally','Tiết Độ Sứ',
    'Khúc Thừa Dụ là người khởi đầu thời kỳ tự chủ của Việt Nam (905-938). Ông nhân nhà Đường suy yếu, chiếm lấy phủ thành Tống Bình, tự xưng Tiết Độ Sứ, thoát khỏi sự cai trị trực tiếp của phương Bắc và thiết lập nền hành chính riêng.',
    'Tự Chủ Khai Đạo','Mở đường độc lập, gây sát thương (154% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h3_6','Phạm Tu',72,3,'ally','Tướng quân',
    'Phạm Tu là danh tướng thời Lý Nam Đế, người đánh tan giặc Lâm Ấp từ phương nam. Ông được coi là thủy tổ của nghề võ Việt Nam, được thờ tại làng Thanh Liệt (Hà Nội).',
    'Nam Chinh Phá Địch','Chủ động tấn công, gây sát thương (144% Tấn công) lớn cho quân xâm lược. (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('h3_7','Khúc Hạo',61,3,'ally','Tiết Độ Sứ',
    'Khúc Hạo là con trai Khúc Thừa Dụ, tiếp tục sự nghiệp xây dựng nền tự chủ. Ông thực hiện nhiều cải cách tiến bộ: giảm thuế, bãi bỏ lao dịch, cải tổ hành chính địa phương, được sử sách đánh giá là người "khoan hòa, thuần hậu".',
    'Khoan Dân Chính Sách','Nâng cao lòng dân cho 1 đồng minh (Hồi 12% Máu tối đa). Đồng thời: +15% Phòng thủ.'),
  createHero2('h3_8','Dương Đình Nghệ',74,3,'ally','Tiết Độ Sứ',
    'Dương Đình Nghệ là vị tướng đánh đuổi quân Nam Hán năm 931, giành lại quyền tự chủ sau khi họ Khúc mất. Ông là cha vợ của Ngô Quyền. Ông bị tên phản thần Kiều Công Tiễn giết chết năm 937, chính điều này khiến Ngô Quyền nổi dậy đánh trận Bạch Đằng lịch sử.',
    'Phục Quốc Chinh Đông','Tập hợp nghĩa sĩ, phá tan phòng tuyến của quân xâm lược. (+15% Phòng thủ).'),
  createHero2('h3_9','Triệu Túc',70,3,'ally','Lão Tướng',
    'Lão tướng dũng cảm thời kỳ chống Bắc thuộc, chuyên tấn công cận chiến mãnh liệt.',
    'Dũng Tướng Phá Thành','Phá tường thành bằng sức mạnh thuần túy. (+10% Tấn công).'),
  createHero2('h3_10','Lý Phật Tử',68,3,'ally','Hậu Lý Nam Đế',
    'Lý Phật Tử là người cháu Lý Bí, xưng Hậu Lý Nam Đế sau khi đánh bại Triệu Quang Phục.',
    'Lưỡng Diện Sĩ Kỳ','Đưa ra kế sách vẹn toàn cho toàn đội (+10% Tấn công, +15% Phòng thủ).'),
  createHero2('h3_11','Tinh Thiều',70,3,'ally','Mưu sĩ',
    'Tinh Thiều là học giả, mưu sĩ tài năng trong thời Lý Nam Đế, từng đề xuất nhiều kế sách quan trọng trong cuộc kháng chiến chống nhà Lương.',
    'Thần Cơ Diệu Toán','Tính toán thần sầu, hạ thấp phòng thủ (+15%) của địch.'),
  createHero2('h3_12','Lý Thiên Bảo',61,3,'ally','Đào Lang Vương',
    'Dũng tướng thời kỳ kháng chiến chống Lương, có tài thao lược trong các trận địa chiến.',
    'Địa Lôi','Đặt bẫy mìn, gây sát thương (122% Tấn công) bất ngờ lên 1 mục tiêu địch.'),
  createHero2('h3_13','Trương Hống',60,3,'ally','Thần Tướng',
    'Tướng quân dũng mãnh, chiến đấu bên cạnh người anh em Trương Hát bảo vệ giang sơn.',
    'Hải Phong Đao','Tấn công nhanh như gió biển, gây sát thương (108% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h3_14','Trương Hát',60,3,'ally','Thần Tướng',
    'Thần tướng kiệt xuất, cùng Trương Hống tạo thành bộ đôi bất khả chiến bại.',
    'Tốc Binh','Chiến đấu bên cạnh người thân cho toàn đội (+10% Tấn công).'),
  createHero2('h3_15','Mai Thiếu Đế',58,3,'ally','Hoàng tử',
    'Mai Thiếu Đế dũng cảm đứng lên bảo vệ đất nước, bảo vệ vùng biên cương.',
    'Bạch Y Thần Binh','Tinh thần bất khuất của người lính áo trắng cho toàn đội (+15% Phòng thủ, +20 Nhuệ khí).'),
  createHero2('h3_16','Phùng An',60,3,'ally','Tướng quân',
    'Phùng An là con trai của Phùng Hưng, kế thừa sự nghiệp của cha sau khi ông qua đời. Tuy nhiên ông không đủ tài năng để duy trì độc lập lâu dài và cuối cùng thần phục nhà Đường.',
    'Phụ Tử Nghĩa Tình','Chiến đấu vì di nguyện cha cho toàn đội (+20 Nhuệ khí).'),
  createHero2('h3_17','Lý Phục Man',55,3,'ally','Tướng quân',
    'Tướng quân xuất chúng thời Lý Nam Đế, có công đánh đuổi giặc ngoại xâm.',
    'Bảo Quốc Công','Đích thân cầm quân xông pha trận mạc cho toàn đội (+10% Tấn công, +20 Nhuệ khí).'),
  createHero2('h3_18','Lý Tự Tiên',52,3,'ally','Hào kiệt',
    'Hào kiệt vùng Hoan Châu, từng tham gia khởi nghĩa chống ách đô hộ của nhà Đường.',
    'Kiêu Binh','Dùng tinh nhuệ binh sĩ, tăng sát thương tập trung. (Gây 100% sát thương Tấn công).'),
  createHero2('h3_19','Khúc Thừa Mỹ',54,3,'ally','Tiết Độ Sứ',
    'Tiết độ sứ họ Khúc tiếp nối sự nghiệp tự chủ của dân tộc ở thế kỷ thứ 10.',
    'Dân Binh Chống Giặc','Lãnh đạo dân binh, gây sát thương (100% Tấn công) lên 1 mục tiêu địch.'),
  createHero2('h3_20','Đinh Kiến',53,3,'ally','Thủ lĩnh',
    'Thủ lĩnh người Việt thời Bắc thuộc, lãnh đạo nhân dân đứng lên giành độc lập.',
    'Khởi Nghĩa Dân Binh','Phát động dân chúng nổi dậy chống quân thù. (+10% Tấn công).'),

  createHero2('h3_21','Đinh Công Trứ',65,3,'ally','Thứ Sử',
    'Thứ sử Hoan Châu thời Bắc thuộc cuối, thân phụ của Đinh Bộ Lĩnh (Đinh Tiên Hoàng). Ông là người có công trong việc cai quản địa phương, để lại dấu ấn tại vùng đất Hoa Lư - cái nôi của nhà Đinh sau này.',
    'Phụ Thân Đinh Vương','Khai mở dòng họ Đinh, gây sát thương (130% Tấn công) lên 1 mục tiêu địch.'),

  // ═══════════════════════════════════════ CHƯƠNG 4 ═══════════════════════════════════════

  createHero2('h4_2','Đinh Bộ Lĩnh',95,4,'ally','Vạn Thắng Vương',
    'Đinh Bộ Lĩnh (Đinh Tiên Hoàng) là vị hoàng đế khai sáng nhà Đinh, người có công dẹp loạn 12 sứ quân, thống nhất đất nước, xưng hoàng đế và đặt tên nước là Đại Cồ Việt (968). Ông mở ra thời kỳ độc lập, tự chủ hoàn toàn cho dân tộc Việt Nam.',
    'Vạn Thắng Cờ Sậy','Hiệu triệu toàn bộ nghĩa quân Hoa Lư, gây sát thương (124% Tấn công) lên toàn bộ địch. Gây choáng (tỷ lệ 50%).'),
  createHero2('h4_1','Ngô Quyền',90,4,'ally','Ngô Vương',
    'Ngô Quyền là vị anh hùng dân tộc, người chấm dứt 1000 năm Bắc thuộc bằng trận Bạch Đằng lịch sử năm 938. Ông dùng mưu kế đóng cọc gỗ bọc sắt dưới sông Bạch Đằng, nhử thủy quân Nam Hán vào bẫy lúc triều xuống, đánh tan tác địch. Ông lên ngôi vương, mở ra kỷ nguyên độc lập lâu dài cho dân tộc.',
    'Bạch Đằng Cọc Sắt','Đặt bẫy địa hình, gây sát thương (180% Tấn công) cực lớn khi địch lọt vào.'),
  createHero2('h4_3','Lê Hoàn',91,4,'ally','Lê Đại Hành',
    'Lê Hoàn (Lê Đại Hành) là vị vua khai sáng nhà Tiền Lê. Ông đánh bại quân Tống xâm lược năm 981, bảo vệ nền độc lập vừa mới được xác lập. Ông cũng chỉ huy đại quân chinh phạt Chiêm Thành để bảo vệ bờ cõi phía nam. Được đánh giá là một trong những vị hoàng đế tài năng nhất lịch sử Việt Nam.',
    'Thiên Tử Chinh Phạt','Thân chinh dẫn đầu quân đội, gây sát thương (182% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_5','Nguyễn Bặc',81,4,'ally','Khai quốc công thần',
    'Nguyễn Bặc là một trong những công thần khai quốc của nhà Đinh, giúp Đinh Bộ Lĩnh thống nhất 12 sứ quân. Ông giữ chức Định Quốc Công, là một trụ cột của triều đình nhà Đinh.',
    'Đinh Quốc Tâm','Trung thành tuyệt đối với chủ tướng cho toàn đội (+25% Phòng thủ).'),
  createHero2('h4_4','Đinh Điền',80,4,'ally','Khai quốc công thần',
    'Đinh Điền là công thần khai quốc nhà Đinh, cùng Nguyễn Bặc và Lê Hoàn giúp Đinh Bộ Lĩnh dẹp 12 sứ quân, thống nhất đất nước sau loạn 12 sứ quân.',
    'Thập Nhị Sứ Quân Phá','Kinh nghiệm dẹp giặc loạn, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_6', 'Lưu Cơ', 80,4,'ally','Tướng quân',
    'Lưu Cơ là đại tướng tài ba thời Đinh-Tiền Lê, từng cầm quân đánh thắng nhiều trận, bảo vệ kinh đô Hoa Lư.',
    'Hoa Lư Thủ Vệ','Bảo vệ kinh thành tuyệt đối, tăng mạnh phòng thủ (+25%) khu vực.'),
  createHero2('h4_16','Dương Vân Nga',55,4,'ally','Thái hậu',
    'Dương Vân Nga là hoàng hậu nhà Đinh, sau trao hoàng bào cho Lê Hoàn lên ngôi để dẹp giặc Tống. Hành động của bà còn gây tranh cãi trong lịch sử — có người gọi là phản bội, nhưng nhiều nhà sử học hiện đại coi đây là quyết định hy sinh cá nhân vì lợi ích quốc gia.',
    'Nhường Triều','Hy sinh bản thân vì đại nghĩa cho toàn đội (+10% Tấn công).'),
  createHero2('h4_18','Đinh Toàn',51,4,'ally','Thiếu đế','Đinh Toàn là hoàng đế nhỏ tuổi của nhà Đinh, lên ngôi khi chưa đầy 6 tuổi sau khi vua cha Đinh Tiên Hoàng bị ám sát. Triều đình rối loạn, dẫn đến việc Dương Vân Nga trao quyền cho Lê Hoàn.','Ấu Chúa','Cần sự bảo hộ cho toàn đội (+15% Phòng thủ).'),
  createHero2('h4_13','Ngô Xương Xí',51,4,'ally','Sứ quân','Ngô Xương Xí là con trai Ngô Xương Văn, một trong 12 sứ quân thời loạn. Ông cát cứ vùng Bình Kiều cho đến khi bị Đinh Bộ Lĩnh dẹp yên.','Cát Cứ','phòng thủ (+15%) lãnh thổ cho toàn đội (+10% Tấn công, +15% Phòng thủ).'),
  createHero2('h4_19','Nguyễn Siêu',60,4,'ally','Sứ quân','Nguyễn Siêu là một trong 12 sứ quân thời loạn, chiếm cứ vùng Tây Phù Liệt. Ông là một trong những người đầu tiên khuất phục trước sức mạnh của Đinh Bộ Lĩnh.','Phù Liệt Trận','Chiến thuật phòng ngự linh hoạt, gây sát thương (120% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_15','Trần Lãm',61,4,'ally','Sứ quân','Trần Lãm là sứ quân cát cứ vùng Bố Hải Khẩu (Thái Bình), người đầu tiên ủng hộ Đinh Bộ Lĩnh lên ngôi, tạo nền tảng để thống nhất đất nước.','Bố Hải Thủy Binh','Chỉ huy thủy binh vùng cửa sông, gây sát thương (122% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_12','Nguyễn Thủ Tiệp',54,4,'ally','Sứ quân','Nguyễn Thủ Tiệp là một trong 12 sứ quân, chiếm cứ vùng Tiên Du (Bắc Ninh), cuối cùng thần phục Đinh Bộ Lĩnh và được giữ lại làm tướng.','Quy Phụ','Sau khi thần phục, gây sát thương (108% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_14','Kiều Công Hãn',73,4,'ally','Sứ quân','Kiều Công Hãn là sứ quân chiếm cứ vùng Phong Châu (Phú Thọ), dòng dõi Kiều Công Tiễn — kẻ giết Dương Đình Nghệ. Ông sau đó quy phục nhà Đinh và có công dẹp loạn.','Phong Châu Kỵ Binh','Chỉ huy kỵ binh vùng trung du, tốc độ và sức mạnh vượt trội. (+10% Tấn công). (+10% Tốc độ).'),
  createHero2('h4_9','Ngô Xương Văn',51,4,'ally','Thiên Sách Vương','Ngô Xương Văn là con trai Ngô Quyền, từng là vua nhà Ngô sau khi giết phản thần Dương Tam Kha, nhưng sau đó chia sẻ quyền lực với anh Ngô Xương Ngập, gây ra loạn 12 sứ quân.','Huynh Đệ Chi Tranh','Chiến đấu trong nội chiến, gây sát thương (102% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_11','Phạm Bạch Hổ',62,4,'ally','Sứ quân','Phạm Bạch Hổ (Phạm Phòng Át) là sứ quân chiếm cứ vùng Đằng Châu (Hưng Yên), nổi tiếng dũng cảm như hổ trắng. Ông quy phục Đinh Bộ Lĩnh và được phong tước.','Bạch Hổ Xuất Sơn','Sức mạnh hổ trắng, tấn công bất ngờ từ ẩn náu. (+10% Tấn công).'),
  createHero2('h4_8','Phạm Cự Lạng',71,4,'ally','Đại tướng','Phạm Cự Lạng là đại tướng thời Đinh-Tiền Lê, người đề xuất Dương Vân Nga trao hoàng bào cho Lê Hoàn khi giặc Tống tấn công. Ông có công lớn trong việc bảo vệ nền độc lập.','Trận Địa Quyết Sách','Đưa ra quyết định chiến lược, gây sát thương (142% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_17','Đinh Liễn',66,4,'ally','Hoàng tử',
    'Đinh Liễn là con trai trưởng của Đinh Tiên Hoàng, từng bị cha bắt giam làm con tin khi còn nhỏ. Sau lớn lên ông trở thành tướng giỏi, giúp vua cha thống nhất đất nước. Tuy nhiên ông cũng bị ám sát cùng với vua cha năm 979.',
    'Hoàng Tử Phục Thù','Chiến đấu vì danh dự gia tộc, tăng sát thương khi bị dồn vào góc tường. (Gây 132% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('h4_7','Trịnh Tú',74,4,'ally','Khai quốc công thần',
    'Trịnh Tú (924 - 979) là một khai quốc công thần nhà Đinh, thuộc "Tứ trụ triều Đinh" (Bặc, Điền, Cơ, Tú). Ông có công giúp Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước. Ông từng cùng Đinh Liễn đi giao bang với nhà Tống. Về sau, vì tận trung bảo vệ cơ nghiệp nhà Đinh nên ông bị hại.',
    'Tứ Trụ Triều Đinh','Phối hợp cùng các trụ cột khác tạo thế phòng thủ (+15%) vững chắc, gây sát thương (126% Tấn công) lên 1 hàng dọc địch.'),
  createHero2('h4_22','Lê Long Việt',61,4,'ally','Hoàng đế',
    'Tiền Lê Trung Tông (983–1005), tên thật Lê Long Việt, là hoàng đế thứ hai nhà Tiền Lê. Dù vâng di chiếu nối ngôi cha nhưng ông phải dẹp loạn anh em tranh giành suốt 8 tháng. Bi kịch thay, chỉ sau 3 ngày chính thức lên ngôi, ông bị em trai Lê Long Đĩnh sát hại, trở thành một trong những vị vua trị vì ngắn nhất lịch sử Việt Nam.',
    'Đế Vương Tam Nhật','Bùng cháy rực rỡ trong thời gian ngắn, tăng mạnh sát thương và tốc độ cho toàn đội trong 3 lượt đầu tiên. (Gây 122% sát thương Tấn công). (+10% Tốc độ). (Mục tiêu: 1 mục tiêu địch).'),
  createHero2('h4_23','Đinh Triều Quốc Mẫu',49,4,'ally','Quốc mẫu',
    'Đinh Triều Quốc Mẫu (dã sử gọi là Đàm Thị Thiềm) là mẹ của Vua Đinh Tiên Hoàng. Sau khi chồng là Đinh Công Trứ mất, bà đưa con nhỏ Đinh Bộ Lĩnh về quê nuôi dưỡng, hun đúc chí lớn giúp con dẹp loạn 12 sứ quân, lập ra triều Đinh và nhà nước Đại Cồ Việt. Bà được hậu thế tôn kính và lập đền thờ ở nhiều nơi.',
    'Dưỡng Dục Đế Vương','Công lao dưỡng dục bậc đế vương, gây sát thương (98% Tấn công) lên 1 mục tiêu địch..'),
  createHero2('h4_24','Ngô Xương Ngập',49,4,'ally','Thiên Sách Vương',
    'Ngô Xương Ngập (? - 954) là con trưởng của Ngô Quyền và là một vị vua nhà Ngô. Ông trị vì từ năm 951 đến 954 cùng với em trai là Ngô Xương Văn. Sử gọi chung thời kỳ hai anh em cùng trị vì là thời Hậu Ngô Vương.',
    'Hậu Ngô Đồng Trị','Kinh nghiệm cùng nhiếp chính, tăng cường sức mạnh và phòng thủ (+15%) khi có anh em hoặc đồng minh hoàng tộc cùng ra trận. (+10% Tấn công).'),

  // ═══════════════════════════════════════ CHƯƠNG 5 ═══════════════════════════════════════
  createHero3('h5_1', 'Lý Công Uẩn', 95, 5, 'ally', 'Lý Thái Tổ', 'Vị vua khai mở triều đại nhà Lý, người có tầm nhìn chiến lược vĩ đại khi ban hành Chiếu dời đô từ Hoa Lư về Thăng Long vào năm 1010, đặt nền móng cho sự phát triển lâu dài của đất nước.', 'Chiếu Dời Đô', 'Gây 100% sát thương phép toàn đội hình địch, đồng thời hồi 20% Nộ khí và tạo lớp Khiên ảo bằng 15% máu tối đa cho toàn đội phe ta trong 2 hiệp.', { role: 'Hỗ trợ', targetScope: 'all', skillEffect: 'shield', skillEffectChance: 100, skillDmgMult: 10 }),
  createHero3('h5_2', 'Lý Thường Kiệt', 95, 5, 'ally', 'Thái Úy', 'Nhà chính trị, quân sự thiên tài kiệt xuất của dân tộc. Ông là tác giả bài thơ thần Nam Quốc Sơn Hà và là Tổng tư lệnh đánh tan 10 vạn quân Tống xâm lược trên phòng tuyến sông Như Nguyệt.', 'Nam Quốc Sơn Hà', 'Gây 250% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh có 25% tỷ lệ gây Choáng trong 1 hiệp, đồng thời bản thân nhận 25% Tấn công trong 2 hiệp.', { role: 'Tiên phong', targetScope: 'single', skillEffect: 'stun', skillEffectChance: 25, skillDmgMult: 25 }),
  createHero3('h5_3', 'Tô Hiến Thành', 85, 5, 'ally', 'Tể Tướng', 'Đại danh tướng và Tể tướng liêm khiết bậc nhất lịch sử Việt Nam. Ông nổi tiếng với sự trung quân ái quốc tuyệt đối và tấm gương sáng ngời về việc chọn người tài đức chứ không vì tình riêng.', 'Trung Liêm Định Quốc', 'Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân nhận 20% Phòng thủ và tăng 10% Tấn công cho toàn đội trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
  createHero3('h5_4', 'Nguyên phi Ỷ Lan', 85, 5, 'ally', 'Quan Âm Nữ Phật', 'Hoàng thái hậu tài sắc vẹn toàn, hai lần nhiếp chính giúp triều đình vượt qua khủng hoảng. Bà có công lớn trong việc phát triển nông nghiệp, Phật giáo và được nhân dân tôn kính là Quan Âm nữ Phật.', 'Quan Âm Nữ Phật', 'Hồi phục máu bằng 18% máu tối đa cho toàn đội, đồng thời giải 1 trạng thái bất lợi (Thanh tẩy) và cấp Miễn khống cho toàn đội trong 1 hiệp.', { role: 'Hỗ trợ', targetScope: 'all', skillEffect: 'cleanse', skillEffectChance: 100, skillDmgMult: 0 }),
  createHero3('h5_5', 'Lý Thái Tông', 85, 5, 'ally', 'Lý Phật Mã', 'Vị vua tài ba, văn võ song toàn, trực tiếp cầm quân dẹp loạn phương Nam và Chiêm Thành. Ông là người ban hành bộ luật thành văn đầu tiên của nước ta mang tên Hình Thư.', 'Hình Thư Định Quốc', 'Gây 140% sát thương vật lý lên 3 tướng địch hàng trước. Có 20% tỷ lệ làm giảm 15% Tấn công của địch trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'front_row', skillEffect: 'atk_down', skillEffectChance: 20, skillDmgMult: 14 }),
  createHero3('h5_6', 'Lý Nhân Tông', 85, 5, 'ally', 'Hoàng Đế', 'Vị vua trị vì lâu nhất trong lịch sử nhà Lý (56 năm), đưa Đại Việt vào thời kỳ hưng thịnh rực rỡ nhất về kinh tế, văn hóa, giáo dục và khoa cử với việc mở khoa thi đầu tiên (1075).', 'Trị Quốc An Dân', 'Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 13.5 }),
  createHero3('h5_7', 'Thiền sư Vạn Hạnh', 80, 5, 'ally', 'Thiền Sư', 'Bậc cao tăng uyên bác, nhà cố vấn chính trị thiên tài có công phò tá nhà Lê và trực tiếp nuôi dạy, phò trợ Lý Công Uẩn lên ngôi vua lập ra nhà Lý.', 'Thiên Định Kỳ Sấm', 'Gây 90% sát thương phép toàn đội địch, đồng thời giúp toàn đội tăng 12% Tấn công và 12% Tốc độ trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'all', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 9 }),
  createHero3('h5_8', 'Lý Thánh Tông', 80, 5, 'ally', 'Hoàng Đế', 'Vị vua nhân từ, yêu dân như con, người đã cho xây dựng chùa Một Cột nổi tiếng và chính thức đổi quốc hiệu nước ta thành Đại Việt.', 'Nhân Từ Đại Việt', 'Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tạo lớp Khiên ảo bằng 20% máu tối đa cho bản thân và đồng minh thấp máu nhất.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'shield', skillEffectChance: 100, skillDmgMult: 13.5 }),
  createHero3('h5_9', 'Trần Tự Khánh', 80, 5, 'ally', 'Hào Trưởng', 'Hào trưởng họ Trần có uy thế lớn ở vùng hạ lưu sông Hồng, người đã tận lực phò tá triều đình nhà Lý dẹp loạn các thế lực cát cứ trong giai đoạn cuối đầy biến động.', 'Bình Định Hào Kiệt', 'Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời bản thân nhận 15% Phòng thủ và hồi phục 5% máu tối đa trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
  createHero3('h5_10', 'Lý Phụng Hiểu', 75, 5, 'ally', 'Mãnh Tướng', 'Mãnh tướng dũng mãnh bậc nhất thời Lý, lập công lớn trong chiến dịch bình Chiêm và nổi tiếng với điển tích "ném đao thề" để chấn chỉnh kỷ cương triều đình.', 'Phụng Hiểu Thề Đao', 'Gây 180% sát thương vật lý lên 1 mục tiêu đơn lẻ hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'armor_pen', skillEffectChance: 15, skillDmgMult: 18 }),
  createHero3('h5_11', 'Tông Đản', 75, 5, 'ally', 'Danh Tướng', 'Danh tướng người dân tộc Tày, phó tướng đắc lực của Lý Thường Kiệt. Ông lập chiến công hiển hách khi chỉ huy quân đội đánh thẳng vào đất Tống, hạ gọn thành Ung Châu.', 'Tập Khánh Phá Ung Châu', 'Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân tự nhận trạng thái Phản sát thương (phản 15% sát thương nhận vào) trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'reflect', skillEffectChance: 100, skillDmgMult: 18 }),
  createHero3('h5_12', 'Lê Văn Thịnh', 75, 5, 'ally', 'Trạng Nguyên', 'Trạng nguyên khai khoa đầu tiên trong lịch sử khoa cử Việt Nam (1075). Ông không chỉ giỏi văn chương mà còn là nhà ngoại giao sắc sảo đối chất đòi lại đất đai với nhà Tống.', 'Trạng Nguyên Đối Chất', 'Gây 145% sát thương phép lên 1 hàng dọc. Có 15% tỷ lệ làm giảm 10% Phòng thủ của mục tiêu trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'def_down', skillEffectChance: 15, skillDmgMult: 14.5 }),
  createHero3('h5_13', 'Thiền sư Nguyễn Minh Không', 75, 5, 'ally', 'Thiền Sư', 'Vị quốc sư tài phép, nổi tiếng với sự tích chữa bệnh hiểm nghèo cho vua và được suy tôn là ông tổ nghề đúc đồng của nước ta.', 'Hóa Hổ Trừ Tật', 'Hồi phục lượng máu bằng 15% máu tối đa cho đồng minh có HP thấp nhất, đồng thời giải hiệu ứng xấu (Thanh tẩy).', { role: 'Hỗ trợ', targetScope: 'single', skillEffect: 'cleanse', skillEffectChance: 100, skillDmgMult: 0 }),
  createHero3('h5_14', 'Lý Đạo Thành', 75, 5, 'ally', 'Tể Tướng', 'Tể tướng cương trực, hết lòng vì nước, có công lớn trong việc phò tá các đời vua trẻ, chấn chỉnh phép nước và giữ gìn kỷ cương triều đình.', 'Cương Trực Trị Triều', 'Hồi phục máu bằng 15% máu tối đa cho đồng minh yếu máu nhất, đồng thời tăng 18% Phòng thủ cho đồng minh đó trong 2 hiệp.', { role: 'Hỗ trợ', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 0 }),
  createHero3('h5_15', 'Đỗ Anh Vũ', 75, 5, 'ally', 'Phụ Chính', 'Phụ chính đại thần nắm giữ quyền lực rất lớn dưới thời vua Lý Anh Tông, có vai trò cốt lõi trong việc duy trì bộ máy triều đình giữa lúc tranh chấp phức tạp.', 'Phụ Chính Quyền Thần', 'Gây 145% sát thương vật lý lên 1 hàng dọc, đồng thời tăng 15% Phòng thủ cho bản thân trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'column', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 14.5 }),
  createHero3('h5_16', 'Lưu Khánh Đàm', 65, 5, 'ally', 'Thái Sư', 'Đại thần văn võ kiêm toàn, giữ chức Thái sư phò tá triều đình qua nhiều đời vua Lý giai đoạn giữa và cuối, có nhiều đóng góp trong việc ổn định nội trị.', 'Phụ Chính Thái Sư', 'Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp.', { role: 'Chiến tướng', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 9.5 }),
  createHero3('h5_17', 'Nùng Trí Cao', 65, 5, 'ally', 'Thủ Lĩnh', 'Thủ lĩnh miền núi phía Bắc từng nổi dậy lập quốc riêng. Sau những biến động quân sự, ông trở thành một nhân vật lịch sử đầy sức hút với tài năng quân sự sắc bén.', 'Quảng Nguyên Xưng Hùng', 'Gây 110% sát thương vật lý lên 1 hàng dọc. Đòn đánh bỏ qua 10% Giáp mục tiêu.', { role: 'Sát thủ', targetScope: 'column', skillEffect: 'armor_pen', skillEffectChance: 100, skillDmgMult: 11 }),
  createHero3('h5_18', 'Thân Cảnh Phúc', 55, 5, 'ally', 'Phò Mã', 'Phò mã nhà Lý kiêm thủ lĩnh vùng biên giới Lạng Sơn. Ông tổ chức lực lượng dân binh miền núi phối hợp chặt chẽ cùng Lý Thường Kiệt chặn đứng quân Tống.', 'Phò Mã Lạng Sơn', 'Gây 110% sát thương vật lý lên 1 hàng dọc. Có 10% tỷ lệ gây Chảy máu (mất 3% HP mỗi lượt) trong 1 hiệp.', { role: 'Sát thủ', targetScope: 'column', skillEffect: 'bleed', skillEffectChance: 10, skillDmgMult: 11 }),
  createHero3('h5_19', 'Thiền sư Không Lô', 55, 5, 'ally', 'Thiền Sư', 'Bậc cao tăng đắc đạo thời Lý, nổi tiếng với nhiều giai thoại thần thông quảng đại, y thuật cứu đời và góp phần truyền bá Phật giáo sâu rộng trong nhân dân.', 'Thần Thông Quảng Đại', 'Gây 95% sát thương phép lên 3 tướng địch hàng trước. Có 10% tỷ lệ gây Câm lặng trong 1 hiệp.', { role: 'Pháp sư', targetScope: 'front_row', skillEffect: 'silence', skillEffectChance: 10, skillDmgMult: 9.5 }),
  createHero3('h5_20', 'Lý Nhật Quang', 55, 5, 'ally', 'Hoàng Tử', 'Hoàng tử con thứ của Lý Thái Tổ, người có công lớn trong việc trấn thủ, khai hoang và phát triển vùng đất Hoan Châu (Nghệ An - Hà Tĩnh) trở thành căn cứ địa vững chắc.', 'Uy Trấn Hoan Châu', 'Gây 95% sát thương vật lý lên 3 tướng địch hàng trước. Có 10% tỷ lệ làm giảm 8% Tốc độ của địch trong 1 hiệp.', { role: 'Khống chế', targetScope: 'front_row', skillEffect: 'slow', skillEffectChance: 10, skillDmgMult: 9.5 }),
  createHero3('h5_21', 'Công chúa Phất Kim', 55, 5, 'ally', 'Công Chúa', 'Công chúa nhà Lý gắn liền với cuộc đời đầy biến động và hướng về cửa Phật, là biểu tượng cho thân phận người phụ nữ quý tộc giữa những thăng trầm thời đại.', 'Hướng Phật Quy Tâm', 'Hồi phục máu bằng 8% máu tối đa cho đồng minh yếu máu nhất, đồng thời tăng 5% Né tránh trong 1 hiệp.', { role: 'Hỗ trợ', targetScope: 'single', skillEffect: 'dodge_up', skillEffectChance: 100, skillDmgMult: 0 }),
  createHero3('h5_22', 'Thiền sư Giác Hải', 55, 5, 'ally', 'Thiền Sư', 'Vị cao tăng tài đức vẹn toàn cùng thời với Thiền sư Không Lô, nổi tiếng với sự am tường giáo lý Phật pháp và tinh thần phò đời giúp nước.', 'Thiền Định Hộ Quốc', 'Gây 80% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 5% Phòng thủ bản thân trong 1 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 8 }),
  createHero3('h5_23', 'Lý Kế Nguyên', 55, 5, 'ally', 'Danh Tướng', 'Danh tướng thủy quân tài ba của nhà Lý, người trực tiếp chỉ huy các trận đánh lớn trên sông nước để đập tan âm mưu xâm lược của nhà Tống.', 'Đông Kênh Thủy Trận', 'Gây 110% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời tăng 5% Phòng thủ bản thân trong 1 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 11 }),
// ═══════════════════════════════════════ CHƯƠNG 6 ═══════════════════════════════════════
  createHero2('h6_1', 'Trần Quốc Tuấn', 95, 6, 'ally', 'Nhà Trần', 'Trần Hưng Đạo (Trần Quốc Tuấn) là danh tướng thời Trần.', 'Hào Khí Đông A', 'Hồi 25% thanh nộ khí và tăng 20% chỉ số Tấn công (duy trì 2 hiệp) cho 2 tướng đồng minh có chỉ số Tấn công cơ bản cao nhất.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_2', 'Trần Thủ Độ', 95, 6, 'ally', 'Nhà Trần', 'Trần Thủ Độ là danh tướng thời Trần.', 'Quyền Bính Thiên Hạ', 'Gây **100%** sát thương phép lên toàn đội hình địch. Có 25% tỷ lệ khiến địch bị Mê hoặc (đánh nhầm đồng đội) trong 1 hiệp.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_3', 'Trần Nhân Tông', 95, 6, 'ally', 'Nhà Trần', 'Trần Nhân Tông là danh tướng thời Trần.', 'Thiền Tâm Phổ Độ', 'Hồi máu bằng 15% máu tối đa của bản thân cho 1 đồng minh thấp máu nhất. Tạo Khiên ảo tương đương 10% máu tối đa cho 3 tướng phe ta ở hàng trên.', 'Gây sát thương phép lên 1 địch và hồi lượng nhỏ HP cho bản thân.'),
  createHero2('h6_4', 'Trần Thánh Tông', 95, 6, 'ally', 'Nhà Trần', 'Trần Thánh Tông là danh tướng thời Trần.', 'Hoàng Ân Hạo Đãng', 'Gây **150%** sát thương phép lên 3 tướng địch hàng trên. Nhận chia sẻ 15% sát thương thay cho 1 tướng đồng minh yếu máu nhất trong 2 hiệp.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_5', 'Trần Thái Tông', 95, 6, 'ally', 'Nhà Trần', 'Trần Thái Tông là danh tướng thời Trần.', 'Chân Mệnh Đế Vương', 'Gây **150%** sát thương vật lý lên 3 tướng địch hàng dưới. Bản thân nhận hiệu ứng Phản lại 20% sát thương nhận vào trong 2 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_6', 'Phạm Ngũ Lão', 85, 6, 'ally', 'Nhà Trần', 'Phạm Ngũ Lão là danh tướng thời Trần.', 'Hoành Thương Trấn Nhạc', 'Gây **85%** sát thương vật lý lên toàn đội hình địch. Có 25% tỷ lệ đòn đánh bỏ qua 15% phòng thủ địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_7', 'Trần Quang Khải', 85, 6, 'ally', 'Nhà Trần', 'Trần Quang Khải là danh tướng thời Trần.', 'Đoạt Giáo Chương Dương', 'Quét ngang gây **135%** sát thương vật lý lên 3 tướng địch hàng trên. Có 30% tỷ lệ xóa bỏ 1 hiệu ứng Buff có lợi của mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_8', 'Trần Nhật Duật', 85, 6, 'ally', 'Nhà Trần', 'Trần Nhật Duật là danh tướng thời Trần.', 'Mạn Thiên Tinh Môn', 'Gây **80%** sát thương phép lên toàn địch. Có 20% tỷ lệ khiến kẻ địch bị giảm 15% kháng phép trong 2 hiệp.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_9', 'Trần Khánh Dư', 85, 6, 'ally', 'Nhà Trần', 'Trần Khánh Dư là danh tướng thời Trần.', 'Đoạt Lương Vân Đồn', 'Gây **135%** sát thương vật lý lên 3 tướng địch hàng dưới. Có 25% tỷ lệ Hút 20% Nộ khí của địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_10', 'Trần Thị Dung', 85, 6, 'ally', 'Nhà Trần', 'Linh Từ Quốc Mẫu (Trần Thị Dung) là danh tướng thời Trần.', 'Quốc Mẫu Nghi Thiên', 'Hồi máu cho toàn bộ đội hình bằng 12% máu tối đa của bà. Có 25% tỷ lệ Thanh tẩy 1 trạng thái bất lợi cho 3 tướng hàng trên.', 'Gây sát thương phép lên 1 địch và hồi lượng nhỏ HP cho bản thân.'),
  createHero2('h6_11', 'Trần Quốc Toản', 75, 6, 'ally', 'Nhà Trần', 'Trần Quốc Toản là danh tướng thời Trần.', 'Toái Thạch Phá Tâm', 'Gây **200%** sát thương vật lý lên 1 mục tiêu có máu thấp nhất. Đòn đánh được cộng sẵn 15% tỷ lệ bạo kích.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_12', 'Yết Kiêu', 75, 6, 'ally', 'Nhà Trần', 'Yết Kiêu là danh tướng thời Trần.', 'Giao Long Đột Kích', 'Gây **150%** sát thương vật lý lên 1 hàng dọc. Buff cho bản thân 15% tỷ lệ Né tránh. Mỗi lần né có 20% tỷ lệ hồi 15 nộ khí.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_13', 'Dã Tượng', 75, 6, 'ally', 'Nhà Trần', 'Dã Tượng là danh tướng thời Trần.', 'Thiết Tượng Càn Quét', 'Gây **120%** sát thương vật lý lên 3 tướng địch hàng trên. Có 15% tỷ lệ gây Choáng trong 1 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_14', 'Trần Bình Trọng', 75, 6, 'ally', 'Nhà Trần', 'Trần Bình Trọng là danh tướng thời Trần.', 'Nam Quỷ Bất Khuất', 'Gây **200%** sát thương vật lý lên 1 mục tiêu hàng trên. Có 25% tỷ lệ Khiêu khích toàn địch đánh mình và tăng 15% phòng thủ bản thân trong 1 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_15', 'Trần Tung', 75, 6, 'ally', 'Nhà Trần', 'Tuệ Trung Thượng Sĩ (Trần Tung) là danh tướng thời Trần.', 'Phóng Dật Thiền Giao', 'Không gây sát thương. Gắn hiệu ứng Miễn khống cho 2 tướng đồng minh có lực chiến cao nhất trong 1 hiệp (tỷ lệ thành công 35%).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_16', 'Lê Phụ Trần', 75, 6, 'ally', 'Nhà Trần', 'Lê Phụ Trần là danh tướng thời Trần.', 'Xuyên Tường Phá Địch', 'Gây **150%** sát thương vật lý lên 1 hàng dọc. Kẻ địch đứng sau nhận thêm 10% sát thương.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_17', 'Trần Khát Chân', 75, 6, 'ally', 'Nhà Trần', 'Trần Khát Chân là danh tướng thời Trần.', 'Hỏa Đồng Oanh Trận', 'Gây **210%** sát thương vật lý vào 1 mục tiêu hàng dưới. Đòn đánh có 20% tỷ lệ bỏ qua 15% giáp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_18', 'Chu Văn An', 75, 6, 'ally', 'Nhà Trần', 'Chu Văn An là danh tướng thời Trần.', 'Thất Trảm Sớ', 'Gây **115%** sát thương phép lên 3 tướng ngẫu nhiên. Có 15% tỷ lệ gây Cấm trị liệu trong 1 hiệp.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_19', 'Nguyễn Khoái', 75, 6, 'ally', 'Nhà Trần', 'Nguyễn Khoái là danh tướng thời Trần.', 'Thiết Kỵ Xung Phong', 'Gây **120%** sát thương vật lý lên 3 tướng địch hàng trên. Có 15% tỷ lệ gây Câm lặng trong 1 hiệp.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_20', 'Nguyễn Chế Nghĩa', 75, 6, 'ally', 'Nhà Trần', 'Nguyễn Chế Nghĩa là danh tướng thời Trần.', 'Ngự Tiền Đột Trận', 'Cầm cây giáo dài xé toạc đội hình, gây **145%** sát thương vật lý lên 1 hàng dọc. Kẻ địch trúng đòn bị Giảm 10% Phòng thủ trong 2 hiệp. Nếu kẻ địch có lượng máu dưới 50%, sát thương của kỹ năng tự động tăng thêm 15%.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_21', 'Đoàn Nhữ Hài', 75, 6, 'ally', 'Nhà Trần', 'Đoàn Nhữ Hài là danh tướng thời Trần.', 'Biểu Khấu Đầu', 'Gây **110%** sát thương phép lên 3 tướng địch hàng trước. Tỉ lệ 15% Giảm 10% công địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_22', 'An Tư Công Chúa', 65, 6, 'ally', 'Nhà Trần', 'An Tư Công Chúa là danh tướng thời Trần.', 'Dâng Mình Vì Nước', 'Mất 10% máu hiện tại để tạo Khiên (bằng 80% máu vừa mất) cho 1 tướng chủ lực. Tăng 10% Tỷ lệ bạo kích cho tướng đó.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h6_23', 'Đỗ Khắc Chung', 65, 6, 'ally', 'Nhà Trần', 'Đỗ Khắc Chung là danh tướng thời Trần.', 'Biện Thuyết Giải Vây', 'Giảm 15% sức tấn công của 3 tướng địch hàng trên trong 2 hiệp (tỷ lệ thành công 25%).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),


  // ═══════════════════════════════════════ CHƯƠNG 7 ═══════════════════════════════════════
  createHero2('h7_1', 'Chu Văn An', 75, 7, 'ally', 'Danh Sĩ', 'Đại danh sĩ, nhà giáo dục lỗi lạc thời Trần, từng dâng Thất trảm sớ xin chém 7 gian thần nhưng không được chấp thuận.', 'Thất Trảm Sớ', 'Dâng sớ trừ gian, gây sát thương (150% Tấn công) lên 1 mục tiêu địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero3('h7_2', 'Hồ Quý Ly', 80, 7, 'ally', 'Hoàng Đế', 'Nhà chính trị, nhà cải cách lớn táo bạo, người sáng lập nhà Hồ, chủ trương đổi mới toàn diện hệ thống tiền tệ, hạn điền, hạn nô và chính sách quân sự.', 'Tân Chính Đổi Mới', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, bản thân nhận 20% Thủ và tăng 10% Công toàn đội trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
  createHero3('h7_3', 'Hồ Nguyên Trừng', 80, 7, 'ally', 'Tướng Quân', 'Con trưởng Hồ Quý Ly, nhà khoa học và kỹ thuật quân sự thiên tài, "cha đẻ" của súng Thần Cơ uy lực và tổng công trình sư xây dựng thành Tây Đô vĩ đại.', 'Súng Thần Cơ Phá Giặc', 'Gây 220% sát thương vật lý 1 mục tiêu hàng trên, đòn đánh bỏ qua 20% Giáp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'armor_pen', skillEffectChance: 100, skillDmgMult: 22 }),
  createHero3('h7_4', 'Trần Nguyên Đán', 85, 7, 'ally', 'Tôn Thất', 'Tôn thất nhà Trần, đại thần uyên bác, nhà thơ và nhà chiêm tinh lỗi lạc, người ông ngoại đáng kính hết lòng dạy dỗ danh nhân Nguyễn Trãi từ thuở nhỏ.', 'Thiên Văn Thấu Triệt', 'Gây 140% sát thương phép 3 mục tiêu hàng dưới, tăng 12% Tốc độ toàn đội trong 2 hiệp.', { role: 'Hỗ trợ', targetScope: 'back_row', skillEffect: 'spd_up', skillEffectChance: 100, skillDmgMult: 14 }),
  createHero3('h7_5', 'Đặng Tất', 85, 7, 'ally', 'Quốc Công', 'Quốc công nhà Hậu Trần, người cha tài ba cùng con trai lập công đầu trong trận Bô Cô đại phá quân Minh, là chỗ dựa quân sự vững chắc thời kỳ đầu Hậu Trần.', 'Bô Cô Đại Phá', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, bản thân nhận 20% Thủ và tăng 10% Công trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'single', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 18 }),
  createHero3('h7_6', 'Nguyễn Cảnh Chân', 85, 7, 'ally', 'Đại Thần', 'Đại thần trung nghĩa tận tụy, cột trụ vững chắc phò tá các vua nhà Hậu Trần trong công cuộc khôi phục giang sơn trước thế lực quân Minh.', 'Trung Nghĩa Phò Triều', 'Gây 140% sát thương phép 3 mục tiêu hàng dưới, tăng 12% Phòng thủ toàn đội trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 14 }),
  createHero3('h7_7', 'Nguyễn Phi Khanh', 65, 7, 'ally', 'Danh Sĩ', 'Đại danh sĩ, nhà thơ lớn và là thân phụ của Anh hùng dân tộc Nguyễn Trãi. Ông đỗ thái học sinh nhà Trần, nổi tiếng với tài văn chương và lòng trung nghĩa.', 'Ức Trai Phụ Thân', 'Gây 145% sát thương phép 1 hàng dọc, tăng 10% Tấn công bản thân và đồng minh cùng hàng trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 14.5 }),
  createHero3('h7_8', 'Nguyễn An', 75, 7, 'ally', 'Kỳ Tài', 'Thiên tài kiến trúc và kỹ thuật người Việt thời đầu thế kỷ XV, kiến trúc sư trưởng thiết kế và chỉ đạo xây dựng quần thể Tử Cấm Thành (Bắc Kinh, Trung Quốc) lừng danh thế giới.', 'Kỳ Tài Kiến Trúc', 'Gây 145% sát thương phép 1 hàng dọc, tăng 15% Phòng thủ bản thân trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 14.5 }),
  createHero3('h7_9', 'Đặng Dung', 75, 7, 'ally', 'Danh Tướng', 'Đại danh tướng thời Hậu Trần, văn võ song toàn, người có khí phách hào hùng và là tác giả bài thơ Thuật hoài mang đậm hào khí Đông A bi tráng.', 'Thuật Hoài Hào Khí', 'Gây 140% sát thương vật lý 3 mục tiêu hàng trước, nhận 20% Thủ và phản 15% sát thương trong 2 hiệp.', { role: 'Chiến tướng', targetScope: 'front_row', skillEffect: 'reflect', skillEffectChance: 100, skillDmgMult: 14 }),
  createHero3('h7_10', 'Nguyễn Cảnh Dị', 75, 7, 'ally', 'Danh Tướng', 'Danh tướng kiệt xuất nhà Hậu Trần, nổi tiếng với khí tiết kiên cường, khi bị giặc Minh bắt đã hiên ngang mắng mỏ rồi tuẫn tiết đến cùng.', 'Trung Liệt Tuẫn Tiết', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, miễn khống chế và tăng 15% Công trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 18 }),
  createHero3('h7_11', 'Hồ Hán Thương', 75, 7, 'ally', 'Hoàng Đế', 'Con thứ Hồ Quý Ly, vị vua thứ hai và cũng là cuối cùng của nhà Hồ, cùng triều đình gánh vác giai đoạn kháng chiến chống quân Minh đầy gian khó.', 'Nhà Hồ Mạt Vận', 'Gây 135% sát thương phép 3 mục tiêu hàng dưới, tạo Khiên ảo bằng 15% máu tối đa trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'shield', skillEffectChance: 100, skillDmgMult: 13.5 }),
  createHero3('h7_12', 'Hồ Tông Thốc', 75, 7, 'ally', 'Đại Thần', 'Đại thần, danh sĩ tài năng dưới triều nhà Hồ, người tích cực tham gia vào các công việc chính sự và cải cách hành chính của triều đình.', 'Cải Cách Xã Thắc', 'Gây 145% sát thương phép 1 hàng dọc, giảm 10% Phòng thủ mục tiêu trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'column', skillEffect: 'def_down', skillEffectChance: 100, skillDmgMult: 14.5 }),
  createHero3('h7_13', 'Trần Ngỗi', 75, 7, 'ally', 'Hoàng Đế', 'Giản Định Đế, vị vua khai mở triều đại nhà Hậu Trần, phất cao ngọn cờ khởi nghĩa chống ách đô hộ nhà Minh tại Ninh Bình trong những năm đầu thế kỷ XV.', 'Hậu Trần Phất Cờ', 'Gây 180% sát thương vật lý 1 mục tiêu hàng trên, nhận 15% Công và hồi 5% máu tối đa trong 2 hiệp.', { role: 'Đấu sĩ', targetScope: 'single', skillEffect: 'atk_up', skillEffectChance: 100, skillDmgMult: 18 }),
  createHero2('h7_14', 'Nguyễn Biểu', 65, 7, 'ally', 'Danh Sĩ', 'Danh sĩ thời Hậu Trần, nổi tiếng với giai thoại "ăn cỗ đầu người" thể hiện khí phách ngang tàng, bất khuất trước quân Minh.', 'Khí Phách Ngang Tàng', 'Khí phách lấn át kẻ thù, gây sát thương (130% Tấn công) lên 1 mục tiêu địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h7_15', 'Hoàng Hối Khanh', 68, 7, 'ally', 'Đại Thần', 'Đại thần nhà Hồ, người có công trong việc phòng thủ phương Nam chống lại quân Chiêm Thành và sau đó chống quân Minh.', 'Trấn Thủ Phương Nam', 'Tăng cường phòng thủ cho đồng minh, (+15% Phòng thủ toàn đội).', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h7_16', 'Nguyễn Suý', 67, 7, 'ally', 'Tướng quân', 'Tướng quân thời hậu Trần, có công trong các trận đánh chống quân Minh chiếm đóng.', 'Kỳ Binh Kỳ Trận', 'Dùng chiến thuật bất ngờ, gây sát thương (134% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h7_17', 'Trần Thuận Tông', 60, 7, 'ally', 'Hoàng Đế', 'Vị vua áp chót của triều Trần, bị Hồ Quý Ly thao túng và ép nhường ngôi, cuối cùng bị sát hại.', 'Vương Quyền Suy Vi', 'Hoàng ân cuối cùng, hồi phục (100% Tấn công) HP cho đồng minh yếu nhất.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero2('h7_18', 'Phạm Sư Mạnh', 72, 7, 'ally', 'Danh Sĩ', 'Đại danh sĩ, nhà thơ kiệt xuất thời Trần, học trò xuất sắc của Chu Văn An, từng giữ nhiều chức vụ quan trọng trong triều đình.', 'Hàn Lâm Văn Tập', 'Dùng tài văn chương cổ vũ tinh thần, (+20 Nhuệ khí toàn đội).', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),
  createHero3('h7_19', 'Lê Cảnh Kỳ', 55, 7, 'ally', 'Tướng Lĩnh', 'Tướng lĩnh trung thành của nhà Hồ, người cùng các tướng chịu chung số phận bị giặc Minh bắt giải về Trung Hoa sau khi triều đại sụp đổ.', 'Cận Thần Tuẫn Quốc', 'Gây 80% sát thương vật lý 3 mục tiêu hàng trước, tăng 5% Phòng thủ bản thân trong 1 hiệp.', { role: 'Chiến tướng', targetScope: 'front_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 8 }),
  createHero2('h7_20', 'Phạm Lực Tài', 51, 7, 'ally', 'Hào kiệt', 'Hào kiệt thời kháng Minh, tham gia chiến đấu dũng cảm chống lại ách cai trị tàn bạo.', 'Tự Do Chiến Đấu', 'Đánh vì tự do, tinh thần không bị bó buộc. (+20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero3('h7_21', 'Trần Quý Khoáng', 75, 7, 'ally', 'Hoàng Đế', 'Trùng Quang Đế, vị vua thứ hai của nhà Hậu Trần, người cùng các danh tướng lãnh đạo cuộc kháng chiến chống quân Minh kiên cường, bền bỉ đến hơi thở cuối cùng.', 'Trùng Quang Kháng Minh', 'Gây 135% sát thương phép 3 mục tiêu hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp.', { role: 'Pháp sư', targetScope: 'back_row', skillEffect: 'def_up', skillEffectChance: 100, skillDmgMult: 13.5 }),
  createHero2('h7_22', 'Trần Khát Chân', 78, 7, 'ally', 'Tướng quân', 'Trần Khát Chân là dũng tướng tài ba cuối nhà Trần, người đã đánh bại và giết chết vua Chế Bồng Nga của Chiêm Thành năm 1390.', 'Bãi Trúc Phục Kích', 'Phục kích trong bụi rậm, đòn tấn công bất ngờ gây sát thương (156% Tấn công) cao. (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h7_23', 'Trần Thiếu Đế', 55, 7, 'ally', 'Hoàng Đế', 'Vị vua cuối cùng của triều Trần, lên ngôi khi mới 3 tuổi, sau bị ông ngoại là Hồ Quý Ly phế truất, chấm dứt 175 năm trị vì của nhà Trần.', 'Ấu Chúa Vô Quyền', 'Suy giảm ý chí chiến đấu của kẻ địch, giảm 10% Tấn công của 1 mục tiêu địch.', 'Gây sát thương phép lên 1 mục tiêu địch hàng trước.'),

  // ═══════════════════════════════════════ CHƯƠNG 8 ═══════════════════════════════════════
  createHero2('h8_1', 'Lê Lợi', 90, 8, 'ally', 'Bình Định Vương', 'Lê Lợi (Lê Thái Tổ) là vị anh hùng dân tộc, lãnh đạo cuộc khởi nghĩa Lam Sơn (1418–1427) đánh đuổi quân Minh, khôi phục độc lập dân tộc sau 20 năm Minh thuộc. Ông lập ra triều Hậu Lê — triều đại tồn tại lâu nhất lịch sử Việt Nam (1428–1788). Gắn với truyền thuyết Hồ Gươm và thần Rùa vàng.', 'Lam Sơn Khởi Nghĩa', 'Hiệu triệu nghĩa sĩ bốn phương cho toàn đội (+20% Tấn công, +30 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_2', 'Nguyễn Trãi', 88, 8, 'ally', 'Anh hùng dân tộc', 'Nguyễn Trãi là nhà chiến lược thiên tài, nhà văn hóa vĩ đại — được UNESCO vinh danh là Danh nhân văn hóa thế giới. Ông soạn "Bình Ngô đại cáo" — bản tuyên ngôn độc lập thứ hai của Việt Nam, tác giả "Quốc âm thi tập" đặt nền móng cho văn học chữ Nôm. Sau khi đất nước thống nhất bị giết oan và tru di tam tộc trong vụ Lệ Chi Viên.', 'Bình Ngô Đại Cáo', 'Dùng văn chương như gươm, gây sát thương (176% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_3', 'Lê Lai', 75, 8, 'ally', 'Trung thần', 'Lê Lai là vị tướng nghĩa trung nhất lịch sử Việt Nam. Khi Lê Lợi bị quân Minh vây, ông tình nguyện giả làm Bình Định Vương, mặc áo bào và cưỡi ngựa vẫy ra ngoài để thu hút địch, nhờ đó Lê Lợi thoát chết. Câu nói "Trước giỗ Lê Lai, sau giỗ Lê Lợi" thể hiện lòng biết ơn sâu sắc.', 'Thế Thân Cứu Chúa', 'Hy sinh bản thân bảo vệ chủ tướng, gây sát thương (150% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_4', 'Trần Nguyên Hãn', 80, 8, 'ally', 'Tướng quân', 'Trần Nguyên Hãn là dũng tướng nhà hậu Trần, sau theo phò Lê Lợi trong khởi nghĩa Lam Sơn và lập nhiều chiến công. Ông chỉ huy trận Chi Lăng tiêu diệt Liễu Thăng. Tuy nhiên sau khi đất nước thống nhất, ông bị Lê Lợi nghi ngờ và giết hại.', 'Chi Lăng Hùng Phong', 'Chiến thuật địa hình sắc bén, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_5', 'Lê Sát', 76, 8, 'ally', 'Khai quốc công thần', 'Lê Sát là khai quốc công thần nhà Hậu Lê, một trong những tướng tài nhất của Lê Lợi. Sau khi đất nước thống nhất, ông nắm quyền và bị xử tử vì lộng quyền.', 'Chiến Trận Lão Tướng', 'Kinh nghiệm trận mạc dày dạn, gây sát thương (152% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_6', 'Lê Ngân', 75, 8, 'ally', 'Khai quốc công thần', 'Lê Ngân là khai quốc công thần nhà Hậu Lê, tướng tài trong khởi nghĩa Lam Sơn. Ông sau đó bị xử tử vì dính líu đến các âm mưu cung đình.', 'Lam Sơn Tiên Phong', 'Đi đầu trong mọi trận đánh, gây sát thương (120% Tấn công) lên hàng trước địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_7', 'Phạm Văn Xảo', 71, 8, 'ally', 'Tướng quân', 'Phạm Văn Xảo là tướng tài của Lê Lợi, có công trong chiến dịch đánh đuổi quân Minh ra khỏi đất nước. Ông bị oan và xử tử sau khi lập quốc.', 'Linh Đông', 'Linh hoạt trong mọi tình huống, gây sát thương (142% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_8', 'Đinh Lễ', 81, 8, 'ally', 'Đại tướng', 'Đinh Lễ là đại tướng kiệt xuất của Lê Lợi, người chỉ huy trận Tốt Động - Chúc Động đại thắng năm 1426, tiêu diệt 5 vạn quân Minh. Ông hy sinh anh dũng trong trận Bồ Đề.', 'Tốt Động Đại Phá', 'Đòn tổng lực từ nhiều hướng, gây sát thương (162% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_9', 'Nguyễn Xí', 80, 8, 'ally', 'Khai quốc công thần', 'Nguyễn Xí là khai quốc công thần nhà Hậu Lê, tướng lĩnh từng theo Lê Lợi từ thuở đầu khởi nghĩa. Ông có vai trò quan trọng trong việc phế lập vua, bảo vệ triều đình qua nhiều biến động.', 'Phế Lập Đại Sự', 'Quyết định chiến lược tối cao, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_10', 'Lưu Nhân Chú', 66, 8, 'ally', 'Tướng quân', 'Lưu Nhân Chú là tướng có công trong khởi nghĩa Lam Sơn, cầm quân mặt trận phía bắc. Sau lập quốc bị xử tử vì dính líu âm mưu.', 'Bắc Thổ Chiến Binh', 'Chiến đấu quen thuộc với địa hình phía bắc cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_11', 'Lê Thánh Tông', 71, 8, 'ally', 'Hoàng đế', 'Lê Thánh Tông là vị hoàng đế anh minh nhất triều Hậu Lê, trị vì 1460–1497. Ông mở rộng lãnh thổ xuống phía nam (chinh phạt Chiêm Thành 1471), tiến hành nhiều cải cách và hoàn thiện Bộ luật Hồng Đức tiến bộ.', 'Hồng Đức Đại Trị', 'Hệ thống pháp luật hoàn hảo cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_12', 'Ngô Sĩ Liên', 55, 8, 'ally', 'Sử quan', 'Ngô Sĩ Liên là sử quan nổi tiếng triều Hậu Lê, soạn bộ "Đại Việt sử ký toàn thư" — bộ chính sử quan trọng nhất của Việt Nam.', 'Sử Ký Toàn Thư', 'Ghi chép chiến trận đầy đủ, học hỏi kinh nghiệm tăng dần sức mạnh. (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_13', 'Lương Thế Vinh', 62, 8, 'ally', 'Trạng nguyên toán học', 'Lương Thế Vinh là Trạng nguyên và nhà toán học nổi tiếng triều Lê, người viết sách "Đại thành toán pháp" — giáo trình toán học đầu tiên của Việt Nam.', 'Toán Thuật Thần Kỳ', 'Tính toán chính xác từng đòn đánh, tăng sát thương chuẩn xác. (Gây 124% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_14', 'Nguyễn Thử Lễ', 65, 8, 'ally', 'Danh tướng', 'Danh tướng thời 8.', 'Dũng Mãnh', 'Gây 100% sát thương lên 1 mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_15', 'Thân Nhân Trung', 70, 8, 'ally', 'Văn thần', 'Thân Nhân Trung là học giả uyên bác triều Lê Thánh Tông, người nổi tiếng với câu: "Hiền tài là nguyên khí của quốc gia" — khắc trên văn bia Văn Miếu.', 'Hiền Tài Nguyên Khí', 'Tụ hội nhân tài cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_16', 'Nguyễn Chích', 76, 8, 'ally', 'Đệ nhất mưu sĩ', 'Nguyễn Chích (1382–1448) (tức Lê Chích) là công thần khai quốc nhà Lê sơ quê ở Đông Sơn, Thanh Hóa. Ông là đệ nhất mưu sĩ của Bình Định Vương Lê Lợi. Chiến lược chuyển hướng tấn công vào Nghệ An của ông đã thay đổi toàn bộ cục diện khởi nghĩa Lam Sơn, tạo bước ngoặt quyết định đánh đuổi quân Minh.', 'Tuyệt Thế Mưu Lược', 'Đưa ra mưu kế đột phá, gây sát thương (152% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_17', 'Vũ Hữu', 57, 8, 'ally', 'Văn thần', 'Vũ Hữu là học giả và quan văn triều Lê, có đóng góp trong công tác xây dựng pháp luật và hành chính.', 'Văn Thần Trị Quốc', 'Quản lý chiến trường bằng quy tắc, gây sát thương (114% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_18', 'Nguyễn Trực', 55, 8, 'ally', 'Trạng nguyên', 'Nguyễn Trực là trạng nguyên triều Lê, đi sứ nhà Minh và làm rạng danh đất Việt bằng tài học vấn.', 'Ngoại Giao Học Vấn', 'Vũ khí tri thức, gây sát thương (110% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_20', 'Lê Triện', 65, 8, 'ally', 'Danh tướng', 'Danh tướng thời 8.', 'Dũng Mãnh', 'Gây 100% sát thương lên 1 mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_21', 'Bùi Quốc Hưng', 67, 8, 'ally', 'Tướng quân', 'Bùi Quốc Hưng là tướng quân trong khởi nghĩa Lam Sơn, có đóng góp trong các chiến dịch giải phóng đất nước.', 'Quốc Thổ Giải Phóng', 'Chiến đấu vì độc lập cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_22', 'Lê Thụ', 51, 8, 'ally', 'Tướng quân', 'Lê Thụ là tướng quân trung thành trong khởi nghĩa Lam Sơn, chuyên phòng thủ căn cứ địa.', 'Căn Cứ Địa Vững Chắc', 'Bảo vệ căn cứ, gây sát thương (102% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_23', 'Trịnh Khả', 57, 8, 'ally', 'Tướng quân', 'Trịnh Khả là tướng quân trong khởi nghĩa Lam Sơn, có công trong việc chiêu mộ nghĩa quân vùng Thanh Hóa.', 'Chiêu Mộ Nghĩa Sĩ', 'Mở rộng hàng ngũ, tăng số lượng và sức mạnh đội quân. (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_24', 'Đinh Liệt', 65, 8, 'ally', 'Khai quốc công thần', 'Đinh Liệt (1400–1471) hay Lê Liệt, là công thần khai quốc nhà Lê sơ quê ở huyện Ngọc Lặc, Thanh Hóa. Ông cùng anh ruột Đinh Lễ là cháu gọi Lê Thái Tổ bằng cậu. Từ khi còn trẻ, ông đã theo làm cận vệ cho Lê Lợi và lập nhiều chiến công hiển hách trong khởi nghĩa Lam Sơn.', 'Cận Vệ Tiên Phong', 'Xung phong đi đầu bảo vệ chủ tướng, gây sát thương (104% Tấn công) lên hàng trước địch.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_25', 'Lê Khôi', 73, 8, 'ally', 'Tướng quân', 'Lê Khôi là công thần khai quốc nhà Lê sơ, cháu ruột của Lê Lợi. Trong khởi nghĩa Lam Sơn, ông lập nhiều công lao, được phong Kì Lân Hổ Vệ tướng quân, hàm Nhập nội thiếu úy, tước Đình Thượng hầu. Đóng vai trò quan trọng trấn thủ Hóa châu và nhiều lần đánh lui Chiêm Thành.', 'Kì Lân Hổ Vệ', 'phòng thủ (+15%) vững vàng như kỳ lân hổ vệ, bảo vệ toàn đội khỏi sát thương chí mạng. (Gây 146% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_26', 'Lê Thái Tông', 74, 8, 'ally', 'Hoàng đế', 'Lê Thái Tông (1423–1442) tên húy Lê Nguyên Long, là hoàng đế thứ hai của triều Hậu Lê. Lên ngôi lúc mới 11 tuổi nhưng là vị vua thông minh, ông cùng các đại thần (Lê Sát, Lê Ngân, Trịnh Khả...) giữ vững và phát triển thời kỳ thịnh trị. Ông nghiêm trị tham ô, hoàn thiện nghi thức triều đình, chấn hưng giáo dục và đặt lệ thi cử 3 năm một lần để chọn Nho sĩ tài ba.', 'Thịnh Trị Khai Khoa', 'Chấn hưng kỷ cương cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_27', 'Phạm Vấn', 77, 8, 'ally', 'Khai quốc công thần', 'Phạm Vấn (?-1436) là công thần khai quốc nhà Lê sơ quê ở Thọ Xuân, Thanh Hóa. Là người tham gia khởi nghĩa Lam Sơn từ buổi ban đầu, ông luôn kề vai sát cánh và hết sức giúp rập Bình Định Vương Lê Lợi vượt qua những thời kỳ gian khổ nhất.', 'Tận Trung Giúp Rập', 'Luôn kề vai sát cánh bên chủ tướng, gánh vác sát thương và tăng cường sinh lực cho toàn đội trong gian khó. (Gây 154% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_28', 'Đỗ Bí', 64, 8, 'ally', 'Tướng quân', 'Đỗ Bí (Lê Bí) là tướng tham gia khởi nghĩa Lam Sơn từ ngày đầu. Khi nghĩa quân bị đánh úp, gia quyến Lê Lợi bị bắt, lòng quân chán nản bỏ trốn, ông là một trong số ít tướng sĩ vẫn kiên trung theo chủ tướng. Cố thủ trong núi Chí Linh bị tuyệt lương suốt 3 tháng, ông vẫn kiên cường phòng thủ cho tới khi quân Minh phải rút đi.', 'Chí Linh Tuyệt Lương', 'phòng thủ (+15%) kiên cường trong nghịch cảnh cho toàn đội (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_29', 'Lê Văn Linh', 63, 8, 'ally', 'Khai quốc công thần', 'Lê Văn Linh (1376–1448) là công thần khai quốc nhà Lê sơ quê ở Thọ Xuân, Thanh Hóa. Ông có học vấn uyên thâm, tham gia nghĩa quân Lam Sơn từ sớm và làm quan trải qua ba đời vua (Lê Thái Tổ, Lê Thái Tông, Lê Nhân Tông). Công lao to lớn của ông đã giúp triều Lê sơ xây dựng, củng cố và ổn định vững chắc nền móng quốc gia.', 'Tam Triều Lão Thần', 'Kinh nghiệm phục vụ qua nhiều triều đại cho toàn đội (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_30', 'Vũ Như Tô', 48, 8, 'ally', 'Kiến trúc sư', 'Vũ Như Tô (? - 1517) là người thợ xây dựng tài ba triều Lê sơ. Ông là tác giả phác thảo kiến trúc của Cửu Trùng đài và cung điện trăm nóc trong Hoàng Thành Thăng Long — công trình vĩ đại được mô tả là "tuy chưa hoàn thành mà bóng rợp nửa hồ Tây". Do xây dựng quá tốn kém khiến nhân dân lầm than, ông đã bị phiến quân giết hại.', 'Cửu Trùng Đài', 'Xây dựng hệ thống công sự đồ sộ cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_31', 'Lê Tư Tề', 48, 8, 'ally', 'Hoàng tử', 'Lê Tư Tề (1401–?) là con trai trưởng của Lê Lợi. Ông từng tham gia khởi nghĩa Lam Sơn và phải vào thành Đông Đô làm con tin cho quân Minh. Ông không chỉ mang thân phận hoàng tử mà còn là người đã cùng cha và các tướng lĩnh đóng góp máu xương đem lại nền độc lập cho Đại Việt.', 'Đại Cục Nhẫn Nhục', 'Chấp nhận hiểm nguy vì đại cục, thu hút hỏa lực của 1 mục tiêu địch về phía bản thân và nhận ít sát thương hơn khi sinh lực thấp. (Gây 96% sát thương Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h8_32', 'Nguyễn Thị Bành', 49, 8, 'ally', 'Nữ tướng giả trai', 'Nguyễn Thị Bành là nữ tướng duy nhất trong lịch sử Việt Nam từng giả trai để tham gia nghĩa quân. Bà là vợ của danh tướng Nguyễn Chích, một khai quốc công thần trong cuộc khởi nghĩa Lam Sơn chống quân Minh vào thế kỷ XV.', 'Giả Trai Xuất Trận', 'Cải trang xông pha trận mạc, gây sát thương (98% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),

  // ═══════════════════════════════════════ CHƯƠNG 9 ═══════════════════════════════════════
  createHero2('h9_1','Nguyễn Bỉnh Khiêm',95,9,'ally','Trạng Trình','Nhà tư tưởng, nhà thơ lớn, nhà tiên tri lỗi lạc bậc nhất lịch sử Việt Nam. Với tầm nhìn vượt thời đại, lời khuyên và sấm truyền của ông ("Cao Bàng vi chi, tẩu mã khả bảo", "Việc nước muốn yên, đào rau muống mà ăn") đã vạch lối cho cả ba tập đoàn Mạc - Trịnh - Nguyễn sinh tồn, giữ đất và phát triển qua thời kỳ nội chiến đẫm máu.','Bạch Vân Cơ Mưu (Thi triển trận đồ sấm ký toàn sân, gây 150% sát thương phép toàn đội hình địch, đồng thời hóa giải mọi trạng thái bất lợi, tăng 15% Tốc độ và tạo Khiên ảo bằng 20% máu tối đa cho toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương toàn đội, Thanh tẩy hoàn toàn, Tăng tốc & Tạo khiên siêu lớn.)','','neutral'),
  createHero2('h9_2','Mạc Đăng Dung',85,9,'ally','Hào kiệt','Người sáng lập nhà Mạc, võ nghệ cao cường, từng đỗ võ cử và giữ chức Tổng đô chỉ huy sứ thời hậu Lê. Ông lập ra Bắc Triều, mở ra một triều đại có nhiều chính sách cởi mở về thương mại, kinh tế và giáo dục.','Bắc Triều Khai Cơ (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân nhận 20% Phòng thủ và tăng 10% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn, Tăng thủ & Tăng công toàn đội.)','','mac'),
  createHero2('h9_3','Mạc Kính Điển',85,9,'ally','Hào kiệt','Danh tướng tài ba và tận tụy bậc nhất của nhà Mạc, người trực tiếp cầm quân chống lại các cuộc tấn công của phe Nam Triều (Trịnh Kiểm) trong suốt nhiều thập kỷ, giữ vững vùng biên ải và kinh thành Thăng Long.','Trấn Thủ Bắc Đồ (Gây 140% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời bản thân nhận 20% Phòng thủ và phản 15% sát thương trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng thủ & Phản sát thương.)','','mac'),
  createHero2('h9_4','Nguyễn Kính',85,9,'ally','Hào kiệt','Danh tướng dũng mãnh hàng đầu của nhà Mạc, nổi tiếng với biệt tài chiến đấu gan dạ, lập nhiều chiến công lớn trong các chiến dịch đối đầu trực diện với lực lượng Nam Triều.','Dũng Tướng Bắc Triều (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Thuần sát thương đơn & Xuyên giáp mạnh.)','','mac'),
  createHero2('h9_5','Mạc Đăng Doanh',75,9,'ally','Hào kiệt','Vị hoàng đế thứ hai của nhà Mạc, nổi tiếng với sự minh bạch trong tuyển dụng quan lại qua khoa cử, chấn hưng kỷ cương luật pháp và phát triển đất nước thời kỳ đầu Bắc Triều.','Minh Trị Đăng Doanh (Gây 140% sát thương phép lên 3 tướng địch hàng trước, đồng thời tăng 12% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Tăng công toàn đội.)','','mac'),
  createHero2('h9_6','Nguyễn Giản Thanh',75,9,'ally','Hào kiệt','Vị Trạng nguyên đầu tiên của triều Mạc (khoa thi năm 1526), nổi tiếng với văn tài sắc sảo, có công lớn trong việc định hình nền giáo dục và khoa cử đầu thời Mạc.','Khôi Nguyên Trí Tuệ (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','mac'),
  createHero2('h9_7','Nguyễn Quyện',75,9,'ally','Hào kiệt','Danh tướng kỳ tài của nhà Mạc, nổi tiếng với mưu lược phòng thủ, đánh du kích xuất quỷ nhập thần và am hiểu sâu sắc thủy chiến ở vùng hạ lưu sông Hồng.','Thủy Trận Mai Phục (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời làm giảm 10% Phòng thủ của mục tiêu trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Giảm thủ.)','','mac'),
  createHero2('h9_8','Nguyễn Dữ',75,9,'ally','Hào kiệt','Học trò xuất sắc của Trạng Trình Nguyễn Bỉnh Khiêm, danh sĩ tài hoa thời Mạc, tác giả kiệt tác văn học chữ Hán Truyền kỳ mạn lục phản ánh sâu sắc hiện thực xã hội và nhân sinh thời bấy giờ.','Truyền Kỳ Mạn Lục (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời giải 1 trạng thái bất lợi cho toàn đội).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Thanh tẩy diện rộng.)','','mac'),
  createHero2('h9_9','Mạc Kính Cung',75,9,'ally','Hào kiệt','Tôn thất nhà Mạc kiên cường, người đã vực dậy và duy trì thế lực của nhà Mạc tại vùng núi cao Cao Bằng suốt nhiều thập kỷ sau khi Thăng Long thất thủ.','Cao Bằng Trấn Thủ (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Phòng thủ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ bản thân.)','','mac'),
  createHero2('h9_10','Mạc Phúc Hải',65,9,'ally','Hào kiệt','Vị hoàng đế thứ ba của nhà Mạc, người kế vị ngai vàng trong bối cảnh chiến tranh Nam - Bắc triều bắt đầu bùng nổ gay gắt và phải đối mặt với nhiều áp lực quân sự.','Vực Sâu Giữ Nước (Gây 110% sát thương phép lên 1 hàng dọc, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ bản thân.)','','mac'),
  createHero2('h9_11','Bùi Văn Khuê',65,9,'ally','Hào kiệt','Tướng lĩnh từng phục vụ dưới triều nhà Mạc trước khi có sự chuyển dịch lực lượng trong bối cảnh cục diện chiến tranh biến động phức tạp cuối thế kỷ XVI.','Biến Động Thời Cục (Gây 110% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời tăng 5% Né tránh trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn & Tăng né tránh.)','','mac'),
  createHero2('h9_12','Trịnh Kiểm',85,9,'ally','Hào kiệt','Con rể Nguyễn Kim, người nắm giữ toàn bộ binh quyền thực tế của Nam Triều, nhà quân sự kiệt xuất đặt nền móng vững chắc cho thế lực họ Trịnh thống trị Đàng Ngoài suốt nhiều thế kỷ.','Trịnh Chủ Uy Phong (Gây 140% sát thương vật lý lên 3 tướng địch hàng trước. Có 20% tỷ lệ làm giảm 15% Tấn công của địch trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Giảm công địch.)','','le_trinh'),
  createHero2('h9_13','Trịnh Tùng',85,9,'ally','Hào kiệt','Con trai Trịnh Kiểm, nhà quân sự thiên tài trực tiếp chỉ huy chiến dịch tổng phản công đại phá Bắc Triều, chiếm lại Thăng Long (1592) và đưa vua Lê về kinh đô cũ, củng cố uy quyền họ Trịnh.','Tổng Phản Công (Gây 140% sát thương phép lên 3 tướng địch hàng trước, đồng thời tăng 12% Tấn công và 10% Tốc độ toàn đội trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng công & Tăng tốc toàn đội.)','','le_trinh'),
  createHero2('h9_14','Trịnh Cương',85,9,'ally','Hào kiệt','Vị chúa Trịnh nổi tiếng anh minh với các cải cách lớn về hành chính, thuế khóa, quân đội và tiền tệ đầu thế kỷ XVIII, đưa Đàng Ngoài bước vào giai đoạn ổn định thịnh vượng.','Trịnh Triều Cải Cách (Gây 140% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Tấn công và 10% Phòng thủ toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới, Tăng công & Tăng thủ toàn đội.)','','le_trinh'),
  createHero2('h9_15','Nguyễn Kim',75,9,'ally','Hào kiệt','Khai quốc công thần của phong trào Nam Triều, người phất cao ngọn cờ "phò Lê diệt Mạc", xây dựng lại thế lực ở vùng Ái Tử (Thanh Hóa - Nghệ An), đặt nền móng phục hưng nhà Lê.','Phò Lê Hưng Quốc (Gây 145% sát thương vật lý lên 1 mục tiêu hàng trên, đồng thời tăng 15% Phòng thủ trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn & Tăng thủ bản thân.)','','le_trinh'),
  createHero2('h9_16','Trịnh Tráng',75,9,'ally','Hào kiệt','Chúa Trịnh kế vị Trịnh Tùng, là người trực tiếp khơi mào giai đoạn chiến tranh Trịnh - Nguyễn phân tranh kéo dài suốt nhiều thập kỷ dọc theo sông Gianh.','Bắc Trực Nam Chinh (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời giảm 10% Phòng thủ mục tiêu trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Giảm thủ mục tiêu.)','','le_trinh'),
  createHero2('h9_17','Trịnh Doanh',75,9,'ally','Hào kiệt','Chúa Trịnh có tài thao lược, nổi tiếng với công cuộc dẹp yên các cuộc khởi nghĩa nông dân ở đàng Ngoài, giữ vững sự ổn định của chính quyền họ Trịnh thế kỷ XVIII.','Bình Định Nội Loạn (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ toàn đội.)','','le_trinh'),
  createHero2('h9_18','Phùng Khắc Khoan',75,9,'ally','Hào kiệt','Trạng nguyên, nhà ngoại giao, nhà thơ lỗi lạc của Đàng Ngoài. Sứ thần tài ba đi sứ nhà Minh thành công, mang nghề dệt lụa và làm nón về truyền bá cho nhân dân.','Ngoại Giao Sứ Trình (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời giải 1 trạng thái bất lợi cho toàn đội).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Thanh tẩy diện rộng.)','','le_trinh'),
  createHero2('h9_19','Nguyễn Hữu Liêu',75,9,'ally','Hào kiệt','Danh tướng đắc lực của chúa Trịnh Tùng, lập công lớn trong các chiến dịch đánh tan quân Mạc và mở rộng lãnh thổ Đàng Ngoài.','Trịnh Triều Mãnh Tướng (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Thuần sát thương đơn & Xuyên giáp.)','','le_trinh'),
  createHero2('h9_20','Vũ Văn Mật',75,9,'ally','Hào kiệt','Danh tướng trung kiên trấn thủ vùng Tây Bắc (Tuyên Quang), liên minh vững chắc phò tá Nam Triều chống lại nhà Mạc trong suốt nhiều thập kỷ.','Trấn Ải Tây Bắc (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Phòng thủ bản thân và đồng minh cùng hàng trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ đồng minh.)','','le_trinh'),
  createHero2('h9_21','Đặng Nguyên Cẩn',75,9,'ally','Hào kiệt','Danh sĩ, tiến sĩ nổi tiếng thanh liêm, nhà giáo mẫu mực ở Đàng Ngoài, có uy tín lớn trong giới sĩ phu và triều đình Lê - Trịnh.','Thanh Liêm Sĩ Phong (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 12% Phòng thủ toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ toàn đội.)','','le_trinh'),
  createHero2('h9_22','Lê Thế Tông',65,9,'ally','Hào kiệt','Vị vua nhà Lê trung hưng dưới thời chúa Trịnh Tùng, đánh dấu mốc khôi phục lại kinh đô Thăng Long sau nhiều năm chiến tranh chia cắt.','Lê Triều Khôi Phục (Gây 110% sát thương phép lên 1 hàng dọc, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng thủ bản thân.)','','le_trinh'),
  createHero2('h9_23','Lê Dụ Tông',65,9,'ally','Hào kiệt','Vị vua thời Lê Trung Hưng, trị vì giai đoạn đầu thế kỷ XVIII, chứng kiến thời kỳ triều đình bắt đầu suy yếu rõ rệt trước quyền lực lấn át của các chúa Trịnh.','Trung Hưng Suy Bi (Gây 95% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tăng 8% Né tránh bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng né tránh.)','','le_trinh'),
  createHero2('h9_24','Đặng Chi',65,9,'ally','Hào kiệt','Danh tướng trung thần phò tá triều đình Lê - Trịnh, xông pha trận mạc bảo vệ biên giới và ổn định nội trị.','Trung Nghĩa Song Toàn (Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ bản thân.)','','le_trinh'),
  createHero2('h9_25','Ngô Trí Hòa',55,9,'ally','Hào kiệt','Trạng nguyên, đại thần ngoại giao nổi tiếng đời Lê - Trịnh, người đại diện triều đình giải quyết nhiều vấn đề bang giao phức tạp với phương Bắc.','Sứ Thần Bình Định (Gây 80% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời làm giảm 5% Tốc độ địch trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Giảm tốc độ địch.)','','le_trinh'),
  createHero2('h9_26','Nguyễn Hoàng',85,9,'ally','Hào kiệt','Vị Chúa Nguyễn đầu tiên đặt nền móng cho cơ nghiệp Đàng Trong. Với tầm nhìn chiến lược vĩ đại, ông đã thu phục lòng dân, khai hoang lập ấp, biến vùng đất hoang sơ Thuận - Quảng thành căn cứ địa vô cùng vững mạnh.','Khai Hoang Nam Quốc (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Bản thân nhận 20% Phòng thủ và tự hồi 10% máu tối đa trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương đơn, Tăng thủ & Tự hồi máu.)','','nguyen'),
  createHero2('h9_27','Nguyễn Phúc Nguyên',85,9,'ally','Hào kiệt','Vị Chúa Nguyễn thứ hai, chính thức xây dựng lũy Thầy kiên cố, phát triển thương mại quốc tế (cảng Hội An) và từ chối thần phục họ Trịnh, mở màn thời kỳ Đàng Trong đối đầu Đàng Ngoài.','Xây Lũy Lập Quốc (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời tạo lớp Khiên ảo bằng 20% máu tối đa cho bản thân và đồng minh thấp máu nhất).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tạo khiên kép.)','','nguyen'),
  createHero2('h9_28','Nguyễn Phúc Tần',85,9,'ally','Hào kiệt','Vị chúa Nguyễn kiệt xuất trực tiếp đánh bại các cuộc đại viễn chinh đường biển quy mô lớn của quân Trịnh, giữ vững biên giới sông Gianh và củng cố vững chắc cơ nghiệp Đàng Trong.','Sông Gianh Trấn Thủ (Gây 140% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời tăng 12% Phòng thủ và phản 15% sát thương trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng thủ & Phản sát thương.)','','nguyen'),
  createHero2('h9_29','Đào Duy Từ',85,9,'ally','Hào kiệt','Bậc đại mưu sĩ, nhà quân sự, văn hóa thiên tài của Đàng Trong. Ông là kiến trúc sư trưởng thiết kế hệ thống Lũy Thầy bất khả xâm phạm giúp Chúa Nguyễn chặn đứng hoàn toàn các đợt tấn công của quân Trịnh.','Lũy Thầy Bất Khả (Gây 140% sát thương phép lên 3 tướng địch hàng trước, đồng thời tăng 12% Phòng thủ và 10% Công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang, Tăng thủ & Tăng công toàn đội.)','','nguyen'),
  createHero2('h9_30','Nguyễn Phúc Chu',75,9,'ally','Hào kiệt','Vị chúa có công lớn mở rộng cương thổ xuống phương Nam, chính thức thành lập phủ Gia Định năm 1698, phát triển mạnh mẽ kinh tế, giáo dục và văn hóa Đàng Trong rực rỡ.','Minh Chủ Mở Cõi (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 12% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng công toàn đội.)','','nguyen'),
  createHero2('h9_31','Nguyễn Hữu Cảnh',75,9,'ally','Hào kiệt','Vị danh tướng kiệt xuất có công lớn trong việc kinh lược đất Sài Gòn - Gia Định, thiết lập hệ thống hành chính chính thức khẳng định chủ quyền Đàng Trong ở Nam Bộ (năm 1698).','Kinh Lược Gia Định (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','nguyen'),
  createHero2('h9_32','Mạc Cửu',75,9,'ally','Hào kiệt','Danh nhân người Hoa có công lớn khai phá vùng đất Hà Tiên, quy tụ lưu dân, phát triển kinh tế thương mại sầm uất, đặt nền móng vững chắc cho chủ quyền miền Tây Nam Bộ.','Khai Trấn Hà Tiên (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','nguyen'),
  createHero2('h9_33','Nguyễn Hữu Dật',75,9,'ally','Hào kiệt','Đại danh tướng kiệt xuất của Đàng Trong, bậc thầy quân sự chỉ huy các trận đánh phòng thủ và phản công xuất sắc dọc theo phòng tuyến Lũy Thầy và sông Gianh.','Gianh Tuyến Thiết Giáp (Gây 180% sát thương vật lý lên 1 mục tiêu hàng trên. Đòn đánh có 15% tỷ lệ bỏ qua 15% Giáp của địch).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Thuần sát thương đơn & Xuyên giáp.)','','nguyen'),
  createHero2('h9_34','Nguyễn Hữu Tiến',75,9,'ally','Hào kiệt','Đại danh tướng Đàng Trong, nổi tiếng với lòng dũng cảm tuyệt vời và tài thao lược sắc bén trong cuộc đối đầu trực diện với các danh tướng họ Trịnh.','Nam Hà Trấn Thủ (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Tấn công và 10% Tốc độ bản thân trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng tốc bản thân.)','','nguyen'),
  createHero2('h9_35','Nguyễn Phúc Thái',75,9,'ally','Hào kiệt','Vị chúa kế vị tiếp tục củng cố chính quyền, ngoại giao khôn khéo, phát triển kinh tế thương cảng Hội An và mở rộng lãnh thổ miền Trung.','Hội An Phồn Thịnh (Gây 135% sát thương phép lên 3 tướng địch hàng dưới, đồng thời giải 1 trạng thái bất lợi cho toàn đội).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Thanh tẩy diện rộng.)','','nguyen'),
  createHero2('h9_36','Tống Phước Trị',65,9,'ally','Hào kiệt','Danh tướng phò tá các đời Chúa Nguyễn đầu tiên trong công cuộc khai phá và bảo vệ biên giới phía nam.','An Biên Dũng Tướng (Gây 95% sát thương vật lý lên 3 tướng địch hàng dưới, đồng thời tăng 8% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dưới & Tăng thủ bản thân.)','','nguyen'),
  createHero2('h9_37','Nguyễn Cửu Vân',65,9,'ally','Hào kiệt','Danh tướng Đàng Trong có công lớn trong việc chiêu mộ lưu dân, mở rộng và củng cố vùng đất phương Nam.','Mở Cõi Phương Nam (Gây 110% sát thương vật lý lên 1 hàng dọc, đồng thời tăng 8% Tấn công bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc & Tăng công bản thân.)','','nguyen'),
  createHero2('h9_38','Nguyễn Phúc Lan',75,9,'ally','Hào kiệt','Vị Chúa Nguyễn thứ ba cai trị Đàng Trong, kế tục xuất sắc sự nghiệp của Chúa Sãi, củng cố phòng tuyến sông Gianh và phát triển thương mại Đàng Trong phồn thịnh.','Thuận Hóa Trấn Định (Gây 145% sát thương phép lên 1 hàng dọc, đồng thời tăng 10% Phòng thủ và 10% Tấn công toàn đội trong 2 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng dọc, Tăng công & Tăng thủ toàn đội.)','','nguyen'),
  createHero2('h9_39','Dương Văn An',55,9,'ally','Hào kiệt','Nhà sử học nổi tiếng, tác giả bộ sách quý giá Ô châu cận lục ghi chép chi tiết về vùng đất Thuận Hóa - Quảng Nam thời kỳ đầu mở cõi.','Ô Châu Biên Khảo (Gây 80% sát thương vật lý lên 3 tướng địch hàng trước, đồng thời tăng 5% Phòng thủ bản thân trong 1 hiệp).','Gây sát thương dựa trên chỉ số cơ bản. (Hiệu ứng: Sát thương hàng ngang & Tăng thủ bản thân.)','','nguyen'),

  // ═══════════════════════════════════════ CHƯƠNG 10 ═══════════════════════════════════════
  createHero2('h10_1', 'Nguyễn Huệ', 92, 10, 'ally', 'Quang Trung Hoàng Đế', 'Nguyễn Huệ (Quang Trung) là thiên tài quân sự vĩ đại, một trong những vị vua kiệt xuất nhất lịch sử Việt Nam. Ông đánh tan 29 vạn quân Thanh xâm lược chỉ trong 5 ngày (Tết Kỷ Dậu 1789) — chiến thắng nhanh chóng nhất lịch sử thế giới. Ông cũng đánh bại quân Xiêm ở Rạch Gầm-Xoài Mút.', 'Đống Đa Đại Phá', 'Xuất kỳ bất ý tấn công toàn lực, gây sát thương (184% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_2', 'Nguyễn Nhạc', 75, 10, 'ally', 'Tây Sơn Vương', 'Nguyễn Nhạc là anh cả và người sáng lập phong trào Tây Sơn, lên ngôi Trung Ương Hoàng Đế. Ông chiếm được Gia Định và diệt nhà Nguyễn năm 1777, sau đó nhường quyền lực cho em Nguyễn Huệ.', 'Tây Sơn Khởi Nghĩa', 'Khởi đầu cuộc nổi dậy vĩ đại cho toàn đội (+20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_3', 'Nguyễn Lữ', 73, 10, 'ally', 'Đông Định Vương', 'Nguyễn Lữ là em út trong ba anh em nhà Tây Sơn, được phong Đông Định Vương trấn thủ Gia Định. Ông bị quân Nguyễn Ánh đánh bại và phải bỏ chạy, là người yếu nhất trong ba anh em.', 'Tây Sơn Ngũ Phụng', 'Chiến đấu trong hàng ngũ gia đình cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_4', 'Ngô Thì Nhậm', 78, 10, 'ally', 'Quân sư', 'Ngô Thì Nhậm là quân sư tài ba của Quang Trung, người thiết kế chiến lược "vừa đánh vừa đàm" để ổn định quan hệ với nhà Thanh sau chiến thắng Đống Đa. Là nhà văn, nhà ngoại giao xuất sắc.', 'Vừa Đánh Vừa Đàm', 'Kết hợp sức mạnh và ngoại giao, kiểm soát cục diện toàn trận. (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_5', 'Trần Quang Diệu', 80, 10, 'ally', 'Đại tướng', 'Trần Quang Diệu là đại tướng kiệt xuất của Tây Sơn, người bao vây thành Quy Nhơn suốt 3 năm. Ông và vợ là Bùi Thị Xuân — hai danh tướng vợ chồng nổi tiếng nhất lịch sử Việt Nam.', 'Tam Niên Bao Vây', 'Kiên nhẫn vây hãm địch, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_6', 'Bùi Thị Xuân', 80, 10, 'ally', 'Nữ đại tướng', 'Bùi Thị Xuân là nữ đại tướng của Tây Sơn, vợ Trần Quang Diệu. Bà nổi tiếng với tài cưỡi voi và võ nghệ tuyệt luân. Sau khi Tây Sơn thất bại, bà bị xử tử dã man nhưng vẫn hiên ngang không khuất phục.', 'Tượng Binh Nữ Tướng', 'Cưỡi voi xung phong dẫn đầu, gây sát thương (160% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_7', 'Vũ Văn Dũng', 68, 10, 'ally', 'Thủy tướng', 'Vũ Văn Dũng là đô đốc thủy quân xuất sắc của Tây Sơn, người chỉ huy trận Rạch Gầm-Xoài Mút tiêu diệt 5 vạn quân Xiêm năm 1785.', 'Rạch Gầm Hỏa Công', 'Hỏa công trên sông, gây sát thương (136% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_8', 'Phan Văn Lân', 68, 10, 'ally', 'Đại tướng', 'Phan Văn Lân là đại tướng của Tây Sơn, có công lớn trong nhiều chiến dịch của Quang Trung, đặc biệt trong trận đánh quân Thanh ở Thăng Long.', 'Thần Tốc Tiến Quân', 'Tiến quân thần tốc không kịp phòng bị, gây sát thương (136% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_9', 'Ngô Văn Sở', 69, 10, 'ally', 'Đại tướng', 'Ngô Văn Sở là đại tướng của Tây Sơn, người trấn thủ Bắc Hà khi Quang Trung vắng mặt. Ông chỉ huy rút quân chiến lược khi quân Thanh xâm lược để bảo toàn lực lượng cho cuộc phản công.', 'Chiến Lược Lui Quân', 'Lui quân có chiến lược, gây sát thương (138% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_10', 'Nguyễn Thiếp', 81, 10, 'ally', 'La Sơn Phu Tử', 'Nguyễn Thiếp (La Sơn Phu Tử) là nhà khoa học và học giả vĩ đại, cố vấn được Quang Trung trọng dụng. Ông đề xuất chiến lược đánh quân Thanh vào dịp Tết và cải cách giáo dục quốc gia bằng chữ Nôm.', 'Thiên Cơ Đoán Định', 'Phân tích thiên cơ chính xác, gây sát thương (162% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_11', 'Lê Văn Hưng', 55, 10, 'ally', 'Tướng quân', 'Tướng quân trung thành của Tây Sơn, có công trong nhiều trận đánh bảo vệ vùng đất phía nam.', 'Nam Thổ Bảo Vệ', 'Bảo vệ vùng đất phía nam cho toàn đội (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_12', 'Lê Văn Bưu', 65, 10, 'ally', 'Danh tướng', 'Danh tướng thời 10.', 'Dũng Mãnh', 'Gây 100% sát thương lên 1 mục tiêu.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_13', 'Nguyễn Văn Tuyết', 53, 10, 'ally', 'Tướng quân', 'Tướng quân Tây Sơn nổi tiếng với lòng dũng cảm trong các trận đánh thần tốc.', 'Thần Tốc Hành Quân', 'Hành quân cực nhanh, gây sát thương (106% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_14', 'Nguyễn Văn Lộc', 52, 10, 'ally', 'Tướng quân', 'Tướng quân Tây Sơn có tài chiến đấu cận chiến, chuyên phá trận địa của địch.', 'Xáp Lá Cà', 'Chiến đấu cận chiến dữ dội, gây sát thương (104% Tấn công) cao nhưng nhận sát thương tăng. (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_15', 'Hồ Văn Huệ', 54, 10, 'ally', 'Tướng quân', 'Tướng quân Tây Sơn, đại diện cho tinh thần bất khuất của nghĩa quân vùng Bình Định.', 'Tây Sơn Hổ Tướng', 'Sức mạnh và tinh thần của hổ Tây Sơn cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_16', 'Phan Huy Ích', 70, 10, 'ally', 'Văn thần', 'Phan Huy Ích là học giả và nhà ngoại giao Tây Sơn, người soạn các văn bản ngoại giao với nhà Thanh sau chiến thắng Đống Đa.', 'Ngoại Giao Hòa Bình', 'Đàm phán sau chiến thắng, gây sát thương (140% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_17', 'Bùi Dương Lịch', 52, 10, 'ally', 'Văn thần', 'Bùi Dương Lịch là học giả triều Tây Sơn, có đóng góp về văn hóa và giáo dục trong thời kỳ ngắn ngủi của vương triều này.', 'Văn Hóa Khai Sáng', 'Nâng cao trí tuệ toàn đội cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_18', 'Lê Duy Kỳ', 53, 10, 'ally', 'Hoàng đế Lê triều', 'Lê Duy Kỳ (Lê Chiêu Thống) là vị vua cuối của nhà Hậu Lê, người cầu viện quân Thanh và dẫn đến sự kiện Quang Trung đánh đuổi 29 vạn quân Thanh. Ông bị xem là kẻ phản quốc trong lịch sử.', 'Sự Tuyệt Vọng', 'Chiến đấu trong tuyệt vọng cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_19', 'Trương Văn Đa', 51, 10, 'ally', 'Tướng quân', 'Tướng quân Tây Sơn, tham gia chiến dịch Đống Đa lịch sử.', 'Đống Đa Chi Chiến', 'Tinh thần chiến đấu từ chiến thắng Đống Đa cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_20', 'Ngô Thì Chí', 54, 10, 'ally', 'Văn thần', 'Em của Ngô Thì Nhậm, cũng là học giả có đóng góp về văn học và tư tưởng thời Tây Sơn.', 'Huynh Đệ Văn Tài', 'Cùng huynh đệ tài năng chiến đấu cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_21', 'Huỳnh Thị Cúc', 48, 10, 'ally', 'Nữ tướng', 'Huỳnh Thị Cúc (? - 1802) là một nữ tướng của triều Tây Sơn, thuộc "Tây Sơn ngũ phụng thư". Quê ở Quảng Ngãi, là em ruột Đô đốc Huỳnh Văn Thuận. Dù vóc dáng mảnh mai, tính nết dịu dàng, bà lại có tài kiếm thuật siêu phàm, từng cùng Nguyễn Thị Dung thọ giáo nữ tướng Bùi Thị Xuân.', 'Nhu Cốt Kiếm Thuật', 'Kiếm thuật sắc bén, gây sát thương (96% Tấn công) lên 1 mục tiêu địch..', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_22', 'Bùi Thị Nhạn', 62, 10, 'ally', 'Hoàng hậu / Nữ tướng', 'Bùi Thị Nhạn (? - 1802) là Chính cung Hoàng hậu của vua Quang Trung. Quê ở Bình Định, bà giỏi võ nghệ, tính nết nhu hòa, được dân gian liệt vào "Tây Sơn ngũ phụng thư". Bà vừa là cô ruột vừa là thầy dạy võ cho nữ tướng Bùi Thị Xuân. Sau khi xuất giá, bà lùi về làm hậu phương vững chắc cho Quang Trung.', 'Hậu Phương Vững Chắc', 'Chăm lo hậu phương cho toàn đội (Hồi 12% Máu tối đa). Đồng thời: +20 Nhuệ khí.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_23', 'Nguyễn Thị Dung', 47, 10, 'ally', 'Nữ tướng', 'Nguyễn Thị Dung (? - 1802) là một nữ tướng kiệt xuất của triều Tây Sơn và là một trong "Tây Sơn ngũ phụng thư". Cùng quê Quảng Ngãi với Huỳnh Thị Cúc, bà đã lặn lội lên Xuân Hòa thọ giáo võ nghệ từ nữ đại tướng Bùi Thị Xuân, cống hiến trọn đời cho sự nghiệp Tây Sơn.', 'Song Kiếm Phụng Thư', 'Phối hợp tác chiến tuyệt hảo, gia tăng sát thương và sự dẻo dai khi chiến đấu cùng các nữ tướng Tây Sơn khác. (Gây 94% sát thương Tấn công). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_24', 'Trần Thị Lan', 49, 10, 'ally', 'Nữ tướng', 'Trần Thị Lan (? - 1802) là nữ tướng xuất sắc triều Tây Sơn, đồng thời là tùy tướng thân tín của Bùi Thị Xuân. Nằm trong "Tây Sơn ngũ phụng thư", bà không chỉ dũng cảm trên chiến trường mà sau này còn trở nên giàu có, là hậu phương vững chắc và là phu nhân của danh tướng Nguyễn Văn Tuyết.', 'Phụng Thư Hậu Thuẫn', 'Cung cấp tài lực và yểm trợ chiến thuật cho toàn đội (+10% Tấn công).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_25', 'Lê Ngọc Hân', 49, 10, 'ally', 'Bắc cung Hoàng hậu', 'Lê Ngọc Hân (1770 – 1799), còn gọi là Công chúa Ngọc Hân, là công chúa triều Hậu Lê và sau trở thành Bắc cung Hoàng hậu của Quang Trung hoàng đế (Nguyễn Huệ). Bà nổi danh với tài văn thơ xuất chúng, tiêu biểu là kiệt tác "Ai tư vãn" vô cùng xúc động khóc thương vua Quang Trung băng hà.', 'Ai Tư Vãn', 'Lời thơ bi ai nhưng khơi dậy tinh thần chiến đấu mãnh liệt cho toàn đội (+10% Tấn công, +20 Nhuệ khí).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_26', 'Phạm Thị Liên', 49, 10, 'ally', 'Chính cung Hoàng hậu', 'Phạm Thị Liên (1758–1791) là Chính cung Hoàng hậu triều Tây Sơn, người vợ tào khang gắn bó với Hoàng đế Quang Trung (Nguyễn Huệ) từ thuở hàn vi. Bà sinh tại Bình Định, kết hôn năm 16 tuổi và là người phụ nữ được vua Quang Trung vô cùng sủng ái. Việc bà qua đời năm 1791 đã để lại nỗi đau xót lớn cho nhà vua.', 'Tào Khang Trọng Tình', 'Tình phu thê sâu nặng cho toàn đội (Hồi 10% Máu tối đa). Đồng thời: +20 Nhuệ khí.', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_27', 'Nguyễn Quang Toản', 49, 10, 'ally', 'Hoàng đế Cảnh Thịnh', 'Nguyễn Quang Toản (1783 – 1802) là vị hoàng đế thứ ba và cuối cùng của triều Tây Sơn. Lên ngôi lúc mới 10 tuổi sau khi vua cha Quang Trung qua đời, do quá nhỏ nên triều chính bị Thái sư Bùi Đắc Tuyên thâu tóm khiến nội bộ lục đục, suy yếu. Năm 1802, triều đại Tây Sơn chính thức sụp đổ, ông bị Nguyễn Ánh bắt và chịu kết cục bi thảm.', 'Cảnh Thịnh Suy Vong', 'Triều chính rối loạn làm giảm sức tấn công, nhưng nhận được lớp khiên bảo vệ kiên cố khi sinh lực xuống thấp nhất. (+15% Phòng thủ).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),
  createHero2('h10_28', 'Nguyễn Hữu Chỉnh', 65, 10, 'ally', 'Đại tư đồ', 'Nguyễn Hữu Chỉnh (1741 - 1788), biệt hiệu Quận Bằng, là nhà quân sự, chính trị có ảnh hưởng lớn. Ông là người hiến kế cho Tây Sơn tiến quân ra Bắc tiêu diệt chúa Trịnh. Từng được vua Lê phong Đại tư đồ, nắm thực quyền cai quản Bắc Hà, nhưng sau vì ý đồ chống lại Tây Sơn nên bị đánh bại và giết chết.', 'Bắc Hà Quyền Lực', 'Kiến tạo mưu lược, tăng mạnh sát thương chiến thuật nhưng có nguy cơ làm giảm sút sĩ khí của quân ta. (Gây 130% sát thương Tấn công). (+20 Nhuệ khí). (Mục tiêu: 1 mục tiêu địch).', 'Gây sát thương vật lý lên 1 mục tiêu địch hàng trước.'),

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
  { id: 'art_ngoc_an', name: 'Long Đồ Ngọc Ấn', description: 'Tăng 20% HP. Ấn ngọc giao long biểu trưng quyền uy.', price: 50000, bonusHpPc: 20, exclusiveTo: ['h1_1'], image: './items/artifacts/art_ngoc_an.png', effectDesc: 'Miễn sát thương (15% tỷ lệ chặn đứng đòn đánh)', specialEffect: 'immune', effectChance: 15 },
  { id: 'art_thiet_truong', name: 'Thiết Trượng Đằng Ngà', description: 'Tăng 15% Tấn công, +20 Tốc độ. Bảo bối của Phù Đổng Thiên Vương.', price: 50000, bonusAtkPc: 15, bonusSpd: 20, exclusiveTo: ['h1_8'], image: './items/artifacts/art_thiet_truong.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_no_lien_chau', name: 'Nỏ Thần Kim Quy', description: 'Tăng 25% Tấn công (giảm 10% Phòng thủ). Báu vật trấn quốc.', price: 50000, bonusAtkPc: 25, bonusDefPc: -10, exclusiveTo: ['h1_12'], image: './items/artifacts/art_no_lien_chau.png', effectDesc: 'Thêm lượt đánh (25% tỷ lệ)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_kiem_tran_hai', name: 'Kiếm Trấn Hải', description: 'Tăng 20% Tấn công. Thanh gươm diệt thủy quái của Lạc Long Quân.', price: 50000, bonusAtkPc: 20, exclusiveTo: ['h1_3'], image: './items/artifacts/art_kiem_tran_hai.png', effectDesc: 'Miễn sát thương (15% tỷ lệ)', specialEffect: 'immune', effectChance: 15 },
  { id: 'art_gay_sinh_tu', name: 'Gậy Sinh Tử', description: 'Tăng 30% HP. Gậy thần cải tử hoàn sinh của Sơn Tinh.', price: 50000, bonusHpPc: 30, exclusiveTo: ['h1_6'], image: './items/artifacts/art_gay_sinh_tu.png', effectDesc: 'Hồi sinh với 50% HP (Kích hoạt 1 lần khi HP về 0)', specialEffect: 'revive', effectChance: 100 },
  { id: 'art_song_kiem', name: 'Song Kiếm Mê Linh', description: 'Tăng 10% Tấn công, +10 Tốc độ. Cặp kiếm uy dũng của Hai Bà Trưng.', price: 50000, bonusAtkPc: 10, bonusSpd: 10, exclusiveTo: ['h2_1', 'h2_2'], image: './items/artifacts/art_song_kiem.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_tram_nga', name: 'Trâm Ngà Chỉ Nguyệt', description: 'Tăng 15% HP, +100 Phòng thủ. Khí phách hiên ngang.', price: 50000, bonusHpPc: 15, bonusDef: 100, exclusiveTo: ['h2_6'], image: './items/artifacts/art_tram_nga.png', effectDesc: 'Miễn sát thương (15% tỷ lệ)', specialEffect: 'immune', effectChance: 15 },
  { id: 'art_long_kiem_van_xuan', name: 'Long Kiếm Vạn Xuân', description: 'Tăng 15% Tấn công. Gắn liền việc lập nước Vạn Xuân.', price: 50000, bonusAtkPc: 15, exclusiveTo: ['h3_1'], image: './items/artifacts/art_long_kiem_van_xuan.png', effectDesc: 'Hồi máu (Hồi 20% max HP sau khi đánh, 30% tỷ lệ)', specialEffect: 'heal', effectChance: 30 },
  { id: 'art_cu_moc', name: 'Cự Mộc Sát Hổ', description: 'Tăng 20% Tấn công. Sức mạnh bạt sơn của Phùng Hưng.', price: 50000, bonusAtkPc: 20, exclusiveTo: ['h3_5'], image: './items/artifacts/art_cu_moc.png', effectDesc: 'Gây choáng (20% tỷ lệ khiến địch mất lượt sau)', specialEffect: 'stun', effectChance: 20 },
  { id: 'art_an_tiet_do_su', name: 'Ấn Tiết Độ Sứ', description: 'Tăng 25% Phòng thủ. Quyền uy ngoại giao đoạt tự chủ.', price: 50000, bonusDefPc: 25, exclusiveTo: ['h3_7'], image: './items/artifacts/art_an_tiet_do_su.png', effectDesc: 'Gây choáng (20% tỷ lệ tước vũ khí địch)', specialEffect: 'stun', effectChance: 20 },
  { id: 'art_mu_dau_mau', name: 'Mũ Đâu Mâu Vuốt Rồng', description: 'Tăng 20% Tốc độ, +15% Tránh né. Lối đánh du kích Dạ Trạch.', price: 50000, bonusSpdPc: 20, exclusiveTo: ['h3_2'], image: './items/artifacts/art_mu_dau_mau.png', effectDesc: 'Miễn sát thương (20% tỷ lệ né tránh hoàn toàn)', specialEffect: 'immune', effectChance: 20 },
  { id: 'art_hich_tam_thien', name: 'Hịch Lệnh Tam Thiên', description: 'Tăng 20% HP. Sức mạnh thu phục nhân tâm.', price: 50000, bonusHpPc: 20, exclusiveTo: ['h3_9'], image: './items/artifacts/art_hich_tam_thien.png', effectDesc: 'Hồi máu (Hồi 25% max HP sau khi đánh, 25% tỷ lệ)', specialEffect: 'heal', effectChance: 25 },
  { id: 'art_coc_bach_dang', name: 'Hải Trấn Mộc Cọc', description: 'Tăng 20% Phòng thủ, +1000 HP. Kế sách đánh giặc lẫy lừng.', price: 50000, bonusDefPc: 20, bonusHp: 1000, exclusiveTo: ['h4_1'], image: './items/artifacts/art_coc_bach_dang.png', effectDesc: 'Gây choáng (20% tỷ lệ khiến địch mắc kẹt)', specialEffect: 'stun', effectChance: 20 },
  { id: 'art_co_lau', name: 'Cờ Lau Vạn Thắng', description: 'Tăng 15% tất cả chỉ số. Lá cờ dẹp loạn 12 sứ quân.', price: 50000, bonusAtkPc: 15, bonusDefPc: 15, bonusHpPc: 15, bonusSpdPc: 15, exclusiveTo: ['h4_0'], image: './items/artifacts/art_co_lau.png', effectDesc: 'Thêm lượt đánh (15% tỷ lệ bách chiến bách thắng)', specialEffect: 'extra_turn', effectChance: 15 },
  { id: 'art_ao_bao', name: 'Long Bào Thập Đạo', description: 'Tăng 25% HP, +200 Phòng thủ. Áo bào quyền lực của Lê Hoàn.', price: 50000, bonusHpPc: 25, bonusDef: 200, exclusiveTo: ['h4_2'], image: './items/artifacts/art_ao_bao.png', effectDesc: 'Miễn sát thương (15% tỷ lệ chân mệnh thiên tử)', specialEffect: 'immune', effectChance: 15 },
  { id: 'art_thieu_doi_do', name: 'Thăng Long Thiên Chiếu', description: 'Tăng 30% HP. Hào quang chiến lược ngàn năm.', price: 50000, bonusHpPc: 30, exclusiveTo: ['h5_1'], image: './items/artifacts/art_thieu_doi_do.png', effectDesc: 'Hồi máu (Hồi 30% max HP, 20% tỷ lệ)', specialEffect: 'heal', effectChance: 20 },
  { id: 'art_nam_quoc', name: 'Thiên Thư Trấn Quốc', description: 'Tăng 20% Tấn công, +500 Phòng thủ. Uy lực vô song từ Thần thơ.', price: 50000, bonusAtkPc: 20, bonusDef: 500, exclusiveTo: ['h5_2'], image: './items/artifacts/art_nam_quoc.png', effectDesc: 'Gây choáng (Bẻ gãy tâm lý, 25% tỷ lệ)', specialEffect: 'stun', effectChance: 25 },
  { id: 'art_tich_truong', name: 'Tích Trượng Thiền Môn', description: 'Tăng 25% Phòng thủ. Đứng sau quyền lực ôn hòa.', price: 50000, bonusDefPc: 25, exclusiveTo: ['h5_10'], image: './items/artifacts/art_tich_truong.png', effectDesc: 'Miễn sát thương (20% tỷ lệ hóa giải đòn đánh)', specialEffect: 'immune', effectChance: 20 },
  { id: 'art_guom_thai_su', name: 'Gươm Thái Sư', description: 'Tăng 25% Tấn công. Sự quyết đoán lạnh lùng.', price: 50000, bonusAtkPc: 25, exclusiveTo: ['h6_5'], image: './items/artifacts/art_guom_thai_su.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ chém không nương tay)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_binh_thu', name: 'Binh Thư Vạn Kiếp', description: 'Tăng 10% tất cả chỉ số. Binh thư trứ danh của Hưng Đạo Đại Vương.', price: 50000, bonusAtkPc: 10, bonusDefPc: 10, bonusHpPc: 10, bonusSpdPc: 10, exclusiveTo: ['h6_7'], image: './items/artifacts/art_binh_thu.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ nghệ thuật chiến tranh)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_thuan_thien', name: 'Thuận Thiên Kiếm', description: 'Tăng 15% HP, +500 Tấn công. Thanh bảo kiếm của Lê Lợi hội tụ tinh hoa.', price: 50000, bonusHpPc: 15, bonusAtk: 500, exclusiveTo: ['h8_1'], image: './items/artifacts/art_thuan_thien.png', effectDesc: 'Thêm lượt đánh (20% tỷ lệ thuận ý trời)', specialEffect: 'extra_turn', effectChance: 20 },
  { id: 'art_ngu_but', name: 'Ngự Bút Côn Sơn', description: 'Tăng 20% Tấn công. Ngọn bút có sức mạnh vạn quân.', price: 50000, bonusAtkPc: 20, exclusiveTo: ['h8_2'], image: './items/artifacts/art_ngu_but.png', effectDesc: 'Gây choáng (Tâm công, 25% tỷ lệ)', specialEffect: 'stun', effectChance: 25 },
  { id: 'art_o_long_dao', name: 'Ô Long Đại Đao & Áo Bào', description: 'Tăng 20% Tấn công, +15 Tốc độ. Biểu tượng bách chiến bách thắng.', price: 50000, bonusAtkPc: 20, bonusSpd: 15, exclusiveTo: ['h10_1'], image: './items/artifacts/art_o_long_dao.png', effectDesc: 'Thêm lượt đánh (25% tỷ lệ hành quân thần tốc)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_linh_tuong_ki', name: 'Linh Tượng Kì', description: 'Tăng 20% Tấn công, +500 HP. Cờ lệnh gọi voi chiến.', price: 50000, bonusAtkPc: 20, bonusHp: 500, exclusiveTo: ['h10_6'], image: './items/artifacts/art_linh_tuong_ki.png', effectDesc: 'Gây choáng (20% tỷ lệ voi chà đạp địch)', specialEffect: 'stun', effectChance: 20 },
  // ── Thần Khí Chương 9 (Thời Nam - Bắc Triều & Trịnh - Nguyễn) ──
  { id: 'art_sam_trang_trinh', name: 'Bạch Vân Am Sấm Ký', description: 'Tăng 25% HP, +20 Tốc độ. Sấm truyền vạch lối sinh tồn và định đoạt thế cuộc ba tập đoàn Mạc - Trịnh - Nguyễn.', price: 50000, bonusHpPc: 25, bonusSpd: 20, exclusiveTo: ['h9_1'], image: './items/artifacts/art_sam_trang_trinh.png', effectDesc: 'Thiên cơ bảo hộ (20% tỷ lệ miễn sát thương)', specialEffect: 'immune', effectChance: 20 },
  { id: 'art_dinh_nam_dao', name: 'Định Nam Đao', description: 'Tăng 25% Tấn công, +200 Phòng thủ. Đại đao truyền quốc huyền thoại nặng hơn 30kg của Mạc Thái Tổ Mạc Đăng Dung.', price: 50000, bonusAtkPc: 25, bonusDef: 200, exclusiveTo: ['h9_2'], image: './items/artifacts/art_dinh_nam_dao.png', effectDesc: 'Trảm tướng đoạt soái (25% tỷ lệ thêm lượt đánh)', specialEffect: 'extra_turn', effectChance: 25 },
  { id: 'art_ho_phu_trinh_vuong', name: 'Trịnh Vương Tiết Chế Phù', description: 'Tăng 20% Tấn công, +15% Phòng thủ. Binh phù nắm quyền Nam Triều phò Lê diệt Mạc, hiệu lệnh ba quân.', price: 50000, bonusAtkPc: 20, bonusDefPc: 15, exclusiveTo: ['h9_13', 'h9_14'], image: './items/artifacts/art_ho_phu_trinh_vuong.png', effectDesc: 'Hiệu triệu tam quân (Hồi 25% max HP sau khi đánh, 25% tỷ lệ)', specialEffect: 'heal', effectChance: 25 },
  { id: 'art_luy_thay', name: 'Lũy Thầy Thiết Đồ', description: 'Tăng 30% Phòng thủ, +1500 HP. Kỳ quan chiến lũy bất khả xâm phạm của Đào Duy Từ dựng nên bờ cõi Đàng Trong.', price: 50000, bonusDefPc: 30, bonusHp: 1500, exclusiveTo: ['h9_27', 'h9_30'], image: './items/artifacts/art_luy_thay.png', effectDesc: 'Thiết bích phòng ngự (25% tỷ lệ gây choáng địch)', specialEffect: 'stun', effectChance: 25 },
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
    heroIds: ['h4_0', 'h4_3'],
    description: 'Đinh Bộ Lĩnh và Nguyễn Bặc cùng xuất trận. Đinh Bộ Lĩnh +15 ATK, Nguyễn Bặc +15 DEF.',
    applyEffect: (activeUnits, addLog) => {
      const dbl = activeUnits.find(u => u.id.startsWith('h4_0_'));
      const nb = activeUnits.find(u => u.id.startsWith('h4_3_'));
      if (dbl && nb) {
        dbl.atk += 15;
        nb.def += 15;
        addLog('【Duyên Phận】 Thống Nhất Sơn Hà: Đinh Bộ Lĩnh +15 ATK, Nguyễn Bặc +15 DEF!');
      }
    }
  },
  // ── Duyên Phận Chương 9 (Tam Phân Thiên Hạ) ──
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
    id: 'dang_trong_khai_quoc',
    name: 'Đàng Trong Khai Quốc',
    heroIds: ['h9_26', 'h9_29'],
    description: 'Nguyễn Hoàng và Đào Duy Từ cùng xuất trận. Cả hai +15 Phòng Thủ, +15% Máu tối đa.',
    applyEffect: (activeUnits, addLog) => {
      const nh = activeUnits.find(u => u.id.startsWith('h9_26_'));
      const ddt = activeUnits.find(u => u.id.startsWith('h9_29_'));
      if (nh && ddt) {
        nh.def += 15; nh.maxHp += Math.floor(nh.maxHp * 0.15); nh.hp = nh.maxHp;
        ddt.def += 15; ddt.maxHp += Math.floor(ddt.maxHp * 0.15); ddt.hp = ddt.maxHp;
        addLog('【Duyên Phận】 Đàng Trong Khai Quốc: Nguyễn Hoàng & Đào Duy Từ +15 DEF, +15% HP!');
      }
    }
  },
  {
    id: 'bach_van_su_do',
    name: 'Bạch Vân Sư Đồ',
    heroIds: ['h9_1', 'h9_8'],
    description: 'Trạng Trình Nguyễn Bỉnh Khiêm và Nguyễn Dữ cùng xuất trận. Cả hai +20 Tấn Công, +20 Tốc Độ.',
    applyEffect: (activeUnits, addLog) => {
      const nbk = activeUnits.find(u => u.id.startsWith('h9_1_'));
      const nd = activeUnits.find(u => u.id.startsWith('h9_8_'));
      if (nbk && nd) {
        nbk.atk += 20; nbk.spd += 20;
        nd.atk += 20; nd.spd += 20;
        addLog('【Duyên Phận】 Bạch Vân Sư Đồ: Nguyễn Bỉnh Khiêm & Nguyễn Dữ +20 ATK, +20 SPD!');
      }
    }
  }
];

