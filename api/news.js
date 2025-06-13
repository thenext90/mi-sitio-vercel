// Importar fetch (si usas Node.js <18, necesitarás 'node-fetch')
const fetch = (...args) => 
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

export default async function handler(req, res) {
  // Configurar CORS (para desarrollo)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Tu API Key de NewsAPI (¡usa variables de entorno en producción!)
  const API_KEY = 'fd00630f5a84490cae0e23a3ba61285d'; // Reemplaza con tu key o usa process.env.API_KEY
  const BASE_URL = 'https://newsapi.org/v2';

  try {
    // Ejemplo: Obtener noticias de tecnología en español
    const response = await fetch(
      `${BASE_URL}/top-headlines?category=technology&language=es&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error de NewsAPI: ${response.status}`);
    }

    const data = await response.json();
    
    // Filtrar datos relevantes (opcional)
    const simplifiedNews = data.articles.map(article => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      image: article.urlToImage,
      publishedAt: article.publishedAt
    }));

    res.status(200).json({
      status: 'success',
      count: simplifiedNews.length,
      articles: simplifiedNews
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener noticias',
      details: error.message
    });
  }
}
