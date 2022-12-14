const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog2.txt', { encoding: 'utf8' });//creating a readStream to read from the specified location
const writeStream = fs.createWriteStream('./docs/blog3.txt');//creating a writeStream to write into the specified file location

// readStream.on('data', (chunk) => {//this is an event listener,listening to the data event and writing the chunk data into the writeStrean
//     writeStream.write(chunk);
// });

//instead of the above specified process to read from a file and write into other,we use the piping concept


//piping
readStream.pipe(writeStream);