const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8000;

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demoaws'
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


connection.connect((err) => {
  if (err) {
    console.error('Koneksi ke MySQL gagal: ', err);
    return;
  }
  console.log('Terhubung Ke RDS');
});


app.get('/', (req, res) => {
  // Query untuk mendapatkan data dari tabel
  const query = 'SELECT * FROM mahasiswa';


  // Eksekusi query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error saat mengambil data: ', err);
      res.status(500).send('Terjadi kesalahan');
      return;
    }
    res.json(results);
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
