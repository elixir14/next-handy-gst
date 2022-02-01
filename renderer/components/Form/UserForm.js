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
import PasswordInput from "../PasswordInput/PasswordInput";

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
  const { control, handleSubmit, watch, setValue } = useForm();

  const isEdit = !!user;

  const classes = useStyles();
  const state_id = watch("state_id");

  useEffect(() => {
    setValue("type", "");
  }, [state_id]);

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {isEdit ? "Edit User" : "Add User"}
            </h4>
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
                  labelText="First name"
                  id="first_name"
                  name="first_name"
                  isDisable={isEdit}
                  defaultValue={user?.first_name || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
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
                  control={control}
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
                  control={control}
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
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
                  control={control}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="Type"
                  name="type"
                  defaultValue={user?.type || ""}
                  optionData={[
                    { id: "admin", name: "Admin" },
                    { id: "user", name: "User" },
                  ]}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
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
                        required: "Password is required",
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
                        required: "Confirm Password is required",
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
            <Button
              color="primary"
              onClick={handleSubmit(handleFormSave, onError)}
            >
              {isEdit ? "Update" : "Add"}
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

export default UserForm;
