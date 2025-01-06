import React, { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import SocialPostGenerator from '../components/SocialPostGenerator';
import './Home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [generatedPosts, setGeneratedPosts] = useState({
    linkedin: '',
    twitter: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page) => {
    try {
      const response = await fetch(`http://localhost:5001/api/articles?page=${page}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
    setGeneratedPosts({ linkedin: '', twitter: '' });
  };

  const handleGenerate = async (platform) => {
    if (!selectedArticle) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          articleId: selectedArticle.id,
          platform: platform
        }),
      });
      const data = await response.json();
      setGeneratedPosts(prev => ({
        ...prev,
        [platform]: data[platform]
      }));
    } catch (error) {
      console.error('Error generating posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <main className="content">
        <ArticleList 
          articles={articles}
          selectedArticle={selectedArticle}
          onArticleSelect={handleArticleSelect}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <SocialPostGenerator 
          selectedArticle={selectedArticle}
          generatedPosts={generatedPosts}
          isLoading={isLoading}
          onGenerate={handleGenerate}
        />
      </main>
    </div>
  );
}

export default Home;
