
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload } from "lucide-react";

interface ImageUploaderProps {
  imageUrl?: string;
  onImageChange: (url: string) => void;
}

export function ImageUploader({ imageUrl, onImageChange }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);
  const [imageError, setImageError] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageChange(result);
      setImageError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (!urlInput) return;
    setPreviewUrl(urlInput);
    onImageChange(urlInput);
    setUrlInput("");
  };

  const handleImageError = () => {
    setImageError(true);
    setPreviewUrl(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
        {previewUrl && !imageError ? (
          <div className="relative w-full">
            <img
              src={previewUrl}
              alt="Food preview"
              className="w-full h-48 object-cover rounded-md mb-2"
              onError={handleImageError}
            />
            <Button 
              variant="destructive" 
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setPreviewUrl(undefined);
                onImageChange("");
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center justify-center cursor-pointer w-full h-48"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No image selected</p>
            <p className="text-xs text-gray-400">Click to upload or use URL below</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </div>

      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" /> Upload Image
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Image URL (e.g., https://example.com/image.jpg)"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <Button 
          type="button" 
          onClick={handleUrlSubmit}
          disabled={!urlInput}
        >
          Add
        </Button>
      </div>

      {imageError && (
        <p className="text-destructive text-sm">
          Failed to load image. Please check the URL and try again.
        </p>
      )}
    </div>
  );
}
