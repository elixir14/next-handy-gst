import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

import { itemGroups, units } from "lib/masters";

import Admin from "layouts/Admin";
import ItemForm from "components/Form/ItemForm";

const create = (props) => {
  const { setError } = useForm();

  const gst_number = props.gst_number;
  const groupList = JSON.parse(props.groupList);
  const unitList = JSON.parse(props.unitList);

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/item/add", { payload, gst_number })
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const groupList = await itemGroups(gst_number);
  const unitList = await units(gst_number);

  return {
    props: {
      gst_number: gst_number || null,
      groupList: JSON.stringify(groupList),
      unitList: JSON.stringify(unitList),
    },
  };
}
