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
import { useForm } from "react-hook-form";
import router from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

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

const ImportToken = () => {
  const classes = useStyles();

  const { handleSubmit, control, setValue } = useForm();

  const dummyToken = {
    name: "Top company",
    sub_title: "",
    mfg_details: "Brass Auto Tyre Tube Valve Stem",
    address: { address1: "Shad 1", address2: "Shanker Tekri, Udhyognagar" },
    city: "Jamanagar",
    email: "admin@admin.com",
    phone: "123",
    fax_number: "GSR9654E",
    tin_number: "9874566FGE",
    cst_number: "GHHB63",
    ecc_number: "9874",
    reg_number: "RER98",
    gst_number: "GHO9654DNCH8",
    note: "",
  };

  const onSubmit = async (data) => {
    const payload = JSON.parse(data.token);
    axios
      .post("/api/company/add-company", payload)
      .then((res) => {
        toast.success("Company created successfully");
        router.push("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="primary">
            <p className={classes.cardCategoryWhite}>Import Token</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Token"
                  defaultValue=""
                  id="token"
                  name="token"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                  rules={{
                    required: "Token can not be blank",
                  }}
                />
              </GridItem>
            </GridContainer>
            <Button
              color="transparent"
              onClick={() => {
                setValue("token", JSON.stringify(dummyToken), {
                  shouldValidate: true,
                });
              }}
              color="info"
            >
              fill
            </Button>
          </CardBody>
          <CardFooter>
            <Button color="rose" onClick={() => router.push("/login")}>
              back
            </Button>
            <Button color="primary" onClick={() => handleSubmit(onSubmit)()}>
              Import
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

export default ImportToken;
