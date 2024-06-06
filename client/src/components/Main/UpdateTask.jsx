import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
  const {id} = useParams()
  const [task, setTasks] = useState({
    title: '',
    description: '',
  });
  const navigate = useNavigate()

  useEffect(() => {
		axios.get('http://localhost:8080/api/task/getTasks/'+id)
			.then(result =>{ 
        console.log(result)
        setTasks(result.data)
        
      })
			.catch(err => console.log(err));
	},[]);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTasks((prevTask) => ({
          ...prevTask,
          [name]: value,
        }));
      };
      const Update = (e) =>{
        e.preventDefault()
        axios.put('http://localhost:8080/api/task/updateTask/'+id, task)
        .then(result => {
          console.log(result)
          navigate('/')})
          .catch(err => console.log(err))
      }

  return (
    <div>
        <div className={styles.container}>
    <h1 className={styles.title}>Update Task</h1>
      <form onSubmit={Update}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
            
            
          />
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <br />
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UpdateTask