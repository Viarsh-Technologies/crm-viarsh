export const getPaginationRange = (currentPage, totalPages, maxVisible = 5) => {
    const range = [];
    const ellipsis = "...";
  
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const rightBound = Math.min(totalPages, leftBound + maxVisible - 1);
  
      if (leftBound > 1) {
        range.push(1);
        if (leftBound > 2) {
          range.push(ellipsis);
        }
      }
  
      for (let i = leftBound; i <= rightBound; i++) {
        range.push(i);
      }
  
      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) {
          range.push(ellipsis);
        }
        range.push(totalPages);
      }
    }
  
    return range;
  };