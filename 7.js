// Parsing variables

const fs = require('fs');
const url = require('url');
const http = require('http');

const replaceTemplate = (temp, product) =>{                        // temp here means template.
    let output = temp.replace('{%PRODUCTNAME%}', product.productName)
    output = output.replace('{%FROM%}', product.from);
    output = output.replace('{%IMAGE%}', product.image);
    output = output.replace('{%PRICE%}', product.price);
    output = output.replace('{%NUTRIENTS%}', product.nutrients);
    output = output.replace('{%QUANTITY%}', product.quantity);
    output = output.replace('{%DESCRIPTION%}', product.description);
    output = output.replace('{%ID%}', product.id);
    
    if(!product.organic) output = output.replace('{%NOT_ORGANIC%}', 'not-organic');
    return output;
} 

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProducts = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');  
const dataObj = JSON.parse(data);
const server = http.createServer((req,res) =>{
    // Now we will log the result of the url.parse() on the requested url.
    //console.log(req.url);
    console.log(url.parse(req.url, true));                        // We have to pass true also because we want our query to be parsed as an object.

    const {query, pathname} = url.parse(req.url, true);             // By logging the requested url in the previous step, we knew that there are some properties of that url. So we want to fetch query and pathname property from the url and store that in a variable.
    // Now all we have to do is, replace pathName with the pathname that we have just extracted.

    // overview page
    if(pathname === '/' || pathname === '/overview'){ 
        
        res.writeHead(200, {'Content-type':'text/html'});

        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

        res.end(output);
    }
    // product page
    else if(pathname === '/product'){
        //console.log(query);                       // To see the query on the console.
        // Now we have to load this page from the template and that is going to be way simpler than the overview page.
        // We can use a simple template.
        // Firstly we have to figure out which product we have to display.
        res.writeHead(200, {'Content-type':'text/html'});
        const product = dataObj[query.id];          // So this is the simplest way of retrieving an element based on the query string.
        const output = replaceTemplate(tempProducts, product);
        res.end(output);
        //res.end("This is the PRODUCT page");
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