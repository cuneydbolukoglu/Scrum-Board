import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ErrorMessage from '../components/error-message';
import { MATCH_PASWORD, NULL_PASSWORD, NULL_USERNAME, USER_CREATE } from '../components/message/message';
import { auth } from '../firebase';
import md5 from 'md5';
import { Form, Input, Button, Checkbox } from 'antd';

const Register = props => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);
    const [name, setName] = useState(null);

    const history = useHistory();

    const onButtonClick = e => {
        e.preventDefault();

        if (!email) {
            setErrorMessage(NULL_USERNAME);
        } else if (!password) {
            setErrorMessage(NULL_PASSWORD);
        } else if (password !== repeatPassword) {
            setErrorMessage(MATCH_PASWORD);
        } else {

            auth.createUserWithEmailAndPassword(email, md5(password))
                .then(res => {
                    console.log("response: ", res);
                    console.log("response: ", res.message);

                    updateUserName();

                    if (res.operationType === "signIn") {
                        setErrorMessage(USER_CREATE);
                        setErrorResult(true);
                        let token = res.user.refreshToken
                        localStorage.setItem("token", token);
                        history.push('/');
                    } else {
                        setErrorResult(false);
                        setErrorMessage(res.message)
                    }

                })
                .catch(err => {
                    console.error("error: ", err);
                    setErrorMessage(err.message);
                    setErrorResult(false);
                })

            const updateUserName = (user) => {
                auth.currentUser.updateProfile({ displayName: name }).then(() => {
                    console.log('Kullanıcının ismi başarıyla değiştirildi!')
                }).catch((error) => setErrorMessage(error));
            }

        }
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
        <section className="full-screen">
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h1>REGISTER</h1>

                <Form.Item
                    label="Display Name"
                    name="displayname"
                    onChange={(e) => setName(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Display Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Password Match"
                    name="passwordmatch"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password Match!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        onClick={onButtonClick}
                        type="submit"
                        htmlType="submit">
                        Sign up
                    </Button>
                    <ErrorMessage message={errorMessage} result={errorResult} />
                    <Link to='/login'>
                        <Button
                            type="primary"
                            block
                        >Login</Button>
                    </Link>
                </Form.Item>

            </Form>
        </section>
    );
};

export default Register;