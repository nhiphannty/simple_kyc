import { Button, Form, FormProps, Input, message, Typography } from "antd";
import "./login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../utils/Auth";
import LocalStorageKey from "../common/constants/LocalStorageKeys";

function Login() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [user, setUser] = useLocalStorage<IUser>(LocalStorageKey.User);

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            if (user.Roles?.includes("user")) {
                navigate("/profile");
            } else {
                navigate("/clients");
            }
        }
    }, [user, navigate]);

    const login: FormProps["onFinish"] = (values) => {
        setSubmitting(true);
        let authAPI = `${process.env.REACT_APP_API_ENDPOINT ?? ""}/auth/login`;
        fetch(authAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            }),
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    message.success("Login Successful!", 1.5).then(() => {
                        setUser({
                            Username: data.username,
                            Roles: [data.gender === "female" ? "officer" : "user"],
                            Token: data.token,
                        });
                        setSubmitting(false);
                    });
                });
            } else {
                resp.json().then((data) => {
                    message.error(data.message);
                    setSubmitting(false);
                });
            }
        });
    };
    return (
        <div className="app-background">
            <Form
                className="login-form"
                onFinish={login}>
                <Typography.Title>Welcome Back!</Typography.Title>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}>
                    <Input.Password />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isSubmitting}>
                    Log in
                </Button>
            </Form>
        </div>
    );
}

export default Login;
