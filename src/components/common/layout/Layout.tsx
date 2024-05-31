import React from "react";
import { TeamOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { IUser } from "../../../utils/Auth";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import LocalStorageKey from "../../../common/constants/LocalStorageKeys";

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: "1",
        icon: React.createElement(TeamOutlined),
        label: "Clients",
    },
];

type Props = {
    children: React.ReactNode;
};

const DefaultLayout = (props: Props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [user, setUser] = useLocalStorage<IUser>(LocalStorageKey.User);
    const navigate = useNavigate();
    const logOut = () => {
        setUser(null);
        navigate("/login");
    };
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ justifyContent: "flex-end", paddingRight: "2em" }}>
                        <Menu.Item key={1}>Welcome, {user.Username}</Menu.Item>
                        <Menu.Item
                            key={2}
                            onClick={() => logOut()}>
                            Log out
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
