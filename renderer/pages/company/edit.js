import React, { useState, useRef } from "react";
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
import { useForm, Controller } from "react-hook-form";

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

export default function App(props) {
  return <CompanyForm props={props} />;
}

const CompanyForm = (props) => {
  const classes = useStyles();
  const [stateList, setStateList] = useState([]);
  const [gstCode, setGstCode] = useState();
  const [cityList, setCityList] = useState([]);
  const { defaultValueObj, isEditForm } = props.props;

  const [state, setState] = React.useState({
    city: defaultValueObj ? defaultValueObj.city_id : "",
    state: defaultValueObj ? defaultValueObj.state_id : "",
  });

  let selectedValues = {
    city: 1,
    state: 1,
  };
  const token = sessionStorage.getItem("access");
  const { handleSubmit, control, errors, setError, watch } = useForm();
  const gstNumber = useRef({});
  gstNumber.current = watch("gst_number", "");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (state.state) {
    getCities(state.state, config).then((res) => setCityList(res.data));
  }
  const onSubmit = (data) => {
    data.city_id = parseInt(state.city);
    data.state_id = parseInt(state.state);
    if (!state.state) {
      setError("state", {
        type: "manual",
        message: "State can not be blank",
      });
    }
    if (!state.city) {
      setError("city", {
        type: "manual",
        message: "City can not be blank",
      });
    }
    if (gstCode !== parseInt(gstNumber.current.substring(0, 2))) {
      setError("gst_number", {
        type: "manual",
        message: "Gst number is not valid for selected state",
      });
    }
    isEditForm
      ? updateCompany(defaultValueObj.id, data, config).then((response) => {
          history.push("/customer");
        })
      : companyRegister(data, config)
          .then((response) => {
            history.push("/customer");
          })
          .catch((error) => {
            console.log(error.response, "company error");
          });
  };

  const handleCity = (data) => {
    const name = data.target.name;
    setState({
      ...state,
      [name]: data.target.value,
    });
    selectedValues.city = data.target.value;
  };

  const handleState = (data) => {
    const code = stateList.find((obj) => {
      return obj.id == data.target.value;
    }).gst_code;

    setGstCode(code);
    code !== parseInt(gstNumber.current.substring(0, 2))
      ? setError("gst_number", {
          type: "manual",
          message: "Gst number is not valid for selected state",
        })
      : setError("gst_number", {
          type: "manual",
          message: "",
        });
    const name = data.target.name;
    setState({
      ...state,
      [name]: data.target.value,
    });
    getCities(data.target.value, config).then((res) => setCityList(res.data));
    selectedValues.state = data.target.value;
  };

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {isEditForm ? "Edit Company" : "Company Registration"}
            </h4>
            <p className={classes.cardCategoryWhite}>
              {isEditForm
                ? "Edit your company profile"
                : "Create your company profile"}
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="Company Name"
                      defaultValue={defaultValueObj ? defaultValueObj.name : ""}
                      id="name"
                      name="name"
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="name"
                  defaultValue=""
                  control={control}
                  rules={{
                    pattern: {
                      value: /[a-zA-Z]+/,
                      message: "Name is Invalid",
                    },
                    required: "Name is required",
                  }}
                />
                {errors.name && (
                  <p className={classes.errorMsg}>{errors.name.message}</p>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="GST Number"
                      id="gst_number"
                      name="gst_number"
                      isDisable={isEditForm}
                      defaultValue={
                        defaultValueObj ? defaultValueObj.gst_number : ""
                      }
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="gst_number"
                  defaultValue=""
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
                {errors.gst_number && (
                  <p className={classes.errorMsg}>
                    {errors.gst_number.message}
                  </p>
                )}
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="Address"
                      id="addressLine1"
                      name="addressLine1"
                      defaultValue={
                        defaultValueObj ? defaultValueObj.addressLine1 : ""
                      }
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="addressLine1"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: "Address can not be blank",
                  }}
                />
                {errors.addressLine1 && (
                  <p className={classes.errorMsg}>
                    {errors.addressLine1.message}
                  </p>
                )}
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  as={
                    <CustomDropDown
                      control={control}
                      selectedValue={state.state}
                      handleChange={handleState}
                      labelText="State"
                      name="state"
                      optionData={data ? data : []}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  }
                  name="state"
                  defaultValue=""
                  control={control}
                  rules={
                    {
                      // required: 'State is required'
                    }
                  }
                />
                {errors.state && (
                  <p className={classes.errorMsg}>{errors.state.message}</p>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  as={
                    <CustomDropDown
                      control={control}
                      selectedValue={state.city}
                      handleChange={handleCity}
                      labelText="City"
                      name="city"
                      optionData={cityList}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  }
                  name="city"
                  defaultValue=""
                  control={control}
                  rules={
                    {
                      // required: 'City is required',
                    }
                  }
                />
                {errors.city && (
                  <p className={classes.errorMsg}>{errors.city.message}</p>
                )}
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="Email"
                      id="email"
                      name="email"
                      isDisable={isEditForm}
                      defaultValue={
                        defaultValueObj ? defaultValueObj.email : ""
                      }
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
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
                />
                {errors.email && (
                  <p className={classes.errorMsg}>{errors.email.message}</p>
                )}
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="Phone Number"
                      id="phone"
                      name="phone"
                      defaultValue={
                        defaultValueObj ? defaultValueObj.phone : ""
                      }
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="phone"
                  defaultValue=""
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^0{0,1}[1-9]{1}[0-9]{2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[0-9]{1}[0-9]{6}$/,
                      message: "Phone is Invalid",
                    },
                    required: "Phone number can not be blank",
                  }}
                />
                {errors.phone && (
                  <p className={classes.errorMsg}>{errors.phone.message}</p>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="Postal Code"
                      id="postal_code"
                      name="postal_code"
                      defaultValue={
                        defaultValueObj ? defaultValueObj.postal_code : ""
                      }
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="postal_code"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: "Postal code is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Postal code is Invalid",
                    },
                  }}
                />
                {errors.postal_code && (
                  <p className={classes.errorMsg}>
                    {errors.postal_code.message}
                  </p>
                )}
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="PAN Number"
                      id="pan"
                      name="pan"
                      isDisable={isEditForm}
                      defaultValue={defaultValueObj ? defaultValueObj.pan : ""}
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="pan"
                  defaultValue=""
                  control={control}
                  rules={{
                    pattern: {
                      value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                      message: "Pan number is Invalid",
                    },
                    required: "Pan number can not be blank",
                  }}
                />
                {errors.pan && (
                  <p className={classes.errorMsg}>{errors.pan.message}</p>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="Status"
                      id="status"
                      name="status"
                      defaultValue={
                        defaultValueObj ? defaultValueObj.status : ""
                      }
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="status"
                  defaultValue=""
                  control={control}
                />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Controller
                  render={(props) => (
                    <CustomInput
                      labelText="Notes"
                      id="notes"
                      name="notes"
                      defaultValue={
                        defaultValueObj ? defaultValueObj.notes : ""
                      }
                      control={control}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  )}
                  name="notes"
                  defaultValue=""
                  control={control}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              {isEditForm ? "Update" : "Register"}
            </Button>
            <Button color="primary" onClick={() => history.push("/customer")}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

// export default CompanyForm
