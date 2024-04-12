import React, { useState, useCallback, useRef, useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";

interface ThumbnailProps {
  handleChange?: (file: ArrayBuffer | string) => void;
  src?: string | ArrayBuffer;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ handleChange = () => {}, src }) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(src ? src : null);
  const [isHovering, setIsHovering] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const handleFileChange = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        if (reader.result) handleChange(reader.result);
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

  useEffect(() => {
    if (src) {
      setImageSrc(src);
    }
  }, []);

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

  const handleClear = () => {
    setImageSrc("");
    handleChange("");
  };

  const handleHover = () => {
    setIsHovering(true);
  };
  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleLeave} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragOver} className="w-full max-w-three border">
      {imageSrc && (
        <div className="relative">
          <div className="absolute right-0 h-10 z-[1]">
            <button onClick={handleClear} aria-label="Clear Image" className="primary px-4 py-2">
              Clear
            </button>
          </div>
        </div>
      )}
      <form className="w-full relative max-w-three h-two overflow-hiddens">
        <input type="file" onChange={onChange} style={{ display: "none" }} id={`fileInput`} />
        {!imageSrc && (
          <label htmlFor={`fileInput`} className="cursor-pointer bg-gray-300 outline-primary text-center h-two flex items-center justify-center block p-small">
            <div className=" p-2xsmall rounded-xl bg-gray-500 opacity-60">
              <MdModeEditOutline className="text-large" />
            </div>
          </label>
        )}
        {imageSrc && (
          <div className="relative text-[14px] max-h-two text-[#595959] flex items-center justify-center">
            <label htmlFor={`fileInput`} className="absolute cursor-pointer outline-primary text-center w-full h-two flex items-center justify-center block p-small">
              {isHovering && (
                <div className=" p-2xsmall rounded-xl bg-gray-500 opacity-80">
                  <MdModeEditOutline className="text-large text-white" />
                </div>
              )}
            </label>
            <div className="w-full flex justify-center max-h-two overflow-hidden">
              <img ref={imgRef} className="max-w-three max-h-two bg-contain" src={imageSrc as string} alt="Uploaded" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Thumbnail;
