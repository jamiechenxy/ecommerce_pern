import React from "react";


const WineInfo = ({ winery, grapes, vintage, country_code, region, country }) => {
    return (
        <ul className="wine-info-cube">
            <li className="wine-info-row">
                <h4 className="wine-info-winery">
                    {winery}
                </h4>
            </li>
            <li className="wine-info-row">
                <h4 className="wine-info-grapes-vintage">
                    {grapes.length>2?'Blend':grapes.join(', ')} {vintage}
                </h4>
            </li>
            <li className="wine-info-row">
                <h4 className="wine-info-region">
                    <span className={`fi fi-${country_code} fis`}></span>
                    {region}, {country}
                </h4>
            </li>
        </ul>
    );
}

export default WineInfo;
