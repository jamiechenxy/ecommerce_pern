import React from "react";
import ContentLoader from "react-content-loader";


const ItemListLoading = ({numOfcontainers}) => {
    return (
        <>
            {
                Array.from({length: numOfcontainers}).map((_, index) => (
                    <ContentLoader
                        key={index}
                        width={500}
                        height={250}
                        viewBox="0 0 500 250"
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect x="110" y="10" rx="10" ry="10" width="190" height="170" />
                        <rect x="330" y="50" rx="3" ry="3" width="120" height="6" />
                        <rect x="330" y="70" rx="3" ry="3" width="110" height="6" />
                        <rect x="330" y="90" rx="3" ry="3" width="100" height="6" />
                        <rect x="330" y="130" rx="4" ry="4" width="170" height="9" />
                    </ContentLoader>
                ))
            }
        </>
    )
}


export default ItemListLoading;