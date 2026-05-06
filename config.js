/**
 * PillarTracker Configuration & Utilities
 * Helper functions dan constants untuk aplikasi
 */

// =====================================================
// APPLICATION METADATA
// =====================================================

export const APP_CONFIG = {
  name: "PillarTracker",
  version: "0.1",
  author: "Mario Juliano Subagiyo",
  description: "Professional Activity Tracking System",
  releaseDate: "2026-05-06",
  repository: "https://github.com/username/pillartracker",
  license: "MIT"
};

// =====================================================
// FEATURE FLAGS
// =====================================================

export const FEATURES = {
  CUSTOM_CATEGORIES: true,
  EXPORT_CSV: true,
  EXPORT_JSON: true,
  STATISTICS: true,
  SESSION_RECOVERY: true,
  KEYBOARD_SHORTCUTS: true,
  TOAST_NOTIFICATIONS: true,
  QUICK_STATS: true
};

// =====================================================
// TIME CONSTANTS
// =====================================================

export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  TIMER_UPDATE_INTERVAL: 100  // ms
};

// =====================================================
// ACTIVITY STATUS CONSTANTS
// =====================================================

export const ACTIVITY_STATUS = {
  ACTIVE: "active",
  FINISHED: "finished",
  ABORTED: "aborted"
};

// =====================================================
// PROGRESS LEVELS
// =====================================================

export const PROGRESS_LEVEL = {
  EMPTY: { icon: "⚪", label: "Empty", min: 0, max: 0 },
  PARTIAL: { icon: "🟡", label: "Partial", min: 1, max: 2 },
  COMPLETED: { icon: "🟢", label: "Completed", min: 3, max: Infinity }
};

// =====================================================
// ERROR MESSAGES
// =====================================================

export const ERRORS = {
  EMPTY_ACTIVITY: "Please enter an activity name",
  NO_CATEGORY: "Please select a category",
  ACTIVITY_RUNNING: "An activity is already running",
  EMPTY_CATEGORY: "Please enter a category name",
  DUPLICATE_CATEGORY: "This category already exists",
  NO_ACTIVITIES: "No activities to export",
  CONFIRM_DELETE: "Delete this activity?",
  CONFIRM_DELETE_CATEGORY: "Delete category?",
  CONFIRM_ABORT: "Are you sure you want to abort this activity?",
  CONFIRM_CLEAR_ALL: "⚠️ This will delete ALL data. Are you sure?"
};

// =====================================================
// SUCCESS MESSAGES
// =====================================================

export const SUCCESS = {
  ACTIVITY_STARTED: "Activity started",
  ACTIVITY_FINISHED: "Activity finished",
  ACTIVITY_DELETED: "Activity deleted",
  ACTIVITY_ABORTED: "Activity aborted",
  CATEGORY_ADDED: "Category added",
  CATEGORY_DELETED: "Category deleted",
  DATA_EXPORTED: "Data exported successfully",
  SESSION_CLEARED: "Session cleared"
};

// =====================================================
// VALIDATION RULES
// =====================================================

export const VALIDATION = {
  MAX_ACTIVITY_LENGTH: 100,
  MAX_CATEGORY_LENGTH: 50,
  MIN_CATEGORY_LENGTH: 2,
  ALLOWED_CHARS_ACTIVITY: /^[a-zA-Z0-9\s\-_&:.,()]+$/,
  ALLOWED_CHARS_CATEGORY: /^[a-zA-Z0-9\s&]+$/
};

// =====================================================
// DATE FORMATTING OPTIONS
// =====================================================

export const DATE_FORMAT = {
  FULL: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  SHORT: {
    year: "numeric",
    month: "short",
    day: "numeric"
  },
  LOCALE: "id-ID"
};

// =====================================================
// EXPORT FORMATS
// =====================================================

export const EXPORT_FORMAT = {
  CSV: "csv",
  JSON: "json",
  FILENAME: {
    CSV: (date) => `PillarTracker-${date}.csv`,
    JSON: (date) => `PillarTracker-backup-${date}.json`
  }
};

// =====================================================
// TOAST NOTIFICATION TYPES
// =====================================================

export const TOAST_TYPE = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning"
};

// =====================================================
// RESPONSIVE BREAKPOINTS
// =====================================================

export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440
};

// =====================================================
// MODAL IDS
// =====================================================

export const MODALS = {
  RECOVERY: "recoveryModal",
  SETTINGS: "settingsModal",
  STATS: "statsModal"
};

// =====================================================
// API ENDPOINTS (Future use)
// =====================================================

export const API_ENDPOINTS = {
  SYNC: "/api/sync",
  BACKUP: "/api/backup",
  RESTORE: "/api/restore",
  ANALYTICS: "/api/analytics"
};

// =====================================================
// DEMO DATA (For testing)
// =====================================================

export const DEMO_ACTIVITIES = [
  {
    id: 1,
    title: "Solat Pagi",
    category: "Agama",
    status: "finished",
    date: new Date().toISOString().split("T")[0],
    startTime: Date.now() - 1200000,
    endTime: Date.now() - 1080000,
    duration: 120000
  },
  {
    id: 2,
    title: "Membaca Buku",
    category: "Akademisi",
    status: "finished",
    date: new Date().toISOString().split("T")[0],
    startTime: Date.now() - 900000,
    endTime: Date.now() - 300000,
    duration: 600000
  }
];

// =====================================================
// PERFORMANCE METRICS
// =====================================================

export const PERFORMANCE = {
  ENABLE_CONSOLE_LOG: true,
  LOG_STORAGE_OPERATIONS: false,
  LOG_TIMER_EVENTS: false,
  STORAGE_SIZE_WARNING_MB: 4
};
