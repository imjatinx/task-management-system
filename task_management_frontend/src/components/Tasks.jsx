import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskUpdateModal({ show, handleClose, task }) {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")

  const { user } = useContext(AuthContext);

  const handleTaskUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://127.0.0.1:8000/api/task_update/${task.id}/`,
        { title, description: desc, due_date: dueDate },
        {
          headers: { Authorization: `Bearer ${user.access}` },
        }
      ).then(response => {
        if (response.data.success) {
          console.log(response.data);
          // handleFetchTask();
        }
      })
    } catch (e) {
      console.error('Failed to update task :', e);
      setError('Failed to update task');
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleTaskUpdate}>
            <input type="text" name="title" id="" defaultValue={task.title || ''} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <textarea name="description" id="" defaultValue={task.description || ''} onChange={(e) => setDesc(e.target.value)}></textarea>
            <br />
            <input type="date" name="dueDate" id="" defaultValue={task.due_date || ''} onChange={e => setDueDate(e.target.value)} />
            <br />
            <input type="submit" value="Update" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


const Tasks = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")
  const [taskList, setTaskList] = useState(null)
  const [task, setTask] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(AuthContext);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/task_create/",
        { title: title || task.title, description: desc || task.description, due_date: dueDate || task.due_date },
        {
          headers: {
            Authorization: `Bearer ${user.access}`
          }
        }).then(response => {
          if (response.data.success) {
            handleFetchTask()
          }
        })
    } catch (e) {
      console.error('Failed to create task :', e);
      setError('Failed to create task');
    }
  }

  const handleFetchTask = async () => {
    try {
      await axios.get("http://127.0.0.1:8000/api/task_all/",
        {
          headers: {
            Authorization: `Bearer ${user.access}`
          }
        }).then(response => {
          if (response.data.success) {
            setTaskList(response.data.data)
          }
        })
    } catch (e) {
      console.error('Failed to fetch task :', e);
      setError('Failed to fetch task');
    }
  }

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/task_delete/${taskId}`,
        {
          headers: { Authorization: `Bearer ${user.access}` },
        }
      ).then(response => {
        if (response.data.success) {
          handleFetchTask();
        }
      })
    } catch (e) {
      console.error('Failed to delete task :', e);
      setError('Failed to delete task');
    }
  }

  useEffect(() => {
    handleFetchTask()
  }, [])

  return (
    <div>
      <form onSubmit={handleCreateTask}>
        <input type="text" name="title" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <textarea name="description" id="" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
        <br />
        <input type="date" name="dueDate" id="" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <br />
        <input type="submit" value="Create" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            taskList && taskList.map((task) => {
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.due_date}</td>
                  <td>
                    <button onClick={() => {
                      setTask(task)
                      handleShow()
                    }}>Update</button>
                    <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <TaskUpdateModal show={show} handleClose={handleClose} task={task} />
    </div>
  )
}

export default Tasks