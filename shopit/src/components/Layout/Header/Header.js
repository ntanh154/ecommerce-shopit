import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/Image/logo';

import { useDispatch, useSelector } from "react-redux";
import { Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Header.css';

import { useCookies } from 'react-cookie';
import { getCategory } from '../../../actions/categoryActions';

import { logout } from '../../../actions/userActions'
function Header() {
    const dispatch = useDispatch();

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { isAuthenticated, user, token } = useSelector((state) => state.auth);
    const { category } = useSelector((state) => state.category);
    const { cartItems } = useSelector((state) => state.cart);
    const logoutHandler = () => {
        dispatch(logout());
        localStorage.setItem('shippingInfo', {});
        toast.success("Logged out successfully.");
        removeCookie('token', { path: '/' });
    };
    useEffect(() => {
        dispatch(getCategory());
    }, [])
    useEffect(() => {
        if (isAuthenticated && token) {
            setCookie('token', token, { path: '/' })
        }
    }, [token])
    return (
        <Fragment>
            <header className="header-1 shadow-lg fixed-top mb-5" style={{ backgroundColor: "#e3e1e1", padding: "0" }}>
                <div className="header-1-wrapper container-fluid">
                    <div
                        className="row"
                        styles={{ justifyContent: 'space-between !important' }}
                    >
                        <div className="col-lg-5 col-md-5 col-sm-2 col-8 d-flex align-items-center">
                            <nav className="main-nav d-none d-lg-block">
                                <ul className="d-flex align-items-center">
                                    <li className="menu-item">
                                        <Link to="/" className="menu-link ">
                                            Hamza
                                        </Link>

                                    </li>
                                    <li>
                                        <ul className="d-flex">
                                            <li>
                                                <nav className="main-nav d-none d-lg-block">
                                                    <ul className="d-flex align-items-center">
                                                        <li className="menu-item">
                                                            <Link to="" className="menu-link ">
                                                                Categories
                                                            </Link>
                                                            <ul className="submenu-home1">
                                                                {category && category.map((category) => (
                                                                    <li>
                                                                        <Link to={`/search/${category.name}`}>
                                                                            {category.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/Contact" className="menu-link">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                        </div>
                        <div className="col-lg-2 col-sm-2 col-md-2 col-4 d-sm-block d-none">
                            <Link to="/" className="header-1-logo text-center">
                                {logo}
                            </Link>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-8 d-sm-block d-none">
                            <div className="header-right d-flex justify-content-end align-items-center">
                                <div className="header-1-icons">
                                    <ul className="d-flex align-items-center">
                                        {isAuthenticated ? (
                                            <>
                                                <li>
                                                    <nav className="main-nav d-none d-lg-block">
                                                        <ul className="d-flex align-items-center">
                                                            <li className="menu-item">
                                                                <figure className="avatar avatar-nav">
                                                                    <img
                                                                        src={user.avatar && user.avatar.url}
                                                                        alt={user && user.name}
                                                                        className="rounded-circle"
                                                                    />
                                                                </figure>
                                                                <Link to="" className="menu-link ">
                                                                    {user.name}
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-caret-down-fill"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                                                    </svg>
                                                                </Link>
                                                                <ul className="submenu-home1">
                                                                    {user && user.role !== "admin" ? (
                                                                        <li>
                                                                            <Link to="/orders/me">Orders</Link>
                                                                        </li>
                                                                    ) : (
                                                                        <li>
                                                                            <Link to="/dashboard">Dashboard</Link>
                                                                        </li>
                                                                    )}

                                                                    <li>
                                                                        <Link to="/me">Profile</Link>
                                                                    </li>
                                                                    <Link
                                                                        to="/"
                                                                        className="text-danger"
                                                                        onClick={logoutHandler}
                                                                    >
                                                                        Logout
                                                                    </Link>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </li>
                                            </>
                                        ) : <li>
                                            <Link to="/login">
                                                <FontAwesomeIcon icon={faUser} className="login-icon mx-3" />
                                            </Link>
                                        </li>}
                                        <li>
                                            <Link to="/cart" style={{ textDacoration: "none" }}>
                                                <div className="cart-btn position-relative ">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-minecart"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7H1.102z" />
                                                    </svg>
                                                    <div className="cart-items-count">
                                                        {cartItems.length}
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="header-1-concat"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );
}

export default Header;