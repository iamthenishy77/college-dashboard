import React, { useEffect, useState, useContext } from 'react';
import {
	Card,
	Form,
	Image,
	Table,
	Select,
	Input,
	Button,
	Tag,
	Modal,
} from 'antd';
import {
	collection,
	query,
	getDocs,
	setDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { db, signOutUser } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
function Prof() {
	const { Option } = Select;
	const { currentUser } = useContext(UserContext);
	const [studentsList, setStudentList] = useState();
	const [profData, setProfData] = useState();
	const [selectedDepartment, setSelectedDepartment] = useState();
	const [subjectList, setSubjectList] = useState();
	const [selectedId, setSelectedId] = useState('');
	const [selectedBranch, setSelectedBranch] = useState('');
	const [record, setRecord] = useState();
	const [selectedSubject, setSelectedSubject] = useState('');
	const [branches, setBranches] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [profDetails, setProfDetails] = useState();

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
				const querySnapshot = await getDocs(collection(db, 'subjects'));
				const studentsList = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setSubjectList(studentsList);
			} catch (error) {
				console.error('Error fetching students: ', error);
			}
		}
		fetchData();
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
	console.log(profData);
	console.log(currentUser);
	useEffect(() => {
		const lecturer = profData?.find(
			(lecturer) => lecturer.email === currentUser?.email
		);
		setProfDetails(lecturer);
	}, [profData]);
	console.log(profDetails);
	const departmentSelectHandler = (value) => {
		setSelectedDepartment(value);
	};
	const navigate = useNavigate();
	const columns = [
		{
			title: 'Student Name',
			dataIndex: 'studentName',
			render: (text, record) => (
				<div onClick={() => navigate(`/student-details?id=${record.id}`)}>
					{text}
				</div>
			),
		},
		{
			title: 'Reg.No',
			dataIndex: 'internalMarks',
			sorter: {
				compare: (a, b) => a.chinese - b.chinese,
				multiple: 3,
			},
		},
		{
			title: 'Department',
			dataIndex: 'department',
		},
		{
			title: 'Status',
			dataIndex: 'total',
			render: (status) =>
				status ? (
					<Tag color='red'>
						<div>Entered</div>
					</Tag>
				) : (
					<Tag color='red'>Not Enteted yet</Tag>
				),
		},
		{
			title: 'Action',
			dataIndex: 'result',
			render: (rec, ra) => {
				return (
					<Button
						onClick={() => {
							setShowModal(true);
							setRecord(ra);
						}}
					>
						Enter Marks
					</Button>
				);
			},
		},
	];
	const filteredData = selectedDepartment
		? studentsList.filter((item) => item.department === selectedDepartment)
		: studentsList;
	useEffect(() => {
		if (selectedId) {
			const selectedData = subjectList.find((item) => item.id === selectedId);
			setBranches(Object.keys(selectedData).filter((key) => key !== 'id'));
			setSelectedBranch('');
			setSubjects([]);
		}
	}, [selectedId, subjectList]);
	useEffect(() => {
		if (selectedBranch) {
			const selectedData = subjectList.find((item) => item.id === selectedId);
			setSubjects(selectedData[selectedBranch] || []);
			setSelectedSubject('');
		}
	}, [selectedBranch, selectedId, subjectList]);
	const submitMarks = async (values) => {
		console.log(values);
		const studentId = record.id;
		const studentRef = doc(db, 'students', studentId);
		await updateDoc(studentRef, { securedMarks: values });
		alert('Marks Entere Successfully ');
		setShowModal(false);
	};
	const rowHandler = (rec) => {
		console.log(rec);
	};
	return (
		<div className='p-5'>
			<Link to='/' className='font-bold text-black' onClick={signOutUser}>
				Sign Out
			</Link>

			<span className='flex flex-row items-center justify-center p-3 text-2xl font-bold text-black'>
				Lecturer's Portal
			</span>

			<div className='flex flex-col'>
				<Card title='Lecturer Detials'>
					<div className='flex flex-row justify-between'>
						<Form layout='horizontal'>
							<Form.Item label='Name' className='font-bold'>
								<h1 className='font-medium'>{profDetails?.lecturerName}</h1>
							</Form.Item>

							<Form.Item label='Department' className='font-bold'>
								<h1 className='font-medium'>{profDetails?.department}</h1>
							</Form.Item>
							<Form.Item label='Designation' className='font-bold'>
								<h1 className='font-medium'>Asst.Proffessor</h1>
							</Form.Item>
						</Form>
						<Image
							width={200}
							src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
						></Image>
					</div>
				</Card>
				<hr className='mt-5' />
				<span className='pb-5 pt-5'>
					<h1 className='text-xl font-medium pb-2'>
						Enter Examination Results
					</h1>
					<div className='flex flex-row gap-6 mt-2'>
						<Select
							placeholder='Select Department'
							style={{
								width: 200,
							}}
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
								{
									value: 'MCA',
									label: 'MCA',
								},
								{
									value: 'MBA',
									label: 'MBA',
								},
							]}
							onChange={departmentSelectHandler}
						/>
					</div>
				</span>
			</div>
			<Table columns={columns} dataSource={filteredData} onRow={rowHandler} />

			<Modal
				open={showModal}
				onCancel={() => setShowModal(false)}
				onClose={() => setShowModal(false)}
				footer={null}
				onOk={submitMarks}
			>
				<div className='p-5'>
					<Form
						labelCol={{ span: 5 }}
						title='Enter Marks'
						onFinish={submitMarks}
					>
						<Form.Item label='Department'>
							<Select
								id='firstSelect'
								value={selectedId}
								style={{ width: 200 }}
								onChange={(value) => setSelectedId(value)}
							>
								<Option value=''>Select ID</Option>
								{subjectList?.map((item) => (
									<Option key={item.id} value={item.id}>
										{item.id}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label='Branch'>
							<Select
								id='secondSelect'
								value={selectedBranch}
								style={{ width: 200 }}
								onChange={(value) => setSelectedBranch(value)}
								disabled={!selectedId}
							>
								<Option value=''>Select Branch</Option>
								{branches.map((branch) => (
									<Option key={branch} value={branch}>
										{branch}
									</Option>
								))}
							</Select>
						</Form.Item>

						{subjects.map((subject) => (
							<Form.Item label={subject} name={subject} key={subject}>
								<Input key={subject} value={subject}></Input>
							</Form.Item>
						))}
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</div>
	);
}

export default Prof;
