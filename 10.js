// Third party modules.

const fs = require('fs');
const url = require('url');
const http = require('http');

const slugify = require('slugify');
// This slugify will be used as a function to create slugs.
// A slug is basically the last part of the url that contains a unique string that identifies the resource that the website is displaying

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProducts = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

//console.log(slugify('Fresh Avocados', {lower: true}));
// Now we have created a slug out of our intial Fresh Avocados string. Let's now do that for all of our products. They are in the data object, so we are creating a string for that

const server = http.createServer((req, res) => {
  //console.log(url.parse(req.url, true));

  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

    res.end(output);
  }

  // product page
  else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProducts, product);
    res.end(output);
  }

  // API
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }
  // Not Found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-custom-header': 'hello-world',
    });
    res.end('<h1>"PAGE NOT FOUND !!"</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000.');
});
