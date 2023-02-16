// Building the HTML template.
// So the first step is to actually build the template. One for the overview page and another one for the product deatils page.
// To make it dynamic, we have modified the original product.html to template-product.html
// And we have modified the overview.html and in that there is a card for every product. So we have created a template for the card.
// NO we will fill this template and send back final page to the browser.

const fs = require('fs');
const url = require('url');
const http = require('http');

const replaceTemplate = (temp, product) =>{
    // Here we will replace all the placeholders that we have.
    // Eg. Placeholder PRODUCTNAME is going to be replaced with the productName of the product. (where productName is the field where the name of the product is in the data.json file and product is the argument which we have passed.)
    // One small trick is, instead of using quotes for the placeholders (i.e, '{%PRODUCTNAME%}'), we will use a regular expression and that is because there might be multiple instances of a placeholder. So the trick is to wrap the placeholder in a regular expression and use a g flag on it which means global and it makes sure that all the placeholders will be replaced and not only the first one that occurs.
    let output = temp.replace('{%PRODUCTNAME%}', product.productName)
    // So this replaced the PRODUCTNAME and now lets replace all the other ones
    // So up here we have created a variable named output because we want to replace the PRODUCTNAME in temp and it is not a good practice to directly manipulate the argument so we have stored that in a variable.
    // And from now on we will manipulate the previous variable
    output = output.replace('{%IMAGE%}', product.image);
    output = output.replace('{%FROM%}', product.from);
    output = output.replace('{%PRICE%}', product.price);
    output = output.replace('{%NUTRIENTS%}', product.nutrients);
    output = output.replace('{%QUANTITY%}', product.quantity);
    output = output.replace('{%DESCRIPTION%}', product.description);
    output = output.replace('{%ID%}', product.id);
    
    if(!product.organic) output = output.replace('{%NOT_ORGANIC%}', 'not-organic');                         // We have written the not-organic directly because it is a class and can be found in the tmeplate-product.html
    return output;
} 

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProducts = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');  
const dataObj = JSON.parse(data);
const server = http.createServer((req,res) =>{

    const pathName = req.url;

    // overview page
    if(pathName === '/' || pathName === '/overview'){ 
        // Each time there will be a request for this page, we have to read the template-overview.html file.
        // So we are going to do the same thing as we did earlier. We will read this template once, hence we will use the sync for that.
        
        res.writeHead(200, {'Content-type':'text/html'});

        // Now we have to replace the placeholder with the actual cards.
        // So for that we have to loop through this dataObj array and replace the placeholders with the actual cards.
        // We will loop through it using map because we have to return something. This map() function accepts a callback function and this callback function gets as an argument.
        // So we want to replace the placeholders and for that we are creating a function called as replaceTemplate which will take the card and the current element.
        // In each iteration we will replace the placeholders in the tempCard with the current product which is element (el) and this arrow function will implicitly return it here.

        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el));                // map will return this in an array so we want to join this by an empty string. So now cardHtml is truly a string
        const output2 = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
        //console.log(cardHtml);

        res.end(output2);
    }
    // product page
    else if(pathName === '/product'){
        res.end("This is the PRODUCT page");
    }
    // API
    else if(pathName === '/api'){
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