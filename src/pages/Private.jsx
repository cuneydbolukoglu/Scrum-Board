import { Redirect } from 'react-router-dom';
import Layout from '../components/layout';

const Private = props => {
    const haslogin = localStorage.getItem("token");

    return (
        haslogin ? <Layout /> : <Redirect to="/login"/>
    )
}

export default Private;