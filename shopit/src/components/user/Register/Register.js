import React, { useState, memo, Fragment, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../../actions/userActions';
function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/image/default_avatar.jpg");


    const dispatch = useDispatch();
    let history = useHistory();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    const { name, email, password } = user;
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
        if (error) {
            console.log(error)
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, history])


    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar);

        try {
            dispatch(register(formData));
            setUser({
                name: "",
                email: "",
                password: ""
            })
            setAvatarPreview("/images/default_avatar.jpg");
        } catch (e) {
            console.log(e)
        }
    }
    const hangelOnChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });

        }
    }
    return (
        <Fragment>
            <h3 className="title-30 text-center mb-30">
                Register your account
            </h3>
            <form className="login-form" action="" onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-inner">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={hangelOnChange}
                                name="name"
                                placeholder="Name"
                            />

                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-inner ">
                            <label htmlFor="password_field">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter Password"
                                value={email}
                                onChange={hangelOnChange}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-inner hidden-icon">
                            <label htmlFor="password_field">Password*</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={hangelOnChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar_upload">Avatar</label>
                        <div className="d-flex align-items-center">
                            <div>
                                <figure className="avatar mr-3 item-rtl">
                                    <img
                                        src={avatarPreview}
                                        className="rounded-pill"
                                        alt="Avatar Preview"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </figure>
                            </div>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="avatar"
                                    className="custom-file-input"
                                    id="customFile"
                                    onChange={hangelOnChange}
                                />
                                <label className="custom-file-label" htmlFor="customFile">
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5">
                        <div className="form-inner">
                            <button
                                className="primary--btn login-btn"
                                type="submit"
                            // disabled={loading ? true : false}
                            >
                                CREATE AN ACCOUNT
                                {/* <Link to="" className="primary--btn login-btn">
                                    
                                </Link> */}
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </Fragment>
    );
}

export default memo(Register);