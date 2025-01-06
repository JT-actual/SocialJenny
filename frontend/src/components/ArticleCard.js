import React from 'react';
import './ArticleCard.css';

function ArticleCard({ article, isSelected, onClick }) {
  return (
    <div 
      className={`article-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h3>{article.headline}</h3>
      <p className="article-meta">
        {new Date(article.date).toLocaleDateString()} | {article.source}
      </p>
      {isSelected && (
        <div className="article-content">
          <p>{article.content}</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Read Original
          </a>
        </div>
      )}
    </div>
  );
}

export default ArticleCard;
