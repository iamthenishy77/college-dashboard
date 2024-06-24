import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Table } from 'antd';
import { setDoc, doc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 4,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 20,
		},
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 20,
			offset: 4,
		},
	},
};

const { Option } = Select;
const AddSubjects = () => {
	const [subjects, setSubjects] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [selectedBranch, setSelectedBranch] = useState('');
	const [branchOptions, setBranchOptions] = useState([]);
	const [data, setData] = useState([]);
	const onFinish = async (values) => {
		console.log('Received values of form:', values);
		if (values) {
			try {
				await setDoc(doc(db, 'subjects', values.department), {
					[values.branch]: values.subjectNames,
				});
				alert('Student created successfully!');
			} catch (e) {
				console.log(e);
			}
		}
	};
	useEffect(() => {
		async function fetchStudents() {
			const studentsRef = collection(db, 'subjects'); // Reference to the "students" collection
			const q = query(studentsRef); // Create a query to retrieve all documents
			const querySnapshot = await getDocs(q); // Get all documents in the collection

			const studentList = [];
			querySnapshot.forEach((doc) => {
				studentList.push({ id: doc.id, data: doc.data() }); // Add each student data to the list
			});
			console.log(studentList);
			setSubjects(studentList);
			//setStudentList(studentList);
		}
		fetchStudents();
	}, []);
	const handleIdChange = (value) => {
		setSelectedId(value);
		setSelectedBranch('');
		const selectedData = subjects.find((subject) => subject.id === value);
		if (selectedData) {
			setBranchOptions(Object.keys(selectedData.data));
		} else {
			setBranchOptions([]);
		}
		setData([]);
	};

	const handleBranchChange = (value) => {
		setSelectedBranch(value);
		const selectedData = subjects.find((subject) => subject.id === selectedId);
		if (selectedData && selectedData.data[value]) {
			setData(selectedData.data[value]);
		} else {
			setData([]);
		}
	};
	const departmentOptions = [
		{
			value: 'B.Tech',
			label: 'B.Tech',
		},
		{
			value: 'PG',
			label: 'PG',
		},
	];
	const branchOption = [
		{
			value: 'ECE',
			label: 'ECE',
		},
		{
			value: 'EEE',
			label: 'EEE',
		},
		{
			value: 'CSE',
			label: 'CSE',
		},
		{
			value: 'MCA',
			label: 'MCA',
		},
		{
			value: 'MBA',
			label: 'MBA',
		},
	];
	const columns = [
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
		},
	];

	const tableData = data.map((item, index) => ({
		key: index,
		subject: item,
	}));
	return (
		<>
			<Form
				name='dynamic_form_item'
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				style={{
					maxWidth: 600,
				}}
				labelCol={{ span: 4 }}
			>
				<Form.Item name='department' label='Department'>
					<Select options={departmentOptions} placeholder='Select Department' />
				</Form.Item>
				<Form.Item name='branch' label='Branch'>
					<Select options={branchOption} placeholder='Select Branch' />
				</Form.Item>
				<Form.List
					name='subjectNames'
					rules={[
						{
							validator: async (_, names) => {
								if (!names || names.length < 2) {
									return Promise.reject(new Error('At least 2 subjects'));
								}
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<Form.Item
									layout={formItemLayout}
									//{...(index === 0 ?  : formItemLayoutWithOutLabel)}
									label={index === 0 ? 'Subjects' : `Subjects  ${index++}`}
									required={false}
									key={field.key}
								>
									<Form.Item
										{...field}
										validateTrigger={['onChange', 'onBlur']}
										rules={[
											{
												required: true,
												whitespace: true,
												message:
													"Please input passenger's name or delete this field.",
											},
										]}
										noStyle
									>
										<Input
											placeholder='passenger name'
											style={{
												width: '60%',
											}}
										/>
									</Form.Item>
									{fields.length > 1 ? (
										<MinusCircleOutlined
											className='dynamic-delete-button'
											onClick={() => remove(field.name)}
										/>
									) : null}
								</Form.Item>
							))}
							<Form.Item>
								<Button
									type='dashed'
									onClick={() => add()}
									style={{
										width: '60%',
									}}
									icon={<PlusOutlined />}
								>
									Add field
								</Button>
								<Button
									type='dashed'
									onClick={() => {
										add('The head item', 0);
									}}
									style={{
										width: '60%',
										marginTop: '20px',
									}}
									icon={<PlusOutlined />}
								>
									Add field at head
								</Button>
								<Form.ErrorList errors={errors} />
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
			<Card title='Subject List'>
				<div className='p-3 flex flex-row gap-3 items-center'>
					<Select
						id='idSelect'
						value={selectedId}
						style={{ width: 200 }}
						onChange={handleIdChange}
					>
						<Option value=''>Select ID</Option>
						{subjects.map((subject) => (
							<Option key={subject.id} value={subject.id}>
								{subject.id}
							</Option>
						))}
					</Select>

					<label htmlFor='branchSelect'>Select Branch:</label>
					<Select
						id='branchSelect'
						value={selectedBranch}
						style={{ width: 200 }}
						onChange={handleBranchChange}
						disabled={!selectedId}
					>
						<Option value=''>Select Branch</Option>
						{branchOptions.map((branch) => (
							<Option key={branch} value={branch}>
								{branch}
							</Option>
						))}
					</Select>
				</div>
				<Table columns={columns} dataSource={tableData} />
			</Card>
		</>
	);
};
export default AddSubjects;
