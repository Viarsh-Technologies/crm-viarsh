const InputField = ({ label, name, value, onChange,className="", type = "text", placeholder,required = false  }) => (
  <div className="flex flex-col w-full gap-1">
    <label className="text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300  px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none ${className}`}
    />
  </div>
);
export default InputField;
