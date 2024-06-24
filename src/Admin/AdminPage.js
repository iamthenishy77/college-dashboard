import {
	Button,
	Card,
	Modal,
	Select,
	Table,
	Tabs,
	Form,
	Input,
	DatePicker,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { createAuthUserWithEmailAndPassword, db, firestore } from '../firebase';
import { collection, doc, addDoc, getDocs, setDoc } from 'firebase/firestore';
import AddSubjects from '../AddSubjects/AddSubjects';
import { EditOutlined } from '@ant-design/icons';
function AdminPage() {
	const dateFormat = 'YYYY/MM/DD';
	const [showModal, setShowModal] = useState(false);
	const [birthDate, setBirthDate] = useState('');
	const [joinDate, setJoinDate] = useState('');
	const [studentData, setStudentData] = useState();
	const [profData, setProfData] = useState();
	const [profModal, setProfModal] = useState();
	const [loading, setLoading] = useState(false);
	const [studentEditModal, setStudentEditModal] = useState(false);
	const tableColumns = [
		{
			title: 'Student Name',
			dataIndex: 'studentName' || 'lecturerName',
			key: 'studentName',
		},
		{
			title: 'Father Name',
			dataIndex: 'fatherName',
			key: 'fatherName',
		},
		{
			title: 'Department',
			dataIndex: 'department',
			key: 'department',
		},
		{
			title: 'Branch',
			dataIndex: 'branch',
			key: 'branch',
		},
		{
			title: 'Date of Birth',
			dataIndex: 'dateOfBirth',
			key: 'dateOfBirth',
		},
		{
			title: 'Date of Joining',
			dataIndex: 'dateOfJoining',
			key: 'dateOfJoining',
		},
		// {
		// 	title: 'Actions',
		// 	dataIndex: 'actions',
		// 	key: 'dateOfJoining',
		// 	render: (rec, ra) => {
		// 		return (
		// 			<div>
		// 				<EditOutlined className='cursor-pointer' />
		// 			</div>
		// 		);
		// 	},
		// },
	];
	const ProftableColumns = [
		{
			title: 'Student Name',
			dataIndex: 'lecturerName',
			key: 'lecturerName',
		},

		{
			title: 'Department',
			dataIndex: 'department',
			key: 'department',
		},
		{
			title: 'Branch',
			dataIndex: 'branch',
			key: 'branch',
		},
		{
			title: 'Date of Birth',
			dataIndex: 'dateOfBirth',
			key: 'dateOfBirth',
		},
		{
			title: 'Date of Joining',
			dataIndex: 'dateOfJoining',
			key: 'dateOfJoining',
		},
		// {
		// 	title: 'Actions',
		// 	dataIndex: 'actions',
		// 	key: 'dateOfJoining',
		// },
	];
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				'selectedRows: ',
				selectedRows
			);
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === 'Disabled User',
			// Column configuration not to be checked
			name: record.name,
		}),
	};
	const items = [
		{
			key: '1',
			label: 'Lecturers',
			children: (
				<Table
					columns={ProftableColumns}
					dataSource={profData}
					loading={loading}
				/>
			),
		},
		{
			key: '2',
			label: 'Student',
			children: (
				<Table
					columns={tableColumns}
					dataSource={studentData}
					loading={loading}
				/>
			),
		},
		{
			key: '3',
			label: 'Subjects',
			children: <AddSubjects />,
		},
	];
	const onFinish = async (values) => {
		console.log('Success:', values);
		if (values) {
			try {
				const userCredential = await createAuthUserWithEmailAndPassword(
					values.email,
					values.password
				);
				const studentData = {
					id: userCredential.user.uid,
					studentName: values.studentName,
					fatherName: values.fatherName,
					dateOfBirth: birthDate,
					dateOfJoining: joinDate,
					address: values.address,
					department: values.department,
					branch: values.branch,
					email: values.email,
					password: values.password,
				};
				await setDoc(doc(db, 'students', userCredential.user.uid), studentData);
				alert('Student created successfully!');
			} catch (e) {
				console.log(e);
			}
		}
	};
	const onProfFinish = async (values) => {
		console.log('Success:', values);
		if (values) {
			try {
				const userCredential = await createAuthUserWithEmailAndPassword(
					values.email,
					values.password
				);
				const profData = {
					//id: userCredential.user.uid,
					lecturerName: values.lecturerName,
					dateOfBirth: birthDate,
					dateOfJoining: joinDate,
					address: values.address,
					department: values.department,
					branch: values.branch,
					email: values.email,
					password: values.password,
				};
				console.log(profData, 'profData');
				await setDoc(doc(db, 'prof', userCredential.user.uid), profData);
				alert('Lecturer created successfully!');
			} catch (e) {
				console.log(e);
			}
		}
	};

	const onBirthDateChange = (date, dateString) => {
		if (date) {
			const formattedDate = moment(dateString).format('DD/MM/YYYY');
			console.log(formattedDate, 'formatDate');
			setBirthDate(formattedDate);
		} else {
			console.log('No date selected');
		}
	};
	const onDateChange = (date, dateString) => {
		if (date) {
			const formattedDate = moment(dateString).format('DD/MM/YYYY');
			setJoinDate(formattedDate);
		} else {
			console.log('No date selected');
		}
	};
	const modalValue = !showModal;
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const querySnapshot = await getDocs(collection(db, 'students'));
				const studentsList = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setStudentData(studentsList);
			} catch (error) {
				console.error('Error fetching students: ', error);
			}
			setLoading(false);
		}
		fetchData();
	}, [modalValue]);
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
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
			setLoading(false);
		}
		fetchData();
	}, [profModal]);

	return (
		<div className='p-5'>
			<span className='flex flex-row items-center justify-center p-3 text-2xl font-bold text-black'>
				Admin's Portal
			</span>

			<Card
				title='Add Students to Departments'
				extra={
					<div className='flex flex-row gap-3'>
						<Button className='h-10' onClick={() => setProfModal(true)}>
							Add Lecturer
						</Button>
						<Button className='h-10' onClick={() => setShowModal(true)}>
							Add Student to the Department
						</Button>
					</div>
				}
			>
				<Tabs defaultActiveKey='1' items={items} />
			</Card>

			<Modal
				open={showModal}
				onClose={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
				onOk={onFinish}
				footer={null}
			>
				<Form labelCol={{ span: 6 }} className='p-5 ' onFinish={onFinish}>
					<Form.Item label={`Student's Name`} name='studentName'>
						<Input placeholder='Enter Student Name'></Input>
					</Form.Item>
					<Form.Item label={`Father's Name`} name='fatherName'>
						<Input placeholder={`Enter Father's Name`}></Input>
					</Form.Item>
					<Form.Item label={`Date of Birth`} name='dateOfBirth'>
						<DatePicker onChange={onBirthDateChange} />
					</Form.Item>
					<Form.Item label={`Address`} name='address'>
						<Input placeholder={`Enter Address`}></Input>
					</Form.Item>
					<Form.Item label=' Department' name='semester'>
						<Select
							placeholder={`Select the Department`}
							options={[
								{
									value: '1st Sem',
									label: '1st Sem',
								},
								{
									value: '2nd Sem',
									label: '2nd Sem',
								},
								{
									value: '3rd Sem',
									label: '3rd Sem',
								},
							]}
						></Select>
					</Form.Item>
					<Form.Item label='Branch' name='branch'>
						<Select
							placeholder={`Select the Department`}
							options={[
								{
									value: 'B.tech',
									label: 'B.tech',
								},
								{
									value: 'MCA',
									label: 'MCA',
								},
								{
									value: 'MBA',
									label: 'MBA',
								},
							]}
						></Select>
					</Form.Item>
					<Form.Item label='Date of join' name='dateOfJoin'>
						<DatePicker onChange={onDateChange} />
					</Form.Item>

					<span className='font-bold pb-2 flex flex-row justify-center'>
						Enter Login Details for Student
					</span>
					<Form.Item label='Email' name='email' className='mt-2'>
						<Input placeholder='Enter Email Address'></Input>
					</Form.Item>
					<Form.Item label='Password' name='password'>
						<Input placeholder='Enter Password' type='password'></Input>
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				open={profModal}
				onClose={() => setProfModal(false)}
				onCancel={() => setProfModal(false)}
				onOk={onProfFinish}
				footer={null}
			>
				<Form labelCol={{ span: 6 }} className='p-5 ' onFinish={onProfFinish}>
					<Form.Item label={`Enter Name`} name='lecturerName'>
						<Input placeholder='Enter Lecturer Name'></Input>
					</Form.Item>

					<Form.Item label={`Date of Birth`} name='dateOfBirth'>
						<DatePicker onChange={onBirthDateChange} />
					</Form.Item>
					<Form.Item label={`Address`} name='address'>
						<Input placeholder={`Enter Address`}></Input>
					</Form.Item>
					<Form.Item label=' Department' name='department'>
						<Select
							placeholder={`Select the Department`}
							options={[
								{
									value: 'CSE',
									label: 'CSE',
								},
								{
									value: 'ECE',
									label: 'ECE',
								},
								{
									value: 'EEE',
									label: 'EEE',
								},
							]}
						></Select>
					</Form.Item>
					<Form.Item label='Branch' name='branch'>
						<Select
							placeholder={`Select the Department`}
							options={[
								{
									value: 'B.tech',
									label: 'B.tech',
								},
								{
									value: 'MCA',
									label: 'MCA',
								},
								{
									value: 'BCA',
									label: 'bca',
								},
							]}
						></Select>
					</Form.Item>
					<Form.Item label='Date of join' name='dateOfJoin'>
						<DatePicker onChange={onDateChange} />
					</Form.Item>

					<span className='font-bold pb-2 flex flex-row justify-center'>
						Enter Login Details for Lecturer
					</span>
					<Form.Item label='Email' name='email' className='mt-2'>
						<Input placeholder='Enter Email Address'></Input>
					</Form.Item>
					<Form.Item label='Password' name='password'>
						<Input placeholder='Enter Password' type='password'></Input>
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default AdminPage;
