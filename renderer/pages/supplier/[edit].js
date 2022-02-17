import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

import prisma from "lib/prisma";
import Admin from "layouts/Admin";
import { cities, states } from "lib/masters";
import SupplierForm from "components/Form/SupplierForm";

const edit = (props) => {
  const gst_number = props.gst_number;
  const supplier = JSON.parse(props.supplier);
  const cityList = JSON.parse(props.cityList);
  const stateList = JSON.parse(props.stateList);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
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
      .post(`/api/supplier/edit/${supplier.id}`, { payload, gst_number })
      .then((res) => {
        toast.success("Supplier edited successfully");
        router.push("/supplier");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <SupplierForm
      supplier={supplier}
      handleFormSave={handleFormEdit}
      stateList={stateList}
      cityList={cityList}
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

  const supplier = await prisma(gst_number).supplier.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const cityList = await cities(gst_number);
  const stateList = await states(gst_number);
  return {
    props: {
      gst_number: gst_number || null,
      supplier: JSON.stringify(supplier),
      cityList: JSON.stringify(cityList),
      stateList: JSON.stringify(stateList),
    },
  };
}
