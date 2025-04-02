
import Header from "./Components/Header";
import UrlShortener from "./Components/UrlShortner";
import FileUpload from "./Components/FileUpload";
import FileList from "./Components/FileList";
import Image from "next/image"
import ShortenForm from "./Components/ShortenForm";
import Shortener from "./Components/Shortner";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Header />
      <main className=" w-full flex flex-col items-center ">
        {/* Upload Section */}
        <div className="flex justify-between items-center w-full px-4 mt-4">
          {/* <UrlShortener /> */}
          <Shortener />
        </div>

        {/* File List Section (Centered on both axes) */}
        {/* <div className="flex justify-center items-center w-full  mt-4 mb-10">
          <FileList />
        </div> */}
      </main>
    </div>
  );
}
