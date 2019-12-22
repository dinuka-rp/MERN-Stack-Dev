const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json())     //converting a json value entered in body to readable format

let bearArray =[        //array of bears
    {id:1, name:'Grizzly Bear', location: 'Asia'},
    {id:2, name:'Polar Bear', location: 'Arctic'},
    {id:3, name:'Koala Bear', location: 'Australia'}
];

//--------EXPRESS-----------

app.get("/", function(req,res){
    res.send("Hello World!");
});

app.get("/", (req,res) => {
    res.send("Hello World!");
});


// app.get("/api/bears",function(req,res){
//     res.send("Bears!!!");
// });

app.get("/api/bears",(req,res) => {           //arrow function of the same method
    // res.send("Bears!!!!");
    let bears = ["Grizzly Bear", "Polar Bear","Koala Bear"];        
    // res.send(bears);
    res.send(bearArray);
});
    


/*
app.get("/api/bears/1", (req,res) => {
    let bear1 = {name: "Polar Bear", location: "Arctic"}        //object
    res.send(bear1);
});
*/
    
app.listen(PORT, () => {
    console.log("Listening on Port: "+PORT);
});

//-----------------------------

/*app.get("/api/bears/:bearId", (req,res) => {                    //: makes the URL a variable request
    // let bear1 = {id: req.params.bearId}        //requesting id that the user has specified
    var bearId = "User has requested for bear id: " + req.params.bearId;        //requesting id that the user has specified
    var filterByQueryParam = "User has requested query param: "+ req.query.filterBy;        //to get value passed in for filterBy
    res.send(filterByQueryParam+"<br/>"+bearId);        
    
    //can't have two res.send  s
});
*/


app.get("/api/bears/:bearId", (req,res) => {                    //: makes the URL a variable request
let bearId = parseInt(req.params.bearId);

var bear = bearArray.find(b => b.id ===bearId);  //loop through every bear object and if that bear's Id
//is equal to the bear Id requested by the user, assign it to bear variable

if(!bear){
 return res.status(404).send("The given Id does not exist");
}

res.send(bear);
})


//--------------

app.post("/api/bears",(req,res)=>{
    
    if(!req.body.name){
        return res.status(400).send("Required values are not set");     //return makes sure that the req, response cycle is ended
    }

    let newBearObj = {
        id: bearArray.length + 1,        //define the id using the last bearId existing in the array
        name: req.body.name,                //getting name entered in post method
        location: req.body.location
    }



    bearArray.push(newBearObj);         //this will get removed when the server is restarted
    res.send(newBearObj);
});


/*app.put("/api/bears/:bearId", (req,res)=>{      //method 1 (Hareen's)
    // Find required bear from bearArray using the bearId
    // If not available in array send a 404 error
    //Do check on body values for name and location.
    //If values not available send a 400 error
    //Otherwise set the name and location values from the req body to the 
    //bear which was found from the array
    //Send the newly updated bear in the response

    if(!bearArray.find(b => b.id ===bearId)){
        return res.status(404).send("The given Id doesn't exist");
    }

    if(!req.body.name || !req.body.location){
        return res.status(400).send("Required values are not set");
    }
    
    let replaceBearObj = {
        id: bearId,        //define the id using the last bearId existing in the array
        name: req.body.name,                //getting name entered in put method
        location: req.body.location
    }
 
    let arrIndex = bearArray.findIndex(b => b.id ===bearId);

    bearArray[arrIndex] = replaceBearObj;

    res.send(bearArray);

});
*/

app.put("/api/bears/:bearId", (req,res)=>{      //method 2 (Kripa)
    // Find required bear from bearArray using the bearId
    // If not available in array send a 404 error
    //Do check on body values for name and location.
    //If values not available send a 400 error
    //Otherwise set the name and location values from the req body to the 
    //bear which was found from the array
    //Send the newly updated bear in the response
    
    // let bearId = parseInt(req.params.bearId);
    
    let bear = bearArray.find(b => b.id === parseInt(req.params.bearId));

    if(!bear){
        return res.status(404).send("The given Id doesn't exist");
    }
    if(!req.body.name || !req.body.location){
        return res.status(400).send("Required values are not set");
    }
    
    bear.name = req.body.name;
    bear.location = req.body.location;
    return res.send(bear);
});




app.delete("/api/bears/:bearId", (req,res)=>{

    let bearDelete = bearArray.find(b => b.id === parseInt(req.params.bearId));
    
    if(!bearDelete){
        return res.status(404).send("The given Id doesn't exist");
    }

    let indexOfBear = bearArray.indexOf(bearDelete);
    bearArray.splice(indexOfBear,1);        //number of elements needed to be deleted from the specified index = 1

    return res.send(bearDelete);
 
});