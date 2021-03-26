import { Container } from 'react-bootstrap';
import TaskCreate from '../components/TaskCreate';
import TaskList from '../components/TaskList';

const Home = props => {

    return (
        <Container className="pt-3">
            <TaskCreate />
            <TaskList />
        </Container>
    )
}

export default Home;