import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";

import Admin from "layouts/Admin";
import UserForm from "components/Form/UserForm";
import { getById } from "lib/masters";
import { fetcher } from "lib/helper";
import useSWR from "swr";

const edit = (props) => {
  const { data: session } = useSession();
  const gst_number = props.gst_number;
  const id = props.editId;

  const { data: userData } = useSWR(
    session ? `/api/user/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );

  const user =
    JSON.parse(props.user)?.status === 404 ? userData : JSON.parse(props.user);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
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

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const user = await getById("user", gst_number, editId);

  return {
    gst_number: gst_number || null,
    editId,
    user: JSON.stringify(user) ?? null,
  };
};
