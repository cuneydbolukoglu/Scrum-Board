import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
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
            <div className="logo">Task Board</div>
            <DropdownButton
                menuAlign="right"
                title={user}
                id="dropdown-menu-align-right"
            >
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={userLogout}>Log out <img className="logoutIcon" src={LogoutIcon} alt="Logout" /></Dropdown.Item>
            </DropdownButton>
        </header>

    )
}

export default Index;