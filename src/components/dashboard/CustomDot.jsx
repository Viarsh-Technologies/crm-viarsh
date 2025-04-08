// src/components/CustomDot.jsx
import React from 'react';

const CustomDot = (props) => {
  const { cx, cy } = props;

  return (
    <g>
      {/* Outer circle with white fill and green stroke */}
      <circle cx={cx} cy={cy} r="6" fill="white" stroke="#32D583" strokeWidth="2" />
      {/* Inner circle with green fill */}
      <circle cx={cx} cy={cy} r="3" fill="#32D583" />
    </g>
  );
};

export default CustomDot;