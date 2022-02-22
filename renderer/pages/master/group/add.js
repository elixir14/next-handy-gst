import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Admin from "layouts/Admin";
import ItemGroupForm from "components/Form/ItemGroupForm";

const create = () => {
  const { setError } = useForm();
  const { data: session } = useSession();
  const gst_number = session?.company?.gst_number?.toLowerCase();

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/group/add", { payload, gst_number })
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
