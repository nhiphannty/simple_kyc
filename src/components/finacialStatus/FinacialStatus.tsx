import { Button, Card, Col, Form, message, Radio, Row, Statistic } from "antd";
import { EInputType } from "../../common/enums/CommonEnums";
import { MultipleOptionWithInputOptionType } from "../../common/types/PropsTypes";
import MultipleOptionWithInput from "../common/MultipleOptionWithInput";
import { Submission, Validation } from "../../utils/Messages";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

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
    const [financialStatus, setFinancialStatus] = useLocalStorage<FinancialStatusType>("financialStatus");
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

    const submit = () => {
        form.validateFields()
            .then(() => {
                let netWorth = form.getFieldsValue(nameList);
                console.log(netWorth)
                
                setFinancialStatus(Object.assign({}, form.getFieldsValue()));
                message.success(Submission.SaveSuccessfully);
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
        <Form
            size="large"
            form={form}
            layout="vertical"
            onValuesChange={calculateNetWorth}>
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
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={submit}>
                    Save
                </Button>
            </div>
        </Form>
    );
};

export default FinacialStatus;
