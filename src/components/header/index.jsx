import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Dropdown, Layout, Menu } from 'antd';
import { auth } from '../../firebase';
import {
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const Index = props => {
    const [user, setUser] = useState('');
    const { Header } = Layout;

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user.displayName ? setUser(user.displayName) : setUser(user.email)
        })
    }

    useEffect(() => {
        authListener();
    }, []);

    const onLogout = () => {
        window.location.reload();
        auth.signOut();
        localStorage.removeItem("token");
    }

    const location = useLocation();
    const match = location.pathname === '/login' | location.pathname === '/register'


    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/change-password">Change Password</Link>
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} danger onClick={onLogout}>Log out</Menu.Item>
        </Menu>
    );

    return (
        !match &&
        <Header
            className="site-layout-background"
            style={{ padding: '10px' }}>
            <h4> </h4>
            <Dropdown overlay={menu}>
                <Link className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <UserOutlined /> {user}
                </Link>
            </Dropdown>
        </Header>
    )
}

export default Index;