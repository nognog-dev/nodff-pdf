import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFPreview({ file }) {
  return (
    <Document file={file}>
      <Page pageNumber={1} />
    </Document>
  );
}

export default PDFPreview;
