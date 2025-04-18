const ProjectPopup = ({ data, position }) => {
  const items = [
    { label: "Type", value: data?.type },
    { label: "Sales Stage", value: data?.stage },
    { label: "Company", value: data?.company },
    { label: "Contract Value", value: data?.contractValue },
    { label: "Q&A Date", value: data?.qaDate },
    { label: "Close Date", value: data?.closeDate },
    { label: "Next Step", value: data?.nextStep },
    { label: "Contact", value: data?.contactPerson?.name },
  ];

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded shadow-md p-4 z-50 w-[300px]"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-1 text-sm text-gray-800"
        >
          <span>{item.label}</span>
          <span className="text-gray-500">{item.value || "-"}</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectPopup;
