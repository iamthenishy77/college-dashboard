import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
const ScheduleExam = () => {
	const [studentData, setStudentData] = useState();
	const [examDate, setExamDate] = useState();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const id = searchParams.get('id');
	const data = studentData?.securedMarks;
	const dataSource = studentData
		? Object.keys(data).map(
				(key) => (
					console.log(data[key]),
					{
						value: key,
						label: key,
					}
				)
		  )
		: '';
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
	const onDateChange = (date, dateString) => {
		if (date) {
			const formattedDate = moment(dateString).format('DD/MM/YYYY');
			setExamDate(formattedDate);
		} else {
			console.log('No date selected');
		}
	};
	const handleSubmit = async (values) => {
		console.log(values);
		const studentRef = doc(db, 'students', id);
		await updateDoc(studentRef, {
			scheduledExams: {
				subjects: values,
				date: examDate,
			},
		});
		window.location.reload();
	};
	return (
		<div>
			{studentData.scheduledExams ? (
				<Card title='Schedule Exam'>
					You've already Scheduled the exam for this candidate
				</Card>
			) : (
				<Card title='Schedule Exam'>
					<Form onFinish={handleSubmit}>
						<Form.Item label='Enter Subject' name='subjects'>
							<Select
								mode='multiple'
								allowClear
								style={{ width: '100%' }}
								placeholder='Please select'
								// onChange={handleChange}
								options={dataSource}
							/>
						</Form.Item>
						<Form.Item label='Pick a date'>
							<DatePicker onChange={onDateChange} />
						</Form.Item>
						<Form.Item>
							<Button htmlType='submit' type='primary'>
								Schedule an Exam
							</Button>
						</Form.Item>
					</Form>
				</Card>
			)}
		</div>
	);
};

export default ScheduleExam;
