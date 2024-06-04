import { Client, CommandInteraction, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config"
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";

let client = new Client({ intents: [GatewayIntentBits.Guilds, "GuildMessages", "DirectMessages"] });

// Loading commands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const { commandName } = interaction;

    if (commands[commandName as keyof typeof commands]) {
      commands[commandName as keyof typeof commands].execute(interaction);
    }

    const commandsName = interaction.commandName;
    const userName = interaction.member?.user.username;
    const userId = interaction.member?.user.id;
    const server = interaction.guild;

    console.log(`O comando ${commandsName}, foi executado pelo usuário ${userName} de id ${userId} no servidor ${server}`)
});

// Deployng commands to bot
client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id })
});

// Setting bot up
client.once(Events.ClientReady,  async readyClient =>{
    console.log(`De pé e operando como ${readyClient.user.tag}`)
    await deployCommands();
    console.log("Commands deployed")
});


// Bot up!!!
client.login(config.TOKEN);