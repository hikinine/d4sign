import { isNumberString } from '../utils/isNumberString';

export type SignerCreateManyInputAct =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | 'Assinar'
  | 'Aprovar'
  | 'Reconhecer'
  | 'Assinar como parte'
  | 'Assinar como testemunha'
  | 'Assinar como interveniente'
  | 'Acusar recebimento'
  | 'Assinar como Emissor, Endossante e Avalista'
  | 'Assinar como Emissor, Endossante, Avalista, Fiador'
  | 'Assinar como fiador'
  | 'Assinar como parte e fiador'
  | 'Assinar como responsável solidario'
  | 'Assinar como parte e responsável solidario';

const SignerCreateManyInputActMap: {
  [key in SignerCreateManyInputAct]?: SignerCreateManyInputAct;
} = {
  Assinar: '1',
  Aprovar: '2',
  Reconhecer: '3',
  'Assinar como parte': '4',
  'Assinar como testemunha': '5',
  'Assinar como interveniente': '6',
  'Acusar recebimento': '7',
  'Assinar como Emissor, Endossante e Avalista': '8',
  'Assinar como Emissor, Endossante, Avalista, Fiador': '9',
  'Assinar como fiador': '10',
  'Assinar como parte e fiador': '11',
  'Assinar como responsável solidario': '12',
  'Assinar como parte e responsável solidario': '13',
};

export function SignerCreateManyActDecode(
  code: SignerCreateManyInputAct,
): SignerCreateManyInputAct {
  if (isNumberString(code)) {
    return code;
  }

  return isNumberString(code) ? code : SignerCreateManyInputActMap[code]!;
}
export type SignerCreateManyInput = {
  uuid_document: string;
  signers: {
    email: string;
    act: SignerCreateManyInputAct;
    foreign: '0' | '1' | boolean;
    certificadoicpbr: '0' | '1' | boolean;
    assinatura_presencial: '0' | '1' | boolean;

    foreign_lang?: 'en' | 'es' | 'ptBR';
    docauth?: '0' | '1';
    docauthandselfie?: '0' | '1';
    embed_methodauth?: 'email' | 'password' | 'sms' | 'whats';
    embed_smsnumber?: string;
    upload_allow?: string;
    upload_obs?: string;
    after_position?: string;
    skipemail?: '1';
    whatsapp_number?: string;
    uuid_grupo?: string;
    certificadoicpbr_tipo?: string;
    certificadoicpbr_cpf?: string;
    certificadoicpbr_cnpj?: string;
    password_code?: string;
    auth_pix?: string;
    auth_pix_nome?: string;
    auth_pix_cpf?: string;
    videoselfie?: string;
    d4sign_score?: string;
    d4sign_score_nome?: string;
    d4sign_score_cpf?: string;
    d4sign_score_similarity?: string;
  }[];
};

export interface SignerCreateOutput {
  key_signer: string;
  email: string;
  act: string;
  foreign: string;
  certificadoicpbr: string;
  assinatura_presencial: string;
  assinatura_presencial_link: string;
  doc_auth: string;
  embed_methodauth: string;
  embed_smsnumber: string;
  upload_allow: string;
  upload_obs: string;
  docauthandselfie: string;
  skipemail: string;
  whatsapp: string;
  password_code: string;
  status: string;
}
