import { DailyQuest } from './types';

export const DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'q_login',
    desc: 'Đăng nhập hàng ngày',
    target: 1,
    rewardType: 'gold',
    rewardAmount: 1000
  },
  {
    id: 'q_answer_3_row',
    desc: 'Trả lời đúng 3 câu liên tiếp',
    target: 1,
    rewardType: 'jade',
    rewardAmount: 1
  },
  {
    id: 'q_answer_10',
    desc: 'Trả lời đúng 10 câu',
    target: 10,
    rewardType: 'gold',
    rewardAmount: 2000
  },
  {
    id: 'q_spin_3',
    desc: 'Quay tướng 3 lần',
    target: 3,
    rewardType: 'premiumTickets',
    rewardAmount: 1
  },
  {
    id: 'q_play_arena_1',
    desc: 'Tham gia Đấu Trường 1 lần',
    target: 1,
    rewardType: 'gold',
    rewardAmount: 1000
  },
  {
    id: 'q_win_arena_1',
    desc: 'Thắng 1 trận Đấu Trường',
    target: 1,
    rewardType: 'jade',
    rewardAmount: 2
  },
  {
    id: 'q_play_trial_1',
    desc: 'Tham gia Anh Hùng Quá Ải 1 lần',
    target: 1,
    rewardType: 'normalTickets',
    rewardAmount: 1
  },
  {
    id: 'q_upgrade_hero_1',
    desc: 'Nâng sao tướng 1 lần',
    target: 1,
    rewardType: 'gold',
    rewardAmount: 1500
  },
  {
    id: 'q_play_suviet_1',
    desc: 'Tham gia Tự Hào Sử Việt 1 lần',
    target: 1,
    rewardType: 'gold',
    rewardAmount: 1000
  },
  {
    id: 'q_answer_20',
    desc: 'Trả lời đúng 20 câu',
    target: 20,
    rewardType: 'jade',
    rewardAmount: 3
  }
];
