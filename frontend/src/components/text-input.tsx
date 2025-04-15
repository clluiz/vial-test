
type TextInput = {
  id: string
  value: string
  required?: boolean
  onChange: (id:string, newValue: string) => void
}

export const TextInput: React.FC<TextInput> = ({ id, value, onChange, required = false }) => {

  const changeInputValue = (e) => {
    onChange(id, e.target.value)
  }

  return (
    <input
      onChange={changeInputValue}
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      id={id}
      type="text"
      required={required} />
  )
}