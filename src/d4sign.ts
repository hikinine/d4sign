import { Account } from './core/account';
import { Document } from './core/document';
import { Safes } from './core/safes';
import { Signers } from './core/signers';
import { InvalidCredentials } from './errors';
import { HttpClient } from './http-client';
import { D4SignProps } from './interface/d4sign';

export class D4Sign {
  public safes: Safes;
  public account: Account;
  public document: Document;
  public signers: Signers;

  constructor(props: D4SignProps) {
    if (
      !(typeof props.credentials === 'object') ||
      !(typeof props.credentials?.tokenAPI === 'string')
    ) {
      throw new InvalidCredentials();
    }

    const { credentials, httpConfig } = props;
    const httpClient = new HttpClient(httpConfig);

    this.safes = Safes.createInstance(httpClient, credentials);
    this.account = Account.createInstance(httpClient, credentials);
    this.document = Document.createInstance(httpClient, credentials);
    this.signers = Signers.createInstance(httpClient, credentials);
  }
}
