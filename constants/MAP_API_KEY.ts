import Constants from 'expo-constants';
// @ts-ignore: @env is created at runtime
import { REACT_NATIVE_MAPKEY } from '@env';

export const MAP_API_KEY =
  REACT_NATIVE_MAPKEY ??
  Constants.expoConfig?.extra?.mapkey ??
  'none';
  