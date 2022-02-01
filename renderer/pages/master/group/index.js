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

const index = ({ itemGroups }) => {
  const itemGroupList = JSON.parse(itemGroups);

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
      .delete(`/api/group/delete/${id}`)
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
              tableData={itemGroupList}
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
  const itemGroups = await prisma.group.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      itemGroups: JSON.stringify(itemGroups),
    },
  };
};
