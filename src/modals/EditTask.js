import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({modal, toggle, updateTask, taskObj,stateManage,setStateManage}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [togle,setTogle]=useState("toggle")

// Handle input Change
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "taskName"){
            setTaskName(value)
        }else{
            setDescription(value)
        }
    }

    async function handleUpdateTodo(){
        const res = await fetch(`https://day-6-backend.vercel.app/update-notes/${taskObj._id}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                Title:taskName,Description:description
            })
        })
        const data = await res.json();
        setTogle(toggle)
        if(stateManage){
            setStateManage(false)
        }
        else{
            setStateManage(true)
        }
        console.log("This is Data",data);
    }

    useEffect(() => {
        setTaskName(taskObj.Title)
        setDescription(taskObj.Description)
    },[])

    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     let tempObj = {}
    //     tempObj['Title'] = taskName
    //     tempObj['Description'] = description
    //     updateTask(tempObj)
    // }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Task Name</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdateTodo}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTaskPopup;