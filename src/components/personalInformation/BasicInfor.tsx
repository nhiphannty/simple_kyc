import { Button, Col, DatePicker, Divider, Form, Input, message, Row, Space } from "antd";
import { Submission, Validation } from "../../utils/Messages";
import Addresses from "../common/Addresses";
import Emails from "../common/Emails";
import Phones from "../common/Phones";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import dayjs from "dayjs";
import { BasicInforType } from "../../common/types/DataTypes";
import EntityName from "../../common/constants/EntityName";
import { PersonalInformationSectionPropType } from "../../common/types/PropsTypes";

const BasicInfor = ({ moveSection, isReadOnlyMode, setValidation }: PersonalInformationSectionPropType) => {
    const [form] = Form.useForm();
    const [basicInfor, setBasicInfor] = useLocalStorage<BasicInforType>(EntityName.BasicInfor);

    const submit = () => {
        form.validateFields()
            .then(() => {
                setBasicInfor(form.getFieldsValue());
                message.success(Submission.SaveSuccessfully);
                setValidation(true);
                moveSection();
            })
            .catch(() => {
                message.error(Submission.SaveUnsuccessfully);
                setValidation(false);
            });
    };

    useEffect(() => {
        if (basicInfor) {
            form.setFieldsValue(Object.assign({}, basicInfor, { dateOfBirth: dayjs(basicInfor.dateOfBirth) }));
            form.validateFields()
                .then(() => setValidation(true))
                .catch(() => setValidation(false));
        }
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
                                    onChange={() => form.setFieldValue("age", new Date().getFullYear() - new Date(form.getFieldValue("dateOfBirth")).getFullYear())}
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
                    <Addresses
                        isRequired={true}
                        isReadOnlyMode={isReadOnlyMode}
                    />
                </Col>
                <Col
                    span={12}
                    key={2}>
                    <Emails
                        isRequired={true}
                        isReadOnlyMode={isReadOnlyMode}
                    />
                    <Divider />
                    <Phones
                        isRequired={true}
                        isReadOnlyMode={isReadOnlyMode}
                    />
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
