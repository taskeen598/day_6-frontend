import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({modal, toggle, save,stateManage,setStateManage}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [togle,setTogle]=useState("toggle")

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value)
        }else if(name === "description"){
            setDescription(value)
        }
    }
    
    async function handleAddTodo(){
        const res = await fetch("https://day-6-backend.vercel.app/create-notes",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                Title:taskName,Description:description
            })
        })
        const data = await res.json();
        setTogle(toggle)
        setStateManage(prev => !prev)
        console.log("This is Data",data);
    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["Title"] = taskName
        taskObj["Description"] = description
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={togle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
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
            <Button color="primary" onClick={handleAddTodo}>Create</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTaskPopup;