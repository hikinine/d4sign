import FormData from 'form-data';
import { normalizeStringBooleanLikeInput } from '../utils/normalizeStringBooleanLikeInput';
import { HttpClient } from './../http-client';
import { D4SignCredentials } from './../interface/d4sign';
import {
  DocumentAddHighlightInput,
  DocumentAddHighlightOutput,
  DocumentCancelInput,
  DocumentCancelOutput,
  DocumentCreateFromHTMLTemplateInput,
  DocumentCreateFromHTMLTemplateOutput,
  DocumentCreateFromWordTemplateInput,
  DocumentCreateFromWordTemplateOutput,
  DocumentGenerateDownloadLinkInput,
  DocumentGenerateDownloadLinkOutput,
  DocumentGetOutput,
  DocumentListByStatusInput,
  DocumentListByStatusOutput,
  DocumentListInput,
  DocumentListOutput,
  DocumentListTemplatesOutput,
  DocumentListTemplatesUnparsedOutput,
  DocumentResendToSignerInput,
  DocumentResendToSignerOutput,
  DocumentSendInput,
  DocumentSendOutput,
  DocumentStatus,
  DocumentUploadAttachmentInput,
  DocumentUploadAttachmentOutput,
  DocumentUploadInput,
  DocumentUploadOutput
} from './../interface/document';
import { HttpClientRequestProps, Method } from './../interface/http-client';

export class Document {
  /**
   * Listar todos os documentos. O resultado será de 500 documentos por páginas
   * @param {number} props.page - (opcional)
   * @see {@link https://docapi.d4sign.com.br/docs/endpoints-2#getdocuments}
   */
  async list(props?: DocumentListInput): Promise<DocumentListOutput[]> {
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Get,
      endpoint: '/documents',
      filter: {
        pg: props?.page,
      },
    };
    return this.http.resolve<DocumentListOutput[]>(request);
  }

  /**
   * Listar um documento específico pelo seu ID.
   * @param {string} document_id - (required)
   * @see {@link https://docapi.d4sign.com.br/docs/endpoints-2#get-documentsuuid-document}
   */
  async get(uuidDocument: string): Promise<DocumentGetOutput> {
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Get,
      endpoint: `/documents/${uuidDocument}`,
    };
    return this.http.resolve<DocumentGetOutput>(request);
  }

  /**
   * Listar todos os documentos de uma fase (status)
   * @param {string} status
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#get-documentsid-fasestatus
   */
  async listByStatus(
    status: DocumentStatus,
    props?: DocumentListByStatusInput,
  ): Promise<DocumentListByStatusOutput> {
    const decodedStatus = Document.decodeStatus(status);
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Get,
      endpoint: `/documents/${decodedStatus}/status`,
      filter: {
        pg: props?.page,
      },
    };
    return this.http.resolve<DocumentListByStatusOutput>(request);
  }

  /**
   * UPLOAD do documento em um cofre. Após o processamento um preview será gerado. O processamento será realizado em background, ou seja, a requisição não ficará bloqueada.
   * @param {string} props.uuid_safe ID do cofre (required)
   * @param {Buffer} props.file Arquivo em PDF,DOC,DOCX,JPG,PNG,BMP
   * @param {string} props.folder (opcional) ID da pasta para salvar
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#post-documentsuuid-safeupload
   */
  async upload(props: DocumentUploadInput): Promise<DocumentUploadOutput> {
    const { file, uuid_safe, uuid_folder } = props;

    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_safe}/upload`,
      headers: {
        'Content-Type': 'multipart/form-data',
        tokenAPI: this.credentials.tokenAPI,
      },
    };
    const body = new FormData();
    if (uuid_folder) body.append('uuid_folder', uuid_folder);
    body.append('file', file);
    request.body = body;
    return this.http.resolve<DocumentUploadOutput>(request);
  }

  /**
   * UPLOAD de um documento anexo ao principal
   * Esse objeto realizará o UPLOAD do seu documento para os servidores da D4Sign e ficará anexo ao documento principal.
   * Após o processamento um preview será gerado. O processamento será realizado em background, ou seja, a requisição não ficará bloqueada.
   * @param props.uuid_safe (required) ID do documento
   * @type PDF,DOC,DOCX,JPG,PNG,BMP
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#postdocumentsuuid-doc-principaluploadslave
   */
  async uploadAttachment(
    props: DocumentUploadAttachmentInput,
  ): Promise<DocumentUploadAttachmentOutput> {
    const { document, file } = props;
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${document}/uploadslave`,
      headers: {
        'Content-Type': 'multipart/form-data',
        tokenAPI: this.credentials.tokenAPI,
      },
    };
    const body = new FormData();
    body.append('file', file);
    request.body = body;
    return this.http.resolve<DocumentUploadAttachmentOutput>(request);
  }

  /**
   * Esse objeto irá retornar todos os templates criados em sua conta.
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#posttemplates
   */
  async listTemplates(): Promise<DocumentListTemplatesOutput[]> {
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/templates`,
    };

    const data = await this.http.resolve<DocumentListTemplatesUnparsedOutput>(request);
    return Array.from(Object.values(data))
  }

  /**
   * Esse objeto irá gerar um documento em seu cofre a partir de um template word.
   * @param props.uuid_safe (required) ID do documento
   * @param props.name_document (required) Nome do documento
   * @param props.templates - template with variables (required)
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#postdocumentsuuid-safemakedocumentbytemplateword
   */
  async createFromWordTemplate(
    props: DocumentCreateFromWordTemplateInput,
  ): Promise<DocumentCreateFromWordTemplateOutput> {
    const { uuid_safe, name_document, templates, uuid_folder } = props;
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_safe}/makedocumentbytemplateword`,
      body: {
        name_document,
        templates,
      } as { [key: string]: string | object },
    };

    if (uuid_folder) {
      Object.defineProperty(request.body, 'uuid_folder', { value: uuid_folder });
    }
    return this.http.resolve<DocumentCreateFromWordTemplateOutput>(request);
  }

  /**
   * Esse objeto irá gerar um documento em seu cofre a partir de um template html
   * @param props.uuid_safe (required) ID do documento
   * @param props.name_document (required) Nome do documento
   * @param props.templates - template with variables (required)
   * @link https://docapi.d4sign.com.br/reference/documento-a-partir-do-template-html
   */
  async createFromHtmlTemplate(
    props: DocumentCreateFromHTMLTemplateInput,
  ): Promise<DocumentCreateFromHTMLTemplateOutput> {
    const { uuid_safe, name_document, templates, uuid_folder } = props;
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_safe}/makedocumentbytemplate`,
      body: {
        name_document,
        templates,
      } as { [key: string]: string | object },
    };

    if (uuid_folder) {
      Object.defineProperty(request.body, 'uuid_folder', { value: uuid_folder });
    }
    return this.http.resolve<DocumentCreateFromHTMLTemplateOutput>(request);
  }

  /**
   * Enviará o documento para assinatura, ou seja, o documento entrará na fase 'Aguardando assinaturas', onde, a partir dessa fase, os signatários poderão assinar os documentos.
   * @param props.uuid_document (required) ID do documento
   * @param props.workflow (required) Caso o parâmetro workflow seja definido como 1, o segundo signatário só receberá a mensagem de que há um documento aguardando sua assinatura DEPOIS que o primeiro signatário efetuar a assinatura, e assim sucessivamente. 	Porém, caso seja definido como 0, todos os signatários poderão assinar o documento ao mesmo tempo.
   * @param props.skip_email 1 = O e-mail não será disparado. 0 = Os signatários serão avisados por e-mail que precisam assinar um documento.
   * @param props.message (opcional)
   */
  async send(props: DocumentSendInput): Promise<DocumentSendOutput> {
    const { uuid_document, skip_email, workflow, message } = props;
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_document}/sendtosigner`,
      body: {
        skip_email: normalizeStringBooleanLikeInput(skip_email),
        workflow,
      } as { [key: string]: unknown },
    };

    if (message) request.body.message = message;
    request.body.tokenAPI = this.credentials.tokenAPI;

    return this.http.resolve<DocumentSendOutput>(request);
  }

  /**
   * Esse objeto irá cancelar o documento.
   * @param props.uuid_document (required) ID do documento
   * @param props.comment (required) Insira um comentário sobre o cancelamento.
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#postdocumentsuuid-documentcancel
   */
  async cancel(props: DocumentCancelInput): Promise<DocumentCancelOutput> {
    const { comment, uuid_document } = props
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_document}/cancel`,
      body: {
        comment
      }
    };
    return this.http.resolve<DocumentCancelOutput>(request);
  }

  /**
   * Esse objeto irá cancelar o documento.
   * @param props.uuid_document (required) ID do documento
   * @param props.type (optional) Para realizar o download do arquivo completo, escolha ZIP nesse atributo. Para realizar o download apenas do PDF, escolha PDF nesse atributo.
   * @param props.language  (optional) pt | en
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#postdocumentsuuid-documentdownload
   */
  async generateDownloadLink(props: DocumentGenerateDownloadLinkInput): Promise<DocumentGenerateDownloadLinkOutput> {
    const { language, type, uuid_document } = props
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_document}/download`,
      body: {
        language,
        type
      }
    };
    return this.http.resolve<DocumentGenerateDownloadLinkOutput>(request);
  }

  /**
   * Esse objeto irá reenviar o link de assinatura para o signatário
   * @param props.uuid_document (required) ID do documento
   * @param props.email Email ou WhatsApp do signatário que deverá receber o link novamente.
   * @param props.key_signer id do signer
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#postdocumentsuuid-documentresend
   */
  async resendToSigner(props: DocumentResendToSignerInput): Promise<DocumentResendToSignerOutput> {
    const { email, key_signer, uuid_document } = props
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_document}/resend`,
      body: {
        key_signer,
        email
      }
    };
    return this.http.resolve<DocumentResendToSignerOutput>(request);
  }

  /**
   * Esse objeto cadastrará as informações (texto) para serem destacadas para o signatário
   * @param props.uuid_document (required) ID do documento
   * @param props.email E-mail do signatário cadastrado
   * @param props.key_signer id do signer
   * @param props.text Cláusula que será destacada
   * @link https://docapi.d4sign.com.br/docs/endpoints-2#postdocumentsuuid-documentaddhighlight 
   */
  async addHighlight(props: DocumentAddHighlightInput): Promise<DocumentAddHighlightOutput> {
    const { email, key_signer, uuid_document, text } = props
    const request: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Post,
      endpoint: `/documents/${uuid_document}/addhighlight`,
      body: {
        key_signer,
        email,
        text
      }
    };
    return this.http.resolve<DocumentAddHighlightOutput>(request);
  }

  static createInstance(http: HttpClient, credentials: D4SignCredentials) {
    return new Document(http, credentials);
  }
  private constructor(private http: HttpClient, private credentials: D4SignCredentials) { }

  private static decodeStatus(status: DocumentStatus) {
    switch (status) {
      case 'Processando':
        return 1;
      case 'Aguardando Signatários':
        return 2;
      case 'Aguardando Assinaturas':
        return 3;
      case 'Finalizado':
        return 4;
      case 'Arquivado':
        return 5;
      case 'Cancelado':
        return 6;
      case 'Editando':
        return 7;
      default:
        return 1;
    }
  }
}
