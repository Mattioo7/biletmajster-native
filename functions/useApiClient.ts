import { useRecoilState } from 'recoil';
import { backendUrlState, urls } from '../recoil/backendUrlState';
import { Api } from '../api/Api';

export const useApiClient = () => {
  const [backend, _] = useRecoilState(backendUrlState);


  return new Api({
    baseUrl: backend
  });
}