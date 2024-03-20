import React, { useState, useCallback } from "react";

const ImgItem: React.FC<{ index: number }> = ({ index }) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0]; // Assuming single file drop
    handleFileChange(file);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      handleFileChange(file);
    }
  };

  // Prevent default behavior for dragover and dragenter events
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragOver} className="w-full max-h-[464.48px]">
      <form className="w-full">
        <input type="file" onChange={onChange} style={{ display: "none" }} id={`fileInput-${index}`} />
        {!imageSrc && (
          <label htmlFor={`fileInput-${index}`} className="border border-dashed cursor-pointer border-primary text-center w-full block p-small">
            Drag and drop an image here, or click to select one.
          </label>
        )}
        {imageSrc && <img className="max-h-[464.48px]" src={imageSrc as string} alt="Uploaded" style={{ marginTop: "20px" }} />}
      </form>
    </div>
  );
};

export default ImgItem;
