import { Validation } from "../../utils/Messages";
import { Form, Input, Radio, Switch } from "antd";

type PropType = {
    uniqueFieldName: string;
};
const Phone = ({ uniqueFieldName }: PropType) => {
    return (
        <>
            <Form.Item
                label="Phone number"
                name={[uniqueFieldName, "phoneNumber"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Type"
                name={[uniqueFieldName, "phoneType"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Radio.Group>
                    <Radio value="mailing"> Work </Radio>
                    <Radio value="work"> Personal </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Preferred"
                name={[uniqueFieldName, "phonePreferred"]}
                valuePropName="checked"
                rules={[{ required: true, message: Validation.Required }]}>
                <Switch checked />
            </Form.Item>
        </>
    );
};

export default Phone;
