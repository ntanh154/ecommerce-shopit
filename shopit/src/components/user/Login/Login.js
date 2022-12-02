import React, { useState, Fragment, memo, useEffect } from 'react';
// import MetaData from '../../Layout/MetaData/MetaData';
import { login, clearErrors } from '../../../actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();


    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
    const redirect = location.search ? location.search.split("=")[1] : "/";
    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <Fragment>
            {/* <MetaData title="Login" /> */}
            <h3 className="title-30 text-center mb-20">Login your account</h3>
            <form className="login-form" onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-inner">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="fname"
                                placeholder="Email"
                            />

                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-inner hidden-icon">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                name="fpassword"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-inner d-flex justify-content-end">
                            <Link to="/password/forget" className="forget-password">
                                Forgetten password?
                            </Link>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-inner">
                            <button
                                className="primary--btn login-btn"
                                type="submit"
                            >
                                login ACCOUNT
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}

export default memo(Login);