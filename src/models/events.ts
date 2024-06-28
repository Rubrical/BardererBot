import { ClientEvents } from "discord.js";

export interface IEvents {
    name?: keyof ClientEvents | string;
    execute: (...args: any[]) => void;
}