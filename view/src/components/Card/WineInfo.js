import React from "react";
import "../../stylesheets/WineInfo.css";

const WineInfo = ({ winery, grapes, vintage, country_code, region, country }) => {
    return (
        <div className="wine-info-card">
            <div className="wine-info-row">
                <h4 className="wine-info-winery">
                    {winery}
                </h4>
            </div>
            <div className="wine-info-row">
                <h4 className="wine-info-grapes-vintage">
                    {grapes.length>2?'Blend':grapes.join(', ')} {vintage}
                </h4>
            </div>
            <div className="wine-info-row">
                <h4 className="wine-info-region">
                    <span className={`fi fi-${country_code} fis`}></span>
                    {region}, {country}
                </h4>
            </div>
        </div>
    );
}

export default WineInfo;
