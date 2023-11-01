const knex = require("knex");

const config = require("../knexfile")[process.env.NODE_ENV]

exports.DB = knex(config);
