import React from "react";
import router from "next/router";
import CityForm from "components/Form/CityForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { getDataList, states } from "lib/masters";
import { getSession, useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher } from "lib/helper";

const create = (props) => {
  const gst_number = props.gst_number;
  const { data: session } = useSession();
  const { data: stateData } = useSWR(
    session ? `/api/state/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { setError } = useForm();
  const stateList = stateData || [];

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

create.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const stateList = await getDataList("state", gst_number);
  return {
    gst_number: gst_number || null,
    stateList: JSON.stringify(stateList),
  };
};
