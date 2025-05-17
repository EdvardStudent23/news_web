import { Helmet } from 'react-helmet';
import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Pages.css';
import Footer from '../components/Footer';

export default function Main() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const seenUrlsRef = useRef(new Set());

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const formatDate = (date) => date.toISOString().split('T')[0];

        const res = await fetch(
<<<<<<< HEAD
          `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=12&apiKey=17127349ad304326915fa7bd8837244d`
=======
          `https://newsapi.org/v2/everything?` +
          `q=general&` +
          `language=en&` +
          `from=${formatDate(oneMonthAgo)}&` +
          `to=${formatDate(today)}&` +
          `sortBy=publishedAt&` +
          `page=${page}&` +
          `pageSize=20&` +
          `apiKey=17127349ad304326915fa7bd8837244d`
>>>>>>> 11d252474a0e44c28647178a444be31fe4ccc5de
        );

        const data = await res.json();

        const newArticles = data.articles.filter(article => {
          if (seenUrlsRef.current.has(article.url)) return false;
          seenUrlsRef.current.add(article.url);
          return true;
        });

        setArticles(prev => [...prev, ...newArticles]);
        setTotalResults(data.totalResults);
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const formatPublishedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCardEmphasis = (article, index) => {
    const hasImage = article.urlToImage ? 1 : 0;
    const contentLength = (article.title?.length || 0) + (article.description?.length || 0);
    const score = contentLength + (hasImage * 100) + (index % 5 === 0 ? 200 : 0);

    if (score > 400) return 'highlight';
    if (score > 300) return 'analysis';
    return 'default';
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Helmet><title>Main</title></Helmet>
      <header><Navbar /></header>
      <main className="main-content">
        <div className="chaotic-news-container">
          <div className="masonry-grid">
            {articles.map((article, index) => (
              <div key={article.url} className={`news-card ${getCardEmphasis(article, index)}`}>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="news-image"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <div className="news-content">
                  {Math.random() > 0.5 && (
                    <span className="news-label">{getCardEmphasis(article).toUpperCase()}</span>
                  )}
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="news-meta">
                    <span className="published-date">{formatPublishedDate(article.publishedAt)}</span>
                    <span className="news-source">{article.source?.name}</span>
                  </div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
          {articles.length < totalResults && (
            <div className="load-more-container">
              <button onClick={loadMore} className="load-more-btn" disabled={loading}>
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