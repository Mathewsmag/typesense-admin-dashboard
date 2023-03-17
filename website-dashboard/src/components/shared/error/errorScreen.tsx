import React from "react";
import image from "./images/404.png";

interface Props {
  description?: string;
}

function ErrorScreen({ description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img src={image} alt="notFound" className="w-72" />
      <p className="font-bold font-lato text-lg mt-5 dark:text-gray-300">
        There was an error
      </p>
      <p className="font-lato text-base mb-5 dark:text-gray-500">
        {description}
      </p>
    </div>
  );
}

ErrorScreen.defaultProps = {
  description: "Please try again",
};

export default ErrorScreen;
