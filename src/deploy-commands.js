require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const commands = [];

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`);
    commands.push(command.data.toJSON())
})

const restClient = new REST({version: "10"}).setToken(process.env.BOT_TOKEN);

restClient.put(Routes.applicationCommands(process.env.APPLICATION_ID),
{body: commands})
.then(() => console.log('Commands erfolgreich registriert'))
.catch(console.error());