import React from 'react';
import './SocialPostGenerator.css';

function SocialPostGenerator({ selectedArticle, generatedPosts, isLoading, onGenerate }) {
  return (
    <div className="social-post-generator">
      <div className="post-container linkedin">
        <h2>LinkedIn Post</h2>
        <div className="post-content">
          {isLoading ? (
            <div className="loading">Generating...</div>
          ) : (
            <div className="content">{generatedPosts.linkedin}</div>
          )}
        </div>
        <button 
          onClick={() => onGenerate('linkedin')}
          disabled={!selectedArticle || isLoading}
        >
          Generate LinkedIn Post
        </button>
      </div>

      <div className="post-container twitter">
        <h2>Twitter Post</h2>
        <div className="post-content">
          {isLoading ? (
            <div className="loading">Generating...</div>
          ) : (
            <div className="content">{generatedPosts.twitter}</div>
          )}
        </div>
        <button 
          onClick={() => onGenerate('twitter')}
          disabled={!selectedArticle || isLoading}
        >
          Generate Twitter Post
        </button>
      </div>
    </div>
  );
}

export default SocialPostGenerator;
