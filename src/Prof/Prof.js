import React, { useState } from 'react';
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
function Prof() {
	const [showModal, setShowModal] = useState(false);
	const columns = [
		{
			title: 'Student Name',
			dataIndex: 'name',
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
			dataIndex: 'externalMarks',
		},
		{
			title: 'Status',
			dataIndex: 'total',
			render: (status) => <Tag color='red'>{status}</Tag>,
		},
		{
			title: 'Action',
			dataIndex: 'result',

			render: () => (
				<Button onClick={() => setShowModal(true)}>Enter Marks</Button>
			),
		},
	];
	const data = [
		{
			key: '1',
			name: 'John Doe',
			internalMarks: '12SA45H12',
			externalMarks: 'CSE',
			total: 'Not yet entered',
		},
		{
			key: '1',
			name: 'John Doe',
			internalMarks: '12SA45H12',
			externalMarks: 'CSE',
			total: 'Not yet entered',
		},
		{
			key: '1',
			name: 'John Doe',
			internalMarks: '12SA45H12',
			externalMarks: 'CSE',
			total: 'Not yet entered',
		},
	];
	return (
		<div className='p-5'>
			<span className='flex flex-row items-center justify-center p-3 text-2xl font-bold text-black'>
				Lecturer's Portal
			</span>
			<div className='flex flex-col'>
				<Card title='Lecturer Detials'>
					<div className='flex flex-row justify-between'>
						<Form layout='horizontal'>
							<Form.Item label='Name' className='font-bold'>
								<h1 className='font-medium'>Subash Chandram</h1>
							</Form.Item>

							<Form.Item label='Department' className='font-bold'>
								<h1 className='font-medium'>CSE</h1>
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
							placeholder='Select Semester'
							style={{
								width: 200,
							}}
							options={[
								{
									value: '1st Semester',
									label: '1st Semester',
								},
								{
									value: '2nd Semester',
									label: '2nd Semester',
								},
								{
									value: '3rd Semester',
									label: '3rd Semester',
								},
								{
									value: '4th Semester',
									label: '4th Semester',
								},
							]}
						/>
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
									value: 'Mechanical',
									label: 'Mechanical',
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
						/>
						<Select
							placeholder='Select Student'
							style={{
								width: 200,
							}}
							options={[
								{
									value: 'John Doe',
									label: 'John Doe',
								},
								{
									value: 'John Doe',
									label: 'John Doe',
								},
								{
									value: 'John Doe',
									label: 'John Doe',
								},
								{
									value: 'John Doe',
									label: 'John Doe',
								},
								{
									value: 'John Doe',
									label: 'John Doe',
								},
							]}
						/>
					</div>
				</span>
			</div>
			<Table columns={columns} dataSource={data} />

			<Modal
				open={showModal}
				onCancel={() => setShowModal(false)}
				onClose={() => setShowModal(false)}
			>
				<div className='p-5'>
					<Form labelCol={{ span: 5 }} title='Enter Marks'>
						<Form.Item label='Maths'>
							<Input placeholder='Enter Marks'></Input>
						</Form.Item>
						<Form.Item label='C Language'>
							<Input placeholder='Enter Marks'></Input>
						</Form.Item>
						<Form.Item label='English'>
							<Input placeholder='Enter Marks'></Input>
						</Form.Item>
						<Form.Item label='C Lab'>
							<Input placeholder='Enter Marks'></Input>
						</Form.Item>
						<Form.Item label='Drawing Lab'>
							<Input placeholder='Enter Marks'></Input>
						</Form.Item>
						<Button type='primary'>Submit</Button>
					</Form>
				</div>
			</Modal>
		</div>
	);
}

export default Prof;
