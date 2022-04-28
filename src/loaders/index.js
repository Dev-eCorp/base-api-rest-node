const ServerExpress = require('./server/serverExpress');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {
    const server = new ServerExpress();
    logger.info('Express loaded');
    server.start();
    logger.info(`#########################################
      Server is running in port: ${config.port}
      #########################################
    `);
};