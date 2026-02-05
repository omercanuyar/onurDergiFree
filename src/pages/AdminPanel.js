import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ArticleManager from '../components/admin/ArticleManager';
import MagazineManager from '../components/admin/MagazineManager';
import './AdminPanel.css';

export default function AdminPanel() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('articles');

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner" aria-label="Yükleniyor"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/giris-190-ozel" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Yönetim Paneli</h1>
        <button 
          onClick={handleLogout} 
          className="logout-button"
          aria-label="Çıkış Yap"
        >
          Çıkış Yap
        </button>
      </div>

      <nav className="admin-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'articles'}
          className={`admin-tab ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          Yazılar
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'magazines'}
          className={`admin-tab ${activeTab === 'magazines' ? 'active' : ''}`}
          onClick={() => setActiveTab('magazines')}
        >
          Dergi Arşivi
        </button>
      </nav>

      <main className="admin-content" role="tabpanel">
        {activeTab === 'articles' && <ArticleManager />}
        {activeTab === 'magazines' && <MagazineManager />}
      </main>
    </div>
  );
}
