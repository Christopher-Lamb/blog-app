import React from "react";

const AccountHeader: React.FC = () => {
  return (
    <div className="min-h-two md:min-h-three accent flex justify-center gap-med">
      <div className="max-w-two lg:max-w-three w-full flex flex-col items-start justify-center">
        <span className="block text-large">Name</span>
        <span className="block text-med">@username</span>
        <span className="block text-small18">email</span>
      </div>
      <div className="w-two items-center justify-center hidden md:flex">
        <div style={{ borderRadius: "200%" }} className="bg-gray-200 w-two h-two"></div>
      </div>
    </div>
  );
};

export default AccountHeader;
