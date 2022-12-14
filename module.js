const { people, ages } = require('./people');//to import any file we need to specify the path of the file being imported
//if we are importing any file that has multiple items that are exported then we need to refer it by the actual variable names
//we can also write it as 
//const xyz=require('./people');
//console.log(xyz.people,xyz.ages);  ->it will also work in the same way
console.log(people, ages);
const os = require('os');//node js comes with inbuilt core modules
console.log(os.platform(), os.homedir());//gives operating system details and the current home directory