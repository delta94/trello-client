import to from "await-to-js";

import { http } from "../http/http";

// Create list
export const createList = async data =>
  await to(http.post("/list/create", data));

// Archive list
export const deleteList = async id =>
  await to(http.post("/list/delete", { id }));
