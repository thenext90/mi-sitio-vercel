import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'general', 'business', 'entertainment', 
    'health', 'science', 'sports', 'technology'
  ];

  const fetchNews = async () => {
    setLoading(true);
    try {
      let url = `/api/news?category=${category}`;
      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>News App</title>
        <meta name="description" content="Simple news app using NewsAPI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>News App</h1>
        
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category:</label>
            <select 
              id="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search term"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get News'}
          </button>
        </form>

        {loading && <p>Loading news...</p>}
        
        <div className={styles.newsGrid}>
          {articles.map((article, index) => (
            <div key={index} className={styles.newsCard}>
              {article.urlToImage && (
                <img 
                  src={article.urlToImage} 
                  alt={article.title} 
                  className={styles.newsImage}
                />
              )}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.readMore}
              >
                Read more
              </a>
            </div>
          ))}
        </div>

        {!loading && articles.length === 0 && (
          <p>No articles found. Try a different search or category.</p>
        )}
      </main>
    </div>
  );
}
