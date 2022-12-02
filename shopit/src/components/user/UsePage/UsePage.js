import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
function UsePage() {
    const [toggleTab, setToggleTab] = useState(1);

    const handleToggleTab = (index) => {
        setToggleTab(index);
    }
    return (
        <section className="login-section pt-60 pb-60" style={{ marginTop: "120px" }}>
            <h1>UsePage</h1>
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-12 col-sm-12 col-8">
                        <ul
                            className="nav nav-pills mb-40  d-flex justify-content-center"
                            id="pills-tab"
                            role="tablist"

                        >
                            <li className="nav-item mb-3 mx-2" role="presentation">
                                <button
                                    className={toggleTab === 1 ? "nav-link active md-nav-btn" : "nav-link md-nav-btn"}
                                    onClick={() => handleToggleTab(1)}
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                >
                                    Register
                                </button>
                            </li>
                            <li className="nav-item mb-3 mx-2" role="presentation">
                                <button
                                    className={toggleTab === 2 ? "nav-link active md-nav-btn" : "nav-link md-nav-btn"}
                                    onClick={() => handleToggleTab(2)}
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                >
                                    Login
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className={toggleTab === 1 ? "tab-pane fade show active" : "tab-pane fade show"}
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                            >
                                <div className="form-wrap box--shadow">
                                    <Register />
                                </div>
                            </div>
                            <div
                                className={toggleTab === 2 ? "tab-pane fade show active" : "tab-pane fade show"}
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                            >
                                <div className="form-wrap box--shadow">
                                    <Login />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default UsePage;