document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('newsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categorySelect = document.getElementById('categorySelect');
    const languageSelect = document.getElementById('languageSelect');

    // **IMPORTANTE:** Reemplaza con la URL real de tu API desplegada en Vercel.
    // Si tu proyecto Vercel se llama 'mis-noticias-app', podría ser:
    // const API_ENDPOINT = 'https://mis-noticias-app.vercel.app/api/news';
    // O si es la misma app, el path relativo:
    const API_ENDPOINT = '/api/news'; 

    async function fetchNews(query = '', category = '', language = 'es') {
        newsContainer.innerHTML = '<p class="loading-message">Cargando noticias...</p>'; // Muestra mensaje de carga

        try {
            // Construye los parámetros de la URL para tu API de Vercel
            const params = new URLSearchParams();
            if (query) {
                params.append('q', query);
            }
            if (category) {
                params.append('category', category);
            }
            if (language) {
                params.append('language', language);
            }
            // Agrega el parámetro `country` para asegurar que NewsAPI lo reciba si no se especifica en otro lugar
            // En tu news.js, ya tienes `country: 'us'`, si quieres que sea dinámico, la API debería aceptarlo.
            // Por simplicidad, aquí asumiremos que tu news.js ya maneja el 'us' o que lo ajustas.
            // Para la búsqueda de texto, NewsAPI a menudo usa el endpoint /everything
            // pero tu `news.js` actual usa /top-headlines.
            // Si quieres buscar por texto, tu `news.js` debería ser modificado para usar /everything y aceptar el parámetro 'q'.
            // Para este frontend, vamos a asumir que el 'q' se pasaría y tu news.js lo manejaría para top-headlines.

            // Adaptación: Tu news.js usa `top-headlines` que no tiene un parámetro `q` directo para búsqueda general.
            // Lo más cercano sería `q` para buscar dentro de los titulares principales.
            // Para una búsqueda más amplia, necesitarías modificar `news.js` para usar el endpoint `/everything`
            // de NewsAPI cuando se proporciona un `q`.
            // Por ahora, asumiremos que `news.js` puede procesar `q` para `top-headlines` o que se enfoca en categoría/idioma.
            
            const response = await fetch(`${API_ENDPOINT}?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            newsContainer.innerHTML = ''; // Limpia el mensaje de carga

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const newsCard = document.createElement('div');
                    newsCard.classList.add('news-card');

                    newsCard.innerHTML = `
                        ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ''}
                        <div class="news-card-content">
                            <h2>${article.title || 'Sin Título'}</h2>
                            <p class="source-date">Fuente: ${article.source || 'Desconocido'} - ${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Fecha Desconocida'}</p>
                            <a href="${article.url}" target="_blank">Leer más</a>
                        </div>
                    `;
                    newsContainer.appendChild(newsCard);
                });
            } else {
                newsContainer.innerHTML = '<p class="no-results-message">No se encontraron noticias para tu búsqueda.</p>';
            }

        } catch (error) {
            console.error('Error al obtener las noticias:', error);
            newsContainer.innerHTML = `<p class="error-message">Hubo un error al cargar las noticias. Por favor, inténtalo de nuevo más tarde.<br>Detalle: ${error.message}</p>`;
        }
    }

    // Event Listeners
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        const category = categorySelect.value;
        const language = languageSelect.value;
        fetchNews(query, category, language);
    });

    categorySelect.addEventListener('change', () => {
        const query = searchInput.value;
        const category = categorySelect.value;
        const language = languageSelect.value;
        fetchNews(query, category, language);
    });

    languageSelect.addEventListener('change', () => {
        const query = searchInput.value;
        const category = categorySelect.value;
        const language = languageSelect.value;
        fetchNews(query, category, language);
    });

    // Cargar noticias iniciales al cargar la página
    fetchNews();
});
