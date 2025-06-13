export default async function handler(req, res) {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const API_KEY = process.env.API_KEY; // Asegúrate de tener esta variable en Vercel
  const BASE_URL = 'https://newsapi.org/v2';

  // Obtener parámetros de la query string del frontend
  const { q, category, language } = req.query; // 'q' para búsqueda, 'category' para categoría, 'language' para idioma

  try {
    let url;
    const params = new URLSearchParams({
      apiKey: API_KEY,
      pageSize: 20 // Aumentamos un poco el tamaño de la página para más resultados
    });

    // Lógica para determinar qué endpoint de NewsAPI usar
    if (q) {
      // Si hay un término de búsqueda, usamos el endpoint /everything
      url = `${BASE_URL}/everything`;
      params.append('q', q);
      // Opcional: Puedes agregar un idioma específico para la búsqueda global
      if (language) {
        params.append('language', language);
      } else {
        params.append('language', 'en'); // Por defecto a inglés para búsquedas generales si no se especifica
      }
      params.append('sortBy', 'relevancy'); // Ordenar por relevancia para búsquedas
      
    } else if (category) {
      // Si hay una categoría, usamos el endpoint /top-headlines con la categoría
      url = `${BASE_URL}/top-headlines`;
      params.append('category', category);
      if (language) {
        params.append('language', language);
      } else {
        params.append('language', 'us'); // Por defecto a español si no se especifica
      }
      params.append('country', language === 'es' ? 'ar' : 'us'); // País basado en el idioma, o 'us' por defecto
      
    } else {
      // Si no hay búsqueda ni categoría, usamos /top-headlines general (por defecto)
      url = `${BASE_URL}/top-headlines`;
      if (language) {
        params.append('language', language);
      } else {
        params.append('language', 'es'); // Por defecto a español si no se especifica
      }
      params.append('country', language === 'es' ? 'ar' : 'us'); // País basado en el idioma, o 'us' por defecto
    }

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error en NewsAPI con status: ${response.status}`);
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
    console.error('Error en la función de API:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor al obtener noticias',
      details: error.message
    });
  }
}
