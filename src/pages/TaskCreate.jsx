import { useState } from "react";
import { Button } from "react-bootstrap";
import MyVerticallyCenteredModal from './Modal';

const TaskCreate = props => {
    const [modalShow, setModalShow] = useState(false);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);

    const saveChanges = e => {
        console.log("Subject: ", subject, '|', "Description: ", description)
    }

    return (
        <>
            <Button
                variant="primary"
                onClick={() => setModalShow(true)}>
                Create
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                saveChanges={(e) => saveChanges}
                // Subject={subject}
                // Description={description}
            />
        </>
    );
}

export default TaskCreate;