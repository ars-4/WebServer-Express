const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

class Server {
    constructor(config) {
        this.config = config;
    }

    runServer() {
        const app = express();

        if (this.config.type === 'static') {
            const staticPath = path.join(process.cwd(), this.config.dir);
            app.use(express.static(staticPath));
            console.log(`Serving static files from ${staticPath}`);
        } else if (this.config.type === 'proxy') {
            app.use('/', createProxyMiddleware({
                target: this.config.target,
                changeOrigin: true,
            }));
            console.log(`Proxying to ${this.config.target}`);
        } else {
            console.log(`Unknown server type: ${this.config.type}`);
            return;
        }

        app.listen(this.config.port, () => {
            console.log(`Server listening on port ${this.config.port}`);
        });
    }
}

module.exports.Server = Server;