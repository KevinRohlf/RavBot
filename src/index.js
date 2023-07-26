require("dotenv").config()
const fs = require("fs")

const { Client, Collection, Intents, GatewayIntentBits, ActivityType, InteractionType } = require("discord.js")

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]})
client.commands = new Collection()

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
// const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))

commandFiles.forEach(commandfile => {
    const command = require(`./commands/${commandfile}`)
    client.commands.set(command.data.name, command)
})

// eventFiles.forEach(eventFile => {
//     const event = require(`./events/${eventFile}`)
//     client.on(event.name, (...args) => event.execute(...args))
// })

client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! i'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({ name: "Doktorspiele mit Otomay", type: ActivityType.Playing })
})



client.on("interactionCreate", async(interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommand) return
    const command = client.commands.get(interaction.commandName)

    if (command) {

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)

            if (interaction.deferred || interaction.replied) {
                interaction.editreply("Es ist ein Fehler beim ausführen aufgetreten!")
            } else {
                interaction.reply("Es ist ein Fehler beim ausführen aufgetreten!")
            }
        }
    }
})


client.login(process.env.BOT_TOKEN)