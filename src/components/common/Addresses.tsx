import { Form, Button, Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Address from "./Address";
import { DynamicInputPropType } from "../../common/types/PropsTypes";

const Addresses = ({ isRequired, isReadOnlyMode }: DynamicInputPropType) => {
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
                                    style={{
                                        color:
                                            (isRequired && field.key === 0) || isReadOnlyMode ? "#c4c4c4" : "#000000",
                                    }}
                                    onClick={() => {
                                        if (((isRequired && field.key > 0) || !isRequired) && !isReadOnlyMode)
                                            remove(field.name);
                                    }}
                                />
                            }>
                            <Address uniqueFieldName={field.name.toString()} />
                        </Card>
                    ))}
                    {!isReadOnlyMode && (
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            disabled={fields.length > 1}
                            block>
                            + Add Address
                        </Button>
                    )}
                </div>
            )}
        </Form.List>
    );
};

export default Addresses;
