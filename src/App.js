import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './LoginPage/Login';
import AdminPage from './Admin/AdminPage';
import Student from './Student/Student';
import Prof from './Prof/Prof';
import StudentDetails from './StudentDetails/StudentDetails';
import { db, onAuthStateChangedListener } from './firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
function App() {
	const [studentList, setStudentList] = useState();
	const [profData, setProfData] = useState();
	useEffect(() => {
		async function fetchStudents() {
			const studentsRef = collection(db, 'students'); // Reference to the "students" collection
			const q = query(studentsRef); // Create a query to retrieve all documents
			const querySnapshot = await getDocs(q); // Get all documents in the collection

			const studentList = [];
			querySnapshot.forEach((doc) => {
				studentList.push(doc.data()); // Add each student data to the list
			});
			setStudentList(studentList);
		}

		fetchStudents();
	}, []);
	useEffect(() => {
		async function fetchData() {
			try {
				const querySnapshot = await getDocs(collection(db, 'prof'));
				const profList = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProfData(profList);
			} catch (error) {
				console.error('Error fetching students: ', error);
			}
		}
		fetchData();
	}, []);

	return (
		<Routes>
			<Route path='/' element={<Login />}></Route>
			<Route path='/admin' element={<AdminPage />}></Route>
			<Route path='/student' element={<Student />}></Route>
			<Route path='/student-details' element={<StudentDetails />} />
			<Route path='/lecturer-view' element={<Prof />}></Route>
		</Routes>
	);
}

export default App;
