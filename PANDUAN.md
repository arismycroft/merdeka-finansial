# Panduan Merdeka Finansial: Firebase, Vercel, Play Store

Isi folder ini siap di-deploy sebagai situs statis (tanpa build).

| File | Fungsi |
|---|---|
| `index.html` | Game lengkap. Leaderboard memakai Firebase (konfigurasi sudah terpasang). |
| `firestore.rules` | Aturan keamanan database. **Wajib ditempel di Firebase.** |
| `manifest.webmanifest`, `sw.js`, `icons/` | Agar game bisa dipasang seperti aplikasi dan jalan offline (PWA). |
| `privacy.html` | Kebijakan privasi (dibutuhkan Play Store). **Isi dulu bagian [ISI ...].** |
| `vercel.json` | Pengaturan header untuk Vercel. |
| `icons/feature-graphic-1024x500.png` | Gambar fitur untuk halaman toko Play Store. |

## A. Pasang aturan keamanan Firebase (wajib, 3 menit)
1. Firebase Console, proyek `merdeka-finansial`, **Firestore Database**, tab **Rules**.
2. Hapus isinya, tempel seluruh isi `firestore.rules`, klik **Publish**.
3. Pastikan **Authentication**, **Sign-in method**, **Anonymous** sudah *Enabled*.
4. Setelah punya alamat Vercel, buka **Authentication**, **Settings**, **Authorized domains**, lalu **Add domain** untuk alamat itu (tanpa `https://`).

## B. Isi bagian kosong
Di `privacy.html`, ganti `[ISI TANGGAL]` dan `[ISI EMAIL KONTAK]`. Email ini tampil publik, jadi pakai email yang memang mau dipublikasikan.

## C. Deploy ke Vercel
1. Buat repositori GitHub baru, unggah semua isi folder ini.
2. vercel.com, **Add New Project**, impor repositori itu.
3. Framework Preset: **Other**. Build Command dan Output Directory dikosongkan. Klik **Deploy**.
4. Buka alamat hasilnya di HP, mainkan sampai tamat, lalu cek tab Peringkat. Skor harus muncul di Firestore, koleksi `season1`.

## D. Ke Play Store (aplikasi Android dari situs web)
1. Buka pwabuilder.com, masukkan alamat Vercel-mu, lalu **Package for stores**, **Android**.
2. Unduh paketnya. **Simpan file kunci tanda tangan (keystore) dan sandinya di tempat aman.** Kehilangan kunci membuat aplikasi tidak bisa diperbarui.
3. Ambil SHA-256 fingerprint dari kunci itu, lalu buat file `.well-known/assetlinks.json` di situsmu sesuai petunjuk PWABuilder. Ini membuat aplikasi tampil tanpa bilah alamat browser.
4. Di Google Play Console: buat aplikasi, unggah file `.aab`, isi **Kebijakan privasi** (alamat `/privacy.html`), **Data safety**, dan **Content rating** (jawab jujur soal tema judi online dan pinjaman sebagai simulasi tanpa uang sungguhan).
5. Isi halaman toko: ikon `icons/icon-512.png`, gambar fitur `icons/feature-graphic-1024x500.png`, serta screenshot dari HP.
6. Akun pribadi baru wajib menjalankan **closed test** dengan minimal 12 penguji selama 14 hari berturut-turut sebelum bisa merilis ke publik.

## E. Memperbarui game
1. Ubah `index.html`.
2. Di `sw.js`, naikkan angka pada `VERSI` (misalnya `merdeka-v2`). Pemain jadi menerima versi baru.
3. Unggah ke GitHub, Vercel otomatis men-deploy ulang. Aplikasi Play Store memuat versi web terbaru, jadi tidak perlu unggah ulang ke Play Store kecuali ikon atau pengaturan aplikasi berubah.

## Catatan keamanan
- Konfigurasi Firebase di `index.html` memang publik; yang melindungi data adalah aturan di langkah A.
- Aturan itu hanya menahan kecurangan kasar (skor di luar batas, menulis milik orang lain, menurunkan skor). Pemeriksaan ulang di server belum ada.
- Identitas pemain adalah login anonim per perangkat. Kalau data aplikasi dihapus, pemain mendapat identitas baru dan skor lamanya tidak bisa diubah lagi.
- Paket gratis Firebase (Spark) cukup untuk skala kecil. Pantau penggunaannya di konsol.
