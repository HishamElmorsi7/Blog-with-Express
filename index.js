const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html')
    res.write('<head> <link rel = "stylesheet" ref = "#x"</head>')
    res.write('<h1>we are going</h1>')
    res.end()
})

server.listen(3000, 'localhost', () => {
    console.log('Server is listening now')
})