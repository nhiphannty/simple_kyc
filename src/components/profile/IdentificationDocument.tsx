import { Button, Col, Form, Row, Space, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Validation } from "../../utils/Messages";

const IdentificationDocument = () => {
    const [form] = Form.useForm();
    const normFile = (e: any) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
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
                                name="logo"
                                // action="/upload.do"
                                listType="picture">
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
                                name="logo"
                                // action="/upload.do"
                                listType="picture">
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
                            onClick={() =>
                                console.log(JSON.stringify(form.getFieldsValue(), null, 2))
                            }>
                            Save
                        </Button>
                    </Space>
                </div>
            </Form>
        </>
    );
};

export default IdentificationDocument;
