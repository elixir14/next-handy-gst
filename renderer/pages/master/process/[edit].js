import React from "react";
import router from "next/router";
import ProcessForm from "components/Form/ProcessForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import prisma from "lib/prisma";
import { getSession, useSession } from "next-auth/react";
import { getById } from "lib/masters";
import useSWR from "swr";
import { fetcher } from "lib/helper";

const edit = (props) => {
  const gst_number = props.gst_number;
  const id = props.editId;
  const { data: session } = useSession();

  const { data: processData } = useSWR(
    session ? `/api/process/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );
  const process =
    JSON.parse(props.process)?.status === 404
      ? processData
      : JSON.parse(props.process);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/process/edit/${process.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("Process edited successfully");
        router.push("/master/process");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <ProcessForm process={process} handleFormSave={handleFormEdit} />;
};

edit.layout = Admin;
edit.auth = true;

export default edit;

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const process = await getById("process", gst_number, editId);

  return {
    gst_number: gst_number || null,
    editId,
    process: JSON.stringify(process),
  };
};
