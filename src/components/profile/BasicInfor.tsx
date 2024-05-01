import { Button, Col, DatePicker, Divider, Form, Input, Row, Space } from "antd";
import { Validation } from "../../utils/Messages";
import Addresses from "./Addresses";
import Emails from "./Emails";
import Phones from "./Phones";

const BasicInfor = () => {
    const [form] = Form.useForm();
    return (
        <Form
            size="large"
            layout="horizontal"
            form={form}
            initialValues={{ addresses: [{}], emails: [{}], phones: [{}] }}>
            <Row gutter={24}>
                <Col
                    span={12}
                    key={1}>
                    <Form.Item
                        name={"firstName"}
                        label={"First name"}
                        rules={[
                            {
                                required: true,
                                message: Validation.Required,
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={"midName"}
                        label={"Middle name"}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={"lastName"}
                        label={"Last name"}
                        rules={[
                            {
                                required: true,
                                message: Validation.Required,
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={14}>
                            <Form.Item
                                name={"dateOfBirth"}
                                label={"Date of birth"}
                                rules={[
                                    {
                                        required: true,
                                        message: Validation.Required,
                                    },
                                ]}>
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                name={"age"}
                                label={"Age"}>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Addresses />
                </Col>
                <Col
                    span={12}
                    key={2}>
                    <Emails />
                    <Divider />
                    <Phones />
                </Col>
            </Row>
            <div style={{ textAlign: "right", marginTop: 10 }}>
                <Space size="small">
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => console.log(JSON.stringify(form.getFieldsValue(), null, 2))}>
                        Save
                    </Button>
                    <Button
                        onClick={() => {
                            form.resetFields();
                        }}>
                        Clear
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default BasicInfor;
