import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";

import Admin from "layouts/Admin";
import { cities, states } from "lib/masters";
import SupplierForm from "components/Form/SupplierForm";

const create = (props) => {
  const gst_number = props.gst_number;
  const cityList = JSON.parse(props.cityList);
  const stateList = JSON.parse(props.stateList);
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

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const cityList = await cities(gst_number);
  const stateList = await states(gst_number);
  return {
    props: {
      cityList: JSON.stringify(cityList),
      stateList: JSON.stringify(stateList),
      gst_number: gst_number || null,
    },
  };
}
