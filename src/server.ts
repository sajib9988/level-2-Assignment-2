import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function server() {
  try {
    console.log(config.database_url,config.port )
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} `)
    })
  } catch (error) {
    console.error(error)
  }
}

server()