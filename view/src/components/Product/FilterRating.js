import React from "react";
import Rating from "../Rating/Rating";

const FilterRating = () => {
    return (
        <fieldset className="products-filters-box" id="filters-wine-rating-box">
            <legend className="products-filters-box-title">
                <h3>Rating</h3>
            </legend>
            <div id="products-filters-box-content-rating">

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="1" />
                    <span className="filter-rating-radio-button"></span>
                    <span className="filter-rating-radio-stars-holder">
                        <Rating rating={4.5} height="0.85em" />
                    </span>
                    <p><span>4.5+</span> Rare stuff</p>
                </label>

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="1" checked />
                    <span className="filter-rating-radio-button"></span>
                    <span className="filter-rating-radio-stars-holder">
                        <Rating rating={4.2} height="0.85em" />
                    </span>
                    <p><span>4.2+</span> Good stuff</p>
                </label>

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="1" />
                    <span className="filter-rating-radio-button"></span>
                    <span className="filter-rating-radio-stars-holder">
                        <Rating rating={3.5} height="0.85em" />
                    </span>
                    <p><span>3.5+</span> Common stuff</p>
                </label>

                <label className="filter-rating-radio">
                    <input type="radio" name="option" value="1" />
                    <span className="filter-rating-radio-button"></span>
                    <p>Any rating</p>
                </label>
            </div>
        </fieldset>
    );
};

export default FilterRating;