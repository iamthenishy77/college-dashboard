import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { signOutUser } from '../firebase';
import { Link } from 'react-router-dom';
const NavBar = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			{currentUser ? (
				<span className='nav-link' onClick={signOutUser}>
					SIGN OUT
				</span>
			) : (
				<Link className='nav-link' to='/login'>
					SIGN IN
				</Link>
			)}
		</div>
	);
};

export default NavBar;
