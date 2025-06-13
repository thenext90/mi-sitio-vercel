// api/image.js
export default async (req, res) => {
  const imageUrl = req.query.url;
  
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing image URL' });
  }

  try {
    // Decodificar la URL
    const decodedUrl = decodeURIComponent(imageUrl);
    
    // Hacer la petición a la imagen original
    const imageResponse = await fetch(decodedUrl);
    
    // Verificar que la respuesta sea una imagen
    const contentType = imageResponse.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'Invalid image content' });
    }
    
    // Convertir la imagen a base64
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Enviar la imagen
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache de 1 día
    res.send(buffer);
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
};
