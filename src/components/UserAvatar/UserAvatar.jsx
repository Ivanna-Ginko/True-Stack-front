import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserAvatar = ({
  avatarUrl,
  name = "User",
  className = "",
  size = 136,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const isValidUrl =
    avatarUrl &&
    !["null", "undefined", ""].includes(avatarUrl.trim().toLowerCase());

  const finalUrl = isValidUrl ? avatarUrl : "/img/stub-min.png";

  return (
    <>
      {!isLoaded && (
        <Skeleton
          circle
          height={size}
          width={size}
          style={{ display: "inline-block" }}
        />
      )}
      <img
        src={finalUrl}
        alt={`User's avatar ${name}`}
        className={className}
        style={{
          display: isLoaded ? "inline-block" : "none",
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
          objectPosition: "center",
        }}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/img/stub-min.png";
          setIsLoaded(true);
        }}
      />
    </>
  );
};

export default UserAvatar;
