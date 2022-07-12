import { NextPage } from "next";
import { Header } from "../../components/head";
import { MasterHeader } from "../../components/masterHeader";
import { canSSRAuth } from "../../utils/canSSRAuth";

const Dashboard: NextPage = () => {
  return (
    <div>
      <Header title="Painel - Sujeito Pizzaria" />
      <MasterHeader />
      <div>
        <main></main>
      </div>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
