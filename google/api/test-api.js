export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Para permitir solicitudes desde tu frontend
  res.setHeader('Content-Type', 'application/json'); // Asegurarnos que responde JSON

  const { q, category, language } = req.query; // Obtener parámetros

  let responseMessage = "No se especificaron filtros. Aquí están las noticias de prueba por defecto.";
  let articles = [];

  if (q) {
    responseMessage = `¡Búsqueda recibida! Buscando por: "${q}" (idioma: ${language || 'no especificado'})`;
    articles = [
      { title: `Noticia de prueba sobre "${q}"`, source: "Test Search", url: "#", image: null, publishedAt: new Date().toISOString() },
      { title: `Segundo resultado para "${q}"`, source: "Test Search 2", url: "#", image: null, publishedAt: new Date().toISOString() }
    ];
  } else if (category) {
    responseMessage = `¡Categoría recibida! Filtrando por: "${category}" (idioma: ${language || 'no especificado'})`;
    articles = [
      { title: `Noticia de prueba de la categoría "${category}"`, source: "Test Category", url: "#", image: null, publishedAt: new Date().toISOString() },
      { title: `Otro artículo de "${category}"`, source: "Test Category 2", url: "#", image: null, publishedAt: new Date().toISOString() }
    ];
  } else {
    articles = [
      { title: "Noticia por defecto 1", source: "Default News", url: "#", image: null, publishedAt: new Date().toISOString() },
      { title: "Noticia por defecto 2", source: "Default News", url: "#", image: null, publishedAt: new Date().toISOString() }
    ];
  }

  res.status(200).json({
    status: 'success',
    message: responseMessage,
    receivedParams: { q, category, language },
    count: articles.length,
    articles: articles
  });
}
