console.log("🚀 PillarTracker v0.1 - Ready");

// =====================================================
// CONSTANTS & CONFIG
// =====================================================

const DEFAULT_CATEGORIES = [
  "Agama",
  "Moral & Etika",
  "Akademisi",
  "Fisik",
  "Karakter",
  "Finansial",
  "Integritas",
  "Hiburan",
  "Sosial",
  "Istirahat"
];

const STORAGE_KEYS = {
  ACTIVITIES: "activities",
  ACTIVE_SESSION: "activeSession",
  CUSTOM_CATEGORIES: "customCategories"
};

const CATEGORY_COLORS = {
  "Agama": "bg-purple-900 text-purple-200",
  "Moral & Etika": "bg-blue-900 text-blue-200",
  "Akademisi": "bg-indigo-900 text-indigo-200",
  "Fisik": "bg-red-900 text-red-200",
  "Karakter": "bg-green-900 text-green-200",
  "Finansial": "bg-yellow-900 text-yellow-200",
  "Integritas": "bg-cyan-900 text-cyan-200",
  "Hiburan": "bg-pink-900 text-pink-200",
  "Sosial": "bg-orange-900 text-orange-200",
  "Istirahat": "bg-amber-900 text-amber-200"
};

// =====================================================
// STORAGE MANAGEMENT
// =====================================================

function getActivities() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) || [];
  } catch (e) {
    console.error("Error parsing activities:", e);
    return [];
  }
}

function saveActivities(data) {
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(data));
}

function setActiveSession(activity) {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(activity));
}

function getActiveSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION));
  } catch (e) {
    console.error("Error parsing active session:", e);
    return null;
  }
}

function clearActiveSession() {
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
}

function getCustomCategories() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_CATEGORIES)) || [];
  } catch (e) {
    console.error("Error parsing custom categories:", e);
    return [];
  }
}

function saveCustomCategories(data) {
  localStorage.setItem(STORAGE_KEYS.CUSTOM_CATEGORIES, JSON.stringify(data));
}

function getAllCategories() {
  return [...DEFAULT_CATEGORIES, ...getCustomCategories()];
}

// =====================================================
// DOM ELEMENTS
// =====================================================

const activityInput = document.getElementById("activityInput");
const categorySelect = document.getElementById("categorySelect");
const startBtn = document.getElementById("startBtn");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const inputSection = document.getElementById("inputSection");
const activeSessionEl = document.getElementById("activeSession");
const activeTitle = document.getElementById("activeTitle");
const activeCategory = document.getElementById("activeCategory");
const timerEl = document.getElementById("timer");
const finishBtn = document.getElementById("finishBtn");
const abortBtn = document.getElementById("abortBtn");
const activityList = document.getElementById("activityList");
const currentDateEl = document.getElementById("currentDate");
const statusIndicator = document.getElementById("statusIndicator");
const recoveryModal = document.getElementById("recoveryModal");
const resumeBtn = document.getElementById("resumeBtn");
const clearSessionBtn = document.getElementById("clearSessionBtn");
const logDateInput = document.getElementById("logDateInput");
const prevDateBtn = document.getElementById("prevDateBtn");
const nextDateBtn = document.getElementById("nextDateBtn");
const logTitle = document.getElementById("logTitle");
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const settingsCloseBtn = document.getElementById("settingsCloseBtn");
const defaultCategoriesList = document.getElementById("defaultCategoriesList");
const customCategoriesList = document.getElementById("customCategoriesList");
const newCategoryInput = document.getElementById("newCategoryInput");
const addNewCategoryBtn = document.getElementById("addNewCategoryBtn");
const exportAllBtn = document.getElementById("exportAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const statsBtn = document.getElementById("statsBtn");
const statsModal = document.getElementById("statsModal");
const closeStatsBtn = document.getElementById("closeStatsBtn");
const statsContent = document.getElementById("statsContent");
const exportBtn = document.getElementById("exportBtn");
const todayCount = document.getElementById("todayCount");
const todayTotalTime = document.getElementById("todayTotalTime");
const toastContainer = document.getElementById("toastContainer");

let viewingDate = new Date().toISOString().split("T")[0];
let timerInterval = null;

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function formatClock(ts) {
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function formatDuration(ms) {
  if (!ms) return "0m 0s";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function formatDurationHours(ms) {
  if (!ms) return "0h 0m";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast bg-slate-700 border border-slate-600 rounded-lg px-6 py-3 shadow-lg`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✓";
  else if (type === "error") icon = "✕";
  else if (type === "warning") icon = "⚠️";

  toast.innerHTML = `<p class="text-gray-100">${icon} ${message}</p>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("exit");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// =====================================================
// CATEGORY MANAGEMENT
// =====================================================

function populateCategorySelect() {
  const categories = getAllCategories();
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function updateCategoriesUI() {
  defaultCategoriesList.innerHTML = DEFAULT_CATEGORIES
    .map(cat => `<span class="px-3 py-1 bg-slate-600 rounded text-sm text-gray-200">${cat}</span>`)
    .join("");

  const customCats = getCustomCategories();
  if (customCats.length === 0) {
    customCategoriesList.innerHTML = '<p class="text-gray-500 text-sm">No custom categories yet</p>';
  } else {
    customCategoriesList.innerHTML = customCats
      .map(cat => `
        <div class="flex justify-between items-center p-2 bg-slate-600 rounded">
          <span class="text-sm text-gray-200">${cat}</span>
          <button class="deleteCustomCatBtn text-red-400 hover:text-red-300 text-sm" data-category="${cat}">✕</button>
        </div>
      `)
      .join("");

    document.querySelectorAll(".deleteCustomCatBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const category = e.target.getAttribute("data-category");
        if (confirm(`Delete category "${category}"?`)) {
          const custom = getCustomCategories().filter(c => c !== category);
          saveCustomCategories(custom);
          updateCategoriesUI();
          populateCategorySelect();
          showToast(`Category "${category}" deleted`, "success");
        }
      });
    });
  }
}

// =====================================================
// TIMER MANAGEMENT
// =====================================================

function startTimer(startTime) {
  stopTimer();
  timerInterval = setInterval(() => {
    const now = Date.now();
    const diff = now - startTime;
    timerEl.textContent = formatTime(diff);
  }, 100);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// =====================================================
// UI MODE MANAGEMENT
// =====================================================

function enterActiveMode(activity) {
  inputSection.classList.add("hidden");
  activeSessionEl.classList.remove("hidden");
  activeTitle.textContent = activity.title;
  activeCategory.textContent = `📌 ${activity.category}`;
  timerEl.textContent = "00:00:00";
  startTimer(activity.startTime);
}

function exitActiveMode() {
  stopTimer();
  activeSessionEl.classList.add("hidden");
  inputSection.classList.remove("hidden");
  timerEl.textContent = "00:00:00";
  activityInput.value = "";
  categorySelect.value = "";
  viewingDate = new Date().toISOString().split("T")[0];
  logDateInput.value = viewingDate;
}

// =====================================================
// STATUS & STATS MANAGEMENT
// =====================================================

function updateStatusIndicator() {
  const today = new Date().toISOString().split("T")[0];
  const todayActivities = getActivities().filter(
    a => a.date === today && a.status === "finished"
  );

  const count = todayActivities.length;
  if (count === 0) {
    statusIndicator.textContent = "⚪";
  } else if (count >= 3) {
    statusIndicator.textContent = "🟢";
  } else {
    statusIndicator.textContent = "🟡";
  }
}

function updateQuickStats() {
  const today = new Date().toISOString().split("T")[0];
  const todayActivities = getActivities().filter(
    a => a.date === today && a.status === "finished"
  );

  todayCount.textContent = todayActivities.length;
  
  const totalMs = todayActivities.reduce((sum, a) => sum + (a.duration || 0), 0);
  todayTotalTime.textContent = formatDurationHours(totalMs);
}

function showStatistics(dateToShow = null) {
  const displayDate = dateToShow || viewingDate;
  const activities = getActivities().filter(a => a.date === displayDate && a.status === "finished");

  let html = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
      <div class="bg-slate-700 rounded-lg p-3 sm:p-4 border border-slate-600">
        <p class="text-gray-400 text-xs sm:text-sm">Total Activities</p>
        <p class="text-2xl sm:text-3xl font-bold text-indigo-400 mt-1">${activities.length}</p>
      </div>
      <div class="bg-slate-700 rounded-lg p-3 sm:p-4 border border-slate-600">
        <p class="text-gray-400 text-xs sm:text-sm">Total Duration</p>
        <p class="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">${formatDurationHours(activities.reduce((sum, a) => sum + (a.duration || 0), 0))}</p>
      </div>
    </div>
  `;

  if (activities.length > 0) {
    const categoryStats = {};
    activities.forEach(a => {
      if (!categoryStats[a.category]) {
        categoryStats[a.category] = { count: 0, duration: 0 };
      }
      categoryStats[a.category].count++;
      categoryStats[a.category].duration += a.duration || 0;
    });

    html += `<div class="mb-6">
      <h4 class="text-base sm:text-lg font-semibold text-gray-200 mb-3 sm:mb-4">By Category</h4>
      <div class="space-y-2 sm:space-y-3">`;

    Object.entries(categoryStats).forEach(([cat, stats]) => {
      const catColor = CATEGORY_COLORS[cat] || "bg-gray-700 text-gray-200";
      html += `
        <div class="bg-slate-700 rounded-lg p-2 sm:p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-slate-600 gap-2 sm:gap-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="${catColor} text-xs px-2 py-1 rounded">${cat}</span>
            <span class="text-xs sm:text-sm text-gray-300">${stats.count} activity${stats.count > 1 ? 'ies' : ''}</span>
          </div>
          <span class="text-indigo-400 font-semibold text-sm sm:text-base">${formatDurationHours(stats.duration)}</span>
        </div>
      `;
    });

    html += `</div></div>`;
  }

  statsContent.innerHTML = html;
  statsModal.classList.remove("hidden");
}

// =====================================================
// RENDER ACTIVITIES LIST
// =====================================================

function renderActivities(dateToShow = null) {
  const activities = getActivities();
  const displayDate = dateToShow || viewingDate;
  const displayActivities = activities
    .filter(a => a.date === displayDate && a.status === "finished")
    .sort((a, b) => a.startTime - b.startTime);

  activityList.innerHTML = "";

  const dateObj = new Date(displayDate + "T00:00:00");
  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("id-ID", dateOptions);
  logTitle.textContent = `Activities • ${formattedDate}`;

  if (displayActivities.length === 0) {
    activityList.innerHTML = '<p class="text-gray-500 text-center py-8">No activities for this date</p>';
    if (displayDate === new Date().toISOString().split("T")[0]) {
      updateStatusIndicator();
      updateQuickStats();
    }
    return;
  }

  displayActivities.forEach(activity => {
    const item = document.createElement("div");
    item.className = "activity-item";

    const categoryClass = CATEGORY_COLORS[activity.category] || "bg-gray-700 text-gray-200";

    item.innerHTML = `
      <div class="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 w-full">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <h3 class="activity-item-title break-words">${activity.title}</h3>
            <span class="${categoryClass} text-xs px-2 py-1 rounded whitespace-nowrap">${activity.category}</span>
          </div>
          <p class="activity-item-duration">⏱ ${formatClock(activity.startTime)} - ${formatClock(activity.endTime)}</p>
          <p class="text-xs text-indigo-400 font-semibold mt-1">Durasi: ${formatDuration(activity.duration)}</p>
        </div>
        <button class="deleteBtn text-red-400 hover:text-red-300 hover:bg-red-900/30 px-2.5 py-1.5 rounded transition flex-shrink-0 text-sm sm:text-base" data-id="${activity.id}" title="Delete activity">
          🗑️
        </button>
      </div>
    `;

    activityList.appendChild(item);
  });

  if (displayDate === new Date().toISOString().split("T")[0]) {
    updateStatusIndicator();
    updateQuickStats();
  }
}

// =====================================================
// ACTIVITY CREATION
// =====================================================

function createActivity(title, category) {
  return {
    id: Date.now(),
    title,
    category,
    status: "active",
    date: new Date().toISOString().split("T")[0],
    startTime: Date.now(),
    endTime: null,
    duration: null
  };
}

// =====================================================
// EVENT LISTENERS - MAIN BUTTONS
// =====================================================

startBtn.addEventListener("click", () => {
  const title = activityInput.value.trim();
  const category = categorySelect.value;

  if (!title) {
    showToast("Please enter an activity name", "warning");
    return;
  }

  if (!category) {
    showToast("Please select a category", "warning");
    return;
  }

  if (getActiveSession()) {
    showToast("An activity is already running", "warning");
    return;
  }

  const activity = createActivity(title, category);
  setActiveSession(activity);
  enterActiveMode(activity);
  showToast(`Started: ${title}`, "success");
});

finishBtn.addEventListener("click", finishActivity);
abortBtn.addEventListener("click", abortActivity);
addCategoryBtn.addEventListener("click", () => settingsModal.classList.remove("hidden"));

document.addEventListener("keydown", (e) => {
  if (!getActiveSession()) return;
  
  if (e.code === "Space") {
    e.preventDefault();
    finishActivity();
  } else if (e.code === "Escape") {
    e.preventDefault();
    abortActivity();
  }
});

function finishActivity() {
  const activity = getActiveSession();
  if (!activity) return;

  stopTimer();

  const endTime = Date.now();
  const duration = endTime - activity.startTime;

  activity.endTime = endTime;
  activity.duration = duration;
  activity.status = "finished";

  const activities = getActivities();
  activities.push(activity);
  saveActivities(activities);
  clearActiveSession();

  exitActiveMode();
  const today = new Date().toISOString().split("T")[0];
  renderActivities(today);
  showToast(`Finished: ${activity.title} (${formatDuration(duration)})`, "success");
}

function abortActivity() {
  if (confirm("Are you sure you want to abort this activity?")) {
    stopTimer();
    const activity = getActiveSession();
    clearActiveSession();
    exitActiveMode();
    showToast(`Aborted: ${activity?.title}`, "info");
  }
}

// =====================================================
// EVENT LISTENERS - DELETE & DATE NAV
// =====================================================

activityList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    if (confirm("Delete this activity?")) {
      const activities = getActivities();
      const activity = activities.find(a => a.id === id);
      const filtered = activities.filter(a => a.id !== id);
      saveActivities(filtered);
      renderActivities(viewingDate);
      showToast(`Deleted: ${activity?.title}`, "success");
    }
  }
});

prevDateBtn.addEventListener("click", () => {
  const current = new Date(viewingDate);
  current.setDate(current.getDate() - 1);
  viewingDate = current.toISOString().split("T")[0];
  logDateInput.value = viewingDate;
  renderActivities(viewingDate);
});

nextDateBtn.addEventListener("click", () => {
  const current = new Date(viewingDate);
  current.setDate(current.getDate() + 1);
  viewingDate = current.toISOString().split("T")[0];
  logDateInput.value = viewingDate;
  renderActivities(viewingDate);
});

logDateInput.addEventListener("change", (e) => {
  viewingDate = e.target.value;
  renderActivities(viewingDate);
});

// =====================================================
// EVENT LISTENERS - SETTINGS & MODALS
// =====================================================

settingsBtn.addEventListener("click", () => {
  updateCategoriesUI();
  settingsModal.classList.remove("hidden");
});

closeSettingsBtn.addEventListener("click", () => settingsModal.classList.add("hidden"));
settingsCloseBtn.addEventListener("click", () => settingsModal.classList.add("hidden"));

addNewCategoryBtn.addEventListener("click", () => {
  const name = newCategoryInput.value.trim();
  if (!name) {
    showToast("Please enter a category name", "warning");
    return;
  }

  const customCats = getCustomCategories();
  if (customCats.includes(name) || DEFAULT_CATEGORIES.includes(name)) {
    showToast("This category already exists", "warning");
    return;
  }

  customCats.push(name);
  saveCustomCategories(customCats);
  newCategoryInput.value = "";
  populateCategorySelect();
  updateCategoriesUI();
  showToast(`Category "${name}" added`, "success");
});

newCategoryInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNewCategoryBtn.click();
});

exportBtn.addEventListener("click", () => {
  const activities = getActivities()
    .filter(a => a.date === viewingDate && a.status === "finished")
    .sort((a, b) => a.startTime - b.startTime);

  if (activities.length === 0) {
    showToast("No activities to export", "warning");
    return;
  }

  const csv = [
    ["Activity", "Category", "Date", "Start Time", "End Time", "Duration (minutes)", "Duration (readable)"],
    ...activities.map(a => [
      a.title,
      a.category,
      a.date,
      new Date(a.startTime).toLocaleTimeString(),
      new Date(a.endTime).toLocaleTimeString(),
      Math.floor((a.duration || 0) / 60000),
      formatDuration(a.duration)
    ])
  ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PillarTracker-${viewingDate}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("Exported successfully", "success");
});

statsBtn.addEventListener("click", () => {
  showStatistics(viewingDate);
});

closeStatsBtn.addEventListener("click", () => statsModal.classList.add("hidden"));

exportAllBtn.addEventListener("click", () => {
  const data = {
    activities: getActivities(),
    customCategories: getCustomCategories(),
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `PillarTracker-backup-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("All data exported", "success");
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("⚠️ This will delete ALL data. Are you sure?")) {
    localStorage.clear();
    location.reload();
  }
});

resumeBtn.addEventListener("click", () => {
  recoveryModal.classList.add("hidden");
  const activity = getActiveSession();
  if (activity) {
    enterActiveMode(activity);
  }
});

clearSessionBtn.addEventListener("click", () => {
  clearActiveSession();
  recoveryModal.classList.add("hidden");
  showToast("Session cleared", "info");
});

// =====================================================
// INITIALIZATION
// =====================================================

function setCurrentDate() {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const today = new Date();
  currentDateEl.textContent = today.toLocaleDateString("id-ID", options);
}

function initializeApp() {
  setCurrentDate();
  populateCategorySelect();
  
  const today = new Date().toISOString().split("T")[0];
  viewingDate = today;
  logDateInput.value = today;

  const activeSession = getActiveSession();

  if (activeSession) {
    const sessionDate = activeSession.date;

    if (sessionDate !== today) {
      recoveryModal.classList.remove("hidden");
    } else {
      enterActiveMode(activeSession);
    }
  }

  renderActivities(today);
  updateQuickStats();
}

initializeApp();
