import { Layout, Menu, theme } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { menu } from '../constants/menu';
const { Header, Content, Footer } = Layout;

const BasicLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Router>

                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="demo-logo" />
                    <Menu
                        style={{ width: '100%' }}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['0']}
                        items={menu.map((item, index) => {
                            return {
                                key: index,
                                label: (<Link to={item.path}>{item.text}</Link>),
                                // label: <div onClick={() => redirectRoute(item)}>{item.text}</div>,
                            }
                        })}
                    />
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
                        {/* <RouterProvider router={router} />
                     */}
                        <Routes>
                            <Route exact path="/" element={<div>Hello world</div>} />
                            {menu.map((item, index) => {
                                return (
                                    <Route path={item.path} element={item.element} key={index} />
                                );
                            })}
                        </Routes>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Router>

        </Layout>
    );
};
export default BasicLayout;