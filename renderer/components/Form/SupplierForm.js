import React, { useEffect, useState } from "react";
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
import CardSubHeader from "../Card/CardSubHeader";

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

const SupplierForm = ({ supplier, handleFormSave, cityList, stateList }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {},
  });

  const [stateRequired, setStateRequired] = useState(false);
  const [filteredCity, setFilteredCity] = useState(cityList);

  useEffect(() => {
    if (supplier) {
      Object.keys(supplier).map((key) => {
        if (typeof supplier[key] === "object") {
          Object.keys(supplier[key]).map((childKey) => {
            setValue(childKey, supplier[key][childKey], {
              shouldValidate: true,
            });
          });
        }
        setValue(key, supplier[key], {
          shouldValidate: true,
        });
      });
    }
  }, [supplier]);

  const isEdit = !!supplier;

  const classes = useStyles();

  const handleOnChangeCity = (e) => {
    const { value } = e.target;
    const city = cityList.filter((city) => city.id === value)[0];
    setValue("state_id", city.state_id, { shouldValidate: true });
    setStateRequired(true);
  };

  const handleOnChangeState = (e) => {
    const { value } = e.target;
    setFilteredCity(cityList.filter((city) => city.state_id === value));
  };

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={10}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {isEdit ? "Edit Supplier" : "Add Supplier"}
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem>
                <CardSubHeader color="primary">Personal details</CardSubHeader>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Name"
                  defaultValue={supplier?.name || ""}
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
                  labelText="Email"
                  id="email"
                  name="email"
                  defaultValue={supplier?.email || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email is Invalid",
                    },
                    required: "Email is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Phone number"
                  id="phone"
                  name="phone"
                  isDisable={isEdit}
                  defaultValue={supplier?.phone || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Phone no. is required",
                    minLength: {
                      value: 10,
                      message: "Phone no. is Invalid",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone no. is Invalid",
                    },
                  }}
                  number={true}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Fax number"
                  id="fax_number"
                  name="fax_number"
                  defaultValue={supplier?.fax_number || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Address1"
                  id="address1"
                  name="address1"
                  defaultValue={supplier?.address?.address1 || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Address1 is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Address2"
                  id="address2"
                  name="address2"
                  defaultValue={supplier?.address?.address2 || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Landmark"
                  id="landmark"
                  name="landmark"
                  defaultValue={supplier?.address?.landmark || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="City"
                  name="city_id"
                  defaultValue={supplier?.city_id || ""}
                  optionData={filteredCity}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: handleOnChangeCity,
                  }}
                  rules={{
                    required: "City is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="State"
                  name="state_id"
                  defaultValue={supplier?.state_id || ""}
                  optionData={stateList}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    readOnly: stateRequired,
                    onChange: handleOnChangeState,
                  }}
                  rules={{
                    required: "State is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Pincode"
                  id="pincode"
                  name="pincode"
                  defaultValue={supplier?.pincode || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Pincode is required",
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem>
                <CardSubHeader color="primary">Primary Details</CardSubHeader>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Primary name"
                  id="primary_name"
                  name="primary_name"
                  defaultValue={supplier?.primary_name || ""}
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
                  labelText="Primary designation"
                  id="primary_designation"
                  name="primary_designation"
                  defaultValue={supplier?.primary_designation || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Primary phone"
                  id="primary_phone"
                  name="primary_phone"
                  defaultValue={supplier?.primary_phone || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Phone no. is required",
                    minLength: {
                      value: 10,
                      message: "Phone no. is Invalid",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone no. is Invalid",
                    },
                  }}
                  number={true}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Primary email"
                  id="primary_email"
                  name="primary_email"
                  defaultValue={supplier?.primary_email || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email is Invalid",
                    },
                    required: "Email is required",
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem>
                <CardSubHeader color="primary">Legal Details</CardSubHeader>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="GST number"
                  id="gst_number"
                  name="gst_number"
                  defaultValue={supplier?.gst_number || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="TAN"
                  id="tin_number"
                  name="tin_number"
                  defaultValue={supplier?.tin_number || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="PAN"
                  id="pan_number"
                  name="pan_number"
                  defaultValue={supplier?.pan_number || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "PAN is required",
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter plain>
            <Button color="rose" onClick={() => router.push("/supplier")}>
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

export default SupplierForm;
