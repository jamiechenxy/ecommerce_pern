import "../../stylesheets/Register.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, selectLoginStatus, selectUser } from "../../features/sessionSlice";


const Register = () => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const loginStatus = useSelector(selectLoginStatus);
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (loginStatus) {
            const timeout = setTimeout(() => {
                navigate(`/${userInfo.firstName}`);
            }, 2000);
            return () => {
                clearTimeout(timeout);
            }
        };
    }, [loginStatus]);

    const handleRegisterSubmit = async(e) => {
        e.preventDefault();
        await dispatch(registerUser({
            firstName, lastName, email, password
        }));
    };


    return (
        <div id="register-body-container">
            <div id="register-main-container">
                <h2 id="register-title">Join Us For The Finest Selections!</h2>

                <form id="register-form" onSubmit={handleRegisterSubmit}>

                    <div className="input">
                        <label className="input-label" htmlFor="firstname">
                            <h4>Firstname: </h4>
                        </label>
                        <input className="input-field" type="text" 
                            id="firstname" name="firstname" 
                            onChange={(e) => setFirstName(e.currentTarget.value)}
                            value={firstName}
                        />
                    </div>

                    <div className="input">
                        <label className="input-label" htmlFor="lastname">
                            <h4>Lastname: </h4>
                        </label>
                        <input className="input-field" type="text" 
                            id="lastname" name="lastname" 
                            onChange={(e) => setLastName(e.currentTarget.value)}
                            value={lastName}
                        />
                    </div>

                    <div className="input">
                        <label className="input-label" htmlFor="email">
                            <h4>Email: </h4>
                        </label>
                        <input className="input-field" type="text" 
                            id="email" name="email" 
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            value={email}
                        />
                    </div>

                    <div className="input">
                    <label className="input-label" htmlFor="password">
                        <h4>Password: </h4>
                    </label>
                        <input className="input-field" type="text"
                            id="password" name="password" 
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            value={password}
                        />
                    </div>

                    <button id="submit-button" type="submit">
                        <h4>Confirm</h4>
                    </button>

                </form>
            </div>
        </div>

    );
};



export default Register;