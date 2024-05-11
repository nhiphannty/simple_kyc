import { Validation } from "../../utils/Messages";
import { Form, Input, message, Radio, Switch } from "antd";

type PropType = {
    uniqueFieldName: string;
};
const Phone = ({ uniqueFieldName }: PropType) => {
    return (
        <>
            <Form.Item
                label="Phone number"
                name={[uniqueFieldName, "phoneNumber"]}
                rules={[
                    { required: true, message: Validation.Required },
                    { pattern: /^\d+$/, message: Validation.Phone },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Type"
                name={[uniqueFieldName, "phoneType"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Radio.Group>
                    <Radio value="work"> Work </Radio>
                    <Radio value="personal"> Personal </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Preferred"
                name={[uniqueFieldName, "phonePreferred"]}
                valuePropName="checked">
                <Switch />
            </Form.Item>
        </>
    );
};

export default Phone;
