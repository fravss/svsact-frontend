import { Pessoa } from "./pessoa";

export interface Denuncia {
    id: number;
    relato: string;
    conselheiro: number;
    pessoa: Pessoa;
  }
  export interface CriarDenuncia {
    relato: string;
    pessoaId: number,
    origem: string,
    direitosViolados: string[]
  }