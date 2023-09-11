require('dotenv').config();

const DB = {
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGDATABASE: process.env.PGDATABASE,
    PGPWD: process.env.PGPWD,
    PGPORT: process.env.PGPORT,
    MAXCONN: process.env.MAXCONN,
}; 

const PORT = process.env.PORT;

const rounds = process.env.rounds;

const session_secret = process.env.SESSION_SCRET;
const sessionTable = process.env.SESSION_TABLE;

const gClientId = process.env.GOOGLE_CLIENT_ID;
const gClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const baseUrl = process.env.BASE_URL;

const caPath = process.env.CA_PATH;
const capkPath = process.env.CAPK_PATH;

module.exports = {
    DB, PORT, rounds, session_secret, 
    gClientId, gClientSecret, baseUrl, 
    sessionTable, caPath, capkPath,
};
