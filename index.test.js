// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    
    it("Testing musician endpoint", async () => {
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    })
    
    it("Testing musician response objects", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(responseData[0].id).toBe(1);
        expect(responseData[1].id).toBe(2);
        expect(responseData[2].id).toBe(3);

        expect(responseData[0].name).toBe("Mick Jagger");
        expect(responseData[1].name).toBe("Drake");
        expect(responseData[2].name).toBe("Jimi Hendrix");

        expect(responseData[0].instrument).toBe("Voice");
        expect(responseData[1].instrument).toBe("Voice");
        expect(responseData[2].instrument).toBe("Guitar");
    })
});

describe("./musicians/x endpoint", () => {

    it("Testing musician/1 endpoint", async () => {
        const response = await request(app).get("/musicians/1");
        expect(response.statusCode).toBe(200);
    });

    it("Testing musician/2 endpoint", async () => {
        const response = await request(app).get("/musicians/2");
        expect(response.statusCode).toBe(200);
    });

    it("Testing musician/3 endpoint", async () => {
        const response = await request(app).get("/musicians/3");
        expect(response.statusCode).toBe(200);
    });

});

describe("Testing ./musicians/x reponse objects", () => {


    it("testing ./musician/1 reponse object", async () => {

        const response = await request(app).get("/musicians/1");
        const responseData = JSON.parse(response.text);

        expect(responseData.id).toBe(1);
        expect(responseData.name).toBe("Mick Jagger");
        expect(responseData.instrument).toBe("Voice");
    });

    it("testing ./musician/2 reponse object", async () => {
        
        const response = await request(app).get("/musicians/2");
        const responseData = JSON.parse(response.text);

        expect(responseData.id).toBe(2);
        expect(responseData.name).toBe("Drake");
        expect(responseData.instrument).toBe("Voice");
    });

    it("testing ./musician/3 reponse object", async () => {
        
        const response = await request(app).get("/musicians/3");
        const responseData = JSON.parse(response.text);

        expect(responseData.id).toBe(3);
        expect(responseData.name).toBe("Jimi Hendrix");
        expect(responseData.instrument).toBe("Guitar");
    });

});