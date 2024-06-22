const http = require('http')
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    if(req.url === "/"){
        res.write("WElcome")
        return res.end();
    }

    if (req.url === "/Home") {
        const filePath = path.join(__dirname, 'home.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write("Server Error");
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(content);
            return res.end();
        });
    }
    if (req.url === "/Mapa") {
        const filePath = path.join(__dirname, 'mapa.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write("Server Error");
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(content);
            return res.end();
        });
    }

})

server.listen(3000)
console.log("Ruge, puta!")