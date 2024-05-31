import { Button, Col, Form, message, Row, Space, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Submission, Validation } from "../../utils/Messages";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import EntityName from "../../common/constants/EntityName";
import { PersonalInformationSectionPropType } from "../../common/types/PropsTypes";

const IdentificationDocument = ({ moveSection, isReadOnlyMode, setValidation }: PersonalInformationSectionPropType) => {
    const [identDocument, setIdentDocument] = useLocalStorage(EntityName.IdentDocument);

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
                setValidation(true);
                moveSection();
            })
            .catch((e) => {
                message.error(Submission.SaveUnsuccessfully);
                setValidation(false);
            });
    };

    useEffect(() => {
        form.setFieldsValue(identDocument);
        form.validateFields()
            .then(() => setValidation(true))
            .catch(() => setValidation(false));
    }, []);
    return (
        <>
            <Typography>
                <p>You are required to upload at least one of National ID Card or Driver License.</p>
            </Typography>
            <Form
                size="large"
                layout="horizontal"
                form={form}
                disabled={isReadOnlyMode}>
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
