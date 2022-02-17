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
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const index = ({ transports, gst_number }) => {
  const transportList = JSON.parse(transports);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "vehicle", name: "Vehicle" },
    { id: "vehicle_number", name: "Vehicle number" },
    { id: "contact_number", name: "Contact No." },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/master/transport/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/transport/delete/${id}`, {
        data: { gst_number },
      })
      .then((res) => {
        toast.success("Transport deleted successfully");
        router.push("/master/transport");
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
              onClick={() => router.push(`/master/transport/add`)}
            >
              Add Transport
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={transportList}
              rawClick={rawClick}
              deleteEntry={deleteEntry}
              searchKey="name"
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
  const transports = await prisma(gst_number).transport.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      gst_number: gst_number || null,
      transports: JSON.stringify(transports),
    },
  };
};
