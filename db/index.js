const {DB} = require('../config');
const pgp = require('pg-promise')({ capSQL: true });

const cn = {
  user: DB.PGUSER,
  host: DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPWD,
  port: DB.PGPORT,
  max: DB.MAXCONN, 
};

const db = pgp(cn);


const executeQuery = async (text, values) => {
    try {
        const res = await db.any(text, values);
        return res;
    } catch(error) {
        throw error;
    }
};


module.exports = {
    executeQuery, cn
};


