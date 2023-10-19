import React, { useState } from "react";
import ReactSlider from "react-slider";
import { generateSliderMark, transformedMarks } from "../../utils/generateSliderMark";


const FilterSlider = () => {
    const [priceRange, setPriceRange] = useState([transformedMarks[44], transformedMarks[330]]);
    // console.log('transformedMarks:', transformedMarks);
    const marksPositions = Object.keys(transformedMarks).map(Number);
    const step = marksPositions[1] - marksPositions[0];
    
    const handleChange = (values, thumb) => {
        // console.log("on change:", values, thumb);
        const newPriceRange = [transformedMarks[values[0]], transformedMarks[values[1]]];
        // console.log('newPriceRange:', newPriceRange);
        setPriceRange(newPriceRange);
    };

    return (
        <div className="products-filters-box" id="filters-price-range-box">
            <div className="products-filters-box-title">
                <h3>Price Range</h3>
                <h6>GBP</h6>
            </div>
            <div className="products-filters-box-middle">
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
                    // withTracks
                    // renderMark={(props) => {
                    //     props.style.left = transformedMarks[props.key.toString()];
                    //     console.log(props);
                    //     return <span {...props}/>
                    // }}
                />
            </div>
        </div>

    );
}

export default FilterSlider;