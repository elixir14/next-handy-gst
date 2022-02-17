import React from "react";
import router from "next/router";
import StateForm from "components/Form/StateForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const edit = (props) => {
  const gst_number = props.gst_number;
  const state = JSON.parse(props.state);
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.params.edit;

  const state = await prisma(gst_number).state.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      gst_number: gst_number || null,
      state: JSON.stringify(state),
    },
  };
}
