import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Pages.css';
import Footer from '../components/Footer';

export default function Main() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=12&apiKey=17127349ad304326915fa7bd8837244d`
        );
        const data = await res.json();
        setArticles(prev => [...prev, ...data.articles]);
        setTotalResults(data.totalResults);
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const getRandomSize = () => {
    const sizes = ['small', 'medium', 'large'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const getRandomType = () => {
    const types = ['default', 'highlight', 'analysis', 'live'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Helmet>
        <title>Main</title>
      </Helmet>
      <header><Navbar /></header>
      
      <main className="main-content">
        <div className="chaotic-news-container">
          <div className="chaotic-grid">
            {articles.map((article, index) => (
              <div 
                key={index} 
                className={`news-card ${getRandomSize()} ${getRandomType()}`}
              >
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    className="news-image" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="news-content">
                  {Math.random() > 0.5 && (
                    <span className="news-label">
                      {getRandomType().toUpperCase()}
                    </span>
                  )}
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {articles.length < totalResults && (
            <div className="load-more-container">
              <button 
                onClick={loadMore} 
                className="load-more-btn"
                disabled={loading}
              >
                {loading ? 'Завантаження...' : 'Завантажити більше'}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}