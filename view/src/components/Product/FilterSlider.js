import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { generateSliderMark, transformedMarks } from "../../utils/generateSliderMark";
import { useDispatch } from "react-redux";
import { setConditionPrice } from "../../features/productSlice";


const FilterSlider = () => {
    const dispatch = useDispatch();
    const debounceTimeoutRef = useRef();
    const [priceRange, setPriceRange] = useState([transformedMarks[44], transformedMarks[330]]);
    const marksPositions = Object.keys(transformedMarks).map(Number);
    const step = marksPositions[1] - marksPositions[0];

    const debouncedAction = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            dispatch(setConditionPrice(priceRange));
        }, 500);

    }, [priceRange, dispatch]);

    useEffect(() => {
        debouncedAction();

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        }

    }, [priceRange, debouncedAction]);
    
    const handleChange = (values, thumb) => {
        const newPriceRange = [transformedMarks[values[0]], transformedMarks[values[1]]];
        setPriceRange(newPriceRange);
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
                    onChange={handleChange}
                    step={step}
                    marks={marksPositions}
                />
            </div>
        </fieldset>

    );
}

export default FilterSlider;