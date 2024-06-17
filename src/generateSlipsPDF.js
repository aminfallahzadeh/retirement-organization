// library imports
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export const createSlipsPDF = async () => {
  const url = "./pdfs/slip.pdf";

  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, "فیش حقوقی.pdf");
};
