import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

export const pdfMergeNODFF = async (pdfFiles, setLoading, setPdfFiles) => {
  let toastId = null;
  try {
    setLoading(true);
    toastId = toast.loading("Merging PDFs...");
    const mergedPdf = await PDFDocument.create();
    for (const file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      for (const page of pages) {
        mergedPdf.addPage(page);
      }
    }
    const mergedPdfFile = await mergedPdf.save();
    setTimeout(async () => {
      setLoading(false);
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      saveAs(blob, "merged.pdf");
      setPdfFiles([]);
      toast.dismiss(toastId);
      toast.success("PDF merge successful!");
    }, 2000);
  } catch (error) {
    setLoading(false);
    if (toastId) toast.dismiss(toastId);
    toast.error(`PDF merge failed: ${error.message}`);
  }
};

// async function compressPDF(file, quality) {
//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch(`https://api-pdf-compress-nognog.koyeb.app/compress/${quality}`, {
//     method: "POST",
//     body: formData
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const blob = await response.blob();
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "compressed.pdf");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }
