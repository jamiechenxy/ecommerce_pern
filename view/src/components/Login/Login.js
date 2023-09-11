import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    loginByGoogle, loginByLocal, selectLoginStatus, selectUser, 
} from "../../features/sessionSlice";
import { NavLink, useNavigate } from "react-router-dom";
import "../../stylesheets/Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [promptLocalUser, setPromptLocalUser] = useState(false);
    const [promptGoogleUser, setPromptGoogleUser] = useState(false);
    const loginStatus = useSelector(selectLoginStatus);
    const userInfo = useSelector(selectUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        /* global google */
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogleCallBackRes,
        });

        window.google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large" },
        );

        if (loginStatus) {
            navigate(`/${userInfo.firstName.toLowerCase()}`);
        } else {
            navigate("/login");
        }

    }, [loginStatus]);


    const handleGoogleCallBackRes = async(response) => {
        setPromptLocalUser(false);
        setPromptGoogleUser(false);

        const res = await dispatch(loginByGoogle({ut: response.credential}));

        if (res.meta.requestStatus==="rejected") {
            setPromptGoogleUser(true);
        };
    };
    
    const handleLocalSignIn = async (e) => {
        e.preventDefault();
        setPromptLocalUser(false);
        setPromptGoogleUser(false);

        const response = await dispatch(loginByLocal({
            email, 
            password,
        }));

        if (response.meta.requestStatus==="rejected") {
            setPromptLocalUser(true);
        };

        setEmail('');
        setPassword('');

    };

    const onSetEmail = (e) => {
        setPromptLocalUser(false);
        setEmail(e.currentTarget.value);
    };

    const onSetPassword = (e) => {
        setPromptLocalUser(false);
        setPassword(e.currentTarget.value);
    };


    return (
        <div id="login-body-container">
            <div id="login-main-container">
                <h2 id="login-title">Sign In For Delightful Experience!</h2>
                <form id="login-form" onSubmit={handleLocalSignIn}>
                    <div className="input">
                        <label className="input-label">
                            <h4>Email:</h4>
                        </label>
                        <input className="input-field" id="email"
                            type="text" name="email"
                            onChange={onSetEmail}
                            value={email}
                        />
                    </div>
                    <div className="input">
                        <label className="input-label">
                            <h4>Password:</h4>
                        </label>
                        <input className="input-field" id="password"
                            // type="password" 
                            name="password" type="text"
                            onChange={onSetPassword}
                            value={password}
                        />
                    </div>
                    <button id="submit-button" type="submit">
                        <h4>Confirm</h4>
                    </button>
                </form>
                { 
                    promptLocalUser ? 
                        <p className="prompt-text">Invalid email or password. Please try again.</p> 
                    : 
                        ''
                }
                {
                    promptGoogleUser ?
                        <p className="prompt-text">Authentication failed.</p> 
                    :
                        ''
                }
                <div id="redirect-to-register">
                    <NavLink id="redirect-to-register-link" to="/register">
                        New here? Sign Up
                    </NavLink>
                </div>
                <div id="third-party-auth-container">
                    <h4>Or Sign In With:</h4>
                    <div id="third-party-auth-box">
                        <div className="third-party-auth" id="googleSignInDiv"></div>
                    </div>
                </div>
            </div>
        </div>     
    )
};


export default Login;