import { PingCommand } from "./../../../src/commands/ping";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";


describe("Ping tests", () => {
    let ping: PingCommand;
    let mockInteraction: CommandInteraction;

    beforeEach(() => {
        ping = new PingCommand();
        mockInteraction = {
            reply: jest.fn()
        } as unknown as CommandInteraction;
    });

    it("Ping class type", () => {
        expect(ping).toBeDefined();
        expect(ping).toBeInstanceOf(PingCommand);
        expect(ping).toHaveProperty("data");
    });

    it("Ping data tests", () => {
        expect(ping.data).toBeDefined();
        expect(ping.data).toBeInstanceOf(SlashCommandBuilder);
        expect(ping.data.name).toEqual("ping");
        expect(ping.data.description).toEqual("Retorna Pong");
    });

    it("Should call interaction.reply with correct parameters", async () => {
        await ping.execute(mockInteraction);

        expect(mockInteraction.reply).toHaveBeenCalledTimes(1);
        expect(mockInteraction.reply).toHaveBeenCalledWith({ content: "Pong secreto!", ephemeral: true });
    });
});