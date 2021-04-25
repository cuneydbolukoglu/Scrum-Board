import { useState, useEffect } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { database } from '../firebase';

const IssueModal = props => {
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);
    const [assignedUser, setAssignedUser] = useState(null);

    const clear = () => {
        setSubject('')
        setDescription('')
    }

    const deleteIssue = () => {
        let issueRef = database.ref('data/' + props.data.id);
        issueRef.remove();
        props.onHide();
    }

    useEffect(() => {
        setSubject(props.data ? props.data.subject : '')
        setDescription(props.data ? props.data.description : '')
        setAssignedUser(props.data ? props.data.assignedUser : '')

        console.log(props.data)

    }, [props.data]);

    return (
        <Modal show={props.onShow} onHide={() => props.onHide()} size="lg">
            <Modal.Header>
                <Modal.Title>issue</Modal.Title>
                <Button variant="danger" onClick={deleteIssue}>
                    Delete
            </Button>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Assignee</Form.Label>
                    <Form.Text><h6>{assignedUser}</h6></Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.show}>
                    Save
            </Button>
                <Button variant="light" onClick={props.onHide || clear}>
                    Cancel
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IssueModal;