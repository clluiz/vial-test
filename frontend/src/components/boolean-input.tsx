
type BooleanInput = {
  id: string
  value: boolean
  onChange: (id: string, newValue: boolean) => void
}

export const BooleanInput: React.FC<BooleanInput> = ({ id, value, onChange }) => {

  const changeInputValue = () => {
    onChange(id, !value)
  }

  return (
    <input id={id} type="checkbox" checked={value == true} onChange={changeInputValue} />
  )
}