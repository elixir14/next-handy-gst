import React from "react";
import router from "next/router";
import ProcessForm from "components/Form/ProcessForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const edit = (props) => {
  const process = JSON.parse(props.process);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/process/edit/${process.id}`, payload)
      .then((res) => {
        toast.success("Process edited successfully");
        router.push("/master/process");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return <ProcessForm process={process} handleFormSave={handleFormEdit} />;
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const process = await prisma.process.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      process: JSON.stringify(process),
    },
  };
}
