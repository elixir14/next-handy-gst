import React from "react";
import router from "next/router";
import CityForm from "components/Form/CityForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { states } from "lib/masters";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const edit = (props) => {
  const gst_number = props.gst_number;
  const city = JSON.parse(props.city);
  const stateList = JSON.parse(props.stateList);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/city/edit/${city.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("City edited successfully");
        router.push("/master/city");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <CityForm
      city={city}
      handleFormSave={handleFormEdit}
      stateList={stateList}
    />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.params.edit;

  const city = await prisma(gst_number).city.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const stateList = await states(gst_number);
  return {
    props: {
      gst_number: gst_number || null,
      city: JSON.stringify(city),
      stateList: JSON.stringify(stateList),
    },
  };
}
