
import React, { useState, useEffect } from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface ResultDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const loadingMessages = [
  "Tailoring your new look...",
  "Stitching pixels together...",
  "The AI stylist is getting to work...",
  "Finding the perfect fit...",
  "Generating fashion-forward results...",
];

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isLoading, error }) => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setMessage(prevMessage => {
          const currentIndex = loadingMessages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2500);
      return () => clearInterval(intervalId);
    }
  }, [isLoading]);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400 mb-4"></div>
          <h3 className="text-xl font-semibold text-white">Generating...</h3>
          <p className="text-gray-400 mt-2">{message}</p>
        </div>
      );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-red-400 mt-4">Generation Failed</h3>
                <p className="text-gray-400 mt-2">{error}</p>
            </div>
        );
    }
    if (resultImage) {
      return <img src={resultImage} alt="Virtual Try-On Result" className="w-full h-full object-contain rounded-lg" />;
    }
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <SparklesIcon className="w-16 h-16 text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400">Your new look will appear here</h3>
        <p className="text-gray-500 mt-2">Upload a photo of yourself and a clothing item to get started.</p>
      </div>
    );
  };
  
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center p-4 min-h-[300px] lg:min-h-full">
      {renderContent()}
    </div>
  );
};

export default ResultDisplay;
