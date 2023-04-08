import Constants from 'expo-constants';
// @ts-ignore: @env is created at runtime
import { REACT_NATIVE_API } from '@env'; // Important: Keep this import in line 3

export const BACKEND_URL =
  REACT_NATIVE_API ??
  Constants.expoConfig?.extra?.api ??
  'url';

const Backend = (path: string) => BACKEND_URL + path;

export default Backend;