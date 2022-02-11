import React from "react";
import router from "next/router";
import UnitForm from "components/Form/UnitForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const edit = (props) => {
  const unit = JSON.parse(props.unit);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/unit/edit/${unit.id}`, payload)
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

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const unit = await prisma.unit.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      unit: JSON.stringify(unit),
    },
  };
}
