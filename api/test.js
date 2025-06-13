// api/test.js
export default function handler(req, res) {
  // Configurar cabeceras CORS para desarrollo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'GET') {
    // Responder con un objeto JSON simple
    res.status(200).json({
      message: '¡JavaScript funciona correctamente en Vercel!',
      timestamp: new Date().toISOString(),
      method: req.method,
      query: req.query,
      headers: req.headers
    });
  } else {
    // Método no soportado
    res.status(405).json({ error: 'Método no permitido' });
  }
}