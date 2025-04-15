import React from "react"
import { TextInput } from "./text-input"
import { TextField } from "./text-field"
import { DateInput } from "./date-field"
import { BooleanInput } from "./boolean-input"
import { SelectInput } from "./SelectInput"
import { RadioInput } from "./radio-input"
import { Field } from "../types"
import { NumberInput } from "./number-input"

export type FormSchema = {
  [key: string]: Field
}

export type DynamicFormProps = {
  schema: FormSchema
  name: string
  onSubmit: (value: any) => void
}

function FieldFactory(fieldId: string, field: Field, value: any = "", onChange: (id:string, newValue: any) => void): any {
  switch (field.type) {
    case "boolean":
      return <BooleanInput id={fieldId} onChange={onChange} value={value} />
    case "text":
      return <TextInput id={fieldId} required={field.required} onChange={onChange} value={value} />
    case "textfield":
      return <TextField id={fieldId} required={field.required} onChange={onChange} value={value} />
    case "datetime":
      return <DateInput id={fieldId} required={field.required} onChange={onChange} value={value} />
    case "number":
      return <NumberInput id={fieldId} required={field.required} onChange={onChange} value={value} />
    case "radio":
      return <RadioInput id={fieldId} options={field.options} required={field.required} onChange={onChange} value={value} />
    case "select":
      return <SelectInput id={fieldId} options={field.options} value={value} required={field.required} onChange={onChange} />

  }
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {

  const [values, setValues] = React.useState({})

  const submit = (e) => {
    e.preventDefault();
    onSubmit(values)
  }

  const onChange = (field:string, newValue: boolean | number | string) => {
    setValues({
      ...values,
      [field]: newValue
    })
  }

  return (
    <div>
      <form onSubmit={submit}>
        {
          Object.entries(schema).map(([fieldId, fieldStructure]: [string, Field]) => (
            <div key={fieldId}>
              {
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{fieldStructure.question}</label>
                  {FieldFactory(fieldId, fieldStructure, values[fieldId], onChange)}
                </>
              }
            </div>
          ))
        }

        <button className="mt-10 w-full flex justify-center space-x-2 px-5 py-3 bg-sky-700 text-white rounded-xl hover:bg-sky-800 transition" type="submit">Submit</button>
      </form>
    </div>
  )
}