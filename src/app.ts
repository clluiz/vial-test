import fastify from 'fastify'

import formRoutes from './routes/form'
import sourceRecordsRoutes from './routes/sourceRecord'
import errorHandler from './errors'

function build(opts = {}) {
  const app = fastify(opts)

  app.register(formRoutes, { prefix: '/form' })
  app.register(sourceRecordsRoutes, { prefix: '/source-record'})

  app.setErrorHandler(errorHandler)

  return app
}
export default build
