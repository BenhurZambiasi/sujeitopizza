import {
  FormEvent,
  useState,
  ChangeEvent,
  FocusEvent,
  Fragment,
  useEffect,
} from "react";

import type { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "../contexts/AuthContext";

import { Header } from "../components/head";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input/input";

import { IChangeProps, IFocusProps } from "../interfaces";

import { validateEmail } from "../utils/emailValidation";

import logo from "../../public/logo.svg";
import styles from "../../styles/home.module.scss";
import { canSSRGuest } from "../utils/canSSRGuest";
interface IState {
  email: string;
  password: string;
}

interface IMessageErrors {
  email: string;
  password: string;
  signin: string;
}

const initialMessageErrors: IMessageErrors = {
  email: "",
  password: "",
  signin: "",
};

const Home: NextPage = () => {
  const { signin, loading } = useAuth();

  const initialState: IState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState<IState>(initialState);
  const [messageErros, setMessageErros] =
    useState<IMessageErrors>(initialMessageErrors);

  const handleChange = (event: IChangeProps) => {
    const { name } = event.target;
    setState({ ...state, [name]: event.target.value });
  };

  const handleFocus = (event: IFocusProps) => {
    const { name } = event.target;
    setMessageErros({ ...messageErros, [name]: "", signin: "" });
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    validations();
  };

  const validations = async () => {
    let flagError = 0;

    let errors: IMessageErrors = {
      email: "",
      password: "",
      signin: "",
    };

    if (!state.email.trim()) {
      errors.email = "E-mail is required";
      flagError += 1;
    }
    if (state.email) {
      if (!validateEmail(state.email)) {
        errors.email = "Please enter a valid email";
        flagError += 1;
      }
    }

    if (!state.password.trim()) {
      errors.password = "Please enter a valid password";
      flagError += 1;
    }

    if (flagError <= 0) {
      const { failure, success, message } = await signin(state);
      if (success) {
        router.push("/dashboard");
      }
      if (failure) {
        errors.signin = message;
      }
    }

    setMessageErros(errors);
  };

  useEffect(() => {
    const { email, password } = router.query;
    if (email && password) {
      setState({ email: String(email), password: String(password) });
    }
  }, []);

  return (
    <Fragment>
      <Header title="SuijeitoPizza - Faça seu login" />
      <div className={styles.containerCenter}>
        <Image src={logo} alt="Logo sujeito Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu e-mail"
              name="email"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErros.email}
              autoComplete="off"
              value={state.email}
            />
            <Input
              placeholder="Sua senha"
              type="password"
              name="password"
              onChange={handleChange}
              onFocus={handleFocus}
              textError={messageErros.password}
              showOrHidePassword
              value={state.password}
              autoComplete="off"
            />
            <Button
              loading={loading}
              type="submit"
              textError={messageErros.signin}>
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
