import React from 'react';
import { Table, Select, Card, Form, Image } from 'antd';
function Student() {
	const columns = [
		{
			title: 'Subject',
			dataIndex: 'name',
		},
		{
			title: 'Internal Marks',
			dataIndex: 'internalMarks',
			sorter: {
				compare: (a, b) => a.chinese - b.chinese,
				multiple: 3,
			},
		},
		{
			title: 'External Marks',
			dataIndex: 'externalMarks',
			sorter: {
				compare: (a, b) => a.math - b.math,
				multiple: 2,
			},
		},
		{
			title: 'Total',
			dataIndex: 'total',
			sorter: {
				compare: (a, b) => a.english - b.english,
				multiple: 1,
			},
		},
		{
			title: 'Result',
			dataIndex: 'result',
			sorter: {
				compare: (a, b) => a.english - b.english,
				multiple: 1,
			},
		},
	];
	const data = [
		{
			key: '1',
			name: 'C Language',
			internalMarks: 25,
			externalMarks: 50,
			total: 75,
			result: 'P',
		},
		{
			key: '2',
			name: 'C Language',
			internalMarks: 25,
			externalMarks: 50,
			total: 75,
			result: 'P',
		},
		{
			key: '3',
			name: 'C Language',
			internalMarks: 25,
			externalMarks: 50,
			total: 75,
			result: 'P',
		},
		{
			key: '4',
			name: 'C Language',
			internalMarks: 25,
			externalMarks: 50,
			total: 75,
			result: 'P',
		},
	];
	return (
		<div className='p-5'>
			<span className='flex flex-row items-center justify-center p-3 text-2xl font-bold text-black'>
				Students Portal
			</span>
			<div className='flex flex-col'>
				<Card title='Student Detials'>
					<div className='flex flex-row justify-between'>
						<Form layout='horizontal'>
							<Form.Item label='Reg.No' className='font-bold' labelAlign='left'>
								<h1 className='font-medium'>167YR61</h1>
							</Form.Item>
							<Form.Item label='Name' className='font-bold'>
								<h1 className='font-medium'>Subash Chandram</h1>
							</Form.Item>

							<Form.Item label='Department' className='font-bold'>
								<h1 className='font-medium'>CSE</h1>
							</Form.Item>
							<Form.Item label='Year' className='font-bold'>
								<h1 className='font-medium'>2020-2024</h1>
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
					<h1 className='text-xl font-medium pb-2'>Examination Results</h1>
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
				</span>
			</div>

			<Table columns={columns} dataSource={data} />
		</div>
	);
}

export default Student;
