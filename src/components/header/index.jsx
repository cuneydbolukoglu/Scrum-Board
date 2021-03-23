import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import LogoutIcon from '../../assets/img/sign-out-alt-solid.svg';

const Index = props => {
    const [user, setUser] = useState('');

    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user ? setUser(user.email) : setUser(null)
        })
    }

    const userLogout = () => {
        window.location.reload();
        auth.signOut();
        localStorage.removeItem("token");
    }

    useEffect(() => {
        authListener();
    }, []);

    return (
        !match &&
        <header>
            <Link to="/"><div className="logo">Task Board</div></Link>
            <NavDropdown title={user}>
                <NavDropdown.Item><Link to="/changepassword">Change password</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={userLogout}>Log out <img className="logoutIcon" src={LogoutIcon} alt="Logout" /></NavDropdown.Item>
            </NavDropdown>
        </header>

    )
}

export default Index;