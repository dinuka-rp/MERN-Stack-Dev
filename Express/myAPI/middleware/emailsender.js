function mailer(req,res,next){
    console.log("Sending email to user for logging in...");
    next();
}

module.exports = mailer;