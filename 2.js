// Non Blocking and Asynchronous Way

// Firstly the file is read and as soon as it is ready callback function will be started. And it calls the callback function with two arguments. The first one is the error and the second one is the actual data. Error is usually the first one. You can specify the file encoding if you need.

// Here "Will read the file" will be printed first and then the data is printed because reading of data will take time and we are doing it in the asynchronous way. Hence other code will be executed until the file is being read.
// Only after the file is read completely then only the codec function will run.

const fs = require('fs');
// fs.readFile('txt/dt.txt','utf-8',(err,data)=>{
//     console.log(data);
// });
// console.log("Will read the file");


// Now we are taking it even further.
// Now the Step will depend on the result of the previous step.

// Here the result of data2 will depend on the result of data1.
// Firstly dt.txt will be read and then that data will be passed to the next step.
// fs.readFile('txt/dt.txt','utf-8',(err,data1)=>{
//     fs.readFile(`txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//     });
// });
// console.log("Will read the file");


// One step further.
// fs.readFile('txt/dt.txt','utf-8',(err,data1)=>{
//     fs.readFile(`txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('txt/et.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//         });
//     });
// });
// console.log("Will read the file");


// Now in the next step we have write both these above strings into a file.

// fs.readFile('txt/dt.txt','utf-8',(err,data1)=>{
//     fs.readFile(`txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('txt/et.txt','utf-8',(err,data3)=>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err =>{               // here we will not write the data because we have not read any.
//                 console.log("Your file is successfully written !!");
//             })
//         });
//     });
// });
// console.log("Will read the file");

// We have not handled any errors yet. So we have to write code for that also.
// If any error occurs, the below written code will be neglected. (eg. file not found, file name is incorrect, etc.)

fs.readFile('txt/dt.txt','utf-8',(err,data1)=>{
    if(err) return console.log("ERROR !! 🤬🤬");

    fs.readFile(`txt/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile('txt/et.txt','utf-8',(err,data3)=>{
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err =>{               // here we will not write the data because we have not read any.
                console.log("Your file is successfully written !!");
            })
        });
    });
});
console.log("Will read the file");