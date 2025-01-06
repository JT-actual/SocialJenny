import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
  const [feeds, setFeeds] = useState([]);
  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/feeds');
      const data = await response.json();
      setFeeds(data);
    } catch (error) {
      setError('Failed to fetch feeds');
    }
  };

  const handleAddFeed = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/feeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: newFeedUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to add feed');
      }

      await fetchFeeds();
      setNewFeedUrl('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFeed = async (feedId) => {
    try {
      await fetch(`http://localhost:5001/api/feeds/${feedId}`, {
        method: 'DELETE',
      });
      await fetchFeeds();
    } catch (error) {
      setError('Failed to delete feed');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>RSS Feed Management</h2>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>

      <div className="admin-content">
        <form onSubmit={handleAddFeed} className="add-feed-form">
          <input
            type="url"
            value={newFeedUrl}
            onChange={(e) => setNewFeedUrl(e.target.value)}
            placeholder="Enter RSS feed URL"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Feed'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="feeds-list">
          <h3>Current Feeds</h3>
          {feeds.map((feed) => (
            <div key={feed.id} className="feed-item">
              <span>{feed.url}</span>
              <button 
                onClick={() => handleDeleteFeed(feed.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
