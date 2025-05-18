import { Helmet } from 'react-helmet';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Pages.css';
import Footer from '../components/Footer';
import NewsGrid from '../components/Newsblock';

const key = process.env.REACT_APP_MY_GLOBAL_KEY;

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

  const formatPublishedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isBusinessArticle = (article) => {
    if (!article) return false;
    
    const businessKeywords = [
      'business', 'economy', 'market', 'stock', 'finance',
      'investment', 'trade', 'commerce', 'company', 'corporation',
      'bank', 'financial', 'economic', 'dollar', 'euro',
      'currency', 'exchange', 'wall street', 'nasdaq', 's&p',
      'merger', 'acquisition', 'CEO', 'CFO', 'startup',
      'venture', 'capital', 'IPO', 'revenue', 'profit'
    ];
    
    const title = article.title?.toLowerCase() || '';
    const description = article.description?.toLowerCase() || '';
    const content = article.content?.toLowerCase() || '';
    
    return businessKeywords.some(keyword => 
      title.includes(keyword) || 
      description.includes(keyword) || 
      content.includes(keyword)
    );
  };

  const fetchNews = useCallback(async () => {
    if (!dateRange.startDate || !dateRange.endDate || loading || !hasMore) return;
    
    try {
      setLoading(true);
      const sources = 'bloomberg,financial-post,the-wall-street-journal,cnbc,fortune,business-insider,reuters';
      
      const res = await fetch(
        `https://newsapi.org/v2/everything?` +
        `q=business&` +
        `sources=${sources}&` +
        `from=${formatDate(dateRange.startDate)}&` +
        `to=${formatDate(dateRange.endDate)}&` +
        `sortBy=publishedAt&` +
        `page=${page}&` +
        `pageSize=50&` +
        `apiKey=${key}`
      );
      
      const data = await res.json();
      
      if (data.status === 'error') {
        console.error('API Error:', data.message);
        setHasMore(false);
        return;
      }

      const newArticles = (data.articles || [])
        .filter(article => !seenUrls.has(article.url))
        .filter(isBusinessArticle);

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

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Helmet>
        <title>Business News</title>
      </Helmet>
      <header><Navbar /></header>
      <main className="main-content">
        <NewsGrid 
          articles={articles}
          loading={loading}
          hasMore={hasMore}
          totalResults={totalResults}
          onLoadMore={loadMore}
          formatPublishedDate={formatPublishedDate}
        />
      </main>
      <Footer />
    </>
  );
}
