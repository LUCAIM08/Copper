<<<<<<< HEAD
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
=======
const { data } = require("../../commands/developer/debug/maintenaince_set");
const { loadCommands } = require("../../handlers/commandHandler")
const database = require("../../schemas/mainteinance");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Client loaded`)
    client.user.setActivity(`with ${client.guilds.cache.size} servers`)

    loadCommands(client)

    database.findOne({ finder: "ciao" }).then(data => {
      if(!data) {
        let newData = new database({ finder: "ciao", status: false, info: "No info provided." })
        newData.save()
      }
    })
  }
}
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
