import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import coverTibbiye20 from "../assets/png/coverTibbiye20.png";
import pdf from '../assets/journals/tibbiyeli20.pdf';
import "./CoverPlaceholder.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
    </div>
  );
});

Pages.displayName = 'Pages';

export default function CoverPlaceholder() {
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <div className="cover-placeholder">
      {open ? (
        <div className="modal-overlay" onClick={handleClose}>

          <button className="close-btn" onClick={handleClose}>&times;</button>

          <div onClick={(e) => e.stopPropagation()}>
            <HTMLFlipBook 
              width={600} 
              height={770}
              showCover={true}
              flippingTime={1000}
              usePortrait={false}
              startPage={1}
              startZIndex={1}
            >
              {[...Array(numPages).keys()].map((pNum) => (
                <Pages key={pNum} number={pNum + 1}>
                  <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pNum + 1} width={550} renderAnnotationLayer={false} renderTextLayer={false} />
                  </Document>
                </Pages>
              ))}
            </HTMLFlipBook>
          </div>

        </div>

      ) : (
        <div className="cover-frame" onClick={() => setOpen(true)}>
          <img src={coverTibbiye20} alt="Dergi Kapağı" style={{ width: "100%", height: "100%" }} />
        </div>
      )}
    </div>
  );
}