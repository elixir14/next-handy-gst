import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";

import Admin from "layouts/Admin";
import UserForm from "components/Form/UserForm";

const edit = (props) => {
  const gst_number = props.gst_number;
  const user = JSON.parse(props.user);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "required",
        message: "The passwords do not match",
      });
      return;
    }
    delete data.confirm_password;
    const payload = data;
    axios
      .post(`/api/user/edit/${user.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("User edited successfully");
        router.push("/user");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  const onError = (errors, e) => {
    if (errors?.confirmPassword) {
      setError("confirmPassword", {
        type: "required",
        message: "The passwords do not match",
      });
    }
  };
  return (
    <UserForm user={user} handleFormSave={handleFormEdit} onError={onError} />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.params.edit;

  const user = await prisma(gst_number).user.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      gst_number: gst_number || null,
      user: JSON.stringify(user),
    },
  };
}
