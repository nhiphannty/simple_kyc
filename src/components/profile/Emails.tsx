import { Button, Card, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Email from "./Email";

const Emails = () => {
    return (
        <Form.List name="emails">
            {(fields, { add, remove }) => (
                <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                    {fields.map((field) => (
                        <Card
                            size="small"
                            title={`Email${field.name > 0 ? ` ${field.name + 1}` : ""}`}
                            key={field.key + 1}
                            extra={
                                <CloseOutlined
                                    onClick={() => {
                                        remove(field.name);
                                    }}
                                />
                            }>
                            <Email uniqueFieldName={field.name.toString()} />
                        </Card>
                    ))}

                    <Button
                        type="dashed"
                        onClick={() => add()}
                        disabled={fields.length > 1}
                        block>
                        + Add Email
                    </Button>
                </div>
            )}
        </Form.List>
    );
};

export default Emails;
