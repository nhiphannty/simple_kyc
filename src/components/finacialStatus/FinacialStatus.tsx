import { Button, Card, Col, Form, message, Modal, Radio, Row, Space, Statistic } from "antd";
import { EInputType, ESubmissionState } from "../../common/enums/CommonEnums";
import { MultipleOptionWithInputOptionType } from "../../common/types/PropsTypes";
import MultipleOptionWithInput from "../common/MultipleOptionWithInput";
import { Submission, Validation } from "../../utils/Messages";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import EntityName from "../../common/constants/EntityName";
import LocalStorageKey from "../../common/constants/LocalStorageKeys";

type FinancialStatusType = {};

type OptionsType = {
    incomes: MultipleOptionWithInputOptionType[];
    assets: MultipleOptionWithInputOptionType[];
    liabilities: MultipleOptionWithInputOptionType[];
    fundSources: MultipleOptionWithInputOptionType[];
};

const initialOptions: OptionsType = {
    incomes: [
        {
            label: "Salary",
            inputName: "salary",
            inputType: EInputType.Number,
        },
        {
            label: "Investment",
            inputName: "investment",
            inputType: EInputType.Number,
        },
        {
            label: "Others",
            inputName: "othersIncomes",
            inputType: EInputType.Number,
        },
    ],
    assets: [
        {
            label: "Bond",
            inputName: "bond",
            inputType: EInputType.Number,
        },
        {
            label: "Liquidity",
            inputName: "liquidity",
            inputType: EInputType.Number,
        },
        {
            label: "Real Estate",
            inputName: "realEstate",
            inputType: EInputType.Number,
        },
        {
            label: "Others",
            inputName: "othersAssets",
            inputType: EInputType.Number,
        },
    ],
    liabilities: [
        {
            label: "Personal Loan",
            inputName: "personalLoan",
            inputType: EInputType.Number,
        },
        {
            label: "Real Estate Loan",
            inputName: "realEstateLoan",
            inputType: EInputType.Number,
        },
        {
            label: "Others",
            inputName: "othersLiabilities",
            inputType: EInputType.Number,
        },
    ],
    fundSources: [
        {
            label: "Inheritance",
            inputName: "inheritance",
            inputType: EInputType.Number,
        },
        {
            label: "Donation",
            inputName: "donation",
            inputType: EInputType.Number,
        },
    ],
};

const nameList = initialOptions.incomes
    .map((x) => [x.inputName, "value"])
    .concat(initialOptions.assets.map((x) => [x.inputName, "value"]))
    .concat(initialOptions.liabilities.map((x) => [x.inputName, "value"]))
    .concat(initialOptions.fundSources.map((x) => [x.inputName, "value"]));

const FinacialStatus = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [financialStatus, setFinancialStatus] = useLocalStorage<FinancialStatusType>(EntityName.FinancialStatus);
    const [submission, setSubmission] = useLocalStorage<ESubmissionState>(LocalStorageKey.SubmissionState, ESubmissionState.NotSubmittedYet);

    const [form] = Form.useForm();
    const [total, setTotal] = useState(0);

    const calculateNetWorth = () => {
        let fieldValues = form.getFieldsValue(nameList);
        let tmpTotal = 0;
        Object.keys(fieldValues).forEach((key) => {
            if (fieldValues[key].value !== undefined) {
                tmpTotal += Number.parseInt(fieldValues[key].value);
            }
        });
        setTotal(tmpTotal);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        save(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const save = (isSubmitting: boolean) => {
        form.validateFields()
            .then(() => {
                setFinancialStatus(Object.assign({}, form.getFieldsValue()));
                if (isSubmitting) {
                    setSubmission(ESubmissionState.Submitted);
                    message.success(Submission.SubmitSuccessfully);
                } else {
                    message.success(Submission.SaveSuccessfully);
                }
            })
            .catch(() => {
                message.error(Submission.SaveUnsuccessfully);
            });
    };

    useEffect(() => {
        if (financialStatus) {
            form.setFieldsValue(financialStatus);
        }
    }, []);

    return (
        <>
            <Form
                size="large"
                form={form}
                layout="vertical"
                onValuesChange={calculateNetWorth}
                disabled={submission === ESubmissionState.Submitted}>
                <Row gutter={24}>
                    <Col
                        span={8}
                        key={1}>
                        <Card title="Incomes (A)">
                            <MultipleOptionWithInput options={initialOptions.incomes} />
                        </Card>
                        <Card
                            title="Liabilities (C)"
                            style={{ marginTop: "20px" }}>
                            <MultipleOptionWithInput options={initialOptions.liabilities} />
                        </Card>
                    </Col>
                    <Col
                        span={8}
                        key={2}>
                        <Card title="Assets (B)">
                            <MultipleOptionWithInput options={initialOptions.assets} />
                        </Card>
                        <Card
                            title="Source of Funds (D)"
                            style={{ marginTop: "20px" }}>
                            <MultipleOptionWithInput options={initialOptions.fundSources} />
                        </Card>
                    </Col>
                    <Col
                        span={8}
                        key={3}>
                        <Card title="Net Worth (A) + (B) + (C) + (D)">
                            <Statistic
                                title="Total"
                                value={total}
                            />
                        </Card>
                        <Card
                            title="Investment Experience and Objectives"
                            style={{ marginTop: "20px" }}>
                            <Form.Item
                                label="Experience in financial markets:"
                                name="financialExperience"
                                rules={[
                                    {
                                        required: true,
                                        message: Validation.Required,
                                    },
                                ]}>
                                <Radio.Group>
                                    <Radio.Button value="lessThan5">&lt; 5 years</Radio.Button>
                                    <Radio.Button value="between5And10">&gt; 5 and &lt; 10 years</Radio.Button>
                                    <Radio.Button value="MoreThan10">&gt; 10 years</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Risk Tolerance:"
                                name="riskTolerance"
                                rules={[
                                    {
                                        required: true,
                                        message: Validation.Required,
                                    },
                                ]}>
                                <Radio.Group>
                                    <Radio value="10per">10%</Radio>
                                    <Radio value="30per">30%</Radio>
                                    <Radio value="allIn">All-in</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
                <div style={{ textAlign: "right", marginTop: 10 }}>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => save(false)}>
                            Save
                        </Button>
                        <Button
                            htmlType="submit"
                            onClick={showModal}>
                            Submit
                        </Button>
                    </Space>
                </div>
            </Form>
            <Modal
                title="Confirmation"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <p>Please confirm to submit your personal information and finacial status.</p>
                <p>You will not be able to update your profile.</p>
            </Modal>
        </>
    );
};

export default FinacialStatus;
