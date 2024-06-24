import React, { useEffect, useState, useContext } from 'react';
import { Card, Input, Modal, Table, Form, Button } from 'antd';
import {
	doc,
	getDoc,
	updateDoc,
	getDocs,
	query,
	collection,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useLocation } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { signOutUser } from '../firebase';
import { UserContext } from '../Context/UserContext';
import ScheduleExam from '../ScheduleExam/ScheduleExam';
import StudentExamCard from '../StudentExamCard/StudentExamCard';
const StudentDetails = () => {
	const { currentUser } = useContext(UserContext);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const id = searchParams.get('id');
	const [studentData, setStudentData] = useState();
	const [profData, setProfData] = useState();
	const [openModal, setOpenModal] = useState();
	const [record, setRecord] = useState();
	const [loading, setLoading] = useState(false);
	const [profView, setProfView] = useState(false);
	const data = studentData?.securedMarks;
	const dataSource = studentData
		? Object.keys(data).map(
				(key) => (
					console.log(data[key]),
					{
						subject: key,
						marks: data[key],
					}
				)
		  )
		: '';
	const columns = [
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Marks',
			dataIndex: 'marks',
			key: 'marks',
		},
		{
			title: 'Status',
			dataIndex: 'marks',
			key: 'marks',
			render: (marks) => (marks >= 30 ? 'P' : 'F'),
		},
		{
			title: 'Edit',
			dataIndex: 'edit',
			key: 'edit',
			render: (rec, ra) => {
				console.log(rec, ra);
				return (
					<EditOutlined
						className='cursor-pointer'
						onClick={() => {
							setRecord(ra);
							setOpenModal(true);
						}}
					/>
				);
			},
		},
	];
	const studentColumns = [
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Marks',
			dataIndex: 'marks',
			key: 'marks',
		},
		{
			title: 'Status',
			dataIndex: 'marks',
			key: 'marks',
			render: (marks) => (marks >= 30 ? 'P' : 'F'),
		},
		// {
		// 	title: 'Edit',
		// 	dataIndex: 'edit',
		// 	key: 'edit',
		// 	render: (rec, ra) => {
		// 		console.log(rec, ra);
		// 		return (
		// 			<EditOutlined
		// 				className='cursor-pointer'
		// 				onClick={() => {
		// 					setRecord(ra);
		// 					setOpenModal(true);
		// 				}}
		// 			/>
		// 		);
		// 	},
		// },
	];

	useEffect(() => {
		const dataRetrival = async () => {
			const docRef = doc(db, 'students', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setStudentData(docSnap.data());
			} else {
				// docSnap.data() will be undefined in this case
				console.log('No such document!');
			}
		};
		dataRetrival();
	}, []);
	console.log(studentData);
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
	useEffect(() => {
		const emailExists = profData?.some(
			(student) => student?.email === currentUser?.email
		);

		if (emailExists) {
			setProfView(true);
		}
	}, [currentUser, profData]);
	const onFinish = async (values) => {
		setLoading(true);
		const StudentDocRef = doc(db, 'students', id);
		await updateDoc(StudentDocRef, {
			[`securedMarks.${record.subject}`]: values.marks,
		});
		setLoading(false);
		setOpenModal(false);

		console.log(values);
	};
	return (
		<div className='p-5'>
			<div className='flex flex-row items-end justify-end p-3'>
				<Link to='/' className='font-bold text-black' onClick={signOutUser}>
					Sign Out
				</Link>
			</div>
			<Card title='Student Details'>
				<div className='flex flex-col gap-9'>
					<div className='flex flex-row gap-5 justify-between w-[200px]'>
						<span>Name of the Student </span>
						<span>{studentData?.studentName}</span>
					</div>
					<div className='flex flex-row gap-5 justify-between w-[200px]'>
						<span>Name of the Father </span>
						<span>{studentData?.fatherName}</span>
					</div>
					<div className='flex flex-row gap-5 justify-between w-[200px]'>
						<span>Branch </span>
						<span>{studentData?.branch}</span>
					</div>
					<div className='flex flex-row gap-5 justify-between w-[200px]'>
						<span>Department </span>
						<span>{studentData?.department}</span>
					</div>
				</div>
			</Card>
			<div className='mt-10'>
				<Table
					dataSource={dataSource}
					columns={profView ? columns : studentColumns}
					loading={loading}
				/>
			</div>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onOk={onFinish}
				footer={null}
			>
				<div className='p-10'>
					<Form onFinish={onFinish}>
						<Form.Item name='marks'>
							<Input placeholder='Enter Marks to edit' />
						</Form.Item>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form>
				</div>
			</Modal>
			{profView ? <ScheduleExam /> : <StudentExamCard />}
		</div>
	);
};

export default StudentDetails;
