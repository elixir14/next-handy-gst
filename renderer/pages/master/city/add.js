import React from "react";
import router from "next/router";
import CityForm from "components/Form/CityForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { states } from "lib/masters";
import { getSession } from "next-auth/react";

const create = (props) => {
  const { setError } = useForm();
  const gst_number = props.gst_number;
  const stateList = JSON.parse(props.stateList);

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/city/add", { payload, gst_number })
      .then((res) => {
        toast.success("City created successfully");
        router.push("/master/city");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <CityForm handleFormSave={handleFormSave} stateList={stateList} />;
};

create.layout = Admin;
create.auth = true;

export default create;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const stateList = await states(gst_number);
  return {
    props: {
      gst_number: gst_number || null,
      stateList: JSON.stringify(stateList),
    },
  };
}
