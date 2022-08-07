const express = require('express');
const path = require('path');
class Server {
    constructor(dir) {

        this.runServer = (_port) => {

            let server = express();

            server.use(
                express.static(path.join(dir)), (err) => {
                    if(err) {
                        console.log("Cannot GET " + err.path);
                    }
                }
                );

            server.get('/', (req, res) => {
                res.sendFile(
                    path.join(dir, "index.html"),
                    (err) => {
                        console.log("File not found");
                        res.end();
                    });
            }) // server.get

            server.listen(
                (_port),
                () => { console.log(`Listening on port ${_port}`) }
            ) // Listen
        } //runServer

    } //constructor
} // Server

module.exports.Server = Server;