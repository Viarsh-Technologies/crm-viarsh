import { useEffect, useState } from "react";
import PageTitle from "../components/layout/PageTitle";
import { Plus, Search } from "lucide-react";
import { FiUpload } from "react-icons/fi";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Th from "../components/common/Th";
import Td from "../components/common/Td";
import data from "../data/projectss-data.json";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import CustomCheckbox from "../components/common/CustomCheckbox";
import { usePagination } from "../hooks/usePagination";
import { useRowSelection } from "../hooks/useRowSelection";
import { useNavigate } from "react-router-dom";
import UpDownIcon from "../components/common/UpDownIcon";
import UserCard from "../components/common/UserCard";
import QuestionIcon from "../assets/queProject.svg";
import { FiChevronDown } from "react-icons/fi";
import Caret from '../assets/caret-down.svg'

const breadcrumbItems = [
  { name: "Projects", path: "/" },
  { name: "Add New Project", path: "" },
];

const columns = [
  { key: "type", label: "Type" },
  { key: "stage", label: "Sales Stage" },
  { key: "company", label: "Company" },
  { key: "contractValue", label: "Contract Value" },
  { key: "qaDate", label: "Q&A Date" },
  { key: "closeDate", label: "Close Date" },
  { key: "nextStep", label: "Next Step" },
  { key: "contactPerson", label: "Contact" },
];

const statusMapping = {
  "Deal Closed": "positive",
  Negotiation: "warning",
  "Not Interested": "negative",
  Default: "neutral",
};

const ProjectsPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 8;

  useEffect(() => {
    const initialData = data.map((item) => ({
      ...item,
      contactPerson: item.contactPerson || null,
    }));
    setFilteredData(initialData);
    if (data.length > 0 && !data[0].contactPerson) {
      console.warn(
        "Project data might be missing the nested 'contactPerson' object. UserCards may not display correctly."
      );
    }
  }, []);

  const {
    currentPage,
    totalPages,
    paginatedData,
    paginationRange,
    handlePaginate,
    setCurrentPage,
  } = usePagination(filteredData, itemsPerPage);

  const { selectedRows, handleSelectAll, handleRowSelect, setSelectedRows } =
    useRowSelection(data.map((item) => item.id));

  const [query, setQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("All");

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      handleFilterAndSearch();
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, selectedStage]);

  const handleFilterAndSearch = () => {
    let processedData = [...data];

    processedData = processedData.map((item) => ({
      ...item,
      contactPerson: item.contactPerson || {},
    }));

    if (selectedStage !== "All") {
      processedData = processedData.filter(
        (row) => row.stage === selectedStage
      );
    }

    if (query.trim().length > 0) {
      const lowerQuery = query.toLowerCase();
      processedData = processedData.filter((row) =>
        Object.entries(row).some(([key, value]) => {
          if (
            key === "contactPerson" &&
            typeof value === "object" &&
            value !== null
          ) {
            return Object.values(value).some((contactValue) =>
              contactValue?.toString().toLowerCase().includes(lowerQuery)
            );
          }
          return value?.toString().toLowerCase().includes(lowerQuery);
        })
      );
    }

    setFilteredData(processedData);
    setCurrentPage(1);
    setSelectedRows([]);
    console.log("Filtered/Searched, data updated.");
  };

  const onAction = () => {
    navigate("/addProject");
  };

  const currentItemsIds = paginatedData.map((item) => item.id);
  const allVisibleSelected =
    currentItemsIds.length > 0 &&
    currentItemsIds.every((id) => selectedRows.includes(id));
  const isIndeterminate =
    currentItemsIds.some((id) => selectedRows.includes(id)) &&
    !allVisibleSelected;

  const handleSelectAllVisible = (isChecked) => {
    const currentIds = paginatedData.map((item) => item.id);
    if (isChecked) {
      setSelectedRows((prevSelected) => [
        ...new Set([...prevSelected, ...currentIds]),
      ]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((id) => !currentIds.includes(id))
      );
    }
  };

  return (
    <div>
      <PageTitle
        title={"Projects"}
        actionText="Create New"
        ActionIcon={Plus}
        onAction={onAction}
      />
      <div>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div className="flex mt-3 gap-4 items-center w-[1220px]">
        <div className="flex gap-0 mb-4 border border-gray-300 bg-white rounded-lg relative">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="text-[#6B7280] h-[40px] "
          >
            <option value="All">Workflow</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Deal Closed">Deal Closed</option>
          </select>

          <span className="h-auto w-[1px] bg-[#D1D5DB] mx-2"></span>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search project name, phone, tags ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-sm px-2 py-1 mr-2 w-82 bg-transparent outline-none border-none focus:outline-none focus:ring-0"
            />
            <Search size="18px" className="absolute right-3 text-gray-400" />
          </div>
        </div>

        <div className="flex gap-0 mb-4 text-[#6B7280] bg-[#FFFFFF] rounded-lg relative border-[#2363C5] border-1">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-2 py-1  w-[235px] focus:outline-none h-[38px]"
          >
            <option value="All">Sale Stages</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Deal Closed">Deal Closed</option>
          </select>
        </div>

        <div className="flex mb-4 items-center justify-between p-2 w-[250px] h-[37px] border border-gray-300 bg-[#767572] rounded-lg">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center gap-2 text-sm text-white font-medium"
          >
            <FiUpload className="w-5 h-5" />
            Upload Spreadsheet
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  console.log("Selected file:", file);
                }
              }}
            />
          </label>
        </div>
        <div className=" mb-5">
          <img src={QuestionIcon} alt="" />
        </div>
        <div className="relative w-[113px] h-[38px] mb-4 border border-gray-300 bg-[#32D583] rounded-lg">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="appearance-none text-white w-full h-full pl-3 pr-8 rounded-lg text-sm"
          >
            <option value="All">Columns</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Deal Closed">Deal Closed</option>
          </select>

          {/* Custom dropdown icon */}
          <div className="pointer-events-none absolute right-2 top-2/4 transform -translate-y-1/2">
            <FiChevronDown size={18} color="#ffffff" />
          </div>
        </div>

        <div className="relative w-[80px] h-[38px] mb-4 border border-[#969696] rounded-lg">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="appearance-none text-[#969696] w-full h-full pl-3 pr-8 rounded-lg text-sm"
          >
            <option value="All">Sort</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Deal Closed">Deal Closed</option>
          </select>

          {/* Custom dropdown icon */}
          <div className="pointer-events-none absolute right-3 top-2/4 transform -translate-y-1/2">
            <FiChevronDown size={18} color="black" />
          </div>
        </div>
      </div>

      {/* Table Structure */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm mt-4 bg-white">
        {" "}
        {/* Added overflow-x-auto */}
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <Th className="w-10"></Th>
              <Th className="w-2.5 px-2">
                <CustomCheckbox
                  onChange={(e) => handleSelectAllVisible(e.target.checked)}
                  checked={allVisibleSelected}
                  indeterminate={isIndeterminate}
                />
              </Th>
              {columns.map((column) => (
                <Th key={column.key}>
                  <div className="flex items-center gap-1">
                    <span>{column.label}</span>
                    {column.key !== "contactPerson" && <UpDownIcon />}
                  </div>
                </Th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`group hover:bg-brand-surface/30 transition-colors duration-150 ${
                    selectedRows.includes(row.id)
                      ? "bg-brand-surface/20"
                      : "bg-white"
                  }`}
                >
                  <Td className="text-center text-gray-500 w-10">
                    {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                  </Td>
                  <Td className="w-2.5 px-2">
                    <CustomCheckbox
                      onChange={() => handleRowSelect(row.id)}
                      checked={selectedRows.includes(row.id)}
                    />
                  </Td>

                  {columns.map((column) => (
                    <Td key={column.key} className="align-middle">
                      {column.key === "stage" ? (
                        <StatusBadge
                          status={row.stage}
                          statusType={statusMapping[row.stage] || "neutral"}
                        />
                      ) : column.key === "contactPerson" ? (
                        <UserCard user={row.contactPerson} />
                      ) : (
                        row[column.key] ?? "-"
                      )}
                    </Td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <Td
                  colSpan={columns.length + 2}
                  className="text-center py-10 text-gray-500"
                >
                  {loading
                    ? "Loading..."
                    : "No projects found matching your criteria."}
                </Td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     

<div className="flex justify-between items-center mt-4">
{totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginationRange={paginationRange}
          onPaginate={handlePaginate}
        />
      )}

  {/* Per Page Display */}
<div className="text-sm text-gray-500 pr-1 flex items-center">
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

export default ProjectsPage;
