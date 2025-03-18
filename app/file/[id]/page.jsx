// // frontend: pages/file/[id].js
// "use client";
// import { useEffect, useState } from "react";
// import FilePreview from "@/components/FilePreview";  // For images
// import PDFPreview from "@/components/PDFPreview";    // For PDFs
// import TextFilePreview from "@/components/TextFilePreview"; // For text files

// function FilePreviewPage({ fileId, fileType }) {
//   return (
//     <div>
//       <h1>File Preview</h1>
//       {fileType === "image" && <FilePreview fileId={fileId} />}
//       {fileType === "pdf" && <PDFPreview fileId={fileId} />}
//       {fileType === "text" && <TextFilePreview fileId={fileId} />}
//     </div>
//   );
// }

// // Fetch file metadata (e.g., type) based on the fileId
// export async function getServerSideProps(context) {
//   const { fileId } = context.params;

//   // Fetch file metadata to determine its type (image, pdf, text, etc.)
//   const res = await fetch(`/api/v1/metadata/${fileId}`);
//   const fileMetadata = await res.json();
//   const { fileType } = fileMetadata;  // fileType could be "image", "pdf", "text", etc.

//   return {
//     props: {
//       fileId,
//       fileType,
//     },
//   };
// }

// export default FilePreviewPage;


"use client"
// app/file/[id]/page.js
import { notFound } from 'next/navigation';  // For handling 404 pages

import FilePreview from '../../Components/FilePreview';  // For images
import PDFPreview from '../../Components/PDFPreview';    // For PDFs
import TextFilePreview from '../../Components/TextFilePreview'; // For text files

// Server Component to handle the file preview page
export default async function FilePreviewPage({ params }) {
  const { id } = params;

  // Fetch file metadata to determine its type
  const res = await fetch(`/api/v1/metadata/${id}`);
  
  if (!res.ok) {
    notFound();  // Redirect to a 404 page if the file metadata isn't found
  }

  const fileMetadata = await res.json();
  const { fileType } = fileMetadata;  // fileType could be "image", "pdf", "text", etc.

  return (
    <div>
      <h1>File Preview</h1>
      {fileType === 'image' && <FilePreview fileId={id} />}
      {fileType === 'pdf' && <PDFPreview fileId={id} />}
      {fileType === 'text' && <TextFilePreview fileId={id} />}
    </div>
  );
}
