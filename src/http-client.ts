import axios, { AxiosInstance } from 'axios';
import { applicationConfig } from './config';
import { D4SignCredentials } from './interface/d4sign';
import { HttpClientProps, HttpClientRequestProps } from './interface/http-client';
import { isDefined } from './utils/isDefined';

export class HttpClient {
  private client: AxiosInstance;

  private encodeFilterURI(filter: any) {
    return Object.keys(filter || {})
      .map((key) => (filter?.[key] ? `&${key}=${encodeURI(filter[key])}` : ''))
      .join('');
  }

  private withAuthenticationParams(
    endpoint: string,
    credentials: D4SignCredentials,
    filter?: HttpClientRequestProps['filter'],
  ) {
    const { tokenAPI, cryptKey } = credentials;

    const authParams =
      typeof cryptKey === 'string'
        ? `?tokenAPI=${tokenAPI}&cryptKey=${cryptKey}`
        : `?tokenAPI=${tokenAPI}`;

    return filter
      ? endpoint.concat(authParams).concat(this.encodeFilterURI(filter))
      : endpoint.concat(authParams);
  }

  async resolve<Response>(request: HttpClientRequestProps): Promise<Response> {
    const { method, endpoint, body, filter, credentials, headers } = request;

    const url = this.withAuthenticationParams(endpoint, credentials, filter);

    const { data } = isDefined(headers)
      ? await this.client[method]<Response>(url, body, headers)
      : await this.client[method]<Response>(url, body);
    return data;
  }

  constructor(props?: HttpClientProps) {
    const timeout = props?.timeout || applicationConfig.defaultHttpRequestTimeoutInMs;
    const baseURL = props?.baseApiURL || applicationConfig.baseApiURL;

    this.client = axios.create({
      baseURL,
      timeout,
    });
  }
}
