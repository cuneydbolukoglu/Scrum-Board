import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutIcon from '../assets/img/sign-out-alt-solid.svg';
import { auth } from '../firebase';
import Tasks from './Tasks';

const Home = props => {
    const [user, setUser] = useState('');

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user ? setUser(user.email) : setUser(null)
        })
    }

    useEffect(() => {
        authListener();
    });

    const userLogout = () => {
        auth.signOut();
        localStorage.removeItem("token")
    }

    return (
        <Container>
            <Row className="justify-content-between pt-3">
                <p>Hoşgeldiniz, <b>{user}</b></p>
                <Link to="/" onClick={userLogout}>
                    <button className="button-logout">Logout<img src={LogoutIcon} alt="Logout" /></button>
                </Link>
            </Row>
            <Tasks />
        </Container>
    )
}

export default Home;