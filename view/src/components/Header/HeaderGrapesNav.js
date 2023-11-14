import React, { useEffect, useRef, useState } from "react";
import HeaderGrapesNavDropdown from "./HeaderGrapesNavDropdown";
// import { useDispatch, useSelector } from "react-redux";
// import { selectShowHeaderDropdown, toggleShowHeaderDropdown } from "../../features/productSlice";

const HeaderGrapesNav = ({ 
    dispatch, NavLink, GiGrapes, showProductDropdown, hideProductDropdown, 
    setConditionGRC, setCondtionType, adjustToSingleGrapeCondition, 
}) => {
    const [showDropdown, setShowDropDown] = useState(false);
    const dropdownTimeoutRef = useRef();

    useEffect(() => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
    }, []);

    return (
        <NavLink className="header-content-box-nav"
            // className={({isActive})=>isActive?"active-navigator":"navigator"} 
            onMouseEnter = {() => showProductDropdown(dropdownTimeoutRef, setShowDropDown)}
            onMouseLeave = {() => hideProductDropdown(dropdownTimeoutRef, setShowDropDown)}
            to="/product"
        >
            <GiGrapes className="products-navigation-icons"/> 
            <h6 className="products-navigation-text">Grapes</h6>
            {
                showDropdown && 
                <HeaderGrapesNavDropdown 
                    NavLink={NavLink} 
                    setConditionGRC={setConditionGRC} 
                    dispatch={dispatch}
                    adjustToSingleGrapeCondition={adjustToSingleGrapeCondition}
                />
            }
        </NavLink>
    )
}

export default HeaderGrapesNav;