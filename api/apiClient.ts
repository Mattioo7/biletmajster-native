import Backend from "../constants/Backend";
import { Api } from "./Api";

export const apiClient = new Api({
  baseUrl: Backend(""),
});
