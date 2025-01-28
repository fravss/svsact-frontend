import { StatusRD } from "./enums/StatusRD";
import { Usuario } from "./usuario";

  export interface Denuncia {
    id: number;
    relato: string;
    dataEmissao: Date;
    statusRD: StatusRD;
    origemDenuncia: string, 
    conselheiro: Usuario;
    responsaveis: string;
    criancasAdolescentes: string;
    medidasAplicadas: string;
  }
 