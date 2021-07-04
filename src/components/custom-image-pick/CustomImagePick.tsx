import React from "react";

type CustomImagePickProps = {
  pickName: string;
  image: HTMLInputElement | null;
  setImage: (event: any) => void;
  style?: React.CSSProperties;
  className: string;
};

const CustomImagePick = ({
  pickName,
  image,
  setImage,
  style,
  className,
}: CustomImagePickProps) => {
  return (
    <div className="first-last-container justify-start">
      <p className={className}>{pickName}</p>
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="single"
        className={className}
        onChange={setImage}
        style={style}
      />
    </div>
  );
};

export default CustomImagePick;
