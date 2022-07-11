import type { NextPage } from "next";
import { Header } from "../../components/header";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import styles from "../../../styles/home.module.scss";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input/input";
import { IChangeProps, IFocusProps } from "../../interfaces";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { validateEmail } from "../../utils/emailValidation";
import { createUser } from "../../services/user";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

interface IState {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface IMessageErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  create: string;
}

const initialState: IState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialMessageErrors: IMessageErrors = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  create: "",
};

const SignUp: NextPage = () => {
  const { setLoading, loading } = useAuth();
  const navigate = useRouter();
  const [state, setState] = useState<IState>(initialState);
  const [messageErrors, setMessageErrors] =
    useState<IMessageErrors>(initialMessageErrors);

  const handleChange = (event: IChangeProps) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleFocus = (event: IFocusProps) => {
    const { name } = event.target;
    setMessageErrors({ ...messageErrors, [name]: "", create: "" });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    validations();
  };

  const validations = () => {
    let flagError = 0;
    let key: keyof IState;
    let errors: IMessageErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      create: "",
    };
    for (key in state) {
      if (!state[key]) {
        errors[key] = `This field is required`;
        flagError += 1;
      } else {
        if (key == "email") {
          if (!validateEmail(state.email)) {
            errors.email = "Please enter a valid email";
            flagError += 1;
          }
        }
      }
    }

    if (state.confirmPassword !== state.password) {
      errors.confirmPassword = "Password and confirm password do not match";
      flagError += 1;
    }

    if (flagError <= 0) {
      signUp();
    }
    setMessageErrors(errors);
  };

  const signUp = async () => {
    delete state.confirmPassword;
    setLoading(true);
    const response = await createUser(state);
    if (response) {
      if (response.status === 201) {
        setLoading(false);
        navigate.push({
          pathname: "/",
          query: { email: state.email, password: state.password },
        });
      } else {
        const { message }: any = response;
        setMessageErrors({ ...messageErrors, create: message });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Faça seu cadastro agora!" />
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo sujeito Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Digite seu nome"
              name="name"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.name}
            />
            <Input
              placeholder="Digite seu e-mail"
              name="email"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.email}
            />
            <Input
              placeholder="Sua senha"
              type="password"
              name="password"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.password}
              showOrHidePassword
            />
            <Input
              placeholder="Confirma senha"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErrors.confirmPassword}
              showOrHidePassword
            />
            <Button
              loading={loading}
              type="submit"
              textError={messageErrors.create}>
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <a className={styles.text}>Voltar</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
