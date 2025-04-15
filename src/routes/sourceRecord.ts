import { FastifyInstance } from 'fastify'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ApiError } from '../errors'
import { SourceRecordDataDTO } from './schemas/sourceRecordDTO'

/**
 * 
 * Usually in a production application I would put business logic
 * in a separted service for better architecture and decouling
 */
async function sourceRecordsRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'sourceRecordsRoutes' })

  app.post<{ Body: SourceRecordDataDTO }>('/', {
    async handler(req, reply) {
      const { formId, sourceData } = req.body

      try {
        const transformedData = sourceData.map(d => ({
          question: d.question,
          answer: d.answer != null ? d.answer.toString() : '',
        }))

        const sourceRecord = await prisma.sourceRecord.create({
          data: {
            formId,
            sourceData: {
              create: transformedData,
            },
          },
          include: {
            sourceData: true,
          },
        })

        reply.send(sourceRecord)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError(`Failed to save form data ${err.message}`, 400)
      }
    },
  })
}

export default sourceRecordsRoutes
