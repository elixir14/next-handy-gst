import React from "react";
import router from "next/router";
import CityForm from "components/Form/CityForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { getDataList } from "lib/masters";
import { getSession, useSession } from "next-auth/react";

import { getById } from "lib/masters";
import { fetcher } from "lib/helper";
import useSWR from "swr";

const edit = (props) => {
  const { data: session } = useSession();
  const id = props.editId;
  const gst_number = props.gst_number;

  const { data: cityData } = useSWR(
    session ? `/api/city/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: stateData } = useSWR(
    session ? `/api/state/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const city =
    JSON.parse(props.city)?.status === 404 ? cityData : JSON.parse(props.city);
  const stateList =
    JSON.parse(props.stateList)?.status === 404
      ? stateData
      : JSON.parse(props.stateList);

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

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const city = await getById("city", gst_number, editId);
  const stateList = await getDataList("state", gst_number);

  return {
    gst_number: gst_number || null,
    editId,
    city: JSON.stringify(city),
    stateList: JSON.stringify(stateList),
  };
};
