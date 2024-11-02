import { ModernCheckboxProps } from "@/types/components/ModernCheckbox.type";
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

const ModernCheckbox: React.FC<ModernCheckboxProps> = ({
  options,
  defaultSelected = [],
  placeholder = "Select options...", // Default placeholder text
  onChange, // Destructure onChange from props
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<{
      label: string;
      value: string;
    }>
  >(defaultSelected);

  const handleChange = (
    selected: MultiValue<{
      label: string;
      value: string;
    }>
  ) => {
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
