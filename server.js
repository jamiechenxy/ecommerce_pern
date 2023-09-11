const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
require('./util/passport');
const {
    PORT, session_secret, sessionTable,
    caPath, capkPath, baseUrl
} = require('./config');
const session = require('express-session');
const { Pool } = require('pg');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const stripeHooks = require('./routes/stripeHooks');
const apiRouter = require('./routes/api');
const { cn } = require('./db/index');
const fs = require('fs');
const https = require('https');

const app = express();

// configurations of https server
const ca = fs.readFileSync(caPath, 'utf-8');
const capk = fs.readFileSync(capkPath, 'utf-8');

const credentials = { key: capk, cert: ca };
const httpsServer = https.createServer(credentials, app);
// 

const pool = new Pool(cn);

app.use(
    session({
        secret: session_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            domain: ".jcecomm.dev",
        },
        store: new pgSession({
            pool: pool,
            tableName: sessionTable,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: [baseUrl, "https://checkout.stripe.com"],
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
}));

app.use(morgan('dev'));

app.use('/paymentHooks', bodyParser.raw({ type: 'application/json' }), stripeHooks);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Here is jcecomm api home page.');
});

app.use('/api', apiRouter);

app.use(errorhandler());

httpsServer.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
