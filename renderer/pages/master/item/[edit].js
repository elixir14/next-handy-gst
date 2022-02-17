import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";
import { itemGroups, units } from "lib/masters";

import ItemForm from "components/Form/ItemForm";
import Admin from "layouts/Admin";

const edit = (props) => {
  const gst_number = props.gst_number;
  const item = JSON.parse(props.item);
  const groupList = JSON.parse(props.groupList);
  const unitList = JSON.parse(props.unitList);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/item/edit/${item.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("Item edited successfully");
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
      item={item}
      handleFormSave={handleFormEdit}
      groupList={groupList}
      unitList={unitList}
    />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.params.edit;

  const item = await prisma(gst_number).item.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const groupList = await itemGroups(gst_number);
  const unitList = await units(gst_number);

  return {
    props: {
      gst_number: gst_number || null,
      item: JSON.stringify(item),
      groupList: JSON.stringify(groupList),
      unitList: JSON.stringify(unitList),
    },
  };
}
