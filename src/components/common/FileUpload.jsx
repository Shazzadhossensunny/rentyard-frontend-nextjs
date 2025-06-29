"use client";

import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FileUpload({
  onFileSelect,
  acceptedTypes = ".pdf",
  maxSize = 10,
  currentFile = null,
  className = "",
  multiple = false,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    setError("");

    // Check file type
    if (
      acceptedTypes &&
      !acceptedTypes
        .split(",")
        .some((type) =>
          file.name.toLowerCase().endsWith(type.trim().toLowerCase())
        )
    ) {
      setError(`Only ${acceptedTypes} files are allowed`);
      return;
    }

    // Check file size (in MB)
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "rentyard-file-upload transition-all duration-200",
          isDragOver && "border-primary bg-primary/5",
          error && "border-error",
          currentFile && "border-green-500 bg-green-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileSelection(e.target.files[0]);
            }
          }}
          className="hidden"
        />

        {currentFile ? (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <File className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium text-text-primary">
                  {currentFile.name}
                </p>
                <p className="text-sm text-text-secondary">
                  {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-error hover:bg-error/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-3 px-4">
            <Upload className="w-6 h-6 text-[#272B35]" />
            <div className="text-center">
              <p className="text-sm text-text-secondary mt-1">
                ({acceptedTypes} only)
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
