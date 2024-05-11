import { Validation } from "../../utils/Messages";
import { Form, Input, Radio, Switch } from "antd";

type PropType = {
    uniqueFieldName: string;
};
const Email = ({ uniqueFieldName }: PropType) => {
    return (
        <>
            <Form.Item
                label="Email"
                name={[uniqueFieldName, "email"]}
                rules={[
                    { required: true, message: Validation.Required },
                    { type: "email", message: Validation.Email },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Type"
                name={[uniqueFieldName, "emailType"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Radio.Group>
                    <Radio value="work"> Work </Radio>
                    <Radio value="personal"> Personal </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Preferred"
                name={[uniqueFieldName, "emailPreferred"]}
                valuePropName="checked">
                <Switch />
            </Form.Item>
        </>
    );
};

export default Email;
