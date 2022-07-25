require("dotenv").config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];



// Para las funciones
const funcionFolders = fs.readdirSync("./src/funtions");
for (const folder of funcionFolders) {
  const funtionFiles = fs
    .readdirSync(`./src/funtions/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for (const file of funtionFiles) require(`./funtions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);