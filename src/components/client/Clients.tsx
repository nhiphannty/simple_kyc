import { Table, TableProps, Tag } from "antd";
import { Link } from "react-router-dom";
import { ClientItemType } from "../../common/types/DataTypes";

type ClientItemTypeProp = {
    clients: ClientItemType[];
};

const Clients = ({ clients }: ClientItemTypeProp) => {
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
            render: (text) => <Link to={`/client/1`}>{text}</Link>,
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

    return (
        <Table
            columns={columns}
            dataSource={clients}
            pagination={{ pageSize: pageSize, position: ["bottomCenter"] }}
        />
    );
};

export default Clients;
