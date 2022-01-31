import React from "react";
import CompanyForm from "components/CompanyForm/CompanyForm";
import Admin from "layouts/Admin";
import { cities, states } from "lib/masters";

const CompanyRegister = ({ cities, states }) => {
  const handleFormSave = (data) => {};

  return (
    <CompanyForm
      cities={cities}
      states={states}
      handleFormSave={handleFormSave}
    />
  );
};

CompanyRegister.layout = Admin;

export async function getStaticProps() {
  return {
    props: {
      cities: await cities(),
      states: await states(),
    },
  };
}

export default CompanyRegister;
