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
import prisma from "lib/prisma";

const index = ({ suppliers }) => {
  const supplierList = JSON.parse(suppliers);

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
      .delete(`/api/supplier/delete/${id}`)
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
              tableData={supplierList}
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

export const getServerSideProps = async () => {
  const suppliers = await prisma().supplier.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      suppliers: JSON.stringify(suppliers),
    },
  };
};
