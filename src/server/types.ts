import { type Request } from "express";

export type UserCredencialAlias = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;

export type UserStructure = {
  username: string;
  password: string;
};
