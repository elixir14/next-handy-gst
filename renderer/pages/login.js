import React from "react";
import Link from "next/link";
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
import Primary from "@/components/Typography/Primary";
import CustomDropDown from "@/components/CustomDropDown/CustomDropDown";
import { companies } from "lib/masters";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  signUpCont: {
    display: "flex",
    fontWeight: "400",
    letterSpacing: "0.5px !important",
    margin: "0",
    padding: "0",
    fontSize: "15px !important",
    marginTop: "0",
    marginBottom: "0",
    textDecoration: "underline",
    cursor: "pointer",
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
  content: {
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 140px)",
  },
};

const useStyles = makeStyles(styles);

const Login = (props) => {
  const companyList = JSON.parse(props.companyList);
  const classes = useStyles();
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      company: data.company,
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
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomDropDown
                  control={control}
                  labelText="Company"
                  name="company"
                  optionData={companyList}
                  defaultValue=""
                  additional={true}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Company is required",
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Primary wrappedClass={classes.signUpCont}>
              <Link href="/import/token">Import your token!</Link>
            </Primary>
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

export async function getServerSideProps() {
  const companyList = await companies();

  return {
    props: {
      companyList: JSON.stringify(companyList),
    },
  };
}
