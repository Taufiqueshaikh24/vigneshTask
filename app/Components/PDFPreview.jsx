// // frontend: components/PDFPreview.js
// import { useEffect, useRef } from "react";
// import { pdfjs } from "react-pdf";

// function PDFPreview({ fileId }) {
//   const canvasRef = useRef();

//   useEffect(() => {
//     async function fetchFile() {
//       const response = await fetch(`/api/v1/preview/${fileId}`);
//       const arrayBuffer = await response.arrayBuffer();
//       const pdf = await pdfjs.getDocument(arrayBuffer).promise;

//       // Render the first page of the PDF
//       const page = await pdf.getPage(1);
//       const viewport = page.getViewport({ scale: 1 });
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       canvas.height = viewport.height;
//       canvas.width = viewport.width;

//       page.render({
//         canvasContext: context,
//         viewport: viewport,
//       });
//     }

//     fetchFile();
//   }, [fileId]);

//   return <canvas ref={canvasRef} />;
// }

// export default PDFPreview;





// components/PDFPreview.js
import React from "react";

const PDFPreview = ({ fileId }) => {
  const fileUrl = `/api/v1/preview/${fileId}`;

  return (
    <div>
      <h2>PDF Preview</h2>
      <button onClick={() => window.open(fileUrl, "_blank")}>Open PDF in New Tab</button>
    </div>
  );
};

export default PDFPreview;
