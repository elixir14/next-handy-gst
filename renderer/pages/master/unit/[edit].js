import React from "react";
import router from "next/router";
import UnitForm from "components/Form/UnitForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const edit = (props) => {
  const gst_number = props.gst_number;
  const unit = JSON.parse(props.unit);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/unit/edit/${unit.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("Unit edited successfully");
        router.push("/master/unit");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <UnitForm unit={unit} handleFormSave={handleFormEdit} />;
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.params.edit;

  const unit = await prisma(gst_number).unit.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      gst_number: gst_number || null,
      unit: JSON.stringify(unit),
    },
  };
}
