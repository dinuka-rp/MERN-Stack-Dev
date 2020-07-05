var http = require("http");         //importing CORE Module


var server = http.createServer((req,res)=>{         //arrow function (passing one function into another function)

    if(req.url === "/pizzaz"){
        res.write("Pizzazzz");
        res.end()
    }

    if(req.url === '/'){                //request function
        //if the request URL is the home/ primary URL
    
        res.write(JSON.stringify("Hello World!"));          //Sending JSON format
        res.writeHead(200, {"Content-Type": "application/JSON"});
        res.end();          //if the response isn't ended, the page will remain hanging (loading)
    }
    // if(req.url === '/'){                //request function
    //     //if the request URL is the home/ primary URL
    
    //     res.write("Hello World!");          //response function
    //     res.end();          //if the response isn't ended, the page will remaing hanging (loading)
    
    // }
});

server.listen(5000);        //port number.

// http://localhost:5000/

//web applications normally run on port 80 OR 88
