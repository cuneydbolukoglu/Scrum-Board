import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import ErrorMessage from '../components/error-message';
import { CHANGE_USERNAME } from '../components/message/message';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const Profile = props => {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);
    const { i18n } = useTranslation();

    const haslogin = localStorage.getItem("token");

    const history = useHistory();

    const updateUserName = (user) => {
        auth.currentUser.updateProfile({ displayName: name }).then(() => {
            console.log(CHANGE_USERNAME)
            setErrorMessage(CHANGE_USERNAME);
            setErrorResult(true);
            window.location.reload();
        }).catch((error) => {
            setErrorMessage(error)
            setErrorResult(false);
        });
    }

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user.displayName ? setName(user.displayName) : setName('')
        });
    }

    useEffect(() => {
        authListener();
    }, []);

    const onCancel = () => {
        history.push("/");
    }

    return (
        haslogin ?
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>{i18n.t("your_full_name")}</Form.Label>
                    <Form.Control type="text" value={name} placeholder={i18n.t("your_full_name")} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={updateUserName}>
                    {i18n.t("change_display_name")}
                </Button>
                <Button variant="light" type="submit" onClick={onCancel}>
                    {i18n.t("cancel")}
                </Button>
                <ErrorMessage message={errorMessage} result={errorResult} />
            </Form>
            : <Redirect to="/login" />
    )
}

export default Profile;