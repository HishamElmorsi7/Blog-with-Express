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

// creating and saving blogs
const blog = new Blog({
    title:'third blog',
    snippet: 'this is a snippet',
    body: 'That is the body'
})

blog.save()
    .then( result => console.log('saved'))
    .catch( error => 'the object wasn not saved')
app.use(express.static('public'));


app.get('/blogs', (req, res) => {
    Blog.find()
    .then( result => {
        res.send(result)
    })
    .catch (
        err => {
            console.log(err)
        }
    )
})


app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// blogs

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create post'})
})

app.get('/', (req, res) => {
    posts = [
        {
            title: "10 Tips for Planning the Perfect Road Trip",
            snippet: "From choosing the right vehicle to mapping out your route, these tips will help you plan an unforgettable road trip."
        },

        {
            title: "5 Easy and Delicious Vegetarian Meal Ideas",
            snippet: "Eating meat-free doesn't have to be boring. Try out these tasty and simple vegetarian meal ideas."
        },

        {
            title: "The Pros and Cons of Working Remotely",
            snippet: "With more and more companies offering remote work options, it's important to weigh the benefits and drawbacks before making the switch."
        }
    ]

    res.render('index', {title: 'Home', posts: posts})
})


app.use((req, res) => {
    res.status(404).render('404', {title: '404 Not found'})
})

