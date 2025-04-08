const TextArea = ({ label, name, value, onChange, placeholder, required = false }) => (
  <div className="flex flex-col w-full gap-1">
      <label className="text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300  px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none"
        rows={4}
      ></textarea>
    </div>
  );
  export default TextArea;
  