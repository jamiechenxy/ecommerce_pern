import React from "react";
import ContentLoader from "react-content-loader";

const TitleLoading = () => {
    return (
        <ContentLoader
            id="text-line-loading-container"
            width={1000}
            height={150}
            viewBox="0 0 900 150"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
        >
            <rect className="pulse-loading-bar"
                x="10" y="55" rx="5" ry="5" width="250" height="10" 
            />
            <rect className="pulse-loading-bar"
                x="290" y="55" rx="5" ry="5" width="160" height="10" 
            />
            <rect className="pulse-loading-bar"
                x="480" y="55" rx="5" ry="5" width="110" height="10" 
            />
            <rect className="pulse-loading-bar"
                x="10" y="75" rx="5" ry="5" width="170" height="10" 
            />
        </ContentLoader>
    )
};


export default TitleLoading;