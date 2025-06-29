"use client";

import { useState, useRef } from "react";
import { Upload, X, Play } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const VideoUploadBox = ({
  title,
  subtitle,
  video,
  onVideoSelect,
  onVideoRemove,
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    setError("");

    // Validate file type
    const validTypes = ["video/mp4", "video/mov", "video/quicktime"];
    if (!validTypes.includes(file.type)) {
      setError("Only MP4 and MOV files are allowed");
      return;
    }

    // Validate file size (50MB max for videos)
    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    onVideoSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeVideo = (e) => {
    e.stopPropagation();
    onVideoRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer aspect-video",
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300",
          error ? "border-red-500" : "",
          video
            ? "border-solid border-gray-200 bg-gray-50"
            : "hover:border-gray-400"
        )}
        onClick={!video ? openFileDialog : undefined}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {video ? (
          <>
            <div className="flex flex-col items-center justify-center h-full p-4">
              <Play className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-sm font-medium text-gray-700 text-center">
                {video.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {(video.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={removeVideo}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".mp4,.mov"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

const PropertyVideoSection = ({ propertyInfo, setPropertyInfo }) => {
  const [videoUrl, setVideoUrl] = useState(
    propertyInfo.propertyVideos?.videoUrl || ""
  );

  const handleVideoSelect = (type, file) => {
    setPropertyInfo((prev) => ({
      ...prev,
      propertyVideos: {
        ...prev.propertyVideos,
        [type]: file,
      },
    }));
  };

  const handleVideoRemove = (type) => {
    setPropertyInfo((prev) => ({
      ...prev,
      propertyVideos: {
        ...prev.propertyVideos,
        [type]: null,
      },
    }));
  };

  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
    setPropertyInfo((prev) => ({
      ...prev,
      propertyVideos: {
        ...prev.propertyVideos,
        videoUrl: url,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Video Upload Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Property Video (optional)
          </Label>
          <VideoUploadBox
            title="Upload video"
            subtitle="(MP4, MOV only)"
            video={propertyInfo.propertyVideos?.propertyVideo}
            onVideoSelect={(file) => handleVideoSelect("propertyVideo", file)}
            onVideoRemove={() => handleVideoRemove("propertyVideo")}
          />
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">
            Property virtual tour (optional)
          </Label>
          <VideoUploadBox
            title="Upload video"
            subtitle="(MP4, MOV only)"
            video={propertyInfo.propertyVideos?.virtualTour}
            onVideoSelect={(file) => handleVideoSelect("virtualTour", file)}
            onVideoRemove={() => handleVideoRemove("virtualTour")}
          />
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">
            Property aerial video (optional)
          </Label>
          <VideoUploadBox
            title="Upload video"
            subtitle="(MP4, MOV only)"
            video={propertyInfo.propertyVideos?.aerialVideo}
            onVideoSelect={(file) => handleVideoSelect("aerialVideo", file)}
            onVideoRemove={() => handleVideoRemove("aerialVideo")}
          />
        </div>
      </div>

      {/* Video URL Input */}
      <div>
        <Label className="text-base font-semibold mb-3 block">
          Videos (optional)
        </Label>
        <Input
          type="text"
          placeholder="Enter video URL"
          className="rentyard-input"
          value={videoUrl}
          onChange={(e) => handleVideoUrlChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PropertyVideoSection;
