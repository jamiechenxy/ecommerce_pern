import React from "react";


const FilterType = ({ wineTypes }) => {
    return (
        <div className="products-filters-box" id="filters-wine-type-box">
            <div className="products-filters-box-title">
                <h3>Wine Types</h3>
                <h6>Select multiple</h6>
            </div>
            <div className="products-filters-box-content">
                {
                    wineTypes && wineTypes.map((wineType, index) => (
                        <div className="filter-wine-type" key={index}>
                            <p>{wineType}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FilterType;