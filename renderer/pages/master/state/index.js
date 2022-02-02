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

const index = ({ states }) => {
  const stateList = JSON.parse(states);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "abbreviation", name: "Abbreviation" },
    { id: "gst_code", name: "GST Code" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/master/state/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/state/delete/${id}`)
      .then((res) => {
        toast.success("State deleted successfully");
        router.push("/master/state");
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
              onClick={() => router.push(`/master/state/add`)}
            >
              Add State
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={stateList}
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
  const states = await prisma.state.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      states: JSON.stringify(states),
    },
  };
};
