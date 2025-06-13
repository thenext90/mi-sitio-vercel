# 📰 Noticias Globales - Frontend para Vercel

Una aplicación web moderna y responsiva para mostrar noticias en tiempo real utilizando NewsAPI. Diseñada con un enfoque minimalista y armonioso, perfecta para despliegue en Vercel.

## ✨ Características

- **Diseño Responsivo**: Optimizado para dispositivos móviles y de escritorio
- **Categorías de Noticias**: General, Tecnología, Negocios, Deportes y Salud
- **Búsqueda en Tiempo Real**: Busca noticias por palabras clave
- **Carga Paginada**: Carga más noticias con un solo clic
- **Interfaz Moderna**: Diseño limpio con animaciones suaves
- **Integración NewsAPI**: Conectado con la API de noticias más popular

## 🚀 Configuración Rápida

### 1. Obtener API Key de NewsAPI

1. Visita [newsapi.org/register](https://newsapi.org/register)
2. Regístrate gratuitamente
3. Copia tu API key desde el dashboard

### 2. Configurar la Aplicación

1. Abre el archivo `script.js`
2. Busca la línea: `const API_KEY = 'TU_API_KEY_AQUI';`
3. Reemplaza `'TU_API_KEY_AQUI'` con tu API key real

```javascript
const API_KEY = 'tu_api_key_real_aqui';
```

### 3. Probar Localmente

Abre `index.html` en tu navegador para verificar que todo funciona correctamente.

## 🌐 Despliegue en Vercel

### Opción 1: Despliegue con Git (Recomendado)

1. **Crear repositorio en GitHub**:
   - Sube todos los archivos a un nuevo repositorio en GitHub
   - Asegúrate de incluir: `index.html`, `styles.css`, `script.js`

2. **Conectar con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio
   - Haz clic en "Deploy"

### Opción 2: Despliegue Directo

1. **Preparar archivos**:
   - Asegúrate de que tu API key esté configurada en `script.js`
   - Comprime todos los archivos en un ZIP

2. **Subir a Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Arrastra y suelta tu carpeta del proyecto
   - Vercel detectará automáticamente que es un sitio estático
   - Haz clic en "Deploy"

## 📁 Estructura del Proyecto

```
news-frontend/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Este archivo
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Color principal */
    --accent-color: #f59e0b;     /* Color de acento */
    --text-primary: #1e293b;     /* Color de texto */
    /* ... más variables */
}
```

### Agregar Más Categorías

En `script.js`, modifica el objeto `categoryMap`:

```javascript
const categoryMap = {
    'general': 'general',
    'tecnología': 'technology',
    'negocios': 'business',
    'deportes': 'sports',
    'salud': 'health',
    'ciencia': 'science',        // Nueva categoría
    'entretenimiento': 'entertainment'  // Nueva categoría
};
```

Luego agrega los botones correspondientes en `index.html`.

## 🔧 Funcionalidades Técnicas

### Endpoints Utilizados

- **Top Headlines**: `/v2/top-headlines` - Para noticias por categoría
- **Everything**: `/v2/everything` - Para búsquedas personalizadas

### Características de Rendimiento

- **Lazy Loading**: Las imágenes se cargan bajo demanda
- **Debounced Search**: La búsqueda se optimiza para evitar llamadas excesivas
- **Error Handling**: Manejo robusto de errores de red y API
- **Responsive Design**: Adaptable a cualquier tamaño de pantalla

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles iOS/Android

## 🛠️ Solución de Problemas

### La aplicación no carga noticias

1. **Verifica tu API key**:
   - Asegúrate de que esté correctamente configurada en `script.js`
   - Verifica que la key sea válida en [newsapi.org](https://newsapi.org)

2. **Revisa la consola del navegador**:
   - Presiona F12 y ve a la pestaña "Console"
   - Busca mensajes de error

3. **Problemas de CORS**:
   - NewsAPI puede tener restricciones de CORS en desarrollo local
   - El problema se resuelve automáticamente en producción (Vercel)

### Límites de la API

- **Plan Gratuito**: 1,000 requests por mes
- **Rate Limit**: Máximo 1,000 requests por día
- **Delay**: Noticias pueden tener hasta 15 minutos de retraso

## 🎯 Próximas Mejoras

- [ ] Modo oscuro/claro
- [ ] Favoritos y marcadores
- [ ] Compartir en redes sociales
- [ ] Notificaciones push
- [ ] Filtros avanzados de fecha
- [ ] Soporte para múltiples idiomas

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún bug o tienes ideas para mejoras:

1. Abre un issue describiendo el problema o la mejora
2. Fork el proyecto
3. Crea una rama para tu feature
4. Envía un pull request

## 📞 Soporte

Si necesitas ayuda:

- 📧 Email: [tu-email@ejemplo.com]
- 🐛 Issues: [GitHub Issues]
- 📖 Documentación: [NewsAPI Docs](https://newsapi.org/docs)

---

**¡Disfruta de tu nueva aplicación de noticias!** 🎉

