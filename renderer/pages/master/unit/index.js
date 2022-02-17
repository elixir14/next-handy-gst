import React from "react";
import Admin from "layouts/Admin";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table";
import router from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { STATUS } from "lib/constants";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const index = ({ units, gst_number }) => {
  const unitList = JSON.parse(units);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "code", name: "Code" },
    { id: "status", name: "Status" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/master/unit/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/unit/delete/${id}`, {
        data: { gst_number },
      })
      .then((res) => {
        toast.success("Unit deleted successfully");
        router.push("/master/unit");
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
              onClick={() => router.push(`/master/unit/add`)}
            >
              Add Unit
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={unitList}
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
  const units = await prisma(gst_number).unit.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      gst_number: gst_number || null,
      units: JSON.stringify(units),
    },
  };
};
