const express = require('express')
const blogRouter = express.Router();
const Blog = require('../models/blog')


blogRouter.get('/create', (req, res) => {
    res.render('create', {title: 'Create blog'})
})

blogRouter.get('/:id', (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then((blog) => {
            res.render('details', {title: 'Blog details', blog})
        })
})

blogRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=> res.json({redirect: '/blogs'}))
        .catch((error) => console.log(error))
})

blogRouter.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
    res.redirect('/blogs')
})


blogRouter.get('/', (req, res) => {

    Blog.find()
        .then( result => {
            res.render('index', {title: 'All blogs', blogs: result})
        })
        .catch( error => {
            console.log('Error')
        })
})

module.exports = blogRouter;