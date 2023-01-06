export interface DocumentListInput {
  page?: number;
}
export interface DocumentListOutput {
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

export interface DocumentGetOutput {
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

export type DocumentStatus =
  | 'Processando'
  | 'Aguardando Signatários'
  | 'Aguardando Assinaturas'
  | 'Finalizado'
  | 'Arquivado'
  | 'Cancelado'
  | 'Editando';

export interface DocumentListByStatusInput {
  page?: number;
}

export interface DocumentListByStatusOutput {
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

export interface DocumentUploadInput {
  uuid_safe: string; // ID do cofre
  file: Buffer;
  uuid_folder?: string;
}

export interface DocumentUploadOutput {
  uuid: string;
}

export interface DocumentUploadAttachmentInput {
  document: string; // ID do cofre
  file: Buffer;
}
export interface DocumentUploadAttachmentOutput {
  message: string;
}

export interface DocumentUploadWithBase64FormatInput {
  base64_binary_file: string;
  mime_type: string;
  name?: string;
}
export type DocumentUploadWithBase64FormatOutput = void;

export type Variables = { [variables: string]: string };
export interface DocumentCreateFromWordTemplateInput {
  uuid_safe: string; // ID do cofre
  name_document: string;
  uuid_folder?: string;
  templates: { [uuidTemplate: string]: Variables };
}
export interface DocumentCreateFromWordTemplateOutput {
  uuid: string;
}

export interface DocumentSendInput {
  uuid_document: string;
  message?: string;
  skip_email: boolean | '0' | '1';
  workflow: '0' | '1';
}
export interface DocumentSendOutput {
  message: string;
}
