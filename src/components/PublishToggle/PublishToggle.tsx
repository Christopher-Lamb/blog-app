import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Switch from "react-switch";
import { FaCheck } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

const PublishToggle: React.FC<{ className?: string; onChange: (value: boolean) => void }> = ({ className, onChange }) => {
  const [isPublished, setIsPublished] = useState(false);

  const handleSwitch = (value: boolean) => {
    setIsPublished(value);
    onChange(value);
  };

  return (
    <div className={className} title="Delete Mode">
      <div className={"max-w-med rounded-2xl px-1 py-1 flex justify-between "}>
        <Switch
          name="Publish Toggle"
          className="border"
          uncheckedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <MdOutlineClose className="w-[18px] h-[18px] text-slate-600" />
            </div>
          }
          checkedIcon={
            <div className="flex items-center justify-center w-full h-full">
              <FaCheck className="w-[18px] h-[18px] text-slate-100" />
            </div>
          }
          onChange={handleSwitch}
          checked={isPublished}
          onColor="#4ade80"
          offColor="#fff"
          activeBoxShadow="0 0 4px 0px #4ade80"
          offHandleColor="#374151"
          onHandleColor="#dde3eb"
          handleDiameter={22}
        />
      </div>
    </div>
  );
};

export default PublishToggle;
