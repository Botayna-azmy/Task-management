import { Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskList from "./components/Main/TaskList";
import CreateTask from "./components/Main/CreateTask";
import UpdateTask from "./components/Main/UpdateTask";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
