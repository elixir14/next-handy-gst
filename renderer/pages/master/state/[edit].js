import React from "react";
import router from "next/router";
import StateForm from "components/Form/StateForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const edit = (props) => {
  const state = JSON.parse(props.state);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/state/edit/${state.id}`, payload)
      .then((res) => {
        toast.success("State edited successfully");
        router.push("/master/state");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <StateForm state={state} handleFormSave={handleFormEdit} />;
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const state = await prisma.state.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      state: JSON.stringify(state),
    },
  };
}
