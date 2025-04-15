
type NumberInput = {
  id: string
  value: number
  required?: boolean
  onChange: (id:string, newValue: string) => void
}

export const NumberInput: React.FC<NumberInput> = ({ id, value, onChange, required = false }) => {

  const changeInputValue = (e) => {
    onChange(id, e.target.value)
  }

  return (
    <input
      onChange={changeInputValue}
      pattern="[0-9]*"
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      id={id}
      inputMode="numeric"
      type="number"
      required={required} />
  )
}