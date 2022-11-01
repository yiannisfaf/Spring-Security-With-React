import React, { useEffect } from 'react';
import { ACCESS_TOKEN, login } from '../../util/api';
import { Link, useNavigate } from "react-router-dom";
import { TStore, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { userLogin, LoginRequest } from '../../actions/userActions';


function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error, userToken } = useSelector((state: TStore) => state.user);

    useEffect(() => {
        // redirect user to main if login was successful
        if (userToken) navigate('/');
    }, [navigate, userToken]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const loginRequest = {} as LoginRequest;
        loginRequest.usernameOrEmail = event.target[0].value;
        loginRequest.password = event.target[1].value;

        dispatch(userLogin(loginRequest));
    }

    return (
        <div className="login">
            <div className="login__form">
                <form action="#" className="form" onSubmit={handleSubmit}>
                    <div className="u-margin-bottom-medium">
                        <h2 className="heading-secondary">
                            Log in
                        </h2>
                    </div>

                    <div className="form__group">
                        <input type="text" className="form__input" placeholder="Username or Email" id="usernameOrEmail" required />
                        <label htmlFor="usernameOrEmail" className="form__label">Username or Email</label>
                    </div>

                    <div className="form__group">
                        <input type="password" className="form__input" placeholder="Password" id="password" required />
                        <label htmlFor="password" className="form__label">Password</label>
                    </div>

                    <div className="form__group">
                        <button className="btn btn--green">Log In &rarr;</button>
                    </div>
                </form>

                {
                error ?
                    <div className="error">
                        <div className="error__text">
                            {error}
                        </div>
                    </div> : <></>
                }
                

                <div className="signup">
                    <Link to='/signup'>Don't have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;