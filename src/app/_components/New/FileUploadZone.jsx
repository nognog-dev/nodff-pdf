'use client'
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";
import { addFiles, removeFile } from "@/app/_store/fileSlice";

export function FileUploadZone({ onFileSelect }) {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.uploadedFiles);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handles file selection from input
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    dispatch(addFiles(selectedFiles));
  };

  // Handles drag-and-drop file selection
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    dispatch(addFiles(droppedFiles));
  };

  return (
    <div
      className={`flex flex-col gap-4 justify-center items-center p-8 
        bg-sky-50 border-2 border-dashed rounded-lg transition-all 
        ${isDragging ? "border-sky-300" : "border-sky-950"} 
        h-full w-full`}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Hidden file input using useRef */}
      <input
        type="file"
        multiple
        onChange={handleFileSelect}
        ref={fileInputRef}
        className="hidden"
      />

      <img
        src="https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/1822e28cd11d4c7d34fa57e1228bd49b4fc54b2c368c35e62751b3e428534609?apiKey=c102e886e5a8452988b294946007fcdb&"
        alt="Upload icon"
        className="w-12 h-12"
      />
      <p className="text-xl font-bold text-sky-950">Merge PDF's without restrictions</p>
      <p className="text-sm text-zinc-600 text-center">
        Drag and drop PDFs to merge them into one file with our PDF combiner.
      </p>

      {/* Main upload button */}
      <div className="flex flex-col gap-2 justify-center">
      <Button
        variant="solid"
        className="w-[300px] h-[50px]"
        onClick={() => fileInputRef.current.click()}
      >
        Upload Your Files Here...
      </Button>


        {/* Secondary buttons */}
        <div className="flex justify-center gap-2 w-[300px]">
          <Button
            variant="solid"
            icon="https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/efa12a76dc5e45e04cbbffdba7b70639225c68262490806f62311f0f111c9a20?apiKey=c102e886e5a8452988b294946007fcdb&"
            aria-label="Upload from Dropbox"
            className="flex-1 h-[50px]"
          />
          <Button
            variant="solid"
            icon="https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/23353e7246e54e589cf1c822d8fa8c748fbeafcc65922b99a12ee8c5dcadd38a?apiKey=c102e886e5a8452988b294946007fcdb&"
            aria-label="Upload from Google Drive"
            className="flex-1 h-[50px]"
          />
          <Button
            variant="solid"
            icon="https://cdn.builder.io/api/v1/image/assets/c102e886e5a8452988b294946007fcdb/8805211047c3a60e5425891d7f2c11308a7608492e09ab92acb90400ed807b18?apiKey=c102e886e5a8452988b294946007fcdb&"
            aria-label="Upload from Computer"
            className="flex-1 h-[50px]"
          />
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 w-[300px] text-left">
          <h3 className="text-sky-950 font-semibold">Uploaded Files:</h3>
          <ul className="mt-2 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center text-sm text-zinc-700 border-b py-1">
                📄 {file.name} ({(file.size / 1024).toFixed(2)} KB)
                <button
                  onClick={() => dispatch(removeFile(file.name))}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
