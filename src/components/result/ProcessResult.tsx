import { Button, Form, Input, message, notification, Popconfirm, PopconfirmProps, Space } from "antd";
import LocalStorageKey from "../../common/constants/LocalStorageKeys";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ESubmissionState } from "../../common/enums/CommonEnums";
import { Submission } from "../../utils/Messages";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProcessResult = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [result, setResult] = useLocalStorage(LocalStorageKey.Result);
    const [submission, setSubmission] = useLocalStorage<ESubmissionState>(LocalStorageKey.SubmissionState, ESubmissionState.NotSubmittedYet);
    const [api, contextHolder] = notification.useNotification();

    const save = () => {
        form.validateFields()
            .then(() => {
                setResult(form.getFieldsValue());
                message.success(Submission.SaveSuccessfully);
            })
            .catch(() => {
                message.error(Submission.SaveUnsuccessfully);
            });
    };

    const confirm = (isApproved: boolean) => {
        setSubmission(isApproved ? ESubmissionState.Approved : ESubmissionState.Rejected);
        message.success(Submission.SubmitSuccessfully);
        api.open({
            message: "Redirecting to clients page...",
        });
        setTimeout(() => navigate("/clients"), 3000);
    };

    useEffect(() => {
        if (result) {
            form.setFieldsValue(result);
        }
    }, []);

    return (
        <>
            {contextHolder}
            <Form
                size="large"
                layout="horizontal"
                form={form}
                disabled={submission === ESubmissionState.Approved || submission === ESubmissionState.Rejected}>
                <Form.Item
                    name={"comment"}
                    label={"Comment"}>
                    <Input.TextArea />
                </Form.Item>
                <div style={{ textAlign: "center", marginTop: 10 }}>
                    <Space size="small">
                        <Button
                            type="primary"
                            onClick={save}>
                            Save
                        </Button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to approve this client?"
                            onConfirm={() => confirm(true)}
                            okText="Yes"
                            cancelText="No">
                            <Button>Approve</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to reject this client?"
                            onConfirm={() => confirm(false)}
                            okText="Yes"
                            cancelText="No">
                            <Button danger>Reject</Button>
                        </Popconfirm>
                    </Space>
                </div>
            </Form>
        </>
    );
};

export default ProcessResult;
