import { ReactNode, ButtonHTMLAttributes } from "react";
import Head from "next/head";

interface IHeaderProps {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
