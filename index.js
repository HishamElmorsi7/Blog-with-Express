// require http core module to be able to create a js server
const http = require('http');
// requiring fs to read the html files
const fs = require('fs')

const server = http.createServer((req, res) => {

    res.setHeader('content-type', 'text/html');
    // reading the file and write it then to the browser
    fs.readFile('./views/index.html', (err, data) => {
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