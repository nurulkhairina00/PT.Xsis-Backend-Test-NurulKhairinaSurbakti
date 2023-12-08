const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  access_token: process.env.ACCESS_TOKEN,
  secret: process.env.API_KEY,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
