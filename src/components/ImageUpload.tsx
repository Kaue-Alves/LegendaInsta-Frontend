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

            // Criar preview
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
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                {preview ? (
                    <div className="relative w-full h-full p-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {selectedImage?.name}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                                Clique para fazer upload
                            </span>{" "}
                            ou arraste e solte
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
