const { express, Router } = require("express");
const { Musician } = require("../models/index");
const musicianRouter = Router();

musicianRouter.get("/", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
})

musicianRouter.get("/:id", async (req, res, next) => {
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

musicianRouter.post("/", async (req, res, next) => {
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

musicianRouter.put("/:id", async (req, res, next) => {
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

musicianRouter.delete("/:id", async (req, res, next) => {
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

module.exports = musicianRouter;