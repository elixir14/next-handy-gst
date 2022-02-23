import React from "react";
import axios from "axios";
import useSWR from "swr";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";

import { getById, getDataList } from "lib/masters";
import { fetcher } from "lib/helper";

import ItemForm from "components/Form/ItemForm";
import Admin from "layouts/Admin";

const edit = (props) => {
  const gst_number = props.gst_number;
  const { data: session } = useSession();
  const id = props.editId;

  const { data: itemData } = useSWR(
    session ? `/api/item/get/${id}?gst_number=${gst_number}` : null,
    fetcher
  );

  const { data: groupData } = useSWR(
    session ? `/api/group/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const { data: unitData } = useSWR(
    session ? `/api/unit/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const item =
    JSON.parse(props.item)?.status === 404 ? itemData : JSON.parse(props.item);

  const groupList =
    JSON.parse(props.groupList)?.status === 404
      ? groupData
      : JSON.parse(props.groupList);

  const unitList =
    JSON.parse(props.unitList)?.status === 404
      ? unitData
      : JSON.parse(props.unitList);

  const { setError } = useForm();

  const handleFormEdit = (data) => {
    const payload = data;
    axios
      .post(`/api/item/edit/${item.id}`, { payload, gst_number })
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

edit.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;
  const editId = ctx.query.edit;

  const item = await getById("item", gst_number, editId);

  const groupList = await getDataList("group", gst_number);

  const unitList = await getDataList("unit", gst_number);

  return {
    gst_number: gst_number || null,
    editId,
    item: JSON.stringify(item),
    groupList: JSON.stringify(groupList),
    unitList: JSON.stringify(unitList),
  };
};
