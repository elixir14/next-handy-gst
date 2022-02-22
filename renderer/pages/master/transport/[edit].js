import React from "react";
import router from "next/router";
import TransportForm from "components/Form/TransportForm";
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

  const { data: transportData } = useSWR(
    session ? `/api/transport/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );
  const transport =
    JSON.parse(props.transport)?.status === 404
      ? transportData
      : JSON.parse(props.transport);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/transport/edit/${transport.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("Transport edited successfully");
        router.push("/master/transport");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <TransportForm transport={transport} handleFormSave={handleFormEdit} />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const transport = await getById("transport", gst_number, editId);

  return {
    gst_number: gst_number || null,
    editId,
    transport: JSON.stringify(transport),
  };
};
