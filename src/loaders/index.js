const ServerExpress = require('./server/serverExpress');
const config = require('../config');

module.exports = async () => {
    const server = new ServerExpress();
    console.log('Express loaded');
    server.start();
    console.log('#########################################');
    console.log(`Server is running in port: ${config.port}`);
    console.log('#########################################');
};