import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { marksToPrices, pricesToMakers } from "../../utils/generateSliderMark";
import { useDispatch, useSelector } from "react-redux";
import { selectConditionPrice, setConditionPrice } from "../../features/productSlice";


const FilterSlider = () => {
    const conditionPrice = useSelector(selectConditionPrice);
    const dispatch = useDispatch();
    const marksPositions = Object.keys(marksToPrices).map(Number);
    const step = marksPositions[1] - marksPositions[0];
    const valueInMark = [Number(pricesToMakers[conditionPrice[0]]), Number(pricesToMakers[conditionPrice[1]])];
    const [priceRange, setPriceRange] = useState(conditionPrice);

    useEffect(() => {
        setPriceRange(conditionPrice);

    }, [dispatch, conditionPrice]);

    const handleChange = (values) => {
        const newPriceRange = [marksToPrices[values[0]], marksToPrices[values[1]]];

        setPriceRange(newPriceRange);
        
        dispatch(setConditionPrice(newPriceRange));
    };
    
    return (
        <fieldset className="products-filters-box" id="filters-price-range-box">
            <legend className="products-filters-box-title">
                <h3>Price Range</h3>
                <h6>GBP</h6>
            </legend>
            <div id="products-filters-box-price">
                <h6>£{priceRange[0]}</h6>
                <h6>£{priceRange[1]}</h6>
            </div>
            <div 
                id="filter-price-range-cube">
                <ReactSlider 
                    className="filter-slider"
                    thumbClassName="filter-slider-thumb"
                    trackClassName="filter-slider-track"
                    markClassName="filter-slider-mark"
                    min={marksPositions[0]}
                    max={marksPositions[marksPositions.length - 1]}
                    pearling
                    minDistance={5}
                    defaultValue={[44, 330]}
                    value={valueInMark}
                    onChange={handleChange}
                    step={step}
                    marks={marksPositions}
                />
            </div>
        </fieldset>

    );
}

export default FilterSlider;