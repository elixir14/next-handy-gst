import React, { useEffect } from "react";
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
import { signIn } from "next-auth/react";
import router from "next/router";
import toast from "react-hot-toast";

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
  signUpCont: {
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
  FooterCont: {
    justifyContent: "center",
  },
};

const useStyles = makeStyles(styles);

const Login = () => {
  const classes = useStyles();

  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}/`,
    });
    if (res.status == 401) {
      toast.error("Invalid email or password");
    }
    if (res.url) {
      router.replace(res.url);
    }
  };

  const handleKeyPress = (event) => {
    let code = event.keyCode || event.which;
    if (code === 13) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Welcome Back</h4>
            <p className={classes.cardCategoryWhite}>
              Please Login To Continue
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Email Address"
                  defaultValue=""
                  id="email"
                  name="email"
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
                    required: "Email can not be blank",
                  }}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <PasswordInput
                  labelText="Password"
                  id="password"
                  defaultValue=""
                  name="password"
                  onKeyPress={handleKeyPress}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Password can not be blank",
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={() => handleSubmit(onSubmit)()}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

export default Login;
