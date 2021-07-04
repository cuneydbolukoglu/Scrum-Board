import { useState, useEffect } from 'react';
import { Modal, Form, Input, Dropdown, Menu } from 'antd';
import { database, auth } from '../../firebase';

const CrudModal = props => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    // const [assignedUser, setAssignedUser] = useState('');
    const [visible, setVisible] = useState(false);
    const [createUser, setCreateUser] = useState(null);

    const deleteIssue = () => {
        let issueRef = database.ref('data/' + props.data.id);
        issueRef.remove();
        setVisible(false);
    }

    const updateData = () => {

        database.ref('data/' + props.data.id).set({
            subject: subject,
            description: description,
            createDate: props.data.createDate,
            status: props.data.status,
            createUser: props.data.createUser,
            assignedUser: props.data.createUser,
            id: props.data.id
        });

        setVisible(false);
    }


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

        setVisible(false);
    }

    useEffect(() => {
        setVisible(props.onShow);
        // setSubject(props.data ? props.data.subject : '')
        // setDescription(props.data ? props.data.description : '')
        // setAssignedUser(props.data ? props.data.assignedUser : '')
        console.log(props);
        authListener();
    }, [props]);

    const { TextArea } = Input;

    const menu = (
        <Menu>
            <Menu.Item key="1" danger onClick={deleteIssue}>Delete</Menu.Item>
            <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
        </Menu>
    );

    const onOk = props.method === 'create' ? () => setData() : () => setVisible(false) || updateData()

    return (
        <Modal
            title="issue"
            visible={visible}
            onOk={onOk}
            onCancel={() => setVisible(false)}
            width={650}
        >
            <Form
                layout="vertical"
                labelCol={{ span: 6 }}
            >
                <Dropdown.Button overlay={menu}></Dropdown.Button>
                <Form.Item
                    label="Subject"
                    name="subject"
                    onChange={(e) => setSubject(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    initialValue={props.data ? props.data.subject : ''}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Assigner User"
                    name="assignedUser"
                    onChange={(e) => setDescription(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    initialValue={props.data ? props.data.assignedUser : ''}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    initialValue={props.data ? props.data.description : ''}
                >
                    <TextArea rows={6} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CrudModal;