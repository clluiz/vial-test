import { Option } from "../types"

type SelectInputProps = {
  id: string
  value: string
  required?: boolean
  onChange: (id: string, newValue: string) => void
  options: Option[] | undefined
}


export const SelectInput: React.FC<SelectInputProps> = ({ id, required, options = [], value, onChange }) => {

  const changeInputValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(id, e.target.value)
  }

  return (
    <div className="mb-4">
      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500" required={required} onChange={changeInputValue} value={value}>
        {
          options?.map((option) => (<option key={option.label} value={option.value}>{option.label}</option>))
        }
      </select>
    </div>
  )
}