import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS, NULL_PASSWORD, NULL_USERNAME } from '../components/message/message';
import ErrorMessage from '../components/error-message';
import { Container, Row, Button, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import md5 from 'md5';

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

    return (
        <section className="full-screen">
            <Container>
                <Row className="justify-content-md-center">
                    <Form>
                        <h1>LOGIN</h1>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button
                            onClick={onButtonClick}
                            variant="dark"
                            block
                        >Login</Button>
                        <ErrorMessage message={errorMessage} result={errorResult} />
                        <Link to='/register'>
                            <Button variant="light" block>Create an Account</Button>
                        </Link>
                    </Form>
                </Row>
            </Container>
        </section>
    )
}

export default Login;