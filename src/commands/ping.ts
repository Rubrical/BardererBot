import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "./command";


export class PingCommand implements ICommand {
    public data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Retorna Pong");

    public async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({ content: "Pong secreto!", ephemeral: true });
    }
}
