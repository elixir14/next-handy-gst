import React from "react";
import Admin from "../../layouts/Admin";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table";
import router from "next/router";

const CompanyList = () => {
  const headerData = [
    "Name",
    "Gst Number",
    "City",
    "Phone",
    "Email",
    "PAN Number",
    "Notes",
    "status",
  ];

  const rawClick = (key) => {
    setObj(data[key]);
    history.push(`${url}/editcompany`);
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
              onClick={() => router.push(`company/register`)}
              style={{ backgroundColor: "#0062ad" }}
            >
              Add Company
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

CompanyList.layout = Admin;
CompanyList.auth = true;

export default CompanyList;
