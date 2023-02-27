import { HttpClientRequestProps, Method } from '../interface/http-client';
import { normalizeStringBooleanLikeInput } from '../utils/normalizeStringBooleanLikeInput';
import { HttpClient } from './../http-client';
import { D4SignCredentials } from './../interface/d4sign';
import {
  SignerCreateManyActDecode,
  SignerCreateManyInput,
  SignerCreateManyInputAct,
  SignerCreateOutput
} from './../interface/signers';

export class Signers {
  /**
   * @param props.uuid_document (required) ID do documento
   * @param props.signers (required) Lista de signatarios. (array)
   * Esse objeto realizará o cadastro dos signatários do documento, ou seja, quais pessoas precisam assinar esse documento
   * @link https://docapi.d4sign.com.br/docs/endpoints-1#postdocumentsuuid-documentcreatelist
   */
  async create(props: SignerCreateManyInput): Promise<SignerCreateOutput> {
    const { signers, uuid_document } = props;

    const payload = signers.map((signer) => {
      return {
        ...signer,
        act: SignerCreateManyActDecode(signer.act as SignerCreateManyInputAct),
        foreign: normalizeStringBooleanLikeInput(signer.foreign),
        certificadoicpbr: normalizeStringBooleanLikeInput(signer.certificadoicpbr),
        assinatura_presencial: normalizeStringBooleanLikeInput(signer.certificadoicpbr),
      };
    });

    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_document}/createlist`,
      body: {
        signers: payload
      },
    };
    return this.http.resolve<SignerCreateOutput>(request);
  }

  static createInstance(http: HttpClient, credentials: D4SignCredentials) {
    return new Signers(http, credentials);
  }
  private constructor(private http: HttpClient, private credentials: D4SignCredentials) {}
}
