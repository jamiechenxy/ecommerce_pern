import React, { useEffect } from "react";
import { 
    loadFilter, 
} from "../../features/productSlice";
import FilterType from "./FilterType";
import FilterSlider from "./FilterSlider";
import FilterRating from "./FilterRating";
import FilterGrape from "./FilterGrape";
import FilterCountry from "./FilterCountry";
import FilterRegion from "./FilterRegion";

const FilterList = ({ filter, dispatch }) => {

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(loadFilter());
    //     }, 500);
    // }, []);

    return (
        <div id="products-filters-container">
            {filter.type && <FilterType type={filter.type}/>}
            <FilterSlider />
            <FilterRating />
            {filter.grapes && <FilterGrape grapes={filter.grapes}/>}
            {filter.region && <FilterRegion region={filter.region}/>}
            {filter.country && <FilterCountry country={filter.country} countryCode={filter.countryCode}/>}
        </div>
    )
}

export default FilterList;