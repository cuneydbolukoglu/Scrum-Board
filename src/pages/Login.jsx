import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LOGIN_SUCCESS } from '../components/message/message';
import ErrorMessage from '../components/error-message';
import { auth } from '../firebase';
import md5 from 'md5';
import { useTranslation } from "react-i18next";

const Login = props => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);
    const [validated, setValidated] = useState(false);
    const { i18n } = useTranslation();

    const history = useHistory();

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
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

        setValidated(true);
    };

    return (
        <section className="justify-content-center align-items-center d-flex">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h1>{i18n.t('Login')}</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{i18n.t('Email-address')}</Form.Label>
                    <Form.Control type="email" placeholder={i18n.t("Please input your Email")} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{i18n.t('Password')}</Form.Label>
                    <Form.Control type="password" placeholder={i18n.t("Please input your Password")} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label={i18n.t("Remember-me")} />
                </Form.Group>
                <ErrorMessage message={errorMessage} result={errorResult} />
                <Button variant="primary" type="submit">
                    {i18n.t("Login")}
                </Button>
                <Link to='/register'>
                    <Button
                        variant="light"
                    >{i18n.t("Create-an-Account")}</Button>
                </Link>
            </Form>
        </section>
    );
};

export default Login;