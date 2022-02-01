import React from "react";
import router from "next/router";
import ItemForm from "components/Form/ItemForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import { itemGroups, units } from "lib/masters";
import toast from "react-hot-toast";

const edit = (props) => {
  const item = JSON.parse(props.item);
  const groupList = JSON.parse(props.groupList);
  const unitList = JSON.parse(props.unitList);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/item/edit/${item.id}`, payload)
      .then((res) => {
        toast.success("Item edited successfully");
        router.push("/master/item");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <ItemForm
      item={item}
      handleFormSave={handleFormEdit}
      groupList={groupList}
      unitList={unitList}
    />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const groupList = await itemGroups();
  const unitList = await units();

  return {
    props: {
      item: JSON.stringify(item),
      groupList: JSON.stringify(groupList),
      unitList: JSON.stringify(unitList),
    },
  };
}
