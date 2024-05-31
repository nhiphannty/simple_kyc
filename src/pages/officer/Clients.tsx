import { Breadcrumb, Table, TableProps, Tag, message } from "antd";
import DefaultLayout from "../../components/Layout";
import { useEffect, useState } from "react";

type ClientItemType = {
    key: string;
    name: string;
    dateOfBirth: string;
    state: string | undefined;
};

type UserType = {
    firstName: string;
    lastName: string;
    birthDate: string;
};

const pageSize = 15;
const states = [
    { Color: "geekblue", Value: "Pending" },
    { Color: "green", Value: "Approved" },
    { Color: "volcano", Value: "Rejected" },
];
const columns: TableProps<ClientItemType>["columns"] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Date Of Birth",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
    },
    {
        title: "State",
        key: "state",
        dataIndex: "state",
        render: (_, { state }) => (
            <Tag
                color={states.find((s) => s.Value === state)?.Color}
                key={state}>
                {state?.toUpperCase()}
            </Tag>
        ),
        filters: states.map((s) => ({ text: s.Value, value: s.Value })),
        onFilter: (value, record) => record.state?.indexOf(value as string) === 0,
    },
];

function Clients() {
    const [clients, setClients] = useState<ClientItemType[]>([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT ?? ""}/users?limit=${50}&skip=${0}&select=firstName,lastName,birthDate`).then((resp) => {
            if (resp.ok) {
                resp.json().then((data) => {
                    let tmpClients: ClientItemType[] = [];
                    let tmpDataUsers = data.users as UserType[];
                    tmpDataUsers.forEach((user) => {
                        tmpClients.push({
                            key: (tmpClients.length + 1).toString(),
                            name: `${user.firstName} ${user.lastName}`,
                            dateOfBirth: user.birthDate,
                            state: states[Math.floor(Math.random() * states.length)].Value,
                        });
                    });
                    setClients(tmpClients);
                });
            } else {
                resp.json().then((data) => {
                    message.error(data.message);
                });
            }
        });
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb
                items={[
                    {
                        title: "Clients",
                    },
                ]}
                style={{ marginBottom: "2em" }}
            />
            <Table
                columns={columns}
                dataSource={clients}
                pagination={{ pageSize: pageSize, position: ["bottomCenter"] }}
            />
        </DefaultLayout>
    );
}

export default Clients;
