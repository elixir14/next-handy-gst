import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

import { hashPassword } from "lib/auth";

import UserForm from "components/Form/UserForm";
import Admin from "layouts/Admin";

const create = ({ gst_number }) => {
  const { setError } = useForm();

  const handleFormSave = async (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "required",
        message: "The passwords do not match",
      });
      return;
    }
    delete data.confirm_password;
    const hashedPassword = await hashPassword(data.password);
    const payload = { ...data, password: hashedPassword };
    axios
      .post("/api/user/add", { payload, gst_number })
      .then((res) => {
        toast.success("User created successfully");
        router.push("/user");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
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

  return <UserForm handleFormSave={handleFormSave} onError={onError} />;
};

create.layout = Admin;
create.auth = true;

export default create;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: {
      gst_number: session?.company?.gst_number?.toLowerCase() || null,
    },
  };
}
