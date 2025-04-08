import React from "react";

const Button = ({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  size = "md",
  variant = "primary",
}) => {
  const baseStyles =
    "px-4 h-[36px] justify-center   py-2 rounded-sm transition flex gap-2 items-center focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base min-w-[120px]",
    lg: "px-5 py-3 text-lg",
  };

  const variantStyles = {
    primary: "bg-brand-green text-white hover:bg-primary focus:ring-primary",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    outline: "border border-gray-300 text-gray-500 hover:bg-gray-100 focus:ring-gray-300",
    textOnly: "border-0 border-gray-300 text-gray-500 hover:bg-gray-100 focus:ring-gray-300",
  };

  const disabledStyles = disabled
    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
    : variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
