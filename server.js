//creating a server using nodejs
const http = require('http');//core module http is required 
const fs = require('fs');


const server = http.createServer((req, res) => {//listens to requests made from the browser
    console.log(req.url, req.method);

    //setting the header 
    // res.setHeader('Content-Type', 'text/plain');//to specify the content that is being sent back to the browser
    // res.write("hello world");//the content to be written 
    // res.end();//end of the response being sent

    // //to send a html response 
    // res.setHeader('Content-Type', 'text/html');
    // res.write("<p>Hello Universe</p>");
    // res.end();

    //to send a html page back to the browser
    res.setHeader('Content-Type', 'text/html');
    //to display webpages according to the requests
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/about-me':
            res.statusCode = 301;//to perform a redirect status-code is a must 
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();//to prevent the page from just remaining hanging in browser
        }
        else {
            // res.write(data);
            // res.end();
            //to write the above lines in shorter form
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log("listening to port number 3000");
});