import React from "react";
import Admin from "../../layouts/Admin";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table";
import router from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

const index = ({ users }) => {
  const userList = JSON.parse(users);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name", keys: ["first_name", "last_name"] },
    { id: "username", name: "Username" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Contact no." },
    { id: "type", name: "User type" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/user/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/user/delete/${id}`)
      .then((res) => {
        toast.success("User deleted successfully");
        router.push("/user");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: index.js ~ line 36 ~ deleteEntry ~ error",
          error
        );
      });
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <Button color="primary" onClick={() => router.push(`/user/add`)}>
              Add User
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={userList}
              rawClick={rawClick}
              deleteEntry={deleteEntry}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

index.layout = Admin;
index.auth = true;

export default index;

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      users: JSON.stringify(users),
    },
  };
};
