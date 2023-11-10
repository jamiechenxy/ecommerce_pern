import React, { useEffect, useRef } from "react";
import { setConditionGRC } from "../../features/productSlice";
import { MdCancel } from "react-icons/md";


const ProductHeadline = ({ numOfSelections, condition, filterType, dispatch }) => {
    const conditionType = condition && condition.type;
    const conditionPrice = condition && condition.price;
    const conditionRating = condition && condition.rating;
    const conditionGRCObj = {
        grapes: condition.grapes,
        region: condition.region,
        country: condition.country,
    };
    const conditionGRCArr = condition.grapes.concat(condition.region, condition.country);
    const conditionGRCRef = useRef([]);

    useEffect(() => {
        conditionGRCRef.current = Object.keys(conditionGRCObj).filter((key) => conditionGRCObj[key].length > 0);
    }, [condition.grapes, condition.region, condition.country]);

    const demonstrateWineType = () => {
        if (conditionType.length===1) {
            return `${conditionType[0]} wine`.toLowerCase();
        } else if (conditionType.length===2) {
            return `${conditionType[0]} wine and ${conditionType[1]} wine`.toLowerCase();
        } else if (conditionType.length > 2) {
            const textOne = conditionType.slice(0, conditionType.length - 1).join(" wine, ").toLowerCase();
            const textTwo = ` wine and ${conditionType[conditionType.length-1]} wine`.toLowerCase();
            return textOne + textTwo;
        } else {
            const textOne = filterType.slice(0, filterType.length - 1).join(" wine, ").toLowerCase();
            const textTwo = ` wine and ${filterType[filterType.length-1]} wine`.toLowerCase();
            return textOne + textTwo;
        }
    };

    const singluarOrPlural = (num, grc) => {
        let word;
        if (num > 1) {
            switch(grc) {
                case "grapes":
                    word = grc;
                    break;
                case "region":
                    word = "regions";
                    break;
                case "country":
                    word = "countries";
                    break;
            }
        } else {
            switch(grc) {
                case "grapes":
                    word = "grape";
                    break;
                case "region":
                case "country":
                    word = grc;
                    break;
            }
        }
        return word;
    };

    const demonstrateGRCText = () => {
        const currentCondition = conditionGRCRef.current;
        if (currentCondition.length===1) {
            const num = conditionGRCObj[currentCondition[0]].length;
            return `From ${num} ${singluarOrPlural(num, currentCondition[0])}`
        } else if (currentCondition.length===2) {
            const numFirst = conditionGRCObj[currentCondition[0]].length;
            const numSecond = conditionGRCObj[currentCondition[1]].length;
            return `From ${numFirst} ${singluarOrPlural(numFirst, currentCondition[0])} and ${numSecond} ${singluarOrPlural(numSecond, currentCondition[1])}`;
        } else if (currentCondition.length > 2) {
            const numFirst = conditionGRCObj[currentCondition[0]].length;
            const numSecond = conditionGRCObj[currentCondition[1]].length;
            const numThird = conditionGRCObj[currentCondition[2]].length;
            return `From ${numFirst} ${singluarOrPlural(numFirst, currentCondition[0])}, ${numSecond} ${singluarOrPlural(numSecond, currentCondition[1])} and ${numThird} ${singluarOrPlural(numThird,currentCondition[2])}`;
        }
    };

    const removeCondition = (targetedEle) => {
        const category = Object.keys(conditionGRCObj).filter(key => conditionGRCObj[key].includes(targetedEle)).toString();
        dispatch(setConditionGRC({targetedEle, category}));
    };


    return (
        <div id="products-headline-container">
            <h2 id="products-headline-box-1">
                { 
                    numOfSelections===0 ? 
                    "No selection matched" : 
                    `Showing ${numOfSelections} selection${numOfSelections < 2 ? "" : "s"} 
                    of ${demonstrateWineType()} 
                    between £${conditionPrice[0]} and £${conditionPrice[1]} 
                    above ${conditionRating} star${Number(conditionRating)>0 ? "s" : ""}` 
                }
            </h2>
            <h2 id="products-headline-box-2">
                {demonstrateGRCText()}
            </h2>
            <div id="products-headline-box-3">
                {
                    conditionGRCArr && conditionGRCArr.map((ele, index) => (
                        <div className={`filter-grape-country-active`} 
                            key={index}
                            onClick={() => removeCondition(ele)}
                        >
                            <span><MdCancel /></span>{ele}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductHeadline;