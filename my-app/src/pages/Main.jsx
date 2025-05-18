import { Helmet } from 'react-helmet';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Pages.css';
import Footer from '../components/Footer';

export default function Main() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [seenUrls, setSeenUrls] = useState(new Set());
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [hasMore, setHasMore] = useState(true);
  const [showPoliticsOnly, setShowPoliticsOnly] = useState(true);

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    
    setDateRange({
      startDate,
      endDate
    });
  }, []);
  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };
  const fetchNews = useCallback(async () => {
    if (!dateRange.startDate || !dateRange.endDate || loading || !hasMore) return;
    
    try {
      setLoading(true);
      const query = 'sports OR business OR crypto OR politics';
      const sources = 'bbc-news,cnn,fox-news,the-washington-post,the-wall-street-journal';
      
      const res = await fetch(
        `https://newsapi.org/v2/everything?` +
        `q=${query}&` +
        `sources=${sources}&` +
        `from=${formatDate(dateRange.startDate)}&` +
        `to=${formatDate(dateRange.endDate)}&` +
        `sortBy=publishedAt&` +
        `page=${page}&` +
        `pageSize=50&` +
        `apiKey=c58aeb66990b4c45a3455fb28c0846a9`
      );
      
      const data = await res.json();
      
      if (data.status === 'error') {
        console.error('API Error:', data.message);
        setHasMore(false);
        return;
      }
      const newArticles = (data.articles || []).filter(article => !seenUrls.has(article.url));
      if (newArticles.length < 5) {
        const newEndDate = new Date(dateRange.startDate);
        newEndDate.setDate(newEndDate.getDate() - 1);
        
        const newStartDate = new Date(newEndDate);
        newStartDate.setDate(newStartDate.getDate() - 29);
        
        setDateRange({
          startDate: newStartDate,
          endDate: newEndDate
        });
        setPage(1);
      } else {

        const newSeenUrls = new Set(seenUrls);
        newArticles.forEach(article => newSeenUrls.add(article.url));
        setSeenUrls(newSeenUrls);
        setArticles(prev => [...prev, ...newArticles]);
        setTotalResults(data.totalResults);
        if (newArticles.length < 10) {
          console.log('Getting fewer articles, might be reaching the end');
        }
      }
    } catch (err) {
      console.error('Error loading news:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, dateRange, seenUrls, loading, hasMore]);
  useEffect(() => {
    fetchNews();
  }, [fetchNews, page, dateRange.startDate, dateRange.endDate]);
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

  const getDateRangeText = () => {
    if (!dateRange.startDate || !dateRange.endDate) return '';
    
    const formatDisplayDate = (date) => {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };
    
    return `${formatDisplayDate(dateRange.startDate)} - ${formatDisplayDate(dateRange.endDate)}`;
  };

  return (
    <>
      <Helmet>
        <title>Sports News</title>
      </Helmet>
      <header><Navbar /></header>
      <main className="main-content">
        <div className="chaotic-news-container">
          {}
          
          <div className="masonry-grid">
            {articles.map((article, index) => (
              <div
                key={article.url}
                className={`news-card ${getCardEmphasis(article, index)}`}
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
                      СПОРТ
                    </span>
                  )}
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="news-meta">
                    <span className="published-date">{formatPublishedDate(article.publishedAt)}</span>
                    <span className="news-source">{article.source?.name}</span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
          {articles.length < totalResults && hasMore && (
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
          
          {!hasMore && articles.length > 0 && (
            <div className="end-of-results">
              All available news loaded
            </div>
          )}
          
          {articles.length === 0 && !loading && (
            <div className="no-results">
              Loading news... If nothing appears within a minute, try reloading the page.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}