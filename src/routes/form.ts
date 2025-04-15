import { FastifyInstance } from 'fastify'

import { Form } from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { IEntityId } from './schemas/common'
import { ApiError } from '../errors'
import { FormDTO } from './schemas/formDTO'
import { Fields, FieldType, validFieldTypes } from './schemas/Field'

/**
 * 
 * Usually in a production application I would put business logic
 * in a separted service for better architecture and decouling
 */
async function formRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'formRoutes' })

  app.get<{
    Params: IEntityId
    Reply: Form
  }>('/:id', {
    async handler(req, reply) {
      const { params } = req
      const { id } = params
      log.debug('get form by id')
      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } })
        reply.send(form)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form', 400)
      }
    },
  })

  app.get<{
    Params: IEntityId
    Reply: Form[]
  }>('/', {
    async handler(req, reply) {
      const { params } = req
      const { id } = params
      log.debug('get all forms')
      try {
        const forms = await prisma.form.findMany()
        reply.send(forms)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch forms', 400)
      }
    },
  })

  app.post<{ Body: FormDTO }>('/', {
    async handler(req, reply) {
      try {
        const formStructure = req.body

        if (!formStructure.name) reply.send(`Form must have a name`).status(400)

        if (!formStructure.fields)
          reply.send('Form must have at least one field').status(400)

        const fields = formStructure.fields as typeof Fields

        // check if field types are valid
        let errors: string[] = []
        for (const key in fields) {
          if (fields.hasOwnProperty(key)) {
            const fieldType = fields[key].type
            if (!validFieldTypes.includes(fieldType))
              errors.push(
                `Type of field ${key} must be one of ${validFieldTypes.join(
                  ','
                )}`
              )
          }
        }

        if (errors.length > 0) {
          reply.send(errors.join(',')).status(400)
        }

        const savedForm = await prisma.form.create({
          data: formStructure,
        })
        reply.send(savedForm)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError(`Failed to create new form ${err.message}`, 400)
      }
    },
  })
}

export default formRoutes
