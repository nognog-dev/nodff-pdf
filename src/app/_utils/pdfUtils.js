import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

export const pdfMergeNODFF = async (
  pdfFiles,
  setLoading,
  setPdfFiles,
  setDidSucced,
  setFileInfo
) => {
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
      saveAs(blob, "merged-nodff.pdf");
      setPdfFiles([]);
      toast.dismiss(toastId);
      toast.success("PDF merge successful!");
      setDidSucced(true);
      setFileInfo({
        name: "merged-nodff.pdf",
        size: blob.size,
        type: blob.type,
        file: blob
      });
    }, 2000);
  } catch (error) {
    setLoading(false);
    if (toastId) toast.dismiss(toastId);
    toast.error(`PDF merge failed: ${error.message}`);
    setDidSucced(false);
  }
};

export const compressPDF = async (
  file,
  quality,
  setLoading,
  setDidSucceed,
  setFileInfo,
  setPdfFiles
) => {
  let toastId = null;
  try {
    // Iniciar la carga y mostrar un tooltip de carga
    setLoading(true);
    toastId = toast.loading("Comprimiendo PDF...");

    // Crear un objeto FormData y añadir el archivo
    const formData = new FormData();
    formData.append("file", file);

    // Realizar la petición al servidor para comprimir el PDF
    const response = await fetch(
      `https://api-pdf-compress-nognog.koyeb.app/compress/${quality}`,
      {
        method: "POST",
        body: formData
      }
    );

    // Si la respuesta no es exitosa, lanzar un error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convertir la respuesta en un blob
    const blob = await response.blob();

    // Crear una URL para el blob
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace para descargar el archivo y hacer clic en él
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "compressed-nodff.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Detener la carga, ocultar el tooltip de carga y mostrar un tooltip de éxito
    setLoading(false);
    toast.dismiss(toastId);
    toast.success("¡Compresión de PDF exitosa!");
    setPdfFiles([]);
    setDidSucceed(true);
    setFileInfo({
      name: "compressed-nodff.pdf",
      size: blob.size,
      type: blob.type,
      file: blob
    });
  } catch (error) {
    // Si hay un error, detener la carga, ocultar el tooltip de carga y mostrar un tooltip de error
    setLoading(false);
    if (toastId) toast.dismiss(toastId);
    toast.error(`Falló la compresión de PDF: ${error.message}`);
    setDidSucceed(false);
  }
};
