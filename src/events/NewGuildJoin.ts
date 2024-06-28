import { Events, Guild } from "discord.js";

import logger from "src/config/logger";
import { IEvents } from "src/models/events";
import { CommandsUpdate } from '../deploy-commands';


export class NewGuildJoin implements IEvents {
    name = Events.GuildCreate;
    async execute(guild: Guild): Promise<void> {
        await CommandsUpdate.deployCommands({ guildId: guild.id });
        logger.info(`Juntando-se à guilda ${guild.name}! Guilda de id: ${guild.id}`);
    }
}