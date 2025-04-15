import { Prisma } from "@prisma/client"

export type FormDTO {
  id?: string,
  name: string,
  fields: Prisma.InputJsonValue 
}