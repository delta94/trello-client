import to from "await-to-js";

import { http } from "../http/http";

export const createCard = async data =>
  await to(http.post("/card/create", data));

export const deleteCards = async data =>
  await to(http.delete("/card/delete", {data}));

