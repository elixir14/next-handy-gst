import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PasswordInput from "components/PasswordInput/PasswordInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useForm } from "react-hook-form";
import router from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { hashPassword } from "lib/auth";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  textBold: {
    color: "#0062ad",
    fontWeight: "bold",
    marginLeft: "3px",
    cursor: "pointer",
    marginTop: "0",
    marginBottom: "0",
  },
  loginCont: {
    display: "flex",
    justifyContent: "center",
    margin: "0",
    padding: "0",
    fontSize: "15px",
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
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 123px)",
  },
};

const useStyles = makeStyles(styles);

const Register = () => {
  const classes = useStyles();
  const { handleSubmit, control, setError } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirm_password", {
        type: "required",
        message: "The passwords do not match",
      });
      return;
    }
    data.app_type = "Desktop";
    data.licence = "";
    delete data.confirmPassword;
    const hashedPassword = await hashPassword(data.password);
    const payload = { ...data, password: hashedPassword };
    axios
      .post("/api/user/add", payload)
      .then(() => {
        signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
          callbackUrl: `${window.location.origin}/`,
        }).then((res) => {
          toast.success("Registered Successfully");
          if (res.url) router.push(res.url);
        });
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  const onError = (errors, e) => {
    if (errors?.confirmPassword) {
      setError("confirmPassword", {
        type: "required",
        message: "The passwords do not match",
      });
    }
  };

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Sign Up</h4>
            <p className={classes.cardCategoryWhite}>Create your profile</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Name"
                  id="name"
                  name="name"
                  defaultValue=""
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    pattern: {
                      value: /[a-zA-Z]+/,
                      message: "Name is Invalid",
                    },
                    required: "Name can not be blank",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Email address"
                  id="email"
                  name="email"
                  defaultValue=""
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Email is Invalid",
                    },
                    required: "Email can not be blank",
                  }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <PasswordInput
                  labelText="Password"
                  id="password"
                  name="password"
                  defaultValue=""
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Password can not be blank",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <PasswordInput
                  labelText="Confirm Password"
                  id="confirmPassword"
                  control={control}
                  name="confirmPassword"
                  defaultValue=""
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: true,
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Phone"
                  id="phone"
                  name="phone"
                  defaultValue=""
                  control={control}
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
                    required: "Phone can not be blank",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Role"
                  id="role"
                  name="role"
                  defaultValue=""
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Role can not be blank",
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Business Type"
                  id="business_type"
                  name="business_type"
                  defaultValue=""
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Business Type can not be blank",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Notes"
                  id="notes"
                  name="notes"
                  defaultValue=""
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={handleSubmit(onSubmit, onError)}>
              Sign Up
            </Button>
          </CardFooter>
        </Card>
        <div className={classes.loginCont}>
          Already have an account?{" "}
          <p className={classes.textBold} onClick={() => router.push("/login")}>
            Login
          </p>
        </div>
      </GridItem>
    </div>
  );
};

export default Register;
