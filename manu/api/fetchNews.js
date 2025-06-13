// api/fetchNews.js
export default async function handler(req, res) {
  const { category, page, query } = req.query;
  
  try {
    const baseUrl = 'https://newsapi.org/v2';
    let url;
    
    if (query) {
      url = `${baseUrl}/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.API_KEY}&pageSize=20&page=${page || 1}&sortBy=publishedAt&language=es`;
    } else {
      url = `${baseUrl}/top-headlines?category=${category || 'general'}&apiKey=${process.env.API_KEY}&pageSize=20&page=${page || 1}&country=us`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'ok') {
      res.status(200).json(data);
    } else {
      throw new Error(data.message || 'Error al obtener noticias');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
