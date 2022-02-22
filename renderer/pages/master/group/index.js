import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import useSWR from "swr";

import Admin from "layouts/Admin";
import Card from "components/Card/Card.js";
import Table from "components/Table/Table";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";

import prisma from "lib/prisma";
import { STATUS } from "lib/constants";
import { getSession, useSession } from "next-auth/react";
import { getDataList } from "lib/masters";
import { fetcher } from "lib/helper";

const index = ({ dataList, gst_number }) => {
  const { data: session } = useSession();

  const { data } = useSWR(
    session ? `/api/group/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const itemGroupList = dataList.length ? dataList : data;

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
              tableData={itemGroupList || []}
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

index.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const dataList = await getDataList("group", gst_number);

  return {
    gst_number: gst_number || null,
    dataList,
  };
};
