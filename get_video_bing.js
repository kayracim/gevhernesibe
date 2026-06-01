const https = require('https');

const query = encodeURIComponent("Kayseri Selçuklu Müzesi 360");
const url = `https://www.bing.com/search?q=${query}`;

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("Length of data:", data.length);
    
    // Find all links to youtube.com/watch?v=... or similar
    // The URLs in href might be HTML encoded (e.g. %3D instead of =, etc.)
    const ytRegex = /(youtube\.com|youtu\.be)/gi;
    const matches = new Set();
    let index = 0;
    while (true) {
      index = data.toLowerCase().indexOf("youtube", index);
      if (index === -1) break;
      const snippet = data.substring(Math.max(0, index - 100), Math.min(data.length, index + 200));
      console.log(`--- MATCH AT ${index} ---`);
      console.log(snippet);
      index += 7;
      if (index > 200000) break;
    }
  });
}).on('error', (err) => {
  console.error("Error:", err);
});
