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

const index = ({ items }) => {
  const itemList = JSON.parse(items);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "code", name: "Code" },
    { id: "drawing_code", name: "Drawing Code" },
    { id: "status", name: "Status" },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/master/item/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/item/delete/${id}`)
      .then((res) => {
        toast.success("Item deleted successfully");
        router.push("/master/item");
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
              onClick={() => router.push(`/master/item/add`)}
            >
              Add Item
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={itemList}
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
  const items = await prisma.item.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      items: JSON.stringify(items),
    },
  };
};
