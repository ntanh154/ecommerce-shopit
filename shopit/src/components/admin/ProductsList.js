
import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from 'react-router-dom';

import { MDBDataTable } from 'mdbreact';

import Loader from '../Layout/Loader/Loader';
import Sidebar from '../admin/SideBar';
import { toast } from "react-toastify";
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productAction'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
function ProductsList() {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);
    const history = useHistory();
    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error("error");
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Product deleted successfully');
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch, error, deleteError, isDeleted, history]);
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    return (
        <Fragment>
            {/* <MetaData title={'All Products'} /> */}
            <div className="row mt-5">
                <div className="col-12 col-md-2 mt-4">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10 mt-5">
                    <Fragment>
                        <h1 className="my-5">All Products</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    );
}

export default ProductsList;
