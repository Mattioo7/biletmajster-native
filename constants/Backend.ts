export const CONSTANTS_BACKEND_LOCAL_ALS = 'http://10.0.2.2:8000'
export const CONSTANTS_BACKEND_LOCALHOST = 'http://localhost:8000'
export const CONSTANTS_BACKEND_CLOUD = 'https://xxx.azurewebsites.net';

const Backend = (path: string) => CONSTANTS_BACKEND_LOCAL_ALS + path;

export default Backend;