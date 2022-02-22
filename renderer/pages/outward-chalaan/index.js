import React, { useState } from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";

import prisma from "lib/prisma";

import Admin from "layouts/Admin";
import Card from "components/Card/Card.js";
import Table from "components/Table/Table";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import DummyChalaan from "@/components/DummyChalaan";
import useSWR from "swr";
import { fetcher } from "lib/helper";
import { getDataList } from "lib/masters";

const index = ({ dataList, gst_number }) => {
  const { data: session } = useSession();
  const { data } = useSWR(
    session ? `/api/outward_chalaan/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const outwardChalaanList = dataList.length ? dataList : data;

  const [open, setOpen] = useState(false);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "number", name: "Number" },
    { id: "duration", name: "Duration" },
    { id: "bags", name: "Bags" },
    { id: "rate", name: "Rate" },
    { id: "date", name: "Date" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/outward-chalaan/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/outward-chalaan/delete/${id}`, {
        data: { gst_number },
      })
      .then((res) => {
        toast.success("Chalaan deleted successfully");
        router.push("/outward-chalaan");
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
            <Button color="primary" onClick={() => setOpen(true)}>
              Add Dummy Chalaan
            </Button>
            <Button
              color="primary"
              onClick={() => router.push(`/outward-chalaan/add`)}
            >
              Add Chalaan
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={outwardChalaanList || []}
              rawClick={rawClick}
              deleteEntry={deleteEntry}
              searchKey="number"
            />
            <DummyChalaan open={open} setOpen={setOpen} />
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
  const dataList = await getDataList("outward_chalaan", gst_number);

  return {
    gst_number: gst_number || null,
    dataList,
  };
};
