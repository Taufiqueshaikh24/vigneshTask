// // frontend: components/FilePreview.js
// import { useState, useEffect } from "react";

// function FilePreview({ fileId }) {
//   const [fileUrl, setFileUrl] = useState(null);

//   useEffect(() => {
//     async function fetchFile() {
//       const response = await fetch(`/api/v1/preview/${fileId}`);
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setFileUrl(url);
//     }

//     fetchFile();
//   }, [fileId]);

//   return fileUrl ? <img src={fileUrl} alt="File Preview" /> : <p>Loading...</p>;
// }

// export default FilePreview;





import { useState, useEffect } from "react";

function FilePreview({ fileId }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await fetch(`/api/v1/preview/${fileId}`);
        if (!response.ok) {
          throw new Error("Failed to load file");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFile();
  }, [fileId]);

  if (loading) {
    return <div className="loader">Loading...</div>; // Simple loading spinner
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="preview-container">
      {fileUrl && <img src={fileUrl} alt="File Preview" className="preview-image" />}
    </div>
  );
}

export default FilePreview;




