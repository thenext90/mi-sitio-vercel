export default async function handler(req, res) {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const API_KEY = process.env.API_KEY; // ¡Usa siempre variables de entorno!
  const BASE_URL = 'https://newsapi.org/v2';

  try {
    // Opción 1: Noticias globales en inglés (máxima compatibilidad)
    const response = await fetch(
      `${BASE_URL}/top-headlines?pageSize=10&apiKey=${API_KEY}`
    );

    // Opción 2: Búsqueda genérica en español (si prefieres)
    // const response = await fetch(
    //   `${BASE_URL}/everything?q=tecnologia&language=es&sortBy=publishedAt&apiKey=${API_KEY}`
    // );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en NewsAPI');
    }

    const data = await response.json();

    // Si aún está vacío, forzar datos de ejemplo
    const articles = data.articles.length > 0 ? data.articles : [{
      title: "Prueba: NewsAPI no devolvió resultados",
      source: { name: "Sistema" },
      url: "https://newsapi.org",
      description: "Modifica los parámetros de búsqueda"
    }];

    res.status(200).json({
      status: 'success',
      count: articles.length,
      articles: articles.map(article => ({
        title: article.title,
        source: article.source?.name,
        url: article.url,
        description: article.description
      }))
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor',
      details: error.message
    });
  }
}
