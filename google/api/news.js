export default async function handler(req, res) {
  // Configura CORS para permitir solicitudes desde tu frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Asegúrate de que esta variable de entorno esté configurada en Vercel
  const API_KEY = process.env.API_KEY; 
  const BASE_URL = 'https://newsapi.org/v2';

  // Obtener parámetros de la query string del frontend
  // 'q' para búsqueda, 'category' para categoría, 'language' para idioma
  const { q, category, language } = req.query; 

  try {
    let url;
    const params = new URLSearchParams({
      apiKey: API_KEY,
      pageSize: 20 // Aumentamos un poco el tamaño de la página para más resultados
    });

    // Lógica para determinar qué endpoint de NewsAPI usar basado en los parámetros
    if (q) {
      // Si hay un término de búsqueda (q), usamos el endpoint /everything
      url = `${BASE_URL}/everything`;
      params.append('q', q);
      // NewsAPI recomienda un idioma para /everything. Por defecto a 'en' si no se especifica.
      params.append('language', language || 'en'); 
      params.append('sortBy', 'relevancy'); // Ordenar por relevancia para búsquedas
      
    } else if (category) {
      // Si hay una categoría (category) pero no hay búsqueda, usamos /top-headlines con la categoría
      url = `${BASE_URL}/top-headlines`;
      params.append('category', category);
      // Para /top-headlines, es necesario un 'country'. Ajustamos basado en el idioma, si es 'es', usamos 'ar' como ejemplo.
      params.append('language', language || 'es'); // Por defecto a español si no se especifica
      // IMPORTANTE: Cambia 'ar' (Argentina) al código de país de tu preferencia si tu audiencia principal es otra.
      // Ej: 'mx' (México), 'co' (Colombia), 'es' (España), 'us' (EE.UU.)
      params.append('country', (language === 'es' || !language) ? 'ar' : 'us'); 
      
    } else {
      // Si no hay búsqueda ni categoría (carga inicial), usamos /top-headlines general
      url = `${BASE_URL}/top-headlines`;
      params.append('language', language || 'es'); // Por defecto a español si no se especifica
      // Default country for initial load or if no specific filter is applied
      params.append('country', (language === 'es' || !language) ? 'ar' : 'us'); 
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
