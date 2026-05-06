# PillarTracker v0.1
## Professional Activity Tracking System

**Created by:** Mario Juliano Subagiyo  
**Last Updated:** May 6, 2026  
**Status:** Production Ready

---

## 📋 Overview

PillarTracker adalah aplikasi web profesional untuk melacak aktivitas harian berbasis **7 Pilar Kehidupan** dengan sistem time tracking real-time. Dirancang untuk meningkatkan produktivitas dan disiplin melalui monitoring aktivitas yang terstruktur.

### Fitur Utama
- ⏱️ **Real-Time Timer** - Stopwatch akurat dengan precision 100ms
- 📊 **Activity Log** - Riwayat lengkap dengan date navigation
- 🏷️ **Custom Categories** - Buat kategori aktivitas sendiri
- 💾 **Auto-Save** - Semua data tersimpan otomatis di LocalStorage
- 📥 **Export Data** - Export ke CSV dan JSON untuk backup
- 🔄 **Session Recovery** - Auto-resume sesi yang terganggu
- 📈 **Statistics** - Analytics per kategori dan durasi
- 🎯 **Progress Indicator** - Visual status harian (⚪🟡🟢)
- ⌨️ **Keyboard Shortcuts** - SPACE untuk Finish, ESC untuk Abort

---

## 🏛️ Struktur Data

Setiap aktivitas menyimpan informasi berikut:

```javascript
{
  id: 1234567890,                    // Unique timestamp ID
  title: "Belajar JavaScript",        // Nama aktivitas
  category: "Akademisi",             // Kategori
  status: "finished",                // active | finished | aborted
  date: "2026-05-06",                // YYYY-MM-DD
  startTime: 1714982400000,          // Timestamp awal (ms)
  endTime: 1714982460000,            // Timestamp akhir (ms)
  duration: 60000                    // Durasi dalam ms
}
```

---

## 🎯 7 Pilar Utama

Kategori default yang tersedia:

1. **Agama** - Aktivitas spiritual & religius
2. **Moral & Etika** - Pengembangan karakter moral
3. **Akademisi** - Belajar & pengembangan ilmu
4. **Fisik** - Olahraga & kesehatan tubuh
5. **Karakter** - Pengembangan diri & kepribadian
6. **Finansial** - Manajemen keuangan
7. **Integritas** - Kejujuran & konsistensi

### Kategori Tambahan
- Hiburan
- Sosial
- Istirahat
- *Custom categories (user-defined)*

---

## 🚀 Cara Menggunakan

### 1. Memulai Aktivitas
```
1. Input nama aktivitas di field "Activity name..."
2. Pilih kategori dari dropdown
3. Klik tombol "▶ Start" atau tekan ENTER
4. Timer akan mulai berjalan
```

### 2. Menyelesaikan Aktivitas
```
- Klik tombol "✓ Finish" atau tekan SPACE
- Durasi akan disimpan otomatis
- Aktivitas akan muncul di Daily Log
```

### 3. Membatalkan Aktivitas
```
- Klik tombol "✕ Abort" atau tekan ESC
- Aktivitas tidak akan disimpan (wajib konfirmasi)
```

### 4. Melihat Riwayat
```
- Gunakan tombol "← Previous" atau "Next →"
- Atau pilih tanggal langsung di date picker
- Klik "📊 Stats" untuk melihat statistik detail
```

### 5. Export Data
```
- "📥 Export" = Export aktivitas hari itu ke CSV
- "📥 Export All Data" = Backup semua data ke JSON
```

---

## ⚙️ Settings & Personalisasi

### Menambah Kategori Custom
1. Klik tombol ⚙️ di header
2. Buka "Custom Categories"
3. Masukkan nama kategori baru
4. Klik "Add"
5. Kategori akan muncul di dropdown

### Menghapus Kategori Custom
1. Buka Settings ⚙️
2. Temukan kategori di "Custom Categories"
3. Klik tombol ✕ sampingnya
4. Konfirmasi penghapusan

### Export & Backup
- **CSV Format**: Data per-hari, ideal untuk spreadsheet
- **JSON Format**: Backup lengkap semua data + custom categories

### Clear All Data
⚠️ **Warning**: Operasi ini tidak bisa dibatalkan!
- Settings → "🗑️ Clear All Data"
- Semua aktivitas dan custom categories akan dihapus
- Browser akan auto-reload

---

## 📊 Status Harian & Analytics

### Progress Indicator
Berdasarkan jumlah aktivitas yang diselesaikan:

- **⚪ Empty** - 0 aktivitas diselesaikan
- **🟡 Partial** - 1-2 aktivitas diselesaikan  
- **🟢 Completed** - 3+ aktivitas diselesaikan

### Quick Stats (Sidebar)
- Jumlah aktivitas hari ini
- Total durasi aktivitas hari ini
- Auto-update real-time

### Detailed Statistics
Klik "📊 Stats" untuk melihat:
- Total aktivitas per tanggal
- Total durasi per tanggal
- Breakdown per kategori (durasi + count)

---

## 💾 Data Storage

Semua data disimpan di **Browser LocalStorage**:

### Storage Keys
```javascript
"activities"          // Array semua aktivitas
"activeSession"       // Aktivitas yang sedang berjalan
"customCategories"    // Custom categories user
```

### Kapasitas
- LocalStorage modern: ~5-10MB per domain
- Cukup untuk ribuan aktivitas

### Backup
Gunakan fitur Export untuk backup regular ke file lokal.

---

## 🔄 Session Recovery

### Auto-Recovery
Jika aplikasi ditutup atau browser crash:

**Sesi hari yang sama:**
- Auto-resume aktivitas yang sedang berjalan
- Timer melanjut dari startTime

**Sesi dari hari sebelumnya:**
- Dialog muncul dengan 2 opsi:
  - ▶ Resume - Lanjutkan sesi
  - 🗑️ Clear - Batalkan sesi lama

---

## ⌨️ Keyboard Shortcuts

Saat aktivitas sedang berjalan:

| Tombol | Fungsi |
|--------|--------|
| `SPACE` | Finish aktivitas |
| `ESC` | Abort aktivitas |
| `ENTER` | Add custom category (di input field) |

---

## 📱 Responsive Design

Aplikasi dioptimalkan untuk:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 🖥️ Desktop (1024px+)

**Grid Layout:**
- Mobile: Single column
- Tablet+: 3 column grid (Input + Active Session | Audit Log)

---

## 🔐 Privacy & Security

- ✅ **Offline-First**: Semua data di local browser
- ✅ **No Server**: Tidak ada upload ke server
- ✅ **No Tracking**: Tidak ada analytics/cookies
- ✅ **User Control**: Anda kontrol semua data
- ⚠️ Data hilang jika clear browser cache/data

---

## 🐛 Troubleshooting

### Data tidak tampil
```
→ Check browser LocalStorage (F12 → Application → LocalStorage)
→ Pastikan JavaScript enabled
```

### Timer tidak jalan
```
→ Refresh page
→ Clear browser cache
→ Coba browser lain
```

### Kategori custom hilang
```
→ Data mungkin ter-clear saat clear cache
→ Gunakan Export sebelum clear data
```

### Session recovery muncul terus
```
→ Klik "Clear" untuk hapus sesi lama
→ Atau "Resume" untuk lanjutkan
```

---

## 📈 Roadmap Development

### Phase 1 ✅ (v0.1 - Current)
- Core engine (Start/Stop/Finish)
- Session recovery
- Custom categories
- Basic export
- Responsive UI

### Phase 2 (v0.2 - Planned)
- Weekly/Monthly analytics
- Streak counter
- Category insights (charts)
- Data import

### Phase 3 (v0.3 - Future)
- Cloud sync (optional)
- Mobile app version
- Advanced filters
- Custom reports

---

## 📝 Technical Stack

- **Frontend**: HTML5 + TailwindCSS + Vanilla JavaScript
- **Storage**: Browser LocalStorage
- **No Dependencies**: Pure vanilla implementation
- **File Size**: ~50KB (minified)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

---

## 📄 License & Credits

**Created by:** Mario Juliano Subagiyo  
**Version:** 0.1 (Alpha)  
**Last Update:** May 6, 2026

PillarTracker adalah proyek open-source untuk peningkatan produktivitas personal.

---

## 📞 Support & Feedback

Untuk bug reports atau saran improvement, silakan buat catatan di settings modal.

---

**Happy Tracking! 🚀**
