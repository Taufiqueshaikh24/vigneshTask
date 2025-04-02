"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleShorten = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    const res = await fetch("/api/v1/shorten", {
      method: "POST",
      body: JSON.stringify({ originalUrl: url }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
      setQrCode(data.qrCode);
      toast.success("Short URL created!");
    } else {
      toast.error(data.message);
    }
  };


  console.log(shortUrl  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <Input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button className="mt-2 w-full" onClick={handleShorten}>
        Shorten URL
      </Button>

      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="font-semibold">Short URL:</p>
          <a href={shortUrl} className="text-blue-500" target="_blank">
            {shortUrl}
          </a>
        </div>
      )}

      {qrCode && (
        <div className="mt-4 text-center">
          <p className="font-semibold">QR Code:</p>
          <img src={qrCode} alt="QR Code" className="mx-auto" />
        </div>
      )}
    </div>
  );
}
