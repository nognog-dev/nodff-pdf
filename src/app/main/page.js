'use client'
import * as React from "react";
import { Sidebar } from "../_components/New/Sidebar";
import { FileUploadZone } from "../_components/New/FileUploadZone";
import { Divider } from "../_components/New/Divider";

export default function Index() {
  const handleFileSelect = React.useCallback((files) => {
    console.log("Files selected:", files);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {/* Main Content */}
        <div className="flex flex-col flex-1 p-8">
          <div className="flex flex-col justify-center w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/187be75c3467b238b4dbc4fe69f83e468939982681ca63be54a2e4743f216914?apiKey=c102e886e5a8452988b294946007fcdb&"
              alt="Merge PDF icon"
              className="object-contain w-6 aspect-square"
            />
            <div className="flex flex-col justify-center mt-2.5 w-full">
              <h1 className="text-3xl font-bold text-sky-950">
                Merge PDF
              </h1>
              <p className="mt-1.5 text-lg text-zinc-600">
                Combine PDFs in the order you want with the easiest PDF merger
                available.
              </p>
            </div>
          </div>

          <Divider className="mt-8 mb-8" />

          <div className="flex flex-1">
            <FileUploadZone onFileSelect={handleFileSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
