import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";

import Admin from "layouts/Admin";
import Card from "components/Card/Card.js";
import Table from "components/Table/Table";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";

import prisma from "lib/prisma";
import { STATUS } from "lib/constants";
import { getSession } from "next-auth/react";

const index = ({ itemGroups, gst_number }) => {
  const itemGroupList = JSON.parse(itemGroups);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "rate", name: "Rate" },
    { id: "status", name: "Status" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/master/group/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/group/delete/${id}`, {
        data: { gst_number },
      })
      .then((res) => {
        toast.success("Item group deleted successfully");
        router.push("/master/group");
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
            <Button
              color="primary"
              onClick={() => router.push(`/master/group/add`)}
            >
              Add Group
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={itemGroupList}
              rawClick={rawClick}
              deleteEntry={deleteEntry}
              searchKey="name"
              selector="status"
              selectorData={STATUS}
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
  const itemGroups = await prisma(gst_number).group.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      gst_number: gst_number || null,
      itemGroups: JSON.stringify(itemGroups),
    },
  };
};
