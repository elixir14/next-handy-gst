import React from "react";
import router from "next/router";
import UserForm from "components/Form/UserForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { hashPassword } from "lib/auth";

const create = () => {
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
      .post("/api/user/add", payload)
      .then((res) => {
        toast.success("User created successfully");
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

  return <UserForm handleFormSave={handleFormSave} onError={onError} />;
};

create.layout = Admin;
create.auth = true;

export default create;
