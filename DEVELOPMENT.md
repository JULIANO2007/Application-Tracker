# PillarTracker - Development Guide

## 📁 Project Structure

```
PillarTracker/
├── index.html          # Main HTML markup
├── app.js              # Core application logic (700+ lines)
├── config.js           # Configuration constants & utilities
├── style.css           # (Empty - using TailwindCSS)
├── README.md           # User documentation
├── CHANGELOG.md        # Version history
└── DEVELOPMENT.md      # This file
```

## 🔧 Architecture Overview

### File Responsibilities

#### `index.html`
- **Purpose**: DOM structure & semantic layout
- **Tailwind Classes**: All styling via Tailwind utilities
- **Key Sections**:
  - Header (branding, date, status)
  - Input section (activity form)
  - Active session (focus mode)
  - Audit log (date navigation + activity list)
  - Modals (recovery, settings, stats)

#### `app.js`
- **Purpose**: Application logic & event handling
- **Size**: ~600 lines
- **Structure**:
  1. Constants & Config (categories, colors, storage keys)
  2. Storage Management (LocalStorage CRUD)
  3. DOM Elements (all querySelector calls)
  4. Utility Functions (formatting, validation)
  5. Category Management (CRUD custom categories)
  6. Timer Management (start/stop intervals)
  7. UI Mode Management (active/inactive states)
  8. Statistics & Analytics
  9. Activity Rendering (list rendering logic)
  10. Event Listeners (all user interactions)
  11. Initialization (startup sequence)

#### `config.js`
- **Purpose**: Centralized constants & configuration
- **Usage**: For future refactoring & extensibility
- **Contains**:
  - App metadata
  - Feature flags
  - Time constants
  - Error/success messages
  - Validation rules
  - Breakpoints
  - API endpoints (future)

## 🚀 Development Workflow

### Setup
```bash
# No build process needed - pure vanilla JavaScript
# Just open index.html in browser or serve with local server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Local Development
```bash
# Browser DevTools
- F12 / Right-click → Inspect
- Console tab untuk debugging
- Application tab untuk LocalStorage inspection
- Network tab untuk performance monitoring
```

### Code Style
- **Language**: JavaScript (ES6+)
- **Naming**: camelCase untuk functions/variables
- **Functions**: Documented dengan comments
- **Comments**: Before function declarations
- **Line Length**: Max 100 chars recommended

### Naming Conventions
```javascript
// Functions: verb + noun pattern
function formatTime(ms) {}
function updateStatusIndicator() {}
function renderActivities(dateToShow) {}

// Variables: descriptive names
const activityList = []
const timerInterval = null
let viewingDate = ""

// Constants: UPPER_SNAKE_CASE
const DEFAULT_CATEGORIES = []
const STORAGE_KEYS = {}
const CATEGORY_COLORS = {}

// DOM Elements: suffix with "El" or element type
const activityInput = document.getElementById("activityInput")
const categorySelect = document.getElementById("categorySelect")
const finishBtn = document.getElementById("finishBtn")
```

## 📚 Module Organization

### Storage Layer
```javascript
// CRUD operations for activities
getActivities() → []
saveActivities(data) → void
setActiveSession(activity) → void
getActiveSession() → Activity | null
clearActiveSession() → void
```

### Formatting Layer
```javascript
formatTime(ms) → "HH:MM:SS"
formatClock(timestamp) → "HH:MM"
formatDuration(ms) → "XXm XXs"
formatDurationHours(ms) → "Xh XXm"
```

### Category Layer
```javascript
getAllCategories() → [categories]
getCustomCategories() → [customCats]
saveCustomCategories(data) → void
populateCategorySelect() → void
updateCategoriesUI() → void
```

### Timer Layer
```javascript
startTimer(startTime) → void
stopTimer() → void
// Updates timerEl every 100ms
```

### UI Layer
```javascript
enterActiveMode(activity) → void
exitActiveMode() → void
renderActivities(dateToShow) → void
updateStatusIndicator() → void
updateQuickStats() → void
showStatistics(dateToShow) → void
showToast(message, type) → void
```

### Activity Layer
```javascript
createActivity(title, category) → Activity
finishActivity() → void
abortActivity() → void
```

## 🔄 Data Flow

### Lifecycle: Activity Creation → Completion

```
1. User Input
   ├─ activityInput.value
   ├─ categorySelect.value
   └─ Validation

2. Activity Creation
   ├─ createActivity(title, category)
   ├─ Set status: "active"
   ├─ Set startTime: Date.now()
   └─ Set date: YYYY-MM-DD

3. Session Storage
   ├─ setActiveSession(activity)
   ├─ Save to LocalStorage
   └─ Enter focus mode

4. Timer Running
   ├─ startTimer(startTime)
   ├─ Update display every 100ms
   └─ User can Finish or Abort

5. Activity Completion
   ├─ Set endTime: Date.now()
   ├─ Calculate duration
   ├─ Set status: "finished"
   ├─ Save to activities[]
   ├─ clearActiveSession()
   └─ renderActivities()

6. Display Update
   ├─ activityList shows new activity
   ├─ statusIndicator updates
   ├─ quickStats updates
   └─ UI returns to input mode
```

## 🎨 UI State Management

### States
```javascript
// Input Mode (default)
- inputSection: visible
- activeSessionEl: hidden
- All inputs: enabled

// Active Mode (during activity)
- inputSection: hidden
- activeSessionEl: visible
- Timer: running
- Finish/Abort: enabled

// Settings Mode
- settingsModal: visible
- Main app: underneath (disabled)

// Stats Mode
- statsModal: visible
- Main app: underneath (disabled)
```

### State Transitions
```
INPUT MODE
    ↓ (Start button clicked)
ACTIVE MODE
    ├─ (Finish clicked) → INPUT MODE + renderActivities()
    └─ (Abort clicked) → INPUT MODE (no render)

MAIN APP
    ├─ (Settings button) → SETTINGS MODE
    ├─ (Stats button) → STATS MODE
    └─ (Close modal) → MAIN APP
```

## 🔍 LocalStorage Schema

```javascript
// Key: "activities"
Value: [
  {id, title, category, status, date, startTime, endTime, duration},
  ...
]
Size: ~0.5KB per activity (estimate)

// Key: "activeSession"
Value: {id, title, category, status, date, startTime, endTime, duration}
Size: ~0.5KB
Note: Only exists during active session

// Key: "customCategories"
Value: ["Category1", "Category2", ...]
Size: ~0.1KB per category
```

## 🧪 Testing Checklist

### Functional Testing
- [ ] Start activity → timer runs
- [ ] Finish activity → saved to log
- [ ] Abort activity → not saved
- [ ] Date navigation → activities switch
- [ ] Delete activity → removed with confirmation
- [ ] Add custom category → appears in dropdown
- [ ] Export CSV → file downloads
- [ ] Export JSON → backup file downloads
- [ ] Stats modal → calculations correct
- [ ] Session recovery → resumes correctly
- [ ] Previous-day recovery → dialog shows

### Edge Cases
- [ ] Start while activity running → warning
- [ ] Empty activity name → validation
- [ ] No category selected → validation
- [ ] Browser refresh → session intact
- [ ] Close tab → session recoverable
- [ ] Multiple tabs → behavior consistent
- [ ] Very long activity names → handles gracefully
- [ ] Rapid clicks → no duplicates
- [ ] Keyboard shortcuts → work correctly

### Performance
- [ ] Activity list renders <100ms
- [ ] Stats calculate <200ms
- [ ] Export processes <500ms
- [ ] Memory stable over time
- [ ] LocalStorage quota OK

### Responsive
- [ ] Mobile (360px): All readable
- [ ] Tablet (768px): 2-column layout
- [ ] Desktop (1024px): 3-column layout
- [ ] Buttons: Easy to tap/click

## 🐛 Debugging Tips

### Console Debugging
```javascript
// View all activities
console.log(getActivities())

// View active session
console.log(getActiveSession())

// View custom categories
console.log(getCustomCategories())

// Check LocalStorage size
localStorage.getItem("activities").length
```

### Common Issues

**Problem**: Timer doesn't start
- **Solution**: Check timerInterval in console
- **Debug**: `timerInterval` should be number (interval ID)

**Problem**: Activities not saving
- **Solution**: Check LocalStorage in DevTools
- **Debug**: Should see "activities" key with JSON data

**Problem**: Session recovery not working
- **Solution**: Check activeSession in DevTools
- **Debug**: Should exist during active session

## 📈 Optimization Opportunities

### Low Priority
- Minify JavaScript
- Compress images (if added)
- Cache busting strategy

### Medium Priority
- Lazy load modals
- Pagination for large activity lists
- Service Worker for offline

### High Priority (for v0.2)
- Reduce bundle size
- Optimize rendering
- Add activity search
- Add bulk operations

## 🚀 Feature Development Workflow

### Add New Feature
1. **Update HTML** (`index.html`)
   - Add necessary DOM elements
   - Add required IDs/classes

2. **Update Config** (`config.js`)
   - Add constants/messages
   - Add feature flag

3. **Update JavaScript** (`app.js`)
   - Add DOM element reference
   - Add implementation function
   - Add event listener
   - Add tests

4. **Update Documentation** (`README.md`)
   - Add usage section
   - Add keyboard shortcuts (if applicable)

### Example: Add "Pause" Feature
```javascript
// 1. HTML
<button id="pauseBtn" ...>⏸ Pause</button>

// 2. Config
FEATURES.PAUSE_ACTIVITY = true
SUCCESS.ACTIVITY_PAUSED = "Activity paused"

// 3. JavaScript
const pauseBtn = document.getElementById("pauseBtn")
function pauseActivity() { ... }
pauseBtn.addEventListener("click", pauseActivity)

// 4. Docs
// Add to README under Features
```

## 🔗 Dependencies & Versions

### Runtime
- No dependencies! Pure vanilla JavaScript
- Tailwind CSS v3 (via CDN)
- Browser APIs:
  - LocalStorage
  - Date/Time
  - Event Listeners

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📞 Contributing

### Code Review Checklist
- [ ] No console errors/warnings
- [ ] Follows naming conventions
- [ ] Comments added
- [ ] Tests pass
- [ ] Mobile responsive
- [ ] Accessibility OK
- [ ] Performance acceptable

### Commit Message Format
```
[FEATURE/FIX/DOCS] Brief description

Longer explanation of changes if needed.
```

---

**Happy Coding! 🚀**
