// // frontend: components/TextFilePreview.js
// import { useState, useEffect } from "react";

// function TextFilePreview({ fileId }) {
//   const [fileContent, setFileContent] = useState(null);

//   useEffect(() => {
//     async function fetchFile() {
//       const response = await fetch(`/api/v1/preview/${fileId}`);
//       const text = await response.text();
//       setFileContent(text);
//     }

//     fetchFile();
//   }, [fileId]);

//   return <pre>{fileContent}</pre>;
// }

// export default TextFilePreview;




// components/TextFilePreview.js
// "use client";
// import React, { useEffect, useState } from "react";

// const TextFilePreview = ({ fileId }) => {
//   const [fileContent, setFileContent] = useState("");

//   useEffect(() => {
//     const fetchFileContent = async () => {
//       const res = await fetch(`/api/v1/preview/${fileId}`);
//       const text = await res.text();
//       setFileContent(text);
//     };
//     fetchFileContent();
//   }, [fileId]);

//   return (
//     <div>
//       <h2>Text File Preview</h2>
//       <pre>{fileContent}</pre>
//     </div>
//   );
// };

// export default TextFilePreview;




"use client";  // This marks the component as a Client Component

import { useState, useEffect } from "react";

function FilePreview({ fileId }) {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    // Fetch file URL based on fileId
    const fetchFile = async () => {
      const response = await fetch(`/api/v1/files/${fileId}`);
      const data = await response.json();
      setFileUrl(data.fileUrl);
    };

    fetchFile();
  }, [fileId]);

  if (!fileUrl) return <div>Loading...</div>;

  return (
    <div>
      <img src={fileUrl} alt="File Preview" />
    </div>
  );
}

export default FilePreview;