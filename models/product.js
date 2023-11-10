const db = require('../db/index');

const getProduct = async (query) => {
    try {
        let num = 2;
        const conditionTextArr = ['WHERE price BETWEEN $1 AND $2'];
        const values = [query.price[0], query.price[1]];

        for (const [key, value] of Object.entries(query)) {
            switch (key) {
                case "type": 
                case "region": 
                case "country":
                    if (value.length===0 || value[0]==='') {
                        continue;
                    } else {
                        const initialSentence = `AND ${key} IN`;
                        const inPlaceHolderArr = value.map((ele) => {
                            num++;
                            values.push(ele);
                            return `$${num}`;
                        });
                        const inPlaceHolder = inPlaceHolderArr.join(',');
                        const inConditionSentence = `${initialSentence} (${inPlaceHolder})`;
                        conditionTextArr.push(inConditionSentence);
                        continue;
                    }

                case "grapes":
                    if (value.length===0 || value[0]==='') {
                        continue;
                    } else {
                        value.forEach((ele) => {
                            num++;
                            const likeCondtionSentence = `AND grapes LIKE $${num}`;
                            conditionTextArr.push(likeCondtionSentence);
                            values.push(`%${ele}%`);
                        });
                        continue;
                    }

                case "rating":
                    num++;
                    const ratingConditionSentence = `AND rating >= $${num}`;
                    conditionTextArr.push(ratingConditionSentence);
                    values.push(value);
                    continue;

                default:
                    continue;
            }
        }

        const conditionText = conditionTextArr.join(' ');

        const text = `SELECT * FROM product ${conditionText} ORDER BY product_id`;

        const result = await db.executeQuery(text, values);

        return result;

    } catch (err) {
        throw err;
    } 
};

const getProductById = async(paramsArray) => {
    try{
        const text = 'SELECT * FROM product WHERE product_id = $1 ORDER BY product_id';
        const values = paramsArray;

        const result = await db.executeQuery(text, values);

        return result;

    } catch (err) {
        throw err;
    }
};

const getStripeProductIdById = async (dbProductId) => {
    try {
        const text = 'SELECT stripe_product_id FROM product WHERE product_id = $1;';
        const values = [dbProductId];

        const result = await db.executeQuery(text, values);

        return result;

    } catch (error) {
        throw error;      
    }
};



module.exports = {
    getProduct, getProductById, getStripeProductIdById,
};