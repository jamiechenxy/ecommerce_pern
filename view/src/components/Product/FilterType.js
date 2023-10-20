import React from "react";


const FilterType = ({ wineTypes }) => {
    return (
        <fieldset className="products-filters-box" id="filters-wine-type-box">
            <legend className="products-filters-box-title">
                <h3>Wine Types</h3>
                <h6>Select multiple</h6>
            </legend>
            <div id="products-filters-box-type">
                {
                    wineTypes && wineTypes.map((wineType, index) => (
                        <div className="filter-wine-type" key={index}>
                            <p>{wineType}</p>
                        </div>
                    ))
                }
            </div>
        </fieldset>
    );
}

export default FilterType;