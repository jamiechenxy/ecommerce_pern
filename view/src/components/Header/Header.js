import "../../stylesheets/Header.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { selectLoginStatus, selectUser } from "../../features/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { PiWineLight, PiShoppingCart } from "react-icons/pi";
import { GiGrapes } from "react-icons/gi";
import { SlLocationPin } from "react-icons/sl";
import { RiUserLine, RiSearchLine } from "react-icons/ri";
import { MdOutlineLocalOffer } from "react-icons/md";
import UserIconDropdown from "./UserIconDropdown";
import HeaderGrapesNav from "./HeaderGrapesNav";
import { 
    selectFilter,
    setConditionGRC,
    setCondtionType,
    adjustToSingleGrapeCondition
} from "../../features/productSlice";



const Header = () => {
    const dispatch = useDispatch();
    const loginStatus = useSelector(selectLoginStatus);
    const userInfo = useSelector(selectUser);
    const filter = useSelector(selectFilter);
    const [showUserIconDropdown, setShowUserIconDropdown] = useState(false);
    // const [showContentNavDropdown, setShowContentNavDropdown] = useState({
    //     grapes: false,
    //     region: false,
    //     offers: false,
    // });
    // console.log('showContentNavDropdown:', showContentNavDropdown);

    const handleClickUserIcon = () => {
        showUserIconDropdown ? setShowUserIconDropdown(false) : setShowUserIconDropdown(true);
    };

    // product dropdown event handlers
    const showProductDropdown = (hideTimoutRef, setVisible) => {
        if (hideTimoutRef.current) {
            clearTimeout(hideTimoutRef.current);
        }

        setVisible(true);
    };

    const hideProductDropdown = (hideTimoutRef, setVisible) => {
        hideTimoutRef.current = setTimeout(() => {
            setVisible(false);
        }, 500)
    };
    //

    // const handleMouseInContentNav = (category) => {
    //     const stateToChange = showContentNavDropdown[category];
    //     setShowContentNavDropdown({
    //         ...showContentNavDropdown,
    //         stateToChange: true,
    //     })
    // };

    return(
        <div id="header-container">
            <div id="top-header">

                <div id="header-logo-search-cube">
                    <NavLink id="header-logo" to="/">
                        <span id="header-logo-j">J·</span>CELLAR
                    </NavLink>
                    <div id="header-search-cube">
                        <RiSearchLine id="header-search-icon" />
                        <input id="header-search-bar" 
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                </div>

                <div id="header-function-cube">
                    {
                        loginStatus ? 
                        <>
                            <nav className="header-function-cube-nav" 
                                onClick={handleClickUserIcon}
                            >
                                <RiUserLine id="header-user-icon" />
                                {showUserIconDropdown && 
                                    <UserIconDropdown 
                                        userInfo={userInfo}
                                    />
                                }
                            </nav>

                            <NavLink className="header-function-cube-nav" 
                                to="/cart"
                            >
                                <PiShoppingCart id="header-cart-icon" />
                            </NavLink>
                        </>
                        :
                        <>
                            <NavLink className="header-function-cube-nav-unsigned-in"  
                                to="/login"
                            >
                                <RiUserLine id="header-user-icon" /> 
                                <h6 id="header-sign-in-text">Sign In</h6>
                            </NavLink>
                        </>
                    }
                </div>
{/* 
                {
                loginStatus ?
                    <>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to={`/${userInfo.firstName.toLowerCase()}`}>
                        <RiUserLine />
                    </NavLink>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/cart">
                        <PiShoppingCartLight />
                    </NavLink>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/orders">My Oders</NavLink>
                    </>
                : 
                    <>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/login">Login</NavLink>
                    <NavLink className={({isActive})=>isActive?"active-navigator":"navigator"} to="/register">Register</NavLink>
                    </>
                } */}
            </div>

            <div id="products-navigation-header">
                <div className="header-content-box">

                    <NavLink className="header-content-box-nav"
                        // className={({isActive})=>isActive?"active-navigator":"navigator"} 
                        // onMouseEnter={handleClickUserIcon}
                        to="/product"
                    >
                        <PiWineLight className="products-navigation-icons"/> 
                        <h6 className="products-navigation-text">Wines</h6>
                    </NavLink>

                    <NavLink className="header-content-box-nav"
                        // className={({isActive})=>isActive?"active-navigator":"navigator"} 
                        to="/product"
                    >
                        <MdOutlineLocalOffer className="products-navigation-icons"/> 
                        <h6 className="products-navigation-text">Offers</h6>
                    </NavLink>

                    
                    <HeaderGrapesNav 
                        dispatch={dispatch}
                        NavLink={NavLink}
                        GiGrapes={GiGrapes}
                        grapes={filter.grapes}
                        showProductDropdown={showProductDropdown}
                        hideProductDropdown={hideProductDropdown}
                        setConditionGRC={setConditionGRC}
                        setCondtionType={setCondtionType}
                        adjustToSingleGrapeCondition={adjustToSingleGrapeCondition}
                    />
                    {/* <NavLink className="header-content-box-nav"
                        // className={({isActive})=>isActive?"active-navigator":"navigator"} 
                        to="/product"
                    >
                        <GiGrapes className="products-navigation-icons"/> 
                        <h6 className="products-navigation-text">Grapes</h6>
                    </NavLink> */}

                    <NavLink className="header-content-box-nav"
                        // className={({isActive})=>isActive?"active-navigator":"navigator"} 
                        to="/product"
                    >
                        <SlLocationPin className="products-navigation-icons"/> 
                        <h6 className="products-navigation-text">Regions</h6>
                    </NavLink>
                    
                </div>
            </div>
        </div>
    );
};


export default Header;