// api/news.js
export default async function handler(req, res) {
  // Verificar método HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Extraer parámetros de consulta
  const { category, page, query } = req.query;

  try {
    let url;
    const baseUrl = 'https://newsapi.org/v2';
    
    // Construir URL según el tipo de solicitud (búsqueda o categoría)
    if (query) {
      url = `${baseUrl}/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.API_KEY}&pageSize=20&page=${page || 1}&sortBy=publishedAt&language=es`;
    } else {
      url = `${baseUrl}/top-headlines?category=${category || 'general'}&apiKey=${process.env.API_KEY}&pageSize=20&page=${page || 1}&country=us`;
    }

    // Hacer la petición a NewsAPI
    const response = await fetch(url);
    const data = await response.json();

    // Verificar respuesta
    if (data.status === 'ok') {
      // Cachear respuesta por 5 minutos (opcional)
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
      return res.status(200).json(data);
    } else {
      throw new Error(data.message || 'Error al obtener noticias');
    }
  } catch (error) {
    console.error('Error en API route:', error);
    return res.status(500).json({ 
      error: error.message || 'Error al procesar la solicitud',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}