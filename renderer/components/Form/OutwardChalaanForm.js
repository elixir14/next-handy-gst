import React, { useState } from "react";
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
import Table from "components/Table/Table";
import router from "next/router";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import { useForm } from "react-hook-form";
import CustomDropDown from "../CustomDropDown/CustomDropDown";
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

const OutwardChalaanForm = ({
  outward_chalaan,
  handleFormSave,
  transportList,
  supplierList,
  processList,
  chalaanItemList = [],
  itemList,
}) => {
  const { control, handleSubmit } = useForm();
  const {
    control: itemControl,
    handleSubmit: handleItemSubmit,
    setError: setItemError,
    reset: itemReset,
    setValue: setItemValue,
  } = useForm();

  // const mergeById = (a1, a2) =>
  //   a1.map((itm) => ({
  //     item: a2.find((item) => item.id === itm.item_id && item),
  //     ...itm,
  //   }));

  // const chalaanItemWithItem = mergeById(chalaanItemList, itemList);

  const [chalaanItems, setChalaanItems] = useState(chalaanItemList);
  const [itemId, setItemId] = useState(null);

  const isEdit = !!outward_chalaan;

  const classes = useStyles();
  const chalaan_date =
    (outward_chalaan?.date && new Date(outward_chalaan?.date)) || new Date();

  const headerData = [
    { id: "id", name: "Id" },
    { id: "item", name: "Item" },
    { id: "quantity", name: "Quantity" },
    { id: "net_weight", name: "Net Weight(kgs)" },
    { id: "gross_weight", name: "Gross Weight(kgs)" },
    { id: "remark", name: "Remark" },
    { id: "action", name: "Action" },
  ];

  const handleAddItem = (data) => {
    const payload = data;
    if (itemId) {
      // axios
      //   .post(`/api/outward-chalaan-item/edit/${itemId}`, payload)
      //   .then((res) => {
      //     toast.success("Item edited successfully");
      //     router.push("/outward-chalaan-item");
      //   })
      //   .catch((error) => {
      //     setError(error.response.data.key, {
      //       type: "manual",
      //       message: error.response.data.message,
      //     });
      //   });
    } else {
      axios
        .post("/api/outward-chalaan-item/add", payload)
        .then((res) => {
          setItemId(null);
          setChalaanItems([...chalaanItems, payload]);
          toast.success("Item created successfully");
          itemReset();
        })
        .catch((error) => {
          setItemError(error.response.data.key, {
            type: "manual",
            message: error.response.data.message,
          });
        });
    }
  };

  const handleEdit = (data) => {
    Object.keys(data).map((key) =>
      setItemValue(key, data[key], { shouldValidate: true })
    );
    setItemId(data.id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/outward-chalaan-item/delete/${id}`)
      .then((res) => {
        toast.success("Item deleted successfully");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: index.js ~ line 36 ~ deleteEntry ~ error",
          error
        );
      });
  };

  return (
    <div className={classes.content}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              {isEdit ? "Edit Chalaan" : "Add Chalaan"}
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Date"
                  defaultValue={chalaan_date?.toISOString()?.split("T")[0]}
                  id="date"
                  name="date"
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{ type: "date" }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Number"
                  id="number"
                  name="number"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.number || ""}
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
                  labelText="Supplier"
                  name="supplier_id"
                  defaultValue={outward_chalaan?.supplier_id || ""}
                  optionData={supplierList}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="Prodess"
                  name="process_id"
                  defaultValue={outward_chalaan?.process_id || ""}
                  optionData={processList}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Duration"
                  id="duration"
                  name="duration"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.duration || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  control={control}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <CustomDropDown
                  control={itemControl}
                  labelText="Item"
                  name="item_id"
                  defaultValue=""
                  optionData={itemList}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Quantity"
                  id="quantity"
                  name="quantity"
                  defaultValue=""
                  isDisable={isEdit}
                  control={itemControl}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Net Weight"
                  id="net_weight"
                  name="net_weight"
                  defaultValue=""
                  isDisable={isEdit}
                  control={itemControl}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Gross Weight"
                  id="gross_weight"
                  name="gross_weight"
                  defaultValue=""
                  isDisable={isEdit}
                  control={itemControl}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Remark"
                  id="remark"
                  name="remark"
                  defaultValue=""
                  isDisable={isEdit}
                  control={itemControl}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={1}
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <AddCircleSharpIcon
                  style={{ fill: "#8e24aa", cursor: "pointer" }}
                  onClick={handleItemSubmit(handleAddItem)}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Table
                  tableHeaderColor="primary"
                  tableHead={headerData}
                  tableData={chalaanItems}
                  rawClick={handleEdit}
                  deleteEntry={handleDelete}
                  fullData={true}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Bags"
                  id="bags"
                  name="bags"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.bags || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Total Quantity"
                  id="total_quantity"
                  // name="total_quantity"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.total_quantity || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Net Weight"
                  id="net_weight"
                  // name="net_weight"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.net_weight || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Gross Weight"
                  id="gross_weight"
                  // name="gross_weight"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.gross_weight || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Rate"
                  id="rate"
                  name="rate"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.rate || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>{" "}
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Total Amount"
                  id="total_amount"
                  // name="total_amount"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.total_amount || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>{" "}
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="SGST"
                  id="sgst"
                  // name="sgst"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.sgst || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>{" "}
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="CGST"
                  id="cgst"
                  // name="cgst"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.cgst || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="IGST"
                  id="igst"
                  // name="igst"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.igst || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomDropDown
                  control={control}
                  labelText="Transport"
                  name="transport_id"
                  defaultValue={outward_chalaan?.transport_id || ""}
                  optionData={transportList}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Note"
                  id="note"
                  name="note"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.note || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter plain>
            <Button
              color="rose"
              onClick={() => router.push("/outward-chalaan")}
            >
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

export default OutwardChalaanForm;
