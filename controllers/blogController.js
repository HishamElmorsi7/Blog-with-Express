const Blog = require('../models/blog')

const blog_index = (req, res) => {

    Blog.find()
        .then( result => {
            res.render('index', {title: 'All blogs', blogs: result})
        })
        .catch( error => {
            console.log('Error')
        })

}

const blog_details = (req, res) => {

    const id = req.params.id

    Blog.findById(id)
        .then((blog) => {
            res.render('details', {title: 'Blog details', blog})
        })
}

const blog_create_get = (req, res) => {
    res.render('create', {title: 'Create blog'})
}

const blog_create_post = (req, res) => {

    const blog = new Blog(req.body);
    blog.save()
    res.redirect('/blogs')

}

const blog_delete =  (req, res) => {

    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=> res.json({redirect: '/blogs'}))
        .catch((error) => console.log(error))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}