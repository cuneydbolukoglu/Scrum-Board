import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
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
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Current password" onChange={(e) => setCurrentPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onChangePasswordPress}>
                    Change Password
                </Button>
                <Button variant="light" type="submit" onClick={onCancel}>
                    Cancel
                </Button>
                <ErrorMessage message={errorMessage} result={errorResult} />
            </Form>
            : <Redirect to="/login" />
    )
}

export default ChangePassword;