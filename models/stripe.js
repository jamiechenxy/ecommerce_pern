const db = require('../db/index');

const addStripeInfo = async (sessionArray) => {
    try {
        const text = "INSERT INTO stripe_session (ss_id, created, amount_total, currency, payment_status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = sessionArray;

        const result = await db.executeQuery(text, values);

        return result;
        
    } catch (error) {
        throw (error);
    }
};

const updateStripePaymentStatus = async (paymentStatus, ssId) => {
    try {
        if (paymentStatus!=='paid') {
            const textForCanceled = "UPDATE stripe_session SET payment_status='canceled' WHERE ss_id=$1 RETURNING *";
            const valuesForCanceled = [ssId];

            const resultForCanceled = await db.executeQuery(textForCanceled, valuesForCanceled);

            return resultForCanceled;
        }

        const text = "UPDATE stripe_session SET payment_status=$1 WHERE ss_id=$2 RETURNING *";
        const values = [paymentStatus, ssId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw (error);
    }
};

const getStripePaymentInfoByUserId = async (userId) => {
    try {
        const text = "SELECT * FROM stripe_session WHERE user_id = $1";
        const values = [userId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw (error);
    }
};

const deleteStripePaymentInfoBySsId = async (ssId) => {
    try {
        const text = "DELETE FROM stripe_session WHERE ss_id = $1 RETURNING *";
        const values = [ssId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw (error);
    }
};

const deleteStripePaymentInfoByUserId = async (userId) => {
    try {
        const text = "DELETE FROM stripe_session WHERE user_id = $1 RETURNING *";
        const values = [userId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw (error);
    }
};


module.exports = { 
    addStripeInfo, updateStripePaymentStatus, 
    getStripePaymentInfoByUserId, deleteStripePaymentInfoBySsId,
    deleteStripePaymentInfoByUserId, 
};