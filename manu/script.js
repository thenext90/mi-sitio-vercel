// Configuración de la API
const API_ROUTE = '/api/fetchNews'; // Nueva ruta de la API
const BASE_URL = 'https://newsapi.org/v2'; // Puedes mantener esto como referencia


// Variables globales
let currentCategory = 'general';
let currentPage = 1;
let isLoading = false;
let searchQuery = '';

// Elementos del DOM
const newsGrid = document.getElementById('newsGrid');
const loadingElement = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const retryBtn = document.getElementById('retryBtn');
const navButtons = document.querySelectorAll('.nav-btn');

// Mapeo de categorías en español
const categoryMap = {
    'general': 'general',
    'tecnología': 'technology',
    'negocios': 'business',
    'deportes': 'sports',
    'salud': 'health'
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Verificar si hay API key
    if (API_KEY === 'TU_API_KEY_AQUI') {
        showApiKeyError();
        return;
    }

    // Event listeners
    setupEventListeners();
    
    // Cargar noticias iniciales
    loadNews();
}

function setupEventListeners() {
    // Botones de navegación
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            selectCategory(category);
        });
    });

    // Búsqueda
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Cargar más
    loadMoreBtn.addEventListener('click', loadMoreNews);

    // Reintentar
    retryBtn.addEventListener('click', function() {
        hideError();
        loadNews();
    });
}

function selectCategory(category) {
    // Actualizar botones activos
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Actualizar estado
    currentCategory = category;
    currentPage = 1;
    searchQuery = '';
    searchInput.value = '';
    
    // Limpiar grid y cargar nuevas noticias
    clearNewsGrid();
    loadNews();
}

function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    searchQuery = query;
    currentPage = 1;
    
    clearNewsGrid();
    loadNews();
}

async function loadNews() {
    if (isLoading) return;
    
    isLoading = true;
    showLoading();
    hideError();

    try {
        const url = buildApiUrl();
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.articles);
            
            // Mostrar botón "Cargar más" si hay más resultados
            if (data.totalResults > currentPage * 20) {
                showLoadMoreButton();
            } else {
                hideLoadMoreButton();
            }
        } else {
            throw new Error(data.message || 'Error al cargar noticias');
        }
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    } finally {
        isLoading = false;
        hideLoading();
    }
}

async function loadMoreNews() {
    if (isLoading) return;
    
    currentPage++;
    await loadNews();
}

function buildApiUrl() {
    let url;
    
    if (searchQuery) {
        // Usar endpoint everything para búsquedas
        url = `${BASE_URL}/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}&pageSize=20&page=${currentPage}&sortBy=publishedAt&language=es`;
    } else {
        // Usar endpoint top-headlines para categorías
        const apiCategory = categoryMap[currentCategory] || currentCategory;
        url = `${BASE_URL}/top-headlines?category=${apiCategory}&apiKey=${API_KEY}&pageSize=20&page=${currentPage}&country=us`;
    }
    
    return url;
}

function displayNews(articles) {
    if (currentPage === 1) {
        newsGrid.innerHTML = '';
    }

    articles.forEach(article => {
        const newsCard = createNewsCard(article);
        newsGrid.appendChild(newsCard);
    });

    // Animar las nuevas tarjetas
    const newCards = newsGrid.querySelectorAll('.news-card:not(.animated)');
    newCards.forEach((card, index) => {
        card.classList.add('animated');
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';

    const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200?text=Sin+Imagen';
    const title = article.title || 'Sin título';
    const description = article.description || 'Sin descripción disponible';
    const source = article.source?.name || 'Fuente desconocida';
    const publishedAt = formatDate(article.publishedAt);
    const url = article.url || '#';

    card.innerHTML = `
        <img src="${imageUrl}" alt="${title}" class="news-image" onerror="this.src='https://via.placeholder.com/400x200?text=Sin+Imagen'">
        <div class="news-content">
            <h3 class="news-title">${title}</h3>
            <p class="news-description">${description}</p>
            <div class="news-meta">
                <span class="news-source">${source}</span>
                <span class="news-date">${publishedAt}</span>
            </div>
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="news-link">
                Leer más <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;

    return card;
}

function formatDate(dateString) {
    if (!dateString) return 'Fecha desconocida';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Hace 1 día';
    } else if (diffDays < 7) {
        return `Hace ${diffDays} días`;
    } else {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

function showLoading() {
    loadingElement.style.display = 'flex';
}

function hideLoading() {
    loadingElement.style.display = 'none';
}

function showError(message) {
    errorMessage.style.display = 'block';
    errorMessage.querySelector('p').textContent = message || 'Error al cargar las noticias. Por favor, intenta de nuevo.';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function showLoadMoreButton() {
    loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
    loadMoreBtn.style.display = 'none';
}

function clearNewsGrid() {
    newsGrid.innerHTML = '';
    hideLoadMoreButton();
}

function showApiKeyError() {
    newsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <i class="fas fa-key" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 1rem; color: var(--text-primary);">API Key Requerida</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Para usar esta aplicación, necesitas obtener una API key gratuita de NewsAPI.
            </p>
            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius); margin-bottom: 1.5rem;">
                <p style="font-size: 0.875rem; color: var(--text-secondary);">
                    1. Visita <a href="https://newsapi.org/register" target="_blank" style="color: var(--primary-color);">newsapi.org/register</a><br>
                    2. Regístrate gratis<br>
                    3. Copia tu API key<br>
                    4. Reemplaza "TU_API_KEY_AQUI" en el archivo script.js
                </p>
            </div>
            <a href="https://newsapi.org/register" target="_blank" style="display: inline-block; padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; text-decoration: none; border-radius: var(--radius); font-weight: 500;">
                Obtener API Key Gratis
            </a>
        </div>
    `;
    hideLoading();
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Búsqueda con debounce para mejor UX
const debouncedSearch = debounce(performSearch, 500);
searchInput.addEventListener('input', debouncedSearch);

