import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const FilterGrape = ({ grapes }) => {
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setKeyword(e.currentTarget.value);
    }

    const displayGrapes = () => {
        if (!keyword && grapes.length > 0) {
            return grapes.map((grape, index) => (
                index < 10 ? 
                <div className="filter-grape-country" key={index}>
                    {grape}
                </div>
                : ''
            ));
        } else if (keyword && grapes.length > 0) {
            return grapes.map((grape, index) => (
                grape.toLowerCase().includes(keyword.toLowerCase()) ? 
                <div className="filter-grape-country" key={index}>
                    {grape}
                </div>
                : '' 
            ));
        } else {
            return;
        }
    };

    // const handleChangeGrapes = (keyword='') => {
    //     console.log('from handleChangeGrapes, keyword:', keyword);
    //     if (!keyword) {
    //         return grapes
    //     }
    // };

    return (
        <fieldset className="products-filters-box">
            <legend className="products-filters-box-title">
                <h3>Grapes</h3>
            </legend>
            <div className="products-filters-search-box">
                <MdSearch className="filter-search-icon" />
                <input 
                    className="filter-search-line" 
                    type="text" 
                    placeholder="Search grapes" 
                    value={keyword}
                    onChange={handleKeywordChange}
                />
            </div>
            <div className="products-filters-box-grape-country">
                {grapes && displayGrapes()}
            </div>
        </fieldset>
    );
}

export default FilterGrape;