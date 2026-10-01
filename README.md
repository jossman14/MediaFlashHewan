# Media Pembelajaran Interaktif: Bioremediasi

Media pembelajaran interaktif berjudul **"Bioremediasi - Interactive Learning"**, dibuat dengan Adobe Animate CC dan diekspor ke HTML5 Canvas (CreateJS).

## Isi

- `index.html`, `index.js`: halaman pembuka.
- `data/menu/`: menu utama.
- `data/materi1/` s.d. `data/materi17/` (termasuk `materi8a/`): modul materi.
- `data/game1/` s.d. `data/game18/`: modul permainan/latihan.
- `images/`, `assets/`, `bioremediasi/`: aset gambar dan animasi.
- `*.fla`, `FIleMentah/`, `bioremediasi.zip`/`.rar`: file sumber Animate dan bahan mentah.
- `.htaccess`, `OPTIMIZATION_GUIDE.md`, `optimize_all.sh`: konfigurasi caching/kompresi server dan catatan optimasi.
- `status.txt`: catatan revisi.

## Cara Menjalankan

Sajikan folder ini lewat web server statis (CreateJS memuat aset via XHR), misalnya:

```bash
python -m http.server 8000
```

lalu buka `http://localhost:8000/`. Untuk mengedit konten, buka file `.fla` di Adobe Animate.
