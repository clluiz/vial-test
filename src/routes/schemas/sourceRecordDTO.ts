import { Prisma } from "@prisma/client"

type Answer = {
  question: string
  answer: string | number | boolean | Date
}

export type SourceRecordDataDTO = {
  formId: string,
  sourceData: Answer[]
}