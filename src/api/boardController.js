import to from "await-to-js";

import { http } from "../http/http";

// Get all board
export const getBoards = async () => await to(http.get('/board'));

// Create board
export const createBoard = async data =>
  await to(http.post('/board/create', data));

// Get single board
export const getSingleBoard = async id => await to(http.get(`/board/${id}`));

// Update board title
export const updateBoardTitle = async (id, data) =>
  await to(http.put(`/board/${id}`, data ));
