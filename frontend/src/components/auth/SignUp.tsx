import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { registerUser, SignUpRequest } from '../../actions/userActions';
import { TStore, useAppDispatch } from '../../store';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, success, error } = useSelector((state: TStore) => state.user);

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login');
    }, [navigate, success]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const signUpRequest = {} as SignUpRequest;
        signUpRequest.firstName = event.target[0].value;
        signUpRequest.lastName = event.target[1].value;
        signUpRequest.username = event.target[2].value;
        signUpRequest.email = event.target[3].value;
        signUpRequest.password = event.target[4].value;


        dispatch(registerUser(signUpRequest));
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
                        <button className="btn btn--green">Sign Up &rarr;</button>
                    </div>

                    {
                        error ?
                        <div className="error">
                            <div className="error__text">
                                {error}
                            </div>
                        </div> : <></>
                    }
                </form>
            </div>
        </div>
    );
}

export default SignUp;