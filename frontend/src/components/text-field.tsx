
type TextField = {
  id: string
  value: string
  required?: boolean
  onChange: (id:string, newValue: string) => void
}

export const TextField: React.FC<TextField> = ({ id, value, onChange, required = false }) => {

  const changeInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(id, e.target.value)
  }

  return (
    <textarea
      onChange={changeInputValue}
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      id={id}
      required={required} />
  )
}