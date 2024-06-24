import { createContext, useState, useEffect } from 'react';

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from '../firebase';

export const UserContext = createContext({
	setCurrentUser: () => null,
	currentUser: null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	console.log(currentUser, 'currentUser');
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			// if (user) {
			// 	createUserDocumentFromAuth(user);
			// }
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
