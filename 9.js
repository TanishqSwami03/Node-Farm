//To install a module as a development dependency. 
//           npm install module-name --save-dev

// we have to now install slugify 

//nodemon library automatically restarts the server whenever we make any changes to the code and we use it as a development dependency. After that, now our project knows that we depend on nodemon to develop the applications

//To install a package globally so that we can use it anytime we want and there will be no need to install it again and again for any program.

// Before we run our program like 'node 8.js' but now we have to run it like 'nodemon 8.js'. 
// And now nodmon will do the magic and automatically restarts the server whenever we do any changes to the code.

// To use nodemon if we have downloaded it globally, we can write script for that in the scipt section of the package.json  like
// "start" : "nodemon 8.js"
// Now to run this script we write 'npm run start'

// Now we are using the third party modules and the order for using these modules are inbuilt -> third party -> local modules.

// For example, in our project we are getting urls containing product id's and all but if we want a unique name for that, we will use slugify for that. 