import { Container } from 'react-bootstrap';
import TaskCreate from './TaskCreate';
import TaskList from './TaskList';

const Home = props => {

    return (
        <Container>
            <TaskCreate />
            <TaskList />
        </Container>
    )
}

export default Home;