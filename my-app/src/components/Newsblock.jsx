import { useCallback, useEffect } from 'react';

const NewsGrid = ({ 
  articles,
  loading,
  hasMore,
  totalResults,
  onLoadMore,
  formatPublishedDate
}) => {
  const getCardEmphasis = useCallback((article, index) => {
    const hasImage = article.urlToImage ? 1 : 0;
    const contentLength = (article.title?.length || 0) + (article.description?.length || 0);
    const score = contentLength + (hasImage * 100) + (index % 5 === 0 ? 200 : 0);
    
    if (score > 400) return 'highlight';
    if (score > 300) return 'analysis';
    return 'default';
  }, []);

  return (
    <div className="chaotic-news-container">
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
            onClick={onLoadMore}
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
  );
};

export default NewsGrid;