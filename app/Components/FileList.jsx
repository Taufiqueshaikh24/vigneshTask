"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2, Share } from "lucide-react"; // Icons

export default function FileTable() {
  const [files, setFiles] = useState([]);

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

  return (
    <div className="flex justify-center w-full h-[500px]">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
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
                    {/* View */}
                    <a href={`/api/v1/files/${file._id}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </Button>
                    </a>

                    {/* Download */}
                    <a href={`/api/v1/files/${file._id}?download=true`} download>
                      <Button variant="ghost" size="icon">
                        <Download className="w-5 h-5 text-green-600" />
                      </Button>
                    </a>

                    {/* Share */}
                    <Button variant="ghost" size="icon" onClick={() => handleShare(file._id)}>
                      <Share className="w-5 h-5 text-gray-600" />
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
  );
}
