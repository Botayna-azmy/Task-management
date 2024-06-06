import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const TaskList = () => {
	const {id} = useParams()
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8080/api/task')
			.then(result => setTasks(result.data))
			.catch(err => console.log(err));
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const handleDelete = (id) => {
			axios.delete(`http://localhost:8080/api/task/deleteTask/${id}`)
			.then(result => {
				console.log(result);
				setTasks(tasks.filter(task => task._id !== id));
			})
			.catch(err => console.log(err));
	}

	const handleToggle = (id) => {
		axios.patch(`http://localhost:8080/api/task/${id}/toggle`)
			.then(result => {
				setTasks(tasks.map(task => 
					task._id === id ? { ...task, isComplete: !task.isComplete } : task
				));
			})
			.catch(err => console.log(err));
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Task Management</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

			<div className={styles.container1}>
				<div className="bg-white rounded p-3">
					<Link to="/create" className='btn btn-success'>Add +</Link><br /><br />

					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Description</th>
								<th scope="col">IsComplete</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr key={task._id}>
									<td>{task.title}</td>
									<td>{task.description}</td>
									<td>
										<input
											type="checkbox"
											checked={task.isComplete}
											onChange={() => handleToggle(task._id)}
										/>
									</td>
									<td>
										<Link to={`/update/${task._id}`} className={styles.btn_edit}>Update</Link>
										<button className={styles.btn_delete} 
										onClick={(e) => handleDelete(task._id)}>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TaskList;
