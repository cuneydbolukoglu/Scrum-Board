import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { auth } from '../../firebase';
import Logo from '../../assets/logo.svg';
import { useTranslation } from "react-i18next";

import { useSelector } from 'react-redux';
import { dataChange } from '../../redux/actions';

const Index = props => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const { i18n } = useTranslation();

    const data = useSelector(state => state)

    console.log(data);
    dataChange("cuneyd");

    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.displayName)
            } else if (user.email) {
                setUser(user.email)
            }
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

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return (
        match ?
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
                                <NavDropdown title={localStorage.getItem("i18nextLng").toUpperCase()} id="collasible-nav-dropdown">
                                    <NavDropdown.Item onClick={() => changeLanguage("tr")}>TR</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => changeLanguage("en")}>EN</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            :
            <div>
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
                                />
                                {'Scrum Board'}
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse className="justify-content-end">
                                <Nav>
                                    {/* <Nav.Link as={Link} to="/">{i18n.t('home')}</Nav.Link>
                                    <Nav.Link as={Link} to="/contact">{i18n.t('contact')}</Nav.Link> */}
                                    <NavDropdown title={user} id="collasible-nav-dropdown">
                                        <NavDropdown.Item>{email}</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/profile">{i18n.t('profile')}</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/change-password">{i18n.t('change_password')}</NavDropdown.Item>
                                        <NavDropdown.Item onClick={onLogout}>{i18n.t('logout')}</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title={localStorage.getItem("i18nextLng").toUpperCase()} id="collasible-nav-dropdown">
                                        <NavDropdown.Item onClick={() => changeLanguage("tr")}>TR</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => changeLanguage("en")}>EN</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
            </div>
    )
}

export default Index;