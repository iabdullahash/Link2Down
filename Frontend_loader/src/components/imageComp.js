import React, { useEffect, useState } from "react";

const ImageComponent = ({ src, classname }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("/api/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: src }),
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    if (src) {
      console.log(src);
      fetchImage();
    }
  }, []);

  return (
    <div className={classname}>
      {imageUrl && <img src={imageUrl} alt="Image" />}
    </div>
  );
};

export default ImageComponent;
