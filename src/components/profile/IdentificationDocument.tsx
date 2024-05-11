import { Button, Col, Form, message, Row, Space, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Submission, Validation } from "../../utils/Messages";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";

const IdentificationDocument = () => {
    const [identDocument, setIdentDocument] = useLocalStorage("identDocument");

    const [form] = Form.useForm();
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const submitFiles = () => {
        form.validateFields()
            .then(() => {
                setIdentDocument(form.getFieldsValue());
                message.success(Submission.SaveSuccessfully);
            })
            .catch((e) => {
                console.log(e);
                message.error(Submission.SaveUnsuccessfully);
            });
    };

    useEffect(() => {
        form.setFieldsValue(identDocument);
    }, []);
    return (
        <>
            <Typography>
                <p>
                    You are required to upload at least one of National ID Card or Driver License.
                </p>
            </Typography>
            <Form
                size="large"
                layout="horizontal"
                form={form}>
                <Row gutter={24}>
                    <Col
                        span={12}
                        key={1}>
                        <Form.Item
                            name="nationIdDriverLicense"
                            label="National ID Card or Driver License"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: Validation.Required }]}>
                            <Upload
                                name="nationIdDriverLicense"
                                listType="picture"
                                accept=".png,.jpeg,.jpg,.doc,.pdf"
                                beforeUpload={() => {
                                    return false;
                                }}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col
                        span={12}
                        key={2}>
                        <Form.Item
                            name="other"
                            label="Other"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}>
                            <Upload
                                name="other"
                                listType="picture"
                                accept=".png,.jpeg,.jpg,.doc,.pdf"
                                beforeUpload={() => {
                                    return false;
                                }}>
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ textAlign: "right", marginTop: 10 }}>
                    <Space size="small">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={submitFiles}>
                            Save
                        </Button>
                    </Space>
                </div>
            </Form>
        </>
    );
};

export default IdentificationDocument;
