import { HttpClient } from '../http-client';
import { D4SignCredentials } from '../interface/d4sign';
import { HttpClientRequestProps, Method } from '../interface/http-client';
import {
  SafesDocumentListInput,
  SafesDocumentListOutput,
  SafesFolderCreateInput,
  SafesFolderCreateOutput,
  SafesFolderListInput,
  SafesFolderListOutput,
  SafesFolderRenameInput,
  SafesFolderRenameOutput,
} from '../interface/safes';
import { SafesListOutput } from './../interface/safes';

/** Cofres */
export class Safes {
  /**
   * Listar todos os cofres disponíveis
   * @see {@link https://docapi.d4sign.com.br/docs/endpoints#get-safes}
   */
  async list() {
    const options: HttpClientRequestProps = {
      credentials: this.credentials,
      method: Method.Get,
      endpoint: `/safes`,
    };
    return this.http.resolve<SafesListOutput>(options);
  }

  public documents = {
    /**
     * Listar todos os documentos de um cofre em específico. É possível filtrar por pasta (folder)
     * @param  {string} props.uuid_safe - ID do cofre (required)
     * @param  {string} props.folder - ID da pasta (opcional). Caso deseje listar apenas documentos de uma pasta específica.
     * @see {@link https://docapi.d4sign.com.br/docs/endpoints#listar-todos-os-documentos-de-um-cofre-ou-pasta}
     */
    list: async (props: SafesDocumentListInput): Promise<SafesDocumentListOutput> => {
      const { uuid_safe, uuid_folder } = props;

      const request: HttpClientRequestProps = {
        credentials: this.credentials,
        method: Method.Get,
        endpoint:
          typeof uuid_folder === 'string'
            ? `/documents/${uuid_folder}/safe/`
            : `/documents/${uuid_safe}/safe/${uuid_folder}`,
      };

      return this.http.resolve<SafesDocumentListOutput>(request);
    },
  };

  public folder = {
    /**
     * Criar pasta em um cofre específico.
     * @param {string} props.uuid_safe ID do cofre (required)
     * @param {string} props.folder_name Nome da pasta (required)
     * @see {@link https://docapi.d4sign.com.br/docs/endpoints#postfoldersuuid-safecreate}
     */
    create: async (props: SafesFolderCreateInput): Promise<SafesFolderCreateOutput> => {
      const { uuid_safe, folder_name } = props;

      const request: HttpClientRequestProps = {
        credentials: this.credentials,
        method: Method.Post,
        endpoint: `/folders/${uuid_safe}/create`,
        body: { folder_name },
      };

      return this.http.resolve<SafesFolderCreateOutput>(request);
    },

    /**
     * Listar pastas do cofre
     * @param {string} props.uuid_safe ID do cofre (required)
     * @see {@link https://docapi.d4sign.com.br/docs/endpoints#get-foldersuuid-safefind}
     */
    list: async (props: SafesFolderListInput): Promise<SafesFolderListOutput> => {
      const { uuid_safe } = props;

      const request: HttpClientRequestProps = {
        credentials: this.credentials,
        method: Method.Get,
        endpoint: `/folders/${uuid_safe}/find`,
      };

      return this.http.resolve<SafesFolderListOutput>(request);
    },

    /**
     * Renomear pasta do cofre
     * @param {string} props.uuid_safe ID do cofre (required)
     * @param {string} props.folder_name Novo nome para a pasta (required)
     * @param {string} props.uuid_folder ID da pasta (required)
     * @see {@link https://docapi.d4sign.com.br/docs/endpoints#renomear-pasta-do-cofre}
     */
    rename: async (props: SafesFolderRenameInput): Promise<SafesFolderRenameOutput> => {
      const { folder_name, uuid_folder, uuid_safe } = props;
      const request: HttpClientRequestProps = {
        credentials: this.credentials,
        method: Method.Post,
        endpoint: `/folders/${uuid_safe}/rename`,
        body: {
          folder_name,
          uuid_folder,
        },
      };
      return this.http.resolve<SafesFolderRenameOutput>(request);
    },
  };

  constructor(private http: HttpClient, private credentials: D4SignCredentials) {}
  static createInstance = (http: HttpClient, credentials: D4SignCredentials) =>
    new Safes(http, credentials);
}
