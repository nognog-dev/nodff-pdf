import { Document, Page } from "react-pdf";

import styles from "./component.module.scss";

function PDFSucced({ file, beforeSizeFile }) {
  const handleDownload = () => {
    saveAs(file.file, `${file.name}`);
  };

  function formatFileSize(sizeInBytes) {
    let sizeInMB = sizeInBytes / (1024 * 1024);
    if (sizeInMB < 1024) {
      return sizeInMB.toFixed(2) + " MB";
    } else {
      let sizeInGB = sizeInMB / 1024;
      return sizeInGB.toFixed(2) + " GB";
    }
  }

  return (
    <div className={styles.pdfContainer}>
      <span className={styles.succedText}>Procces succeded</span>
      <div className={styles.viewContent}>
        <Document file={file.file}>
          <Page pageNumber={1} className={styles.canvasPdfView} />
        </Document>
        <div className={styles.infoPdf}>
          <div className={styles.rowContent}>
            <p>Title:</p>
            <span>{file.name}</span>
          </div>
          <div className={styles.rowContent}>
            <p>Size:</p>
            <div className={styles.sizesFiles}>
              <span className={beforeSizeFile && styles.newSizeFile}>
                {formatFileSize(file.size)}
              </span>
              {beforeSizeFile != 0 && (
                <span className={styles.beforeSize}>
                  {formatFileSize(beforeSizeFile)}
                </span>
              )}
            </div>
          </div>
          <div className={styles.rowContent}>
            <p>Format:</p>
            <span>{file.type === "application/pdf" ? "PDF" : "PDF"}</span>
          </div>
          <button className="text small" onClick={handleDownload}>
            Download <u>Again</u>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PDFSucced;
