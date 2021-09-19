import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import ErrorMessage from '../components/error-message';
import { USER_CREATE } from '../components/message/message';
import { auth } from '../firebase';
import md5 from 'md5';

const Register = props => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);
    const [name, setName] = useState(null);
    const [validated, setValidated] = useState(false);

    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            auth.createUserWithEmailAndPassword(email, md5(password))
                .then(res => {
                    console.log("response: ", res);

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

        setValidated(true);
    }

    return (
        <section className="full-screen">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h1>REGISTER</h1>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" placeholder="Please input your Name" onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Please input your Email" onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Please input your Password" onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <ErrorMessage message={errorMessage} result={errorResult} />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to='/login'>
                    <Button
                        variant="light"
                    >Login</Button>
                </Link>
            </Form>
        </section>
    );
};

export default Register;