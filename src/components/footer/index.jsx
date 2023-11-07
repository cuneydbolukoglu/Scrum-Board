import { useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const Index = props => {
    const { i18n } = useTranslation();
    // const location = useLocation();
    // const match = location.pathname === '/login' | location.pathname === '/register'

    return (
        <footer>
            <Navbar className="mt-1 p-2">
                <Navbar.Text>
                    {i18n.t('Copyright')} © Cüneyd
                </Navbar.Text>
            </Navbar>
        </footer>
    )
}

export default Index;