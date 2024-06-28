import { Client, Events } from 'discord.js';

import { IEvents } from '../models/events';
import logger from 'src/config/logger';
import { deployCommands } from 'src/deploy-commands';

export class OnReadyEvent implements IEvents {
    name = Events.ClientReady;
    async execute(readyClient: Client<true>): Promise<void> {
        await deployCommands();
        logger.info(`De pé e operando como ${readyClient.user.tag}`);
    }
}