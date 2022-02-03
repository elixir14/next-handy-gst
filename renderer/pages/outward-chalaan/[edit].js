import React from "react";
import router from "next/router";
import OutwardChalaanForm from "components/Form/OutwardChalaanForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { items, processes, suppliers, transports } from "lib/masters";

const edit = (props) => {
  const outward_chalaan = JSON.parse(props.outward_chalaan);
  const transportList = JSON.parse(props.transportList);
  const supplierList = JSON.parse(props.supplierList);
  const processList = JSON.parse(props.processList);
  const chalaanItemList = JSON.parse(props.chalaanItemList);
  const itemList = JSON.parse(props.itemList);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const date = new Date(data.date);
    const payload = { ...data, date };
    axios
      .post(`/api/outward-chalaan/edit/${outward_chalaan.id}`, payload)
      .then((res) => {
        toast.success("Chalaan edited successfully");
        router.push("/outward-chalaan");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  return (
    <OutwardChalaanForm
      outward_chalaan={outward_chalaan}
      handleFormSave={handleFormEdit}
      transportList={transportList}
      supplierList={supplierList}
      processList={processList}
      chalaanItemList={chalaanItemList}
      itemList={itemList}
    />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const outward_chalaan = await prisma.outward_chalaan.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const chalaanItemList = await prisma.outward_chalaan_item.findMany({
    where: {
      outward_chalaan_id: parseInt(editId),
    },
  });
  const transportList = await transports();
  const supplierList = await suppliers();
  const processList = await processes();
  const itemList = await items();

  return {
    props: {
      outward_chalaan: JSON.stringify(outward_chalaan),
      transportList: JSON.stringify(transportList),
      supplierList: JSON.stringify(supplierList),
      processList: JSON.stringify(processList),
      chalaanItemList: JSON.stringify(chalaanItemList),
      itemList: JSON.stringify(itemList),
    },
  };
}
