import React from "react";
import { selectConditionType } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { filterActivity } from "../../utils/filterActivity";
import { setCondtionType } from "../../features/productSlice";


const FilterType = ({ type }) => {
    const dispatch = useDispatch();
    const conditionTpye = useSelector(selectConditionType);

    return (
        <fieldset className="products-filters-box" id="filters-wine-type-box">
            <legend className="products-filters-box-title">
                <h3>Wine Types</h3>
                <h6>Select multiple</h6>
            </legend>
            <div id="products-filters-box-type">
                {
                    type && type.map((typeEle, index) => (
                        <div className={`filter-wine-type${filterActivity(typeEle, conditionTpye)}`} 
                            key={index}
                            onClick={() => dispatch(setCondtionType(index))}
                        >
                            <p>{typeEle}</p>
                        </div>
                    ))
                }
            </div>
        </fieldset>
    );
}

export default FilterType;