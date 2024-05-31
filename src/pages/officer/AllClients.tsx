import { Breadcrumb, message } from "antd";
import DefaultLayout from "../../components/common/layout/Layout";
import { useEffect, useState } from "react";

import { ClientItemType } from "../../common/types/DataTypes";
import Clients from "../../components/client/Clients";

type UserType = {
    firstName: string;
    lastName: string;
    birthDate: string;
};

function AllClients() {
    const [clients, setClients] = useState<ClientItemType[]>([]);
    const states = [
        { Color: "geekblue", Value: "Pending" },
        { Color: "green", Value: "Approved" },
        { Color: "volcano", Value: "Rejected" },
    ];
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
                        title: "All clients",
                    },
                ]}
                style={{ marginBottom: "2em" }}
            />
            <Clients clients={clients} />
        </DefaultLayout>
    );
}

export default AllClients;
