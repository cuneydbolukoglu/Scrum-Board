import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import ErrorMessage from '../components/error-message';
import { CHANGE_USERNAME } from '../components/message/message';
import { Form, Button } from 'react-bootstrap';
import i18n from '../i18n';

const Profile = props => {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);

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
                        <Form.Label>Your Full Name</Form.Label>
                        <Form.Control type="text" value={name} placeholder="Your Full Name" onChange={(e) => setName(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your name with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={updateUserName}>
                        Change Display Name
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