import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './MagazineManager.css';

export default function MagazineManager() {
  const { magazines, addMagazine, updateMagazine, deleteMagazine } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editingMagazine, setEditingMagazine] = useState(null);
  const [formData, setFormData] = useState({
    issue: '',
    date: '',
    coverImage: '',
    pdfFile: '',
    pdfFileName: ''
  });

  const resetForm = () => {
    setFormData({
      issue: '',
      date: '',
      coverImage: '',
      pdfFile: '',
      pdfFileName: ''
    });
    setIsEditing(false);
    setEditingMagazine(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMagazine) {
      updateMagazine(editingMagazine.id, formData);
    } else {
      addMagazine(formData);
    }
    
    resetForm();
  };

  const handleEdit = (magazine) => {
    setEditingMagazine(magazine);
    setFormData({
      issue: magazine.issue,
      date: magazine.date,
      coverImage: magazine.coverImage || '',
      pdfFile: magazine.pdfFile || '',
      pdfFileName: magazine.pdfFileName || ''
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu dergiyi silmek istediğinizden emin misiniz?')) {
      deleteMagazine(id);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Kapak resmi 5MB\'dan küçük olmalıdır.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert('PDF dosyası 50MB\'dan küçük olmalıdır.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          pdfFile: reader.result,
          pdfFileName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="magazine-manager">
      <div className="manager-header">
        <h2>Dergi Arşivi Yönetimi</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="add-button"
            aria-label="Yeni Dergi Ekle"
          >
            + Yeni Dergi
          </button>
        )}
      </div>

      <div className="info-box">
        <strong>Not:</strong> Buradan eklenen dergiler dinamik olarak arşiv sayfasında görünecektir. 
        Mevcut dergiler (Sayı 1-20) statik olarak tanımlıdır ve bu panelden yönetilmez.
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="magazine-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="issue">Sayı *</label>
              <input
                type="text"
                id="issue"
                value={formData.issue}
                onChange={(e) => setFormData(prev => ({ ...prev, issue: e.target.value }))}
                required
                placeholder="Örn: Sayı 21"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Tarih *</label>
              <input
                type="text"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
                placeholder="Örn: Kasım 2025"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">Kapak Resmi *</label>
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverUpload}
              required={!editingMagazine}
            />
            <small>Maksimum 5MB, PNG veya JPG formatında</small>
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

          <div className="form-group">
            <label htmlFor="pdfFile">PDF Dosyası *</label>
            <input
              type="file"
              id="pdfFile"
              accept=".pdf"
              onChange={handlePdfUpload}
              required={!editingMagazine}
            />
            <small>Maksimum 50MB</small>
            {formData.pdfFileName && (
              <div className="file-info">
                <span className="file-icon">📄</span>
                <span className="file-name">{formData.pdfFileName}</span>
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, pdfFile: '', pdfFileName: '' }))}
                  className="remove-file"
                  aria-label="Dosyayı kaldır"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              {editingMagazine ? 'Güncelle' : 'Kaydet'}
            </button>
            <button type="button" onClick={resetForm} className="cancel-button">
              İptal
            </button>
          </div>
        </form>
      )}

      <div className="magazines-list">
        <h3>Eklenen Dergiler ({magazines.length})</h3>
        {magazines.length === 0 ? (
          <p className="no-items">Henüz ek dergi eklenmemiş.</p>
        ) : (
          <div className="magazines-grid">
            {magazines.map(magazine => (
              <div key={magazine.id} className="magazine-card">
                {magazine.coverImage && (
                  <img 
                    src={magazine.coverImage} 
                    alt={`${magazine.issue} kapağı`}
                    className="magazine-cover"
                  />
                )}
                <div className="magazine-info">
                  <span className="magazine-issue">{magazine.issue}</span>
                  <span className="magazine-date">{magazine.date}</span>
                  {magazine.pdfFileName && (
                    <span className="pdf-name">{magazine.pdfFileName}</span>
                  )}
                </div>
                <div className="magazine-actions">
                  <button 
                    onClick={() => handleEdit(magazine)}
                    className="edit-btn"
                    aria-label="Düzenle"
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={() => handleDelete(magazine.id)}
                    className="delete-btn"
                    aria-label="Sil"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
