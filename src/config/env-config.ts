import dotenv from "dotenv";

dotenv.config();

const { TOKEN, CLIENT_ID, OWNER_ID } = process.env;

if (!CLIENT_ID || !TOKEN || !OWNER_ID) {
    throw new Error("Sem váriaveis de ambiente necessárias");
}

export const config = {
    TOKEN,
    CLIENT_ID,
    OWNER_ID
};