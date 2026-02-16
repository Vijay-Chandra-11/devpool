import { Server } from '@hocuspocus/server'

// 1. Configure the server
const server = new Server({
  port: 1234,

  async onListen(data) {
    console.log(`🚀 DevPool Live Server running on port ${data.port}`)
  },

  async onConnect(data) {
    console.log(`⚡ User connected to room: ${data.documentName}`)
  },
})

// 2. Start listening
server.listen()