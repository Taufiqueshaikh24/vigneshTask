"use client";
import { useState } from "react";
import { toast } from "sonner"; // Import Sonner for toast notifications
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/v1/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortUrl);
        setQrCode(data.qrCode);
        toast.success("URL shortened successfully!");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-center">Shorten Your URL</h2>

      <Input
        type="text"
        placeholder="Enter your URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={handleShorten} disabled={loading} className="w-full">
        {loading ? "Shortening..." : "Shorten URL"}
      </Button>

      {shortUrl && (
        <div className="text-center mt-4 space-y-3">
          <p className="text-sm text-gray-600">Your short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-semibold"
          >
            {shortUrl}
          </a>

          {qrCode && (
            <div className="flex justify-center mt-2">
              <Image src={qrCode} alt="QR Code" width={150} height={150} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
