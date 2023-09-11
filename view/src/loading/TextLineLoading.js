import React from "react";
import ContentLoader from "react-content-loader";

const TextLineLoading = ({ lines }) => {
    return (
        <>
        {
            Array.from({ length: lines }).map((_, index) => (
                <ContentLoader
                    key={index}
                    id="text-line-loading-container"
                    width={600}
                    height={150}
                    viewBox="0 0 500 150"
                    backgroundColor="#f0f0f0"
                    foregroundColor="#dedede"
                >
                    <rec className="pulse-loading-bar"
                        x="10" y="35" rx="5" ry="5" width="450" height="10" 
                    /> 
                    <rect className="pulse-loading-bar"
                        x="10" y="55" rx="5" ry="5" width="160" height="10" 
                    />
                    <rect className="pulse-loading-bar"
                        x="195" y="55" rx="5" ry="5" width="100" height="10" 
                    />
                    <rect className="pulse-loading-bar"
                        x="315" y="55" rx="5" ry="5" width="70" height="10" 
                    />
                    <rect className="pulse-loading-bar"
                        x="10" y="75" rx="5" ry="5" width="120" height="10" 
                    />
                </ContentLoader>
            ))
        }
        </>
    )
};


export default TextLineLoading;