import React from "react";
import RegistrationComponent from "../components/RegistrationComponent";
import Layout from "../components/Layout";
import { Alert } from "reactstrap";

const register = () => {
  return (
    <Layout title="Syntaxia 2021 | Register">
      {/* <Alert className="text-center my-4 mx-5">
        Registrations has been closed for Syntaxia 2021
      </Alert> */}
      <RegistrationComponent />
    </Layout>
  );
};

export default register;
