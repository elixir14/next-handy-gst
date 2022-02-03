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

const index = ({ outwardChalaans }) => {
  const outwardChalaanList = JSON.parse(outwardChalaans);

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
      .delete(`/api/outward-chalaan/delete/${id}`)
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
            <Button
              color="primary"
              onClick={() => router.push(`/outward-chalaan/add`)}
            >
              Add Chalaan
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={outwardChalaanList}
              rawClick={rawClick}
              deleteEntry={deleteEntry}
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
  const outwardChalaans = await prisma.outward_chalaan.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      outwardChalaans: JSON.stringify(outwardChalaans),
    },
  };
};
