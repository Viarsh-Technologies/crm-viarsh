import { useState } from 'react';

export const useRowSelection = (data) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = () => {
        setSelectedRows(selectedRows.length === data.length ? [] : data.map((row) => row.id));
    };

    const handleRowSelect = (rowId) => {
        setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
    };

    return {
        selectedRows,
        handleSelectAll,
        handleRowSelect,
    };
};
