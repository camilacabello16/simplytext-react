import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Link, RouterProvider, createBrowserRouter, redirect, useNavigate } from 'react-router-dom';
import TextFromImage from '../components/TextFromImage';
import { menu } from '../constants/menu';
const { Header, Content, Footer } = Layout;

const BasicLayout = ({ children }) => {
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <div>Hello world</div>,
            },
            {
                path: "/text-from-image",
                element: <TextFromImage />,
            },
        ]
    );

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Router>
                    <Menu
                        style={{ width: '100%' }}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={menu.map((item, index) => {
                            return {
                                key: index,
                                label: (<Link to={item.path}>{item.text}</Link>),
                                // label: <div onClick={() => redirectRoute(item)}>{item.text}</div>,
                            }
                        })}
                    />
                </Router>
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                {/* <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                        marginTop: 16,
                        padding: 16
                    }}
                >
                    <RouterProvider router={router} />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default BasicLayout;