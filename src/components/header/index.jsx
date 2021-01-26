import { Link } from 'react-router-dom';

const Index = props => {

    return (
        <header>
            <Link to="/">
                <div className="logo">Task Board App</div>
            </Link>
        </header>
    )
}

export default Index;