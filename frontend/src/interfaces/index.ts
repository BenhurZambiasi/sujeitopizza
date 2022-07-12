import { ChangeEvent } from "react";

export interface IChangeProps
  extends ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {}

export interface IFocusProps extends ChangeEvent<HTMLInputElement> {}

export interface IChangeFile extends ChangeEvent<HTMLInputElement> {}
