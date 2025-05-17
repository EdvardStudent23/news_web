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
          `https://newsapi.org/v2/top-headlines?category=sports&country=us&page=${page}&pageSize=12&apiKey=17127349ad304326915fa7bd8837244d`
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
    const types = ['sport', 'match', 'tournament', 'event'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  // Додатковий фільтр на випадок, якщо API повертає не тільки спортивні новини
  const sportArticles = articles.filter(article => 
    article.title?.toLowerCase().includes('sport') || 
    article.description?.toLowerCase().includes('sport')
  );

  return (
    <>
      <Helmet>
        <title>Sport News</title>
      </Helmet>
      <header><Navbar /></header>
      
      <main className="main-content">
        <div className="chaotic-news-container">
          <h1 className="sport-page-title">Latest Sport News</h1>
          
          <div className="chaotic-grid">
            {sportArticles.map((article, index) => (
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
                  <span className="news-label sport-label">
                    {getRandomType().toUpperCase()}
                  </span>
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

          {sportArticles.length < totalResults && (
            <div className="load-more-container">
              <button 
                onClick={loadMore} 
                className="load-more-btn"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Sport News'}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}