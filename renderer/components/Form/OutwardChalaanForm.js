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
import Table from "components/Table/Table";
import router from "next/router";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
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

const OutwardChalaanForm = ({
  outward_chalaan,
  handleFormSave,
  transportList,
  supplierList,
  processList,
  chalaanItems,
  setChalaanItems,
  itemList,
  settingList,
  setTempItems,
  tempItems,
}) => {
  const classes = useStyles();
  const { control, handleSubmit, setValue } = useForm();
  const {
    control: itemControl,
    handleSubmit: handleItemSubmit,
    setError: setItemError,
    reset: itemReset,
    setValue: setItemValue,
  } = useForm();

  let setting = {};
  settingList.map((s) => {
    setting[s.key] = s;
  });

  const isEdit = !!outward_chalaan;

  const chalaan_date =
    (outward_chalaan?.date && new Date(outward_chalaan?.date)) || new Date();

  const headerData = [
    { id: "id", name: "Id" },
    { id: "item_id", name: "Item" },
    { id: "quantity", name: "Quantity" },
    { id: "net_weight", name: "Net Weight(kgs)" },
    { id: "gross_weight", name: "Gross Weight(kgs)" },
    { id: "remark", name: "Remark" },
    { id: "action", name: "Action" },
  ];

  const handleAddItem = async (data) => {
    setChalaanItems([
      ...chalaanItems,
      { ...data, id: `item_${chalaanItems.length}` },
    ]);
    setTempItems([...tempItems, { ...data, id: `item_${tempItems.length}` }]);
    itemReset();
  };

  const handleItemEdit = (data) => {
    Object.keys(data).map((key) =>
      setItemValue(key, data[key], { shouldValidate: true })
    );

    const items = chalaanItems.filter((item) => item.id !== data.id);
    setChalaanItems(items);
  };

  const handleItemDelete = (id) => {
    const items = chalaanItems.filter((item) => item.id !== id);
    setChalaanItems(items);
  };

  const readOnlyInput = {
    readOnly: true,
    tabIndex: -1,
    style: { pointerEvents: "none" },
  };

  useEffect(() => {
    setValue("total_quantity", chalaanItems.sum("quantity"), {
      shouldValidate: true,
    });
    setValue("total_net_weight", chalaanItems.sum("net_weight"), {
      shouldValidate: true,
    });
    setValue("total_gross_weight", chalaanItems.sum("gross_weight"), {
      shouldValidate: true,
    });
  }, [chalaanItems]);

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
                  rules={{
                    required: "Date is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Number"
                  id="number"
                  name="number"
                  isDisable={isEdit}
                  defaultValue={
                    outward_chalaan?.number
                      ? outward_chalaan?.number
                      : `${setting.prefix.value}${setting.outward_challan_next_number.value}${setting.suffix.value}`
                  }
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  rules={{
                    required: "Chalaan number is required",
                  }}
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
                  rules={{
                    required: "Supplier is required",
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
                  rules={{
                    required: "Process is required",
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
              <GridItem>
                <CardSubHeader color="primary">Add Items</CardSubHeader>
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
                  rules={{
                    required: "Item is required",
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
                  rules={{
                    required: "Quantity is required",
                  }}
                  number={true}
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
                  rules={{
                    required: "Net Weight is required",
                  }}
                  number={true}
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
                  rules={{
                    required: "Gross Weight is required",
                  }}
                  number={true}
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
                  style={{ fill: "#2b5ac7", cursor: "pointer" }}
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
                  rawClick={handleItemEdit}
                  deleteEntry={handleItemDelete}
                  fullData={true}
                  isEdit={true}
                  pagination={false}
                />
              </GridItem>
            </GridContainer>
            <hr style={{ marginTop: "35px" }} />
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
                  rules={{
                    required: "Bags is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Total Quantity"
                  name="total_quantity"
                  isDisable={isEdit}
                  defaultValue={0}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={readOnlyInput}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Net Weight"
                  name="total_net_weight"
                  isDisable={isEdit}
                  defaultValue={0}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={readOnlyInput}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Gross Weight"
                  name="total_gross_weight"
                  isDisable={isEdit}
                  defaultValue={0}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={readOnlyInput}
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
                  rules={{
                    required: "Rate is required",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Total Amount"
                  id="total_amount"
                  isDisable={isEdit}
                  defaultValue={outward_chalaan?.total_amount || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={readOnlyInput}
                  number={true}
                />
              </GridItem>{" "}
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="SGST"
                  id="sgst"
                  isDisable={isEdit}
                  defaultValue={setting?.SGST?.value || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={readOnlyInput}
                />
              </GridItem>{" "}
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="CGST"
                  id="cgst"
                  isDisable={isEdit}
                  defaultValue={setting.CGST?.value || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={readOnlyInput}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="IGST"
                  id="igst"
                  isDisable={isEdit}
                  defaultValue={setting?.IGST?.value || ""}
                  control={control}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={readOnlyInput}
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
                  rules={{
                    required: "Transport is required",
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

Array.prototype.sum = function (prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += parseFloat(this[i][prop]);
  }
  return total;
};
