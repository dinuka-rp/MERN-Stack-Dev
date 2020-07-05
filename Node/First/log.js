/* LOCAL MODULE */

// Exported Object
var log = {         //this is an object
    logWarningMessage : function(message){
        console.log("Warning : "+message);
    },
    logErrorMessage : function(message){
        console.log("Error : "+message);
    },
    logInfoMessage : function(message){
        console.log("Info : "+message);
    }
}
//  module.exports.log = log;
 module.exports = log;



// Methods exported later
// var logWarningMessage = function(message){
//     console.log("Warning : "+message);
// };

// var logErrorMessage = function(message){
//     console.log("Error : "+message);
// };

// var logInfoMessage = function(message){
//     console.log("Info : "+message);
// };

// Testing in this file
// logWarningMessage("The app has crashed");
// logInfoMessage("The app has restarted");
// logErrorMessage("An error has occured");


//Exporting methods, so that they can be used in other modules
// module.exports.logWarning = logWarningMessage;
// module.exports.logError = logErrorMessage;
// module.exports.logInfo = logInfoMessage;

// module.exports.numberOfStudents = 100;