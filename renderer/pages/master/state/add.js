import React from "react";
import router from "next/router";
import StateForm from "components/Form/StateForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const create = () => {
  const { setError } = useForm();
  const { data: session } = useSession();
  const gst_number = session?.company?.gst_number?.toLowerCase();

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/state/add", { payload, gst_number })
      .then((res) => {
        toast.success("State created successfully");
        router.push("/master/state");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <StateForm handleFormSave={handleFormSave} />;
};

create.layout = Admin;
create.auth = true;

export default create;
