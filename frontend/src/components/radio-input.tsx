import React from "react";
import { Option } from "../types";

type RadioInputProps = {
  id: string;
  value: string;
  required?: boolean;
  onChange: (id: string, newValue: string) => void;
  options: Option[] | undefined;
};

export const RadioInput: React.FC<RadioInputProps> = ({
  id,
  required = false,
  options = [],
  value,
  onChange,
}) => {
  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-2">
      {options.map((option) => (
        <label
          htmlFor={option.name}
          key={option.label}
          className="inline-flex items-center gap-x-2 text-gray-700"
        >
          <input
            id={option.name}
            name={id}
            type="radio"
            value={option.value}
            required={required}
            onChange={changeInputValue}
            className="text-sky-600 focus:ring-sky-500"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};
