import { useRecoilState } from "recoil";
import { backendUrlState } from "../recoil/backendUrlState";
import { Api } from "../api/Api";

export const useApiClient = () => {
  const [backend, _] = useRecoilState(backendUrlState);

  console.log("Backend is " + backend);
  // let stackTrace = Error().stack;

  // console.log(stackTrace!.slice(0, 400));

  // console.log("\n\n");

  return new Api({
    baseUrl: backend,
  });
};

