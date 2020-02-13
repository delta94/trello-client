import to from "await-to-js";

import { http } from "../http/http";

export const getBoards = async () => await to(http.get('/board'));

export const createBoard = async data =>
  await to(http.post('/board/create', data));

export const getSingleBoard = async id => await to(http.get(`/board/${id}`));

export const updateBoard = async (id, data) =>
  await to(http.put(`/board/${id}`, data ));

export const deleteBoard = async (data) =>
  await to(http.delete(`/board/delete`, {data} ));


