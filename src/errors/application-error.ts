import logger from "src/config/logger";

export class ApplicationError implements Error {
    name: string = "Application Error";
    constructor(public message: string) { logger.error(message); }

}