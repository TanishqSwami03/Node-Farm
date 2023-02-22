// Creating our own mudules.
// If we want to use a function in different files then we can create a module for that. Then we will export that and import that in our file.
// In node.js every single file is treated as a module

// We will now copy paste the replaceTemplate function from 7.js to the modules folder.
// Then we have to export that. We have different ways to do that but for now we are using module.exports.
// Now as we have exported that, we can now import that into our file. imports are usually on top of the program and below the core modules.


const fs = require('fs');
const url = require('url');
const http = require('http');
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProducts = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');  
const dataObj = JSON.parse(data);
const server = http.createServer((req,res) =>{
    console.log(url.parse(req.url, true));

    const {query, pathname} = url.parse(req.url, true);

    // overview page
    if(pathname === '/' || pathname === '/overview'){ 
        
        res.writeHead(200, {'Content-type':'text/html'});

        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

        res.end(output);
    }
    
    // product page
    else if(pathname === '/product'){
        res.writeHead(200, {'Content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProducts, product);
        res.end(output);
    }

    // API
    else if(pathname === '/api'){
        res.writeHead(200, {'Content-type':'application/json'});
        res.end(data);
    }
    // Not Found
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