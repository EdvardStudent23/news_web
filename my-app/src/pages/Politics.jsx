import { Helmet } from 'react-helmet';
import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Pages.css';
import Footer from '../components/Footer';

export default function Politics() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?category=general&country=us&page=${page}&pageSize=12&apiKey=17127349ad304326915fa7bd8837244d`
        );
        const data = await res.json();
        
        const newArticles = data.articles.filter(newArticle => 
          !articles.some(existingArticle => existingArticle.url === newArticle.url)
        );
        
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

  // Функція для визначення типу новини
  const getArticleType = (article) => {
    const content = (article.title + ' ' + (article.description || '')).toLowerCase();
    if (content.includes('election')) return 'election';
    if (content.includes('government') || content.includes('president')) return 'government';
    if (content.includes('policy') || content.includes('law') || content.includes('bill')) return 'policy';
    return 'politics';
  };

  // Фільтрація політичних новин
  const politicsArticles = articles.filter(article => 
    article.title?.toLowerCase().includes('politic') || 
    article.description?.toLowerCase().includes('politic') ||
    /election|government|president|congress|senate|minister|diplomacy|foreign policy|law|bill|vote/i.test(
      (article.title || '') + (article.description || '')
  ));

  return (
    <>
      <Helmet>
        <title>Political News</title>
      </Helmet>
      <header><Navbar /></header>
      
      <main className="main-content" ref={mainContentRef}>
        <div className="news-container">
          <h1 className="page-title">Latest Political News</h1>
          
          <div className="masonry-grid">
            {politicsArticles.map((article, index) => (
              <ArticleCard 
                key={`${article.url}-${index}`}
                article={article}
                type={getArticleType(article)}
              />
            ))}
          </div>

          {politicsArticles.length < totalResults && (
            <div className="load-more-container">
              <button 
                onClick={() => setPage(prev => prev + 1)} 
                disabled={loading}
                className="load-more-btn"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

// Окремий компонент для картки новини
function ArticleCard({ article, type }) {
  const cardRef = useRef(null);
  const [hasImage, setHasImage] = useState(!!article.urlToImage);

  return (
    <div 
      ref={cardRef}
      className={`news-card ${type}`}
      style={{ '--rows': calculateRowSpan(article) }}
    >
      {hasImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title} 
          className="news-image"
          onError={() => setHasImage(false)}
        />
      )}
      <div className="news-content">
        <span className="news-label">{type.toUpperCase()}</span>
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
  );
}

// Функція для розрахунку висоти картки
function calculateRowSpan(article) {
  const titleLength = article.title?.length || 0;
  const descLength = article.description?.length || 0;
  const hasImage = !!article.urlToImage;
  
  if (descLength > 200) return hasImage ? 6 : 5;
  if (descLength > 100) return hasImage ? 5 : 4;
  if (titleLength > 80) return hasImage ? 4 : 3;
  return hasImage ? 3 : 2;
}