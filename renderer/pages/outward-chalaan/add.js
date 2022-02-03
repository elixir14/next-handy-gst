import React from "react";
import router from "next/router";
import OutwardChalaanForm from "components/Form/OutwardChalaanForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  items,
  outward_chalaan_item,
  processes,
  suppliers,
  transports,
} from "lib/masters";

const create = (props) => {
  const { setError } = useForm();

  const transportList = JSON.parse(props.transportList);
  const supplierList = JSON.parse(props.supplierList);
  const processList = JSON.parse(props.processList);
  const itemList = JSON.parse(props.itemList);

  const handleFormSave = (data) => {
    const date = new Date(data.date);
    const payload = { ...data, date };
    axios
      .post("/api/outward-chalaan/add", payload)
      .then((res) => {
        toast.success("Chalaan created successfully");
        router.push("/outward-chalaan");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <OutwardChalaanForm
      handleFormSave={handleFormSave}
      transportList={transportList}
      supplierList={supplierList}
      processList={processList}
      itemList={itemList}
    />
  );
};

create.layout = Admin;
create.auth = true;

export default create;
export async function getServerSideProps() {
  const transportList = await transports();
  const supplierList = await suppliers();
  const processList = await processes();
  const itemList = await items();

  return {
    props: {
      transportList: JSON.stringify(transportList),
      supplierList: JSON.stringify(supplierList),
      processList: JSON.stringify(processList),
      itemList: JSON.stringify(itemList),
    },
  };
}
