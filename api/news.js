// api/news.js
export default async function handler(req, res) {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const API_KEY = process.env.API_KEY || 'TU_API_KEY'; // Usa variables de entorno
  const BASE_URL = 'https://newsapi.org/v2';

  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=technology&language=es&apiKey=${API_KEY}`
    );

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data = await response.json();
    
    res.status(200).json({
      status: 'success',
      data: data.articles.map(article => ({
        title: article.title,
        source: article.source.name,
        url: article.url
      }))
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener noticias',
      details: error.message
    });
  }
}
