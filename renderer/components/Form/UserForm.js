import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "renderer/components/Grid/GridItem.js";
import GridContainer from "renderer/components/Grid/GridContainer.js";
import CustomInput from "renderer/components/CustomInput/CustomInput.js";
import Button from "renderer/components/CustomButtons/Button.js";
import Card from "renderer/components/Card/Card.js";
import CardHeader from "renderer/components/Card/CardHeader.js";
import CardBody from "renderer/components/Card/CardBody.js";
import CardFooter from "renderer/components/Card/CardFooter.js";
import CustomDropDown from "renderer/components/CustomDropDown/CustomDropDown.js";
import router from "next/router";
import { useForm } from "react-hook-form";
import PasswordInput from "../PasswordInput/PasswordInput";
import { USER_TYPE } from "renderer/libconstants";

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

const UserForm = ({ user, handleFormSave, onError }) => {
  const { control, handleSubmit, getValues } = useForm();

  const isEdit = !!user;

  const classes = useStyles();

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{isEdit ? "Edit User" : "Add User"}</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Username"
                  defaultValue={user?.username || ""}
                  id="username"
                  name="username"
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
                  labelText="First name"
                  id="first_name"
                  name="first_name"
                  isDisable={isEdit}
                  defaultValue={user?.first_name || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "First name is required",
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Last name"
                  id="last_name"
                  name="last_name"
                  defaultValue={user?.last_name || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Last name is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Phone"
                  id="phone"
                  name="phone"
                  defaultValue={user?.phone || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Email"
                  id="email"
                  name="email"
                  defaultValue={user?.email || ""}
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
                  labelText="Code"
                  id="code"
                  name="code"
                  defaultValue={user?.code || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="Type"
                  name="type"
                  defaultValue={user?.type || ""}
                  optionData={USER_TYPE}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Type is required",
                  }}
                />
              </GridItem>
              {!isEdit && (
                <>
                  <GridItem xs={12} sm={12} md={6}>
                    <PasswordInput
                      labelText="Password"
                      defaultValue={user?.password || ""}
                      id="password"
                      name="password"
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      rules={{
                        required: "You must specify a password",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <PasswordInput
                      labelText="Confirm password"
                      defaultValue={user?.confirm_password || ""}
                      id="confirm_password"
                      name="confirm_password"
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      rules={{
                        validate: (value) =>
                          value === getValues("password") || "The passwords do not match",
                      }}
                    />
                  </GridItem>
                </>
              )}
            </GridContainer>
          </CardBody>
          <CardFooter plain>
            <Button color="rose" onClick={() => router.push("/user")}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit(handleFormSave, onError)}>
              {isEdit ? "Update" : "Add"}
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

export default UserForm;
