import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";

import prisma from "lib/prisma";

import Admin from "layouts/Admin";
import Table from "components/Table/Table";
import Card from "components/Card/Card.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import { getDataList } from "lib/masters";
import useSWR from "swr";
import { fetcher } from "lib/helper";

const index = ({ dataList, gst_number }) => {
  const { data: session } = useSession();
  const { data } = useSWR(
    session ? `/api/supplier/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const supplierList = dataList?.length ? dataList : data;

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "gst_number", name: "Gst Number" },
    { id: "phone", name: "Phone Number" },
    { id: "email", name: "Email" },
    { id: "fax_number", name: "Fax Number" },
    { id: "primary_name", name: "Primary Name" },
    { id: "primary_phone", name: "Primary Contact" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/supplier/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/supplier/delete/${id}`, {
        data: { gst_number },
      })
      .then((res) => {
        toast.success("Supplier deleted successfully");
        router.push("/supplier");
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
              onClick={() => router.push(`/supplier/add`)}
            >
              Add Supplier
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={supplierList || []}
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
  const dataList = await getDataList("supplier", gst_number);

  return {
    gst_number: gst_number || null,
    dataList,
  };
};
