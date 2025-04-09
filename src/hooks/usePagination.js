import { useEffect, useState } from 'react';
import { getPaginationRange } from '../utils/pagination';

export const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setCurrentPage(1); // Reset to first page when data changes
    }, [data]); // Runs whenever `data` updates (filtered/search results)
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const paginationRange = getPaginationRange(currentPage, totalPages);

    // Handle pagination
    const handlePaginate = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        currentPage,
        totalPages,
        paginatedData,
        paginationRange,
        handlePaginate, // Return the handlePaginate function
    };
};