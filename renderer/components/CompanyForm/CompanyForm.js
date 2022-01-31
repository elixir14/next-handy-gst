import React, { useEffect } from "react";
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
import CustomDropDown from "components/CustomDropDown/CustomDropDown.js";
import router from "next/router";
import { useForm } from "react-hook-form";

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
    minHeight: "calc(100vh - 123px)",
  },
};

const useStyles = makeStyles(styles);

const CompanyForm = ({ company, cities, states, handleFormSave }) => {
  const { control, handleSubmit, watch, setValue } = useForm();

  const isEdit = !!company;

  const classes = useStyles();
  const state_id = watch("state_id");

  useEffect(() => {
    setValue("city_id", "");
  }, [state_id]);

  const citiesByState = cities?.filter(
    (city) => city.state_id === parseInt(state_id)
  );

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {isEdit ? "Edit Company" : "Company Registration"}
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Company Name"
                  defaultValue={company?.name || ""}
                  id="name"
                  name="name"
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    pattern: {
                      value: /[a-zA-Z]+/,
                      message: "Name is Invalid",
                    },
                    required: "Name is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="GST Number"
                  id="gst_number"
                  name="gst_number"
                  isDisable={isEdit}
                  defaultValue={company?.gst_number || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
                      message: "GST number is Invalid",
                    },
                    required: "GST number is required",
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Address Line 1"
                  id="address_line_1"
                  name="address_line_1"
                  defaultValue={company?.address_line_1 || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                  rules={{
                    required: "Address can not be blank",
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Address Line 2"
                  id="address_line_2"
                  name="address_line_2"
                  defaultValue={company?.address_line_2 || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="State"
                  name="state_id"
                  defaultValue={company?.state_id || ""}
                  optionData={states}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "State is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="City"
                  name="city_id"
                  defaultValue={company?.city_id || ""}
                  optionData={citiesByState}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                  rules={{
                    required: "City is required",
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Email"
                  id="email"
                  name="email"
                  isDisable={isEdit}
                  defaultValue={company?.email || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Email is Invalid",
                    },
                    required: "Email can not be blank",
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Phone Number"
                  id="phone"
                  name="phone"
                  defaultValue={company?.phone || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    pattern: {
                      value:
                        /^0{0,1}[1-9]{1}[0-9]{2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[0-9]{1}[0-9]{6}$/,
                      message: "Phone is Invalid",
                    },
                    required: "Phone number can not be blank",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Postal Code"
                  id="postal_code"
                  name="postal_code"
                  defaultValue={company?.postal_code || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Postal code is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Postal code is Invalid",
                    },
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="PAN Number"
                  id="pan"
                  name="pan"
                  isDisable={isEdit}
                  defaultValue={company?.pan || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    pattern: {
                      value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                      message: "Pan number is Invalid",
                    },
                    required: "Pan number can not be blank",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Status"
                  id="status"
                  name="status"
                  defaultValue={company?.status || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Notes"
                  id="notes"
                  name="notes"
                  defaultValue={company?.notes || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={handleSubmit(handleFormSave)}>
              {isEdit ? "Update" : "Register"}
            </Button>
            <Button color="primary" onClick={() => router.push("/company")}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

export default CompanyForm;
