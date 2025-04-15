export type Option = {
  label: string
  value: string | number
  name?: string
}

export type Field = {
  type: "textfield" | "text" | "boolean" | "number" | "datetime" | "radio" | "select",
  question: string,
  required?: boolean
  options?: Option[]
}
