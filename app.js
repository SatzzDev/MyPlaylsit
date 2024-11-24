const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Simpan daftar lagu sementara
let songr = [
"https://open.spotify.com/track/1rBzwMNzV14nYk2IHgMFP9?si=e041d5630fe14805",
"https://open.spotify.com/track/0VhgEqMTNZwYL1ARDLLNCX?si=0cedea4d4f654ceb",
"https://open.spotify.com/track/55Am8neGJkdj2ADaM3aw5H?si=50938461a2b44be9",
"https://open.spotify.com/track/5h5CQwgjgQrBUacsqR2zR7?si=757847f9b58c407e",
"https://open.spotify.com/track/3DBJE1Zndql25OGUQSv7aD?si=f6fedbef6d194113",
"https://open.spotify.com/track/5yVIlYEHZxQVLyInCdldoS?si=06adb16ae16340ce",
"https://open.spotify.com/track/5kqIPrATaCc2LqxVWzQGbk?si=f55d71e599fa4b76",
"https://open.spotify.com/track/0KpWiHVmIFDTvai20likX4?si=f38241439bbf4c7e",
"https://open.spotify.com/track/4DxybsoSiMUW0JI2oM0SSN?si=6888ade723e844c3",
"https://open.spotify.com/track/6mQLN3zRtAp6ovjusyYKrV?si=953920fc981b4652",
"https://open.spotify.com/track/40gk32E7YaTFoQwDIWv2SY?si=8323b7887fd3479e",
"https://open.spotify.com/track/6OmKbLCskNWi1IcfpZbeJc?si=b96be147a63647d1",
"https://open.spotify.com/track/009ImBOrIUlWgla8U05RAC?si=561427bb6e864833",
"https://open.spotify.com/track/3cKM7UXBZmgjEgEBTkaIlU?si=1061c09d433a48e4",
"https://open.spotify.com/track/5ajjAnNRh8bxFvaVHzpPjh?si=8390c418afe64b6d",
"https://open.spotify.com/track/6T7MAQCekVb3UnCykjX3BP?si=49b1ed33f8b34026",
"https://open.spotify.com/track/1daDRI9ahBonbWD8YcxOIB?si=e29cf2f9ca824629",
"https://open.spotify.com/track/0GgN4MhR5GKn5IcKN0e0rG?si=2f5b4622d3a84b3a",
"https://open.spotify.com/track/40gk32E7YaTFoQwDIWv2SY?si=ed6c854c8c4346ce",
"https://open.spotify.com/track/77KnJc8o5G1eKVwX5ywMeZ?si=a583e6ec0693490e",
"https://open.spotify.com/track/1V6gIisPpYqgFeWbMLI0bA?si=60ce04db816745c9",
"https://open.spotify.com/track/0pJW1Xw3aY4Eh6k5iuBkfI?si=7ad64e32c1e34ef6",
"https://open.spotify.com/track/4RAOI1etsgbh5NP3T5R8rN?si=225fed87444c405e",
"https://open.spotify.com/track/2IVsRhKrx8hlQBOWy4qebo?si=9e015f451d814d66",
"https://open.spotify.com/track/3qhlB30KknSejmIvZZLjOD?si=ef75eab799ce4edf",
"https://open.spotify.com/track/0M3HkE321xpCbCYqVKzr1q?si=8b9b4d7ca2cc4202",
"https://open.spotify.com/track/5UXJzLFdBn6u9FJTCnoHrH?si=61016c54ab444bbe",
"https://open.spotify.com/track/6GJdFTOm23lC5bqjYSMJTj?si=455d3dc6b57443d5",
];

async function downloadSpotifyTrack(url) {
try {
// Ubah URL_API_SPOTIFY ke endpoint downloader Anda
const response = await axios.get(`https://api.agatz.xyz/api/spotifydl?url=${url}`);
const data = JSON.parse(response.data.data); // Parse data dari string JSON
return {
title: data.judul,
url: data.url_audio_v1,
image: data.gambar_kecil[0].url,
channel: data.nama_channel
};
} catch (error) {
console.error('Error downloading track:', error);
return null;
}
}

// Route utama
app.get('/', async (req, res) => {
try {
const songPromises = songr.map(downloadSpotifyTrack);  // Jalankan semua request secara bersamaan
let songs = await Promise.all(songPromises);
songs = songs.filter(song => song !== null);  
console.log(songs)
res.render('index', { songs });
} catch (error) {
console.error('Error loading songs:', error.message);
res.status(500).send('Error fetching songs');
}
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server berjalan di http://localhost:${PORT}`);
});
