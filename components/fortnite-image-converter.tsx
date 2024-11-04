"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";

export function FortniteImageConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!originalImage) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/edit-image", {
        image: originalImage,
      });
      setProcessedImage(response.data.fortniteImage);
    } catch (error) {
      console.error("Błąd przetwarzania obrazu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-400 p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl uppercase md:text-6xl font-extrabold text-yellow-300 mb-8 text-center text-shadow">
        Twoje zdjecie w stylu Fortnite!
      </h1>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-4">
        <Card className="flex-1 p-6 bg-opacity-80 bg-blue-700 border-4 border-yellow-400 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Oryginalny Obraz
          </h2>
          <div className="flex flex-col items-center">
            <label htmlFor="imageUpload" className="w-full">
              <div className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer text-center transition duration-300 ease-in-out transform hover:scale-105">
                Wybierz Obraz
              </div>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {originalImage && (
              <div className="mt-4 border-4 border-white p-2 rounded-lg">
                <img
                  src={originalImage}
                  alt="Oryginalny"
                  className="max-w-full max-h-[50vh] object-contain"
                />
              </div>
            )}
          </div>
        </Card>
        <Card className="flex-1 p-6 bg-opacity-80 bg-blue-700 border-4 border-yellow-400 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Obraz w Stylu Fortnite
          </h2>
          <div className="flex flex-col items-center justify-center h-full">
            {processedImage ? (
              <div className="border-4 border-white p-2 rounded-lg">
                <img
                  src={processedImage}
                  alt="Przetworzony"
                  className="max-w-full max-h-[50vh] object-contain"
                />
              </div>
            ) : (
              <p className="text-center text-white text-lg">
                Tutaj pojawi się Twój obraz w stylu Fortnite!
              </p>
            )}
          </div>
        </Card>
      </div>
      <Button
        onClick={processImage}
        disabled={!originalImage || isLoading}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Konwertowanie...
          </>
        ) : (
          "Konwertuj na Styl Fortnite!"
        )}
      </Button>
    </div>
  );
}
