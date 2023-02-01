const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')


// app
const app = express();

// connection with the DB
const dbURI = 'mongodb+srv://hishamelmorsi:3E694N1Tij1oMtbI@cluster0.jqr1430.mongodb.net/myblog?retryWrites=true&w=majority'

mongoose.connect(dbURI)
    .then( result => app.listen(3000) )
    .catch( (err) => console.log('Could not connect to DB') )

//Setting the view engine 
app.set('view engine', 'ejs')


// Using Middlewares

// main

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/blogs')
})


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// blogs

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create post'})
})

app.get('/blogs', (req, res, next) => {

    Blog.find()
        .then( result => {
            res.render('index', {title: 'All blogs', posts: result})
        })
        .catch( error => {
            console.log('Error')
        })
    next()
})


app.use((req, res) => {
    res.status(404).render('404', {title: '404 Not found'})
})

