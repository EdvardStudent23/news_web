import { Helmet } from 'react-helmet';
import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Pages.css';
import Footer from '../components/Footer';
import NewsGrid from '../components/Newsblock';
const key = process.env.REACT_APP_MY_GLOBAL_KEY;


export default function NewsPage() {
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
  const [politicalTopic, setPoliticalTopic] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const politicalTopics = [
    'general', 'elections', 'legislation', 'foreign_policy', 
    'government', 'leaders', 'diplomacy', 'parliament'
  ];


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
      const politicalQuery = "politics";
      const topicQuery = politicalTopic !== 'general' ? `${politicalTopic} ${politicalQuery}` : politicalQuery;
      const finalQuery = searchQuery 
        ? `${topicQuery} ${searchQuery}`
        : topicQuery;
      
      let apiUrl = `https://newsapi.org/v2/everything`;
      apiUrl += `?q=${encodeURIComponent(finalQuery)}` +
                `&from=${formatDate(dateRange.startDate)}` +
                `&to=${formatDate(dateRange.endDate)}` +
                `&sortBy=publishedAt` +
                `&page=${page}` +
                `&pageSize=20` +
                `&apiKey=${key}`;
      
      const res = await fetch(apiUrl);
      const data = await res.json();
      
      if (data.status === 'error') {
        console.error('API Error:', data.message);
        setHasMore(false);
        return;
      }
      const newArticles = (data.articles || [])
        .filter(article => !seenUrls.has(article.url))
        .filter(article => article.title && article.url)
        .filter(article => {
          const keywords = ['politic', 'govern', 'election', 'president', 'minister', 'parliament', 'democrat', 'republican', 'law', 'vote'];
          const content = (article.title + ' ' + (article.description || '')).toLowerCase();
          return keywords.some(keyword => content.includes(keyword));
        });

      if (newArticles.length === 0 && page === 1) {
        const newEndDate = new Date(dateRange.startDate);
        newEndDate.setDate(newEndDate.getDate() - 1);
        
        const newStartDate = new Date(newEndDate);
        newStartDate.setDate(newStartDate.getDate() - 14);
        
        setDateRange({
          startDate: newStartDate,
          endDate: newEndDate
        });
        setPage(1);
      } else {
        const newSeenUrls = new Set(seenUrls);
        newArticles.forEach(article => newSeenUrls.add(article.url));
        setSeenUrls(newSeenUrls);
        setArticles(prev => page === 1 ? newArticles : [...prev, ...newArticles]);
        setTotalResults(data.totalResults);
        setHasMore(newArticles.length > 0);
      }
    } catch (err) {
      console.error('Error loading political news:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, dateRange, seenUrls, loading, hasMore, politicalTopic, searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews, page, dateRange.startDate, dateRange.endDate, politicalTopic, searchQuery]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleTopicChange = (newTopic) => {
    setPoliticalTopic(newTopic);
    setPage(1);
    setArticles([]);
    setSeenUrls(new Set());
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setArticles([]);
    setSeenUrls(new Set());
  };

  return (
    <>
      <Helmet>
        <title>Political News Hub - {politicalTopic.charAt(0).toUpperCase() + politicalTopic.slice(1)}</title>
      </Helmet>
      <header>
        <Navbar 
          categories={politicalTopics} 
          activeCategory={politicalTopic}
          onCategoryChange={handleTopicChange}
          onSearch={handleSearch}
        />
      </header>
      
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
