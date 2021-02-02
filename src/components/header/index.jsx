import { useLocation } from 'react-router-dom';

const Index = props => {

    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'

    return (
        match ? <></> : (
            <header>
                <div className="logo">Task Board App</div>
            </header>
        )
    )
}

export default Index;