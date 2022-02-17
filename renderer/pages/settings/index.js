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
import Admin from "layouts/Admin";
import { SETTINGS } from "lib/constants";
import axios from "axios";
import toast from "react-hot-toast";
import Danger from "@/components/Typography/Danger";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

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

const index = (props) => {
  const gst_number = props.gst_number;
  const settingList = JSON.parse(props.settingList);

  const { control, handleSubmit, setError, getValues, clearErrors } = useForm({
    defaultValues: {},
  });

  const mergeById = (a1, a2) =>
    a1.map((itm) => ({
      ...a2.find((item) => item.id === itm.id && item),
      ...itm,
    }));
  const settings = mergeById(SETTINGS, settingList);

  const classes = useStyles();

  const handleFormSave = (data) => {
    const settingData = settings.map((setting) => ({
      id: setting.id,
      key: setting.key,
      value: data[setting.key],
    }));

    const payload = settingData;
    if (settingList.length) {
      axios
        .post(`/api/settings/many/edit`, { payload, gst_number })
        .then((res) => {
          toast.success("Settings edited successfully");
        })
        .catch((error) => {
          setError(error.response.data.key, {
            type: "manual",
            message: error.response.data.message,
          });
        });
    } else {
      axios
        .post("/api/settings/many/add", { payload, gst_number })
        .then((res) => {
          toast.success("Settings updated successfully");
        })
        .catch((error) => {
          setError(error.response.data.key, {
            type: "manual",
            message: error.response.data.message,
          });
        });
    }
  };
  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Settings</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {settings.map((setting, index) => (
                <GridItem xs={12} sm={12} md={6} key={index}>
                  <CustomInput
                    labelText={setting.label}
                    id={setting.key}
                    name={setting.key}
                    defaultValue={settingList?.length ? setting.value : ""}
                    control={control}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    rules={{
                      validate: (value) => {
                        if (
                          setting.key === "suffix" ||
                          setting.key === "prefix"
                        ) {
                          const [suffix, prefix] = getValues([
                            "suffix",
                            "prefix",
                          ]);
                          if (suffix || prefix) {
                            clearErrors(["suffix", "prefix"]);
                            return true;
                          } else {
                            setError("suffix", {
                              type: "manual",
                              message: "Suffix is required",
                            });
                            setError("prefix", {
                              type: "manual",
                              message: "Prefix is required",
                            });
                          }
                        } else if (value) {
                          return true;
                        }
                        return `${setting.label} is required`;
                      },
                    }}
                  />
                </GridItem>
              ))}
            </GridContainer>
          </CardBody>
          <CardFooter plain>
            <Button
              color="primary"
              onClick={handleSubmit(handleFormSave)}
              style={{ marginLeft: "auto" }}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </div>
  );
};

index.layout = Admin;
index.auth = true;

export default index;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const settingList = await prisma(gst_number).settings.findMany();
  return {
    props: {
      gst_number: gst_number || null,
      settingList: JSON.stringify(settingList),
    },
  };
};
