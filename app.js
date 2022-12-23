//creating a server using express
const express = require('express');
const morgan = require('morgan');//using third-party middleware
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.jrpsn7n.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => app.listen(3000)).catch((err) => console.log(err));

app.set('view engine', 'ejs');

// app.listen(3000);//specify the port number to listen the requests from the browser

//to send a simple html response
// app.get('/', (req, res) => {
//     res.send("<h1>Hello Universe</p>");
// });


//creating a middleware
// app.use((req, res, next) => {
//     console.log('hostname:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });

//third party middleware
app.use(morgan('tiny'));

//middleware and static files
app.use(express.static('public'));//public is the folder-name that is made public to be able to access

//using a middleware offered by express to parse through the post request object
app.use(express.urlencoded({ extended: true }));

//creating a blog to save in mongoAtlas
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'second Blog',
        snippet: 'first snippet',
        body: 'first body'
    });

    //to save in the database
    blog.save().then((result) => res.send(result)).catch((err) => console.log(err));
});

app.get('/blogs', (req, res) => {
    Blog.find().then((result) => res.render('index', { title: 'all-blogs', blogs: result })).catch((err) => console.log(err));
});


//post request
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => res.redirect('/blogs')).catch((err) => console.log(err));
});

//get request using id
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;//to get the id from the parameter
    Blog.findById(id).then((result) => res.render('details', { title: 'blog-details', blog: result })).catch((err) => console.log(err));
});
//request to show all the blogs
// app.get('/all-blogs', (req, res) => {
//     Blog.find().then((result) => res.send(result)).catch((err) => console.log(err));
// });


//to get only a single blog using their id
// app.get('/get-single-blog', (req, res) => {
//     Blog.findById('63a55c5f912c66ebc0211265').then((result) => res.send(result)).catch((err) => console.log(err));
// });
//to send a html page as response
app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    // const blogs = [
    //     { title: 'first title', snippet: 'this is the first snippet' },
    //     { title: 'second title', snippet: 'this is the second snippet' },
    //     { title: 'third title', snippet: 'this is the third snippet' },
    // ];
    // res.render('index', { title: 'Home', blogs });//creating a dynamic page using ejs
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' });
});

//performing a redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})
//sending a response for all other incoming requests
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });//the status code has to be manually set
    res.status(404).render('404', { title: 'error' });
})