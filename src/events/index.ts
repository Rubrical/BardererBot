import { IEvents } from "src/models/events";
import { OnReadyEvent } from "./on-ready";
import { InteractionEvent } from "./interaction";
import { NewGuildJoin } from "./NewGuildJoin";

export const events : IEvents[] = [
    new OnReadyEvent(),
    new InteractionEvent(),
    new NewGuildJoin(),
];