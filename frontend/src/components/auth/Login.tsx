import React from 'react';
import { ACCESS_TOKEN, login } from '../../util/api';
import { Link, useNavigate } from "react-router-dom";


export interface LoginReqeust {
    usernameOrEmail: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const loginRequest = {} as LoginReqeust;
        loginRequest.usernameOrEmail = event.target[0].value;
        loginRequest.password = event.target[1].value;

        login(loginRequest)
        .then((res: any) => {
            localStorage.setItem(ACCESS_TOKEN, res.accessToken);
            navigate("/");
        }).catch(error => {
            console.log(error, error.status);
            //TODO: Figure out error handling
            if(error.status === 401) {
                return <div className="error">Your Username or Password is incorrect. Please try again!</div>                 
            } else {
                return <div className="error">{error.message}</div>                                                          
            }
        });
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

                <div className="signup">
                    <Link to='/signup'>Don't have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;