import { useState } from 'react';
import { Button, Modal, Form } from "react-bootstrap";

const IssueModal = props => {
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);

    console.log("task", subject + description);

    return (
        <Modal show={props.onShow} onHide={() => props.onHide()}>
            <Modal.Header>
                <Modal.Title>issue</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        //defaultValue={props.data.subject ? props.data.subject : 'null'}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        //defaultValue={props.data.description ? props.data.description : 'null'}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.show}>
                    Save
            </Button>
                <Button variant="light" onClick={props.onHide}>
                    Cancel
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IssueModal;