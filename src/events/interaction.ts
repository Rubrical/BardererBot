import { CommandInteraction, Events } from "discord.js";

import { commands } from "src/commands";
import logger from "src/config/logger";
import { ApplicationError } from "src/errors/application-error";
import { IEvents } from "src/models/events";

export class InteractionEvent implements IEvents {
    name = Events.InteractionCreate;

    async execute(interaction: CommandInteraction) : Promise<void> {
        if (!interaction.isCommand()) return;

        const command = commands.find(c => c.data.name === interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);

                const commandsName = interaction.commandName;
                const userName = interaction.member?.user.username;
                const userId = interaction.member?.user.id;
                const server = interaction.guild;

                logger.info(`O comando ${commandsName}, foi executado pelo usuário ${userName} de id ${userId} no servidor ${server}`);
            } catch(error) {
                if (error instanceof ApplicationError && error.name === "Application Error") {
                    logger.error(`Error executing command ${interaction.commandName}:`, error);
                    await interaction.reply({ content: error.message })
                }

                if (error instanceof Error){
                    logger.error(`Error executing command ${interaction.commandName}:`, error);
                    await interaction.reply(
                        {
                            content: "Houve um erro durante a execução deste comando! Contate o desenvolvedor!",
                            ephemeral: true
                        }
                    );
                }
            }
        }
    }

}