import { Checkbox, CheckboxProps, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { MultipleOptionWithInputOptionType } from "../../common/types/PropsTypes";
import { EInputType } from "../../common/enums/CommonEnums";
import { Validation } from "../../utils/Messages";

type InputStateType = {
    key: string;
    isEnabled: boolean;
};

type PropsType = {
    options: MultipleOptionWithInputOptionType[];
};

const MultipleOptionWithInput = ({ options }: PropsType) => {
    const [inputsEnabled, setInputsEnabled] = useState<InputStateType[]>();
    const changeInputState: CheckboxProps["onChange"] = (e) => {
        setInputsEnabled(
            inputsEnabled?.map((x) => {
                return x.key === e.target.name ? Object.assign({}, x, { isEnabled: e.target.checked }) : x;
            })
        );
    };

    useEffect(() => {
        setInputsEnabled(
            options.map((o) => {
                return {
                    key: o.inputName,
                    isEnabled: false,
                };
            })
        );
    }, []);

    return (
        <Row gutter={24}>
            {options.map((option) => {
                return (
                    <Col
                        key={option.inputName}
                        span={24}>
                        <Space
                            key={option.inputName}
                            direction="horizontal"
                            size={"small"}>
                            <Form.Item
                                name={[option.inputName, `is${option.inputName}`]}
                                rules={option.rules}
                                valuePropName="checked">
                                <Checkbox
                                    name={option.inputName}
                                    onChange={changeInputState}>
                                    {option.label}
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                name={[option.inputName, "value"]}
                                dependencies={[option.inputName, `is${option.inputName}`]}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            let targetValue = getFieldValue([option.inputName, `is${option.inputName}`]);
                                            if (targetValue === undefined || targetValue === false || (targetValue === true && value !== undefined)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(Validation.Required));
                                        },
                                    }),
                                ]}>
                                {option.inputType === EInputType.Text ? (
                                    <Input
                                        style={{ width: "100%" }}
                                        disabled={inputsEnabled?.find((x) => x.key === option.inputName)?.isEnabled}
                                    />
                                ) : (
                                    <InputNumber
                                        min={0}
                                        disabled={!inputsEnabled?.find((x) => x.key === option.inputName)?.isEnabled}
                                        style={{ width: "100%", float: "right" }}
                                    />
                                )}
                            </Form.Item>
                        </Space>
                    </Col>
                );
            })}
        </Row>
    );
};

export default MultipleOptionWithInput;
