import React from "react";

const TastingFeatureFill = ({ taste, index }) => {
    return (
        <div className={`${taste===index+1 ? 'filled' : 'unfilled'}-feature-bar`} 
            style={{width: `${100/7}%`, height: '100%'}} 
        >
        </div>
    );
}

export default TastingFeatureFill;