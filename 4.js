// Routing

// The server that we have created in 3.js does not respond to the URL i.e, if I enter 127.0.0.0:8000/products , it will does not give any response and will remain on the same page.
// This Routing can become very complicated when we are working on a big real world application. So in that case we use a tool for that like express
// But now we are leaning, we are not using that now. But we will do that later.

// The first step is to analyze the URL and for that we will use yet another built in Node module which is URL module

const url = require('url');
const http = require('http');

const server = http.createServer((req,res) =>{
    //console.log(req.url);                                 // This will take all the requests from the url and log it on the terminal. (eg, if I search for 127.0.0.1:8000/home then it will log it on the terminal.)
    //res.end("Hello from the server !!");

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){                // '/' represents the root.
        res.end("This is the OVERVIEW / HOME page.");
    }
    else if(pathName === '/product'){
        res.end("This is the PRODUCT page");
    }
    else if(pathName === '/careers'){
        res.end("This is the CAREERS page.");
    }
    // But what if the user requests for the page that is not from the above mentioned. Then we have to just send a PAGE NOT FOUND response.
    else{
        // we can also give the status codes for this.
        //res.writeHead(404);                                 // This will not show the 404 directly on the page but you have to go to the console and network terminal via inspect for that.
        //res.end("PAGE NOT FOUND !!");
        // We can also send header with the status codes
        res.writeHead(404,{
            'Content-type': 'text/html',               // For this we have to convert our response into html format. So we have converted it into h1 tag.
            'my-custom-header': 'hello-world'          // This custom header is used to send some metadata about the response. 
        });
        res.end('<h1>"PAGE NOT FOUND !!"</h1>');
        // Headers has to be sent before the response (MUST)
        // If our request is correct then it will give status code 200 which means OK.
        // These paths that we have defined in the progrma has nothing to do with the files or folders in the project file system.
    }
});

server.listen(8000,'127.0.0.1',() =>{
    console.log("Listening to requests on port 8000.");
})