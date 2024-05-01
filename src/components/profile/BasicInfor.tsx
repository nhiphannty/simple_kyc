import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Radio,
    Row,
    Space,
    Switch,
} from "antd";
import { Validation } from "../../utils/Messages";
import { CloseOutlined } from "@ant-design/icons";

const BasicInfor = () => {
    const [form] = Form.useForm();
    return (
        <Form
            size="large"
            layout="horizontal">
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
                    <Form.List name="addresses">
                        {(fields, { add, remove }) => (
                            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                                <Card
                                    size="small"
                                    title={`Address`}
                                    key={0}>
                                    <Form.Item
                                        label="Country"
                                        name={"country"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="City"
                                        name={"city"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Street"
                                        name={"street"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Type"
                                        name={"type"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Radio.Group>
                                            <Radio value="mailing"> Mailing </Radio>
                                            <Radio value="work"> Work </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Card>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Address ${field.name + 2}`}
                                        key={field.key + 1}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }>
                                        <Form.Item
                                            label="Country"
                                            name={[field.name, "country"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="City"
                                            name={[field.name, "city"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Street"
                                            name={[field.name, "street"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Type"
                                            name={[field.name, "type"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Radio.Group>
                                                <Radio value="mailing"> Mailing </Radio>
                                                <Radio value="work"> Work </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    disabled={fields.length > 0}
                                    block>
                                    + Add Address
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Col>
                <Col
                    span={12}
                    key={2}>
                    <Form.List name="emails">
                        {(fields, { add, remove }) => (
                            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                                <Card
                                    size="small"
                                    title={`Email`}
                                    key={0}>
                                    <Form.Item
                                        label="Email"
                                        name={"email"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Type"
                                        name={"emailType"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Radio.Group>
                                            <Radio value="mailing"> Work </Radio>
                                            <Radio value="work"> Personal </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="Preferred"
                                        name={"emailPreferred"}
                                        valuePropName="checked"
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Switch checked />
                                    </Form.Item>
                                </Card>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Email ${field.name + 2}`}
                                        key={field.key + 1}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }>
                                        <Form.Item
                                            label="Email"
                                            name={[field.name, "email"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Type"
                                            name={[field.name, "emailType"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Radio.Group>
                                                <Radio value="mailing"> Work </Radio>
                                                <Radio value="work"> Personal </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            label="Preferred"
                                            name={[field.name, "emailPreferred"]}
                                            valuePropName="checked"
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Switch checked />
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    disabled={fields.length > 0}
                                    block>
                                    + Add Email
                                </Button>
                            </div>
                        )}
                    </Form.List>
                    <Divider />
                    <Form.List name="phones">
                        {(fields, { add, remove }) => (
                            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                                <Card
                                    size="small"
                                    title={`Phone`}
                                    key={0}>
                                    <Form.Item
                                        label="Phone number"
                                        name={"phoneNumber"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Type"
                                        name={"phoneType"}
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Radio.Group>
                                            <Radio value="mailing"> Work </Radio>
                                            <Radio value="work"> Personal </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="Preferred"
                                        name={"phonePreferred"}
                                        valuePropName="checked"
                                        rules={[{ required: true, message: Validation.Required }]}>
                                        <Switch checked />
                                    </Form.Item>
                                </Card>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Phone ${field.name + 2}`}
                                        key={field.key + 1}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }>
                                        <Form.Item
                                            label="Phone number"
                                            name={[field.name, "phoneNumber"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Type"
                                            name={[field.name, "phoneType"]}
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Radio.Group>
                                                <Radio value="mailing"> Work </Radio>
                                                <Radio value="work"> Personal </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            label="Preferred"
                                            name={[field.name, "phonePreferred"]}
                                            valuePropName="checked"
                                            rules={[
                                                { required: true, message: Validation.Required },
                                            ]}>
                                            <Switch checked />
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    disabled={fields.length > 0}
                                    block>
                                    + Add Phone
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Col>
            </Row>
            <div style={{ textAlign: "right", marginTop: 10 }}>
                <Space size="small">
                    <Button
                        type="primary"
                        htmlType="submit">
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
