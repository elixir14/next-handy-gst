import React from "react";
import router from "next/router";
import SupplierForm from "components/Form/SupplierForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { cities, states } from "lib/masters";

const edit = (props) => {
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
      .post(`/api/supplier/edit/${supplier.id}`, payload)
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

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const supplier = await prisma().supplier.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const cityList = await cities();
  const stateList = await states();
  return {
    props: {
      supplier: JSON.stringify(supplier),
      cityList: JSON.stringify(cityList),
      stateList: JSON.stringify(stateList),
    },
  };
}
