import React, { useEffect, useState } from "react";
import PageTitle from "../components/layout/PageTitle";
import { Edit, Trash, Plus, Search, RefreshCcwDot } from "lucide-react";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Th from "../components/common/Th";
import Td from "../components/common/Td";
import data from "../data/agents-data.json";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import CustomCheckbox from "../components/common/CustomCheckbox";
import { usePagination } from "../hooks/usePagination";
import { useRowSelection } from "../hooks/useRowSelection";
import { RefreshCcw } from "lucide";
import { Navigate, useNavigate } from "react-router-dom";
import TableActionButton from "../components/TableActionButton";
import UpDownIcon from "../components/common/UpDownIcon";
import Caret from '../assets/caret-down.svg'


const breadcrumbItems = [
  { name: "AI Agent", path: "" },
  { name: "", path: "" },
];
const columns = [
  { key: "title", label: "Name", orderBy: true },
  { key: "application", label: "Current Step", orderBy: false },
  { key: "actions", label: "Project Files", orderBy: false },
  { key: "dateCreated", label: "Next Step", orderBy: false },
  { key: "prompt", label: "Details", orderBy: false },
  { key: "view", label: "", orderBy: false },
];
const AiAgentPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const itemsPerPage = 8;

  const {
    currentPage,
    totalPages,
    paginatedData,
    paginationRange,
    handlePaginate, // Use handlePaginate from usePagination
  } = usePagination(filteredData, itemsPerPage);
  const { selectedRows, handleSelectAll, handleRowSelect } =
    useRowSelection(data);

  useEffect(() => {
    setFilteredData(data);
  }, []);

  const [query, setQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All");
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      handleFilterAndSearch();
      setLoading(false);
    }, 500); // Debounce search (wait 500ms before filtering)

    return () => clearTimeout(timeoutId); // Clear timeout on change
  }, [query, selectedStage]); // Runs whenever query or stage changes

  const handleFilterAndSearch = () => {
    let filtered = data;

    if (selectedStage !== "All") {
      filtered = filtered.filter((row) => row.application === selectedStage);
    }

    if (query.length > 2) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    setFilteredData(filtered); // Updates displayed results
    console.log("changed");
  };

  const onAction = () => {
    navigate("/mainagent");
  };

  const handleViewAction = (rowId) => {
    console.log("View clicked for row ID:", rowId);
  };

  return (
    <div>
      <PageTitle
        title={"AI Agent"}
        actionText="Add New AI Agent"
        ActionIcon={Plus}
        onAction={onAction}
      />

      <div>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div className="flex mt-3 gap-4">
      <div className="flex gap-0 mb-4 p-2 border border-gray-400 bg-white rounded-lg relative w-[500px]">
  <select
    onChange={(e) => setSelectedStage(e.target.value)}
    className="px-2 border-0 rounded w-[100px] text-[#6B7280] focus:outline-0 active:outline-0 focus:bg-gray-100"
  >
    <option value="All">All</option>
    <option value="DuckDuckGo">DuckDuckGo</option>
    <option value="Outlook">Outlook</option>
    <option value="Adobe Acrobat">Adobe Acrobat</option>
  </select>
  <span className="height-full w-px bg-gray-400 ml-2 mr-2"></span>
  
  <div className="relative pr-10 w-full">
    <input
      type="text"
      placeholder="Search by project name or phone ..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border-0 rounded-sm px-2 mr-2 w-full focus:outline-0 active:outline-0 focus:bg-gray-100"
    />
    <Search
      size="20px"
      className="absolute right-2 top-[50%] transform -translate-y-1/2 text-gray-400"
    />
  </div>

  {loading ? (
    <RefreshCcwDot className="animate-spin text-gray-600" size={24} />
  ) : (
    ""
  )}
</div>

        <div>
        <select
            onChange={(e) => setSelectedStage(e.target.value)}
            className="flex gap-0 mb-4 p-2 w-[250px] h-[38px] border text-[#6B7280] border-gray-400 bg-white rounded-lg relative"
          >
            <option value="All">Company</option>
            <option value="DuckDuckGo">DuckDuckGo</option>
            <option value="Outlook">Outlook</option>
            <option value="Adobe Acrobat">Adobe Acrobat </option>
          </select>
          
        </div>
        <div>
        <select
            onChange={(e) => setSelectedStage(e.target.value)}
            className="flex gap-0 mb-4 p-2 w-[250px] h-[38px] border border-gray-400 text-[#6B7280] bg-white rounded-lg relative"
          >
            <option value="All">Sale Stages</option>
            <option value="DuckDuckGo">DuckDuckGo</option>
            <option value="Outlook">Outlook</option>
            <option value="Adobe Acrobat">Adobe Acrobat </option>
          </select>
          
        </div>
        </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <Th className="w-2.5 px-0">
                <CustomCheckbox
                  onChange={handleSelectAll}
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                />
              </Th>
              {columns.map((column) => (
                <Th key={column.key} className="text-center">
                  {/* Column Label with Icon */}
                  <div className="inline-flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.key !== "view" && <UpDownIcon />}
                  </div>
                </Th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="group bg-white hover:shadow-[0px_4px_7px_rgb(0_0_0_/_13%)] hover:z-10 transition-shadow duration-200 relative"
              >
                {/* Checkbox Column */}
                <Td className="w-2.5 px-0 group-hover:bg-brand-surface/50">
                  <CustomCheckbox
                    onChange={() => handleRowSelect(row.id)}
                    checked={selectedRows.includes(row.id)}
                  />
                </Td>

                {/* Other Columns */}
                {columns.map((column) => (
                  <Td
                    key={column.key}
                    className="group-hover:bg-brand-surface/50"
                  >
                    {column.key === "actions" ? (
                      <StatusBadge
                        status={row[column.key]}
                        statusType={
                          row[column.key] < 10
                            ? "positive"
                            : row[column.key] < 20
                            ? "negative"
                            : "neutral"
                        }
                      />
                    ) : column.key === "magic" ? (
                      row[column.key] ? (
                        <img src={magicIcon} alt="Magic" />
                      ) : (
                        ""
                      )
                    ) : column.key === "view" ? (
                      <TableActionButton
                        onClick={() => handleViewAction(row.id)}
                      >
                        {row.view || "View"} {/* Use data value or fallback */}
                      </TableActionButton>
                    ) : (
                      row[column.key]
                    )}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
  {/* Pagination - Left side */}
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    paginationRange={paginationRange}
    onPaginate={handlePaginate}
  />

  {/* Per Page view - Right side */}
  <div className="flex items-center">
    <span className="text-[14px] font-inter text-[#B1B4BA]">Per Page:</span> 
    <span className="font-medium text-black flex items-center ml-2">
      {currentPage}
      <img src={Caret} alt="Caret Icon" className="ml-1 h-[12px] w-[12px]" />
    </span>
  </div>
</div>

    </div>
  );
};

export default AiAgentPage;
