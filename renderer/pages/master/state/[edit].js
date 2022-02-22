import React from "react";
import router from "next/router";
import StateForm from "components/Form/StateForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import prisma from "lib/prisma";
import { getSession, useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "lib/helper";
import { getById } from "lib/masters";

const edit = (props) => {
  const gst_number = props.gst_number;
  const id = props.editId;
  const { data: session } = useSession();

  const { data: stateData } = useSWR(
    session ? `/api/state/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );
  const state =
    JSON.parse(props.state)?.status === 404
      ? stateData
      : JSON.parse(props.state);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/state/edit/${state.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("State edited successfully");
        router.push("/master/state");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <StateForm state={state} handleFormSave={handleFormEdit} />;
};

edit.layout = Admin;
edit.auth = true;

export default edit;

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const state = await getById("state", gst_number, editId);

  return {
    gst_number: gst_number || null,
    editId,
    state: JSON.stringify(state),
  };
};
