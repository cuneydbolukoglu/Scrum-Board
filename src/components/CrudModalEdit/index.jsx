import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { database } from '../../firebase';

const CrudModalEdit = props => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setSubject(props.data ? props.data.subject : '')
        setDescription(props.data ? props.data.description : '')
        setAssignedUser(props.data ? props.data.assignedUser : '')
        setStatus(props.data ? props.data.status : '')
    }, [props]);

    const deleteIssue = () => {
        let issueRef = database.ref('data/' + props.data.id);
        issueRef.remove();
        props.onClose();
    }

    const updateData = () => {
        database.ref('data/' + props.data.id).set({
            subject: subject,
            description: description,
            createDate: props.data.createDate,
            status: status ? status : props.data.status,
            createUser: props.data.createUser,
            assignedUser: props.data.createUser,
            id: props.data.id
        });

        props.onClose();
    }

    const Status = [
        "new",
        "in-progress",
        "done"
    ]

    return (
        <Modal show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
                <Button className="position-absolute" style={{ right: "45px" }} variant="danger" size="sm" onClick={deleteIssue}>Delete</Button>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={updateData}>
                    <Form.Group className="mb-3" controlId="formBasicSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSubject(e.target.value)} value={subject} placeholder="" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCreate">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" onChange={(e) => setStatus(e.target.value)} value={status} placeholder="" required >
                            {
                                Status.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCreate">
                        <Form.Label>Assigned User</Form.Label>
                        <Form.Control disabled type="text" onChange={(e) => setAssignedUser(e.target.value)} value={assignedUser} placeholder="" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={10} onChange={(e) => setDescription(e.target.value)} value={description} placeholder="" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CrudModalEdit;