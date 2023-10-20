import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const FilterRegion = ({ regions }) => {
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setKeyword(e.currentTarget.value);
    }

    const displayRegions = () => {
        if (!keyword && regions.length > 0) {
            return regions.map((region, index) => (
                index < 10 ? 
                <div className="filter-grape-country" key={index}>
                    {region}
                </div>
                : ''
            ));
        } else if (keyword && regions.length > 0) {
            return regions.map((region, index) => (
                region.toLowerCase().includes(keyword.toLowerCase()) ? 
                <div className="filter-grape-country" key={index}>
                    {region}
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
                <h3>Regions</h3>
            </legend>
            <div className="products-filters-search-box">
                <MdSearch className="filter-search-icon" />
                <input 
                    className="filter-search-line" 
                    type="text" 
                    placeholder="Search regions" 
                    value={keyword}
                    onChange={handleKeywordChange}
                />
            </div>
            <div className="products-filters-box-grape-country">
                {regions && displayRegions()}
            </div>
        </fieldset>
    );
}

export default FilterRegion;