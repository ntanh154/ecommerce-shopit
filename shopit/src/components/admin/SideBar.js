import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [showCategory, setShowCategory] = useState(false);
    const [showProduct, setShowProduct] = useState(false);

    const handleChangeShowCategory = (e) => {
        setShowCategory(!showCategory);
    }
    const handleChangeShowProduct = (e) => {
        setShowProduct(!showProduct);
    }
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components mt-4">
                    <li>
                        <Link to="/dashboard">
                            <i className="fa fa-tachometer"></i> Dashboard
                        </Link>
                    </li>

                    <li onClick={handleChangeShowProduct}>
                        <a
                            href="#productSubmenu"
                            data-toggle="collapse"
                            aria-expanded="false"
                            className="dropdown-toggle"
                        >
                            <i className="fa fa-product-hunt"></i> Products
                        </a>
                        <ul className={showProduct ? "collapse list-unstyled show" : "collapse list-unstyled "} id="productSubmenu">
                            <li>
                                <Link to="/admin/products">
                                    <i className="fa fa-clipboard"></i> All
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/product">
                                    <i className="fa fa-plus"></i> Create
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li onClick={handleChangeShowCategory}>
                        <a
                            href="#categorySubmenu"
                            data-toggle="collapse"
                            aria-expanded="false"
                            className="dropdown-toggle"
                        >
                            <i className="fa fa-product-hunt"></i> Category
                        </a>
                        <ul className={showCategory ? "collapse list-unstyled show" : "collapse list-unstyled"} id="categorySubmenu">
                            <li>
                                <Link to="/admin/category">
                                    <i className="fa fa-clipboard"></i> All
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/category/new">
                                    <i className="fa fa-plus"></i> Create
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders">
                            <i className="fa fa-shopping-basket"></i> Orders
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/users">
                            <i className="fa fa-users"></i> Users
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews">
                            <i className="fa fa-star"></i> Reviews
                        </Link>
                    </li>
                </ul>

            </nav>
        </div>
    );
};

export default Sidebar;
