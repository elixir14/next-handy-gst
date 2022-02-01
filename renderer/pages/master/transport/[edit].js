import React from "react";
import router from "next/router";
import TransportForm from "components/Form/TransportForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const edit = (props) => {
  const transport = JSON.parse(props.transport);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/transport/edit/${transport.id}`, payload)
      .then((res) => {
        toast.success("Transport edited successfully");
        router.push("/master/transport");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <TransportForm transport={transport} handleFormSave={handleFormEdit} />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const transport = await prisma.transport.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      transport: JSON.stringify(transport),
    },
  };
}
