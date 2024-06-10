import { PingCommand } from './ping';
import { ICommand } from "./command";

export const commands: ICommand[] = [
    new PingCommand(),
]