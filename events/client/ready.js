const { loadCommands } = require("../../handlers/commandHandler")
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Client loaded`)
    client.user.setActivity(`with ${client.guilds.cache.size} servers`)

    loadCommands(client)
  }
}
