import React from "react";
import router from "next/router";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import ProcessForm from "components/Form/ProcessForm";
import Admin from "layouts/Admin";

const create = () => {
  const { setError } = useForm();
  const { data: session } = useSession();
  const gst_number = session?.company?.gst_number?.toLowerCase();

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/process/add", { payload, gst_number })
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
