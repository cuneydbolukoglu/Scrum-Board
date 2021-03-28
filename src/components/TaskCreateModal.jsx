import { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { database } from '../firebase';
import TaskList from "./TaskList";

const TaskCreate = props => {
    const [show, setShow] = useState(false);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);

    const handleClose = () => { setShow(false) };
    const handleShow = () => { setShow(true) };

    const setData = () => {
        var number = Math.random() // 0.9394456857981651
        var id = number.toString(36).substr(2, 9); // 'xtis06h6'

        database.ref('data/' + id).set({
            subject: subject,
            description: description,
            status: 'new'
        });
    }

    return (
        <Container className="pt-3">
            <Button variant="primary" onClick={handleShow}>
                Create
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create issue</Modal.Title>
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
                    <Button variant="primary" onClick={setData}>
                        Save
                    </Button>
                    <Button variant="light" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <TaskList />
        </Container>
    );
}

export default TaskCreate;