import { bold, REST, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.TOKEN);

type DeployCommandsProps = {
  guildId?: string;
};

// deploy
export async function deployCommands({ guildId }: DeployCommandsProps = {}) {
  try {
    console.log("Started refreshing application (/) commands.");

    if (guildId) {
        await rest.put(
            Routes.applicationGuildCommands(config.CLIENT_ID, guildId),
            {
                body: commandsData,
            }
        );

        console.log(`Successfully reloaded application (/) commands for guild: ${guildId}`);
    } else {
        await rest.put(
            Routes.applicationCommands(config.CLIENT_ID),
            {
                body: commandsData
            }
        )
        console.log("Successfully reloaded application (/) commands globally.");
    }
  } catch (error) {
    console.error(error);
  }
}