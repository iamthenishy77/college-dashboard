import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './LoginPage/Login';
import AdminPage from './Admin/AdminPage';
import Student from './Student/Student';
import Prof from './Prof/Prof';
function App() {
  return (
		<Routes>
			<Route path='/' element={<Login />}></Route>
			<Route path='/admin' element={<AdminPage />}></Route>
			<Route path='/student' element={<Student />}></Route>
			<Route path='/lecturer-view' element={<Prof />}></Route>
		</Routes>
	);
}

export default App;
