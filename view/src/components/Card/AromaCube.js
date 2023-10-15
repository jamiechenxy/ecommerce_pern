import React from "react";

const AromaCube = ({ aromaElement }) => {
    const aromaName = aromaElement.trim();

    return (
        <div className="aroma-cube">
            <img className="aroma-img"
                src={`/aromaImg/${aromaName}.png`} 
                alt={`icon for ${aromaName} aroma`} 
            />
            <h6>{aromaElement}</h6>
        </div>
    );
}

export default AromaCube;