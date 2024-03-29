import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

// import MetaData from '../layout/MetaData'
import Loader from '../Layout/Loader/Loader';
import Sidebar from './SideBar';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, deleteUser, clearErrors } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userContants';

const UsersList = ({ history }) => {

	const dispatch = useDispatch();

	const { loading, error, users } = useSelector(state => state.allUsers);
	const { isDeleted } = useSelector(state => state.user)

	useEffect(() => {
		dispatch(allUsers());

		if (error) {
			toast.error(error);
			dispatch(clearErrors())
		}

		if (isDeleted) {
			toast.success('User deleted successfully');
			history.push('/admin/users');
			dispatch({ type: DELETE_USER_RESET })
		}

	}, [dispatch, error, isDeleted, history])

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id))
	}

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: 'User ID',
					field: 'id',
					sort: 'asc'
				},
				{
					label: 'Name',
					field: 'name',
					sort: 'asc'
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc'
				},
				{
					label: 'Role',
					field: 'role',
					sort: 'asc'
				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: []
		}

		users.forEach(user => {
			data.rows.push({
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,

				actions: <Fragment>
					<Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
						<i className="fa fa-pencil"></i>
					</Link>
					<button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
						<i className="fa fa-trash"></i>
					</button>
				</Fragment>
			})
		})

		return data;
	}


	return (
		<Fragment>
			{/* <MetaData title={'All Users'} /> */}
			<div className="row mt-5">
				<div className="col-12 col-md-2 mt-4">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10 mt-5">
					<Fragment>
						<h1 className="my-5">All Users</h1>

						{loading ? <Loader /> : (
							<MDBDataTable
								data={setUsers()}
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
	)
}

export default UsersList
