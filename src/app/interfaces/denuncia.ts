import { StatusRD } from "./enums/StatusRD";
import { Usuario } from "./usuario";

  export interface Denuncia {
    relato: string;
    dataEmissao: Date;
    statusRD: StatusRD;
    agenteViolador: string;
    origemDenuncia: string,
    direitosViolados: string[];
    id: number;
    conselheiro: Usuario;
  }
 