const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Simple in-memory cache (or use a more sophisticated caching strategy)
let cachedSongs = null;
let cacheTime = null;

async function getPlaylistData() {
  // Check if cache exists and is still fresh (e.g., within the last 10 minutes)
  if (cachedSongs && (Date.now() - cacheTime < 600000)) {
    return cachedSongs; // Return cached data
  }

  try {
    const response = await axios.get('https://raw.githubusercontent.com/SatzzDev/Datas/main/playlist.json');
    cachedSongs = response.data;  // Store the result in cache
    cacheTime = Date.now();  // Update cache time
    return cachedSongs;
  } catch (error) {
    console.error('Error fetching playlist data:', error.message);
    throw error;
  }
}

// Route utama
app.get('/', async (req, res) => {
  try {
    const songs = await getPlaylistData(); // Get playlist data, either from cache or fresh
    console.log(songs);  // For debugging (optional)
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
