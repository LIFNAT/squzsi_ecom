'use client';

import Image from "next/image";
import { propsstatetextadd } from "../page";

interface PropsImageUpload {
  statetextadd: propsstatetextadd;
  setstatetextadd: React.Dispatch<React.SetStateAction<propsstatetextadd>>;
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUpload({
  imageFiles,
  setImageFiles,
}: PropsImageUpload) {

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-white rounded-3xl shadow-sm shadow-pink-100/60 border border-pink-50 p-6 flex flex-col gap-5">
      <h2 className="text-base font-extrabold text-gray-700 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-pink-100 flex items-center justify-center text-xs">
          📸
        </span>
        รูปภาพสินค้า
      </h2>

      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-purple-400 transition-all duration-200 cursor-pointer">
        <div className="text-center">
          <p className="mb-1 text-sm font-medium text-slate-700">
            <span className="text-blue-600 font-semibold underline">
              คลิกเพื่ออัปโหลดหลายรูป
            </span>
          </p>

          <p className="text-xs text-slate-500">
            JPG, PNG, WEBP
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      {imageFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imageFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative aspect-square rounded-xl overflow-hidden border"
            >
              <Image
                fill
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="object-cover"
                unoptimized
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}