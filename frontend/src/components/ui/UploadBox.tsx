import { useRef, useState } from "react";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

function UploadBox({ onFileSelect }: UploadBoxProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div
      className={`w-full max-w-2xl rounded-xl border-2 p-10 text-center shadow-md transition-all duration-300 ${
        isDragging
          ? "border-blue-500 bg-blue-50"
          : "border-dashed border-gray-300"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <h2 className="text-2xl font-semibold mb-4">
        Upload Resume
      </h2>

      <p className="text-gray-500 mb-6">
        Drag & Drop your resume here
      </p>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Choose File
      </button>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {selectedFile && (
        <p className="mt-4 text-green-600 font-medium">
          Selected File: {selectedFile.name}
        </p>
      )}
    </div>
  );
}

export default UploadBox;