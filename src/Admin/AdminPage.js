import { Button, Card, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';
function AdminPage() {
	const [showModal, setShowModal] = useState(false);
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Reg No.',
			dataIndex: 'reg',
		},
		{
			title: 'Address',
			dataIndex: 'address',
		},
	];
	const data = [
		{
			key: '1',
			name: 'John Brown',
			reg: '12JNA12A4',
			address: 'New York No. 1 Lake Park',
		},
		{
			key: '2',
			name: 'Jim Green',
			reg: '12JNA12A5',
			address: 'London No. 1 Lake Park',
		},
		{
			key: '3',
			name: 'Joe Black',
			reg: '12JNA12A6',
			address: 'Sydney No. 1 Lake Park',
		},
		{
			key: '4',
			name: 'Dwane Red',
			reg: '12JNA12A7',
			address: 'Sydney No. 1 Lake Park',
		},
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
	return (
		<div className='p-5'>
			<span className='flex flex-row items-center justify-center p-3 text-2xl font-bold text-black'>
				Admin's Portal
			</span>
			<Card
				title='Add Students to Departments'
				extra={
					<Button className='h-10' onClick={() => setShowModal(true)}>
						Add Student to the Department
					</Button>
				}
			>
				<div className='flex flex-row gap-5 pb-3'>
					<Select
						placeholder='Select Department'
						style={{
							width: 200,
						}}
						options={[
							{
								value: 'B.Tech',
								label: 'B.Tech',
							},
							{
								value: 'BBA',
								label: 'BBA',
							},
							{
								value: 'MBA',
								label: 'MBA',
							},
							{
								value: 'MCA',
								label: 'MCA	',
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
								value: 'ECE',
								label: 'ECE',
							},
							{
								value: 'EEE',
								label: 'EEE',
							},
							{
								value: 'Civil',
								label: 'Civil',
							},
						]}
					/>
				</div>
				<Table
					rowSelection={{ rowSelection }}
					columns={columns}
					dataSource={data}
				/>
				<Button>Save</Button>
			</Card>

			<Modal
				open={showModal}
				onClose={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
			>
				<Table
					rowSelection={{ rowSelection }}
					columns={columns}
					dataSource={data}
				/>
			</Modal>
		</div>
	);
}

export default AdminPage;
