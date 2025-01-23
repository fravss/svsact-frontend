import { StatusRD } from "./enums/StatusRD";

  export interface CriarDenuncia {
    relato: string;
    dataEmissao: Date;
    statusRD: StatusRD;
    agenteViolador: string;
    origemDenuncia: string,
    direitosViolados: string[]
  }
  export interface Denuncia extends CriarDenuncia {
    id: number;
 }