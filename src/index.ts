import { Client, CommandInteraction, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config/env-config";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
import logger from "./config/logger";

let client = new Client({ intents: [GatewayIntentBits.Guilds, "GuildMessages", "DirectMessages"] });

// Loading commands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const command = commands.find(cmd => cmd.data.name === interaction.commandName);

    if (command) {
      try {
        await command.execute(interaction);

        const commandsName = interaction.commandName;
        const userName = interaction.member?.user.username;
        const userId = interaction.member?.user.id;
        const server = interaction.guild;

        logger.info(`O comando ${commandsName}, foi executado pelo usuário ${userName} de id ${userId} no servidor ${server}`);
      } catch (error) {
        logger.error(`Error executing command ${interaction.commandName}:`, error);
        await interaction.reply({ content: "Houve um erro durante a execução deste comando!", ephemeral: true });
      }
    }
});

// Deployng commands to bot
client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id })
});

// Setting bot up
client.once(Events.ClientReady,  async readyClient =>{
    logger.info(`De pé e operando como ${readyClient.user.tag}`);
    await deployCommands();
    logger.info("Commands deployed");
});


// Bot up!!!
client.login(config.TOKEN);