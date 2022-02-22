import React from "react";
import useSWR from "swr";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";

import { fetcher } from "lib/helper";
import { getDataList } from "lib/masters";
import Admin from "layouts/Admin";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table";

const index = ({ dataList, gst_number }) => {
  const { data: session } = useSession();
  const { data } = useSWR(
    session ? `/api/transport/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const transportList = dataList.length ? dataList : data;

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
              tableData={transportList || []}
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

index.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;

  const dataList = await getDataList("transport", gst_number);

  return {
    gst_number: gst_number || null,
    dataList,
  };
};
