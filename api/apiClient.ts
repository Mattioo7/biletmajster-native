import { Api } from './Api';

export const apiClient = new Api({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL
})
