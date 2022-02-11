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
import { states } from "lib/masters";

const index = (props) => {
  const cityList = JSON.parse(props.cities);
  const stateList = JSON.parse(props.stateList);

  const mergeById = (a1, a2) =>
    a1.map((itm) => ({
      state: a2.find((item) => item.id === itm.state_id && item),
      ...itm,
    }));

  const citiesWithState = mergeById(cityList, stateList);

  const headerData = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "state", name: "State", key: "name", selector: true },
    { id: "action", name: "Action" },
  ];

  const rawClick = (id) => {
    router.push(`/master/city/${id}`);
  };

  const deleteEntry = (id) => {
    axios
      .delete(`/api/city/delete/${id}`)
      .then((res) => {
        toast.success("City deleted successfully");
        router.push("/master/city");
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
              onClick={() => router.push(`/master/city/add`)}
            >
              Add City
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={headerData}
              tableData={citiesWithState}
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
  const stateList = await states();
  const cities = await prisma.city.findMany({
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return {
    props: {
      cities: JSON.stringify(cities),
      stateList: JSON.stringify(stateList),
    },
  };
};
