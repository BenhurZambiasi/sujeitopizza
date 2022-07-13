import { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/head";
import { MasterHeader } from "../../components/masterHeader";
import { Button } from "../../components/ui/Button";
import { Input, TextArea } from "../../components/ui/Input/input";
import { useAuth } from "../../contexts/AuthContext";
import { AppAlert } from "../../components/appAlert";

import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { Select } from "../../components/ui/Select/input";
import { getCategories } from "../../services/category";
import { Upload } from "../../components/ui/Upload";
import { IChangeFile, IChangeProps } from "../../interfaces";
import { createProduct } from "../../services/product";

interface IState {
  file: File | null;
  category_id: string;
  name: string;
  price: string;
  description: string;
}

interface IMessageErrors {
  file: string;
  category_id: string;
  name: string;
  price: string;
  description: string;
  request: string;
}

interface ICategories {
  id: string;
  name: string;
}

const initialMessageErrors = {
  file: "",
  category_id: "",
  name: "",
  price: "",
  description: "",
  request: "",
};

const initialState = {
  file: null,
  category_id: "",
  name: "",
  price: "",
  description: "",
};

const Product: NextPage = () => {
  const { loading, setLoading } = useAuth();
  const [state, setState] = useState<IState>(initialState);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);

  const [messageErrors, setMessageErrors] =
    useState<IMessageErrors>(initialMessageErrors);

  const handleChange = (event: IChangeProps) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleFile = async (event: IChangeFile) => {
    const { files } = event.target;

    setMessageErrors({ ...messageErrors, file: "" });

    if (!files) {
      return;
    }
    const file = files[0];

    if (file) {
      setState({ ...state, file });
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleFocus = (event: IChangeProps) => {
    const { name } = event.target;
    setMessageErrors({ ...messageErrors, [name]: "" });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    validateState();
  };

  const validateState = async () => {
    let flagError = 0;
    let key: keyof IState;
    let errors: IMessageErrors = {
      file: "",
      category_id: "",
      name: "",
      price: "",
      description: "",
      request: "",
    };
    for (key in state) {
      if (!state[key]) {
        errors[key] = `This field is required`;
        flagError += 1;
      }
    }

    if (flagError <= 0) {
      await createNewProduct();
    }
    setMessageErrors(errors);
  };

  const createNewProduct = async () => {
    setLoading(true);
    const resp = await createProduct(state);
    if (resp) {
      if (resp.status === 201) {
        setLoading(false);
        AppAlert({ type: "success", message: "Product created successfully" });
      } else {
        const { message }: any = resp;
        AppAlert({ type: "error", message: message });
        setLoading(false);
      }
    } else {
      AppAlert({ type: "error", message: "Error creating product" });
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories()
      .then((resp) => {
        const { data } = resp;
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header title="Novo produto - Sujeito Pizzaria" />
      <MasterHeader />

      <div>
        <main className={styles.container}>
          <h1>Cadastrar produto</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Upload
              accept="image/png, image/jpeg"
              type="file"
              fileUrl={fileUrl}
              onChange={handleFile}
              textError={messageErrors.file}
            />

            <Select
              placeholder="Selecione uma categoria"
              name="category_id"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.category_id}>
              <option value="">Selecione...</option>
              {categories &&
                categories.map((category) => (
                  <option
                    className={styles.options}
                    key={category.id}
                    value={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select>
            <Input
              type="text"
              placeholder="Digite o nome do produto"
              name="name"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.name}
            />
            <Input
              type="text"
              placeholder="Preço do produto"
              name="price"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.price}
            />

            <TextArea
              placeholder="Descreva seu produto..."
              name="description"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.description}
            />
            <Button
              loading={loading}
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

export default Product;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
