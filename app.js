const express = require('express')
const mongoose = require('mongoose')


const app = express();

const dbURI = 'mongodb+srv://hishamelmorsi:3E694N1Tij1oMtbI@cluster0.jqr1430.mongodb.net/myblog?retryWrites=true&w=majority'

mongoose.connect(dbURI)
    .then( result => app.listen(3000) )
    .catch( (err) => console.log('Could not connect to DB') )

app.set('view engine', 'ejs')


app.use(express.static('public'));



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

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create post'})
})


app.use((req, res) => {
    res.status(404).render('404', {title: '404 Not found'})
})

