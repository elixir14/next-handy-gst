import React from "react";
import axios from "axios";
import router from "next/router";
import Admin from "layouts/Admin";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";

import ItemGroupForm from "components/Form/ItemGroupForm";
import useSWR from "swr";
import { fetcher } from "lib/helper";
import { getById } from "lib/masters";

const edit = (props) => {
  const gst_number = props.gst_number;
  const id = props.editId;

  const { data: session } = useSession();

  const { data: groupData } = useSWR(
    session ? `/api/group/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );

  const itemGroup =
    JSON.parse(props.itemGroup)?.status === 404
      ? groupData
      : JSON.parse(props.itemGroup);

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

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const itemGroup = await getById("group", gst_number, editId);

  return {
    gst_number: gst_number || null,
    editId,
    itemGroup: JSON.stringify(itemGroup),
  };
};
