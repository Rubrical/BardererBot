import { REST, Routes } from "discord.js";

import { config } from "./config/env-config";
import { commands } from "./commands";
import logger from "./config/logger";
import { DeployCommandsProps } from "./models/custom-types";

export async function deployCommands({ guildId }: DeployCommandsProps = {}) {

    const commandsData = Object.values(commands).map((command) => command.data);
    const rest = new REST({ version: "10" }).setToken(config.TOKEN);

    try {
        logger.info("Iniciando refresh dos (/) comandos da aplicação.")

        if (guildId) {
            await rest.put(
                Routes.applicationGuildCommands(config.CLIENT_ID, guildId),
                {
                    body: commandsData,
                }
            );

            logger.info(`Comandos da aplicação (/) reiniciados para a guilda: ${guildId}`);
        } else {
            await rest.put(
                Routes.applicationCommands(config.CLIENT_ID),
                {
                    body: commandsData
                }
            )
            logger.info("Comandos da aplicação (/) reiniciados globalmente.");
        }
    } catch (error) {
        logger.error(error);
    }
}