const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection");
const { json } = require("sequelize");

//const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create a GET /musicians route to return all musicians 
app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
})

app.get("/musicians/:id", async (req, res, next) => {
    try{
        const musician = await Musician.findByPk(req.params.id);
        if(!musician){
            throw new Error(`Musician: ${req.params.id} not found!`);
        }
        res.json(musician);
    }catch(error){
        next(error);
    }
});

app.post("/musicians", async (req, res, next) => {
    try{
        const created = await Musician.create(req.body);
        if(!created){
            throw new Error("Could not create new musician!");
        }
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
});

app.put("/musicians/:id", async (req, res, next) => {
    try{
        const musician = await Musician.findByPk(req.params.id);
        if(!musician){
            throw new Error(`Musician ${req.params.id} not found!`);
        }
        await musician.update(req.body);
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
});

app.delete("/musicians/:id", async (req, res, next) => {
    try{
        const musician = await Musician.findByPk(req.params.id);
        if(!musician){
            throw new Error(`Musician ${req.params.id} not found!`);
        }
        await musician.destroy();
        res.sendStatus(200);
    }catch(error){
        next(error);
    }
});


// app.get("/musicians/1", async (req, res) => {
//     const musician = await Musician.findByPk(1);
//     res.json(musician);
// });

// app.get("/musicians/2", async (req, res) => {
//     const musician = await Musician.findByPk(2);
//     res.json(musician);
// });

// app.get("/musicians/3", async (req, res) => {
//     const musician = await Musician.findByPk(3);
//     res.json(musician);
// });

app.get("/bands", async (req, res) => {
    const bands = await Band.findAll();
    res.json(bands);
});

module.exports = app;