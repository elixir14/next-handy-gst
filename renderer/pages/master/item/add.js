import React from "react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";

import { getDataList } from "lib/masters";

import Admin from "layouts/Admin";
import ItemForm from "components/Form/ItemForm";
import useSWR from "swr";
import { fetcher } from "lib/helper";

const create = (props) => {
  const { setError } = useForm();
  const { data: session } = useSession();

  const gst_number = props.gst_number;

  const { data: groupData } = useSWR(
    session ? `/api/group/get?gst_number=${gst_number}` : null,
    fetcher
  );
  const { data: unitData } = useSWR(
    session ? `/api/unit/get?gst_number=${gst_number}` : null,
    fetcher
  );

  const groupList = groupData || [];

  const unitList = unitData || [];

  const handleFormSave = (data) => {
    const payload = data;
    axios
      .post("/api/item/add", { payload, gst_number })
      .then((res) => {
        toast.success("Item created successfully");
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
      handleFormSave={handleFormSave}
      groupList={groupList}
      unitList={unitList}
    />
  );
};

create.layout = Admin;
create.auth = true;

export default create;

create.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const gst_number = session?.company?.gst_number?.toLowerCase() || null;

  const groupList = await getDataList("group", gst_number);
  const unitList = await getDataList("unit", gst_number);

  return {
    gst_number: gst_number || null,
    groupList: JSON.stringify(groupList),
    unitList: JSON.stringify(unitList),
  };
};
