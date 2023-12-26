const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.guildConfig = new Collection();

const { connect } = require("mongoose")
connect(client.config.DatabaseURL, {
}).then(() => console.log("Connected to database!")).catch((err) => console.log(err))

const { loadEvents } = require("./handlers/eventHandler");
loadEvents(client)

const { loadConfig } = require("./functions/configLoader");
loadConfig(client);

client.login(client.config.token);