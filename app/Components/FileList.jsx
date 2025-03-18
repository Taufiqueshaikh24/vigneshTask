// "use client";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Eye, Download, Trash2, Share2 } from "lucide-react"; // Icons

// export default function FileTable() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       const res = await fetch("/api/v1/files", {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to fetch files");

//       const data = await res.json();
//       setFiles(data.files);
//     } catch (error) {
//       toast.error("❌ Error loading files");
//     }
//   };

//   const handleDelete = async (fileId) => {
//     try {
//       const res = await fetch(`/api/v1/files/${fileId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to delete file");

//       toast.success("✅ File deleted successfully");
//       setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
//     } catch (error) {
//       toast.error("❌ Error deleting file");
//     }
//   };

//   const handleShare = async (fileId) => {
//     const shareLink = `${window.location.origin}/files/${fileId}`;
//     try {
//       await navigator.clipboard.writeText(shareLink);
//       toast.success("🔗 Link copied to clipboard!");
//     } catch (error) {
//       toast.error("❌ Failed to copy link");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-full  px-4">
//       <div className="w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700 text-left text-sm">
//               <th className="p-3">Filename</th>
//               <th className="p-3">Size</th>
//               <th className="p-3">Uploaded On</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {files.length > 0 ? (
//               files.map((file) => (
//                 <tr key={file._id} className="border-b hover:bg-gray-100">
//                   <td className="p-3">{file.filename}</td>
//                   <td className="p-3">{(file.length / 1024).toFixed(2)} KB</td>
//                   <td className="p-3">{new Date(file.uploadDate).toLocaleString()}</td>
//                   <td className="p-3 flex justify-center space-x-2">
//                     {/* View */}
//                     <a href={`/api/v1/preview/${file._id}`} target="_blank" rel="noopener noreferrer">
//                       <Button variant="ghost" size="icon">
//                         <Eye className="w-5 h-5 text-blue-600" />
//                       </Button>
//                     </a>

//                     {/* Download */}
//                     <a href={`/api/v1/files/${file._id}?download=true`} download>
//                       <Button variant="ghost" size="icon">
//                         <Download className="w-5 h-5 text-green-600" />
//                       </Button>
//                     </a>

//                     {/* Share */}
//                     <Button variant="ghost" size="icon" onClick={() => handleShare(file._id)}>
//                       <Share2 className="w-5 h-5 text-gray-600" />
//                     </Button>

//                     {/* Delete */}
//                     <Button variant="ghost" size="icon" onClick={() => handleDelete(file._id)}>
//                       <Trash2 className="w-5 h-5 text-red-600" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-5 text-center text-gray-500">
//                   No files uploaded yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2, Share2 } from "lucide-react"; // Icons

export default function FileTable() {
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);  // For previewing files in the same page

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/v1/files", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch files");

      const data = await res.json();
      setFiles(data.files);
    } catch (error) {
      toast.error("❌ Error loading files");
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const res = await fetch(`/api/v1/files/${fileId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete file");

      toast.success("✅ File deleted successfully");
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    } catch (error) {
      toast.error("❌ Error deleting file");
    }
  };

  const handleShare = async (fileId) => {
    const shareLink = `${window.location.origin}/files/${fileId}`;
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("🔗 Link copied to clipboard!");
    } catch (error) {
      toast.error("❌ Failed to copy link");
    }
  };

  // Handle file preview in the modal or inline
  const handlePreview = async (fileId) => {
    try {
      const res = await fetch(`/api/v1/preview/${fileId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch preview");

      const fileBlob = await res.blob();
      const fileUrl = URL.createObjectURL(fileBlob);
      setPreviewUrl(fileUrl);
    } catch (error) {
      toast.error("❌ Error fetching file preview");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full px-4">
        <div className="w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left text-sm">
                <th className="p-3">Filename</th>
                <th className="p-3">Size</th>
                <th className="p-3">Uploaded On</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file) => (
                  <tr key={file._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{file.filename}</td>
                    <td className="p-3">{(file.length / 1024).toFixed(2)} KB</td>
                    <td className="p-3">{new Date(file.uploadDate).toLocaleString()}</td>
                    <td className="p-3 flex justify-center space-x-2">
                      {/* View (Preview) */}
                      <Button variant="ghost" size="icon" onClick={() => handlePreview(file._id)}>
                        <Eye className="w-5 h-5 text-blue-600" />
                      </Button>

                      {/* Download */}
                      <a href={`/api/v1/files/${file._id}?download=true`} download>
                        <Button variant="ghost" size="icon">
                          <Download className="w-5 h-5 text-green-600" />
                        </Button>
                      </a>

                      {/* Share */}
                      <Button variant="ghost" size="icon" onClick={() => handleShare(file._id)}>
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </Button>

                      {/* Delete */}
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(file._id)}>
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-5 text-center text-gray-500">
                    No files uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {previewUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <button onClick={() => setPreviewUrl(null)} className="text-red-600">
              Close Preview
            </button>
            <div className="mt-4">
              {previewUrl.endsWith(".pdf") ? (
                <embed src={previewUrl} width="600" height="400" type="application/pdf" />
              ) : (
                <img src={previewUrl} alt="File Preview" className="max-w-full max-h-96" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
