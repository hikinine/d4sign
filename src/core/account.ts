import { HttpClient } from '../http-client';
import { AccountBalanceOutput } from '../interface/account';
import { D4SignCredentials } from '../interface/d4sign';
import { HttpClientRequestProps, Method } from '../interface/http-client';

export class Account {
  /**
   * Exibir saldo da conta
   * @see {@link https://docapi.d4sign.com.br/docs/endpoints#getaccountbalance}
   */
  async getBalance(): Promise<AccountBalanceOutput> {
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Get,
      endpoint: `/account/balance`,
    };

    return this.http.resolve<AccountBalanceOutput>(request);
  }

  static createInstance(http: HttpClient, credentials: D4SignCredentials) {
    return new Account(http, credentials);
  }
  private constructor(private http: HttpClient, private credentials: D4SignCredentials) {}
}
