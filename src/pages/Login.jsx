import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS, NULL_PASSWORD, NULL_USERNAME } from '../components/message/message';
import ErrorMessage from '../components/error-message';
import { auth } from '../firebase';
import md5 from 'md5';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = props => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);

    const history = useHistory();

    const onButtonClick = e => {
        e.preventDefault();

        if (!email) {
            setErrorMessage(NULL_USERNAME);
        } else if (!password) {
            setErrorMessage(NULL_PASSWORD);
        } else {

            auth.signInWithEmailAndPassword(email, md5(password))
                .then(res => {
                    console.log("response: ", res);

                    if (res.operationType === "signIn") {
                        setErrorMessage(LOGIN_SUCCESS);
                        setErrorResult(true);
                        let token = res.user.refreshToken
                        localStorage.setItem("token", token);
                        history.push("/");
                    } else {
                        setErrorResult(false);
                    }
                })
                .catch(err => {
                    console.error("error: ", err);
                    setErrorMessage(err.message);
                    setErrorResult(false);
                })
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
                <h1>LOGIN</h1>
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

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        onClick={onButtonClick}
                        type="submit"
                        htmlType="submit">
                        Login
                    </Button>
                    <ErrorMessage message={errorMessage} result={errorResult} />
                    <Link to='/register'>
                        <Button
                            type="primary"
                            block
                        >Create an Account</Button>
                    </Link>
                </Form.Item>

            </Form>
        </section>
    );
};

export default Login;