import { GiftCode } from './types';

const STORAGE_KEY = 'MHV_GIFT_CODES';

export const getGiftCodes = (): GiftCode[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Lỗi khi đọc GiftCodes:', error);
    return [];
  }
};

export const saveGiftCode = (code: GiftCode) => {
  const codes = getGiftCodes();
  const existingIndex = codes.findIndex(c => c.code === code.code);
  if (existingIndex >= 0) {
    codes[existingIndex] = code;
  } else {
    codes.push(code);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
};

export const deleteGiftCode = (codeString: string) => {
  const codes = getGiftCodes();
  const newCodes = codes.filter(c => c.code !== codeString);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newCodes));
};

export const redeemGiftCode = (codeString: string, playerName: string): { success: boolean; message: string; code?: GiftCode } => {
  const codes = getGiftCodes();
  const code = codes.find(c => c.code === codeString);
  
  if (!code) {
    return { success: false, message: 'Code không tồn tại.' };
  }
  
  if (code.expiresAt && Date.now() > code.expiresAt) {
    return { success: false, message: 'Code đã hết hạn sử dụng.' };
  }
  
  if (code.usedBy.includes(playerName)) {
    return { success: false, message: 'Bạn đã sử dụng code này rồi.' };
  }
  
  code.usedBy.push(playerName);
  
  // Save back
  const existingIndex = codes.findIndex(c => c.code === code.code);
  codes[existingIndex] = code;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  
  return { success: true, message: 'Nhập code thành công!', code };
};
