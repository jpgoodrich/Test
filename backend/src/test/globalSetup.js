import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function globalSetup() {
  // set binary version to what we installed for our Docker container
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4',
    },
  })

  global.__MONGOINSTANCE = instance
  process.env.DATABASE_URL = instance.getUri()
}
