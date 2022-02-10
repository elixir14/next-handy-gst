import React, { useState } from "react";
import router from "next/router";
import OutwardChalaanForm from "components/Form/OutwardChalaanForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { items, processes, settings, suppliers, transports } from "lib/masters";

const edit = (props) => {
  const outward_chalaan = JSON.parse(props.outward_chalaan);
  const transportList = JSON.parse(props.transportList);
  const supplierList = JSON.parse(props.supplierList);
  const processList = JSON.parse(props.processList);
  const chalaanItemList = JSON.parse(props.chalaanItemList);
  const itemList = JSON.parse(props.itemList);
  const settingList = JSON.parse(props.settingList);

  const [chalaanItems, setChalaanItems] = useState(chalaanItemList);
  const [tempItems, setTempItems] = useState(chalaanItemList);

  const { setError } = useForm();

  const deleteChalaanItems = () => {
    let ids = tempItems.flatMap((obj) => {
      if (!/^item_/.test(obj.id)) {
        return obj.id;
      }
      return [];
    });

    axios
      .delete(`/api/outward_chalaan_item/many/delete`, {
        data: { ids: ids || [] },
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: index.js ~ line 36 ~ deleteEntry ~ error",
          error
        );
      });
  };

  const createChalaanItems = (id) => {
    const payload = chalaanItems.map((item) => {
      delete item.id;
      item["outward_chalaan_id"] = id;
      return item;
    });
    axios.post("/api/outward_chalaan_item/many/add", payload).catch((error) => {
      setError(error.response.data.key, {
        type: "manual",
        message: error.response.data.message,
      });
    });
  };

  const handleFormEdit = async (data) => {
    await deleteChalaanItems();
    const date = new Date(data.date);
    delete data.total_quantity;
    delete data.total_net_weight;
    delete data.total_gross_weight;
    const payload = { ...data, date };
    await axios
      .post(`/api/outward-chalaan/edit/${outward_chalaan.id}`, payload)
      .then(async (res) => {
        await createChalaanItems(res.data.id);
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
      itemList={itemList}
      settingList={settingList}
      chalaanItems={chalaanItems}
      setChalaanItems={setChalaanItems}
      tempItems={tempItems}
      setTempItems={setTempItems}
    />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const outward_chalaan = await prisma().outward_chalaan.findUnique({
    where: {
      id: parseInt(editId),
    },
  });
  const chalaanItemList = await prisma().outward_chalaan_item.findMany({
    where: {
      outward_chalaan_id: parseInt(editId),
    },
  });
  const transportList = await transports();
  const supplierList = await suppliers();
  const processList = await processes();
  const itemList = await items();
  const settingList = await settings();

  return {
    props: {
      outward_chalaan: JSON.stringify(outward_chalaan),
      transportList: JSON.stringify(transportList),
      supplierList: JSON.stringify(supplierList),
      processList: JSON.stringify(processList),
      chalaanItemList: JSON.stringify(chalaanItemList),
      itemList: JSON.stringify(itemList),
      settingList: JSON.stringify(settingList),
    },
  };
}
