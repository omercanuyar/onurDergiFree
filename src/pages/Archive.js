import React, { useState, useEffect } from 'react';
import './Archive.css';
import { useData } from '../context/DataContext';
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
import coverTibbiye8 from "../assets/png/coverTibbiye8.png";
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
import coverTibbiye21 from "../assets/png/coverTibbiye21.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const FlipPage = React.forwardRef(({ pageNumber, pdfDoc }, ref) => {
  return (
    <div className="page" ref={ref}>
      <Page pageNumber={pageNumber} pdf={pdfDoc} width={550} renderAnnotationLayer={false} renderTextLayer={false} />
    </div>
  );
});

FlipPage.displayName = 'FlipPage';

export default function Archive() {
    const { magazines: adminMagazines } = useData();
    const [open, setOpen] = useState(false);
    const [selectedMagazine, setSelectedMagazine] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    function onDocumentLoadSuccess(pdfObj) {
        setNumPages(pdfObj.numPages);
        setPdf(pdfObj);
    }

    // Statik dergiler
    const staticMagazines = [
        { id: 1, title: '', issue: 'Sayı 1', date: 'Mart 2017', cover: kapakTibbiye, pdf: process.env.PUBLIC_URL + "/journals/tibbiye.pdf" },
        { id: 2, title: '', issue: 'Sayı 2', date: 'Mayıs 2017', cover: kapakTibbiy2, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeliSecond.pdf" },
        { id: 3, title: '', issue: 'Sayı 3', date: 'Eylül 2017', cover: coverTibbiye3, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli3.pdf" },
        { id: 4, title: '', issue: 'Sayı 4', date: 'Şubat 2018', cover: coverTibbiye4, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli4.pdf" },
        { id: 5, title: '', issue: 'Sayı 5', date: 'Mayıs 2018', cover: coverTibbiye5, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli5.pdf" },
        { id: 6, title: '', issue: 'Sayı 6', date: 'Kasım 2018', cover: coverTibbiye6, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli6.pdf" },
        { id: 7, title: '', issue: 'Sayı 7', date: 'Mart 2019', cover: coverTibbiye7, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli7.pdf" },
        { id: 8, title: '', issue: 'Sayı 8', date: 'Ekim 2019', cover: coverTibbiye8, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli8.pdf" },
        { id: 9, title: '', issue: 'Sayı 9', date: 'Ocak 2020', cover: coverTibbiye9, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli9.pdf" },
        { id: 10, title: '', issue: 'Sayı 10', date: 'Mart 2020', cover: coverTibbiye10, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli10.pdf" },
        { id: 11, title: '', issue: 'Sayı 11', date: 'Eylül 2020', cover: coverTibbiye11, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli11.pdf" },
        { id: 12, title: '', issue: 'Sayı 13', date: 'Eylül 2021', cover: coverTibbiye13, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli13.pdf" },
        { id: 13, title: '', issue: 'Sayı 14', date: 'Mayıs 2022', cover: coverTibbiye14, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli14.pdf" },
        { id: 14, title: '', issue: 'Sayı 15', date: 'Ekim 2022', cover: coverTibbiye15, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli15.pdf" },
        { id: 15, title: '', issue: 'Sayı 16', date: 'Nisan 2023', cover: coverTibbiye16, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli16.pdf" },
        { id: 16, title: '', issue: 'Sayı 17', date: 'Ekim 2023', cover: coverTibbiye17, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli17.pdf" },
        { id: 17, title: '', issue: 'Sayı 18', date: 'Mayıs 2024', cover: coverTibbiye18, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli18.pdf" },
        { id: 18, title: '', issue: 'Sayı 19', date: 'Kasım 2024', cover: coverTibbiye19, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli19.pdf" },
        { id: 19, title: '', issue: 'Sayı 20', date: 'Mayıs 2025', cover: coverTibbiye20, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli20.pdf" },
        { id: 20, title: '', issue: 'Sayı 21', date: 'Aralık 2025', cover: coverTibbiye21, pdf: process.env.PUBLIC_URL + "/journals/tibbiyeli21.pdf" },
    ];

    // Admin panelinden eklenen dergileri statik dergilerle birleştir
    const adminMagazinesList = adminMagazines.map((mag, index) => ({
        id: `admin-${mag.id}`,
        title: mag.title || '',
        issue: mag.issue,
        date: mag.date,
        cover: mag.coverImage,
        pdf: mag.pdfFile,
        isAdminAdded: true
    }));

    const allMagazines = [...staticMagazines, ...adminMagazinesList];

    const handleMagazineClick = (magazine) => {
        setSelectedMagazine(magazine);
        setOpen(true);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setOpen(false);
        setPdf(null);
        setNumPages(null);
    };

    return (
        <div className="archive-container">           
            <div className="magazine-grid">
                {allMagazines.map((magazine) => (
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
                            <Document file={selectedMagazine.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                {pdf && numPages && (
                                    <HTMLFlipBook
                                        width={520}
                                        height={670}
                                        showCover={true}
                                        flippingTime={1000}
                                        usePortrait={false}
                                        startPage={1}
                                        startZIndex={1}
                                    >
                                        {[...Array(numPages).keys()].map((pNum) => (
                                            <FlipPage key={pNum} pageNumber={pNum + 1} pdfDoc={pdf} />
                                        ))}
                                    </HTMLFlipBook>
                                )}
                            </Document>
                        </div>
                    </div>
                )
            )}
        </div>
    );
} 