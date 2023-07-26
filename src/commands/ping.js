const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("gibt Ping in ms aus"),
    async execute(interaction, args, client) {
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🏓 Pong!")
            .setDescription(
                `BotPing! ist ${((Date.now() - interaction.createdTimestamp) / 100).toFixed()
                }ms.`
            )
            .setTimestamp();
        await interaction.reply({
            embeds: [embed],
            ephemeral: false,
        });
    },
};
