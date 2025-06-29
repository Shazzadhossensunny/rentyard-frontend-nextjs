"use client";

import { useState, useRef } from "react";
import { Play, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// New PhotoUploadGrid component for the gallery design
const PhotoUploadGrid = ({
  title,
  required = false,
  maxPhotos = 6,
  photos = [],
  onPhotosChange,
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [dragIndex, setDragIndex] = useState(null);

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).filter((file) => {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPG, JPEG, and PNG files are allowed");
        return false;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return false;
      }

      return true;
    });

    const remainingSlots = maxPhotos - photos.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    onPhotosChange([...photos, ...filesToAdd]);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDragIndex(null);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (index < photos.length) {
        // Replace existing photo
        const newPhotos = [...photos];
        newPhotos[index] = files[0];
        onPhotosChange(newPhotos);
      } else {
        // Add new photo
        handleFileSelect([files[0]]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDragIndex(index);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragIndex(null);
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const renderUploadSlot = (index, isFirstSlot = false) => {
    const hasPhoto = index < photos.length;
    const photo = hasPhoto ? photos[index] : null;
    const isDragging = dragIndex === index;

    return (
      <div
        key={index}
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer",
          isFirstSlot ? "aspect-[4/3]" : "aspect-square",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          hasPhoto ? "border-solid border-gray-200" : "hover:border-gray-400"
        )}
        onClick={!hasPhoto ? openFileDialog : undefined}
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={handleDragOver}
        onDragEnter={(e) => handleDragEnter(e, index)}
        onDragLeave={handleDragLeave}
      >
        {hasPhoto ? (
          <>
            <img
              src={URL.createObjectURL(photo)}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePhoto(index);
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Upload className="w-6 h-6 text-gray-400 mb-2" />
            {isFirstSlot ? (
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  Upload cover photo
                </p>
                <p className="text-xs text-gray-500 mt-1">(jpg, png only)</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500">+ Add</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      <Label className="text-base font-semibold mb-3 block">
        {title} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* Render all slots up to maxPhotos */}
        {Array.from({ length: maxPhotos }, (_, index) =>
          renderUploadSlot(index, index === 0)
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFileSelect(e.target.files);
          }
        }}
      />

      <p className="text-sm text-gray-500 mt-2">(jpg, png only)</p>
    </div>
  );
};

// New VideoUploadBox component
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

// Updated PropertyGallery Component
const PropertyGallery = ({ propertyInfo, setPropertyInfo }) => {
  const [videoUrl, setVideoUrl] = useState(
    propertyInfo.propertyGallery?.videoUrl || ""
  );

  const handleFeaturedPhotosChange = (photos) => {
    setPropertyInfo((prev) => ({
      ...prev,
      propertyGallery: {
        ...prev.propertyGallery,
        featuredPhotos: photos,
      },
    }));
  };

  const handleMorePhotosChange = (photos) => {
    setPropertyInfo((prev) => ({
      ...prev,
      propertyGallery: {
        ...prev.propertyGallery,
        morePhotos: photos,
      },
    }));
  };

  const handleVideoSelect = (type, file) => {
    setPropertyInfo((prev) => ({
      ...prev,
      propertyGallery: {
        ...prev.propertyGallery,
        videos: {
          ...prev.propertyGallery.videos,
          [type]: file,
        },
      },
    }));
  };

  const handleVideoRemove = (type) => {
    setPropertyInfo((prev) => ({
      ...prev,
      propertyGallery: {
        ...prev.propertyGallery,
        videos: {
          ...prev.propertyGallery.videos,
          [type]: null,
        },
      },
    }));
  };

  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
    setPropertyInfo((prev) => ({
      ...prev,
      propertyGallery: {
        ...prev.propertyGallery,
        videoUrl: url,
      },
    }));
  };

  return (
    <div className="md:col-span-2 rentyard-card">
      <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-[#E0E0E0]">
        Property Gallery
      </h3>

      <div className="space-y-8">
        {/* Featured Photos */}
        <PhotoUploadGrid
          title="Featured photos"
          required={true}
          maxPhotos={3}
          photos={propertyInfo.propertyGallery?.featuredPhotos || []}
          onPhotosChange={handleFeaturedPhotosChange}
        />

        {/* More Photos */}
        <PhotoUploadGrid
          title="More photos (optional)"
          required={false}
          maxPhotos={12}
          photos={propertyInfo.propertyGallery?.morePhotos || []}
          onPhotosChange={handleMorePhotosChange}
        />

        {/* Video Upload Boxes */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Property Video (optional)
              </Label>
              <VideoUploadBox
                title="Upload video"
                subtitle="(MP4, MOV only)"
                video={propertyInfo.propertyGallery?.videos?.propertyVideo}
                onVideoSelect={(file) =>
                  handleVideoSelect("propertyVideo", file)
                }
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
                video={propertyInfo.propertyGallery?.videos?.virtualTour}
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
                video={propertyInfo.propertyGallery?.videos?.aerialVideo}
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
      </div>
    </div>
  );
};
export default PropertyGallery;
