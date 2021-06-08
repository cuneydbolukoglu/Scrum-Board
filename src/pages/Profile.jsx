import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import ErrorMessage from '../components/error-message';
import { CHANGE_USERNAME } from '../components/message/message';
import { Form, Input, Button } from 'antd';


const Profile = props => {
    const [name, setName] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);

    const haslogin = localStorage.getItem("token");

    const history = useHistory();

    const updateUserName = (user) => {
        auth.currentUser.updateProfile({ displayName: name }).then(() => {
            console.log(CHANGE_USERNAME)
            setErrorMessage(CHANGE_USERNAME);
            setErrorResult(true);
        }).catch((error) => {
            setErrorMessage(error)
            setErrorResult(false);
        });
    }

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user.displayName ? setName(user.displayName) : setName('')
        })
    }

    useEffect(() => {
        authListener();
    }, []);

    const onCancel = () => {
        history.push("/");
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        haslogin ?
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Your Full Name"
                    name="Your Full Name"
                    initialValue={name}
                    onChange={(e) => setName(e.target.value)}
                    rules={[
                        {
                            required: false,
                            message: 'Please input your Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        onClick={updateUserName}
                        type="primary"
                        htmlType="submit">
                        Change Display Name
                    </Button>

                    <Button
                        onClick={onCancel}>
                        Cancel
                    </Button>
                    <ErrorMessage message={errorMessage} result={errorResult} />
                </Form.Item>

            </Form>
            : <Redirect to="/login" />
    )
}

export default Profile;