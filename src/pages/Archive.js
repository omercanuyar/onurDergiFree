import React, { useState, useEffect } from 'react';
import './Archive.css';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import MobilePDFViewer from '../components/MobilePDFViewer';
import kapakTibbiye from "../assets/png/kapakTibbiye.png";
import kapakTibbiy2 from "../assets/png/coverTibbiyeSecond.png";
import coverTibbiye3 from "../assets/png/coverTibbiye3.png";
import coverTibbiye4 from "../assets/png/coverTibbiye4.png";
import coverTibbiye5 from "../assets/png/coverTibbiye5.png";
import coverTibbiye6 from "../assets/png/coverTibbiye6.png";
import coverTibbiye7 from "../assets/png/coverTibbiye7.png";
import coverTibbiye9 from "../assets/png/coverTibbiye9.png";
import coverTibbiye10 from "../assets/png/coverTibbiye10.png";
import coverTibbiye11 from "../assets/png/coverTibbiye11.png";
import coverTibbiye13 from "../assets/png/coverTibbiye13.png";
import coverTibbiye14 from "../assets/png/coverTibbiye14.png";
import coverTibbiye15 from "../assets/png/coverTibbiye15.png";
import coverTibbiye16 from "../assets/png/coverTibbiye16.png";
import coverTibbiye17 from "../assets/png/coverTibbiye17.png";
import coverTibbiye18 from "../assets/png/coverTibbiye18.png";
import coverTibbiye19 from "../assets/png/coverTibbiye19.png";
import coverTibbiye20 from "../assets/png/coverTibbiye20.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
    </div>
  );
});

Pages.displayName = 'Pages';

export default function Archive() {
    const [open, setOpen] = useState(false);
    const [selectedMagazine, setSelectedMagazine] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // 12 dergi, her birine sayı ve tarih bilgisi ekliyorum
    const magazines = [
        { id: 1, title: '', issue: 'Sayı 1', date: 'Mart 2017', cover: kapakTibbiye, pdf: require("../assets/journals/tibbiye.pdf") },
        { id: 2, title: '', issue: 'Sayı 2', date: 'Mayıs 2017', cover: kapakTibbiy2, pdf: require("../assets/journals/tibbiyeliSecond.pdf") },
        { id: 3, title: '', issue: 'Sayı 3', date: 'Eylül 2017', cover: coverTibbiye3, pdf: require("../assets/journals/tibbiyeli3.pdf") },
        { id: 4, title: '', issue: 'Sayı 4', date: 'Şubat 2018', cover: coverTibbiye4, pdf: require("../assets/journals/tibbiyeli4.pdf") },
        { id: 5, title: '', issue: 'Sayı 5', date: 'Mayıs 2018', cover: coverTibbiye5, pdf: require("../assets/journals/tibbiyeli5.pdf") },
        { id: 6, title: '', issue: 'Sayı 6', date: 'Kasım 2018', cover: coverTibbiye6, pdf: require("../assets/journals/tibbiyeli6.pdf") },
        { id: 7, title: '', issue: 'Sayı 7', date: 'Mart 2019', cover: coverTibbiye7, pdf: require("../assets/journals/tibbiyeli7.pdf") },
        { id: 8, title: '', issue: 'Sayı 9', date: 'Ocak 2020', cover: coverTibbiye9, pdf: require("../assets/journals/tibbiyeli9.pdf") },
        { id: 9, title: '', issue: 'Sayı 10', date: 'Mart 2020', cover: coverTibbiye10, pdf: require("../assets/journals/tibbiyeli10.pdf") },
        { id: 10, title: '', issue: 'Sayı 11', date: 'Eylül 2020', cover: coverTibbiye11, pdf: require("../assets/journals/tibbiyeli11.pdf") },
        { id: 11, title: '', issue: 'Sayı 13', date: 'Eylül 2021', cover: coverTibbiye13, pdf: require("../assets/journals/tibbiyeli13.pdf") },
        { id: 12, title: '', issue: 'Sayı 14', date: 'Mayıs 2022', cover: coverTibbiye14, pdf: require("../assets/journals/tibbiyeli14.pdf") },
        { id: 13, title: '', issue: 'Sayı 15', date: 'Ekim 2022', cover: coverTibbiye15, pdf: require("../assets/journals/tibbiyeli15.pdf") },
        { id: 14, title: '', issue: 'Sayı 16', date: 'Nisan 2023', cover: coverTibbiye16, pdf: require("../assets/journals/tibbiyeli16.pdf") },
        { id: 15, title: '', issue: 'Sayı 17', date: 'Ekim 2023', cover: coverTibbiye17, pdf: require("../assets/journals/tibbiyeli17.pdf") },
        { id: 16, title: '', issue: 'Sayı 18', date: 'Mayıs 2024', cover: coverTibbiye18, pdf: require("../assets/journals/tibbiyeli18.pdf") },
        { id: 17, title: '', issue: 'Sayı 19', date: 'Kasım 2024', cover: coverTibbiye19, pdf: require("../assets/journals/tibbiyeli19.pdf") },
        { id: 18, title: '', issue: 'Sayı 20', date: 'Mayıs 2025', cover: coverTibbiye20, pdf: require("../assets/journals/tibbiyeli20.pdf") },
    ];

    const handleMagazineClick = (magazine) => {
        setSelectedMagazine(magazine);
        setOpen(true);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
    };

    return (
        <div className="archive-container">           
            <div className="magazine-grid">
                {magazines.map((magazine) => (
                    <div key={magazine.id} className="magazine-item">
                        <div className="magazine-cover" onClick={() => handleMagazineClick(magazine)}>
                            {magazine.cover ? (
                                <img
                                    src={magazine.cover}
                                    alt={magazine.title}
                                />
                            ) : (
                                <div className="placeholder-cover">
                                    {magazine.title}
                                </div>
                            )}
                        </div>
                        <div className="magazine-info">
                            <div className="magazine-issue">{magazine.issue}</div>
                            <div className="magazine-date">{magazine.date}</div>
                        </div>
                    </div>
                ))}
            </div>

            {open && selectedMagazine && (
                isMobile ? (
                    <MobilePDFViewer pdfFile={selectedMagazine.pdf} onClose={handleClose} />
                ) : (
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
                                        <Document file={selectedMagazine.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                            <Page pageNumber={pNum + 1} width={550} renderAnnotationLayer={false} renderTextLayer={false} />
                                        </Document>
                                    </Pages>
                                ))}
                            </HTMLFlipBook>
                        </div>
                    </div>
                )
            )}
        </div>
    );
} 