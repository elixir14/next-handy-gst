import React, { useState } from "react";
import axios from "axios";
import router from "next/router";
import Admin from "layouts/Admin";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import OutwardChalaanForm from "components/Form/OutwardChalaanForm";
import useSWR from "swr";
import { fetcher } from "lib/helper";

const create = (props) => {
  const { setError } = useForm();
  const { data: session } = useSession();
  const gst_number = session?.company?.gst_number?.toLowerCase();

  const { data: transportList } = useSWR(
    session ? `/api/transport/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: supplierList } = useSWR(
    session ? `/api/supplier/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: processList } = useSWR(
    session ? `/api/process/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: itemList } = useSWR(
    session ? `/api/item/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: settingList } = useSWR(
    session ? `/api/settings/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const [chalaanItems, setChalaanItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);

  const updateChalaanNumber = () => {
    let number;
    settingList?.map((setting) => {
      if (setting.key === "outward_challan_next_number") {
        number = setting;
      }
    });
    const payload = { ...number, value: `${parseInt(number.value) + 1}` };
    axios
      .post(`/api/settings/edit/8`, { payload, gst_number })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const createChalaanItems = (id) => {
    const payload = chalaanItems.map((item) => {
      delete item.id;
      item["outward_chalaan_id"] = id;
      return item;
    });
    axios
      .post("/api/outward_chalaan_item/many/add", { payload, gst_number })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  const handleFormSave = (data) => {
    const date = new Date(data.date);
    delete data.total_quantity;
    delete data.total_net_weight;
    delete data.total_gross_weight;
    const payload = { ...data, date };
    axios
      .post("/api/outward-chalaan/add", { payload, gst_number })
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
