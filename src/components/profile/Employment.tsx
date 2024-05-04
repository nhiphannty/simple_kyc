import { Button, Card, Form, Input, Space, DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Validation } from "../../utils/Messages";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const Employment = () => {
    const [form] = Form.useForm();
    return (
        <Form
            size="large"
            layout="horizontal"
            form={form}>
            <Form.List name="employments">
                {(fields, { add, remove }) => (
                    <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Employment${field.name > 0 ? ` ${field.name + 1}` : ""}`}
                                key={field.key + 1}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }>
                                <Form.Item
                                    label="Name"
                                    name={[field.name, "name"]}
                                    rules={[{ required: true, message: Validation.Required }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Duration"
                                    name={[field.name, "duration"]}
                                    rules={[{ required: true, message: Validation.Required }]}>
                                    <RangePicker
                                        picker="year"
                                        id={{
                                            start: "startInput",
                                            end: "endInput",
                                        }}
                                        placeholder={["", "Till Now"]}
                                        allowEmpty={[false, true]}
                                        maxDate={dayjs()}
                                    />
                                </Form.Item>
                            </Card>
                        ))}

                        <Button
                            type="dashed"
                            onClick={() => add()}
                            block>
                            + Add Employment
                        </Button>
                    </div>
                )}
            </Form.List>
            <div style={{ textAlign: "right", marginTop: 10 }}>
                <Space size="small">
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => console.log(JSON.stringify(form.getFieldsValue(), null, 2))}>
                        Save
                    </Button>
                </Space>
            </div>
        </Form>
    );
};

export default Employment;
