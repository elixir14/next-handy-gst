import React from "react";
import router from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";

import Admin from "layouts/Admin";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table";

const index = ({ users, gst_number }) => {
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
      .delete(`/api/user/delete/${id}`, {
        data: { gst_number },
      })
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
              searchKey="username"
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

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const users = await prisma(gst_number).user.findMany({
    where: {
      NOT: {
        email: {
          endsWith: session?.user?.email,
        },
      },
    },
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      gst_number: gst_number || null,
      users: JSON.stringify(users),
    },
  };
};
