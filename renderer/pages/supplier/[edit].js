import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";

import Admin from "layouts/Admin";
import { getById, getDataList } from "lib/masters";
import SupplierForm from "components/Form/SupplierForm";
import useSWR from "swr";
import { fetcher } from "lib/helper";

const edit = (props) => {
  const gst_number = props.gst_number;
  const { data: session } = useSession();
  const id = props.editId;

  const { data: supplierData } = useSWR(
    session ? `/api/supplier/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );

  const { data: cityData } = useSWR(
    session ? `/api/city/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const { data: stateData } = useSWR(
    session ? `/api/state/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const supplier =
    JSON.parse(props.supplier)?.status === 404
      ? supplierData
      : JSON.parse(props.supplier);
  const cityList =
    JSON.parse(props.cityList)?.status === 404
      ? cityData
      : JSON.parse(props.cityList);
  const stateList =
    JSON.parse(props.stateList)?.status === 404
      ? stateData
      : JSON.parse(props.stateList);

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

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const supplier = await getById("supplier", gst_number, editId);
  const cityList = await getDataList("city", gst_number);
  const stateList = await getDataList("state", gst_number);

  return {
    gst_number: gst_number || null,
    editId,
    supplier: JSON.stringify(supplier),
    cityList: JSON.stringify(cityList),
    stateList: JSON.stringify(stateList),
  };
};
