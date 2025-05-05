import { FaMagic } from "react-icons/fa";
import React from 'react';

const RecommendationButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-[158px] h-[24px] gap-2 border border-border text-[#32D583] font-medium rounded-sm px-2 py-1 "
      title="Recommend"
    >
      <FaMagic /> Recommendation
    </button>
  );
};

export default RecommendationButton;
