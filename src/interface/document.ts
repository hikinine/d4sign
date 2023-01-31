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

export interface DocumentCreateFromHTMLTemplateOutput {
  uuid: string;
}
export interface DocumentCreateFromHTMLTemplateInput {
  uuid_safe: string; // ID do cofre
  name_document: string;
  uuid_folder?: string;
  templates: { [uuidTemplate: string]: Variables };
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

export interface DocumentListTemplatesUnparsedOutput {
  [key: string]: DocumentListTemplatesOutput
}

export interface DocumentListTemplatesOutput {
  id: string ,
  name: string 
  type: "word" | "html",
  variables: string[]
}




export interface DocumentCancelInput {
  uuid_document: string;
  "comment"?: string 
}
export interface DocumentCancelOutput {
  "uuidDoc": string
  "nameDoc": string
  "type":  string
  "size": string
  "pages": string
  "uuidSafe": string
  "safeName": string
  "statusId": string
  "statusName": string
  "statusComment": string
  "whoCanceled": string
}

export interface DocumentGenerateDownloadLinkInput {
  uuid_document: string;
  "type"?: "ZIP" | "PDF",
  "language"?: "pt" | "en"
}
export interface DocumentGenerateDownloadLinkOutput {
  "url": string
  "name": string
}

export interface DocumentResendToSignerInput {
  uuid_document: string
  "email": string
  "key_signer": string
}
export interface DocumentResendToSignerOutput {
  "message": string
}

export interface DocumentAddHighlightInput {
  uuid_document: string 
  key_signer: string
  email: string
  text: string
}
export interface DocumentAddHighlightOutput {
  success: number,
  email: string
  "key_signer": string
  "text": string
}