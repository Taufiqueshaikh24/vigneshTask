"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!originalUrl) {
      toast.error("Enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(`${window.location.origin}/${data.shortUrl}`);
        setQrCode(data.qrCode);
        toast.success("URL shortened successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md">
      <Input
        type="url"
        placeholder="Enter URL..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="w-full border-gray-300"
      />
      <Button onClick={handleShorten} className="w-full" disabled={loading}>
        {loading ? "Shortening..." : "Shorten URL"}
      </Button>

      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {shortUrl}
          </a>
          <p className="text-lg font-semibold mt-2">QR Code:</p>
          <img src={qrCode} alt="QR Code" className="mx-auto w-32 h-32" />
        </div>
      )}
    </div>
  );
}
