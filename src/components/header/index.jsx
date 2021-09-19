import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { auth } from '../../firebase';
import Logo from '../../assets/logo.svg';
import { useSelector } from 'react-redux';
import { langChange } from '../../redux/actions';

const Index = props => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const lang = useSelector(state => state.langChangeReducer)

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user ? setUser(user.displayName) : setUser(user.email)
            setEmail(user.email);
        })
    }

    useEffect(() => {
        authListener();
    }, []);

    const onLogout = () => {
        window.location.reload();
        auth.signOut();
        localStorage.removeItem("token");
    }

    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'

    return (
        !match &&
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light" className="mb-5">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Scrum Board
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            <NavDropdown title={lang.toUpperCase()} id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={() => langChange("tr")}>TR</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => langChange("en")}>EN</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <NavDropdown title={user} id="collasible-nav-dropdown">
                            <NavDropdown.Item>{email}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/change-password">Change Password</NavDropdown.Item>
                            <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Index;