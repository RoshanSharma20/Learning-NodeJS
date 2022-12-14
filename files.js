//file system using NodeJS

const fs = require('fs');//fs is built in core module which means file system and is used to efficiently files ans directories

//reading a file
// .readFile is an asynchronous function
fs.readFile('./docs/blog1.txt', (err, data) => {//takes in two arguments 1->relative path of the file to be read ,2-> call back function which fires after executing the operation
    if (err)
        console.log(err);
    console.log(data.toString());//the data is received in the form of buffers, .toString() is used to convert in string format 
});


//writing into a file
// .writeFile is an asynchronous function
fs.writeFile('./docs/blog1.txt', 'hello universe', (err) => {//the relative path of the file needs to be provided,if the file doesn't exist then the file is created automatically
    if (err)
        console.log(err);
    console.log('file updated');
});

//creating and deleting directories
//first we check if the directory exists or not
if (!fs.existsSync('./assets'))//existsSync() is synchronous function
{
    fs.mkdir('./assets', (err) => {//to create a directory 
        if (err)
            console.log(err);
        console.log('directory created');
    });
}
else {
    fs.rmdir('./assets', (err) => {//to remove directory
        if (err)
            console.log(err);
        console.log('directory removed');
    });
}


//deleting a file
//first check if the file exists or not
if (!fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err)
            console.log(err);
        console.log('file removed');
    });
}