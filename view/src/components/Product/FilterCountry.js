import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { filterActivity } from "../../utils/filterActivity";
import { selectConditionCountry } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { setConditionGRC } from "../../features/productSlice";

const FilterCountry = ({ country, countryCode }) => {
    const dispatch = useDispatch();
    const conditionCountry = useSelector(selectConditionCountry);
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setKeyword(e.currentTarget.value);
    }

    const displayCountry = () => {
        if (!keyword && country.length > 0) {
            return country.map((countryEle, index) => (
                index < 10 ? 
                <div className={`filter-grape-country${filterActivity(countryEle, conditionCountry)}`} 
                    key={index}
                    onClick={() => dispatch(setConditionGRC({targetedEle: countryEle, category:"country"}))}
                >
                    <span className={`fi fi-${countryCode[countryEle]} fis`}></span>
                    {countryEle}
                </div>
                : ''
            ));
        } else if (keyword && country.length > 0) {
            return country.map((countryEle, index) => (
                countryEle.toLowerCase().includes(keyword.toLowerCase()) ? 
                <div className={`filter-grape-country${filterActivity(countryEle, conditionCountry)}`} 
                    key={index}
                    onClick={() => dispatch(setConditionGRC({targetedEle: countryEle, category:"country"}))}
                >
                    <span className={`fi fi-${countryCode[countryEle]} fis`}></span>
                    {countryEle}
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
                {country && displayCountry()}
            </div>
        </fieldset>
    );
};

export default FilterCountry;