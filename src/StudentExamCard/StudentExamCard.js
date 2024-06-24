import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
const StudentExamCard = () => {
	const [studentData, setStudentData] = useState();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const id = searchParams.get('id');
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
	return (
		<div>
			<Card title='Scheduled Exam'>
				{studentData?.scheduledExams ? (
					<span>
						You've an exam on {studentData?.scheduledExams?.date}. Visit your
						office to pay fee{' '}
					</span>
				) : (
					<span>You don't have any scheduled Exams</span>
				)}
			</Card>
		</div>
	);
};

export default StudentExamCard;
