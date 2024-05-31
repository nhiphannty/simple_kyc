import { Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../utils/Auth";
import { useNavigate } from "react-router-dom";
import LocalStorageKey from "../common/constants/LocalStorageKeys";

const UserLayout = (props: { children: React.ReactNode }) => {
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
            <Header style={{ display: "flex", alignItems: "center" }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ marginLeft: "auto" }}
                    defaultSelectedKeys={["1"]}>
                    <Menu.Item key={1}>Welcome, {user.Username}</Menu.Item>
                    <Menu.Item
                        key={2}
                        onClick={() => logOut()}>
                        Log out
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: "0 48px" }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default UserLayout;
