const pg = require('pg');
const Pool = pg.Pool; 
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  let params = url.parse(process.env.DATABASE_URL);
  let auth = params.auth.split(':');
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
    user: process.env.PG_USER || null, //env var: PG_USER
    password: process.env.DATABASE_SECRET || null, //env var: PG_PASSWORD
    host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
    port: process.env.DATABASE_PORT || 5432, //env var: PG_PORT
    database: process.env.DATABASE_NAME || 'pokemon_hotel', //env var: PG_DATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}



const pool = new Pool(config);

pool.on('connect', (config)=>{
  console.log('pg has connected to PostGreSQL');
});

pool.on('error', (error)=>{
  console.log(error);
});

module.exports = pool;