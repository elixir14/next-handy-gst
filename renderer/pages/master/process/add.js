import React from "react";
import router from "next/router";
import ProcessForm from "components/Form/ProcessForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const create = () => {
  const { setError } = useForm();

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/process/add", payload)
      .then((res) => {
        toast.success("Process created successfully");
        router.push("/master/process");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <ProcessForm handleFormSave={handleFormSave} />;
};

create.layout = Admin;
create.auth = true;

export default create;
