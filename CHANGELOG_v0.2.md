# PillarTracker - CHANGELOG v0.2

## Version 0.2 (Beta) - June 14, 2026

### ✨ New Features

#### 1. Activity Description
- **Add optional description/notes when creating activity**
  - New textarea field in "Start Activity" form
  - Placeholder: "Add notes/description (optional)..."
  - User dapat menuliskan catatan singkat tentang aktivitas
  - Bersifat opsional - user boleh mengosongkan

**Use Cases:**
```
Morning:
- Activity: "Belajar IPOS"
- Description: (kosong)

Evening:
- User kembali dan tambahkan di modal Edit:
- Description: "Sulit fokus. Materi selesai 20%"
```

#### 2. Activity Editing System
- **Edit completed activities after they finish**
- Click "✏️ Edit" button pada setiap activity item
- Modal Edit Activity menampilkan:
  - Activity Name (editable)
  - Category (editable)
  - Description (editable/addable)
  - Timestamp info (read-only, tidak bisa diedit)

**Fitur Edit:**
- ✏️ Edit nama aktivitas jika ada typo
- 🏷️ Ubah kategori jika salah
- 📝 Tambahkan atau ubah description
- 🔒 Timestamp tidak bisa diedit (immutable)

### 📊 Updated Data Structure
```javascript
Activity {
  id: number (timestamp)
  title: string
  category: string
  description: string (NEW - optional)
  status: "active" | "finished" | "aborted"
  date: string (YYYY-MM-DD)
  startTime: number (timestamp ms)
  endTime: number (timestamp ms)
  duration: number (ms)
  createdAt: string (ISO 8601 - NEW)
  updatedAt: string (ISO 8601 - NEW)
}
```

### 🎯 UI Improvements
- ✏️ Edit button (blue) added to each activity item
- 📝 Description displayed with prefix icon "📝" jika tidak kosong
- Multi-line description support di activity log
- Responsive design maintained untuk mobile/tablet/desktop

### 🔄 Backend Changes
- `createActivity()` - now includes description parameter
- `saveEditActivity()` - new function untuk update existing activity
- `openEditModal()` - new function untuk display edit modal
- `closeEditModal()` - new function untuk hide modal & reset form
- `populateEditCategorySelect()` - new function untuk populate kategori di modal edit
- Event listeners untuk Edit button dan modal control

### 💾 Data Persistence
- Description data automatically saved ke LocalStorage
- Edit history tracked via `updatedAt` timestamp
- createdAt mencatat kapan activity dibuat
- updatedAt mencatat kapan activity terakhir diedit

### 🚀 Benefits for Future AI Features
- **AI Habit Analyzer**: Dengan description, AI bisa menganalisis hambatan user
- **Root Cause Detection**: Dari catatan, AI bisa menemukan pola masalah
- **Reflective Analytics**: User dapat mencatat pembelajaran & progress

Contoh analisis AI:
```
User activities dengan "terdistraksi YouTube" di description:
- Belajar JavaScript: "Sering terdistraksi YouTube"
- Belajar SQL: "Buka YouTube setiap 5 menit"

AI insight: "User sering terdistraksi YouTube. Rekomendasi: gunakan website blocker atau time-box focus session 25 menit"
```

### 🐛 Bug Fixes
- Fixed naming conflict antara DOM element `closeEditModal` dan function `closeEditModal`
- Resolved by renaming DOM element reference ke `closeEditModalBtn`

### 📝 Documentation Updates
- Updated version number dari v0.1 ke v0.2 di:
  - index.html (header & settings about section)
  - CHANGELOG.md (this file)
- README.md akan di-update dengan fitur baru

### ⚙️ Technical Details
- **New Modal**: Edit Activity Modal dengan form validation
- **Event Handling**: Click listeners untuk edit buttons
- **Form Management**: Proper input clearing & resetting
- **Data Validation**: Title dan category are required
- **UI/UX**: Toast notifications untuk feedback (success/warning/error)

### 📋 File Changes
- `index.html` - Tambah textarea description & modal edit
- `app.js` - Tambah functions & event listeners untuk edit system
- `app.js` - Fix naming conflict
- `CHANGELOG.md` - New entry untuk v0.2

### ✅ Testing Checklist
- ✅ Create activity dengan description
- ✅ Create activity tanpa description (optional)
- ✅ Description displayed di activity log
- ✅ Edit button visible & clickable
- ✅ Edit modal terbuka dengan pre-filled data
- ✅ Edit activity title
- ✅ Edit activity category
- ✅ Edit activity description
- ✅ Save changes & update di log
- ✅ Toast notifications work
- ✅ Timestamp read-only
- ✅ Delete & Edit buttons coexist
- ✅ Data persistent after page reload
- ✅ Status indicator updates correctly

### 🎨 UI/UX Improvements
- Description textarea dengan responsive height (h-20 sm:h-24)
- Edit modal dengan proper spacing & styling
- Description displayed dengan "📝" icon untuk visual indication
- Multi-line text support untuk description
- Form validation dengan user-friendly messages

### 🔒 Security & Data Integrity
- No external API calls (offline-first)
- All data stored locally in LocalStorage
- No tracking/analytics
- No sensitive data transmitted

### 📈 Performance Impact
- Minimal: Description field only adds ~100 bytes per activity
- Modal rendering is on-demand (only when edit clicked)
- No significant performance regression

---

## Next Steps (v0.3 Roadmap)
- [ ] AI Habit Analyzer (analyze descriptions for patterns)
- [ ] Root Cause Detection (find common obstacles)
- [ ] Reflective Insights (suggest improvements)
- [ ] Activity Templates (pre-filled descriptions)
- [ ] Description Autocomplete (AI suggestions)
- [ ] Import/Export enhancements
- [ ] Statistics by description keywords

---

**Status**: ✅ Production Ready
**Version**: 0.2 (Beta)
**Last Updated**: June 14, 2026
**Author**: Mario Juliano Subagiyo
