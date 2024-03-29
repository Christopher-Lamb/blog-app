import React, { useRef, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import DynamicText from "../DynamicText/DynamicText";
import { ProfileImg } from "..";

const AccountHeader: React.FC = () => {
  const [nameText, setNameText] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const { userObj, changeName, changeImg } = useUserContext();
  console.log(userObj?.profileImg);

  const handleOnNameChange = (html: string) => {
    let workingStr = html.replaceAll(/(\<span\>)|(\<\/span\>)|(\<br\/\>)|(\<br\>)/g, "");
    workingStr = workingStr.replaceAll("&nbsp;", " ");
    setNameText(workingStr);
  };

  const handleProfilePicChange = (file: string | ArrayBuffer) => {
    setProfilePic(file.toString());
  };

  const handleNameSave = () => {
    if (!changeName || !changeImg) return;
    if (isNameChange) changeName(nameText);
    if (isPictureChange) changeImg(profilePic);
  };

  //Know when the user changes ProfilePic and their Display Name
  const isPictureChange = profilePic !== "" && userObj?.profileImg !== profilePic;
  const isNameChange = nameText !== "" && userObj?.name !== nameText;

  return (
    <div className="min-h-two md:min-h-three accent flex justify-center gap-med">
      <div className="max-w-two lg:max-w-three w-full flex flex-col items-start justify-center">
        {/* <span className="block text-large">{userObj?.name}</span> */}
        <DynamicText preventChars="<>/|\@#;$%^&*()!~`?/_.," onChange={handleOnNameChange} className="text-large w-full" primaryElement="span" secondaryElement="none" content={userObj?.name} />
        <span className="block text-med">@{userObj?.username}</span>
        <span className="block text-small18">{userObj?.email}</span>
        <div className="relative">
          {(isNameChange || isPictureChange) && (
            <button onClick={handleNameSave} className="absolute primary px-6 py-2 text-med mt-small rounded hover:brightness-110 active:brightness-90">
              Save
            </button>
          )}
        </div>
      </div>
      <div className="w-two items-center justify-center hidden md:flex">
        {/* <div style={{ borderRadius: "200%" }} className="bg-gray-200 w-two h-two overflow-hidden"> */}

        {userObj?.profileImg && <ProfileImg src={userObj.profileImg} handleChange={handleProfilePicChange} />}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AccountHeader;
