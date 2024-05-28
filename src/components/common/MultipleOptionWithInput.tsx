import { Checkbox, Col, Form, Input, Row } from "antd";
import { useState } from "react";

type MultipleOptionWithInputPropsType = {
    label: string;
    inputName: string;
    rules: any;
};

type InputEnabledType = {
    key: Number;
    isEnabled: boolean;
};

const MultipleOptionWithInput: React.FC<MultipleOptionWithInputPropsType[]> = (options) => {
    const [inputsEnabled, setInputsEnabled] = useState<InputEnabledType[]>();
    const changeInputState = () => {};
    return (
        <>
            {options.forEach((option) => {
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name={option.inputName}
                            label={option.label}
                            rules={option.rules}>
                            <Checkbox onChange={() => changeInputState(option)}>Checkbox</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={`${option.inputName}Value`}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>;
            })}
        </>
    );
};

export default MultipleOptionWithInput;
