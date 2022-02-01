import React from "react";
import router from "next/router";
import ItemGroupForm from "components/Form/ItemGroupForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const edit = (props) => {
  const itemGroup = JSON.parse(props.itemGroup);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/group/edit/${itemGroup.id}`, payload)
      .then((res) => {
        toast.success("Item group edited successfully");
        router.push("/master/group");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <ItemGroupForm itemGroup={itemGroup} handleFormSave={handleFormEdit} />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const itemGroup = await prisma.group.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      itemGroup: JSON.stringify(itemGroup),
    },
  };
}
