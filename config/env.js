const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    username: process.env.MONGOOSE_USERNAME,
    password: process.env.MONGOOSE_PASSWORD,
    database: process.env.MONGOOSE_DATABASE
};