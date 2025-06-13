export default async function handler(req, res) {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const API_KEY = process.env.API_KEY; // Asegúrate de tener esta variable en Vercel
  const BASE_URL = 'https://newsapi.org/v2';

  try {
    // Parámetros MÍNIMOS requeridos por NewsAPI (elige uno):
  const params = new URLSearchParams({
  apiKey: API_KEY,
  q: 'IA',  // Palabra clave
  language: 'es',
  sortBy: 'relevancy'            // Ordenar por relevancia
});
    const response = await fetch(`${BASE_URL}/top-headlines?${params}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en NewsAPI');
    }

    const data = await response.json();

    res.status(200).json({
      status: 'success',
      count: data.articles?.length || 0,
      articles: data.articles?.map(article => ({
        title: article.title,
        source: article.source?.name,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt
      })) || []
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor',
      details: error.message
    });
  }
}
