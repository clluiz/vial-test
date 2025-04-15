import React from "react";

type DateInputProps = {
  id: string;
  value: string | Date;
  required?: boolean;
  onChange: (id: string, newValue: string) => void;
};

function formatToDateInputValue(value: string | Date): string {
  try {
    const date = typeof value === "string" ? new Date(value) : value;
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  } catch {
    return "";
  }
}

export const DateInput: React.FC<DateInputProps> = ({
  id,
  value,
  onChange,
  required = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value); // 'YYYY-MM-DD'
  };

  return (
    <input
      id={id}
      type="date"
      required={required}
      value={formatToDateInputValue(value)}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
    />
  );
};
