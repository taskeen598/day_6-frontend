import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


const Cards = ({ taskObj, index, deleteTask, updateListArray,stateManage,setStateManage }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(taskObj._id)
    }


    return (
        <div class="card-wrapper mr-5"> 
            <div class="card-top" style={{ "background-color": colors[index % 5].primaryColor }}></div>
            <div class="task-holder">
                <span class="card-header" style={{ "background-color": colors[index % 5].secondaryColor, "border-radius": "10px" }}>{taskObj.Title}</span>
                <p className="mt-3" style={{ "background-color": colors[index % 5].secondaryColor, "border-radius": "10px", "height": "100%", "padding": "5px", "color": "#f64f59"  }}>{taskObj.Description}</p>
                <div style={{ "position": "absolute", "right": "20px", "bottom": "20px" }}>
                    <FontAwesomeIcon icon={faEdit} class="mr-3" style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={() => setModal(true)} />
                    <FontAwesomeIcon icon={faTrash} style={{ "color": colors[index % 5].primaryColor, "cursor": "pointer" }} onClick={handleDelete} />
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} stateManage={stateManage} setStateManage={setStateManage} />
        </div>
    );
};

export default Cards;