import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface ModernCheckboxProps {
  options: Option[];
  defaultSelected?: Option[];
  placeholder?: string; // New prop for dynamic placeholder
  onChange: (selectedOptions: MultiValue<Option>) => void; // Add onChange prop to the interface
}

const ModernCheckbox: React.FC<ModernCheckboxProps> = ({
  options,
  defaultSelected = [],
  placeholder = "Select options...", // Default placeholder text
  onChange, // Destructure onChange from props
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<MultiValue<Option>>(defaultSelected);

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected);
    onChange(selected); // Call the passed-in onChange function
  };

  return (
    <Select
      value={selectedOptions}
      onChange={handleChange}
      options={options}
      isMulti
      placeholder={placeholder} // Using the dynamic placeholder
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
};

export default ModernCheckbox;
