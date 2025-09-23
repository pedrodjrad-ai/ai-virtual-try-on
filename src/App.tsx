import React, { useState, useCallback } from 'react';
import { UploadedImage } from './types';
import { generateVirtualTryOn } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<UploadedImage | null>(null);
  const [clothingImage, setClothingImage] = useState<UploadedImage | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!personImage || !clothingImage) return;

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await generateVirtualTryOn(personImage, clothingImage);
      setResultImage(generatedImage);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [personImage, clothingImage]);
  
  const isButtonDisabled = !personImage || !clothingImage || isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <SparklesIcon className="w-8 h-8 text-purple-400"/>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              AI Virtual Try-On
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            See yourself in new outfits instantly. Upload your photo and a piece of clothing to let our AI stylist create your new look.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ImageUploader
                    id="person-uploader"
                    title="1. Upload Your Photo"
                    uploadedImage={personImage}
                    onImageUpload={setPersonImage}
                    onImageRemove={() => setPersonImage(null)}
                />
                <ImageUploader
                    id="clothing-uploader"
                    title="2. Upload Clothing"
                    uploadedImage={clothingImage}
                    onImageUpload={setClothingImage}
                    onImageRemove={() => setClothingImage(null)}
                />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isButtonDisabled}
              className={`w-full flex items-center justify-center gap-3 text-lg font-semibold py-4 px-6 rounded-lg transition-all duration-300
                ${isButtonDisabled
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
                }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6"/>
                  Virtually Try It On
                </>
              )}
            </button>
          </div>
          <div className="w-full aspect-[3/4] lg:aspect-auto">
            <ResultDisplay resultImage={resultImage} isLoading={isLoading} error={error} />
          </div>
        </main>
        <footer className="text-center mt-12 text-gray-500">
            <p>Powered by Google Gemini. Designed for creative exploration.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
