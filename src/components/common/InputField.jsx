import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  className = "",
  type = "text",
  placeholder,
  required = false,
}) => {
  const [fileName, setFileName] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    onChange && onChange(e);
  };

  // Special layout for file input
  if (type === "file") {
    return (
      <div className="flex flex-col w-full gap-1">
        <label className="text-sm font-medium mb-1">{label}</label>
        <div>
        

       
       
        <div className=" w-full max-w-[600px] mx-auto">
  <div className="flex items-center w-full gap-2">
  <div className="relative flex-shrink-0 flex justify-center items-center border border-gray-300 w-[220px] rounded-[4px] h-[40px] bg-gray-50 ">
  <label
    htmlFor="file"
    className="cursor-pointer text-black text-sm font-bold font-medium whitespace-nowrap"
  >
    Choose File
  </label>
  <input
    type="file"
    id="file"
    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
    onChange={() => {}}
  />
</div>


    <span className="text-sm text-gray-500 whitespace-nowrap">
      No file chosen
    </span>
  </div>
</div>







          <input
            id={name}
            type="file"
            name={name}
            onChange={handleFileChange}
            className="hidden"
            required={required}
          />
        </div>
      </div>
    );
  }

  // Default layout for other input types
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none ${className}`}
        required={required}
      />
    </div>
  );
};

export default InputField;
