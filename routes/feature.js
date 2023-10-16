const featureRouter = require('express').Router();
const { 
    getWineType, 
    getWinePriceRange, 
    getGrapes, 
    getCountry 
} = require('../models/feature');


featureRouter.get('/', async (req, res, next) => {
    try {
        const typeRes = await getWineType();
        const priceRangeRes = await getWinePriceRange();
        const grapeRes = await getGrapes();
        const countryRes = await getCountry();
        // console.log(typeRes, priceRangeRes, grapeRes, countryRes);

        if (typeRes.length===0 ) {
            res.status(404);
            throw new Error('Error during getting wine type.');
        };

        if (priceRangeRes.length===0 ) {
            res.status(404);
            throw new Error('Error during getting price range.');
        };

        if (grapeRes.length===0 ) {
            res.status(404);
            throw new Error('Error during getting grapes.');
        };

        if (countryRes.length===0 ) {
            res.status(404);
            throw new Error('Error during getting country.');
        };

        const wineTypes = typeRes.map(obj => obj.type);
        const priceRange = Object.values(priceRangeRes[0]);
        const grapes = grapeRes.map(obj => obj.grape);
        const countries = countryRes.map(obj => obj.country);

        const featureObj = {
            wineTypes,
            priceRange,
            grapes,
            countries
        };
        
        console.log(featureObj);

        res.status(200).json(featureObj);

    } catch (error) {
        next(error);
    }
});


module.exports = featureRouter;