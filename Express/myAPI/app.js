const express = require("express");
const index = express();
const PORT = 5001;
const mongoose = require('mongoose');
const cors = require("cors");

mongoose            //connect to mongodb server, when the application is started
.connect("mongodb://localhost/avengersw",{userNewURLParser: true})
.then(()=> console.log("Connected to db ..."))
.catch(err=> console.log("Error has occured : ", err));

const emailJob = require("./middleware/emailsender");
const loggerJob = require("./middleware/logger");
const avengers = require("./routes-middleware/heroes");

index.use(cors());              //Enables other domains to send API requests
index.use(express.json());      //returning a middleware
index.use(emailJob);
index.use(loggerJob);
// index.use("/api/avengers", avengers);

//passing a middleware to index.use
index.use((req,res,next)=>{
    console.log("Authenticating user...");
    next();
})

index.use((req,res,next)=>{
    console.log("Sending email to user for logging in...");
    next();
})

index.use("/api/avengers", avengers);

index.listen(PORT, ()=>{
    console.log("Listening on Port " + PORT);
})

