import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { filterActivity } from "../../utils/filterActivity";
import { useDispatch, useSelector } from "react-redux";
import { selectConditionGrapes } from "../../features/productSlice";
import { setConditionGRC } from "../../features/productSlice";

const FilterGrape = ({ grapes }) => {
    const dispatch = useDispatch();
    const conditionGrapes = useSelector(selectConditionGrapes);
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setKeyword(e.currentTarget.value);
    }

    const displayGrapes = () => {
        if (!keyword && grapes.length > 0) {
            return grapes.map((grape, index) => (
                index < 10 ? 
                <div className={`filter-grape-country${filterActivity(grape, conditionGrapes)}`} 
                    key={index}
                    onClick={() => dispatch(setConditionGRC({targetedEle: grape, category: "grapes"}))}
                >
                    {grape}
                </div>
                : ''
            ));
        } else if (keyword && grapes.length > 0) {
            return grapes.map((grape, index) => (
                grape.toLowerCase().includes(keyword.toLowerCase()) ? 
                <div className={`filter-grape-country${filterActivity(grape, conditionGrapes)}`} 
                    key={index}
                    onClick={() => dispatch(setConditionGRC({targetedEle: grape, category: "grapes"}))}
                >
                    {grape}
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