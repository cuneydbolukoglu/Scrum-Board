import { useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

const Index = props => {

    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'

    return (
        !match &&
        <footer>
            <Navbar bg="dark" variant="dark" className="mt-5 p-2">
                <Navbar.Text>
                    Copyright
                </Navbar.Text>
            </Navbar>
        </footer>
    )
}

export default Index;