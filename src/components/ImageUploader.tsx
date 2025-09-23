import React, { useRef } from 'react';
import { UploadedImage } from '../types';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  id: string;
  title: string;
  uploadedImage: UploadedImage | null;
  onImageUpload: (image: UploadedImage) => void;
  onImageRemove: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, uploadedImage, onImageUpload, onImageRemove }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        onImageUpload({
          preview: URL.createObjectURL(file),
          base64: base64String,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset file input value to allow re-uploading the same file
    if(event.target) {
      event.target.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            onImageUpload({
                preview: URL.createObjectURL(file),
                base64: base64String,
                mimeType: file.type,
            });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-200 mb-2 text-center">{title}</h3>
      <div className="aspect-[3/4]">
        {uploadedImage ? (
          <div className="relative group rounded-lg overflow-hidden border-2 border-dashed border-gray-600 h-full">
            <img src={uploadedImage.preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={onImageRemove}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={id}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
            </div>
            <input id={id} type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
