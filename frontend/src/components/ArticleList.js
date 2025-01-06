import React from 'react';
import ArticleCard from './ArticleCard';
import './ArticleList.css';

function ArticleList({ articles, selectedArticle, onArticleSelect, currentPage, onPageChange }) {
  return (
    <div className="article-list">
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isSelected={selectedArticle?.id === article.id}
            onClick={() => onArticleSelect(article)}
          />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArticleList;
