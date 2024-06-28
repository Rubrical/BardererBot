import { config } from "src/config/env-config";
import { ApplicationError } from "src/errors/application-error";

export function validateOwner(id: string) {
    if (config.OWNER_ID !== id)
        throw new ApplicationError("Comando realizado por não dono");
    return true;
}