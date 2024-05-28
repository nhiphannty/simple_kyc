import { Button, Col, DatePicker, Divider, Form, Input, message, Row, Space } from "antd";
import { Submission, Validation } from "../../utils/Messages";
import Addresses from "../common/Addresses";
import Emails from "../common/Emails";
import Phones from "../common/Phones";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import dayjs from "dayjs";

type BasicInforType = {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: dayjs.Dayjs;
    age: number;
    addresses: [];
    emails: [];
    phones: [];
};

type BasicInforPropsType = {
    moveSection: () => void;
    isReadOnlyMode: boolean;
};

const BasicInfor = ({ moveSection, isReadOnlyMode }: BasicInforPropsType) => {
    const [form] = Form.useForm();
    const [basicInfor, setBasicInfor] = useLocalStorage<BasicInforType>("basicInfor");

    const submit = () => {
        form.validateFields()
            .then(() => {
                setBasicInfor(form.getFieldsValue());
                message.success(Submission.SaveSuccessfully);
                moveSection();
            })
            .catch(() => {
                message.error(Submission.SaveUnsuccessfully);
            });
    };

    useEffect(() => {
        let tempBasicInfor = basicInfor;
        tempBasicInfor.dateOfBirth = dayjs(basicInfor.dateOfBirth);
        form.setFieldsValue(tempBasicInfor);
    }, []);

    return (
        <Form
            size="large"
            layout="horizontal"
            form={form}
            initialValues={{
                addresses: [{}],
                emails: [{}],
                phones: [{}],
            }}
            disabled={isReadOnlyMode}>
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
                                <DatePicker
                                    name="dateOfBirth"
                                    onChange={() =>
                                        form.setFieldValue(
                                            "age",
                                            new Date().getFullYear() -
                                                new Date(
                                                    form.getFieldValue("dateOfBirth")
                                                ).getFullYear()
                                        )
                                    }
                                />
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
                    <Addresses isRequired={true} />
                </Col>
                <Col
                    span={12}
                    key={2}>
                    <Emails isRequired={true} />
                    <Divider />
                    <Phones isRequired={true} />
                </Col>
            </Row>
            <div style={{ textAlign: "right", marginTop: 10 }}>
                <Space size="small">
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={submit}>
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
