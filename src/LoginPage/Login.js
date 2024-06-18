import React, { useState } from 'react';
import { Button, Form, Input, Radio, Card } from 'antd';

function Login() {
	const [form] = Form.useForm();

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
					<Form form={form} labelCol={{ span: 3 }} layout='vertical'>
						<Form.Item label='Email' labelWrap={true} labelAlign='right'>
							<Input placeholder='Enter email' className='rounded-lg  h-10' />
						</Form.Item>
						<Form.Item label='Password'>
							<Input
								placeholder='Enter password'
								className='rounded-lg  h-10'
							/>
						</Form.Item>
						<Form.Item className='flex flex-row items-center justify-center'>
							<Button type='primary' className=' shadow-lg shadow-blue-500/50'>
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
