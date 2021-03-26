import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { auth } from '../firebase';
import firebase from 'firebase';
import ErrorMessage from '../components/error-message';
import { NEW_PASSWORD } from '../components/message/message';
import md5 from 'md5';

const ChangePassword = props => {
    const [currentPassword, setCurrentPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);

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

    return (
        haslogin ?
            <Container className="fluid">
                <Form className="justify-content-md-center pt-5">
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control style={{ witdh: '200px' }} type="password" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control style={{ witdh: '200px' }} type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onChangePasswordPress}>
                        Change Password
                </Button>
                    <ErrorMessage message={errorMessage} result={errorResult} />
                </Form>
            </Container> : <Redirect to="/login" />
    )
}

export default ChangePassword;