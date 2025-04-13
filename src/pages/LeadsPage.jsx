import React, { useEffect, useState } from 'react';
import PageTitle from '../components/layout/PageTitle';
import { Trash, Plus, Search, RefreshCcwDot } from 'lucide-react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Th from '../components/common/Th';
import Td from '../components/common/Td';
import data from '../data/leads-data.json';
import Pagination from '../components/Pagination';
import StatusBadge from '../components/StatusBadge';
import CustomCheckbox from '../components/common/CustomCheckbox';
import { usePagination } from '../hooks/usePagination';
import { useRowSelection } from '../hooks/useRowSelection';
import TableActionButton from '../components/TableActionButton';
import RecommendationButton from '../components/layout/RecommendationButton';


const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Leads', path: '' },
];

const columns = [
    { key: 'contact', label: 'Contact', orderBy: true },
    { key: 'company', label: 'Company', orderBy: false },
    { key: 'stage', label: 'Stage', orderBy: false },
    { key: 'leadDateCreated', label: 'Date Created', orderBy: false },
    { key: 'summary', label: 'Summary', orderBy: false },
    { key: 'actions', label: '', orderBy: false },
];

const statusMapping = {
    Lead: 'positive',
    Negotiation: 'warning',
    Closed: 'negative',
    default: 'neutral',
    'Follow-up': 'info',
};

const LeadsPage = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const itemsPerPage = 8;

    const leadsWithIds = data.map((item, index) => ({ ...item, id: item.id || `lead-${index}` }));

    const { selectedRows, handleRowSelect, setSelectedRows } = useRowSelection(leadsWithIds.map(item => item.id));

    const {
        currentPage,
        totalPages,
        paginatedData,
        paginationRange,
        handlePaginate,
        setCurrentPage,
    } = usePagination(filteredData, itemsPerPage);

    useEffect(() => {
        setFilteredData(leadsWithIds);
        setInitialLoading(false);
    }, []);

    const [query, setQuery] = useState('');
    const [selectedStage, setSelectedStage] = useState('All');

    useEffect(() => {
        setLoading(true);
        const timeoutId = setTimeout(() => {
            handleFilterAndSearch();
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query, selectedStage]);

    const handleFilterAndSearch = () => {
        let filtered = leadsWithIds;

        if (selectedStage !== 'All') {
            filtered = filtered.filter((row) => row.stage === selectedStage);
        }

        if (query.trim().length > 0) {
            const lowerCaseQuery = query.toLowerCase();
            filtered = filtered.filter((row) =>
                Object.values(row).some((value) =>
                    value?.toString().toLowerCase().includes(lowerCaseQuery)
                )
            );
        }

        setFilteredData(filtered);
        setCurrentPage(1);
        setSelectedRows([]);
    };

    const handleViewAction = (rowId) => {
        console.log('View clicked for row ID:', rowId);
    };

    const handleRecommendationAction = (rowId) => {
        console.log('Recommendation clicked for row ID:', rowId);
    };

    const onAction = () => {
        console.log('Page title action clicked');
    };

    const handleSelectAllOnPage = (isChecked) => {
        const pageRowIds = paginatedData.map(row => row.id);
        if (isChecked) {
            setSelectedRows(prevSelected => [...new Set([...prevSelected, ...pageRowIds])]);
        } else {
            setSelectedRows(prevSelected => prevSelected.filter(id => !pageRowIds.includes(id)));
        }
    };

    const isAllOnPageSelected = paginatedData.length > 0 && paginatedData.every(row => selectedRows.includes(row.id));
    const isAnySelectedOnPage = paginatedData.some(row => selectedRows.includes(row.id));


    if (initialLoading) {
        return <div className="p-4 text-center">Loading Leads...</div>;
    }

    return (
        <div>
            <PageTitle title={'Leads'} actionText='Add New Project' ActionIcon={Plus} onAction={onAction} />
            <div className="mb-4">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
            <div className='flex flex-wrap mt-3 gap-4 items-center'>
            <div className="flex flex-wrap gap-2 mb-4 border border-gray-300 bg-white rounded-lg relative items-center shadow-sm">
  
  {/* First Dropdown */}
  <select
    onChange={(e) => setSelectedStage(e.target.value)}
    className="px-2 border-0 rounded  w-[250px] h-[37px] focus:outline-0 active:outline-0 focus:bg-gray-100"
  >
    <option value="All">All</option>
    <option value="Negotiation">Negotiation</option>
    <option value="Lead">Lead</option>
    <option value="Closed">Closed</option>
    <option value="Follow-up">Follow-up</option>
  </select>

  <span className="h-5 w-px bg-gray-300"></span>

  {/* Search Bar */}
  <div className="relative flex-grow min-w-[200px]">
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border-0 rounded-sm px-2 py-1 mr-8 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    />
    {!loading && (
      <Search
        size="18px"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    )}
  </div>

  {/* Spinner if loading */}
  {loading && (
    <RefreshCcwDot className="animate-spin text-blue-600 ml-2" size={18} />
  )}

  {/* Second Dropdown - Separated with margin-left */}
  
</div>
<div className="flex flex-wrap mb-4 border border-gray-300 bg-white rounded-lg relative items-center shadow-sm">
<select
    onChange={(e) => setSelectedStage(e.target.value)}
    className="px-2 border-0 rounded w-[250px] h-[38px] focus:outline-0 active:outline-0 focus:bg-gray-100"
  >
    <option value="All">All</option>
    <option value="Negotiation">Negotiation</option>
    <option value="Lead">Lead</option>
    <option value="Closed">Closed</option>
    <option value="Follow-up">Follow-up</option>
  </select>
</div>


                
                
            </div>

            {selectedRows.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex justify-between items-center"> {/* Adjusted padding/color */}
                    <span>{selectedRows.length} item(s) selected.</span>
                    <button onClick={() => console.log("Delete selected:", selectedRows)} className="ml-4 text-red-600 hover:text-red-800 font-medium flex items-center gap-1">
                        <Trash size={16} /> Delete Selected
                    </button>
                </div>
            )}

            <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm bg-white">
                <table className='min-w-full'>
                    <thead className="bg-gray-50">
                        <tr>
                            <Th className="w-12 px-4">
                                <CustomCheckbox
                                    onChange={(e) => handleSelectAllOnPage(e.target.checked)}
                                    checked={isAllOnPageSelected}
                                    indeterminate={isAnySelectedOnPage && !isAllOnPageSelected}
                                />
                            </Th>
                            {columns.map((column) => (
                                <Th key={column.key}>{column.label}</Th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row) => (
                                <tr key={row.id} className={`group hover:bg-gray-50 transition-colors duration-150 ${selectedRows.includes(row.id) ? 'bg-blue-50' : 'bg-white'}`}>
                                    <Td className={`px-4 ${selectedRows.includes(row.id) ? 'bg-blue-100 group-hover:bg-blue-100' : 'group-hover:bg-gray-100'}`}> {/* Adjusted padding/hover */}
                                        <CustomCheckbox
                                            onChange={() => handleRowSelect(row.id)}
                                            checked={selectedRows.includes(row.id)}
                                        />
                                    </Td>

                                    {columns.map((column) => (
                                        <Td key={column.key} className={`${selectedRows.includes(row.id) ? 'bg-blue-50 group-hover:bg-blue-50' : 'group-hover:bg-gray-50'}`}>
                                            {column.key === 'stage' ? (
                                                <StatusBadge
                                                    status={row[column.key]}
                                                    statusType={statusMapping[row[column.key]] || statusMapping['default']}
                                                />
                                            ) : column.key === 'actions' ? (
                                                <div className="flex items-center gap-2"> {/* Use flex to space out buttons */}
                                                    <RecommendationButton onClick={() => handleRecommendationAction(row.id)} />
                                                    <TableActionButton onClick={() => handleViewAction(row.id)}>
                                                        {row.view || 'View'} {/* Use data value or fallback */}
                                                    </TableActionButton>
                                                    
                                                </div>
                                            ) : (
                                                row[column.key] !== undefined && row[column.key] !== null ? row[column.key].toString() : <span className="text-gray-400">N/A</span> // Style N/A
                                            )}
                                        </Td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <Td colSpan={columns.length + 1} className="text-center py-10 text-gray-500">
                                    No leads found matching your criteria.
                                </Td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginationRange={paginationRange}
                    onPaginate={handlePaginate}
                />
            )}
        </div>
    );
};

export default LeadsPage;