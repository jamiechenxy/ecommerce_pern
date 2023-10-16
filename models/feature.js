const db = require('../db/index');

const getWineType = async() => {
    try {
        const text = 'SELECT type FROM product GROUP BY type';
        
        const result = await db.executeQuery(text);
        
        return result;

    } catch (error) {
        throw(error);
    }};

const getWinePriceRange = async() => {
    try {
        const text = 'SELECT MIN(price), MAX(price) FROM product';

        const result = await db.executeQuery(text);

        return result;

    } catch (error) {
        throw(error);
    }
};

const getGrapes = async() => {
    try {
        const textHead = "WITH v AS (SELECT product_id, UNNEST(STRING_TO_ARRAY(grapes, ',')) as grape FROM product) ";
        const textTail = "SELECT v.grape, COUNT(v.grape) as num FROM v GROUP BY 1 ORDER BY 2 DESC LIMIT 10";
        const text = textHead + textTail;

        const result = await db.executeQuery(text);

        return result;

    } catch (error) {
        throw(error);
    }
};

const getCountry = async() => {
    try {
        const text = 'SELECT country FROM product GROUP BY country';

        const result = await db.executeQuery(text);

        return result;

    } catch (error) {
        throw(error);
    }
};


module.exports = {
    getWineType, getWinePriceRange, getGrapes, getCountry
};