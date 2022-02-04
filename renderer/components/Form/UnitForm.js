import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import router from "next/router";
import { useForm } from "react-hook-form";
import CustomDropDown from "../CustomDropDown/CustomDropDown";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  errorMsg: {
    color: "#FF0000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  content: {
    backGroundColor: "#ff0000",
    height: "100%",
    overflowY: "auto",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const useStyles = makeStyles(styles);

const UnitForm = ({ unit, handleFormSave }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });

  const isEdit = !!unit;

  const classes = useStyles();

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {isEdit ? "Edit Unit" : "Add Unit"}
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Name"
                  defaultValue={unit?.name || ""}
                  id="name"
                  name="name"
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Name is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Code"
                  id="code"
                  name="code"
                  isDisable={isEdit}
                  defaultValue={unit?.code || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="Status"
                  name="status"
                  defaultValue={unit?.status || ""}
                  optionData={[
                    { id: "pending", name: "Pending" },
                    { id: "in_process", name: "In Process" },
                    { id: "approved", name: "Approved" },
                    { id: "completed", name: "Completed" },
                  ]}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Status is required",
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter plain>
            <Button color="rose" onClick={() => router.push("/master/unit")}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit(handleFormSave)}>
              {isEdit ? "Update" : "Add"}
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

export default UnitForm;
