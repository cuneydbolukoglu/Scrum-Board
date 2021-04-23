import { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { Form, Button, Container } from 'react-bootstrap';
import ErrorMessage from '../components/error-message';
import { CHANGE_USERNAME } from '../components/message/message';

const Profile = props => {
    const [name, setName] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorResult, setErrorResult] = useState(null);

    const haslogin = localStorage.getItem("token");

    const history = useHistory();

    const updateUserName = (user) => {
        auth.currentUser.updateProfile({ displayName: name }).then(() => {
            console.log(CHANGE_USERNAME)
            setErrorMessage(CHANGE_USERNAME);
            setErrorResult(true);
        }).catch((error) => {
            setErrorMessage(error)
            setErrorResult(false);
        });
    }

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user.displayName ? setName(user.displayName) : setName('')
        })
    }

    useEffect(() => {
        authListener();
    }, []);

    const cancel = () => {
        history.push("/");
    }

    return (
        haslogin ?
            <Container className="fluid">
                <Form className="justify-content-md-center pt-5">
                    <Form.Group controlId="formGroupText">
                        <Form.Label>Your Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Full Name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={updateUserName}>
                        Change Display Name
                    </Button>
                    <Button variant="light" type="submit" onClick={cancel}>
                        Cancel
                    </Button>
                    <ErrorMessage message={errorMessage} result={errorResult} />
                </Form>
            </Container> : <Redirect to="/login" />
    )
}

export default Profile;