// In this we will take a look at the versioning of the packages
// To update a package, firstly we will check for the outdated packages using the command 'npm outdated' and this will give us a table of all the outdated packages, if any.

// To install the particular version of any package, you can use the version with the command (e.g, 'npm install slugify@2.0.0')
// If '^' is written in front of the version then it means that we accept all the minor updates and patch releases. And if we change it to '~', it means that now we accept only the patch updates.

// Now, to update to the latest version, we can use 'npm update slugify'. 

// To remove/uninstall a package, we use 'npm uninstall slugify'.

// ------

// Now let's say, you want to share your code with someone or you want to move to other computer then you don't need to send the node-modules folder because it can be easily downloaded from the npm

// So to download this folder in the other computer, you just have to use 'npm install' and now this will automatically install all the required dependencies by reading the package.json file.

// ---

// Now if we look at the package-lock.json file, there we have all the versions of all the packages that we are actually using and that also includes the dependencies of our dependencies/
// It is very important because if you share your code, the other developer should know what version of the package we are using. So that the code works the exact same for you and the others.

// So if you are sharing your project to someone, remember to send package.json and package-lock.json file because these files are required to basically reconstruct the node-modules folder.

// Now we have installed the prettier extension, we can create a configuration file.
// This method is preffered because now we can change the configuraions for different files and it also helps all the developers working on the project to use the same config.
// Single quote config will change all the double quotes to the single quotes.