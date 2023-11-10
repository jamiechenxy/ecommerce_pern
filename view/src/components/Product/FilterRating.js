import React from "react";
import Rating from "../Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
    setCondtionRating, 
    selectConditionRating 
} from "../../features/productSlice";

const FilterRating = () => {
    const dispatch = useDispatch();
    const conditionRating = useSelector(selectConditionRating);

    return (
        <fieldset className="products-filters-box" id="filters-wine-rating-box">
            <legend className="products-filters-box-title">
                <h3>Rating</h3>
            </legend>
            <div id="products-filters-box-rating">

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="4.5" 
                        checked = {conditionRating==4.5 ? true : false}
                        onClick={(e) => dispatch(setCondtionRating(e.currentTarget.value))}
                    />
                    <span className="filter-rating-radio-button"></span>
                    <span className="filter-rating-radio-stars-holder">
                        <Rating rating={4.5} height="0.85em" />
                    </span>
                    <p><span>4.5+</span> Rare stuff</p>
                </label>

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="4.2" 
                        checked = {conditionRating==4.2 ? true : false}
                        onClick={(e) => dispatch(setCondtionRating(e.currentTarget.value))}
                    />
                    <span className="filter-rating-radio-button"></span>
                    <span className="filter-rating-radio-stars-holder">
                        <Rating rating={4.2} height="0.85em" />
                    </span>
                    <p><span>4.2+</span> Good stuff</p>
                </label>

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="3.5" 
                        checked = {conditionRating==3.5 ? true : false}
                        onClick={(e) => dispatch(setCondtionRating(e.currentTarget.value))}
                    />
                    <span className="filter-rating-radio-button"></span>
                    <span className="filter-rating-radio-stars-holder">
                        <Rating rating={3.5} height="0.85em" />
                    </span>
                    <p><span>3.5+</span> Common stuff</p>
                </label>

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="0" 
                        checked = {conditionRating==0 ? true : false}
                        onClick={(e) => dispatch(setCondtionRating(e.currentTarget.value))}
                    />
                    <span className="filter-rating-radio-button"></span>
                    <p>Any rating</p>
                </label>
            </div>
        </fieldset>
    );
};

export default FilterRating;