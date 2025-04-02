"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; 

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch(`/api/v1/dashboard?page=${currentPage}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch URLs");

        const data = await res.json();
        setUrls(data.data); 
        console.log(data)
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUrls();
  }, [currentPage]); // Refetch when page changes

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Table Display */}
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Original URL</th>
            <th className="p-2 border">Short URL</th>
            <th className="p-2 border">Visits</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id} className="border">
              <td className="p-2">{url.originalUrl}</td>
              <td className="p-2">
                <a href={`/${url.shortCode}`} className="text-blue-600 underline">
                  {url.shortCode}
                </a>
              </td>
              <td className="p-2">{url.visits || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
