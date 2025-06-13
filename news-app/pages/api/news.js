// api/news.js
export default async function handler(req, res) {
  const { category = 'general', q } = req.query;
  const API_KEY = process.env.API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    let url;
    if (q) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=es&apiKey=${API_KEY}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Enviar los datos al cliente
    res.status(200).json(data);
  } catch (error) {
    console.error('NewsAPI error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
