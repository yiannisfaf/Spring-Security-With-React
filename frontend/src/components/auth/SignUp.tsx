import React from 'react';
import { ACCESS_TOKEN, signup } from '../../util/api';
import { useNavigate } from "react-router-dom";

export interface SignUpRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const signUpRequest = {} as SignUpRequest;
        signUpRequest.firstName = event.target[0].value;
        signUpRequest.lastName = event.target[1].value;
        signUpRequest.username = event.target[2].value;
        signUpRequest.email = event.target[3].value;
        signUpRequest.password = event.target[4].value;


        signup(signUpRequest)
        .then((res: any) => {
            localStorage.setItem(ACCESS_TOKEN, res.accessToken);
            navigate("/");
        }).catch(error => {
            //TODO: Figure out error handling
            console.log('error', error);
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
                            Sign Up
                        </h2>
                    </div>

                    <div className="form__group">
                        <input type="text" className="form__input" placeholder="First Name" id="firstName" required />
                        <label htmlFor="firstName" className="form__label">First Name</label>
                    </div>

                    <div className="form__group">
                        <input type="text" className="form__input" placeholder="Last Name" id="lastName" required />
                        <label htmlFor="lastName" className="form__label">Last Name</label>
                    </div>

                    <div className="form__group">
                        <input type="text" className="form__input" placeholder="Username" id="username" required />
                        <label htmlFor="username" className="form__label">Username</label>
                    </div>

                    <div className="form__group">
                        <input type="text" className="form__input" placeholder="Email" id="email" required />
                        <label htmlFor="email" className="form__label">Email</label>
                    </div>

                    <div className="form__group">
                        <input type="password" className="form__input" placeholder="Password" id="password" required />
                        <label htmlFor="password" className="form__label">Password</label>
                    </div>

                    <div className="form__group">
                        <button className="btn btn--green">Log In &rarr;</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;