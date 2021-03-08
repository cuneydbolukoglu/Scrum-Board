import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { uuidv4 } from '../components/helper';
import { db } from '../firebase';

const TaskCreate = props => {
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);

    const handleClose = () => { setShow(false) };
    const handleShow = () => { setShow(true) };

    const saveChanges = (e) => {
        const data = { id: uuidv4(), subject: subject, description: description };
        localStorage.setItem('data', JSON.stringify(data));
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crate Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            onChange={(e) => setDescription(e.target.value)}
                            rows={8} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TaskCreate;