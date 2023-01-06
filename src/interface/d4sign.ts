import { HttpClientProps } from './http-client';

export interface D4SignCredentials {
  tokenAPI: string;
  cryptKey?: string;
}
export interface D4SignProps {
  credentials: D4SignCredentials;
  httpConfig?: HttpClientProps;
}
