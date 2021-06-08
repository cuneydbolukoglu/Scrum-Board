import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import firebase from 'firebase';
import ErrorMessage from '../components/error-message';
import { NEW_PASSWORD } from '../components/message/message';
import md5 from 'md5';
import { Form, Input, Button } from 'antd';

const ChangePassword = props => {
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);

    const history = useHistory();

    const haslogin = localStorage.getItem("token");

    const onChangePasswordPress = e => {
        e.preventDefault();

        const reauthenticate = (currentPassword) => {
            var user = auth.currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(user.email, md5(currentPassword));
            console.log("user", cred);

            return user.reauthenticateWithCredential(cred);
        }

        reauthenticate(currentPassword).then(() => {
            var user = auth.currentUser;

            user.updatePassword(md5(newPassword)).then(() => {
                setErrorResult(true);
                setErrorMessage(NEW_PASSWORD)
            }).catch((error) => {
                setErrorMessage(error.message);
                setErrorResult(false);
            });
        }).catch((error) => {
            setErrorMessage(error.message);
            setErrorResult(false);
        });
    }

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
                    label="Current Password"
                    name="Current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Current password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="New password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your New password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        onClick={onChangePasswordPress}
                        type="primary"
                        htmlType="submit">
                        Change Password
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

export default ChangePassword;