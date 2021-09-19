import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { database, auth } from '../../firebase';

const CrudModalAdd = props => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [createUser, setCreateUser] = useState(null);

    useEffect(() => {
        authListener();
    }, [props]);

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            setCreateUser(user.email)
        })
    }

    const setData = () => {
        var number = Math.random() // 0.9394456857981651
        var id = number.toString(36).substr(2, 9); // 'xtis06h6'

        database.ref('data/' + id).set({
            createDate: Date.now(),
            subject: subject,
            description: description,
            status: 'new',
            createUser: createUser,
            assignedUser: createUser,
            id: id
        });

        props.onClose();
    }

    return (
        <Modal show={props.show} onHide={() => props.onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Create</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={setData}>
                    <Form.Group className="mb-3" controlId="formBasicSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSubject(e.target.value)} value={subject} placeholder="" required />
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

export default CrudModalAdd;