import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { getSession, useSession } from "next-auth/react";

import Admin from "layouts/Admin";
import { getDataList } from "lib/masters";
import SupplierForm from "components/Form/SupplierForm";
import useSWR from "swr";
import { fetcher } from "lib/helper";

const create = (props) => {
  const gst_number = props.gst_number;
  const { data: session } = useSession();

  const { data: cityData } = useSWR(
    session ? `/api/city/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: stateData } = useSWR(
    session ? `/api/state/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const cityList =
    JSON.parse(props.cityList)?.status === 404
      ? cityData
      : JSON.parse(props.cityList);
  const stateList =
    JSON.parse(props.stateList)?.status === 404
      ? stateData
      : JSON.parse(props.stateList);

  const handleFormSave = (data) => {
    const payload = {
      ...data,
      cst_no: "",
      ecc_no: "",
      address: {
        address1: data.address1,
        address2: data.address2,
        landmark: data.landmark,
      },
    };

    delete payload.address1;
    delete payload.address2;
    delete payload.landmark;

    axios
      .post("/api/supplier/add", { payload, gst_number })
      .then((res) => {
        toast.success("Supplier created successfully");
        router.push("/supplier");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: add.js ~ line 21 ~ handleFormSave ~ error",
          error
        );
      });
  };

  return (
    <SupplierForm
      handleFormSave={handleFormSave}
      stateList={stateList}
      cityList={cityList}
    />
  );
};

create.layout = Admin;
create.auth = true;

export default create;

create.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const cityList = await getDataList("city", gst_number);
  const stateList = await getDataList("state", gst_number);
  return {
    cityList: JSON.stringify(cityList),
    stateList: JSON.stringify(stateList),
    gst_number: gst_number || null,
  };
};
