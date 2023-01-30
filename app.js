const express = require('express')

const app = express();

const morgan = require('morgan')

app.set('view engine', 'ejs')

app.listen(3000)

app.use(morgan('dev'))

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
