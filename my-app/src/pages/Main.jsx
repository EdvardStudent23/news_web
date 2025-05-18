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
  const [searchQuery, setSearchQuery] = useState('');

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

  const fetchNews = useCallback(async () => {
    if (!dateRange.startDate || !dateRange.endDate || loading || !hasMore) return;

    try {
      setLoading(true);
      const query = searchQuery || 'sports OR business OR crypto OR politics';
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
        `apiKey=${key}`
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
  }, [page, dateRange, seenUrls, loading, hasMore, searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews, page, dateRange.startDate, dateRange.endDate]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSearch = (term) => {
    const query = term.trim().split(/\s+/).join(' AND ');
    setArticles([]);
    setSeenUrls(new Set());
    setPage(1);
    setHasMore(true);
    setSearchQuery(query);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    setDateRange({ startDate, endDate });
  };

  return (
    <>
      <Helmet>
        <title>Main News</title>
      </Helmet>
      <header><Navbar onSearch={handleSearch} /></header>
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
