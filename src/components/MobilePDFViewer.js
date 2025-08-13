import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './MobilePDFViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export default function MobilePDFViewer({ pdfFile, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToFirstPage = () => {
    setPageNumber(1);
  };

  const goToLastPage = () => {
    setPageNumber(numPages);
  };

  return (
    <div className="mobile-pdf-overlay" onClick={onClose}>
      <div className="mobile-pdf-container" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-pdf-header">
          <button className="mobile-close-btn" onClick={onClose}>✕</button>
          <div className="mobile-page-info">
            Sayfa {pageNumber} / {numPages || '...'}
          </div>
        </div>

        <div className="mobile-pdf-content">
          {loading && (
            <div className="mobile-loading">
              <div className="loading-spinner"></div>
              <p>PDF yükleniyor...</p>
            </div>
          )}
          
          <Document 
            file={pdfFile} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error('PDF yükleme hatası:', error);
              setLoading(false);
            }}
          >
            <Page 
              pageNumber={pageNumber} 
              width={window.innerWidth - 40}
              renderAnnotationLayer={false} 
              renderTextLayer={false}
            />
          </Document>
        </div>

        <div className="mobile-pdf-navigation">
          <button 
            className="nav-btn" 
            onClick={goToFirstPage}
            disabled={pageNumber <= 1}
          >
            ⏮
          </button>
          <button 
            className="nav-btn" 
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
          >
            ◀
          </button>
          <span className="page-indicator">
            {pageNumber} / {numPages || '...'}
          </span>
          <button 
            className="nav-btn" 
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            ▶
          </button>
          <button 
            className="nav-btn" 
            onClick={goToLastPage}
            disabled={pageNumber >= numPages}
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
