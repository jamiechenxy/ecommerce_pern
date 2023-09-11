import React from "react";
import ContentLoader from "react-content-loader";


const OrderItemsLoading = ({numOfcontainers}) => {
    return (
        <>
            {
                Array.from({length: numOfcontainers}).map((_, index) => (
                    <ContentLoader
                        className="order-loading-box"
                        key={index}
                        width={900}
                        height={250}
                        viewBox="0 0 900 250"
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect x="0" y="10" rx="10" ry="10" width="150" height="130" />
                        <rect x="200" y="10" rx="10" ry="10" width="150" height="130" />
                        <rect x="400" y="10" rx="10" ry="10" width="150" height="130" />

                        <rect x="700" y="60" rx="4" ry="4" width="170" height="9" />
                        <rect x="700" y="95" rx="3" ry="3" width="60" height="6" />
                        <rect x="778" y="95" rx="3" ry="3" width="20" height="6" />
                    </ContentLoader>
                ))
            }
        </>
    )
}


export default OrderItemsLoading;