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
        const textTail = "SELECT v.grape FROM v GROUP BY 1 ORDER BY 1";
        const text = textHead + textTail;

        const result = await db.executeQuery(text);

        return result;

    } catch (error) {
        throw(error);
    }
};

const getRegion = async() => {
    try {
        const text = 'SELECT region FROM product GROUP BY 1 ORDER BY 1';

        const result = await db.executeQuery(text);

        return result;

    } catch (error) {
        throw(error);
    }
};

const getCountry = async() => {
    try {
        const text = 'SELECT country, country_code FROM product GROUP BY 1, 2';

        const result = await db.executeQuery(text);

        return result;

    } catch (error) {
        throw(error);
    }
};


module.exports = {
    getWineType, getWinePriceRange, getGrapes, getRegion, getCountry
};