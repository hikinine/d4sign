export interface SafesDocumentListInput {
  uuid_safe: string;
  uuid_folder?: string;
}
export interface SafesDocumentListOutput {
  uuidDoc: string;
  nameDoc: string;
  type: string;
  size: string;
  pages: string;
  uuidSafe: string;
  safeName: string;
  statusId: string;
  statusName: string;
  statusComment: string;
  whoCanceled: string;
}
export interface SafesFolderListInput {
  uuid_safe: string;
}
export interface SafesFolderListOutput {
  uuid_safe: string;
  uuid_folder: string;
  name: string;
  dt_cadastro: string;
}

export interface SafesFolderCreateInput {
  uuid_safe: string; // ss
  folder_name: string;
}
export interface SafesFolderCreateOutput {
  message: string;
  uuid: string;
}
export interface SafesFolderRenameInput {
  uuid_safe: string;
  folder_name: string;
  uuid_folder: string;
}
export interface SafesFolderRenameOutput {
  message: string;
}

export interface SafesListOutput {
  'uuid-safe': string;
  'name-safe': string;
}

export interface Xxxx {
  batches: {
    create: {
      input: {
        keys: string[];
      };
      output: {
        message: string;
        uuid_batches: string;
        total: string;
      };
    };
  };
}
