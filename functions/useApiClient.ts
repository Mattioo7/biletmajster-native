import { useRecoilState } from "recoil";
import { backendUrlState } from "../recoil/backendUrlState";
import { Api } from "../api/Api";

export const useApiClient = () => {
  const [backend, _] = useRecoilState(backendUrlState);

  console.log("Backend is " + backend);
  return new Api({
    baseUrl: backend,
  });
};
