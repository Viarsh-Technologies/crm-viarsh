import React from "react";

const UpDownIcon = ({
  width = 10,
  height = 12,
  fill = "#767572",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.16665 6.83334L4.99998 11.8333L0.833313 6.83334H9.16665Z"
      fill={fill}
    />
    <path
      d="M0.833292 5.16667L4.99996 0.166671L9.16663 5.16667L0.833292 5.16667Z"
      fill={fill}
    />
  </svg>
);

export default UpDownIcon;
