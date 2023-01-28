// require http core module to be able to create a js server
const http = require('http');
// requiring fs to read the html files
const fs = require('fs')


const server = http.createServer((req, res) => {

    let path = './views/';
    let url = req.url;

    switch(url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/contact':
            path += 'contact.html'
            res.statusCode = 200;
            break

        case '/contact-me':
            res.statusCode = 301;
            res.setHeader('location', '/contact')
            res.end()
            break
        default:
            path += '404.html'
            res.statusCode = 400
    }

    res.setHeader('content-type', 'text/html');
    // reading the file and write it then to the browser
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log('There is an error')
            res.end();
        } else {
            res.end(data)
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('Server is listening now')
})