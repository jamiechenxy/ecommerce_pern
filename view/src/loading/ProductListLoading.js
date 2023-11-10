import React from "react";
import ContentLoader from "react-content-loader";


const ProductListLoading = ({numOfcontainers}) => {
    return (
        <>
            {
                Array.from({length: numOfcontainers}).map((_, index) => (
                        <ContentLoader
                            className="product-list-loading-box"
                            key={index}
                            width={700}
                            height={300}
                            viewBox="0 0 700 300"
                            backgroundColor="#f0f0f0"
                            foregroundColor="#dedede"
                        >
                            {/* rectangle */}
                            <rect x="55" y="42" rx="16" ry="20" width="80" height="216" />
                            {/* line */}
                            <rect x="200" y="113" rx="3" ry="3" width="102" height="7" />
                            <rect x="200" y="91" rx="3" ry="3" width="178" height="6" />
                            <rect x="200" y="139" rx="3" ry="3" width="178" height="6" />
                            <rect x="200" y="162" rx="3" ry="3" width="102" height="7" />
                            <rect x="200" y="189" rx="3" ry="3" width="178" height="6" />

                            {/* <rect x="5" y="8" rx="3" ry="3" width="669" height="2" /> */}
                            {/* cube */}
                            <rect x="495" y="170" rx="14" ry="14" width="100" height="39" />
                            <rect x="470" y="90" rx="3" ry="3" width="150" height="29" />
                        </ContentLoader>
                ))
            }
        </>
    )
}


export default ProductListLoading;