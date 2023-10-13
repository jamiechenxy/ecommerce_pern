import React from "react";
import TastingFeatureFill from "./TastingFeatureFill";
import "../../stylesheets/TastingFeature.css";

const TastingFeature = ({ taste }) => {
    return (
        <div className="tasting-feature-bar">
            {
                [...Array(7)].map((_, index) => {
                        return <TastingFeatureFill taste={taste} index={index} key={index}/>
                })
            }
        </div>
    );
}

export default TastingFeature;
