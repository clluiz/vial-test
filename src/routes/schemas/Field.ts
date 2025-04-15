import { Static, Type } from '@sinclair/typebox'

export const validFieldTypes = ['text', 'textfield', 'datetime', 'number', 'radio', 'select', 'boolean'];

export const FieldType = Type.Union([
  Type.Literal('text'),
  Type.Literal('textfield'),
  Type.Literal('datetime'),
  Type.Literal('number'),
  Type.Literal('radio'),
  Type.Literal('select'),
  Type.Literal('boolean'),
])

const Option = Type.Object({
  value: Type.Union([Type.String(), Type.Number()]),
  label: Type.String(),
})

export type IFieldType = Static<typeof FieldType>

const Field = Type.Object({
  type: FieldType,
  question: Type.String(),
  required: Type.Optional(Type.Boolean()),
  options: Type.Optional(Type.Array(Option)),
})

export const Fields = Type.Record(Type.String(), FieldType)

export type IField = Static<typeof Field>
