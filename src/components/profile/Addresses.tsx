import { Form, Button, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Address from "./Address";

const Addresses = () => {
    return (
        <Form.List name={"addresses"}>
            {(fields, { add, remove }) => (
                <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                    {fields.map((field) => (
                        <Card
                            size="small"
                            title={`Address${field.name > 0 ? ` ${field.name + 1}` : ""}`}
                            key={field.key + 1}
                            extra={
                                <CloseOutlined
                                    onClick={() => {
                                        remove(field.name);
                                    }}
                                />
                            }>
                            <Address uniqueFieldName={field.name.toString()} />
                        </Card>
                    ))}

                    <Button
                        type="dashed"
                        onClick={() => add()}
                        disabled={fields.length > 1}
                        block>
                        + Add Address
                    </Button>
                </div>
            )}
        </Form.List>
    );
};

export default Addresses;
