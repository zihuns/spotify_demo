import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  fullScreen = false,
}) => {
  const sizeClass = `spinner--${size}`;
  const containerClass = fullScreen
    ? "spinner-container--fullscreen"
    : "spinner-container";

  return (
    <div className={containerClass}>
      <div className={`spinner ${sizeClass}`}>
        <div className="spinner__circle"></div>
        <div className="spinner__circle"></div>
        <div className="spinner__circle"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
