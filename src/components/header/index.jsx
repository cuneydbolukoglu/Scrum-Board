import { useLocation } from 'react-router-dom';

const Index = props => {

    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'

    return (
        !match &&
            <header>
                <div className="logo">Task Board</div>
            </header>
        
    )
}

export default Index;