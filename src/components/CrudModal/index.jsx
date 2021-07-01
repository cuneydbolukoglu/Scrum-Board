import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { database } from '../../firebase';

const CrudModal = props => {
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);
    const [assignedUser, setAssignedUser] = useState(null);
    const [visible, setVisible] = useState(false);

    const deleteIssue = () => {
        let issueRef = database.ref('data/' + props.data.id);
        issueRef.remove();
        props.onHide();
    }

    const updateIssue = () => {

        database.ref('data/' + props.data.id).set({
            subject: subject,
            description: description,
            createDate: props.data.createDate,
            status: props.data.status,
            createUser: props.data.createUser,
            assignedUser: props.data.createUser,
            id: props.data.id
        });

        props.onHide();
    }

    useEffect(() => {
        setSubject(props.data ? props.data.subject : '')
        setDescription(props.data ? props.data.description : '')
        setAssignedUser(props.data ? props.data.assignedUser : '')
        console.log(props);
        setVisible(props.onShow);
    }, [props]);

    return (
        <Modal
            title="issue"
            visible={visible}
            onOk={() => updateIssue}
            onCancel={() => setVisible(false)}
            width={650}
        >
            <Button variant="danger" onClick={deleteIssue}>
                Delete
            </Button>
            <Form>
                <Form.Item
                    label="subject"
                    name="basic"
                    onChange={(e) => setSubject(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    defaultValue={subject}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="basic"
                    onChange={(e) => setDescription(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    defaultValue={description}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CrudModal;