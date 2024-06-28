import { Client, GatewayIntentBits } from "discord.js";

import { config } from "./config/env-config";
import { events } from './events/index';

// Client bot
const client = new Client({ intents: [GatewayIntentBits.Guilds, "GuildMessages", "DirectMessages"] });

// Setting events up
events.forEach(event => {
    if(event.name) client.on(event.name, (...args) => event.execute(...args));
});

// Bot up!!!
client.login(config.TOKEN);