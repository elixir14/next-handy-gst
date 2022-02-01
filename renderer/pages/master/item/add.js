import React from "react";
import router from "next/router";
import ItemForm from "components/Form/ItemForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { itemGroups, units } from "lib/masters";

const create = (props) => {
  const { setError } = useForm();

  const groupList = JSON.parse(props.groupList);
  const unitList = JSON.parse(props.unitList);

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/item/add", payload)
      .then((res) => {
        toast.success("Item created successfully");
        router.push("/master/item");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <ItemForm
      handleFormSave={handleFormSave}
      groupList={groupList}
      unitList={unitList}
    />
  );
};

create.layout = Admin;
create.auth = true;

export default create;

export async function getServerSideProps() {
  const groupList = await itemGroups();
  const unitList = await units();

  return {
    props: {
      groupList: JSON.stringify(groupList),
      unitList: JSON.stringify(unitList),
    },
  };
}
