import { Form, Input, Radio } from "antd";
import { Validation } from "../../utils/Messages";

type PropType = {
    uniqueFieldName: string;
};

const Address = ({ uniqueFieldName }: PropType) => {
    return (
        <>
            <Form.Item
                label="Country"
                name={[uniqueFieldName, "country"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="City"
                name={[uniqueFieldName, "city"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Street"
                name={[uniqueFieldName, "street"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Type"
                name={[uniqueFieldName, "type"]}
                rules={[{ required: true, message: Validation.Required }]}>
                <Radio.Group>
                    <Radio value="mailing"> Mailing </Radio>
                    <Radio value="work"> Work </Radio>
                </Radio.Group>
            </Form.Item>
        </>
    );
};

export default Address;
