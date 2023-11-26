import { Redirect } from 'react-router-dom';
import Tasklist from '../components/TaskList/';

const Private = props => {
    const haslogin = localStorage.getItem("token");

    return (
        haslogin ? <Tasklist /> : <Redirect to="/login"/>
    )
}

export default Private;