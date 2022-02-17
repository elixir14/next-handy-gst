import React from "react";
import axios from "axios";
import router from "next/router";
import Admin from "layouts/Admin";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";
import ItemGroupForm from "components/Form/ItemGroupForm";

const edit = (props) => {
  const gst_number = props.gst_number;
  const itemGroup = JSON.parse(props.itemGroup);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/group/edit/${itemGroup.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("Item group edited successfully");
        router.push("/master/group");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <ItemGroupForm itemGroup={itemGroup} handleFormSave={handleFormEdit} />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = params.edit;

  const itemGroup = await prisma(gst_number).group.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      gst_number: gst_number || null,
      itemGroup: JSON.stringify(itemGroup),
    },
  };
}
