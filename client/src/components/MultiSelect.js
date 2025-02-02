import React from 'react';

const MultiSelect = ({ label, options, selected, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selected, option]);
                } else {
                  onChange(selected.filter((item) => item !== option));
                }
              }}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {required && selected.length === 0 && (
        <p className="text-red-500 text-sm mt-1">Please select at least one option</p>
      )}
    </div>
  );
};

export default MultiSelect;
