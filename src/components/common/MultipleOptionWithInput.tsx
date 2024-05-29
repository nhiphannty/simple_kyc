import { Checkbox, CheckboxProps, Col, Form, Input, InputNumber, Row } from "antd";
import { useState } from "react";
import { MultipleOptionWithInputOptionType } from "../../common/types/PropsTypes";

type InputEnabledType = {
    key: string;
    isEnabled: boolean;
};

type PropsType = {
    options: MultipleOptionWithInputOptionType[];
};

const MultipleOptionWithInput = ({ options }: PropsType) => {
    const [inputsEnabled, setInputsEnabled] = useState<InputEnabledType[]>();
    const changeInputState: CheckboxProps["onChange"] = (e) => {
        setInputsEnabled(
            inputsEnabled?.map((x) => {
                return x.key == e.target.name ? Object.assign({}, x, { isEnabled: e.target.checked }) : x;
            })
        );
    };

    return (
        <>
            {options.forEach((option) => {
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name={option.inputName}
                            label={option.label}
                            rules={option.rules}>
                            <Checkbox onChange={changeInputState}>Checkbox</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={`${option.inputName}Value`}>
                            <Input disabled={inputsEnabled?.find((x) => x.key == option.inputName)?.isEnabled} />
                            <InputNumber disabled={inputsEnabled?.find((x) => x.key == option.inputName)?.isEnabled} />
                        </Form.Item>
                    </Col>
                </Row>;
            })}
        </>
    );
};

export default MultipleOptionWithInput;
