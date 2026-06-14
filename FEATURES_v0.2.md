# PillarTracker v0.2 - Activity Description & Edit System
## Panduan Fitur Baru

---

## 🎯 Apa itu Fitur Baru?

Sebelum v0.2, PillarTracker hanya menyimpan:
- ⏱️ Nama aktivitas
- 🏷️ Kategori
- ⏲️ Waktu mulai & selesai
- ⏱️ Durasi

Sekarang v0.2 menambahkan:
- 📝 **Description/Catatan** (optional)
- ✏️ **Edit Activity** setelah selesai

---

## 📝 Fitur 1: Activity Description

### Kapan Menambahkan Description?

#### Scenario 1: Saat Membuat Aktivitas (Langsung)
```
Pagi jam 09:00:
Nama: Belajar IPOS
Kategori: Akademisi
Description: ← Optional! Bisa diisi atau dikosongkan
Contoh: "Sering terdistraksi YouTube"
```

#### Scenario 2: Malam Hari (Nanti via Edit)
```
Siang jam 12:30:
- User lazy, buat aktivitas tanpa description
- Aktivitas: "Olahraga"

Malam jam 20:00:
- User klik Edit
- Tambahkan: "Berhasil lari 5km dalam 30 menit!"
```

### Cara Menggunakan Description

#### Step 1: Input Aktivitas
```
1. Masukkan nama aktivitas: "Belajar JavaScript"
2. Pilih kategori: "Akademisi"
3. (BARU!) Masukkan description di textarea:
   "Sering buka YouTube. Perlu fokus lebih baik."
4. Klik "▶ Start"
```

#### Step 2: Aktivitas Berjalan
- Timer menghitung waktu
- Tekan SPACE atau klik "✓ Finish" untuk selesai

#### Step 3: Selesai
- Aktivitas ditampilkan di "Activities" log
- **Description akan tampil dengan ikon 📝:**
  ```
  Belajar JavaScript
  ⏱ 09:00 - 09:30
  Durasi: 0m 30s
  📝 Sering buka YouTube. Perlu fokus lebih baik.
  ```

---

## ✏️ Fitur 2: Edit Activity

### Kapan Menggunakan Edit?

**Scenario A: Ada Typo**
```
User membuat: "Balajar JavaScript" ← Typo!
Nanti edit jadi: "Belajar JavaScript"
```

**Scenario B: Salah Kategori**
```
User membuat di kategori: "Fisik"
Nanti edit jadi kategori: "Akademisi"
```

**Scenario C: Tambahkan Description Nanti**
```
Pagi: Buat aktivitas tanpa description
Malam: Klik Edit, tambahkan catatan refleksi
```

### Cara Edit Activity

#### Step 1: Lihat Activity di Log
```
Aktivitas yang sudah selesai akan tampil di bagian bawah
dengan dua button:
  [✏️ Edit] [🗑️ Delete]
```

#### Step 2: Klik Edit
```
Tekan tombol ✏️ Edit
→ Modal "Edit Activity" akan terbuka
```

#### Step 3: Modal Edit Activity Menampilkan
```
📋 Form dengan fields:

1. Activity Name
   Input: "Belajar JavaScript"
   ✏️ Bisa diedit

2. Category
   Dropdown: "Akademisi"
   ✏️ Bisa diedit ke kategori lain

3. Description
   Textarea: "Sering buka YouTube..."
   ✏️ Bisa ditambahkan, diubah, atau dikosongkan

4. Timestamp (Read-Only)
   "09:00 - 09:30 (0m 30s)"
   🔒 Tidak bisa diedit (waktu asli tetap terjaga)
```

#### Step 4: Ubah Data Sesuai Kebutuhan
```
Contoh perubahan:
- Ubah nama jika ada typo
- Ubah kategori jika salah
- Tambahkan description: "Berhasil menyelesaikan 5 module!"
- Hapus/ubah description yang tidak perlu
```

#### Step 5: Simpan
```
Klik tombol "💾 Save"
→ Perubahan disimpan
→ Modal tutup
→ Toast notification: "Activity updated successfully"
→ Activity log update dengan data terbaru
```

---

## 💡 Contoh Use Cases

### Use Case 1: Pembelajaran Sore
```
Pagi (09:00):
- Aktivitas: "Belajar Python"
- Description: (kosong)
- Durasi: 1 jam

Sore (17:00):
- User klik Edit
- Tambahkan description: "Selesai chapter 3. Bingung dengan decorator."
- Save

Malam (21:00):
- User sudah paham decorator
- Klik Edit lagi
- Ubah description: "Sudah paham decorator. Chapter 4 dimulai besok."
- Save
```

### Use Case 2: Tracking Hambatan
```
Activity 1: "Belajar IPOS"
Description: "Terdistraksi YouTube"

Activity 2: "Belajar SQL"
Description: "Terdistraksi YouTube"

Activity 3: "Programming Project"
Description: "Terdistraksi YouTube"

→ Pattern: YouTube = hambatan utama
→ Solusi: Gunakan website blocker atau time-box sessions
```

### Use Case 3: Reflective Notes
```
Activity: "Olahraga Pagi"
Description (Initial): (kosong)

→ Pukul 08:00 selesai olahraga
→ Evening reflection via Edit:
Description: "Berhasil lari 5km! Rasanya lebih energik. Capek tapi puas."
```

---

## ⚙️ Fitur Teknis

### Data yang Disimpan
```javascript
{
  id: 1718356300000,
  title: "Belajar JavaScript",
  category: "Akademski",
  description: "Sering buka YouTube", // ← NEW!
  date: "2026-06-14",
  startTime: 1718356300000,
  endTime: 1718359900000,
  duration: 3600000,
  createdAt: "2026-06-14T09:00:00.000Z", // ← NEW!
  updatedAt: "2026-06-14T21:00:00.000Z"  // ← NEW! (saat edit)
}
```

### Description Rules
- ✅ Bersifat **optional** - tidak wajib diisi
- ✅ Bisa kosong saat membuat aktivitas
- ✅ Bisa ditambahkan/diubah via Edit
- ✅ Support multi-line text (tekan Enter untuk baris baru)
- ✅ Auto-trim whitespace (spasi awal/akhir dihapus)
- ✅ Tidak tampil di log jika kosong
- ✅ Disimpan di LocalStorage bersama aktivitas

### Edit Limitations
- ❌ Tidak bisa mengubah Timestamp (waktu tetap asli)
- ❌ Tidak bisa mengubah Duration (durasi tetap asli)
- ✅ Bisa mengubah: Nama, Kategori, Description

---

## 📊 Manfaat untuk Analytics

### AI Insight dari Description
Dengan description, AI di masa depan bisa:

```
1. Habit Analysis
   "User sering tulis: 'terdistraksi YouTube'"
   → AI: "Identifikasi hambatan: YouTube"

2. Pattern Detection
   "3 aktivitas dengan 'capek' di description"
   → AI: "User sering kelelahan jam 18:00-20:00"

3. Recommendation Engine
   "Dari 10 aktivitas dengan 'Fokus baik', 8 di pagi"
   → AI: "Optimalkan: jadwalkan task sulit di pagi"

4. Root Cause Finder
   "All 'produktif' entries: 'pake timer Pomodoro'"
   → AI: "Rekomendasi: selalu gunakan Pomodoro timer"
```

---

## 🎓 Tips & Tricks

### Tip 1: Detail yang Berguna
```
❌ Kurang useful: "Belajar"
✅ Lebih useful: "Belajar React hooks. Kesulitan di dependency array."

❌ Kurang useful: "Olahraga"
✅ Lebih useful: "Lari 5km dalam 30 menit. Rasanya fit dan energik."
```

### Tip 2: Short & Sweet
```
❌ Terlalu panjang: "Saya mulai belajar pada jam 09:00 pagi di rumah..."
✅ Ringkas: "Mulai pukul 09:00. Focus baik hari ini!"
```

### Tip 3: Hamatan vs. Success
```
📝 Catatan Hambatan:
- "Distraksi notifikasi HP"
- "Capek setelah makan"
- "Koneksi WiFi lambat"

📝 Catatan Keberhasilan:
- "Menggunakan Pomodoro timer"
- "Kamar sunyi dan gelap"
- "Minum air putih banyak"
```

---

## ❓ FAQ

**Q: Apakah description wajib?**
A: Tidak! Description bersifat optional. User bisa mengosongkan atau menambahkan nanti.

**Q: Bisa edit berapa kali?**
A: Unlimited! User bisa edit activity berkali-kali. `updatedAt` timestamp akan selalu update.

**Q: Timestamp bisa diedit?**
A: Tidak! Timestamp (start/end time) adalah data asli dan tidak boleh diubah untuk menjaga integritas data.

**Q: Description bisa dihapus?**
A: Ya! User bisa mengosongkan description field di modal Edit dan klik Save.

**Q: Format description apa?**
A: Plain text. Support multi-line (Enter untuk baris baru). Emoji juga support! 😊

**Q: Data disimpan kemana?**
A: Semua di LocalStorage browser. Offline-first, tidak ada server.

**Q: Bisa export description?**
A: Ya! Saat export CSV atau JSON backup, description sudah termasuk.

---

## 📱 Screenshot Example

### Activity List (Dengan Description)
```
┌─────────────────────────────────────────────────────┐
│  Activities • Minggu, 14 Juni 2026                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Belajar JavaScript        [Akademisi]  [✏️][🗑️]   │
│ ⏱ 09:00 - 09:30                                    │
│ Durasi: 0m 30s                                      │
│ 📝 Sering buka YouTube. Perlu fokus lebih baik.    │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Olahraga Pagi              [Fisik]     [✏️][🗑️]   │
│ ⏱ 07:00 - 07:45                                    │
│ Durasi: 0m 45s                                      │
│ (Tidak ada description)                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Edit Modal
```
┌─────────────────────────────────────────────────────┐
│ ✏️ Edit Activity                              [✕]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Activity Name                                       │
│ ┌─────────────────────────────────────────────┐    │
│ │ Belajar JavaScript                          │    │
│ └─────────────────────────────────────────────┘    │
│                                                     │
│ Category                                            │
│ ┌─────────────────────────────────────────────┐    │
│ │ Akademisi                    ▼              │    │
│ └─────────────────────────────────────────────┘    │
│                                                     │
│ Description                                         │
│ ┌─────────────────────────────────────────────┐    │
│ │ Sering buka YouTube. Perlu fokus lebih      │    │
│ │ baik. Sudah paham decorator!                │    │
│ └─────────────────────────────────────────────┘    │
│                                                     │
│ Timestamp (cannot be edited)                        │
│ 09:00 - 09:30 (0m 30s)                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│            [Cancel]  [💾 Save]                      │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Kesimpulan

**PillarTracker v0.2** menambahkan dimensi baru ke tracking:

✅ **Quantitative** (durasi, waktu) + **Qualitative** (catatan, refleksi)  
✅ Dari "berapa lama" menjadi "apa yang dipelajari"  
✅ Foundasi untuk AI insight di masa depan  

**User sekarang bisa:**
- 📝 Mencatat hambatan & keberhasilan
- ✏️ Refleksi & update catatan kapan saja
- 📊 Membangun database refleksi untuk self-improvement
- 🤖 Ready untuk AI analysis di v0.3+

---

**Version**: 0.2 (Beta)  
**Release Date**: June 14, 2026  
**Happy Tracking! 🎯**
