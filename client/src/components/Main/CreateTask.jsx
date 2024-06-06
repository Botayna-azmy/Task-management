import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import {useNavigate} from 'react-router-dom'

const CreateTask = () => {
  const [task, setTasks] = useState({
    title: '',
    description: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const navigate = useNavigate()
  const Submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/task/createTasks', task)
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }
 
  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Create a New Task</h1>
      <form onSubmit={Submit}>
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
