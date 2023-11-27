import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { auth } from '../firebase';
import firebase from 'firebase';
import ErrorMessage from '../components/error-message';
import { NEW_PASSWORD } from '../components/message/message';
import md5 from 'md5';
import { useTranslation } from "react-i18next";

const ChangePassword = props => {
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);
    const { i18n } = useTranslation();

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

    return (
        haslogin ?
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{i18n.t("current_password")}</Form.Label>
                    <Form.Control type="password" placeholder={i18n.t("current_password")} onChange={(e) => setCurrentPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                    <Form.Label>{i18n.t("new_password")}</Form.Label>
                    <Form.Control type="password" placeholder={i18n.t("new_password")} onChange={(e) => setNewPassword(e.target.value)} />
                    <Form.Text className="text-muted">
                        {i18n.t("password_description")}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onChangePasswordPress}>
                    {i18n.t("change_password")}
                </Button>
                <Button variant="light" type="submit" onClick={onCancel}>
                    {i18n.t("cancel")}
                </Button>
                <ErrorMessage message={errorMessage} result={errorResult} />
            </Form>
            : <Redirect to="/login" />
    )
}

export default ChangePassword;