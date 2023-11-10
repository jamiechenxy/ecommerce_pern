import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectConditionRegion } from "../../features/productSlice";
import { filterActivity } from "../../utils/filterActivity";
import { setConditionGRC } from "../../features/productSlice";

const FilterRegion = ({ region }) => {
    const dispatch = useDispatch();
    const conditionRegion = useSelector(selectConditionRegion);
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setKeyword(e.currentTarget.value);
    }

    const displayRegion = () => {
        if (!keyword && region.length > 0) {
            return region.map((regionEle, index) => (
                index < 10 ? 
                <div className={`filter-grape-country${filterActivity(regionEle, conditionRegion)}`} 
                    key={index}
                    onClick={() => dispatch(setConditionGRC({targetedEle: regionEle, category:"region"}))}
                >
                    {regionEle}
                </div>
                : ''
            ));
        } else if (keyword && region.length > 0) {
            return region.map((regionEle, index) => (
                regionEle.toLowerCase().includes(keyword.toLowerCase()) ? 
                <div className={`filter-grape-country${filterActivity(regionEle, conditionRegion)}`} 
                    key={index}
                    onClick={() => dispatch(setConditionGRC({targetedEle: regionEle, category:"region"}))}
                >
                    {regionEle}
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
                {region && displayRegion()}
            </div>
        </fieldset>
    );
}

export default FilterRegion;