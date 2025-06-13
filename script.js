const API_KEY = process.env.API_KEY || 'TU_API_KEY_AQUI';
const BASE_URL = 'https://newsapi.org/v2';

async function fetchNews() {
    try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error)
        console.error("Error fetching news:", error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = articles.map(article => `
        <div class="news-item">
            <h2>${article.title}</h2>
            <p>${article.description || "Sin descripción"}</p>
            <a href="${article.url}" target="_blank">Leer más</a>
        </div>
    `).join("");
}

// Llamamos a la función al cargar la página
fetchNews();
