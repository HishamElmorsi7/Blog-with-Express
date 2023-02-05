const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


// app
const app = express();

// connection with the DB
const dbURI = 'mongodb+srv://hishamelmorsi:3E694N1Tij1oMtbI@cluster0.jqr1430.mongodb.net/myblog?retryWrites=true&w=majority'

mongoose.connect(dbURI)
    .then( result => app.listen(3000) )
    .catch( err => console.log(err) )

//Setting the view engine 
app.set('view engine', 'ejs')


// Using Middlewares
app.use(express.static('public'));
app.use(express.urlencoded());

// main


app.get('/', (req, res) => {
    res.redirect('/blogs')
})


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// blogs


app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create blog'})
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then((blog) => {
            res.render('details', {title: 'Blog details', blog})
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    res.redirect('/blogs')
})


app.get('/blogs', (req, res) => {

    Blog.find()
        .then( result => {
            res.render('index', {title: 'All blogs', blogs: result})
        })
        .catch( error => {
            console.log('Error')
        })
})


app.use((req, res) => {
    res.status(404).render('404', {title: '404 Not found'})
})

