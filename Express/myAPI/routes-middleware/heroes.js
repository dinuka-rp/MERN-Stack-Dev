const express = require("express");
// const app = express();
const router = express.Router();
const PORT = 5001;
const Avenger = require("../models/avenger");

// app.use(express.json())     //converting JSON value in body to readable format

// let avengersArray =[
//     {id:1, name: 'Iron Man'},
//     {id:2, name: 'Black Panther'},
//     {id:3, name: 'Doctor Strange'}
// ];

router.get("/", async (req,res)=>{
    // console.log("Get all Avengers");
    // res.send(avengersArray);

    try{
        let avengers = await Avenger.find()
        // .sort({name:"asc"})
        // .select({name:1, likeCount:1});
        return res.send(avengers);
    }catch(e){
        return res.status(500).send(e.message);
    }
});


router.get("/:avengerId", async (req,res)=>{
    // let avengerID = parseInt(req.params.avengerId);
    // var avenger = avengersArray.find(a => a.id === avengerID);

    let avenger = await Avenger.findById(req.params.avengerId);

    if(!avenger){
        return res.status(404).send("The given ID doesn not exist");
    }
    res.send(avenger);
})


router.post("/",async (req,res)=>{
    if(!req.body.name){
        return res.status(400).send("Required values aren't set");
    }
    //try to verify for character length

    // let newAvenger ={
    //     id: avengersArray.length + 1,
    //     name: req.body.name
    // }
    // avengersArray.push(newAvenger);
    
    try{
        let avenger = new Avenger({
            name: req.body.name,
            birthName: req.body.birthName,
            movies: req.body.movies,
            imgUrl: req.body.imgUrl,
            population: req.body.population,
            likeCount: req.body.likeCount,
            deceased: req.body.deceased
        });

        avenger = await avenger.save();       // save created document into the database given in the connection script
            // asyncronous function, therefore need to give some time to handle asyncronous operations
            // all database operations are asyncronous operations.

        return res.send(avenger);
    }catch(e){
        return res.status(500).send(e.message);
    }
    
    res.send(newAvenger);
})


router.put("/:avengerId",async (req,res)=>{
    // let avenger = avengersArray.find(a => a.id === parseInt(req.params.avengerId))

    let avenger = await Avenger.findById(req.params.avengerId);

    if(!avenger){
        return res.status(404).send("The given Id doesn't exist");
    }
    if(!req.body.likeCount){
        return res.status(400).send("Nick Fury is furious. Why you no send all the values he wants?");
    }

    avenger.likeCount = req.body.likeCount;         //temporary change. Won't make changes in the database

    avenger = await avenger.save();       // save created document into the database given in the connection script

    return res.send(avenger);
})


router.delete("/:avengerId", async(req,res)=>{

    let avengerDelete = await Avenger.findOneAndDelete({_id : req.params.avengerId})

    if(!avengerDelete){
        return res.status(404).send("The given Id doesn't exist");
    }

    return res.send(avengerDelete);
})

module.exports = router;

// app.listen(PORT, () => {
//     console.log("Listening on Port: "+PORT);
// });