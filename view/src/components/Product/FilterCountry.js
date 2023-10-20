import React, { useState } from "react";
import { MdSearch } from "react-icons/md";


const FilterCountry = ({ countries }) => {
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setKeyword(e.currentTarget.value);
    }

    const displayCountries = () => {
        if (!keyword && countries.length > 0) {
            return countries.map((country, index) => (
                index < 10 ? 
                <div className="filter-grape-country" key={index}>
                    <span className={`fi fi-${country[1]} fis`}></span>
                    {country[0]}
                </div>
                : ''
            ));
        } else if (keyword && countries.length > 0) {
            return countries.map((country, index) => (
                country[0].toLowerCase().includes(keyword.toLowerCase()) ? 
                <div className="filter-grape-country" key={index}>
                    <span className={`fi fi-${country[1]} fis`}></span>
                    {country[0]}
                </div>
                : '' 
            ));
        } else {
            return;
        }
    };

    return (
        <fieldset className="products-filters-box">
            <legend className="products-filters-box-title">
                <h3>Countries</h3>
            </legend>
            <div className="products-filters-search-box">
                <MdSearch className="filter-search-icon" />
                <input 
                    className="filter-search-line" 
                    type="text" 
                    placeholder="Search countries" 
                    value={keyword}
                    onChange={handleKeywordChange}
                />
            </div>
            <div className="products-filters-box-grape-country">
                {countries && displayCountries()}
            </div>
        </fieldset>
    );
};

export default FilterCountry;