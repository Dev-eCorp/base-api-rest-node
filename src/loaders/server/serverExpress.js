const express = require('express');
const morgan = require('morgan');
const logger = require('../logger');
const config = require('../../config');

class ServerExpress{
    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePathUsers = `${config.api.prefix}/users`;

        this._middlewares();
        this._routes();
        this._notFound();
        this._errorHandler();
    };

    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    };

    _routes() {
        this.app.head('/status', (req, res) => {
            res.status(200).end();
        });

        this.app.use(this.basePathUsers, require('../../routes/users'));
    };

    _notFound() {
        this.app.use((req, res, next) => {
            const err = new Error('Not Found');
            err.code = 404;
            next(err);
        });
    };

    _errorHandler() {
        this.app.use((err, req, res, next) => {
            const code = err.code || 500;
            res.status(code);

            const body = {
                error: {
                    code,
                    message: err.message
                }
            }
            res.status(code).json(body);
        });
    };

    async start() {
        this.app.listen(this.port, (error) => {
            if (error) {
                logger.error(error);
                process.exit(1);
                return;
            }
        });
    };
};

module.exports = ServerExpress;