// Creating a simple web server
// For this we will be using HTTP module which gives us networking capabilities such as building an HTTP server.
// In order to build a server, we have to do two things. First is creating the server and the second one is starting the server. So that we can listen to incoming requests.

const http = require('http');

const server = http.createServer((req,res) =>{                  // createServer() will take a callback function which will be fired off whenever a new request hits our server. And this callback function gets access to the most important variables which are request and response variables.
    // So all we want to do now is send a response back to the client.
    res.end("Hello from the server !!");
    // This is a very simple way of sending a simple text response to the client.

})

// Now we have done the first part which is creating the server. Now the second part is to listen to the requests from the client.
// In order to do that, we have to save the result of createServer() into a variable( i.e, usually called as server).
// And now using that server variable we will call listen() and which accepts a couple of parameters.
// The first one is port and we usually(usually 8000) 
// The second one is the host (if we do not specify it then it will be local host by default which is 127.0.0.1)
// And then as an optional argument we can specify a callback function which will run as soon as the server actually starts listening.
// Now we have to run the program and go to ip address 127.0.0.1 on port 8000 (like 127.0.0.1:8000)to start the process. And this will keep listening to requests until and unless you stop the program.

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to requests on port 8000.");
})