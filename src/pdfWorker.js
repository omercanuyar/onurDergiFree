import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs";

// Worker'ı ayarla
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;