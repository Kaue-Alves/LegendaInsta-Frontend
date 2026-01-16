import { Upload } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
    selectedImage: File | null;
}

export function ImageUpload({
    onImageSelect,
    selectedImage,
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full">
            <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 sm:h-56 md:h-64 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:border-purple-400 hover:shadow-md group"
            >
                {preview ? (
                    <div className="relative w-full h-full p-2 sm:p-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm max-w-[70%] truncate">
                            {selectedImage?.name}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-lg flex items-center justify-center">
                            <Upload className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-4 pb-5 px-4">
                        <Upload className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-gray-400 group-hover:text-purple-500 transition-colors duration-300 group-hover:animate-bounce" />
                        <p className="mb-2 text-xs sm:text-sm text-gray-500 text-center">
                            <span className="font-semibold">
                                Clique para fazer upload
                            </span>{" "}
                            <span className="hidden sm:inline">ou arraste e solte</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, WEBP (MAX. 50MB)
                        </p>
                    </div>
                )}
                <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
