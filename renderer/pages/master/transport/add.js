import React from "react";
import router from "next/router";
import TransportForm from "components/Form/TransportForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const create = () => {
  const { setError } = useForm();

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/transport/add", payload)
      .then((res) => {
        toast.success("Transport created successfully");
        router.push("/master/transport");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <TransportForm handleFormSave={handleFormSave} />;
};

create.layout = Admin;
create.auth = true;

export default create;
