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
import React, { useEffect, useState } from "react";

const TextFilePreview = ({ fileId }) => {
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const fetchFileContent = async () => {
      const res = await fetch(`/api/v1/preview/${fileId}`);
      const text = await res.text();
      setFileContent(text);
    };
    fetchFileContent();
  }, [fileId]);

  return (
    <div>
      <h2>Text File Preview</h2>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default TextFilePreview;
