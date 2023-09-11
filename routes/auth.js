const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { rounds } = require('../config');
const {
    createUser,
    findUserIdByEmail,
    findUserById
} = require('../models/user');
require('../util/passport');
const passport = require('passport');
const jwtDecode = require('jwt-decode');

authRouter.get('/status', async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            res.status(200).json({ 
                authenticated: true,
                userId: req.session.passport.user,
            });
        } else {
            res.status(200).json({ authenticated: false });
        }
    } catch (error) {
        next(error);
    }
});

authRouter.post('/register', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userId = await findUserIdByEmail(email);
    
        if (userId.length !== 0) {
            res.status(400);
            throw new Error('The email is existed. Redirecting to login page.');
        }; 
    
        const salt = await bcrypt.genSalt(Number(rounds));
        const hashed = await bcrypt.hash(password, salt);
    
        let valuesArray = Object.values(req.body);
        valuesArray[3] = hashed;
    
        const newUser = await createUser(valuesArray);
        
        if (newUser.length===0) {
            res.status(500);
            throw new Error('Error occurred during user creation.');  
        };
    
        res.status(201).send(newUser[0]);
        
    } catch (error) {
        next(error);
    }
});

authRouter.get('/login', (req, res) => {
    // this route is currently designed for redirections from failure login
    // to send rejected msg. 
    res.json({ info: 'This is the login page.' });
    // res.render('login');
});

authRouter.post(
    '/login',
    passport.authenticate(('local'), 
    // { 
    //     // successRedirect: '/api/users/profile',
    //     failureRedirect: '/api/auth/login', 
    //     failureMessage: true 
    // }
    ), 
    (req, res, next) => {  
        try {
            if (!req.user || req.user.length===0) {
                res.status(401).end();
            };

            res.status(200).send(req.user);
            
        } catch (error) {
            next({error});
        }  
    }
);

authRouter.post('/google', async (req, res, next) => {
    try {
        const token = req.body.ut;
        const decoded = jwtDecode(token);

        const userObj = {
            email: decoded.email,
            first_name: decoded.given_name,
            last_name: decoded.family_name,
            picture: decoded.picture,
        };

        const userId = await findUserIdByEmail(userObj.email, 'google');
        
        // if user already existed in db.
        if (userId.length!==0) {
            // save userId into req.session
            req.session.passport = { user: userId[0].user_id };
            // store the req.session
            req.session.save(err => {
                if(err) {
                    console.error('Error saving session:', err);
                    return res.status(500).send('Failed to save session');
                }
            });

            const googleUser = await findUserById(userId[0].user_id);

            const user = {
                ...googleUser[0],
            };

            return res.status(200).send(user).end();
        }; 

        // below is for google user to sign in for the 1st time.
        const valuesArray = Object.values(userObj);

        const newUser = await createUser(valuesArray, 'google');
        
        if (newUser.length===0) {
            res.status(500);
            throw new Error('Error occurred during user creation.');  
        };

        req.session.passport = { user: newUser[0].user_id };
    
        res.status(201).send(newUser[0]);
        
    } catch (error) {
        next(error);
    }
});



module.exports = authRouter;
