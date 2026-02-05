import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './ArticleManager.css';

export default function ArticleManager() {
  const { articles, addArticle, updateArticle, deleteArticle } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    coverImage: '',
    isPublished: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      author: '',
      coverImage: '',
      isPublished: false
    });
    setIsEditing(false);
    setEditingArticle(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingArticle) {
      updateArticle(editingArticle.id, formData);
    } else {
      addArticle(formData);
    }
    
    resetForm();
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      summary: article.summary,
      content: article.content,
      author: article.author,
      coverImage: article.coverImage || '',
      isPublished: article.isPublished
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      deleteArticle(id);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="article-manager">
      <div className="manager-header">
        <h2>Yazı Yönetimi</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="add-button"
            aria-label="Yeni Yazı Ekle"
          >
            + Yeni Yazı
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="article-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Başlık *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="Yazı başlığını girin"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Yazar</label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Yazar adı"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="summary">Özet *</label>
            <textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              required
              rows={3}
              placeholder="Yazının kısa özeti (liste görünümünde gösterilecek)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">İçerik *</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              rows={12}
              placeholder="Yazı içeriğini girin. Paragraflar için boş satır bırakın."
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">Kapak Resmi</label>
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {formData.coverImage && (
              <div className="image-preview">
                <img src={formData.coverImage} alt="Kapak önizleme" />
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                  className="remove-image"
                  aria-label="Resmi kaldır"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
              />
              Yayınla
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              {editingArticle ? 'Güncelle' : 'Kaydet'}
            </button>
            <button type="button" onClick={resetForm} className="cancel-button">
              İptal
            </button>
          </div>
        </form>
      )}

      <div className="articles-list">
        <h3>Mevcut Yazılar ({articles.length})</h3>
        {articles.length === 0 ? (
          <p className="no-items">Henüz yazı eklenmemiş.</p>
        ) : (
          <div className="articles-table-wrapper">
            <table className="articles-table">
              <thead>
                <tr>
                  <th>Başlık</th>
                  <th>Yazar</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id}>
                    <td className="title-cell">
                      {article.coverImage && (
                        <img 
                          src={article.coverImage} 
                          alt="" 
                          className="article-thumb"
                        />
                      )}
                      <span>{article.title}</span>
                    </td>
                    <td>{article.author || '-'}</td>
                    <td>{formatDate(article.createdAt)}</td>
                    <td>
                      <span className={`status-badge ${article.isPublished ? 'published' : 'draft'}`}>
                        {article.isPublished ? 'Yayında' : 'Taslak'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => handleEdit(article)}
                        className="edit-btn"
                        aria-label="Düzenle"
                      >
                        Düzenle
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id)}
                        className="delete-btn"
                        aria-label="Sil"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
