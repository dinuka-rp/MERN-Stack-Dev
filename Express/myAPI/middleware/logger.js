function logger(req,res,next){
    console.log("Logging user details...")
    next();         //what does next() do?
}

module.exports = logger;