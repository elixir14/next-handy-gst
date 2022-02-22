import React from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import useSWR from "swr";
import toast from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";

import UnitForm from "components/Form/UnitForm";
import Admin from "layouts/Admin";

import { fetcher } from "lib/helper";
import { getById } from "lib/masters";

const edit = (props) => {
  const gst_number = props.gst_number;
  const id = props.editId;
  const { data: session } = useSession();

  const { data: unitData } = useSWR(
    session ? `/api/unit/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );
  const unit =
    JSON.parse(props.unit)?.status === 404 ? unitData : JSON.parse(props.unit);

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

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const unit = await getById("unit", gst_number, editId);

  return {
    gst_number: gst_number || null,
    editId,
    unit: JSON.stringify(unit),
  };
};
