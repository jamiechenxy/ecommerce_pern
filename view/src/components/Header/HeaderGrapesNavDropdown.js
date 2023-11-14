import React from "react";

const HeaderGrapesNavDropdown = ({ NavLink, adjustToSingleGrapeCondition, dispatch }) => {
    const grapesInNavObj = {
        Red: ["Cabernet Sauvignon", "Malbec", "Grenache", "Merlot", "Pinot Noir", "Nebbiolo", "Shiraz/Syrah", "Tempranillo"],
        White: ["Sauvignon Blanc", "Chardonnay", "Riesling", "Semillon"],
    }

    const handleClickGrapesNav = (grape) => {
        const wineType = Object.keys(grapesInNavObj).filter(key => grapesInNavObj[key].includes(grape));
        console.log(wineType);
        dispatch(adjustToSingleGrapeCondition({wineType, targetEle: grape, category: "grapes"}));
    };
    
    return (
        <div className="header-product-dropdown">
            {
                Object.values(grapesInNavObj).flat() && Object.values(grapesInNavObj).flat().sort().map((grape, index) => (
                    <NavLink className="header-product-dropdown-nav" key={index}
                        onClick = {() => handleClickGrapesNav(grape)}
                        to="/product"
                    >
                        {grape}
                    </NavLink>
                ))
            }
        </div>
    );
}

export default HeaderGrapesNavDropdown;