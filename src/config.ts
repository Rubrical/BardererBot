import dotenv from "dotenv";

dotenv.config();

const { TOKEN, CLIENT_ID } = process.env;

if (!CLIENT_ID || !TOKEN) {
    throw new Error("Sem váriaveis de ambiente necessárias");
}

export const config = {
    TOKEN,
    CLIENT_ID
};