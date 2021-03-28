import { Redirect } from 'react-router-dom';
import TaskCreate from '../components/TaskCreateModal';

const Private = props => {
    const haslogin = localStorage.getItem("token");

    return (
        haslogin ? <TaskCreate /> : <Redirect to="/login"/>
    )
}

export default Private;