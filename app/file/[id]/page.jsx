// frontend: pages/file/[id].js
import { useEffect, useState } from "react";
import FilePreview from "@/components/FilePreview";  // For images
import PDFPreview from "@/components/PDFPreview";    // For PDFs
import TextFilePreview from "@/components/TextFilePreview"; // For text files

function FilePreviewPage({ fileId, fileType }) {
  return (
    <div>
      <h1>File Preview</h1>
      {fileType === "image" && <FilePreview fileId={fileId} />}
      {fileType === "pdf" && <PDFPreview fileId={fileId} />}
      {fileType === "text" && <TextFilePreview fileId={fileId} />}
    </div>
  );
}

// Fetch file metadata (e.g., type) based on the fileId
export async function getServerSideProps(context) {
  const { fileId } = context.params;

  // Fetch file metadata to determine its type (image, pdf, text, etc.)
  const res = await fetch(`/api/v1/metadata/${fileId}`);
  const fileMetadata = await res.json();
  const { fileType } = fileMetadata;  // fileType could be "image", "pdf", "text", etc.

  return {
    props: {
      fileId,
      fileType,
    },
  };
}

export default FilePreviewPage;
