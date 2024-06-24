import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Input, Radio, Card } from 'antd';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { signInAuthUserWithEmailAndPassword } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
function Login() {
	const [form] = Form.useForm();
	const [studentList, setStudentList] = useState();
	const [profData, setProfData] = useState();
	const navigate = useNavigate();
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
	const { currentUser } = useContext(UserContext);
	console.log(studentList, currentUser);
	useEffect(() => {
		const emailExists = studentList?.some(
			(student) => student?.email === currentUser?.email
		);

		if (emailExists) {
			navigate(`student-details?id=${currentUser.uid}`);
		}
	}, [currentUser, studentList]);
	useEffect(() => {
		const emailExists = profData?.some(
			(student) => student?.email === currentUser?.email
		);

		if (emailExists) {
			navigate(`lecturer-view`);
		}
	}, [currentUser, profData]);

	const handleSubmit = async (values) => {
		try {
			await signInAuthUserWithEmailAndPassword(values?.email, values?.password);
			const emailExists = studentList?.some(
				(student) => student?.email === values?.email
			);

			if (emailExists) {
				navigate(`student-details?id=${currentUser.uid}`);
			}
			const profEmailExists = profData?.some(
				(student) => student?.email === values?.email
			);

			if (profEmailExists) {
				navigate(`lecturer-view`);
			}
		} catch (error) {
			console.log('user sign in failed', error);
			alert('Sign-IN failed');
		}
	};

	return (
		<>
			{/* <div className='p-5 flex flex-row items-center justify-center'>
				<span className='font-bold text-2xl text-black'>
					{' '}
					This is a College Portal
				</span>
			</div> */}
			<div className='p-5 flex flex-row items-center justify-center'>
				<Card
					className=' w-1/2 h-full  shadow-lg bg-[#c2c3ff] text-white '
					title=' Enter your details'
				>
					<Form
						form={form}
						labelCol={{ span: 3 }}
						layout='vertical'
						onFinish={handleSubmit}
					>
						<Form.Item
							label='Email'
							labelWrap={true}
							labelAlign='right'
							name='email'
						>
							<Input placeholder='Enter email' className='rounded-lg  h-10' />
						</Form.Item>
						<Form.Item label='Password' name='password'>
							<Input
								placeholder='Enter password'
								className='rounded-lg  h-10'
							/>
						</Form.Item>
						<Form.Item className='flex flex-row items-center justify-center'>
							<Button
								type='primary'
								htmlType='submitt'
								className=' shadow-lg shadow-blue-500/50'
							>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	);
}

export default Login;
