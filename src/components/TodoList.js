import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Cards';
import axios from 'axios';
const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    const [stateManage, setStateManage] = useState(false)
    
    useEffect(() => {
        handleGetALLTodo()
    }, [stateManage])

    const handleGetALLTodo = async () => {
        try {
          const response = await axios.get("https://day-6-backend.vercel.app/get-all-notes");
      
          const data = response.data;
          console.log(data.data);
          setTaskList(data.data);
          
        } catch (error) {
          console.error("Error occurred:", error);
        }
      };
      
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://day-6-backend.vercel.app/delete-notes/${id}`,{
                method:"delete"
            });
        
            const data = await response.json();
            console.log(data.message);
            setStateManage(prev=>!prev)
            
          } catch (error) {
            console.error("Error occurred:", error);
          }
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    return (
        <>
            <div className = "header text-center">
                <h3>Notes App</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <div className = "task-container">
            {taskList && taskList.map((obj , index) => <Card stateManage={stateManage} setStateManage={setStateManage} taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask} stateManage={stateManage} setStateManage={setStateManage}/>
        </>
    );
};

export default TodoList;