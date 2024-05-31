import { Button, Card, Form, Input, Space, DatePicker, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Submission, Validation } from "../../utils/Messages";
import dayjs from "dayjs";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { EmploymentType } from "../../common/types/DataTypes";
import EntityName from "../../common/constants/EntityName";
import { PersonalInformationSectionPropType } from "../../common/types/PropsTypes";

const { RangePicker } = DatePicker;

const Employment = ({ moveSection, isReadOnlyMode, setValidation }: PersonalInformationSectionPropType) => {
    const [form] = Form.useForm();
    const [employments, setEmployments] = useLocalStorage<EmploymentType>(EntityName.Employment);

    const submit = () => {
        form.validateFields()
            .then(() => {
                setEmployments(form.getFieldsValue());
                message.success(Submission.SaveSuccessfully);
                setValidation(true);
                moveSection();
            })
            .catch(() => {
                message.error(Submission.SaveUnsuccessfully);
                setValidation(false);
            });
    };

    useEffect(() => {
        if (employments) {
            let tempEmployments = Object.assign({}, employments);
            tempEmployments.employments.forEach((e) => {
                e.duration[0] = dayjs(e.duration[0]);
                e.duration[1] = e.duration[1] ? dayjs(e.duration[1]) : e.duration[1];
            });
            form.setFieldsValue(tempEmployments);
            form.validateFields()
                .then(() => setValidation(true))
                .catch(() => setValidation(false));
        }
    }, []);
    return (
        <Form
            size="large"
            layout="horizontal"
            form={form}
            disabled={isReadOnlyMode}>
            <Form.List name="employments">
                {(fields, { add, remove }) => (
                    <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Employment${field.name > 0 ? ` ${field.name + 1}` : ""}`}
                                key={field.key + 1}
                                extra={
                                    <CloseOutlined
                                        style={{
                                            color: isReadOnlyMode ? "#c4c4c4" : "#000000",
                                        }}
                                        onClick={() => {
                                            if (!isReadOnlyMode) remove(field.name);
                                        }}
                                    />
                                }>
                                <Form.Item
                                    label="Name"
                                    name={[field.name, "name"]}
                                    rules={[{ required: true, message: Validation.Required }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Duration"
                                    name={[field.name, "duration"]}
                                    rules={[{ required: true, message: Validation.Required }]}>
                                    <RangePicker
                                        picker="year"
                                        id={{
                                            start: "startInput",
                                            end: "endInput",
                                        }}
                                        placeholder={["", "Till Now"]}
                                        allowEmpty={[false, true]}
                                        maxDate={dayjs()}
                                    />
                                </Form.Item>
                            </Card>
                        ))}

                        <Button
                            type="dashed"
                            onClick={() => add()}
                            block>
                            + Add Employment
                        </Button>
                    </div>
                )}
            </Form.List>
            {!isReadOnlyMode && (
                <div style={{ textAlign: "right", marginTop: 10 }}>
                    <Space size="small">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={submit}>
                            Save
                        </Button>
                    </Space>
                </div>
            )}
        </Form>
    );
};

export default Employment;
