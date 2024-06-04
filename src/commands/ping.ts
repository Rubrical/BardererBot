import { CommandInteraction, SlashCommandBuilder } from "discord.js";


export const data = new SlashCommandBuilder()
    .setName("ping")
        .setDescription("Retorna pong!");


export async function execute(interaction:CommandInteraction) {
    return interaction.reply("Pong");
}