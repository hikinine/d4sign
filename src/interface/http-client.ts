import { D4SignCredentials } from './d4sign';
export interface HttpClientProps {
  baseApiURL?: string;
  timeout?: number;
}
export interface HttpClientRequestProps {
  credentials: D4SignCredentials;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  endpoint: string;
  body?: any;
  filter?: { [key: string]: string | number | undefined };
  headers?: { [key: string]: string };
}

export class Method {
  static Post: 'post' = 'post';
  static Get: 'get' = 'get';
}
