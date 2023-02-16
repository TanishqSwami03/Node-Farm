// API
// An API is a service from which we can request some data.
// In this case, the data that user can request is the data about the products that we are offering in this project.
// To read the data we have a dev-data folder which has a json file and we have to give another route for that.
// So what we have to do now is we have to read data from this json file then parse json into javascript and send back that result to the client.
// The first approach is to come to the route and read the file in here using the readFile() function.


const fs = require('fs');
const url = require('url');
const http = require('http');

// Second step, done after the below process.
// Now we will use the synchronous way of reading the data and this will not be an issue because the top level code will be executed once, right in the beginning.
// Only the callback funtion (eg. createServer()) will be executed each time there is a new request.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); 
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) =>{

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){                
        res.end("This is the OVERVIEW / HOME page.");
    }
    else if(pathName === '/product'){
        res.end("This is the PRODUCT page");
    }
    else if(pathName === '/careers'){
        res.end("This is the CAREERS page.");
    }
    // else if(pathName === '/api'){
    //     // fs.readFile('dev-data/data.json');            // OR
    //     fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err,data)=>{                // __dirname will give the path of the current folder that we are working on.
    //         // Now this data is in JSON and we have JSON.parse() which will take the JSON code which is actually string and convert it into javascript.
    //         const productData = JSON.parse(data);
    //         //console.log(productData);                 // This will log the data on the terminal when we search for api route.
    //         // If we want to actually send this data as the response. Now this res.end() method takes strings as inputs but we stored this data in variable (i.e, productData). So we have to give data directly as the input.
    //         // Just like we have done in the header we have to describe what type of data we are sending ( in our case JSON).
    //         res.writeHead(200, {'Content-type':'application/json'});
    //         res.end(data);
    //         // We have done that but this is not efficient because everytime the user hits the api route this will first read the file and then send this as a response.
    //         // So what we can do is, we will read it in the beginning and then everytime user hits api, we have to just send the response because we have already read the file.
    //     });
    // }
    else if(pathName === '/api'){
        res.writeHead(200, {'Content-type':'application/json'});
        res.end(data);                                                     // Now this data is coming from the top level code that we have have just written.
    }
    else{
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-custom-header': 'hello-world' 
        });
        res.end('<h1>"PAGE NOT FOUND !!"</h1>');
    }
});

server.listen(8000,'127.0.0.1',() =>{
    console.log("Listening to requests on port 8000.");
})



// So this is our very first API which now allows the user to simply request all the data about the application with one single API call basically.