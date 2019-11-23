import to from "await-to-js";

import { http } from "../http/http";

// Create card
export const createCard = async data =>
  await to(http.post("/card/create", data));

// Delete cards
 export const deleteCards = async data =>
  await to(http.delete("/card/delete", {data}));

