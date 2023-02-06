const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes.js')


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

// blog
app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', {title: '404 Not found'})
})

