import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import './Articles.css';

export default function Articles() {
  const { getPublishedArticles } = useData();
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const articles = getPublishedArticles();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  const renderContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  return (
    <div className="articles-container">
      <header className="articles-header">
        <h1>Yazılar</h1>
        <p>190 Tıbbiyeli Dergisi'nden seçme yazılar</p>
      </header>

      {articles.length === 0 ? (
        <div className="no-articles">
          <p>Henüz yayınlanmış yazı bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map(article => (
            <article 
              key={article.id} 
              className="article-card"
              onClick={() => handleArticleClick(article)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleArticleClick(article)}
              aria-label={`${article.title} yazısını oku`}
            >
              {article.coverImage && (
                <div className="article-image">
                  <img src={article.coverImage} alt="" />
                </div>
              )}
              <div className="article-content">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-summary">{article.summary}</p>
                <div className="article-meta">
                  {article.author && (
                    <span className="article-author">{article.author}</span>
                  )}
                  <time className="article-date" dateTime={article.createdAt}>
                    {formatDate(article.createdAt)}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedArticle && (
        <div 
          className="article-modal-overlay" 
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          <div className="article-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={handleClose}
              aria-label="Kapat"
            >
              ×
            </button>
            
            <article className="article-full">
              {selectedArticle.coverImage && (
                <div className="article-full-image">
                  <img src={selectedArticle.coverImage} alt="" />
                </div>
              )}
              
              <header className="article-full-header">
                <h1 id="article-modal-title">{selectedArticle.title}</h1>
                <div className="article-full-meta">
                  {selectedArticle.author && (
                    <span className="author">{selectedArticle.author}</span>
                  )}
                  <time dateTime={selectedArticle.createdAt}>
                    {formatDate(selectedArticle.createdAt)}
                  </time>
                </div>
              </header>
              
              <div className="article-full-content">
                {renderContent(selectedArticle.content)}
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
