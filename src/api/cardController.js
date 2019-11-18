import to from "await-to-js";

import { http } from "../http/http";

// Create list
export const createCard = async data =>
  await to(http.post("/card/create", data));
