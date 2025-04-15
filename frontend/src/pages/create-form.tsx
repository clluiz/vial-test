import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

type FieldType = 'text' | 'textfield' | 'radio' | 'select' | 'boolean' | 'number' | 'datetime'

interface Option {
  label: string
  value: string | number
}

interface Field {
  type: FieldType
  label: string
  required: boolean
  options: Option[]
}

interface FieldPayload {
  type: FieldType
  question: string
  required?: boolean
  options?: Option[]
}

interface CreateFormPayload {
  name: string
  fields: Record<string, FieldPayload>
}

export const CreateForm: React.FC = () => {
  const [fields, setFields] = React.useState<Field[]>([])
  const [formName, setFormName] = React.useState('Untitled Form')

  const createFormMutation = useMutation({
    mutationFn: async (data: CreateFormPayload) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Request failed: ${error}`)
      }

      return response.json()
    },
  })

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        type: 'text',
        label: '',
        required: false,
        options: [],
      },
    ])
  }

  const updateField = (index: number, key: keyof Field, value: any) => {
    const updatedFields = [...fields]
    //@ts-ignore
    updatedFields[index][key] = value
    setFields(updatedFields)
  }

  const updateOption = (fieldIndex: number, optionIndex: number, key: keyof Option, value: string) => {
    const updatedFields = [...fields]
    updatedFields[fieldIndex].options[optionIndex][key] = value
    setFields(updatedFields)
  }

  const addOption = (fieldIndex: number) => {
    const updatedFields = [...fields]
    updatedFields[fieldIndex].options.push({ label: '', value: '' })
    setFields(updatedFields)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: CreateFormPayload = {
      name: formName,
      fields: fields.reduce((acc, field, index) => {
        const key = `field-${index + 1}`
        const base: FieldPayload = {
          type: field.type,
          question: field.label,
        }

        if (field.type !== 'boolean') {
          base.required = field.required
        }

        if (field.type === 'select' || field.type === 'radio') {
          base.options = field.options.map((opt) => ({
            label: opt.label,
            value: isNaN(Number(opt.value)) ? opt.value : Number(opt.value),
          }))
        }

        acc[key] = base
        return acc
      }, {} as Record<string, FieldPayload>),
    }

    createFormMutation.mutate(payload, {
      onSuccess: (data) => {
        alert(`Form ${data.data.id} created successfully`)
      },
      onError: (error) => {
        alert(`Error creating form ${error}`)
      },
    })
  }

  const remove = (index:number) => {
    const updatedFields = [...fields]
    if (index >= 0 && index < updatedFields.length) {
      updatedFields.splice(index, 1);
    }
    setFields(updatedFields)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6">
      <div>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
      </div>

      {fields.map((field, index) => (
        <div key={index} className="border p-4 rounded space-y-2">
          <div className="flex gap-2">
            <select
              className="border px-2 py-1"
              value={field.type}
              onChange={(e) => updateField(index, 'type', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="textfield">Textfield</option>
              <option value="radio">Radio</option>
              <option value="select">Select</option>
              <option value="boolean">Boolean</option>
              <option value="number">Number</option>
              <option value="datetime">Datetime</option>
            </select>

            <input
              type="text"
              placeholder="Question"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={field.label}
              onChange={(e) => updateField(index, 'label', e.target.value)}
            />

            {field.type !== 'boolean' && (
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(index, 'required', e.target.checked)}
                />
                Required
              </label>
            )}
          </div>

          {(field.type === 'select' || field.type === 'radio') && (
            <div className="pl-4 space-y-2">
              <strong>Options:</strong>
              {field.options.map((option, optIndex) => (
                <div key={optIndex} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Label"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    value={option.label}
                    onChange={(e) => updateOption(index, optIndex, 'label', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    value={option.value}
                    onChange={(e) => updateOption(index, optIndex, 'value', e.target.value)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="text-sm text-blue-600 underline"
                onClick={() => addOption(index)}
              >
                Add Option
              </button>
            </div>
          )}

          <div className='flex justify-end'>
            <button className='text-xs items-center  p-2 flex rounded-sm cursor-pointer bg-red-500 text-white' onClick={() => remove(index)}>
              <Trash size={20}/>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="space-x-4">
        <button
          type="button"
          className="bg-sky-600 text-white px-4 py-2 rounded"
          onClick={addField}
        >
          Add Field
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Form
        </button>
      </div>
    </form>
  )
}
