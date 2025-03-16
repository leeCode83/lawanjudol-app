# Web App & Chrome Extension: Memberantas Judi Online

## Tech Stack

Proyek ini dikembangkan menggunakan teknologi berikut:

- **Backend**: [NestJS](https://nestjs.com/) dan [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) dan [Prisma ORM](https://www.prisma.io/)
- **Frontend**: HTML, CSS, dan JavaScript (Tanpa Framework)
- **Chrome Extension**: JavaScript

---

## 1. Web App: Memberantas Judi Online

### Fitur Utama
- **Pelaporan Link Situs Judi Online**  
  Pengguna dapat melaporkan link situs judi online yang mereka temui. Link yang dilaporkan akan masuk ke dalam database untuk ditindaklanjuti.
  
- **Artikel Terkait Judi Online**  
  Web app menyediakan berbagai artikel yang membahas dampak judi online dan cara menghindarinya.

### Cara Menggunakan Web App
1. **Akses Web App**  
   - Buka web app melalui browser.

2. **Melaporkan Link Situs Judi Online**  
   - Masukkan URL situs judi yang ingin dilaporkan pada kolom yang tersedia.
   - Klik tombol **Laporkan**.
   - Link yang dilaporkan akan masuk ke dalam database.

3. **Membaca Artikel**  
   - Navigasikan ke halaman artikel.
   - Pilih artikel yang ingin dibaca.

4. **Mengunduh Chrome Extension**  
   - Klik tombol **Unduh Chrome Extension** pada halaman utama web app.

---

## 2. Chrome Extension: Pemblokir Situs Judi Online

### Fitur Utama
- Chrome Extension ini akan memblokir akses ke situs judi online yang terdapat dalam database web app.
- Jika pengguna membuka situs yang terdeteksi sebagai judi online, halaman akan diblokir dan menampilkan peringatan.

### Cara Menginstal Chrome Extension Secara Manual
1. **Unduh Chrome Extension**  
   - Klik tombol **Unduh Chrome Extension** dari web app.
   - Ekstrak file ZIP (jika perlu) ke dalam folder lokal.

2. **Aktifkan Developer Mode**  
   - Buka **Google Chrome**.
   - Masuk ke halaman `chrome://extensions/`.
   - Aktifkan **Developer Mode** (terletak di pojok kanan atas).

3. **Memuat Extension Secara Manual**  
   - Klik **Load unpacked**.
   - Pilih folder tempat file extension telah diekstrak.
   - Chrome Extension akan terpasang dan mulai berjalan.

### Cara Menggunakan Chrome Extension
- Setelah terpasang, extension akan otomatis bekerja di latar belakang.
- Jika pengguna mengunjungi situs judi online yang ada di database, akses akan diblokir dan peringatan akan muncul.
- Untuk menonaktifkan sementara, pengguna bisa menonaktifkan extension melalui `chrome://extensions/`.

---

## 3. Konfigurasi Backend

Agar web app dan Chrome Extension dapat berjalan dengan baik, pastikan backend sudah dikonfigurasi dengan benar.  

### Cara Mengatur Backend
1. **Buka Dokumentasi Backend**  
   - Dokumentasi backend dapat ditemukan dalam folder `server/`.  
   - Ikuti langkah-langkah yang ada untuk menyiapkan server backend.

2. **Membuat Database & File Konfigurasi (.env)**  
   - Sebelum menjalankan backend, pastikan Anda telah membuat database, baik menggunakan **PostgreSQL**, **MySQL**, atau database lain yang didukung oleh backend ini.
   - Buat file `.env` di dalam folder `server/` dan tambahkan konfigurasi database seperti berikut:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/nama_database"
     ```
   - Pastikan mengganti `user`, `password`, dan `nama_database` dengan kredensial database yang sesuai.

3. **Menjalankan Backend**  
   - Pastikan semua dependensi telah diinstal sesuai dengan dokumentasi backend.
   - Jalankan server backend dengan perintah:
     ```sh
     npm run start
     ```
   - Secara default, backend akan berjalan di `http://localhost:3000`.

### Menyesuaikan Link Backend di Frontend dan Chrome Extension
Jika backend tidak menggunakan `localhost:3000`, maka perlu mengganti URL backend di frontend dan Chrome Extension:

1. **Frontend**  
   - Buka kode frontend dan cari semua referensi ke `http://localhost:3000`.  
   - Ganti dengan URL backend yang sesuai.

2. **Chrome Extension**  
   - Buka folder Chrome Extension dan cari file yang berisi permintaan ke API (`fetch` atau `XMLHttpRequest`).  
   - Ganti `http://localhost:3000` dengan URL backend yang benar.  
   - Setelah mengubah URL, ulangi proses **Load unpacked** di `chrome://extensions/`.

---

Dengan menggunakan web app dan Chrome Extension ini, kita dapat bersama-sama membantu memberantas judi online di Indonesia.  
Terima kasih telah berkontribusi dalam gerakan ini! 🙌
