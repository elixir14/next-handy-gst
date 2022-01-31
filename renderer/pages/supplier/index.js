import React from "react";
import Admin from "../../layouts/Admin";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table";
import router from "next/router";

const index = ({ users }) => {
  const userList = JSON.parse(users);
  const headerData = [
    "Name",
    "Username",
    "Email",
    "Contact no.",
    "User type",
    "Action",
  ];

  const rawClick = (key) => {
    setObj(data[key]);
    history.push(`${url}/edit`);
  };

  const deleteEntry = (key) => {
    deleteCompany(data[key].id)
      .then((res) => {
        refetch();
      })
      .catch(() => refetch());
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
              tableData={[]}
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
  const users = await prisma.user.findMany();
  return {
    props: {
      users: JSON.stringify(users),
    },
  };
};
