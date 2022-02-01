import React from "react";
import router from "next/router";
import ItemGroupForm from "components/Form/ItemGroupForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const create = () => {
  const { setError } = useForm();

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/group/add", payload)
      .then((res) => {
        toast.success("Item group created successfully");
        router.push("/master/group");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <ItemGroupForm handleFormSave={handleFormSave} />;
};

create.layout = Admin;
create.auth = true;

export default create;
