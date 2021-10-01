import { useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const Index = props => {
    const { i18n } = useTranslation();
    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'

    return (
        !match &&
        <footer>
            <Navbar bg="dark" variant="dark" className="mt-5 p-2">
                <Navbar.Text>
                    {i18n.t('Copyright')}
                </Navbar.Text>
            </Navbar>
        </footer>
    )
}

export default Index;