import React, { useState } from "react";
import router from "next/router";
import OutwardChalaanForm from "components/Form/OutwardChalaanForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { items, processes, settings, suppliers, transports } from "lib/masters";

const create = (props) => {
  const { setError } = useForm();

  const transportList = JSON.parse(props.transportList);
  const supplierList = JSON.parse(props.supplierList);
  const processList = JSON.parse(props.processList);
  const itemList = JSON.parse(props.itemList);
  const settingList = JSON.parse(props.settingList);

  const [chalaanItems, setChalaanItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);

  const updateChalaanNumber = () => {
    let number;
    settingList.map((setting) => {
      if (setting.key === "outward_challan_next_number") {
        number = setting;
      }
    });
    const payload = { ...number, value: `${parseInt(number.value) + 1}` };
    axios.post(`/api/settings/edit/8`, payload).catch((error) => {
      console.log("Error:", error);
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

  const handleFormSave = (data) => {
    const date = new Date(data.date);
    const payload = { ...data, date };
    axios
      .post("/api/outward-chalaan/add", payload)
      .then(async (res) => {
        await createChalaanItems(res.data.id);
        await updateChalaanNumber();
        toast.success("Chalaan created successfully");
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
      handleFormSave={handleFormSave}
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

create.layout = Admin;
create.auth = true;

export default create;

export async function getServerSideProps() {
  const transportList = await transports();
  const supplierList = await suppliers();
  const processList = await processes();
  const itemList = await items();
  const settingList = await settings();

  return {
    props: {
      transportList: JSON.stringify(transportList),
      supplierList: JSON.stringify(supplierList),
      processList: JSON.stringify(processList),
      itemList: JSON.stringify(itemList),
      settingList: JSON.stringify(settingList),
    },
  };
}
