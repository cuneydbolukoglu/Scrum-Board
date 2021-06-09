import { useState, useEffect } from 'react';
import { Dropdown, Layout, Menu } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    DownOutlined,
    NotificationOutlined,
    LogoutOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import TaskList from './TaskList';

const Layouts = props => {
    const [user, setUser] = useState('');
    const [collapsed, setCollapsed] = useState(false);

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            user.displayName ? setUser(user.displayName) : setUser(user.email)
        })
    }

    useEffect(() => {
        authListener();
    }, []);

    const { Header, Sider, Content } = Layout;


    const onLogout = () => {
        window.location.reload();
        auth.signOut();
        // history.push("/");
        localStorage.removeItem("token");
    }


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
        <Layout>
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" style={{ fontSize: '20px', padding: '10px' }}>Task Board</div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ProfileOutlined />}>
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        Users
            </Menu.Item>
                    <Menu.Item key="4" icon={<NotificationOutlined />}>
                        Notifications
            </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: '10px' }}>
                    <h4> </h4>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <UserOutlined /> {user}
                        </a>
                    </Dropdown>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <TaskList />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Layouts;