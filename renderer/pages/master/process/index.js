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

import { getSession, useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "lib/helper";
import { getDataList } from "lib/masters";

const index = ({ dataList, gst_number }) => {
  const { data: session } = useSession();
  const { data } = useSWR(
    session ? `/api/process/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const processList = dataList.length ? dataList : data;

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "duration", name: "Duration" },
    { id: "min_inward_days", name: "Inward Day" },
    { id: "status", name: "Status" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/master/process/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/process/delete/${id}`, {
        data: { gst_number },
      })
      .then((res) => {
        toast.success("Process deleted successfully");
        router.push("/master/process");
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
              onClick={() => router.push(`/master/process/add`)}
            >
              Add Process
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={processList || []}
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
  const dataList = await getDataList("process", gst_number);

  return {
    gst_number: gst_number || null,
    dataList,
  };
};
