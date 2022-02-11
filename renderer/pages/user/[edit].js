import React from "react";
import router from "next/router";
import UserForm from "components/Form/UserForm";
import Admin from "layouts/Admin";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const edit = (props) => {
  const user = JSON.parse(props.user);
  const { setError } = useForm();

  const handleFormEdit = (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "required",
        message: "The passwords do not match",
      });
      return;
    }
    delete data.confirm_password;
    const payload = data;
    axios
      .post(`/api/user/edit/${user.id}`, payload)
      .then((res) => {
        toast.success("User edited successfully");
        router.push("/user");
      })
      .catch((error) => {
        setError(error.response.data.key, {
          type: "manual",
          message: error.response.data.message,
        });
      });
  };

  const onError = (errors, e) => {
    if (errors?.confirmPassword) {
      setError("confirmPassword", {
        type: "required",
        message: "The passwords do not match",
      });
    }
  };
  return (
    <UserForm user={user} handleFormSave={handleFormEdit} onError={onError} />
  );
};

edit.layout = Admin;
edit.auth = true;

export default edit;

export async function getServerSideProps({ params }) {
  const editId = params.edit;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(editId),
    },
  });

  return {
    props: {
      user: JSON.stringify(user),
    },
  };
}
