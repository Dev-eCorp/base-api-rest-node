const express = require('express');
const morgan = require('morgan');
const config = require('../../config');

class ServerExpress{
    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePathUsers = `${config.api.prefix}/users`;

        this._middlewares();
        this._routes();
    }

    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    _routes() {
        this.app.head('/status', (req, res) => {
            res.status(200).end();
        });

        this.app.use(require(this.basePathUsers, '../../routes/users'));
    }

    async start() {
        this.app.listen(this.port, (error) => {
            if (error) {
                console.log(error);
                process.exit(1);
                return;
            }
        });
    }
}

module.exports = ServerExpress;