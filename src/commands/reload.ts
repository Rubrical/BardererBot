import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { deployCommands } from "src/deploy-commands";
// import { CommandsUpdate } from "src/deploy-commands";

import { ICommand } from "src/models/command";
import { validateOwner } from "src/utils/validateOwner";

export class ReloadCommands implements ICommand {
    public data = new SlashCommandBuilder()
        .setName("reload")
        .setDescription("reload all commads");

    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        console.log(interaction.user.id);
        if (validateOwner(interaction.user.id)){
            await deployCommands();
            await interaction.reply({content: "Comandos realizados com sucesso"});
        }
    }
}