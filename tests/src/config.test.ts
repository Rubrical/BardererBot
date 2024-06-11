import { config } from "./../../src/config";

describe('Checks if enviroment variables comes in', () =>{
    it("Should return token and client id from .env", () => {
        expect(config.TOKEN).toBeDefined();
        });
        
    it("Should return be a string", () => {    
        expect(typeof config.TOKEN).toBe("string");
    })
});