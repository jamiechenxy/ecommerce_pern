const checkAuthenticated =  async (req, res, next) => {

    if (req.isAuthenticated()) {
        return next();
    };

    res.status(403).json({ message: 'Access denied. Please log in.' });
};

const compareId = (idInParams, idInUser) => idInParams == idInUser ? true : false;


module.exports = {
    checkAuthenticated, compareId, 
};
