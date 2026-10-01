import { PlayerState } from './types';

// ===================================================================
//  PLAYER DATA MIGRATION SYSTEM
//  Cam hung tu cac top game the bai: Clash Royale, Onmyoji, Arknights
//
//  CACH SU DUNG KHI THEM TINH NANG MOI:
//    1. Tang CURRENT_SCHEMA_VERSION len 1
//    2. Them mot entry moi vao cuoi MIGRATION_STEPS
//    3. Goi migratePlayerData(savedData) khi load -- xong!
//  Dam bao: tai khoan nguoi choi KHONG BAO GIO bi mat du lieu!
// ===================================================================

export const CURRENT_SCHEMA_VERSION = 7;

type AnyPlayerData = Record<string, any>;

interface MigrationStep {
  fromVersion: number;
  toVersion: number;
  description: string;
  migrate: (data: AnyPlayerData) => AnyPlayerData;
}

const MIGRATION_STEPS: MigrationStep[] = [
  // V0 -> V1: Them permLineup and legionTickets
  {
    fromVersion: 0, toVersion: 1,
    description: "Them permLineup + legionTickets",
    migrate: (data) => ({
      ...data,
      permLineup: data.permLineup ?? [null, null, null, null, null, null],
      legionTickets: data.legionTickets ?? 0,
    }),
  },
  // V1 -> V2: artifacts[] -> permArtifacts[]
  {
    fromVersion: 1, toVersion: 2,
    description: "Migration artifacts[] -> permArtifacts[]",
    migrate: (data) => {
      const newData = { ...data };
      if (newData.artifacts && Array.isArray(newData.artifacts) && newData.artifacts.length > 0) {
        const merged = [...new Set([...(newData.permArtifacts || []), ...newData.artifacts])];
        newData.permArtifacts = merged;
      }
      delete newData.artifacts;
      return newData;
    },
  },
  // V2 -> V3: unlockedChapters, tuLuyenCorrectIds, tuLuyenUnlockedLessons
  {
    fromVersion: 2, toVersion: 3,
    description: "Them unlockedChapters, tuLuyenCorrectIds, tuLuyenUnlockedLessons",
    migrate: (data) => ({
      ...data,
      unlockedChapters: data.unlockedChapters ?? [1],
      tuLuyenCorrectIds: data.tuLuyenCorrectIds ?? {},
      tuLuyenUnlockedLessons: data.tuLuyenUnlockedLessons ?? ["B1"],
    }),
  },
  // V3 -> V4: Arena system
  {
    fromVersion: 3, toVersion: 4,
    description: "Them Arena: arenaScore, arenaTickets, arenaDefenseFormation",
    migrate: (data) => ({
      ...data,
      arenaScore: data.arenaScore ?? 1000,
      arenaTickets: data.arenaTickets ?? 5,
      arenaDefenseFormation: data.arenaDefenseFormation ?? [null, null, null, null, null, null],
    }),
  },
  // V4 -> V5: Daily quests
  {
    fromVersion: 4, toVersion: 5,
    description: "Them daily quests: dailyQuestProgress, lastLoginDate...",
    migrate: (data) => {
      const nd = new Date();
      const m = String(nd.getMonth() + 1).padStart(2, "0");
      const day = String(nd.getDate()).padStart(2, "0");
      const todayStr = nd.getFullYear() + "-" + m + "-" + day;
      return {
        ...data,
        dailyQuestProgress: data.dailyQuestProgress ?? { "q_login": 1 },
        dailyQuestClaimed: data.dailyQuestClaimed ?? [],
        lastLoginDate: data.lastLoginDate ?? todayStr,
        consecutiveCorrectAnswers: data.consecutiveCorrectAnswers ?? 0,
      };
    },
  },
  // V5 -> V6: artifactTickets, upgradePills, mathCorrectQuestions
  {
    fromVersion: 5, toVersion: 6,
    description: "Them artifactTickets, upgradePills, mathCorrectQuestions",
    migrate: (data) => ({
      ...data,
      artifactTickets: data.artifactTickets ?? 0,
      upgradePills: data.upgradePills ?? 0,
      mathCorrectQuestions: data.mathCorrectQuestions ?? {},
    }),
  },
  // V6 -> V7: suViet tracking
  {
    fromVersion: 6, toVersion: 7,
    description: "Them suViet daily tracking + tuHaoSuVietScore",
    migrate: (data) => ({
      ...data,
      suVietDailyPlays: data.suVietDailyPlays ?? 0,
      suVietLastPlayDate: data.suVietLastPlayDate ?? "",
      suVietSeenQuestions: data.suVietSeenQuestions ?? [],
      suVietSeenResetDate: data.suVietSeenResetDate ?? "",
      tuHaoSuVietScore: data.tuHaoSuVietScore ?? 0,
    }),
  },
  // === THEM MIGRATION MOI VAO DAY ===
  // TANG CURRENT_SCHEMA_VERSION TRUOC ROI THEM ENTRY NAY:
  // { fromVersion: 7, toVersion: 8, description: "Mo ta thay doi",
  //   migrate: (data) => ({ ...data, newField: data.newField ?? defaultValue }) },
];

/**
 * Ham chinh: tu dong nang cap PlayerState tu version cu len version hien tai.
 * Goi ham nay moi khi load du lieu tu localStorage hoac Cloud.
 */
export function migratePlayerData(savedData: AnyPlayerData): PlayerState {
  if (!savedData || typeof savedData !== "object") {
    console.warn("[Migration] No saved data -- creating fresh state.");
    return createDefaultPlayerState();
  }

  let ver: number = savedData.schemaVersion ?? 0;
  let data = { ...savedData };

  if (ver >= CURRENT_SCHEMA_VERSION) {
    return ensureSafeDefaults(data) as PlayerState;
  }

  console.log("[Migration] Upgrading player data from v" + ver + " to v" + CURRENT_SCHEMA_VERSION);

  for (const step of MIGRATION_STEPS) {
    if (ver < step.toVersion) {
      console.log("[Migration] Step v" + step.fromVersion + " -> v" + step.toVersion + ": " + step.description);
      try {
        data = step.migrate(data);
        ver = step.toVersion;
      } catch (err) {
        // NEVER crash -- player account must be preserved at all costs
        console.error("[Migration] ERROR at step v" + step.fromVersion + " -> v" + step.toVersion + ":", err);
      }
    }
  }

  data.schemaVersion = CURRENT_SCHEMA_VERSION;
  console.log("[Migration] Done! Data is now at v" + CURRENT_SCHEMA_VERSION);
  return ensureSafeDefaults(data) as PlayerState;
}

/** Dam bao moi field deu co gia tri mac dinh, khong co undefined nao khien game crash */
function ensureSafeDefaults(data: AnyPlayerData): AnyPlayerData {
  const nd = new Date();
  const m = String(nd.getMonth() + 1).padStart(2, "0");
  const day = String(nd.getDate()).padStart(2, "0");
  const todayStr = nd.getFullYear() + "-" + m + "-" + day;

  const knownKeys = new Set([
    "gold","jade","normalTickets","premiumTickets","artifactTickets","legionTickets",
    "upgradePills","playerName","legionName","fullName","className","grade","username",
    "avatarId","customAvatar","isGuest","inventory","permArtifacts","lineup","permLineup",
    "currentChapter","progress","mathProgress","seenMathQuestions","mathCorrectQuestions",
    "heroTrialProgress","trialHistory","ch9Faction","unlockedChapters","tuLuyenCorrectIds",
    "tuLuyenUnlockedLessons","suVietDailyPlays","suVietLastPlayDate","suVietSeenQuestions",
    "suVietSeenResetDate","tuHaoSuVietScore","arenaScore","arenaTickets","arenaDefenseFormation",
    "arenaLastRefreshDate","dailyQuestProgress","dailyQuestClaimed","lastLoginDate",
    "consecutiveCorrectAnswers","schemaVersion","updatedAt","pills","artifacts",
  ]);

  // Preserve unknown fields for forward-compatibility
  const extraFields = Object.fromEntries(Object.entries(data).filter(([k]) => !knownKeys.has(k)));

  return {
    ...extraFields,
    gold:                      data.gold                      ?? 0,
    jade:                      data.jade                      ?? 0,
    normalTickets:             data.normalTickets             ?? 0,
    premiumTickets:            data.premiumTickets            ?? 0,
    artifactTickets:           data.artifactTickets           ?? 0,
    legionTickets:             data.legionTickets             ?? 0,
    upgradePills:              data.upgradePills              ?? 0,
    playerName:                data.playerName                ?? "",
    legionName:                data.legionName                ?? "",
    fullName:                  data.fullName                  ?? "",
    className:                 data.className                 ?? "",
    grade:                     data.grade                     ?? 6,
    username:                  data.username                  ?? "",
    avatarId:                  data.avatarId                  ?? "",
    customAvatar:              data.customAvatar              ?? "",
    isGuest:                   data.isGuest                   ?? false,
    inventory:                 Array.isArray(data.inventory)  ? data.inventory  : [],
    permArtifacts:             Array.isArray(data.permArtifacts) ? data.permArtifacts : [],
    lineup:                    Array.isArray(data.lineup)     ? data.lineup     : [null,null,null,null,null,null],
    permLineup:                Array.isArray(data.permLineup) ? data.permLineup : [null,null,null,null,null,null],
    currentChapter:            data.currentChapter            ?? 1,
    progress:                  data.progress                  ?? { 1: 1 },
    mathProgress:              data.mathProgress              ?? {},
    seenMathQuestions:         Array.isArray(data.seenMathQuestions) ? data.seenMathQuestions : [],
    mathCorrectQuestions:      data.mathCorrectQuestions      ?? {},
    heroTrialProgress:         data.heroTrialProgress         ?? 0,
    trialHistory:              Array.isArray(data.trialHistory) ? data.trialHistory : [],
    ch9Faction:                data.ch9Faction                ?? "",
    unlockedChapters:          Array.isArray(data.unlockedChapters) ? data.unlockedChapters : [1],
    tuLuyenCorrectIds:         data.tuLuyenCorrectIds         ?? {},
    tuLuyenUnlockedLessons:    Array.isArray(data.tuLuyenUnlockedLessons) ? data.tuLuyenUnlockedLessons : ["B1"],
    suVietDailyPlays:          data.suVietDailyPlays          ?? 0,
    suVietLastPlayDate:        data.suVietLastPlayDate        ?? "",
    suVietSeenQuestions:       Array.isArray(data.suVietSeenQuestions) ? data.suVietSeenQuestions : [],
    suVietSeenResetDate:       data.suVietSeenResetDate       ?? "",
    tuHaoSuVietScore:          data.tuHaoSuVietScore          ?? 0,
    arenaScore:                data.arenaScore                ?? 1000,
    arenaTickets:              data.arenaTickets              ?? 5,
    arenaDefenseFormation:     Array.isArray(data.arenaDefenseFormation) ? data.arenaDefenseFormation : [null,null,null,null,null,null],
    arenaLastRefreshDate:      data.arenaLastRefreshDate      ?? "",
    dailyQuestProgress:        data.dailyQuestProgress        ?? { "q_login": 1 },
    dailyQuestClaimed:         Array.isArray(data.dailyQuestClaimed) ? data.dailyQuestClaimed : [],
    lastLoginDate:             data.lastLoginDate             ?? todayStr,
    consecutiveCorrectAnswers: data.consecutiveCorrectAnswers ?? 0,
    schemaVersion:             CURRENT_SCHEMA_VERSION,
    updatedAt:                 data.updatedAt                 ?? Date.now(),
  };
}

/** Tao PlayerState mac dinh cho tai khoan moi */
export function createDefaultPlayerState(overrides: Partial<PlayerState> = {}): PlayerState {
  const nd = new Date();
  const m = String(nd.getMonth() + 1).padStart(2, "0");
  const day = String(nd.getDate()).padStart(2, "0");
  const todayStr = nd.getFullYear() + "-" + m + "-" + day;
  return {
    playerName: "", legionName: "", gold: 0, normalTickets: 0, premiumTickets: 0,
    artifactTickets: 0, legionTickets: 0, upgradePills: 0, permArtifacts: [], jade: 0,
    inventory: [], lineup: [null,null,null,null,null,null], permLineup: [null,null,null,null,null,null],
    currentChapter: 1, progress: { 1: 1 }, mathProgress: {}, seenMathQuestions: [],
    mathCorrectQuestions: {}, heroTrialProgress: 0, trialHistory: [], unlockedChapters: [1],
    tuLuyenCorrectIds: {}, tuLuyenUnlockedLessons: ["B1"],
    dailyQuestProgress: { "q_login": 1 }, dailyQuestClaimed: [], lastLoginDate: todayStr,
    consecutiveCorrectAnswers: 0, arenaScore: 1000, arenaTickets: 5,
    arenaDefenseFormation: [null,null,null,null,null,null],
    suVietDailyPlays: 0, suVietLastPlayDate: "", suVietSeenQuestions: [],
    suVietSeenResetDate: "", tuHaoSuVietScore: 0,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    ...overrides,
  } as PlayerState;
}

function mergeArr(a: any[] | undefined, b: any[] | undefined): any[] {
  return [...new Set([...(a || []), ...(b || [])])];
}

/**
 * So sanh + merge du lieu Cloud va Local -- Cloud-first strategy.
 * Dam bao khong mat tai nguyen khi choi offline roi sync.
 */
export function mergeCloudAndLocal(
  cloudData: AnyPlayerData | null,
  localData: AnyPlayerData | null
): PlayerState {
  if (!localData && cloudData) return migratePlayerData(cloudData);
  if (!cloudData && localData) return migratePlayerData(localData);
  if (!cloudData && !localData) return createDefaultPlayerState();

  const cloudTime = cloudData!.updatedAt ?? 0;
  const localTime = localData!.updatedAt ?? 0;
  const winner = cloudTime >= localTime ? cloudData! : localData!;
  const loser  = cloudTime >= localTime ? localData! : cloudData!;

  const merged: AnyPlayerData = {
    ...loser,
    ...winner,
    // Merge arrays: lay union de khong mat du lieu
    unlockedChapters:       mergeArr(winner.unlockedChapters, loser.unlockedChapters),
    tuLuyenUnlockedLessons: mergeArr(winner.tuLuyenUnlockedLessons, loser.tuLuyenUnlockedLessons),
    permArtifacts:          mergeArr(winner.permArtifacts, loser.permArtifacts),
    seenMathQuestions:      mergeArr(winner.seenMathQuestions, loser.seenMathQuestions),
    // Lay gia tri cao nhat cho tai nguyen -- khong mat vang khi offline
    gold:              Math.max(winner.gold ?? 0, loser.gold ?? 0),
    jade:              Math.max(winner.jade ?? 0, loser.jade ?? 0),
    tuHaoSuVietScore:  Math.max(winner.tuHaoSuVietScore ?? 0, loser.tuHaoSuVietScore ?? 0),
    arenaScore:        Math.max(winner.arenaScore ?? 1000, loser.arenaScore ?? 1000),
    heroTrialProgress: Math.max(winner.heroTrialProgress ?? 0, loser.heroTrialProgress ?? 0),
  };

  return migratePlayerData(merged);
}
