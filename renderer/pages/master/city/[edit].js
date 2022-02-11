import React from "react";
import router from "next/router";
import CityForm from "components/Form/CityForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { states } from "lib/masters";

const edit = (props) => {
  const city = JSON.parse(props.city);
  const stateList = JSON.parse(props.stateList);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/city/edit/${city.id}`, payload)
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

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const city = await prisma.city.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const stateList = await states();
  return {
    props: {
      city: JSON.stringify(city),
      stateList: JSON.stringify(stateList),
    },
  };
}
