import React, { useState, useCallback, useRef, useEffect } from "react";
import { DynamicText } from "..";

interface ImgItemProps {
  index: number;
  content?: string;
  handleChange?: (file: ArrayBuffer | string, text: string) => void;
  src?: string | ArrayBuffer;
}

const hoveringStyles = {
  outline: "1px solid var(--primary)",
  borderRadius: "3px",
};

const ImgItem: React.FC<ImgItemProps> = ({ index, handleChange = () => {}, src, content }) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(src ? src : null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imgDescription, setImgDescription] = useState(content || "");
  const [isHovering, setIsHovering] = useState(false);
  const [defaultDescription, setDefaultDescription] = useState(content);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = useCallback((file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        if (reader.result) handleChange(reader.result, imgDescription);
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
    if (!imgRef.current) return;
    setImageWidth(imgRef.current.clientWidth);
  }, [imageSrc]);

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
    handleChange("", imgDescription);
    setDefaultDescription(imgDescription);
  };

  const handleHover = () => {
    setIsHovering(true);
  };
  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleLeave} onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragOver} className="w-full">
      {imageSrc && (
        <div className="relative">
          <div className="absolute z-[2] right-0 h-10">
            <button onClick={handleClear} aria-label="Clear Image" className="primary px-4 py-2">
              Clear
            </button>
          </div>
        </div>
      )}
      <form className="w-full">
        <input type="file" onChange={onChange} style={{ display: "none" }} id={`fileInput-${index}`} />
        {!imageSrc && (
          <label htmlFor={`fileInput-${index}`} className="border border-dashed cursor-pointer border-primary text-center w-full block p-small">
            Drag and drop an image here, or click to select one.
          </label>
        )}
        {imageSrc && (
          <div className="text-[14px] w-full text-[#595959]">
            <div className="relative min-h-full w-full">
              <img ref={imgRef} className="max-h-[464.48px]s inset-0 h-full min-w-full mx-auto object-cover" src={imageSrc as string} alt="Uploaded" />
            </div>
            <div
              style={{
                width: imageWidth ? `${imageWidth}px` : "100%",
                ...(isHovering ? hoveringStyles : {}),
              }}
            >
              <DynamicText
                placeholder="Image Description..."
                onChange={(content) => {
                  handleChange(imageSrc, content);
                  setImgDescription(content);
                }}
                content={defaultDescription}
                className="mt-1 p-1 h-fit"
                primaryElement="label"
                secondaryElement="none"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ImgItem;
