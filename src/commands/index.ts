import { ICommand } from "../models/command";
import { PingCommand } from './ping';
import { ReloadCommands } from './reload';

export const commands: ICommand[] = [
    new PingCommand(),
    new ReloadCommands(),
];