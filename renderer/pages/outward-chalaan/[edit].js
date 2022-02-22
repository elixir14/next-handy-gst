import React, { useEffect, useState } from "react";
import router from "next/router";
import OutwardChalaanForm from "components/Form/OutwardChalaanForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { getById, getDataList } from "lib/masters";
import { getSession, useSession } from "next-auth/react";
import { fetcher } from "lib/helper";
import useSWR from "swr";

const edit = (props) => {
  const gst_number = props.gst_number;
  const { data: session } = useSession();
  const id = props.editId;

  const { data: outwardChalaanData } = useSWR(
    session ? `/api/outward_chalaan/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: transportData } = useSWR(
    session ? `/api/transport/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: supplierData } = useSWR(
    session ? `/api/supplier/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: processData } = useSWR(
    session ? `/api/process/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: itemData } = useSWR(
    session ? `/api/item/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: settingData } = useSWR(
    session ? `/api/settings/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: chalaanItemData } = useSWR(
    session
      ? `/api/outward_chalaan_item/get?gst_number=${gst_number}&outward_chalaan_id=${id}`
      : null,
    fetcher
  );

  const outward_chalaan =
    JSON.parse(props.outward_chalaan)?.status === 404
      ? outwardChalaanData
      : JSON.parse(props.outward_chalaan);
  const transportList =
    JSON.parse(props.transportList)?.status === 404
      ? transportData
      : JSON.parse(props.transportList);
  const supplierList =
    JSON.parse(props.supplierList)?.status === 404
      ? supplierData
      : JSON.parse(props.supplierList);
  const processList =
    JSON.parse(props.processList)?.status === 404
      ? processData
      : JSON.parse(props.processList);
  const itemList =
    JSON.parse(props.itemList)?.status === 404
      ? itemData
      : JSON.parse(props.itemList);
  const settingList =
    JSON.parse(props.settingList)?.status === 404
      ? settingData
      : JSON.parse(props.settingList);
  const chalaanItemList = chalaanItemData;

  const [chalaanItems, setChalaanItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);

  useEffect(() => {
    if (chalaanItemList?.length) {
      setChalaanItems(chalaanItemList);
      setTempItems(chalaanItemList);
    }
  }, [chalaanItemList]);

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
        data: { ids: ids || [], gst_number },
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
    axios
      .post("/api/outward_chalaan_item/many/add", { payload, gst_number })
      .catch((error) => {
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
      .post(`/api/outward-chalaan/edit/${outward_chalaan?.id}`, {
        payload,
        gst_number,
      })
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
      settingList={settingList || []}
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

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const outward_chalaan = await getById("outward_chalaan", gst_number, editId);

  const transportList = await getDataList("transport", gst_number);
  const supplierList = await getDataList("supplier", gst_number);
  const processList = await getDataList("process", gst_number);
  const itemList = await getDataList("item", gst_number);
  const settingList = await getDataList("settings", gst_number);

  return {
    gst_number: gst_number || null,
    editId,
    outward_chalaan: JSON.stringify(outward_chalaan),
    transportList: JSON.stringify(transportList),
    supplierList: JSON.stringify(supplierList),
    processList: JSON.stringify(processList),
    itemList: JSON.stringify(itemList),
    settingList: JSON.stringify(settingList),
  };
};
