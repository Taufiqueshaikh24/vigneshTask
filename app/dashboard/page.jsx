// "use client";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Image from "next/image";

// export default function Dashboard() {
//   const [urls, setUrls] = useState([]);

//   useEffect(() => {
//     const fetchUrls = async () => {
//       try {
//         const res = await fetch("/api/v1/dashboard");
//         if (!res.ok) throw new Error("Failed to fetch URLs");

//         const data = await res.json();
//         setUrls(data);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };

//     fetchUrls();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-4">URL Shortener Dashboard</h2>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Original URL</th>
//               <th className="border p-2">Short URL</th>
//               <th className="border p-2">QR Code</th>
//               <th className="border p-2">Visits</th>
//             </tr>
//           </thead>
//           <tbody>
//             {urls.map((url) => (
//               <tr key={url.shortCode} className="border">
//                 <td className="border p-2 truncate max-w-xs">
//                   <a href={url.originalUrl} target="_blank" className="text-blue-500 hover:underline">
//                     {url.originalUrl}
//                   </a>
//                 </td>
//                 <td className="border p-2">
//                   <a href={url.shortUrl} target="_blank" className="text-green-500 hover:underline">
//                     {url.shortUrl}
//                   </a>
//                 </td>
//                 <td className="border p-2">
//                   <Image src={url.qrCode} alt="QR Code" width={50} height={50} />
//                 </td>
//                 <td className="border p-2 text-center">{url.visitCount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of items per page

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch(`/api/v1/dashboard?page=${currentPage}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch URLs");

        const data = await res.json();
        setUrls(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUrls();
  }, [currentPage]); // Re-fetch when page changes

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">URL Shortener Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Original URL</th>
              <th className="border p-2">Short URL</th>
              <th className="border p-2">QR Code</th>
              <th className="border p-2">Visits</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.shortCode} className="border">
                <td className="border p-2 truncate max-w-xs">
                  <a href={url.originalUrl} target="_blank" className="text-blue-500 hover:underline">
                    {url.originalUrl}
                  </a>
                </td>
                <td className="border p-2">
                  <a href={url.shortUrl} target="_blank" className="text-green-500 hover:underline">
                    {url.shortUrl}
                  </a>
                </td>
                <td className="border p-2">
                  <Image src={url.qrCode} alt="QR Code" width={50} height={50} />
                </td>
                <td className="border p-2 text-center">{url.visitCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
