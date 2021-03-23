import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { auth } from '../firebase';
import ErrorMessage from '../components/error-message';
import { MATCH_PASWORD, MATCHED_PASSWORD } from '../components/message/message';

const ChangePassword = props => {
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);

    const onButtonClick = e => {
        e.preventDefault();
        if (oldPassword) {
            setErrorMessage(MATCHED_PASSWORD);
            setErrorResult(true);
        } else {
            setErrorMessage(MATCH_PASWORD);
            setErrorResult(false);      
        }
        
        var user = auth.currentUser;
        //var newPassword = getASecureRandomPassword();

        user.updatePassword(newPassword).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <Container className="fluid" md={4}>
            <Form className="justify-content-md-center pt-5">
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onButtonClick}>
                    Change Password
                </Button>
                <ErrorMessage message={errorMessage} result={errorResult} />
            </Form>
        </Container>
    )
}

export default ChangePassword;