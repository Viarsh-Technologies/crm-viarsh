
import { FaMagic } from "react-icons/fa";

import React from 'react';
import { ThumbsUp } from 'lucide-react';

const RecommendationButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border border-green-300 text-green-500 font-medium rounded-md px-2 py-1 hover:bg-green-50 transition"
      title="Recommend"
    >
      <FaMagic />Recommendation
    </button>
  );
};

export default RecommendationButton;