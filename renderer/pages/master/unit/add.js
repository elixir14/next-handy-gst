import React from "react";
import router from "next/router";
import UnitForm from "components/Form/UnitForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const create = () => {
  const { setError } = useForm();

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/unit/add", payload)
      .then((res) => {
        toast.success("Unit created successfully");
        router.push("/master/unit");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <UnitForm handleFormSave={handleFormSave} />;
};

create.layout = Admin;
create.auth = true;

export default create;
