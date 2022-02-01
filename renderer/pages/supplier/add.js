import React from "react";
import router from "next/router";
import SupplierForm from "components/Form/SupplierForm";
import Admin from "layouts/Admin";
import axios from "axios";
import toast from "react-hot-toast";

const create = () => {
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
      .post("/api/supplier/add", payload)
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

  return <SupplierForm handleFormSave={handleFormSave} />;
};

create.layout = Admin;
create.auth = true;

export default create;
