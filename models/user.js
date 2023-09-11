const db = require('../db/index');

const findUserById = async (id) => {
    try {
        const text = 'SELECT * FROM user_info WHERE user_id = $1';
        const values = [id];

        const user = await db.executeQuery(text, values);

        return user;

    } catch(err) {
        throw err;
    }
};

const findUserIdByEmail = async (email, authMethod='local') => {
    try {
        let text;
        if (authMethod==='local') {
            text = "SELECT user_id FROM user_info WHERE email = $1 AND auth_method = 'local'";
        } else {
            if (authMethod!=='google') {
                const methodError = new Error('Invalid auth method.');
            };
            text = "SELECT user_id FROM user_info WHERE email = $1 AND auth_method = 'google'";
        };

        const values = [email];

        const userId = await db.executeQuery(text, values);

        return userId;

    } catch(err) {
        throw err;
    }
};

const findUserByEmail = async (email, authMethod='local') => {
    try {
        let text;
        if (authMethod==='local') {
            text = "SELECT * FROM user_info WHERE email = $1 AND auth_method = 'local'";
        } else {
            if (authMethod!=='google') {
                const methodError = new Error('Invalid auth method.');
            };
            text = "SELECT * FROM user_info WHERE email = $1 AND auth_method = 'google'";
        };

        const values = [email];

        const user = await db.executeQuery(text, values);

        return user;

    } catch(err) {
        throw err;
    }
};

const createUser = async (valuesArray, authMethod='local') => {
    try {
        let textTail
        if (authMethod==='local') {
            textTail = "VALUES ($4, $3, $1, $2, NOW(), '-1', 'local') RETURNING email, first_name, last_name, picture";
        } else {
            if (authMethod!=='google') {
                const methodError = new Error('Invalid auth method.');
            };
            textTail = "VALUES ('-1', $1, $2, $3, NOW(), $4, 'google') RETURNING email, first_name, last_name, picture";
        };

        const textHead = "INSERT INTO user_info (password, email, first_name, last_name, created, picture, auth_method) ";
        const text = textHead + textTail;
        values = valuesArray;

        const newUser = await db.executeQuery(text, values);

        return newUser;

    } catch(err) {
        throw err;
    }
};

const updateUserById = async (valuesArray, id) => {
    try {
        valuesArray.push(['modified', 'NOW()']);
    
        const textHead = 'UPDATE user_info ';
        const textBody = 'SET $1~ = $2 WHERE user_id = $3 RETURNING *';
        const text = textHead + textBody;
            
        for (let i=0; i < valuesArray.length; i++) {
    
            let values = [valuesArray[i][0], valuesArray[i][1], id];
    
            const result = await db.executeQuery(text, values);
        
            if (i===valuesArray.length-1) {
                const record = result[0];
                return record;
            };
        };
        
        return record;

    } catch (error) {
        throw error;
    }
};

const getSession = async (sid) => {
    try {
        const text = "SELECT sid FROM user_session WHERE sid = $1";
        const values = [sid];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw error;
    }
};

const deleteUserSession = async (sid) => {
    try {
        const text = "DELETE FROM user_session WHERE sid = $1";
        const values = [sid];

        const result = await db.executeQuery(text, values);

        return result;
        
    } catch (error) {
        throw error;      
    }
};



const verifyUserByEmail = async(email, cb) => {
    process.nextTick(async function() {

        const result = await findUserByEmail(email);

        if (result.length === 0) {
            return cb(null, false);
        };

        return cb(null, result[0]);

    })
};

const verifyUserById = async(id, cb) => {
    process.nextTick(async function() {
        
        const result = await findUserById(id);

        if (result.length === 0) {
            return cb(null, false);
        };

        return cb(null, result[0]);

    })
};


module.exports = {
    createUser, findUserIdByEmail, 
    findUserByEmail, verifyUserByEmail, 
    findUserById, verifyUserById,
    updateUserById, deleteUserSession,
    getSession, 
};