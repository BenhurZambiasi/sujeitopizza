import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { Header } from "../../components/head";
import { MasterHeader } from "../../components/masterHeader";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input/input";
import { useAuth } from "../../contexts/AuthContext";
import { createCategory } from "../../services/category";
import { AppAlert } from "../../components/appAlert";

import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";

interface IMessageErrors {
  name: string;
  request: string;
}

const initialMessageErrors = {
  name: "",
  request: "",
};

const Category: NextPage = () => {
  const { loading, setLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [messageErrors, setMessageErrors] =
    useState<IMessageErrors>(initialMessageErrors);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    validateState();
  };

  const validateState = () => {
    let flagError = 0;
    let errors: IMessageErrors = {
      name: "",
      request: "",
    };
    if (!name.trim()) {
      errors.name = "Name is required";
      flagError += 1;
    }

    if (flagError <= 0) {
      createNewCategory();
    }

    setMessageErrors(errors);
  };

  const createNewCategory = async () => {
    setLoading(true);
    const response = await createCategory(name.trimStart());
    if (response) {
      if (response.status === 201) {
        setLoading(false);
        setName("");
        setMessageErrors(initialMessageErrors);
        AppAlert({ type: "success", message: "Category created successfully" });
      } else {
        const { message }: any = response;
        AppAlert({ type: "error", message });

        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Nova categoria - Sujeito Pizzaria" />
      <MasterHeader />

      <div>
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Digite o nome da categoria"
              value={name}
              textError={messageErrors.name}
              onChange={({ target }) => setName(target.value)}
              onFocus={() => setMessageErrors({ name: "", request: "" })}
            />
            <Button
              loading={loading}
              textError={messageErrors.request}
              colorSpiner="var(--dark-900)"
              classNameButton={styles.btnAdd}
              type="submit">
              Cadastrar
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Category;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
