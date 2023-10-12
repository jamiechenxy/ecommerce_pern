import React from "react";
import "../../stylesheets/WineImgDynamic.css";

const WineImg = ({ hovered, picture }) => {

    return (
        <img className={`product-img${hovered?'-hovered':''}`}
            src={`/wineImg/${picture}.png`}
            alt={`${picture} sample picture`} 
        />
    );
}

export default WineImg;
